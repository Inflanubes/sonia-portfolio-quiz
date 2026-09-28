# Portfolio redesign — tabs, quiz gates and project pages

Approved by Sonia on 2026-09-29. Inspired by acustable.com.

## Goals
- Look professional and easy to scan, keep the quiz as the gate to everything.
- Keep the Google Sheets logging and the Telegram access alert working exactly as today.

## Structure
- Welcome modal (name + email, ES/EN, "Why?" note). Language auto-detected from the browser.
- Open home: headline "TECHNICAL PROCESS ENGINEER", value line, lock overview.
- Tabs: Sobre mí · Experiencia · Proyectos · Skills · Contacto. Hash routes (`#sobre-mi`, `#proyectos/somos`, ...).
- Gates (unchanged section ids for the Sheets log): `personal` → Sobre mí, `experience` → Experiencia + Proyectos, `skills` → Skills. Contacto open.
- Rewards: a curiosity after each unlock; "Curiosidades de Sonia" + Ravenclaw motto when all three are unlocked.
- Unlocks persist in localStorage; the visitor still enters name/email every new session (keeps the Telegram alert per session).

## Content
- All copy lives in `js/content.js` (bilingual). Renderers in `js/main.js`.
- Projects: SOMOS Psicólogos, MÛRA, AstralPet, invoice bot, Protocol 418, BeBanana, personal Lab (interactive iPhone mock with 8 shortcuts, robot team, Hermes).
- Only anonymised images (fictitious client data).

## Visual
- Black/white/greys; turquoise (#00BCD4) only for active tab, hover, links, unlock moments.
- Archivo (condensed) for headlines, DM Sans for body, DM Mono for labels. No Bootstrap.

## Untouched
- `js/tracker.js`, `js/questions.js`, Apps Script, `vercel.json`.
- `scripts/inject-env.js` only relaxed for non-production builds (preview without the env var must not fail).
