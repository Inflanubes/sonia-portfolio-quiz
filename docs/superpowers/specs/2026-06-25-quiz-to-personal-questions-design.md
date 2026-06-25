# Spec: De "test" a "conócete" — preguntas sobre el visitante

**Fecha:** 2026-06-25
**Proyecto:** sonia-portfolio-quiz

## Problema

El portfolio actual bloquea cada sección tras un test de conocimiento
(acertar ≥2/3). Al rellenar un test de respuestas correctas, Sonia **no
averigua nada sobre la persona** que visita su web. Quiere convertir la
mecánica en preguntas que la persona responde **sobre sí misma**, ligadas al
tema de cada sección, para conocerla.

## Objetivo

Cada sección se desbloquea cuando el visitante **comparte algo sobre sí
mismo**, no cuando acierta un examen. Se conserva un toque de juego (1 trivia
por diversión), el diseño visual, el bilingüismo ES/EN y el registro en
Google Sheets.

## Mecánica nueva (por sección)

Cada una de las 3 secciones (Personal, Experiencia, Skills) muestra:

1. **1 pregunta de trivia** — tipo test, 4 opciones, con respuesta correcta.
   - Sale **aleatoria** de un pool.
   - Es **obligatorio elegir una opción**, pero **acertar o no NO afecta** al
     desbloqueo.
   - Al enviar se muestra un guiño: acierto (*"¡Acertaste! ✨"*) o fallo
     (*"Casi 😉"*).
2. **2 preguntas personales** — **texto libre**, **obligatorio escribir algo**.
   - Salen **2 al azar** de un pool de ~5 por sección.

**Regla de desbloqueo:** opción de trivia seleccionada **y** las 2 cajas de
texto con contenido (tras `trim()`). Desaparece por completo el sistema de
score / pass / fail / reintento por suspenso, y el "bypass" de texto abierto
que hoy existe solo en Experiencia.

## Temas y pools

| Sección | Trivia | Personales (pool ~5, salen 2) |
|---|---|---|
| 🧙 Personal | Harry Potter *(pool actual se conserva)* | Gustos, personalidad, vida |
| 💼 Experiencia | Curiosidades del mundo del trabajo *(pool nuevo)* | Trayectoria, retos, qué busca |
| ⚙️ Skills | Tecnología *(pool actual se conserva)* | Relación con la tech, qué le gusta crear |

Todas las preguntas (trivia y personales) son bilingües `{ es, en }`.

## Cambios técnicos

### `js/questions.js`
- Nueva estructura por sección:
  ```js
  QUESTIONS[sectionId] = {
    trivia:   [ { q:{es,en}, options:[{es,en}...], correct:Number }, ... ],
    personal: [ { q:{es,en} }, ... ]   // sin options ni correct
  }
  ```
- Trivia Personal = pool HP actual. Trivia Skills = pool tech actual.
- Trivia Experiencia = pool nuevo de curiosidades laborales.
- 3 pools `personal` nuevos (~5 preguntas cada uno).

### `js/main.js`
- `drawQuestions(sectionId)` → devuelve `{ trivia: <1 obj>, personal: <2 objs> }`,
  manteniendo la lógica de "no repetir dentro de la sesión" para cada pool.
- `renderQuestions` → pinta 1 bloque de opción múltiple (trivia) + 2 bloques
  con `<textarea>` para las personales. Mantiene los `<span class="es/en">`.
- `submitQuiz`:
  - Validar: trivia con opción marcada + ambas textarea no vacías; si falta
    algo, resaltar lo que falta (reutilizar el patrón de `highlightUnanswered`).
  - Calcular si la trivia es correcta solo para el guiño y para `Score`.
  - Llamar a `TRACKER.log` y luego `unlockSection` (siempre que esté completo).
- Eliminar: `showFailResult`, `retryQuiz` (y su listener), lógica de score 2/3,
  y el bloque `open-text-experience`.
- `unlockSection`: añadir el guiño de la trivia + un agradecimiento.

### `index.html`
- En cada sección: ya existen los contenedores `quiz-*`, `questions-*`,
  `actions-*`, `unlocked-*`. Se reutilizan. Quitar el campo abierto de
  Experiencia si está en el HTML. Ajustar textos de cabecera del quiz
  ("Responde para descubrir" en vez de "Supera el test").

### `css/styles.css`
- Estilo para `<textarea>` coherente con el tema (teal/oscuro).

### Google Sheets / `js/tracker.js`
- **El formato NO cambia.** Mapeo:
  - `q1`/`a1` = pregunta de trivia + opción elegida.
  - `q2`/`a2` y `q3`/`a3` = preguntas personales + texto escrito.
  - `score` = `"✓ trivia"` o `"✗ trivia"` (si acertó la de diversión).
  - `result` = `"Completado"` / `"Completed"`.
  - `c1` = acierto de la trivia; `c2`/`c3` = `true` (sin concepto de correcto).
- **No hay que tocar el Apps Script ni la hoja.**

## Fuera de alcance (YAGNI)
- No se añade login, ni guardado de progreso entre visitas, ni panel de admin.
- No se cambia el proveedor de logging (sigue Google Sheets vía Apps Script).
- No se rediseña la maqueta ni la paleta.

## Criterio de éxito
- Un visitante abre cada sección escribiendo 2 respuestas personales + 1 trivia.
- Las respuestas de texto llegan a Google Sheets legibles.
- No queda rastro de "aprobado/suspenso" ni de reintentos por fallar.
- Funciona en ES y EN.
