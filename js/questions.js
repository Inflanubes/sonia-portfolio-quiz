/**
 * questions.js — Question pools for the quiz-gated portfolio
 *
 * Structure per question:
 *   q:       { es: "...", en: "..." }  — question text
 *   options: [ { es: "...", en: "..." }, ... ]  — 4 choices
 *   correct: Number  — index of the correct option (0–3)
 */

const QUESTIONS = {

  /* ═══════════════════════════════════════════════════════
     SECTION 1 — PERSONAL INFO
     Gate: Harry Potter Trivia (9 questions)
  ═══════════════════════════════════════════════════════ */
  personal: [
    {
      q: {
        es: "¿Cómo se llama la lechuza de Harry Potter?",
        en: "What is Harry Potter's owl called?"
      },
      options: [
        { es: "Errol",       en: "Errol" },
        { es: "Hedwig",      en: "Hedwig" },
        { es: "Pigwidgeon",  en: "Pigwidgeon" },
        { es: "Crookshanks", en: "Crookshanks" }
      ],
      correct: 1
    },
    {
      q: {
        es: "¿Qué hechizo se usa para desarmar al oponente?",
        en: "Which spell is used to disarm an opponent?"
      },
      options: [
        { es: "Avada Kedavra", en: "Avada Kedavra" },
        { es: "Lumos",         en: "Lumos" },
        { es: "Expelliarmus",  en: "Expelliarmus" },
        { es: "Stupefy",       en: "Stupefy" }
      ],
      correct: 2
    },
    {
      q: {
        es: "¿Desde qué andén sale el Expreso de Hogwarts?",
        en: "From which platform does the Hogwarts Express depart?"
      },
      options: [
        { es: "Andén 7",   en: "Platform 7" },
        { es: "Andén 8",   en: "Platform 8" },
        { es: "Andén 10",  en: "Platform 10" },
        { es: "Andén 9¾",  en: "Platform 9¾" }
      ],
      correct: 3
    },
    {
      q: {
        es: "¿En qué casa de Hogwarts estudia Harry Potter?",
        en: "Which Hogwarts house does Harry Potter belong to?"
      },
      options: [
        { es: "Gryffindor",  en: "Gryffindor" },
        { es: "Slytherin",   en: "Slytherin" },
        { es: "Ravenclaw",   en: "Ravenclaw" },
        { es: "Hufflepuff",  en: "Hufflepuff" }
      ],
      correct: 0
    },
    {
      q: {
        es: "¿Qué efecto tiene el hechizo 'Lumos'?",
        en: "What does the spell 'Lumos' do?"
      },
      options: [
        { es: "Levita objetos",                en: "Levitates objects" },
        { es: "Crea luz en la punta de la varita", en: "Creates light at the wand tip" },
        { es: "Protege al lanzador",           en: "Protects the caster" },
        { es: "Hace invisible al lanzador",    en: "Makes the caster invisible" }
      ],
      correct: 1
    },
    {
      q: {
        es: "¿Quién mató a Albus Dumbledore?",
        en: "Who killed Albus Dumbledore?"
      },
      options: [
        { es: "Voldemort",           en: "Voldemort" },
        { es: "Draco Malfoy",        en: "Draco Malfoy" },
        { es: "Severus Snape",       en: "Severus Snape" },
        { es: "Bellatrix Lestrange", en: "Bellatrix Lestrange" }
      ],
      correct: 2
    },
    {
      q: {
        es: "¿Cuál es el verdadero nombre de Voldemort?",
        en: "What is Voldemort's real name?"
      },
      options: [
        { es: "Tom Marvolo Riddle",  en: "Tom Marvolo Riddle" },
        { es: "Merlin Slytherin",    en: "Merlin Slytherin" },
        { es: "Vincent Marvolo",     en: "Vincent Marvolo" },
        { es: "Tom Slytherin",       en: "Tom Slytherin" }
      ],
      correct: 0
    },
    {
      q: {
        es: "¿Qué posición juega Harry Potter en el Quidditch?",
        en: "What position does Harry Potter play in Quidditch?"
      },
      options: [
        { es: "Guardián (Keeper)",     en: "Keeper" },
        { es: "Buscador (Seeker)",     en: "Seeker" },
        { es: "Golpeador (Beater)",    en: "Beater" },
        { es: "Cazador (Chaser)",      en: "Chaser" }
      ],
      correct: 1
    },
    {
      q: {
        es: "¿En qué animal se transforma la profesora McGonagall?",
        en: "What animal can Professor McGonagall transform into?"
      },
      options: [
        { es: "Cuervo negro",   en: "Black raven" },
        { es: "Serpiente",      en: "Snake" },
        { es: "Gato atigrado",  en: "Tabby cat" },
        { es: "Búho gris",      en: "Grey owl" }
      ],
      correct: 2
    }
  ],

  /* ═══════════════════════════════════════════════════════
     SECTION 2 — EXPERIENCE
     Gate: Personal + Professional Values (9 questions)
  ═══════════════════════════════════════════════════════ */
  experience: [
    {
      q: {
        es: "¿Qué te motiva más en un trabajo?",
        en: "What motivates you most in a job?"
      },
      options: [
        { es: "Resolver problemas reales y ver el impacto en el negocio", en: "Solving real problems and seeing the impact on the business" },
        { es: "El salario y los beneficios económicos",                   en: "The salary and financial benefits" },
        { es: "Trabajar únicamente con las tecnologías más modernas",     en: "Working exclusively with the latest technologies" },
        { es: "Tener total flexibilidad sin compromisos",                 en: "Having full flexibility without commitments" }
      ],
      correct: 0
    },
    {
      q: {
        es: "¿En un equipo, qué rol sueles tomar naturalmente?",
        en: "In a team, what role do you naturally take?"
      },
      options: [
        { es: "Tomo todas las decisiones yo solo/a",      en: "I make all decisions on my own" },
        { es: "Facilito la comunicación y me adapto al equipo", en: "I facilitate communication and adapt to the team" },
        { es: "Sigo instrucciones sin cuestionarlas",     en: "I follow instructions without questioning them" },
        { es: "Prefiero trabajar siempre en solitario",   en: "I always prefer to work alone" }
      ],
      correct: 1
    },
    {
      q: {
        es: "¿Cómo prefieres aprender algo nuevo?",
        en: "How do you prefer to learn something new?"
      },
      options: [
        { es: "Leyendo mucha documentación antes de empezar",    en: "Reading lots of documentation before starting" },
        { es: "Viendo tutoriales pasivamente",                   en: "Watching tutorials passively" },
        { es: "Practicando directamente con proyectos reales",   en: "Practicing directly with real projects" },
        { es: "Esperando a que alguien me enseñe paso a paso",   en: "Waiting for someone to teach me step by step" }
      ],
      correct: 2
    },
    {
      q: {
        es: "Cuando empiezas un nuevo proyecto, ¿cuál es tu primer paso?",
        en: "When starting a new project, what is your first step?"
      },
      options: [
        { es: "Analizar el problema y escribir los requisitos antes de codificar", en: "Analyze the problem and write requirements before coding" },
        { es: "Empezar a codificar lo antes posible para no perder tiempo",        en: "Start coding as soon as possible to not waste time" },
        { es: "Buscar un template en internet y adaptarlo",                        en: "Search for a template online and adapt it" },
        { es: "Delegar toda la planificación a otro compañero",                    en: "Delegate all planning to a teammate" }
      ],
      correct: 0
    },
    {
      q: {
        es: "¿Para qué sirve mejor la automatización en un negocio?",
        en: "What is automation best used for in a business?"
      },
      options: [
        { es: "Para reemplazar por completo a todos los empleados",     en: "To completely replace all employees" },
        { es: "Para eliminar tareas repetitivas y liberar tiempo para lo importante", en: "To eliminate repetitive tasks and free time for what matters" },
        { es: "Para complicar los procesos y añadir capas técnicas",    en: "To complicate processes and add technical layers" },
        { es: "Para justificar inversiones tecnológicas ante clientes", en: "To justify tech investments to clients" }
      ],
      correct: 1
    },
    {
      q: {
        es: "¿Qué importa más en una solución tecnológica?",
        en: "What matters most in a tech solution?"
      },
      options: [
        { es: "Que use las tecnologías más modernas disponibles",  en: "That it uses the latest available technologies" },
        { es: "Que resuelva el problema real del negocio",         en: "That it solves the real business problem" },
        { es: "Que sea la más rápida de construir",               en: "That it is the fastest to build" },
        { es: "Que visualmente impresione al cliente",            en: "That it visually impresses the client" }
      ],
      correct: 1
    },
    {
      q: {
        es: "¿Cómo manejas un bloqueo en una tarea?",
        en: "How do you handle being blocked on a task?"
      },
      options: [
        { es: "Me frustro y abandono la tarea",                             en: "I get frustrated and abandon the task" },
        { es: "Sigo intentando lo mismo indefinidamente",                   en: "I keep trying the same approach indefinitely" },
        { es: "Analizo la causa raíz y pido ayuda si es necesario",         en: "I analyze the root cause and ask for help if needed" },
        { es: "Espero a que el problema se resuelva por sí solo",           en: "I wait for the problem to resolve itself" }
      ],
      correct: 2
    },
    {
      q: {
        es: "¿Qué significa para ti la comunicación efectiva?",
        en: "What does effective communication mean to you?"
      },
      options: [
        { es: "Transmitir ideas con claridad adaptándome al interlocutor",  en: "Conveying ideas clearly while adapting to the audience" },
        { es: "Hablar lo máximo posible en cada reunión",                   en: "Talking as much as possible in each meeting" },
        { es: "Escribir emails muy largos y detallados",                    en: "Writing very long and detailed emails" },
        { es: "Evitar siempre las conversaciones difíciles",                en: "Always avoiding difficult conversations" }
      ],
      correct: 0
    },
    {
      q: {
        es: "¿Cuál es tu mayor fortaleza profesional?",
        en: "What is your biggest professional strength?"
      },
      options: [
        { es: "Mis conocimientos técnicos especializados",                           en: "My specialized technical knowledge" },
        { es: "Mi velocidad de trabajo sin importar la calidad",                     en: "My work speed regardless of quality" },
        { es: "Mi capacidad de trabajar completamente solo/a sin necesitar a nadie", en: "My ability to work completely alone without needing anyone" },
        { es: "Entender el negocio y traducirlo en soluciones técnicas concretas",   en: "Understanding the business and translating it into concrete technical solutions" }
      ],
      correct: 3
    }
  ],

  /* ═══════════════════════════════════════════════════════
     SECTION 3 — TECHNICAL SKILLS
     Gate: Tech Questions (9 questions)
  ═══════════════════════════════════════════════════════ */
  skills: [
    {
      q: {
        es: "¿Qué significa la sigla REST en desarrollo web?",
        en: "What does REST stand for in web development?"
      },
      options: [
        { es: "Remote Execution Standard Transfer", en: "Remote Execution Standard Transfer" },
        { es: "Representational State Transfer",    en: "Representational State Transfer" },
        { es: "Resource Exchange System Tool",      en: "Resource Exchange System Tool" },
        { es: "Rapid Event Streaming Technology",   en: "Rapid Event Streaming Technology" }
      ],
      correct: 1
    },
    {
      q: {
        es: "¿Para qué sirve Git en el desarrollo de software?",
        en: "What is Git used for in software development?"
      },
      options: [
        { es: "Control de versiones del código fuente",  en: "Version control of source code" },
        { es: "Gestionar bases de datos relacionales",   en: "Managing relational databases" },
        { es: "Desplegar aplicaciones en producción",    en: "Deploying applications to production" },
        { es: "Compilar código Python en binarios",      en: "Compiling Python code into binaries" }
      ],
      correct: 0
    },
    {
      q: {
        es: "¿Qué es una API en el contexto del software?",
        en: "What is an API in the context of software?"
      },
      options: [
        { es: "Un lenguaje de programación orientado a objetos",          en: "An object-oriented programming language" },
        { es: "Una interfaz que permite la comunicación entre dos sistemas", en: "An interface that allows communication between two systems" },
        { es: "Una base de datos en la nube",                             en: "A cloud-based database" },
        { es: "Un sistema de autenticación de usuarios",                  en: "A user authentication system" }
      ],
      correct: 1
    },
    {
      q: {
        es: "¿Qué es React?",
        en: "What is React?"
      },
      options: [
        { es: "Una librería de JavaScript para construir interfaces de usuario", en: "A JavaScript library for building user interfaces" },
        { es: "Un lenguaje de programación de backend",                          en: "A backend programming language" },
        { es: "Un sistema de gestión de bases de datos",                         en: "A database management system" },
        { es: "Un framework de Python para desarrollo web",                      en: "A Python framework for web development" }
      ],
      correct: 0
    },
    {
      q: {
        es: "¿Qué significa SQL?",
        en: "What does SQL stand for?"
      },
      options: [
        { es: "Server Query Loader",      en: "Server Query Loader" },
        { es: "Simple Queue Logic",       en: "Simple Queue Logic" },
        { es: "Structured Query Language", en: "Structured Query Language" },
        { es: "System Query List",        en: "System Query List" }
      ],
      correct: 2
    },
    {
      q: {
        es: "¿Qué herramienta se asocia con automatización de flujos sin código (no-code)?",
        en: "Which tool is associated with no-code workflow automation?"
      },
      options: [
        { es: "React",       en: "React" },
        { es: "Flask",       en: "Flask" },
        { es: "Docker",      en: "Docker" },
        { es: "Make / N8N",  en: "Make / N8N" }
      ],
      correct: 3
    },
    {
      q: {
        es: "¿Qué significa 'Full Stack' en desarrollo de software?",
        en: "What does 'Full Stack' mean in software development?"
      },
      options: [
        { es: "Solo desarrollo de APIs backend",         en: "Only backend API development" },
        { es: "Solo diseño de interfaces de usuario",    en: "Only user interface design" },
        { es: "Desarrollo frontend + backend",           en: "Frontend + backend development" },
        { es: "Gestión de servidores e infraestructura", en: "Server and infrastructure management" }
      ],
      correct: 2
    },
    {
      q: {
        es: "¿Qué es un webhook?",
        en: "What is a webhook?"
      },
      options: [
        { es: "Un tipo especial de base de datos",                                  en: "A special type of database" },
        { es: "Una petición HTTP que se dispara automáticamente ante un evento",    en: "An HTTP request triggered automatically by an event" },
        { es: "Una herramienta visual de diseño de interfaces",                     en: "A visual interface design tool" },
        { es: "Un protocolo de seguridad para cifrar datos",                        en: "A security protocol for encrypting data" }
      ],
      correct: 1
    },
    {
      q: {
        es: "¿Cuál es el rol principal de Flask en Python?",
        en: "What is the main role of Flask in Python?"
      },
      options: [
        { es: "Un gestor de paquetes como pip",           en: "A package manager like pip" },
        { es: "Una librería de visualización de datos",   en: "A data visualization library" },
        { es: "Un ORM para interactuar con bases de datos", en: "An ORM for interacting with databases" },
        { es: "Un microframework web ligero",             en: "A lightweight web microframework" }
      ],
      correct: 3
    }
  ]
};
