/**
 * tracker.js — Google Sheets logging via Google Apps Script Web App
 *
 * HOW TO CONFIGURE:
 *   The URL below is injected at build time from the APPS_SCRIPT_URL environment variable.
 *   Set it in your .env (local) or in the Vercel dashboard (production).
 *   Never hardcode the real URL here — this placeholder is replaced by scripts/inject-env.js.
 *
 * NOTE: We use mode: 'no-cors' because the Apps Script response won't include
 *       CORS headers for browser requests. The POST still goes through and
 *       the row is written — we just can't read the response body.
 */

const TRACKER = {

  APPS_SCRIPT_URL: '__APPS_SCRIPT_URL__',

  /**
   * Log a quiz submission to Google Sheets.
   *
   * @param {Object} data
   *   @param {string} data.timestamp  — ISO date string
   *   @param {string} data.name       — visitor's name
   *   @param {string} data.email      — visitor's email
   *   @param {string} data.language   — 'ES' or 'EN'
   *   @param {string} data.section    — 'personal' | 'experience' | 'skills'
   *   @param {string} data.q1         — trivia question text
   *   @param {string} data.a1         — trivia option chosen by the visitor
   *   @param {string} data.q2         — personal question 1 text
   *   @param {string} data.a2         — personal answer 1 (free text)
   *   @param {string} data.q3         — personal question 2 text
   *   @param {string} data.a3         — personal answer 2 (free text)
   *   @param {string} data.score      — '✓ trivia' or '✗ trivia' (fun wink only)
   *   @param {string} data.result     — 'Completado' / 'Completed'
   */
  log(data) {
    // Queue locally if URL has not been injected by the build step
    if (!this.APPS_SCRIPT_URL || this.APPS_SCRIPT_URL.startsWith('__')) {
      console.info('[Tracker] Apps Script URL not configured — queuing locally.');
      this._queueLocally(data);
      return;
    }

    fetch(this.APPS_SCRIPT_URL, {
      method:  'POST',
      mode:    'no-cors',       // Required for Apps Script (no CORS headers)
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(data)
    }).catch(function (err) {
      // On network failure, save locally so data is not lost
      console.warn('[Tracker] Failed to log submission — queuing locally:', err);
      TRACKER._queueLocally(data);
    });
  },

  _queueLocally(data) {
    try {
      var queue = JSON.parse(sessionStorage.getItem('tracker_queue') || '[]');
      queue.push(data);
      sessionStorage.setItem('tracker_queue', JSON.stringify(queue));
    } catch (e) {
      console.warn('[Tracker] Could not save to sessionStorage:', e);
    }
  }
};
