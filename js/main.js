/**
 * main.js — tabs, quiz gates, rewards and view rendering.
 *
 * The quiz engine keeps the same behaviour and the same data as before:
 *   · TRACKER.notifyAccess(...) once per session when the visitor enters
 *     name + email  → Telegram alert via Apps Script.
 *   · TRACKER.log(...) on every quiz submission, with the same fields and
 *     section ids ('personal' | 'experience' | 'skills') → Google Sheets.
 *
 * Gates:  personal   → Sobre mí
 *         experience → Experiencia + Proyectos
 *         skills     → Skills
 * Contacto and the home view are always open.
 */

/* ═══════════════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════════════ */
const GATES = ['personal', 'experience', 'skills'];
const UNLOCK_KEY = 'slm_unlocked_v1';

const STATE = {
  visitorName: '',
  visitorEmail: '',
  accessNotified: false,
  lang: 'es',
  unlockedCount: 0,
  sections: {
    personal:   { unlocked: false, askedTrivia: [], askedPersonal: [] },
    experience: { unlocked: false, askedTrivia: [], askedPersonal: [] },
    skills:     { unlocked: false, askedTrivia: [], askedPersonal: [] }
  },
  currentQuestions: {},
  route: 'inicio',
  activeShortcut: null
};

/* ═══════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════ */
function t(value) {
  if (value == null) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  return value[STATE.lang] != null ? value[STATE.lang] : (value.es || '');
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function e(value) { return escapeHtml(t(value)); }

function ui(es, en) { return STATE.lang === 'en' ? en : es; }

function storageGet(key) {
  try { return window.localStorage.getItem(key); } catch (err) { return null; }
}
function storageSet(key, val) {
  try { window.localStorage.setItem(key, val); } catch (err) { /* private mode */ }
}
function sessionGet(key) {
  try { return window.sessionStorage.getItem(key); } catch (err) { return null; }
}
function sessionSet(key, val) {
  try { window.sessionStorage.setItem(key, val); } catch (err) { /* private mode */ }
}

/* ═══════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {
  // Restore unlocked gates from previous visits
  var saved = [];
  try { saved = JSON.parse(storageGet(UNLOCK_KEY) || '[]'); } catch (err) { saved = []; }
  saved.forEach(function (id) {
    if (STATE.sections[id]) STATE.sections[id].unlocked = true;
  });

  // Language: remembered choice, otherwise the browser language
  var savedLang = storageGet('slm_lang');
  var browserLang = (navigator.language || 'es').toLowerCase().indexOf('es') === 0 ? 'es' : 'en';
  setLang(savedLang === 'es' || savedLang === 'en' ? savedLang : browserLang, true);

  // Visitor already identified in this browser session?
  var sess = null;
  try { sess = JSON.parse(sessionGet('slm_visitor') || 'null'); } catch (err) { sess = null; }
  if (sess && sess.name && sess.email) {
    STATE.visitorName = sess.name;
    STATE.visitorEmail = sess.email;
    STATE.accessNotified = true;
    hideWelcome();
  } else {
    showWelcome();
  }

  // Welcome form
  document.getElementById('welcomeForm').addEventListener('submit', function (ev) {
    ev.preventDefault();
    startSession();
  });
  document.getElementById('whyBtn').addEventListener('click', function () {
    var box = document.getElementById('whyText');
    var open = box.hasAttribute('hidden');
    if (open) box.removeAttribute('hidden'); else box.setAttribute('hidden', '');
    this.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Global click delegation
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') { closeLightbox(); closeFinale(); }
  });
  // Accordion: opening one job closes the others in its list ('toggle' doesn't bubble → capture)
  document.addEventListener('toggle', function (ev) {
    var job = ev.target;
    if (!job.open || !job.classList || !job.classList.contains('job')) return;
    var siblings = job.parentNode.querySelectorAll('details.job[open]');
    for (var i = 0; i < siblings.length; i++) {
      if (siblings[i] !== job) siblings[i].open = false;
    }
  }, true);

  window.addEventListener('hashchange', route);
  updateProgress();
  route();
});

/* ═══════════════════════════════════════════════════════════
   LANGUAGE
═══════════════════════════════════════════════════════════ */
function setLang(lang, silent) {
  STATE.lang = lang;
  document.body.classList.remove('lang-es', 'lang-en');
  document.body.classList.add('lang-' + lang);
  document.documentElement.lang = lang;
  storageSet('slm_lang', lang);

  document.querySelectorAll('.lang-btn[data-lang]').forEach(function (btn) {
    var active = btn.dataset.lang === lang;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });

  if (!silent) renderView(true);
}

/* ═══════════════════════════════════════════════════════════
   WELCOME — start session (Telegram alert)
═══════════════════════════════════════════════════════════ */
function showWelcome() {
  document.getElementById('welcomeModal').classList.remove('is-hidden');
  document.body.classList.add('no-scroll');
  setTimeout(function () {
    var input = document.getElementById('visitorName');
    if (input) input.focus();
  }, 50);
}

function hideWelcome() {
  document.getElementById('welcomeModal').classList.add('is-hidden');
  document.body.classList.remove('no-scroll');
}

function startSession() {
  var nameInput  = document.getElementById('visitorName');
  var emailInput = document.getElementById('visitorEmail');
  var name  = nameInput.value.trim();
  var email = emailInput.value.trim();
  var valid = true;

  nameInput.closest('.field').classList.remove('is-invalid');
  emailInput.closest('.field').classList.remove('is-invalid');

  if (!name) {
    nameInput.closest('.field').classList.add('is-invalid');
    valid = false;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    emailInput.closest('.field').classList.add('is-invalid');
    valid = false;
  }
  if (!valid) return;

  STATE.visitorName  = name;
  STATE.visitorEmail = email;
  sessionSet('slm_visitor', JSON.stringify({ name: name, email: email }));

  // Telegram alert (via Apps Script): who has just accessed the CV.
  if (!STATE.accessNotified) {
    STATE.accessNotified = true;
    TRACKER.notifyAccess({
      timestamp: new Date().toISOString(),
      name:      name,
      email:     email,
      language:  STATE.lang.toUpperCase()
    });
  }

  hideWelcome();
  renderView(true);
}

/* ═══════════════════════════════════════════════════════════
   ROUTER
═══════════════════════════════════════════════════════════ */
function gateFor(view) {
  if (view === 'sobre-mi') return 'personal';
  if (view === 'experiencia' || view === 'proyectos') return 'experience';
  if (view === 'skills') return 'skills';
  return null;
}

function route() {
  var hash = (location.hash || '#inicio').replace(/^#\/?/, '');
  STATE.route = hash || 'inicio';
  renderView(false);
}

function renderView(keepScroll) {
  var app = document.getElementById('app');
  if (!app) return;

  var parts = STATE.route.split('/');
  var view = parts[0];
  var sub = parts[1] || '';
  var known = ['inicio', 'sobre-mi', 'experiencia', 'proyectos', 'skills', 'contacto'];
  if (known.indexOf(view) === -1) { view = 'inicio'; sub = ''; }

  // Active tab
  document.querySelectorAll('.tab').forEach(function (tab) {
    var active = tab.dataset.tab === view;
    tab.classList.toggle('active', active);
    if (active) tab.setAttribute('aria-current', 'page'); else tab.removeAttribute('aria-current');
  });

  var gate = gateFor(view);
  var html;
  if (gate && !STATE.sections[gate].unlocked) {
    html = renderGate(gate, view);
  } else if (view === 'sobre-mi') {
    html = renderAbout();
  } else if (view === 'experiencia') {
    html = renderExperience();
  } else if (view === 'proyectos') {
    html = sub === 'todos' ? renderProjectList(true)
         : sub ? renderProject(sub)
         : renderProjectList(false);
  } else if (view === 'skills') {
    html = renderSkills();
  } else if (view === 'contacto') {
    html = renderContact();
  } else {
    html = renderHome();
  }

  // Keep an in-progress quiz when only the language changes
  var gateBox = gate ? document.getElementById('quiz-' + gate) : null;
  var quizInProgress = keepScroll && gateBox && !gateBox.classList.contains('hidden') &&
                       STATE.currentQuestions[gate] && !STATE.sections[gate].unlocked;
  if (quizInProgress) {
    rerenderQuizTexts(gate);
    return;
  }

  app.innerHTML = html;
  app.classList.remove('view-enter');
  void app.offsetWidth;
  app.classList.add('view-enter');
  if (window.FX) FX.onRender(app, view);

  if (!keepScroll) window.scrollTo(0, 0);
  if (view === 'proyectos' && sub === 'lab') selectShortcut(STATE.activeShortcut || 'newtask');
}

/* ═══════════════════════════════════════════════════════════
   CLICK DELEGATION
═══════════════════════════════════════════════════════════ */
function onDocumentClick(ev) {
  var el;

  if ((el = ev.target.closest('[data-action="start-quiz"]'))) {
    startQuiz(el.dataset.section);
  } else if ((el = ev.target.closest('[data-action="submit-quiz"]'))) {
    submitQuiz(el.dataset.section);
  } else if ((el = ev.target.closest('[data-action="reveal"]'))) {
    unlockSection(el.dataset.section);
  } else if ((el = ev.target.closest('.option-label'))) {
    selectOption(el);
  } else if ((el = ev.target.closest('[data-shortcut]'))) {
    selectShortcut(el.dataset.shortcut);
  } else if ((el = ev.target.closest('[data-zoom]'))) {
    openLightbox(el.dataset.zoom, el.dataset.caption || '');
  } else if ((el = ev.target.closest('[data-action="finale"]'))) {
    openFinale();
  } else if (ev.target.closest('.lightbox-close') || ev.target.id === 'lightbox') {
    closeLightbox();
  } else if (ev.target.closest('.finale-close') || ev.target.id === 'finale') {
    closeFinale();
  }
}

/* ═══════════════════════════════════════════════════════════
   GATE VIEW (locked tab)
═══════════════════════════════════════════════════════════ */
function renderGate(sectionId, view) {
  var g = CONTENT.gates[sectionId];
  var extra = sectionId === 'experience'
    ? '<p class="gate-note"><i class="bi bi-link-45deg"></i> ' +
        ui('Este reto abre Experiencia y Proyectos.', 'This challenge unlocks Experience and Projects.') + '</p>'
    : '';

  return (
    '<section class="view gate-view">' +
      '<div class="gate-card" id="card-' + sectionId + '">' +
        '<div class="gate-head">' +
          '<span class="gate-lock"><i class="bi bi-lock-fill"></i></span>' +
          '<span class="mono-label">' + e(g.label) + '</span>' +
        '</div>' +
        '<h1 class="gate-title">' + e(g.title) + '</h1>' +
        '<p class="gate-text">' + e(g.text) + '</p>' + extra +

        '<div id="locked-' + sectionId + '">' +
          '<button type="button" class="btn btn-primary" data-action="start-quiz" data-section="' + sectionId + '">' +
            ui('Empezar reto', 'Start challenge') + ' <i class="bi bi-arrow-right"></i></button>' +
          '<p class="gate-hint">' + ui('1 pregunta sorpresa + 2 preguntas sobre ti', '1 surprise question + 2 questions about you') + '</p>' +
        '</div>' +

        '<div class="quiz hidden" id="quiz-' + sectionId + '">' +
          '<div id="questions-' + sectionId + '"></div>' +
          '<div class="quiz-actions" id="actions-' + sectionId + '">' +
            '<button type="button" class="btn btn-primary" data-action="submit-quiz" data-section="' + sectionId + '">' +
              ui('Enviar y desbloquear', 'Submit and unlock') + ' <i class="bi bi-unlock"></i></button>' +
          '</div>' +
          '<div class="quiz-result hidden" id="result-' + sectionId + '"></div>' +
        '</div>' +
      '</div>' +
    '</section>'
  );
}

/* ═══════════════════════════════════════════════════════════
   QUESTION DRAWING — random, no repeats within a session
═══════════════════════════════════════════════════════════ */
function drawFromPool(pool, askedIndices, count) {
  var available = [];
  for (var i = 0; i < pool.length; i++) {
    if (askedIndices.indexOf(i) === -1) available.push(i);
  }
  if (available.length < count) {
    askedIndices.length = 0;
    available = [];
    for (var j = 0; j < pool.length; j++) available.push(j);
  }
  for (var k = available.length - 1; k > 0; k--) {
    var rand = Math.floor(Math.random() * (k + 1));
    var temp = available[k];
    available[k] = available[rand];
    available[rand] = temp;
  }
  var chosen = available.slice(0, count);
  for (var m = 0; m < chosen.length; m++) askedIndices.push(chosen[m]);
  return chosen.map(function (idx) {
    return Object.assign({}, pool[idx], { poolIndex: idx });
  });
}

function drawQuestions(sectionId) {
  var section = STATE.sections[sectionId];
  var trivia   = drawFromPool(QUESTIONS[sectionId].trivia,   section.askedTrivia,   1)[0];
  var personal = drawFromPool(QUESTIONS[sectionId].personal, section.askedPersonal, 2);
  return { trivia: trivia, personal: personal };
}

/* ═══════════════════════════════════════════════════════════
   RENDER QUESTIONS — 1 trivia + 2 free text
═══════════════════════════════════════════════════════════ */
function renderQuestions(sectionId, drawn) {
  var container = document.getElementById('questions-' + sectionId);
  if (!container) return;

  var trivia = drawn.trivia;
  var optionsHtml = trivia.options.map(function (opt, oIdx) {
    return (
      '<label class="option-label">' +
        '<input type="radio" name="trivia_' + sectionId + '" value="' + oIdx + '" class="option-radio">' +
        '<span class="option-text" data-i="' + oIdx + '">' + e(opt) + '</span>' +
      '</label>'
    );
  }).join('');

  var triviaHtml =
    '<div class="question-block" data-block="trivia">' +
      '<p class="mono-label"><i class="bi bi-stars"></i> <span class="q-tag">' + ui('Pregunta sorpresa', 'Surprise question') + '</span></p>' +
      '<p class="question-text" data-q="trivia">' + e(trivia.q) + '</p>' +
      '<div class="options-list">' + optionsHtml + '</div>' +
    '</div>';

  var personalHtml = drawn.personal.map(function (q, pIdx) {
    return (
      '<div class="question-block" data-block="personal' + pIdx + '">' +
        '<p class="question-text" data-q="personal' + pIdx + '">' + e(q.q) + '</p>' +
        '<textarea name="personal' + pIdx + '_' + sectionId + '" class="answer-input" rows="2" ' +
          'placeholder="' + ui('Escribe tu respuesta...', 'Write your answer...') + '"></textarea>' +
      '</div>'
    );
  }).join('');

  container.innerHTML = triviaHtml + personalHtml;
}

/* Language switch while a quiz is open: swap texts, keep answers */
function rerenderQuizTexts(sectionId) {
  var drawn = STATE.currentQuestions[sectionId];
  var box = document.getElementById('questions-' + sectionId);
  if (!drawn || !box) return;
  var tq = box.querySelector('[data-q="trivia"]');
  if (tq) tq.textContent = t(drawn.trivia.q);
  box.querySelectorAll('.option-text').forEach(function (span) {
    span.textContent = t(drawn.trivia.options[+span.dataset.i]);
  });
  drawn.personal.forEach(function (q, i) {
    var p = box.querySelector('[data-q="personal' + i + '"]');
    if (p) p.textContent = t(q.q);
  });
  box.querySelectorAll('textarea').forEach(function (ta) {
    ta.placeholder = ui('Escribe tu respuesta...', 'Write your answer...');
  });
  var tag = box.querySelector('.q-tag');
  if (tag) tag.textContent = ui('Pregunta sorpresa', 'Surprise question');
  var submit = document.querySelector('#actions-' + sectionId + ' .btn');
  if (submit) submit.innerHTML = ui('Enviar y desbloquear', 'Submit and unlock') + ' <i class="bi bi-unlock"></i>';
}

function selectOption(labelEl) {
  var block = labelEl.closest('.question-block');
  if (!block) return;
  block.querySelectorAll('.option-label').forEach(function (l) { l.classList.remove('selected'); });
  labelEl.classList.add('selected');
  var radio = labelEl.querySelector('input');
  if (radio) radio.checked = true;
}

function show(el) { if (el) el.classList.remove('hidden'); }
function hide(el) { if (el) el.classList.add('hidden'); }

/* ═══════════════════════════════════════════════════════════
   START QUIZ
═══════════════════════════════════════════════════════════ */
function startQuiz(sectionId) {
  if (!STATE.visitorName || !STATE.visitorEmail) {
    showWelcome();
    return;
  }
  var drawn = drawQuestions(sectionId);
  STATE.currentQuestions[sectionId] = drawn;
  renderQuestions(sectionId, drawn);

  hide(document.getElementById('locked-' + sectionId));
  hide(document.getElementById('result-' + sectionId));
  show(document.getElementById('questions-' + sectionId));
  show(document.getElementById('actions-' + sectionId));
  show(document.getElementById('quiz-' + sectionId));
}

/* ═══════════════════════════════════════════════════════════
   SUBMIT — validate, log to Sheets, show reward
═══════════════════════════════════════════════════════════ */
function submitQuiz(sectionId) {
  var drawn = STATE.currentQuestions[sectionId];
  if (!drawn) return;

  var triviaSel = document.querySelector('input[name="trivia_' + sectionId + '"]:checked');
  var text0El = document.querySelector('textarea[name="personal0_' + sectionId + '"]');
  var text1El = document.querySelector('textarea[name="personal1_' + sectionId + '"]');
  var text0 = text0El ? text0El.value.trim() : '';
  var text1 = text1El ? text1El.value.trim() : '';

  var missing = [];
  if (!triviaSel) missing.push('trivia');
  if (!text0)     missing.push('personal0');
  if (!text1)     missing.push('personal1');
  if (missing.length) {
    highlightMissing(sectionId, missing);
    return;
  }

  var chosenIdx     = parseInt(triviaSel.value, 10);
  var triviaCorrect = chosenIdx === drawn.trivia.correct;

  // Log to Google Sheets — same fields and layout as before.
  TRACKER.log({
    timestamp: new Date().toISOString(),
    name:      STATE.visitorName,
    email:     STATE.visitorEmail,
    language:  STATE.lang.toUpperCase(),
    section:   sectionId,
    q1: drawn.trivia.q[STATE.lang],
    a1: drawn.trivia.options[chosenIdx][STATE.lang],
    q2: drawn.personal[0].q[STATE.lang], a2: text0,
    q3: drawn.personal[1].q[STATE.lang], a3: text1,
    score:  triviaCorrect ? '✓ trivia' : '✗ trivia',
    result: STATE.lang === 'en' ? 'Completed' : 'Completado',
    c1: triviaCorrect, c2: true, c3: true
  });

  showReward(sectionId, triviaCorrect);
}

function highlightMissing(sectionId, missing) {
  missing.forEach(function (block) {
    var el = document.querySelector('#questions-' + sectionId + ' [data-block="' + block + '"]');
    if (el) {
      el.classList.add('is-missing');
      setTimeout(function () { el.classList.remove('is-missing'); }, 1800);
    }
  });
}

/* Thank-you + curiosity reward + reveal button */
function showReward(sectionId, triviaCorrect) {
  hide(document.getElementById('questions-' + sectionId));
  hide(document.getElementById('actions-' + sectionId));

  var resultEl = document.getElementById('result-' + sectionId);
  if (!resultEl) return;

  var wink = triviaCorrect
    ? ui('¡Acertaste la sorpresa!', 'You nailed the surprise!')
    : ui('Casi con la sorpresa', 'Almost on the surprise');

  resultEl.innerHTML =
    '<p class="wink ' + (triviaCorrect ? 'wink-ok' : 'wink-close') + '"><i class="bi ' + (triviaCorrect ? 'bi-stars' : 'bi-emoji-wink') + '"></i> ' + wink + '</p>' +
    '<p class="result-title">' + ui('Gracias por compartir.', 'Thanks for sharing.') + '</p>' +
    '<div class="reward">' +
      '<p class="mono-label"><i class="bi bi-gift"></i> ' + ui('Dato curioso', 'Fun fact') + '</p>' +
      '<p class="reward-text">' + e(CONTENT.rewards[sectionId]) + '</p>' +
    '</div>' +
    '<button type="button" class="btn btn-primary" data-action="reveal" data-section="' + sectionId + '">' +
      '<i class="bi bi-unlock-fill"></i> ' + ui('Ver la sección', 'Reveal the section') + '</button>';

  show(resultEl);
}

/* ═══════════════════════════════════════════════════════════
   UNLOCK
═══════════════════════════════════════════════════════════ */
function unlockSection(sectionId) {
  STATE.sections[sectionId].unlocked = true;
  var list = GATES.filter(function (id) { return STATE.sections[id].unlocked; });
  storageSet(UNLOCK_KEY, JSON.stringify(list));
  updateProgress();

  document.body.classList.add('just-unlocked');
  setTimeout(function () { document.body.classList.remove('just-unlocked'); }, 1200);

  renderView(false);

  if (STATE.unlockedCount === GATES.length) {
    setTimeout(openFinale, 700);
  }
}

function updateProgress() {
  var count = 0;
  GATES.forEach(function (id) { if (STATE.sections[id].unlocked) count++; });
  STATE.unlockedCount = count;

  document.querySelectorAll('.unlocked-num').forEach(function (el) { el.textContent = count; });
  document.querySelectorAll('.tab[data-gate]').forEach(function (tab) {
    tab.classList.toggle('is-locked', !STATE.sections[tab.dataset.gate].unlocked);
  });
}

/* ═══════════════════════════════════════════════════════════
   FINALE — fun facts + Ravenclaw
═══════════════════════════════════════════════════════════ */
function finaleHtml() {
  var f = CONTENT.finale;
  return (
    '<p class="mono-label"><i class="bi bi-trophy"></i> ' + ui('Los tres retos, completados', 'All three challenges completed') + '</p>' +
    '<h2 class="finale-title" id="finaleTitle">' + e(f.title) + '</h2>' +
    '<ul class="facts">' + f.items.map(function (it) { return '<li>' + e(it) + '</li>'; }).join('') + '</ul>' +
    '<blockquote class="motto"><span>' + escapeHtml(f.motto) + '</span><cite>' + e(f.mottoNote) + '</cite></blockquote>'
  );
}

function openFinale() {
  var box = document.getElementById('finale');
  document.getElementById('finaleBody').innerHTML = finaleHtml();
  box.removeAttribute('hidden');
  document.body.classList.add('no-scroll');
}

function closeFinale() {
  var box = document.getElementById('finale');
  if (!box || box.hasAttribute('hidden')) return;
  box.setAttribute('hidden', '');
  document.body.classList.remove('no-scroll');
}

/* ═══════════════════════════════════════════════════════════
   LIGHTBOX
═══════════════════════════════════════════════════════════ */
function openLightbox(src, caption) {
  var box = document.getElementById('lightbox');
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightboxImg').alt = caption;
  document.getElementById('lightboxCaption').textContent = caption;
  box.removeAttribute('hidden');
  document.body.classList.add('no-scroll');
}

function closeLightbox() {
  var box = document.getElementById('lightbox');
  if (!box || box.hasAttribute('hidden')) return;
  box.setAttribute('hidden', '');
  document.body.classList.remove('no-scroll');
}

/* ═══════════════════════════════════════════════════════════
   VIEW: HOME
═══════════════════════════════════════════════════════════ */
function renderHome() {
  var h = CONTENT.home;
  var tabs = [
    { href: '#experiencia', gate: 'experience', label: { es: 'Experiencia', en: 'Experience' } },
    { href: '#proyectos',   gate: 'experience', label: { es: 'Proyectos', en: 'Projects' } },
    { href: '#skills',      gate: 'skills',     label: { es: 'Skills', en: 'Skills' } },
    { href: '#sobre-mi',    gate: 'personal',   label: { es: 'Sobre mí', en: 'About me' } },
    { href: '#contacto',    gate: null,         label: { es: 'Contacto', en: 'Contact' } }
  ];

  var next = ['experience', 'skills', 'personal'].filter(function (id) { return !STATE.sections[id].unlocked; })[0];
  var nextHref = next === 'personal' ? '#sobre-mi' : next === 'experience' ? '#experiencia' : next === 'skills' ? '#skills' : '#proyectos';
  var nextLabel = !next ? ui('Ver proyectos', 'See projects')
    : (next === 'experience' && STATE.unlockedCount === 0) ? t(h.start)
    : ui('Seguir con el siguiente reto', 'Continue with the next challenge');

  return (
    '<section class="view home">' +
      '<div class="home-hero">' +
        '<canvas class="hero-dither" aria-hidden="true"></canvas>' +
        '<p class="mono-label home-eyebrow">' + e(h.eyebrow) + '</p>' +
        '<h1 class="mega">' + h.title.map(function (w) { return '<span data-word="' + escapeHtml(w) + '">' + escapeHtml(w) + '</span>'; }).join('') + '</h1>' +
        '<p class="home-value">' + e(h.value) + '</p>' +
        '<p class="status"><span class="status-dot"></span>' + e(h.status) + '</p>' +
        '<a class="btn btn-primary" href="' + nextHref + '">' + escapeHtml(nextLabel) + ' <i class="bi bi-arrow-right"></i></a>' +
        '<p class="scroll-hint mono">' + ui('Desliza para iniciar', 'Scroll to initiate') + '<i class="bi bi-chevron-double-down"></i></p>' +
      '</div>' +
      renderMarquee() +

      '<div class="home-gate">' +
        '<div class="home-gate-text">' +
          '<h2 class="section-title">' + e(h.gateTitle) + '</h2>' +
          '<p>' + e(h.gateText) + '</p>' +
        '</div>' +
        '<ol class="lock-list">' +
          tabs.map(function (tab, i) {
            var locked = tab.gate && !STATE.sections[tab.gate].unlocked;
            return '<li><a href="' + tab.href + '" class="lock-row' + (locked ? ' is-locked' : ' is-open') + '">' +
              '<span class="lock-num">0' + (i + 1) + '</span>' +
              '<span class="lock-name">' + e(tab.label) + '</span>' +
              '<i class="bi ' + (locked ? 'bi-lock-fill' : 'bi-unlock') + '"></i></a></li>';
          }).join('') +
        '</ol>' +
      '</div>' +
    '</section>'
  );
}

function renderMarquee() {
  var tools = ['n8n', 'Make', 'GoHighLevel', 'Claude', 'OpenAI', 'Next.js', 'Supabase', 'Python',
               'React', ui('Atajos de Apple', 'Apple Shortcuts'), 'Telegram', 'Azure Custom Vision', 'Agile'];
  var row = tools.map(function (tl) { return '<span>' + escapeHtml(tl) + '</span><i>✦</i>'; }).join('');
  return '<div class="marquee" aria-hidden="true"><div class="marquee-track">' + row + row + '</div></div>';
}

/* ═══════════════════════════════════════════════════════════
   VIEW: ABOUT
═══════════════════════════════════════════════════════════ */
function renderAbout() {
  var a = CONTENT.about;
  var testimonials = a.testimonials && a.testimonials.length
    ? '<div class="block"><p class="mono-label">' + ui('Lo que dicen', 'What people say') + '</p>' +
        '<div class="quotes">' + a.testimonials.map(function (q) {
          return '<figure class="quote"><blockquote>' + e(q.quote) + '</blockquote>' +
                 '<figcaption><strong>' + escapeHtml(q.name) + '</strong> · ' + e(q.role) + '</figcaption></figure>';
        }).join('') + '</div></div>'
    : '';

  var finaleBtn = STATE.unlockedCount === GATES.length
    ? '<button type="button" class="btn btn-ghost" data-action="finale"><i class="bi bi-trophy"></i> ' + e(CONTENT.finale.title) + '</button>'
    : '<p class="muted small">' + ui('Completa los tres retos para ver las curiosidades de Sonia.', 'Complete all three challenges to see Sonia’s fun facts.') + '</p>';

  return (
    '<section class="view about">' +
      '<header class="view-head">' +
        '<p class="mono-label">' + ui('Sobre mí', 'About me') + '</p>' +
        '<h1 class="display">' + e(a.title) + '</h1>' +
      '</header>' +
      '<div class="about-grid">' +
        '<div class="story">' + a.story.map(function (p) { return '<p>' + e(p) + '</p>'; }).join('') +
          '<p class="travel-line">' + e(a.travelLine) + '</p>' +
        '</div>' +
        '<aside class="about-side">' +
          '<img src="foto_cv.jpg" alt="Sonia Lacarra Molina" class="portrait" onerror="this.style.display=\'none\'">' +
          '<p class="mono-label">' + ui('Idiomas', 'Languages') + '</p><p>' + e(a.languages) + '</p>' +
        '</aside>' +
      '</div>' +
      '<div class="stats">' + a.stats.map(function (s) {
        return '<div class="stat"><span class="stat-n">' + escapeHtml(s.n) + '</span><span class="stat-l">' + e(s.label) + '</span></div>';
      }).join('') + '</div>' +
      '<div class="block reward-inline"><p class="mono-label"><i class="bi bi-gift"></i> ' + ui('Dato curioso', 'Fun fact') + '</p><p>' + e(CONTENT.rewards.personal) + '</p>' + finaleBtn + '</div>' +
      testimonials +
    '</section>'
  );
}

/* ═══════════════════════════════════════════════════════════
   VIEW: EXPERIENCE
═══════════════════════════════════════════════════════════ */
function renderTags(tags) {
  return '<ul class="tags">' + (tags || []).map(function (tg) { return '<li>' + e(tg) + '</li>'; }).join('') + '</ul>';
}

function renderExperience() {
  var jobs = CONTENT.experience.map(function (job, i) {
    return (
      '<details class="job"' + (i === 0 ? ' open' : '') + '>' +
        '<summary>' +
          '<span class="job-dates mono">' + e(job.dates) + '</span>' +
          '<span class="job-main"><span class="job-role">' + e(job.role) + '</span>' +
          '<span class="job-org">' + e(job.org) + ' · ' + e(job.place) + '</span></span>' +
          '<i class="bi bi-plus-lg job-toggle"></i>' +
        '</summary>' +
        '<div class="job-body">' +
          '<p>' + e(job.summary) + '</p>' +
          '<ul class="bullets">' + job.bullets.map(function (b) { return '<li>' + e(b) + '</li>'; }).join('') + '</ul>' +
          renderTags(job.tags) +
        '</div>' +
      '</details>'
    );
  }).join('');

  var edu = CONTENT.education.map(function (ed) {
    var meta = [ed.org, ed.year].filter(Boolean).join(' · ');
    var head =
      '<span class="job-dates mono">' + escapeHtml(ed.year || '') + '</span>' +
      '<span class="job-main"><span class="job-role">' + e(ed.title) + '</span>' +
      (ed.org ? '<span class="job-org">' + escapeHtml(ed.org) + '</span>' : '') + '</span>';
    if (ed.detail) {
      return '<details class="job edu"><summary>' + head + '<i class="bi bi-plus-lg job-toggle"></i></summary>' +
             '<div class="job-body"><p>' + e(ed.detail) + '</p></div></details>';
    }
    return '<div class="job edu static"><div class="summary-static">' + head + '</div></div>';
  }).join('');

  return (
    '<section class="view experience">' +
      '<header class="view-head">' +
        '<p class="mono-label">' + ui('Experiencia', 'Experience') + '</p>' +
        '<h1 class="display">' + ui('De doce mil metros a los procesos.', 'From forty thousand feet to processes.') + '</h1>' +
        '<p class="lead">' + ui('Pulsa cada etapa para ver el detalle.', 'Tap each role to see the details.') + '</p>' +
      '</header>' +
      '<div class="jobs">' + jobs + '</div>' +
      '<h2 class="section-title">' + ui('Formación', 'Education') + '</h2>' +
      '<div class="jobs">' + edu + '</div>' +
      '<div class="block reward-inline"><p class="mono-label"><i class="bi bi-gift"></i> ' + ui('Dato curioso', 'Fun fact') + '</p><p>' + e(CONTENT.rewards.experience) + '</p></div>' +
      '<a class="btn btn-ghost" href="#proyectos">' + ui('Ver proyectos', 'See projects') + ' <i class="bi bi-arrow-right"></i></a>' +
    '</section>'
  );
}

/* ═══════════════════════════════════════════════════════════
   VIEW: PROJECTS
═══════════════════════════════════════════════════════════ */
function projectCard(p, i) {
  var cover = p.cover
    ? '<img src="' + p.cover + '" alt="" loading="lazy">'
    : '<span class="cover-type">' + e(p.name) + '</span>';
  return (
    '<a class="project-card" href="#proyectos/' + p.slug + '">' +
      '<span class="project-cover' + (p.cover ? '' : ' is-type') + '">' + cover + '</span>' +
      '<span class="project-meta mono">' + String(i + 1).padStart(2, '0') + ' · ' + e(p.kind) + ' · ' + escapeHtml(p.year) + '</span>' +
      '<span class="project-name">' + e(p.name) + '</span>' +
      '<span class="project-short">' + e(p.short) + '</span>' +
      '<span class="project-more">' + ui('Ver proyecto', 'View project') + ' <i class="bi bi-arrow-right"></i></span>' +
    '</a>'
  );
}

function renderProjectList(all) {
  var list = all ? CONTENT.projects : CONTENT.projects.filter(function (p) { return p.featured; });
  var more = all
    ? '<a class="btn btn-ghost" href="#proyectos"><i class="bi bi-arrow-left"></i> ' + ui('Proyectos destacados', 'Selected work') + '</a>'
    : '<a class="btn btn-ghost" href="#proyectos/todos">' + ui('Ver todos los proyectos', 'View all projects') + ' <i class="bi bi-arrow-right"></i></a>';

  return (
    '<section class="view projects">' +
      '<header class="view-head view-head-row">' +
        '<div><p class="mono-label">' + ui('Proyectos', 'Projects') + '</p>' +
        '<h1 class="display">' + (all ? ui('Todos los proyectos', 'All projects') : ui('Trabajo seleccionado', 'Selected work')) + '</h1></div>' +
        more +
      '</header>' +
      '<div class="project-grid">' + list.map(projectCard).join('') + '</div>' +
      '<div class="projects-foot">' + more + '</div>' +
    '</section>'
  );
}

function renderProject(slug) {
  var p = CONTENT.projects.filter(function (x) { return x.slug === slug; })[0];
  if (!p) return renderProjectList(false);
  if (p.isLab) return renderLab(p);

  var link = p.link
    ? '<a class="btn btn-ghost" href="' + p.link + '" target="_blank" rel="noopener">' + escapeHtml(p.link.replace(/^https?:\/\//, '')) + ' <i class="bi bi-box-arrow-up-right"></i></a>'
    : '';

  var metrics = (p.metrics || []).map(function (m) {
    return '<div class="stat"><span class="stat-n">' + escapeHtml(m.n) + '</span><span class="stat-l">' + e(m.label) + '</span></div>';
  }).join('');

  var gallery = (p.gallery || []).map(function (g) {
    return '<figure class="shot"><button type="button" class="shot-btn" data-zoom="' + g.src + '" data-caption="' + e(g.caption) + '">' +
             '<img src="' + g.src + '" alt="' + e(g.caption) + '" loading="lazy"></button>' +
           '<figcaption>' + e(g.caption) + '</figcaption></figure>';
  }).join('');

  return (
    '<section class="view project">' +
      '<a class="back" href="#proyectos"><i class="bi bi-arrow-left"></i> ' + ui('Proyectos', 'Projects') + '</a>' +
      '<header class="view-head">' +
        '<p class="mono-label">' + e(p.kind) + ' · ' + escapeHtml(p.year) + '</p>' +
        '<h1 class="display">' + e(p.name) + '</h1>' +
        '<p class="lead">' + e(p.short) + '</p>' + link +
      '</header>' +
      (metrics ? '<div class="stats">' + metrics + '</div>' : '') +
      '<div class="case">' +
        '<div class="case-row"><p class="mono-label">' + ui('Problema', 'Problem') + '</p><p>' + e(p.problem) + '</p></div>' +
        '<div class="case-row"><p class="mono-label">' + ui('Qué construí', 'What I built') + '</p>' +
          '<ul class="bullets">' + (p.built || []).map(function (b) { return '<li>' + e(b) + '</li>'; }).join('') + '</ul></div>' +
        '<div class="case-row"><p class="mono-label">Stack</p>' + renderTags(p.stack) + '</div>' +
      '</div>' +
      (gallery ? '<div class="gallery">' + gallery + '</div>'
               : '<p class="muted small">' + ui('Capturas en camino.', 'Screenshots coming soon.') + '</p>') +
    '</section>'
  );
}

/* ═══════════════════════════════════════════════════════════
   VIEW: LAB — interactive iPhone + robot team
═══════════════════════════════════════════════════════════ */
function renderLab(p) {
  var L = CONTENT.lab;
  var ph = L.phone;

  var tiles = L.shortcuts.map(function (s) {
    return '<button type="button" class="tile tile-' + s.color + '" data-shortcut="' + s.id + '">' +
             '<i class="bi ' + s.icon + '"></i><span>' + e(s.name) + '</span></button>';
  }).join('');

  var phone =
    '<div class="phone" aria-label="iPhone">' +
      '<div class="phone-screen">' +
        '<div class="phone-status"><span>' + ph.time + '</span><span><i class="bi bi-reception-4"></i> <i class="bi bi-wifi"></i> <i class="bi bi-battery-full"></i></span></div>' +
        '<div class="widget widget-tasks">' +
          '<div class="wt-left"><span class="wt-icon"><i class="bi bi-list-ul"></i></span><span class="wt-count">' + ph.tasks.length + '</span><span class="wt-label">' + ui('Tareas', 'Tasks') + '</span></div>' +
          '<ul class="wt-list">' + ph.tasks.map(function (tk) { return '<li><span class="circle"></span><span>' + e(tk) + '</span></li>'; }).join('') + '</ul>' +
        '</div>' +
        '<div class="widget-row">' +
          '<div class="widget widget-cal"><span class="wc-day">' + e(ph.day) + '</span><span class="wc-date">' + ph.date + '</span><span class="wc-event">' + e(ph.block) + '</span></div>' +
          '<div class="widget widget-weather"><span>' + ph.city + ' <i class="bi bi-cursor-fill"></i></span><span class="ww-temp">' + ph.temp + '</span><span><i class="bi bi-cloud"></i> ' + e(ph.weather) + '</span></div>' +
        '</div>' +
        '<div class="tiles">' + tiles + '</div>' +
      '</div>' +
    '</div>';

  var team = L.team.map(function (m) {
    return '<figure class="member"><img src="' + m.img + '" alt="' + escapeHtml(m.name) + '" loading="lazy">' +
           '<figcaption><strong>' + escapeHtml(m.name) + '</strong><span>' + e(m.role) + '</span></figcaption></figure>';
  }).join('');

  return (
    '<section class="view project lab">' +
      '<a class="back" href="#proyectos"><i class="bi bi-arrow-left"></i> ' + ui('Proyectos', 'Projects') + '</a>' +
      '<header class="view-head">' +
        '<p class="mono-label">' + e(p.kind) + '</p>' +
        '<h1 class="display">' + e(p.name) + '</h1>' +
        '<p class="lead">' + e(L.intro) + '</p>' +
      '</header>' +
      '<div class="stats">' + L.stats.map(function (s) {
        return '<div class="stat"><span class="stat-n">' + escapeHtml(s.n) + '</span><span class="stat-l">' + e(s.label) + '</span></div>';
      }).join('') + '</div>' +

      '<h2 class="section-title">' + e(L.shortcutsTitle) + '</h2>' +
      '<p class="lead">' + e(L.shortcutsText) + '</p>' +
      '<div class="lab-stage">' + phone +
        '<div class="chat-panel" aria-live="polite">' +
          '<p class="mono-label" id="chatTitle"></p>' +
          '<div class="chat" id="chat"></div>' +
          '<ol class="chain">' + L.chain.map(function (c) { return '<li>' + e(c) + '</li>'; }).join('') + '</ol>' +
        '</div>' +
      '</div>' +

      '<h2 class="section-title">' + e(L.teamTitle) + '</h2>' +
      '<p class="lead">' + e(L.teamText) + '</p>' +
      '<div class="team">' + team + '</div>' +
      '<div class="block reward-inline"><p class="mono-label"><i class="bi bi-gift"></i> ' + ui('Dato curioso', 'Fun fact') + '</p><p>' + e(CONTENT.rewards.skills) + '</p></div>' +
    '</section>'
  );
}

var chatTimers = [];
function selectShortcut(id) {
  var s = CONTENT.lab.shortcuts.filter(function (x) { return x.id === id; })[0];
  var chat = document.getElementById('chat');
  if (!s || !chat) return;
  STATE.activeShortcut = id;

  document.querySelectorAll('.tile').forEach(function (tile) {
    tile.classList.toggle('active', tile.dataset.shortcut === id);
  });
  document.getElementById('chatTitle').innerHTML = '<i class="bi bi-lightning-charge"></i> ' + ui('Atajo', 'Shortcut') + ': ' + e(s.name);

  chatTimers.forEach(clearTimeout);
  chatTimers = [];
  chat.innerHTML = '';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  s.chat.forEach(function (msg, i) {
    chatTimers.push(setTimeout(function () {
      var who = msg.from === 'me' ? ui('Yo', 'Me') : msg.from === 'bot' ? 'n8n' : '';
      var div = document.createElement('div');
      div.className = 'msg msg-' + msg.from;
      div.innerHTML = (who ? '<span class="msg-who">' + who + '</span>' : '') + e(msg);
      chat.appendChild(div);
    }, reduce ? 0 : i * 650));
  });
}

/* ═══════════════════════════════════════════════════════════
   VIEW: SKILLS
═══════════════════════════════════════════════════════════ */
function renderSkills() {
  return (
    '<section class="view skills">' +
      '<header class="view-head">' +
        '<p class="mono-label">Skills</p>' +
        '<h1 class="display">' + ui('Caja de herramientas.', 'Toolbox.') + '</h1>' +
      '</header>' +
      '<div class="skill-groups">' + CONTENT.skills.map(function (g, i) {
        return '<div class="skill-group"><p class="skill-num mono">0' + (i + 1) + '</p>' +
               '<h2 class="skill-title">' + e(g.group) + '</h2>' + renderTags(g.items) + '</div>';
      }).join('') + '</div>' +
      '<div class="block reward-inline"><p class="mono-label"><i class="bi bi-gift"></i> ' + ui('Dato curioso', 'Fun fact') + '</p><p>' + e(CONTENT.rewards.skills) + '</p>' +
        '<a class="text-link" href="#proyectos/lab">' + ui('Conoce a mi equipo', 'Meet my team') + ' <i class="bi bi-arrow-right"></i></a></div>' +
    '</section>'
  );
}

/* ═══════════════════════════════════════════════════════════
   VIEW: CONTACT (always open)
═══════════════════════════════════════════════════════════ */
function renderContact() {
  var c = CONTENT.contact;
  return (
    '<section class="view contact">' +
      '<header class="view-head">' +
        '<p class="mono-label">' + ui('Contacto', 'Contact') + '</p>' +
        '<h1 class="display">' + e(c.title) + '</h1>' +
        '<p class="lead">' + e(c.text) + '</p>' +
      '</header>' +
      '<div class="contact-grid">' + c.links.map(function (l) {
        var ext = /^https?:/.test(l.href) ? ' target="_blank" rel="noopener"' : '';
        return '<a class="contact-link" href="' + l.href + '"' + ext + '>' +
                 '<i class="bi ' + l.icon + '"></i>' +
                 '<span class="mono-label">' + e(l.label) + '</span>' +
                 '<span class="contact-value">' + escapeHtml(l.value) + '</span></a>';
      }).join('') + '</div>' +
    '</section>'
  );
}
