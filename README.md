# Sonia Lacarra Molina — Interactive Quiz Portfolio

A portfolio website where each section is locked behind a quiz.
Built with Bootstrap 5, Cinzel + DM Sans fonts, and vanilla JS.
Deployable on Vercel as a static site — no build tools required.

---

## How It Works

Each section asks the visitor **1 fun trivia question + 2 open questions about
themselves**. The goal is to get to know the visitor, not to test them.

| Section | Trivia (just a wink) | Personal questions (free text) |
|---|---|---|
| 🧙 Personal Info | Harry Potter | Tastes, personality, life |
| 💼 Experience | World of work | Career, challenges, what they seek |
| ⚙️ Technical Skills | Tech | Their relationship with technology |

- Visitors enter their **name and email** before starting any section.
- Per attempt: **1 random trivia** + **2 random personal questions** (drawn from
  larger pools so they vary between visitors).
- **Unlock rule:** pick a trivia option **and** write something in both text
  boxes. Getting the trivia right is only a wink — it never blocks the unlock.
- All answers (including the free-text ones) are logged to Google Sheets.
- The moment a visitor enters their name and email, you get a **Telegram
  alert** with both (sent server-side by the same Apps Script, so the bot
  token never reaches the browser).

---

## Project Structure

```
sonia-portfolio-quiz/
├── index.html          Main portfolio page
├── css/
│   └── styles.css      All styling (teal/dark theme, Bootstrap overrides)
├── js/
│   ├── questions.js    All question pools (HP, personal, tech) — bilingual ES/EN
│   ├── tracker.js      Google Sheets logging + Telegram access alert via Apps Script
│   └── main.js         Quiz engine, unlock flow, language toggle
├── assets/
│   └── foto_cv.jpg     Profile photo (copy here from CV Sonia folder)
└── README.md
```

---

## Setup: Profile Photo

Copy your photo to the `assets/` folder:

```
Copy:  C:\Users\Usuario\Documents\CV Sonia\foto_cv.jpg
To:    C:\Users\Usuario\Documents\sonia-portfolio-quiz\assets\foto_cv.jpg
```

---

## Setup: Google Sheets Tracker

### Step 1 — Create the Google Sheet

Create a new Google Sheet and add these column headers in row 1:

| A | B | C | D | E | F | G | H | I | J | K | L | M |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Timestamp | Name | Email | Language | Section | Q1 | A1 | Q2 | A2 | Q3 | A3 | Score | Result |

### Step 2 — Add the Apps Script

In your Google Sheet, go to **Extensions → Apps Script**.
Delete any existing code and paste the following (it handles both the
Sheets logging and the Telegram access alert):

```javascript
// ── Telegram settings ──
// Stored in Project Settings → Script Properties (never hardcode them here):
//   TELEGRAM_BOT_TOKEN  → token given by @BotFather
//   TELEGRAM_CHAT_ID    → your chat id (see README, step 2)

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // 1) Access alert: visitor has just entered name + email → Telegram
    if (data.event === 'access') {
      sendTelegramAccessAlert(data);
      return jsonResponse({ success: true, event: 'access' });
    }

    // 2) Quiz submission → Google Sheet row (unchanged)
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.email,
      data.language,
      data.section,
      data.q1, data.a1,
      data.q2, data.a2,
      data.q3, data.a3,
      data.score,
      data.result
    ]);

    return jsonResponse({ success: true });

  } catch (error) {
    return jsonResponse({ error: error.message });
  }
}

function sendTelegramAccessAlert(data) {
  var props  = PropertiesService.getScriptProperties();
  var token  = props.getProperty('TELEGRAM_BOT_TOKEN');
  var chatId = props.getProperty('TELEGRAM_CHAT_ID');

  if (!token || !chatId) {
    throw new Error('TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not set in Script Properties');
  }

  var when = data.timestamp
    ? Utilities.formatDate(new Date(data.timestamp), 'Europe/Madrid', 'dd/MM/yyyy HH:mm')
    : '';

  var text =
    '🔔 <b>Nuevo acceso a tu CV</b>\n' +
    '👤 ' + escapeHtml(data.name  || '—') + '\n' +
    '✉️ ' + escapeHtml(data.email || '—') + '\n' +
    '🌐 ' + escapeHtml(data.language || '') +
    (when ? '   🕒 ' + when : '');

  var response = UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
    method:             'post',
    contentType:        'application/json',
    payload:            JSON.stringify({ chat_id: chatId, text: text, parse_mode: 'HTML' }),
    muteHttpExceptions: true
  });

  if (response.getResponseCode() !== 200) {
    throw new Error('Telegram API error: ' + response.getContentText());
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Run this once from the editor (Run button) to check the Telegram setup.
function testTelegram() {
  sendTelegramAccessAlert({
    timestamp: new Date().toISOString(),
    name:      'Prueba',
    email:     'prueba@ejemplo.com',
    language:  'ES'
  });
}
```

### Step 3 — Deploy as Web App

1. Click **Deploy → New deployment**
2. Select type: **Web app**
3. Set **Execute as**: Me
4. Set **Who has access**: Anyone
5. Click **Deploy** and copy the URL (it looks like `https://script.google.com/macros/s/XXXX.../exec`)

### Step 4 — Add the URL to the project

Open `js/tracker.js` and replace the placeholder:

```js
// Before:
APPS_SCRIPT_URL: 'REPLACE_WITH_YOUR_APPS_SCRIPT_URL',

// After (your actual URL):
APPS_SCRIPT_URL: 'https://script.google.com/macros/s/YOUR_ID_HERE/exec',
```

---

## Setup: Telegram Access Alerts

Every time a visitor enters their name and email you receive a Telegram message
like:

```
🔔 Nuevo acceso a tu CV
👤 Ana García
✉️ ana@empresa.com
🌐 ES   🕒 03/09/2026 18:42
```

### Step 1 — Create the bot

1. In Telegram, open **@BotFather** and send `/newbot`.
2. Give it a name and a username (must end in `bot`).
3. Copy the **token** it returns (looks like `123456789:AAF...`).

### Step 2 — Get your chat id

1. Open a chat with your new bot and send it any message (e.g. `hola`).
2. In a browser, open (replace `<TOKEN>` with your token):

   ```
   https://api.telegram.org/bot<TOKEN>/getUpdates
   ```
3. Find `"chat":{"id":123456789,...}` in the response — that number is your
   **chat id**.

### Step 3 — Store both in Apps Script (never in the code)

In the Apps Script editor: **Project Settings (⚙️) → Script Properties → Add
script property**:

| Property | Value |
|---|---|
| `TELEGRAM_BOT_TOKEN` | the token from BotFather |
| `TELEGRAM_CHAT_ID` | your chat id |

### Step 4 — Test and redeploy

1. In the editor, select the `testTelegram` function and click **Run**.
   The first time, Google will ask you to authorise the script (it now needs
   permission to call external services). You should receive a test message.
2. **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy.**
   The web app URL stays the same, so nothing changes on Vercel — but without
   this step the live site keeps using the old code and no alerts are sent.

---

## Deploy to GitHub + Vercel

### 1. Push to GitHub

```bash
# Create a new repo on github.com called: sonia-portfolio-quiz
# Then, in this folder:

git init
git add .
git commit -m "Initial commit: quiz-gated portfolio"
git remote add origin https://github.com/inflanubes/sonia-portfolio-quiz.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and log in
2. Click **Add New → Project**
3. Import your `sonia-portfolio-quiz` repository
4. **No build configuration needed** — it's a static site
5. Click **Deploy**

Vercel will give you a live URL immediately. You can also add a custom domain later from the Vercel dashboard.

---

## Local Development

Just open `index.html` in your browser — no server required.

For best results (to avoid `file://` CORS issues with the tracker):
```bash
# Using Python:
python -m http.server 3000
# Then open: http://localhost:3000
```

---

## Customising Questions

Edit `js/questions.js`. Each section has two pools — `trivia` and `personal`.

A **trivia** question (multiple choice, has a correct answer used only for the
fun wink):

```js
{
  q: { es: "Pregunta en español", en: "Question in English" },
  options: [
    { es: "Opción A", en: "Option A" },
    { es: "Opción B", en: "Option B" },
    { es: "Opción C", en: "Option C" },
    { es: "Opción D", en: "Option D" }
  ],
  correct: 0  // index of the correct option (0 = first)
}
```

A **personal** question (free text — no options, no correct answer):

```js
{
  q: { es: "¿Qué te hace perder la noción del tiempo?",
       en: "What makes you lose track of time?" }
}
```

Add as many as you like to each pool; 1 trivia + 2 personal are drawn at random
per attempt.

---

## Tech Stack

- **Bootstrap 5** (CDN) — layout, modal, components
- **Bootstrap Icons** (CDN) — icon set
- **Google Fonts**: Cinzel (headings) + DM Sans (body)
- **Vanilla JS** — quiz engine, no frameworks
- **Google Apps Script** — serverless Google Sheets logging
