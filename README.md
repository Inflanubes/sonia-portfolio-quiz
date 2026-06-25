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

---

## Project Structure

```
sonia-portfolio-quiz/
├── index.html          Main portfolio page
├── css/
│   └── styles.css      All styling (teal/dark theme, Bootstrap overrides)
├── js/
│   ├── questions.js    All question pools (HP, personal, tech) — bilingual ES/EN
│   ├── tracker.js      Google Sheets logging via Apps Script
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
Delete any existing code and paste the following:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data  = JSON.parse(e.postData.contents);

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

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
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
