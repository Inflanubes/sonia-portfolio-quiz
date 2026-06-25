/**
 * questions.js — Question pools for the "get to know you" portfolio
 *
 * Each section has TWO pools:
 *
 *   trivia[]   — fun multiple-choice question (has a correct answer, but
 *                getting it right is NOT required to unlock — just a wink)
 *     q:       { es, en }            — question text
 *     options: [ { es, en }, ... ]  — 4 choices
 *     correct: Number               — index of the correct option (0–3)
 *
 *   personal[] — open questions ABOUT THE VISITOR (free text, required)
 *     q:       { es, en }            — question text
 *
 * Per attempt: 1 random trivia + 2 random personal questions are drawn.
 */

const QUESTIONS = {

  /* ═══════════════════════════════════════════════════════
     SECTION 1 — PERSONAL INFO
     Trivia: Harry Potter · Personal: tastes, personality, life
  ═══════════════════════════════════════════════════════ */
  personal: {
    trivia: [
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
          { es: "Guardián (Keeper)",  en: "Keeper" },
          { es: "Buscador (Seeker)",  en: "Seeker" },
          { es: "Golpeador (Beater)", en: "Beater" },
          { es: "Cazador (Chaser)",   en: "Chaser" }
        ],
        correct: 1
      }
    ],
    personal: [
      {
        q: {
          es: "¿Qué te hace perder la noción del tiempo cuando lo haces?",
          en: "What makes you lose track of time when you do it?"
        }
      },
      {
        q: {
          es: "¿Cuál es un pequeño placer que te alegra cualquier día?",
          en: "What's a small pleasure that brightens any day for you?"
        }
      },
      {
        q: {
          es: "Si pudieras cenar con cualquier persona, viva o no, ¿con quién y por qué?",
          en: "If you could have dinner with anyone, living or not, who would it be and why?"
        }
      },
      {
        q: {
          es: "¿Qué es algo que poca gente sabe de ti?",
          en: "What's something few people know about you?"
        }
      },
      {
        q: {
          es: "Describe tu fin de semana ideal en una frase.",
          en: "Describe your ideal weekend in one sentence."
        }
      }
    ]
  },

  /* ═══════════════════════════════════════════════════════
     SECTION 2 — EXPERIENCE
     Trivia: world of work · Personal: career, challenges, what you seek
  ═══════════════════════════════════════════════════════ */
  experience: {
    trivia: [
      {
        q: {
          es: "¿Qué empresa popularizó el eslogan 'Think different'?",
          en: "Which company popularised the slogan 'Think different'?"
        },
        options: [
          { es: "Microsoft", en: "Microsoft" },
          { es: "Apple",     en: "Apple" },
          { es: "IBM",       en: "IBM" },
          { es: "Google",    en: "Google" }
        ],
        correct: 1
      },
      {
        q: {
          es: "¿Cuántas horas tiene la semana laboral estándar en España?",
          en: "How many hours are in the standard work week in Spain?"
        },
        options: [
          { es: "35", en: "35" },
          { es: "40", en: "40" },
          { es: "45", en: "45" },
          { es: "48", en: "48" }
        ],
        correct: 1
      },
      {
        q: {
          es: "¿Cuál es la red social profesional más usada del mundo?",
          en: "What is the most used professional social network in the world?"
        },
        options: [
          { es: "Facebook", en: "Facebook" },
          { es: "TikTok",   en: "TikTok" },
          { es: "LinkedIn", en: "LinkedIn" },
          { es: "Instagram", en: "Instagram" }
        ],
        correct: 2
      },
      {
        q: {
          es: "¿Qué significa la sigla 'CEO'?",
          en: "What does the acronym 'CEO' stand for?"
        },
        options: [
          { es: "Chief Executive Officer", en: "Chief Executive Officer" },
          { es: "Central Employee Operator", en: "Central Employee Operator" },
          { es: "Company Economic Owner", en: "Company Economic Owner" },
          { es: "Creative Events Organizer", en: "Creative Events Organizer" }
        ],
        correct: 0
      },
      {
        q: {
          es: "¿Qué herramienta de videollamadas se hizo famosa durante la pandemia de 2020?",
          en: "Which video-call tool became famous during the 2020 pandemic?"
        },
        options: [
          { es: "MySpace", en: "MySpace" },
          { es: "Zoom",    en: "Zoom" },
          { es: "Napster", en: "Napster" },
          { es: "WinRAR",  en: "WinRAR" }
        ],
        correct: 1
      },
      {
        q: {
          es: "En inglés, ¿qué 'color de cuello' describe a los trabajadores de oficina?",
          en: "In English, which 'collar colour' describes office workers?"
        },
        options: [
          { es: "Blue collar (azul)",  en: "Blue collar" },
          { es: "Pink collar (rosa)",  en: "Pink collar" },
          { es: "White collar (blanco)", en: "White collar" },
          { es: "Green collar (verde)", en: "Green collar" }
        ],
        correct: 2
      }
    ],
    personal: [
      {
        q: {
          es: "¿Cuál es el reto profesional del que estás más orgulloso/a?",
          en: "What's the professional challenge you're most proud of?"
        }
      },
      {
        q: {
          es: "¿Qué buscas en tu próximo trabajo o proyecto?",
          en: "What are you looking for in your next job or project?"
        }
      },
      {
        q: {
          es: "Cuéntame un momento en el que aprendiste algo importante de un error.",
          en: "Tell me about a time you learned something important from a mistake."
        }
      },
      {
        q: {
          es: "¿Qué tipo de equipo o ambiente saca lo mejor de ti?",
          en: "What kind of team or environment brings out the best in you?"
        }
      },
      {
        q: {
          es: "Si pudieras tener cualquier trabajo durante un día, ¿cuál sería?",
          en: "If you could have any job for one day, what would it be?"
        }
      }
    ]
  },

  /* ═══════════════════════════════════════════════════════
     SECTION 3 — TECHNICAL SKILLS
     Trivia: tech · Personal: your relationship with technology
  ═══════════════════════════════════════════════════════ */
  skills: {
    trivia: [
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
      }
    ],
    personal: [
      {
        q: {
          es: "¿Qué es lo último que has creado o construido y te ha gustado?",
          en: "What's the last thing you created or built that you enjoyed?"
        }
      },
      {
        q: {
          es: "Si pudieras aprender cualquier tecnología o habilidad mañana, ¿cuál sería?",
          en: "If you could learn any technology or skill tomorrow, what would it be?"
        }
      },
      {
        q: {
          es: "¿Qué app o herramienta no podrías quitar de tu día a día y por qué?",
          en: "What app or tool could you not remove from your daily life, and why?"
        }
      },
      {
        q: {
          es: "¿Qué problema te encantaría resolver con tecnología?",
          en: "What problem would you love to solve with technology?"
        }
      },
      {
        q: {
          es: "¿Eres más de planificarlo todo o de lanzarte y experimentar?",
          en: "Are you more of a plan-everything person or a dive-in-and-experiment one?"
        }
      }
    ]
  }
};
