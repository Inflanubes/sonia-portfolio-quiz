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
     Trivia: Harry Potter · Personal: the company's people and culture
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
          es: "¿Qué cualidades apreciáis especialmente en las personas con las que trabajáis?",
          en: "Which qualities do you value most in the people you work with?"
        }
      },
      {
        q: {
          es: "En vuestro día a día, ¿qué suele ser más importante: rapidez, precisión, autonomía, iniciativa o capacidad de adaptación?",
          en: "In your day-to-day, what tends to matter most: speed, precision, autonomy, initiative or adaptability?"
        }
      },
      {
        q: {
          es: "¿Qué debería conocer una persona para entender bien vuestra forma de trabajar?",
          en: "What should someone know to really understand the way you work?"
        }
      },
      {
        q: {
          es: "¿Qué distingue vuestra cultura interna de la imagen que se percibe desde fuera?",
          en: "How does your internal culture differ from the image seen from the outside?"
        }
      },
      {
        q: {
          es: "¿Cómo se comparten y contrastan puntos de vista diferentes dentro del equipo?",
          en: "How are different points of view shared and challenged within the team?"
        }
      },
      {
        q: {
          es: "¿Qué hace que una persona disfrute especialmente trabajando con vosotros?",
          en: "What makes someone particularly enjoy working with you?"
        }
      },
      {
        q: {
          es: "¿Qué aspectos de vuestra cultura requieren un mayor periodo de adaptación?",
          en: "Which aspects of your culture take the longest to adapt to?"
        }
      },
      {
        q: {
          es: "¿Qué diferencia a quienes funcionan especialmente bien en vuestro equipo?",
          en: "What sets apart the people who thrive in your team?"
        }
      }
    ]
  },

  /* ═══════════════════════════════════════════════════════
     SECTION 2 — EXPERIENCE
     Trivia: world of work · Personal: how the company works and decides
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
          es: "¿Qué empresa fundó Jeff Bezos en un garaje en 1994?",
          en: "Which company did Jeff Bezos found in a garage in 1994?"
        },
        options: [
          { es: "eBay",    en: "eBay" },
          { es: "Amazon",  en: "Amazon" },
          { es: "Netflix", en: "Netflix" },
          { es: "PayPal",  en: "PayPal" }
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
          es: "¿De qué idioma viene la expresión 'currículum vitae'?",
          en: "Which language does the expression 'curriculum vitae' come from?"
        },
        options: [
          { es: "Griego", en: "Greek" },
          { es: "Francés", en: "French" },
          { es: "Latín",  en: "Latin" },
          { es: "Italiano", en: "Italian" }
        ],
        correct: 2
      }
    ],
    personal: [
      {
        q: {
          es: "¿Cómo se reconocería un buen resultado durante los primeros tres meses de colaboración?",
          en: "What would a good result look like in the first three months of working together?"
        }
      },
      {
        q: {
          es: "Cuando coinciden varias prioridades, ¿cómo se decide qué debe resolverse primero?",
          en: "When several priorities collide, how do you decide what gets solved first?"
        }
      },
      {
        q: {
          es: "¿Cómo se toman las decisiones cuando existen diferentes puntos de vista?",
          en: "How are decisions made when there are different points of view?"
        }
      },
      {
        q: {
          es: "¿Qué nivel de autonomía tienen las personas para proponer y poner en marcha mejoras?",
          en: "How much autonomy do people have to propose and implement improvements?"
        }
      },
      {
        q: {
          es: "¿Qué factores suelen generar más fricción o retrasos en los proyectos?",
          en: "Which factors tend to cause the most friction or delays in projects?"
        }
      },
      {
        q: {
          es: "¿Qué aspecto de vuestra forma de trabajar está evolucionando actualmente?",
          en: "Which aspect of the way you work is currently evolving?"
        }
      },
      {
        q: {
          es: "¿Qué proceso interno os gustaría mejorar?",
          en: "Which internal process would you like to improve?"
        }
      },
      {
        q: {
          es: "¿Cómo se comparte el feedback dentro del equipo y con qué frecuencia?",
          en: "How is feedback shared within the team, and how often?"
        }
      },
      {
        q: {
          es: "¿Cómo se coordinan los distintos perfiles implicados en un mismo proyecto?",
          en: "How do the different roles involved in a project coordinate with each other?"
        }
      },
      {
        q: {
          es: "¿Qué suele necesitar más tiempo del previsto cuando iniciáis un proyecto?",
          en: "What usually takes longer than expected when you start a project?"
        }
      },
      {
        q: {
          es: "Cuando hay desacuerdo o alguien comete un error, ¿cómo suele gestionarse?",
          en: "When there is disagreement or someone makes a mistake, how is it usually handled?"
        }
      },
      {
        q: {
          es: "¿Qué necesidad o proyecto te ha llevado a explorar mi perfil?",
          en: "What need or project brought you to explore my profile?"
        }
      }
    ]
  },

  /* ═══════════════════════════════════════════════════════
     SECTION 3 — TECHNICAL SKILLS
     Trivia: tech · Personal: the company's tools, processes and tech challenges
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
          es: "¿Qué herramientas forman parte del trabajo diario y cuáles se utilizan de manera puntual?",
          en: "Which tools are part of the daily work, and which are only used occasionally?"
        }
      },
      {
        q: {
          es: "¿Qué indicadores utilizáis para comprobar si una solución está funcionando?",
          en: "Which indicators do you use to check whether a solution is working?"
        }
      },
      {
        q: {
          es: "¿Qué margen tiene el equipo para revisar herramientas, automatizar procesos o proponer nuevas formas de trabajo?",
          en: "How much room does the team have to review tools, automate processes or propose new ways of working?"
        }
      },
      {
        q: {
          es: "¿Cuál es actualmente el principal reto técnico u operativo del equipo?",
          en: "What is currently the team's main technical or operational challenge?"
        }
      },
      {
        q: {
          es: "¿Cómo se documenta y comparte el conocimiento dentro de la organización?",
          en: "How is knowledge documented and shared within the organisation?"
        }
      },
      {
        q: {
          es: "¿Qué parte de vuestro sistema o proceso tendría mayor impacto si se mejorara?",
          en: "Which part of your system or process would have the biggest impact if improved?"
        }
      },
      {
        q: {
          es: "¿Qué tareas repetitivas siguen requiriendo más tiempo del deseable?",
          en: "Which repetitive tasks still take more time than they should?"
        }
      },
      {
        q: {
          es: "¿Cómo decidís cuándo mantener una herramienta y cuándo sustituirla?",
          en: "How do you decide when to keep a tool and when to replace it?"
        }
      },
      {
        q: {
          es: "¿En qué áreas consideráis que la tecnología podría aportar más valor actualmente?",
          en: "In which areas do you think technology could add the most value right now?"
        }
      },
      {
        q: {
          es: "¿Qué proceso depende todavía demasiado del conocimiento manual o de la intervención de una persona?",
          en: "Which process still depends too much on manual knowledge or on one person's intervention?"
        }
      }
    ]
  }
};
