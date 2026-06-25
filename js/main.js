/**
 * main.js — "Get to know you" engine, unlock flow, language toggle
 *
 * Each section shows 1 fun trivia (multiple choice) + 2 personal open
 * questions (free text). The visitor unlocks a section by picking a trivia
 * option AND writing an answer in both text boxes. Getting the trivia right
 * is just a wink — it never blocks the unlock.
 */

/* ═══════════════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════════════ */
const STATE = {
  visitorName:  '',
  visitorEmail: '',
  lang: 'es',
  unlockedCount: 0,
  sections: {
    personal:   { unlocked: false, askedTrivia: [], askedPersonal: [] },
    experience: { unlocked: false, askedTrivia: [], askedPersonal: [] },
    skills:     { unlocked: false, askedTrivia: [], askedPersonal: [] }
  },
  currentQuestions: {}   // { sectionId: { trivia: obj, personal: [obj, obj] } }
};

/* ═══════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════ */
function show(el) {
  if (el) el.classList.remove('hidden');
}

function hide(el) {
  if (el) el.classList.add('hidden');
}

function qs(selector) {
  return document.querySelector(selector);
}

function qsAll(selector) {
  return document.querySelectorAll(selector);
}

/* ═══════════════════════════════════════════════════════════
   INITIALISATION
═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {
  // Launch welcome modal
  var welcomeModal = new bootstrap.Modal(document.getElementById('welcomeModal'));
  welcomeModal.show();

  // Set initial language
  setLang('es');

  // Event delegation for the "reveal section" button (shown after submitting)
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-action="reveal"]');
    if (btn) {
      unlockSection(btn.dataset.section);
    }
  });
});

/* ═══════════════════════════════════════════════════════════
   LANGUAGE TOGGLE
═══════════════════════════════════════════════════════════ */
function setLang(lang) {
  STATE.lang = lang;
  document.body.classList.remove('lang-es', 'lang-en');
  document.body.classList.add('lang-' + lang);

  var btnEs = document.getElementById('btn-es');
  var btnEn = document.getElementById('btn-en');

  if (btnEs && btnEn) {
    btnEs.classList.toggle('active', lang === 'es');
    btnEn.classList.toggle('active', lang === 'en');
    btnEs.setAttribute('aria-pressed', lang === 'es' ? 'true' : 'false');
    btnEn.setAttribute('aria-pressed', lang === 'en' ? 'true' : 'false');
  }
}

/* ═══════════════════════════════════════════════════════════
   WELCOME MODAL — start session
═══════════════════════════════════════════════════════════ */
function startSession() {
  var nameInput  = document.getElementById('visitorName');
  var emailInput = document.getElementById('visitorEmail');
  var name  = nameInput.value.trim();
  var email = emailInput.value.trim();
  var valid = true;

  // Clear previous invalid state
  nameInput.classList.remove('is-invalid');
  emailInput.classList.remove('is-invalid');

  if (!name) {
    nameInput.classList.add('is-invalid');
    valid = false;
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    emailInput.classList.add('is-invalid');
    valid = false;
  }

  if (!valid) return;

  STATE.visitorName  = name;
  STATE.visitorEmail = email;

  var modal = bootstrap.Modal.getInstance(document.getElementById('welcomeModal'));
  if (modal) modal.hide();
}

/* ═══════════════════════════════════════════════════════════
   QUESTION DRAWING — random, no repeats within a session
═══════════════════════════════════════════════════════════ */
function drawFromPool(pool, askedIndices, count) {
  // Build list of indices not yet asked
  var available = [];
  for (var i = 0; i < pool.length; i++) {
    if (askedIndices.indexOf(i) === -1) available.push(i);
  }

  // If fewer than needed remain, reset and use the whole pool
  if (available.length < count) {
    askedIndices.length = 0;
    available = [];
    for (var j = 0; j < pool.length; j++) available.push(j);
  }

  // Shuffle available indices
  for (var k = available.length - 1; k > 0; k--) {
    var rand = Math.floor(Math.random() * (k + 1));
    var temp = available[k];
    available[k] = available[rand];
    available[rand] = temp;
  }

  var chosen = available.slice(0, count);

  // Mark as asked
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
   RENDER QUESTIONS — 1 trivia (multiple choice) + 2 free text
═══════════════════════════════════════════════════════════ */
function renderQuestions(sectionId, drawn) {
  var container = document.getElementById('questions-' + sectionId);
  if (!container) return;

  // Trivia block (multiple choice)
  var trivia = drawn.trivia;
  var optionsHtml = trivia.options.map(function (opt, oIdx) {
    return (
      '<label class="option-label" onclick="selectOption(this)">' +
        '<input type="radio" name="trivia_' + sectionId + '" value="' + oIdx + '" class="option-radio">' +
        '<span class="option-text es">' + escapeHtml(opt.es) + '</span>' +
        '<span class="option-text en">' + escapeHtml(opt.en) + '</span>' +
      '</label>'
    );
  }).join('');

  var triviaHtml =
    '<div class="question-block" data-block="trivia">' +
      '<p class="trivia-tag es"><i class="bi bi-stars"></i> Pregunta sorpresa</p>' +
      '<p class="trivia-tag en"><i class="bi bi-stars"></i> Surprise question</p>' +
      '<p class="question-text es">' + escapeHtml(trivia.q.es) + '</p>' +
      '<p class="question-text en">' + escapeHtml(trivia.q.en) + '</p>' +
      '<div class="options-list">' + optionsHtml + '</div>' +
    '</div>';

  // Personal blocks (free text)
  var personalHtml = drawn.personal.map(function (q, pIdx) {
    return (
      '<div class="question-block" data-block="personal' + pIdx + '">' +
        '<p class="question-text es">' + escapeHtml(q.q.es) + '</p>' +
        '<p class="question-text en">' + escapeHtml(q.q.en) + '</p>' +
        '<textarea name="personal' + pIdx + '_' + sectionId + '" class="open-answer-input personal-input" rows="2" ' +
          'data-placeholder-es="Escribe tu respuesta..." data-placeholder-en="Write your answer..." ' +
          'placeholder="' + (STATE.lang === 'en' ? 'Write your answer...' : 'Escribe tu respuesta...') + '"></textarea>' +
      '</div>'
    );
  }).join('');

  container.innerHTML = triviaHtml + personalHtml;
}

/* Visual feedback when a trivia option is clicked */
function selectOption(labelEl) {
  var block = labelEl.closest('.question-block');
  if (!block) return;
  var labels = block.querySelectorAll('.option-label');
  labels.forEach(function (l) { l.classList.remove('selected'); });
  labelEl.classList.add('selected');
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ═══════════════════════════════════════════════════════════
   START QUIZ
═══════════════════════════════════════════════════════════ */
function startQuiz(sectionId) {
  // Require name/email first
  if (!STATE.visitorName || !STATE.visitorEmail) {
    var modal = new bootstrap.Modal(document.getElementById('welcomeModal'));
    modal.show();
    return;
  }

  var drawn = drawQuestions(sectionId);
  STATE.currentQuestions[sectionId] = drawn;

  renderQuestions(sectionId, drawn);

  // Show quiz face, hide locked face
  hide(document.getElementById('locked-' + sectionId));
  hide(document.getElementById('result-' + sectionId));
  show(document.getElementById('questions-' + sectionId));
  show(document.getElementById('actions-' + sectionId));
  show(document.getElementById('quiz-' + sectionId));
}

/* ═══════════════════════════════════════════════════════════
   SUBMIT — validate, log, show wink
═══════════════════════════════════════════════════════════ */
function submitQuiz(sectionId) {
  var drawn = STATE.currentQuestions[sectionId];
  if (!drawn) return;

  var triviaSel = document.querySelector('input[name="trivia_' + sectionId + '"]:checked');
  var text0El = document.querySelector('textarea[name="personal0_' + sectionId + '"]');
  var text1El = document.querySelector('textarea[name="personal1_' + sectionId + '"]');
  var text0 = text0El ? text0El.value.trim() : '';
  var text1 = text1El ? text1El.value.trim() : '';

  // Validate: trivia chosen + both text answers written
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

  // Log to Google Sheets (same column layout as before).
  // q1/a1 = trivia, q2/a2 + q3/a3 = personal answers.
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

  updateScoreBoard(sectionId);
  showThankYou(sectionId, triviaCorrect);
}

/* Highlight blocks that are missing an answer */
function highlightMissing(sectionId, missing) {
  missing.forEach(function (block) {
    var el = document.querySelector(
      '#questions-' + sectionId + ' [data-block="' + block + '"]'
    );
    if (el) {
      el.style.border = '1px solid rgba(239,83,80,0.6)';
      setTimeout(function (b) {
        return function () { b.style.border = ''; };
      }(el), 1800);
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   THANK YOU — trivia wink + reveal button
═══════════════════════════════════════════════════════════ */
function showThankYou(sectionId, triviaCorrect) {
  hide(document.getElementById('questions-' + sectionId));
  hide(document.getElementById('actions-' + sectionId));

  var resultEl = document.getElementById('result-' + sectionId);
  if (!resultEl) return;

  var wink = triviaCorrect
    ? { es: '¡Acertaste la sorpresa! ✨', en: 'You nailed the surprise! ✨' }
    : { es: 'Casi con la sorpresa 😉', en: 'Almost on the surprise 😉' };

  resultEl.innerHTML =
    '<div class="result-wink ' + (triviaCorrect ? 'wink-correct' : 'wink-close') + '">' +
      '<span class="es">' + wink.es + '</span>' +
      '<span class="en">' + wink.en + '</span>' +
    '</div>' +
    '<p class="result-title es">¡Gracias por compartir! 🙌</p>' +
    '<p class="result-title en">Thanks for sharing! 🙌</p>' +
    '<p class="result-msg es">Me encanta conocerte un poco mejor. Aquí tienes la sección.</p>' +
    '<p class="result-msg en">I love getting to know you a little better. Here is the section.</p>' +
    '<button class="btn btn-submit-quiz es" data-action="reveal" data-section="' + escapeHtml(sectionId) + '">' +
      '<i class="bi bi-unlock-fill"></i> Ver la sección</button>' +
    '<button class="btn btn-submit-quiz en" data-action="reveal" data-section="' + escapeHtml(sectionId) + '">' +
      '<i class="bi bi-unlock-fill"></i> Reveal the section</button>';

  show(resultEl);
}

/* ═══════════════════════════════════════════════════════════
   UNLOCK SECTION
═══════════════════════════════════════════════════════════ */
function unlockSection(sectionId) {
  hide(document.getElementById('quiz-' + sectionId));

  var unlockedFace = document.getElementById('unlocked-' + sectionId);
  show(unlockedFace);

  // Trigger reveal animation (slight delay to let display update)
  setTimeout(function () {
    unlockedFace.classList.add('reveal');
  }, 20);

  // Flash + permanently mark card as unlocked
  var card = document.getElementById('card-' + sectionId);
  if (card) {
    card.classList.add('just-unlocked', 'is-unlocked');
    setTimeout(function () {
      card.classList.remove('just-unlocked');
    }, 1400);
  }

  // Update state
  STATE.sections[sectionId].unlocked = true;
  updateProgress();

  // Scroll card into view
  if (card) {
    setTimeout(function () {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 300);
  }
}

/* ═══════════════════════════════════════════════════════════
   PROGRESS SCORES (in banner) — shows which sections are shared
═══════════════════════════════════════════════════════════ */
function updateScoreBoard(sectionId) {
  // Mark this section as completed (answered)
  STATE.sections[sectionId].completed = true;

  // Show visitor name in banner
  var nameEl = document.getElementById('progressVisitorName');
  if (nameEl && STATE.visitorName) {
    nameEl.textContent = STATE.visitorName + ' ·';
    nameEl.classList.remove('hidden');
  }

  // Rebuild per-section chips
  var labels = {
    personal:   { es: 'Info Personal', en: 'Personal Info' },
    experience: { es: 'Experiencia',   en: 'Experience'    },
    skills:     { es: 'Skills',        en: 'Tech Skills'   }
  };

  var html = '';
  ['personal', 'experience', 'skills'].forEach(function (id) {
    if (!STATE.sections[id].completed) return;
    html +=
      '<div class="score-item score-pass">' +
        '<span class="score-label es">' + labels[id].es + '</span>' +
        '<span class="score-label en">' + labels[id].en + '</span>' +
        '<span class="score-value"><i class="bi bi-check-lg"></i></span>' +
      '</div>';
  });

  var container = document.getElementById('progressScores');
  if (container) {
    container.innerHTML = html;
    container.classList.remove('hidden');
  }
}

/* ═══════════════════════════════════════════════════════════
   PROGRESS TRACKER
═══════════════════════════════════════════════════════════ */
function updateProgress() {
  var count = 0;
  ['personal', 'experience', 'skills'].forEach(function (id) {
    if (STATE.sections[id].unlocked) {
      count++;
      var pip = document.getElementById('pip-' + id);
      if (pip) pip.classList.add('active');
    }
  });

  STATE.unlockedCount = count;

  // Update count display
  var nums = document.querySelectorAll('.unlocked-num');
  nums.forEach(function (el) { el.textContent = count; });
}
