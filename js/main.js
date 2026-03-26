/**
 * main.js — Quiz engine, unlock flow, language toggle
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
    personal:   { unlocked: false, askedIndices: [] },
    experience: { unlocked: false, askedIndices: [] },
    skills:     { unlocked: false, askedIndices: [] }
  },
  currentQuestions: {}   // { sectionId: [questionObjects] }
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

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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
function drawQuestions(sectionId) {
  var pool   = QUESTIONS[sectionId];
  var asked  = STATE.sections[sectionId].askedIndices;

  // Build list of indices not yet asked
  var available = [];
  for (var i = 0; i < pool.length; i++) {
    if (asked.indexOf(i) === -1) available.push(i);
  }

  // If fewer than 3 available, reset the pool and use all
  if (available.length < 3) {
    STATE.sections[sectionId].askedIndices = [];
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

  // Pick first 3
  var chosen = available.slice(0, 3);

  // Mark as asked
  STATE.sections[sectionId].askedIndices =
    STATE.sections[sectionId].askedIndices.concat(chosen);

  // Return question objects
  return chosen.map(function (idx) {
    return Object.assign({}, pool[idx], { poolIndex: idx });
  });
}

/* ═══════════════════════════════════════════════════════════
   RENDER QUESTIONS
═══════════════════════════════════════════════════════════ */
function renderQuestions(sectionId, questions) {
  var container = document.getElementById('questions-' + sectionId);
  if (!container) return;

  var html = questions.map(function (q, qIdx) {
    var optionsHtml = q.options.map(function (opt, oIdx) {
      return (
        '<label class="option-label" onclick="selectOption(this)">' +
          '<input type="radio" name="q' + qIdx + '_' + sectionId + '" value="' + oIdx + '" class="option-radio">' +
          '<span class="option-text es">' + escapeHtml(opt.es) + '</span>' +
          '<span class="option-text en">' + escapeHtml(opt.en) + '</span>' +
        '</label>'
      );
    }).join('');

    return (
      '<div class="question-block" data-question="' + qIdx + '">' +
        '<p class="question-text es">' + (qIdx + 1) + '. ' + escapeHtml(q.q.es) + '</p>' +
        '<p class="question-text en">' + (qIdx + 1) + '. ' + escapeHtml(q.q.en) + '</p>' +
        '<div class="options-list">' + optionsHtml + '</div>' +
      '</div>'
    );
  }).join('');

  container.innerHTML = html;
}

/* Visual feedback when an option is clicked */
function selectOption(labelEl) {
  // Deselect siblings in the same question block
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

  var questions = drawQuestions(sectionId);
  STATE.currentQuestions[sectionId] = questions;

  renderQuestions(sectionId, questions);

  // Show quiz face, hide locked face
  hide(document.getElementById('locked-' + sectionId));
  hide(document.getElementById('result-' + sectionId));
  show(document.getElementById('questions-' + sectionId));
  show(document.getElementById('actions-' + sectionId));
  show(document.getElementById('quiz-' + sectionId));
}

/* ═══════════════════════════════════════════════════════════
   SUBMIT QUIZ
═══════════════════════════════════════════════════════════ */
function submitQuiz(sectionId) {
  var questions = STATE.currentQuestions[sectionId];
  if (!questions || questions.length === 0) return;

  var score = 0;
  var answeredQuestions = [];
  var answeredAnswers   = [];
  var allAnswered = true;

  questions.forEach(function (q, qIdx) {
    var selected = document.querySelector(
      'input[name="q' + qIdx + '_' + sectionId + '"]:checked'
    );
    if (!selected) {
      allAnswered = false;
      return;
    }
    var chosenIdx = parseInt(selected.value, 10);
    answeredQuestions.push(q.q[STATE.lang]);
    answeredAnswers.push(q.options[chosenIdx][STATE.lang]);
    if (chosenIdx === q.correct) score++;
  });

  if (!allAnswered) {
    highlightUnanswered(sectionId, questions.length);
    return;
  }

  var passed = score >= 2;

  // Log to Google Sheets
  TRACKER.log({
    timestamp: new Date().toISOString(),
    name:      STATE.visitorName,
    email:     STATE.visitorEmail,
    language:  STATE.lang.toUpperCase(),
    section:   sectionId,
    q1: answeredQuestions[0] || '',
    a1: answeredAnswers[0]   || '',
    q2: answeredQuestions[1] || '',
    a2: answeredAnswers[1]   || '',
    q3: answeredQuestions[2] || '',
    a3: answeredAnswers[2]   || '',
    score:  score + '/3',
    result: passed ? 'Pass' : 'Fail'
  });

  if (passed) {
    unlockSection(sectionId);
  } else {
    showFailResult(sectionId, score);
  }
}

/* Highlight questions that haven't been answered */
function highlightUnanswered(sectionId, totalQuestions) {
  for (var i = 0; i < totalQuestions; i++) {
    var answered = document.querySelector(
      'input[name="q' + i + '_' + sectionId + '"]:checked'
    );
    if (!answered) {
      var block = document.querySelector(
        '#questions-' + sectionId + ' [data-question="' + i + '"]'
      );
      if (block) {
        block.style.border = '1px solid rgba(239,83,80,0.5)';
        setTimeout(function (b) {
          return function () { b.style.border = ''; };
        }(block), 1800);
      }
    }
  }
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

  // Flash the card border
  var card = document.getElementById('card-' + sectionId);
  if (card) {
    card.classList.add('just-unlocked');
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
   SHOW FAIL RESULT
═══════════════════════════════════════════════════════════ */
function showFailResult(sectionId, score) {
  hide(document.getElementById('questions-' + sectionId));
  hide(document.getElementById('actions-' + sectionId));

  var resultEl = document.getElementById('result-' + sectionId);

  var failMessages = {
    personal: {
      es: 'El Sombrero Seleccionador no está convencido todavía... 🎩 Vuelve a intentarlo.',
      en: 'The Sorting Hat isn\'t convinced yet... 🎩 Give it another try.'
    },
    experience: {
      es: 'Interesante perfil, pero aún no es suficiente. 🧭 ¡Inténtalo de nuevo!',
      en: 'Interesting profile, but not quite there yet. 🧭 Try again!'
    },
    skills: {
      es: 'El sistema necesita un poco más de código antes de abrirse. 💻 ¡Otra oportunidad!',
      en: 'The system needs a bit more code before it opens. 💻 One more shot!'
    }
  };

  var msg = failMessages[sectionId] || { es: '¡Inténtalo de nuevo!', en: 'Try again!' };

  resultEl.innerHTML =
    '<div class="result-score fail">' + score + '/3</div>' +
    '<p class="result-title es">Casi... ¡pero no es suficiente!</p>' +
    '<p class="result-title en">So close... but not quite!</p>' +
    '<p class="result-msg es">' + msg.es + '</p>' +
    '<p class="result-msg en">' + msg.en + '</p>' +
    '<button class="btn btn-retry es" onclick="retryQuiz(\'' + sectionId + '\')">🔄 Intentar de nuevo</button>' +
    '<button class="btn btn-retry en" onclick="retryQuiz(\'' + sectionId + '\')">🔄 Try again</button>';

  show(resultEl);
}

/* ═══════════════════════════════════════════════════════════
   RETRY QUIZ
═══════════════════════════════════════════════════════════ */
function retryQuiz(sectionId) {
  var questions = drawQuestions(sectionId);
  STATE.currentQuestions[sectionId] = questions;
  renderQuestions(sectionId, questions);

  hide(document.getElementById('result-' + sectionId));
  show(document.getElementById('questions-' + sectionId));
  show(document.getElementById('actions-' + sectionId));
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
