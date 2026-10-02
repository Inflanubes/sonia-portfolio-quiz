# Registro de cambios

Qué se ha ido cambiando en el portfolio, de lo más reciente a lo más antiguo.
Los cambios anteriores a este registro están en el historial de git (`git log`).

## 2026-10-02

### Experiencia

- **Acordeón.** Al abrir una etapa se cierran las demás de su lista. Experiencia y
  Formación son listas independientes: abrir un estudio no cierra el puesto abierto.
  (`js/main.js`, listener de `toggle` en el arranque.)
- **Etiqueta de la vista.** La cabecera dice ahora «Experiencia y formación»
  (EN: «Experience and education»). La pestaña del menú sigue siendo «Experiencia».
- **Altitud del titular.** «De doce mil metros a los procesos.» (EN: «From forty
  thousand feet to processes.»). Antes decía diez mil metros / thirty thousand feet;
  el A380 vuela a unos 40.000 pies. La misma cifra se corrigió en el texto de
  Sobre mí («Lo aprendí a doce mil metros»).
- **Formadora y ponente.** Se quitó «Ocho formaciones de IA para empresas privadas».
  La lista queda en este orden:
  1. Dos workshops de IA para niños en Arkeidia, El Molar.
  2. Clase Rooibos de Protocol 418 y clases abiertas en YouTube y Meet.
  3. Formaciones para el grupo de empresarios de la zona norte, con tres temas:
     análisis de procesos y organización de la transformación; seguridad y realidad
     de los datos; qué es la IA y cómo aplicarla con seguridad.
  4. Profesora de automatización con Make en IAW.
- **Sublistas.** Un punto de una etapa puede llevar `sub` con una lista anidada
  (`renderBullets` en `js/main.js`, espaciado en `css/styles.css`).

### Formación

Todas las entradas tienen ahora texto, así que todas se despliegan:

- **Máster en IA y Automatizaciones (IAW, 2025).** Automatización de procesos e IA
  aplicada a negocio; también clases de Make en la propia academia.
- **Full Stack Developer (4Geeks, 2023 – 24).** Lo aprendido según el temario de
  4Geeks: HTML, CSS, JavaScript, React, Python, Flask, SQLAlchemy, APIs REST, Git y
  metodologías ágiles. Se mantiene que aquí se terminó la web de BeBanana.
- **MIB (ISDI, 2022 – 23).** Especialización y trabajo de fin de máster en Growth
  Marketing, con BeBanana como proyecto final. Sustituye a la frase anterior sobre
  un proyecto final de transformación digital para una empresa real.
- **Digital Transformation & Society (Harvard, 2023).** Seminario internacional de
  ISDI y el Real Colegio Complutense en Harvard: una semana intensiva en inglés,
  ponentes de Harvard y MIT, y visitas al MIT Media Lab y al Harvard Innovation Lab.
  Los temas salen de la página actual del programa de ISDI.
- **Ingeniería Informática (UNED, 2017).** Antes no mostraba ni centro ni año.

### Proyectos

- El botón «Ver todos los proyectos» aparece también debajo de la cuadrícula, no
  solo arriba. En la vista de todos los proyectos, ese botón de abajo vuelve a
  «Proyectos destacados».
