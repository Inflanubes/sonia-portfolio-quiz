/**
 * tracker.js — Google Sheets logging via Google Apps Script Web App
 *
 * HOW TO CONFIGURE:
 *   1. Create your Google Sheet and Apps Script Web App (see README.md for full steps).
 *   2. Replace APPS_SCRIPT_URL below with your deployed Web App URL.
 *   3. The URL looks like: https://script.google.com/macros/s/XXXX.../exec
 *
 * NOTE: We use mode: 'no-cors' because the Apps Script response won't include
 *       CORS headers for browser requests. The POST still goes through and
 *       the row is written — we just can't read the response body.
 */

const TRACKER = {

  // ← PASTE YOUR DEPLOYED APPS SCRIPT URL HERE
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbygw5_j39p7mPr6knG2zfnNAM2-W5Pbo5iI17anLdBQAEoy2JZurE3PEK4tsJLhlrpyxQ/exec',

  /**
   * Log a quiz submission to Google Sheets.
   *
   * @param {Object} data
   *   @param {string} data.timestamp  — ISO date string
   *   @param {string} data.name       — visitor's name
   *   @param {string} data.email      — visitor's email
   *   @param {string} data.language   — 'ES' or 'EN'
   *   @param {string} data.section    — 'personal' | 'experience' | 'skills'
   *   @param {string} data.q1         — question 1 text
   *   @param {string} data.a1         — answer 1 text
   *   @param {string} data.q2         — question 2 text
   *   @param {string} data.a2         — answer 2 text
   *   @param {string} data.q3         — question 3 text
   *   @param {string} data.a3         — answer 3 text
   *   @param {string} data.score      — e.g. '2/3'
   *   @param {string} data.result     — 'Pass' or 'Fail'
   */
  log(data) {
    // Skip silently if URL has not been configured
    if (!this.APPS_SCRIPT_URL || this.APPS_SCRIPT_URL.includes('REPLACE')) {
      console.info('[Tracker] Apps Script URL not configured — skipping log.');
      return;
    }

    fetch(this.APPS_SCRIPT_URL, {
      method:  'POST',
      mode:    'no-cors',       // Required for Apps Script (no CORS headers)
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(data)
    }).catch(function (err) {
      // Silent fail — tracking should never break the UX
      console.warn('[Tracker] Failed to log submission:', err);
    });
  }
};
