/**
 * content.js — every text on the site, in Spanish and English.
 *
 * To change a figure, a job or a project, edit this file only.
 * Each text is an object { es: '...', en: '...' }.
 */

const CONTENT = {

  /* ═══════════════════════════════════════════════════════
     HOME
  ═══════════════════════════════════════════════════════ */
  home: {
    eyebrow: { es: 'Sonia Lacarra Molina', en: 'Sonia Lacarra Molina' },
    title: ['TECHNICAL', 'PROCESS', 'ENGINEER'],
    value: {
      es: 'Audito, diseño y construyo procesos de transformación tecnológica. Desarrollo full stack con IA y automatizaciones (n8n, Make).',
      en: 'I audit, design and build technology transformation processes. AI-powered full-stack development and automations (n8n, Make).'
    },
    status: {
      es: 'Abierta a nuevos retos · reubicación en Canadá o EE. UU.',
      en: 'Open to new challenges · relocation to Canada or the US'
    },
    gateTitle: { es: 'Este CV funciona al revés', en: 'This CV works the other way round' },
    gateText: {
      es: 'Lo habitual es que alguien lea tu CV sin que tú sepas nada de esa persona. Aquí cada pestaña se abre contándome algo de ti. Tres retos cortos, una pregunta divertida y dos sobre ti en cada uno.',
      en: 'Usually someone reads your CV while you know nothing about them. Here each tab opens by telling me something about you. Three short challenges, one fun question and two about you in each.'
    },
    start: { es: 'Empezar por Experiencia', en: 'Start with Experience' }
  },

  /* ═══════════════════════════════════════════════════════
     GATES — one per quiz section (ids match the Sheets log)
  ═══════════════════════════════════════════════════════ */
  gates: {
    personal: {
      label: { es: 'Reto Harry Potter', en: 'Harry Potter challenge' },
      title: { es: '¿Quién hay detrás?', en: 'Who is behind this?' },
      text: {
        es: 'Mi historia, mis cifras y de dónde vengo. Una pregunta de Harry Potter y dos sobre ti.',
        en: 'My story, my numbers and where I come from. One Harry Potter question and two about you.'
      }
    },
    experience: {
      label: { es: 'Reto personal', en: 'Personal challenge' },
      title: { es: 'Trayectoria y proyectos', en: 'Career and projects' },
      text: {
        es: 'De la aviación a la automatización, y todo lo que he construido. Abre Experiencia y Proyectos a la vez.',
        en: 'From aviation to automation, and everything I have built. Unlocks Experience and Projects together.'
      }
    },
    skills: {
      label: { es: 'Reto técnico', en: 'Tech challenge' },
      title: { es: 'Mi caja de herramientas', en: 'My toolbox' },
      text: {
        es: 'Automatización, IA, desarrollo y metodologías. Comparte tu lado techie y es tuyo.',
        en: 'Automation, AI, development and methodologies. Share your techie side and it is yours.'
      }
    }
  },

  /* Curiosity shown as a reward right after each unlock */
  rewards: {
    personal: {
      es: 'Practico downhill. Por eso fui a Whistler, y he montado en Portes du Soleil y en muchas más montañas. Mi primer proyecto, BeBanana, nació ahí: con casco integral, el reconocimiento facial no encuentra a nadie en las fotos.',
      en: 'I ride downhill. That is why I went to Whistler, and I have ridden Portes du Soleil and many more mountains. My first project, BeBanana, was born there: with a full-face helmet, face recognition cannot find anyone in the photos.'
    },
    experience: {
      es: 'Tuve licencia en los dos únicos aviones de dos pisos del mundo: el A380 en Emirates y el B747 en Wamos Air.',
      en: 'I was licensed on the only two double-deck aircraft in the world: the A380 at Emirates and the B747 at Wamos Air.'
    },
    skills: {
      es: 'Tengo un equipo de cinco robots que me organiza el día, la salud y los reels. Mi cronotipo es lobo, así que me guardan lo difícil para la tarde y la noche.',
      en: 'I have a team of five robots that runs my day, my health and my reels. My chronotype is wolf, so they save the hard work for the evening and night.'
    }
  },

  /* Bonus card once the three gates are open */
  finale: {
    title: { es: 'Curiosidades de Sonia', en: "Sonia's fun facts" },
    items: [
      { es: '57 países y 124 ciudades, de Chitá, en Siberia, a un safari en Malawi.', en: '57 countries and 124 cities, from Chita in Siberia to a safari in Malawi.' },
      { es: 'Bajé de Amán a Petra por la carretera del Rey.', en: "I drove from Amman to Petra along the King's Highway." },
      { es: 'Dos road trips por la costa oeste: de Whistler a San Francisco y de Seattle a Las Vegas.', en: 'Two West Coast road trips: Whistler to San Francisco and Seattle to Las Vegas.' },
      { es: 'Pasé un Halloween en Salem, el pueblo de las brujas, al lado de Boston.', en: 'I spent Halloween in Salem, the witch town next to Boston.' },
      { es: 'Llevé una tetera impresa en 3D a una clase de IA para niños.', en: 'I brought a 3D-printed teapot to an AI class for kids.' },
      { es: 'Terminé Ingeniería Informática mientras volaba a tiempo completo.', en: 'I finished my Computer Engineering degree while flying full time.' }
    ],
    motto: 'Wit beyond measure is man’s greatest treasure.',
    mottoNote: { es: 'Ravenclaw, como habrás adivinado.', en: 'Ravenclaw, as you may have guessed.' }
  },

  /* ═══════════════════════════════════════════════════════
     ABOUT ME
  ═══════════════════════════════════════════════════════ */
  about: {
    title: { es: 'Pregunto antes de asumir.', en: 'I ask before I assume.' },
    story: [
      {
        es: 'Lo aprendí a doce mil metros. Pasé casi cinco años en Emirates, primero como tripulante y después como jefa de cabina, al frente de la tripulación de turista o business. En mis últimos meses formé a nuevos tripulantes en seguridad y emergencias. En cada vuelo y en cada clase había más de doce nacionalidades. Todos hablábamos inglés, pero no todos entendíamos lo mismo. Allí aprendí que el problema casi nunca es el que parece, y que liderar es conseguir que el equipo te siga, respetando la cadena de mando, porque confía en ti y no solo porque deba.',
        en: 'I learned it at forty thousand feet. I spent almost five years at Emirates, first as cabin crew and then as cabin supervisor, leading the economy or business crew. In my last months I trained new crew in safety and emergency procedures. Every flight and every class had more than twelve nationalities. We all spoke English, but we did not all understand the same thing. There I learned that the problem is rarely the one it seems, and that leading means getting the team to follow you, within the chain of command, because they trust you and not only because they must.'
      },
      {
        es: 'Mientras volaba terminé Ingeniería Informática. Cuando una lesión de oído me obligó a dejar de volar, bajé a tierra: primero al departamento internacional del RACE y después a GT Motive, donde empecé a automatizar los procesos que tenía alrededor. Me enganchó. Hice el Máster en Internet Business de ISDI, un máster Full Stack y un máster en IA y Automatizaciones. Cuando la academia donde me formé cerró dejando a muchos alumnos sin apoyo, fundé Protocol 418 para acompañarles gratis.',
        en: 'While flying I finished a Computer Engineering degree. When an ear injury forced me to stop flying, I moved to the ground: first to the international department of RACE and then to GT Motive, where I started automating the processes around me. I got hooked. I completed ISDI’s Master in Internet Business, a Full Stack master and a master in AI and Automation. When the academy where I trained closed and left many students without support, I founded Protocol 418 to help them for free.'
      },
      {
        es: 'Hoy diseño y construyo sistemas que quitan trabajo repetitivo a las personas, desde la app de gestión de pacientes de un centro de psicología hasta los 28 workflows que mueven una tienda de moda online. Soy muy geek. Cuando veo un reto pienso «¿y esto se podría hacer?», y no paro hasta dar con la solución. Lo próximo es la robótica, para darle cuerpo a los agentes que ya uso a diario.',
        en: 'Today I design and build systems that take repetitive work off people’s plates, from the patient management app of a psychology centre to the 28 workflows that run an online fashion store. I am a proper geek. When I see a challenge I think “could this be done?”, and I do not stop until I find the answer. Next up is robotics, to give a body to the agents I already use every day.'
      },
      {
        es: 'Busco un equipo que me deje innovar. Abierta a reubicarme en Canadá o Estados Unidos.',
        en: 'I am looking for a team that lets me innovate. Open to relocating to Canada or the United States.'
      }
    ],
    travelLine: {
      es: 'De un safari en Malawi a la carretera del Rey en Jordania, pasando por 57 países.',
      en: "From a safari in Malawi to the King's Highway in Jordan, across 57 countries."
    },
    stats: [
      { n: '57',  label: { es: 'países visitados', en: 'countries visited' } },
      { n: '124', label: { es: 'ciudades', en: 'cities' } },
      { n: '3',   label: { es: 'países en los que he vivido', en: 'countries I have lived in' } },
      { n: '12+', label: { es: 'nacionalidades por vuelo', en: 'nationalities per flight' } },
      { n: '4',   label: { es: 'aviones en licencia: A320, B747, B777, A380', en: 'aircraft type ratings: A320, B747, B777, A380' } }
    ],
    languages: {
      es: 'Español nativo · Inglés bilingüe',
      en: 'Spanish native · English bilingual'
    },
    /* Add testimonials here: { quote:{es,en}, name:'', role:{es,en} }.
       The section stays hidden while this list is empty. */
    testimonials: []
  },

  /* ═══════════════════════════════════════════════════════
     EXPERIENCE (newest first)
  ═══════════════════════════════════════════════════════ */
  experience: [
    {
      role: { es: 'Technical Process Engineer', en: 'Technical Process Engineer' },
      org: 'Freelance',
      dates: { es: 'Feb 2025 – hoy', en: 'Feb 2025 – present' },
      place: { es: 'Madrid · remoto', en: 'Madrid · remote' },
      summary: {
        es: 'Consultoría e implementación: analizo el proceso, lo rediseño y construyo lo que haga falta, ya sean automatizaciones, IA o web.',
        en: 'Consulting and delivery: I analyse the process, redesign it and build whatever it needs, whether automations, AI or web.'
      },
      bullets: [
        { es: 'SOMOS Psicólogos: sistema completo de gestión de pacientes con app propia, cinco canales de entrada y un agente de WhatsApp.', en: 'SOMOS Psicólogos: end-to-end patient management system with its own app, five intake channels and a WhatsApp agent.' },
        { es: 'MÛRA: 28 workflows que mueven una tienda de moda online, de la compra al envío con Nacex.', en: 'MÛRA: 28 workflows running an online fashion store, from checkout to Nacex shipping.' },
        { es: 'AstralPet: un negocio cien por cien automatizado, del pago al documento final.', en: 'AstralPet: a business that is 100% automated, from payment to final document.' },
        { es: 'Bot de facturas para autónomos, vendido a tres clientes.', en: 'Invoice bot for freelancers, sold to three clients.' }
      ],
      tags: ['n8n', 'Make', 'GoHighLevel', 'Next.js', 'Supabase', 'Claude', 'OpenAI']
    },
    {
      role: { es: 'Formadora y ponente', en: 'Trainer and speaker' },
      org: { es: 'Empresas, academias y Protocol 418', en: 'Companies, academies and Protocol 418' },
      dates: { es: '2025 – hoy', en: '2025 – present' },
      place: { es: 'Presencial y online', en: 'On-site and online' },
      summary: {
        es: 'Enseño IA y automatización a adultos y a niños, con clases prácticas que se puedan aplicar al día siguiente.',
        en: 'I teach AI and automation to adults and kids, with hands-on classes people can apply the next day.'
      },
      bullets: [
        { es: 'Dos workshops de IA para niños en Arkeidia, El Molar.', en: 'Two AI workshops for kids at Arkeidia, El Molar.' },
        { es: 'Clase Rooibos de Protocol 418 y clases abiertas en YouTube y Meet.', en: 'Protocol 418 Rooibos class and open classes on YouTube and Meet.' },
        {
          es: 'Formaciones para el grupo de empresarios de la zona norte:',
          en: 'Trainings for the business owners’ group of the northern area:',
          sub: [
            { es: 'Análisis de procesos y organización de la transformación: cómo prepararse y qué tener en cuenta para evaluar o poner en marcha un proyecto de automatización o IA.', en: 'Process analysis and organising the transformation: how to prepare and what to consider when assessing or launching an automation or AI project.' },
            { es: 'Seguridad y realidad de los datos: cómo funcionan la IA y las plataformas no-code, y cómo evitar riesgos de fuga.', en: 'Data security and reality: how AI and no-code platforms work, and how to avoid data-leak risks.' },
            { es: 'Qué es la IA y cómo aplicarla con seguridad: la formación más básica, para empezar.', en: 'What AI is and how to apply it safely: the most basic training, to get started.' }
          ]
        },
        { es: 'Profesora de automatización con Make en IAW.', en: 'Make automation instructor at IAW.' }
      ],
      tags: ['IA', 'Make', 'n8n', { es: 'Diseño de formación', en: 'Training design' }]
    },
    {
      role: { es: 'UK Automotive Technical Clerk', en: 'UK Automotive Technical Clerk' },
      org: 'GT Motive Spain',
      dates: { es: 'Ene 2022 – Mar 2026', en: 'Jan 2022 – Mar 2026' },
      place: { es: 'Madrid · remoto', en: 'Madrid · remote' },
      summary: {
        es: 'Aquí empecé a automatizar los procesos que tenía alrededor, y ya no paré.',
        en: 'This is where I started automating the processes around me, and I never stopped.'
      },
      bullets: [
        { es: 'Seguimiento del 45 % de la flota del Ministerio de Defensa de Reino Unido.', en: 'Tracking of 45% of the UK Ministry of Defence fleet.' },
        { es: 'Coordinación y liderazgo de un departamento de cuatro personas.', en: 'Coordination and leadership of a four-person department.' },
        { es: 'Primeras automatizaciones de procesos internos.', en: 'First automations of internal processes.' }
      ],
      tags: ['Fleet management', 'Team leadership', { es: 'Automatización', en: 'Automation' }]
    },
    {
      role: { es: 'Asistencia internacional', en: 'International assistance' },
      org: 'RACE',
      dates: { es: '2020 – 2021', en: '2020 – 2021' },
      place: { es: 'Madrid', en: 'Madrid' },
      summary: {
        es: 'Primer trabajo en tierra, en el departamento internacional, en plena pandemia.',
        en: 'First ground job, in the international department, in the middle of the pandemic.'
      },
      bullets: [
        { es: 'Asistencia en carretera a clientes en inglés.', en: 'Roadside assistance for English-speaking customers.' },
        { es: 'Coordinación de asistencias en el extranjero con ARC Europe, ADAC y AA.', en: 'Coordination of assistance abroad with ARC Europe, ADAC and AA.' }
      ],
      tags: [{ es: 'Atención al cliente', en: 'Customer care' }, { es: 'Coordinación internacional', en: 'International coordination' }]
    },
    {
      role: { es: 'Tripulante de cabina', en: 'Cabin crew' },
      org: 'Wamos Air',
      dates: { es: '2019 · 6 meses', en: '2019 · 6 months' },
      place: { es: 'Madrid', en: 'Madrid' },
      summary: {
        es: 'Aerolínea chárter, tras sacarme el título de TCP español.',
        en: 'Charter airline, after earning my Spanish cabin crew licence.'
      },
      bullets: [
        { es: 'Licencia en A320 y B747.', en: 'Type ratings on A320 and B747.' }
      ],
      tags: ['A320', 'B747']
    },
    {
      role: { es: 'Cabin Supervisor y SEP Trainer', en: 'Cabin Supervisor and SEP Trainer' },
      org: 'Emirates',
      dates: { es: '2013 – 2018', en: '2013 – 2018' },
      place: { es: 'Dubái, EAU', en: 'Dubai, UAE' },
      summary: {
        es: 'Tripulante desde 2013, jefa de cabina desde 2016 y formadora en mis últimos seis meses.',
        en: 'Cabin crew from 2013, cabin supervisor from 2016 and trainer in my last six months.'
      },
      bullets: [
        { es: 'Jefa de cabina de turista o business, con tripulaciones de más de doce nacionalidades.', en: 'Led the economy or business cabin, with crews of more than twelve nationalities.' },
        { es: 'Instructora de seguridad y emergencias (SEP) para nuevos tripulantes, hasta 25 alumnos por clase.', en: 'Safety and emergency procedures (SEP) instructor for new crew, up to 25 students per class.' },
        { es: 'Licencia en B777 y A380.', en: 'Type ratings on B777 and A380.' }
      ],
      tags: ['Leadership', 'SEP Training', 'B777', 'A380']
    }
  ],

  education: [
    {
      title: { es: 'Máster en IA y Automatizaciones', en: 'Master in AI and Automation' },
      org: 'IAW', year: '2025',
      detail: {
        es: 'Automatización de procesos e inteligencia artificial aplicada a negocio. También di clase de automatización con Make en la propia academia.',
        en: 'Process automation and AI applied to business. I also taught Make automation at the academy itself.'
      }
    },
    {
      title: { es: 'Full Stack Developer', en: 'Full Stack Developer' },
      org: '4Geeks Academy', year: '2023 – 24',
      detail: {
        es: 'Desarrollo web de principio a fin: HTML, CSS y JavaScript, React en el front, Python y Flask en el back, bases de datos con SQLAlchemy y APIs REST, con Git y metodologías ágiles (Scrum, Kanban). Aquí terminé de construir la web de BeBanana, mi proyecto de fin del MIB.',
        en: 'End-to-end web development: HTML, CSS and JavaScript, React on the front end, Python and Flask on the back end, databases with SQLAlchemy and REST APIs, with Git and agile methodologies (Scrum, Kanban). This is where I finished building the BeBanana web app, my MIB final project.'
      }
    },
    {
      title: { es: 'Máster en Internet Business (MIB)', en: 'Master in Internet Business (MIB)' },
      org: 'ISDI', year: '2022 – 23',
      detail: {
        es: 'Nueve meses de formación práctica en negocio digital. Estrategia y modelos de negocio, tecnología aplicada (IA, cloud, IoT, blockchain), datos y analítica, y transformación de organizaciones. Gestión de proyectos y de equipos con metodologías ágiles, liderazgo en la era digital y priorización de iniciativas. Especialización y trabajo de fin de máster en Growth Marketing, con BeBanana como proyecto final. Seminario de cierre en Harvard, Boston, sobre la IA y sus implicaciones socioeconómicas.',
        en: 'Nine months of hands-on digital business training. Strategy and business models, applied technology (AI, cloud, IoT, blockchain), data and analytics, and organisational transformation. Project and team management with agile methodologies, leadership in the digital era and initiative prioritisation. Growth Marketing specialisation and final master’s project, with BeBanana as the final project. Closing seminar at Harvard, Boston, on AI and its socioeconomic implications.'
      }
    },
    {
      title: { es: 'Digital Transformation & Society', en: 'Digital Transformation & Society' },
      org: 'Harvard University', year: '2023',
      detail: {
        es: 'Seminario internacional de transformación digital de ISDI y el Real Colegio Complutense en Harvard. Una semana intensiva en inglés en el campus, con ponentes de Harvard y del MIT: disrupción e innovación con IA, creatividad y derechos de autor en la era de la IA, fintech y criptomonedas, medios y política, machine learning y futuro del trabajo. Con visitas al MIT Media Lab y al Harvard Innovation Lab.',
        en: 'International digital transformation seminar run by ISDI and the Real Colegio Complutense at Harvard. One intensive week in English on campus, with speakers from Harvard and MIT: disruption and innovation with AI, creativity and copyright in the AI era, fintech and cryptocurrencies, media and politics, machine learning and the future of work. Including visits to the MIT Media Lab and the Harvard Innovation Lab.'
      }
    },
    {
      title: { es: 'Ingeniería Informática', en: 'Computer Engineering degree' },
      org: 'UNED', year: '2017',
      detail: {
        es: 'Estudié la carrera a distancia en la UNED y la terminé en 2017, mientras volaba a tiempo completo.',
        en: 'I studied the degree remotely at UNED and finished it in 2017, while flying full time.'
      }
    }
  ],

  /* ═══════════════════════════════════════════════════════
     PROJECTS
     featured: shown on the Projects tab before "See all".
  ═══════════════════════════════════════════════════════ */
  projects: [
    {
      slug: 'somos',
      featured: true,
      name: 'SOMOS Psicólogos',
      year: '2025 – 26',
      kind: { es: 'Cliente · centro de psicología', en: 'Client · psychology centre' },
      cover: 'img/projects/somos/canales.png',
      short: {
        es: 'Sistema completo de gestión de pacientes: cinco canales de entrada, una app propia y un agente de WhatsApp que deriva cada caso.',
        en: 'End-to-end patient management: five intake channels, a custom app and a WhatsApp agent that routes every case.'
      },
      metrics: [
        { n: '5', label: { es: 'canales de entrada', en: 'intake channels' } },
        { n: '1', label: { es: 'app para todo el equipo', en: 'app for the whole team' } },
        { n: '8', label: { es: 'escenarios en Make', en: 'Make scenarios' } }
      ],
      problem: {
        es: 'Los pacientes llegaban por call center, formulario web, WhatsApp, recomendación de otros psicólogos y en persona. Cada canal se gestionaba a mano y el estado de cada paciente vivía en la cabeza de alguien.',
        en: 'Patients arrived through the call centre, a web form, WhatsApp, referrals from other psychologists and walk-ins. Each channel was handled by hand and each patient’s status lived in someone’s head.'
      },
      built: [
        { es: 'Rediseño de los procesos de los cinco canales a partir de la documentación del cliente.', en: 'Redesign of the five channel processes from the client’s documentation.' },
        { es: 'Sistema de estados de paciente, del primer contacto a la cita asignada.', en: 'Patient status system, from first contact to assigned appointment.' },
        { es: 'App para psicólogos, call center y gestores, con avisos para cada perfil y estadísticas.', en: 'App for psychologists, call centre and managers, with alerts for each profile and statistics.' },
        { es: 'Consentimientos de datos automáticos para psicólogos y pacientes.', en: 'Automated data-consent flow for psychologists and patients.' },
        { es: 'Agente de WhatsApp que atiende al público, consulta disponibilidad y deriva al empleado adecuado, insistiendo hasta que responde.', en: 'WhatsApp agent that serves the public, checks availability and routes to the right employee, nudging until they reply.' }
      ],
      stack: ['Next.js', 'Supabase', 'n8n', 'Make', 'OpenAI', 'WhatsApp', 'Telegram'],
      gallery: [
        { src: 'img/projects/somos/canales.png', caption: { es: 'Los cinco canales de entrada, antes y después del rediseño.', en: 'The five intake channels, before and after the redesign.' } },
        { src: 'img/projects/somos/agente-dante.png', caption: { es: 'El agente en n8n, con voz, memoria y herramientas propias.', en: 'The n8n agent, with voice, memory and its own tools.' } },
        { src: 'img/projects/somos/formulario-citas.png', caption: { es: 'Escenario de Make que reparte cada acción del formulario de citas.', en: 'Make scenario that routes every action of the appointment form.' } }
      ]
    },
    {
      slug: 'mura',
      featured: true,
      name: 'MÛRA',
      year: '2026',
      kind: { es: 'Cliente · moda online', en: 'Client · online fashion' },
      cover: 'img/projects/mura/pipeline-ghl.png',
      link: 'https://stylebymura.com',
      short: {
        es: 'Una tienda de moda de ediciones limitadas que funciona sola: web, pedidos, emails y envíos, en 28 workflows.',
        en: 'A limited-edition fashion store that runs itself: web, orders, emails and shipping, in 28 workflows.'
      },
      metrics: [
        { n: '28', label: { es: 'workflows', en: 'workflows' } },
        { n: '20', label: { es: 'emails del recorrido del cliente', en: 'customer journey emails' } },
        { n: '1', label: { es: 'integración de envíos con Nacex', en: 'Nacex shipping integration' } }
      ],
      problem: {
        es: 'Una marca pequeña con una sola persona detrás: cada pedido exigía confirmar, preparar, etiquetar, avisar al cliente y seguir el envío a mano.',
        en: 'A small brand with one person behind it: every order meant confirming, packing, labelling, emailing the customer and tracking the parcel by hand.'
      },
      built: [
        { es: 'Web de la tienda completa sobre GoHighLevel.', en: 'Full store website on GoHighLevel.' },
        { es: 'Pipeline de pedidos: carrito abandonado, pedido nuevo, preparación, envío, entrega y devolución.', en: 'Order pipeline: abandoned cart, new order, packing, shipped, delivered and returns.' },
        { es: 'Integración con el webservice de Nacex: recogida, seguimiento y avisos automáticos.', en: 'Nacex web service integration: pickup, tracking and automatic notifications.' },
        { es: 'Veinte emails del recorrido del cliente, de la suscripción a la encuesta posterior.', en: 'Twenty customer journey emails, from subscription to the post-purchase survey.' }
      ],
      stack: ['GoHighLevel', 'n8n', 'Nacex API', 'HTML', 'JavaScript'],
      gallery: [
        { src: 'img/projects/mura/pipeline-ghl.png', caption: { es: 'El pipeline de pedidos en GoHighLevel.', en: 'The order pipeline in GoHighLevel.' } },
        { src: 'img/projects/mura/flujos-ghl.png', caption: { es: 'Los flujos del pedido, numerados por fase.', en: 'Order workflows, numbered by stage.' } },
        { src: 'img/projects/mura/flujo-envio.png', caption: { es: 'El flujo de envío con Nacex y su vigilante de 48 horas.', en: 'The Nacex shipping flow and its 48-hour watchdog.' } },
        { src: 'img/projects/mura/workflows-n8n.png', caption: { es: 'Los workflows de n8n que llama GoHighLevel.', en: 'The n8n workflows called by GoHighLevel.' } }
      ]
    },
    {
      slug: 'lab',
      featured: true,
      name: { es: 'Laboratorio personal', en: 'Personal lab' },
      year: '2026',
      kind: { es: 'Mi sistema · atajos, agentes y n8n', en: 'My system · shortcuts, agents and n8n' },
      cover: 'img/projects/lab/bananaerrors.jpg',
      short: {
        es: 'Mi propio sistema: atajos de iPhone conectados a n8n, un equipo de cinco robots y un agente autónomo. Todo lo repetido lo hace una máquina.',
        en: 'My own system: iPhone shortcuts wired to n8n, a team of five robots and an autonomous agent. Anything repetitive is done by a machine.'
      },
      isLab: true
    },
    {
      slug: 'astralpet',
      featured: true,
      name: 'AstralPet',
      year: '2025',
      kind: { es: 'Negocio automatizado', en: 'Automated business' },
      cover: 'img/projects/astralpet/web.jpg',
      link: 'https://astralpet.es',
      short: {
        es: 'Cartas astrales para mascotas, cien por cien automatizado: el cliente paga, rellena un formulario y recibe un documento listo para imprimir.',
        en: 'Astrology charts for pets, 100% automated: the customer pays, fills in a form and receives a print-ready document.'
      },
      metrics: [
        { n: '100 %', label: { es: 'automatizado', en: 'automated' } },
        { n: '0', label: { es: 'pasos manuales por pedido', en: 'manual steps per order' } }
      ],
      problem: {
        es: 'Un producto personalizado que, hecho a mano, exigiría escribir cada carta desde cero.',
        en: 'A personalised product that, done by hand, would mean writing every chart from scratch.'
      },
      built: [
        { es: 'Web de venta con pago integrado.', en: 'Sales website with built-in payment.' },
        { es: 'Formulario posterior al pago que dispara la automatización.', en: 'Post-payment form that triggers the automation.' },
        { es: 'Generación de la carta con IA y maquetación en un documento cuidado.', en: 'AI-generated chart laid out in a polished document.' },
        { es: 'Envío automático por email, listo para imprimir.', en: 'Automatic delivery by email, ready to print.' }
      ],
      stack: ['n8n', 'OpenAI', 'Google Docs', 'Web'],
      gallery: [
        { src: 'img/projects/astralpet/web.jpg', caption: { es: 'La web de AstralPet.', en: 'The AstralPet website.' } },
        { src: 'img/projects/astralpet/carta-1.jpg', caption: { es: 'La carta que recibe el cliente, página 1.', en: 'The chart the customer receives, page 1.' } },
        { src: 'img/projects/astralpet/carta-2.jpg', caption: { es: 'Página 2, con consejos para su bienestar.', en: 'Page 2, with wellbeing tips.' } }
      ]
    },
    {
      slug: 'facturas',
      name: { es: 'Bot de facturas', en: 'Invoice bot' },
      year: '2026',
      kind: { es: 'Producto para autónomos', en: 'Product for freelancers' },
      cover: 'img/projects/facturas/escenario-make.png',
      short: {
        es: 'Mandas los datos a un bot de Telegram y la factura se genera, se envía, se archiva en su trimestre y se registra numerada.',
        en: 'You send the details to a Telegram bot and the invoice is generated, emailed, filed in its quarter and logged with its number.'
      },
      metrics: [
        { n: '3', label: { es: 'ventas a autónomos', en: 'sales to freelancers' } },
        { n: '1', label: { es: 'hoja de cálculo como panel de control', en: 'spreadsheet as control panel' } }
      ],
      problem: {
        es: 'Los autónomos pierden horas cada mes haciendo facturas, enviándolas y apuntándolas para la contabilidad.',
        en: 'Freelancers lose hours every month creating invoices, sending them and recording them for accounting.'
      },
      built: [
        { es: 'Bot de Telegram para pedir la factura con un mensaje.', en: 'Telegram bot to request an invoice with one message.' },
        { es: 'Google Sheets como panel: clientes, tarifas, textos de email y firmas. Cambias una tarifa y todo el sistema se actualiza solo.', en: 'Google Sheets as the control panel: clients, rates, email texts and signatures. Change a rate and the whole system updates itself.' },
        { es: 'Generación del PDF, envío por email y archivo en la carpeta del trimestre.', en: 'PDF generation, email delivery and filing in the quarter folder.' },
        { es: 'Registro numerado de cada factura para la contabilidad.', en: 'Numbered log of every invoice for accounting.' }
      ],
      stack: ['Make', 'Google Sheets', 'Google Drive', 'Gmail', 'Telegram', 'OpenAI'],
      gallery: [
        { src: 'img/projects/facturas/escenario-make.png', caption: { es: 'El escenario de Make, con una rama por tipo de cliente.', en: 'The Make scenario, with one branch per client type.' } },
        { src: 'img/projects/facturas/control.png', caption: { es: 'El control de facturas, con datos ficticios.', en: 'Invoice log, with fictitious data.' } },
        { src: 'img/projects/facturas/clientes.png', caption: { es: 'El panel de clientes y tarifas, con datos ficticios.', en: 'Clients and rates panel, with fictitious data.' } }
      ]
    },
    {
      slug: 'protocol418',
      name: 'Protocol 418',
      year: '2025',
      kind: { es: 'Comunidad gratuita de IA', en: 'Free AI community' },
      cover: 'img/projects/protocol418/rooibos.png',
      link: 'https://protocol418.com',
      short: {
        es: 'Nació para acompañar gratis a los alumnos que se quedaron sin apoyo. Hoy es una comunidad con clases, recursos y un laboratorio abierto.',
        en: 'Born to support, for free, the students who were left without help. Today it is a community with classes, resources and an open lab.'
      },
      metrics: [
        { n: '102', label: { es: 'suscriptores', en: 'subscribers' } },
        { n: '~14', label: { es: 'alumnos por clase', en: 'students per class' } }
      ],
      problem: {
        es: 'Cuando una academia de IA cerró, muchos alumnos se quedaron a medias y sin nadie a quien preguntar.',
        en: 'When an AI academy closed, many students were left halfway through with nobody to ask.'
      },
      built: [
        { es: 'Clases en directo y recursos abiertos en protocol418.com.', en: 'Live classes and open resources at protocol418.com.' },
        { es: 'Rooibos: "Junior 418 Agents", una clase completa de internet e IA para niños, con juegos de IA en directo y un juego de mesa imprimible.', en: 'Rooibos: "Junior 418 Agents", a complete internet and AI class for kids, with live AI games and a printable board game.' },
        { es: 'La di en persona con una tetera impresa en 3D con el logo de Protocol.', en: 'I taught it in person with a 3D-printed teapot bearing the Protocol logo.' }
      ],
      stack: ['Claude', 'n8n', { es: 'Formación', en: 'Teaching' }, 'Print & play'],
      gallery: [
        { src: 'img/projects/protocol418/rooibos.png', caption: { es: 'La clase Rooibos, publicada en protocol418.com.', en: 'The Rooibos class, published at protocol418.com.' } }
      ]
    },
    {
      slug: 'bebanana',
      name: 'BeBanana',
      year: '2023',
      kind: { es: 'Mi primer proyecto', en: 'My first project' },
      cover: '',
      short: {
        es: 'Un portal para fotógrafos de downhill que localiza a cada rider por su casco y su bici, porque con casco integral el reconocimiento facial no sirve.',
        en: 'A portal for downhill photographers that finds each rider by their helmet and bike, because face recognition fails with a full-face helmet.'
      },
      metrics: [
        { n: '1º', label: { es: 'proyecto, y mi favorito', en: 'project, and my favourite' } }
      ],
      problem: {
        es: 'En las carreras de downhill se hacen miles de fotos, pero nadie se reconoce con el casco puesto. Los riders no encuentran sus fotos y los fotógrafos no las venden.',
        en: 'Downhill races produce thousands of photos, but nobody is recognisable with a helmet on. Riders cannot find their photos and photographers cannot sell them.'
      },
      built: [
        { es: 'El rider sube una foto de su casco y de su bici.', en: 'The rider uploads a photo of their helmet and bike.' },
        { es: 'Un modelo de Azure Custom Vision entrenado para reconocerlos en las fotos de los fotógrafos.', en: 'An Azure Custom Vision model trained to recognise them in photographers’ shots.' },
        { es: 'Aviso al rider cuando aparece en una foto nueva.', en: 'The rider is notified when they appear in a new photo.' },
        { es: 'Proyecto de fin del MIB, con la web terminada en 4Geeks. Ahora mismo está en pausa.', en: 'MIB final project, with the web app finished at 4Geeks. Currently paused.' }
      ],
      stack: ['Azure Custom Vision', 'Cloudinary', 'React', 'Python', 'Flask'],
      gallery: []
    }
  ],

  /* ═══════════════════════════════════════════════════════
     LAB — interactive iPhone, robot team and Hermes
  ═══════════════════════════════════════════════════════ */
  lab: {
    intro: {
      es: 'Todo lo que hago repetido lo hace una máquina. Yo capturo, apruebo y decido. n8n orquesta, Claude aporta criterio donde hace falta y todo me llega al mismo sitio: Telegram.',
      en: 'Anything I do repeatedly is done by a machine. I capture, approve and decide. n8n orchestrates, Claude adds judgement where needed and everything reaches me in one place: Telegram.'
    },
    stats: [
      { n: '~100', label: { es: 'workflows en mi n8n', en: 'workflows on my n8n' } },
      { n: '8', label: { es: 'atajos en el iPhone', en: 'iPhone shortcuts' } },
      { n: '5', label: { es: 'robots en mi equipo', en: 'robots on my team' } }
    ],
    shortcutsTitle: { es: 'Mi iPhone habla con n8n', en: 'My iPhone talks to n8n' },
    shortcutsText: {
      es: 'Recordatorios de Apple no se puede tocar desde un servidor. La solución: el iPhone llama a un webhook de n8n y n8n le contesta qué crear. Pulsa un atajo para ver qué pasa.',
      en: 'Apple Reminders cannot be touched from a server. The fix: the iPhone calls an n8n webhook and n8n answers with what to create. Tap a shortcut to see what happens.'
    },
    chain: [
      { es: 'Atajo', en: 'Shortcut' },
      { es: 'Webhook de n8n', en: 'n8n webhook' },
      { es: 'Claude interpreta', en: 'Claude interprets' },
      { es: 'Calendar · Sheets · Notion', en: 'Calendar · Sheets · Notion' },
      { es: 'Respuesta al iPhone', en: 'Reply to the iPhone' }
    ],
    phone: {
      time: '20:36',
      tasks: [
        { es: 'Revisar propuesta de cliente', en: 'Review client proposal' },
        { es: 'Preparar clase de Protocol 418', en: 'Prepare Protocol 418 class' },
        { es: 'Llamar al proveedor de envíos', en: 'Call the shipping provider' },
        { es: 'Grabar vídeo de atajos', en: 'Record shortcuts video' }
      ],
      day: { es: 'LUNES', en: 'MONDAY' },
      date: '28',
      block: { es: 'Bloque creativo · 17:30–19:00', en: 'Creative block · 17:30–19:00' },
      city: 'Madrid', temp: '17°', weather: { es: 'Nublado', en: 'Cloudy' }
    },
    shortcuts: [
      {
        id: 'morning', icon: 'bi-sun', color: 'amber',
        name: { es: 'Morning Routine', en: 'Morning Routine' },
        chat: [
          { from: 'me', es: 'Buenos días', en: 'Good morning' },
          { from: 'bot', es: 'Hoy tienes 2 reuniones y 4 tareas. Lo creativo va de 17:30 a 20:00, tu pico de energía. Dormiste poco: te he dejado la mañana ligera.', en: 'Today you have 2 meetings and 4 tasks. Creative work goes from 17:30 to 20:00, your energy peak. You slept badly, so I kept the morning light.' }
        ]
      },
      {
        id: 'meals', icon: 'bi-cup-hot', color: 'green',
        name: { es: 'Comidas', en: 'Meals' },
        chat: [
          { from: 'me', es: 'Pollo con verduras y arroz', en: 'Chicken with vegetables and rice' },
          { from: 'bot', es: 'Apuntado. Llevas unas 980 de 1.450 kcal. En dos horas te pregunto cómo te sentó.', en: 'Logged. You are at about 980 of 1,450 kcal. In two hours I will ask how it sat with you.' }
        ]
      },
      {
        id: 'update', icon: 'bi-check-lg', color: 'amber',
        name: { es: 'Actualizar tareas', en: 'Update tasks' },
        chat: [
          { from: 'me', es: '2 tareas marcadas como hechas', en: '2 tasks ticked off' },
          { from: 'bot', es: 'Hechas y borradas del calendario. He movido "Revisar facturas" de 19:00 a 18:15 para aprovechar el hueco.', en: 'Done and removed from the calendar. I moved "Review invoices" from 19:00 to 18:15 to use the free slot.' }
        ]
      },
      {
        id: 'newtask', icon: 'bi-calendar-plus', color: 'blue',
        name: { es: 'Nueva tarea', en: 'New task' },
        chat: [
          { from: 'me', es: 'Preparar propuesta para un cliente, me lleva una hora, para el jueves', en: 'Prepare a client proposal, takes one hour, due Thursday' },
          { from: 'bot', es: 'Planificada: miércoles 17:30 · 60 min · creativa. La he puesto en tu pico de energía, antes del plazo.', en: 'Planned: Wednesday 17:30 · 60 min · creative. I put it in your energy peak, before the deadline.' },
          { from: 'sys', es: 'Recordatorio creado en la lista Tareas', en: 'Reminder created in the Tasks list' }
        ]
      },
      {
        id: 'reschedule', icon: 'bi-calendar-week', color: 'coral',
        name: { es: 'Reschedule Today’s', en: 'Reschedule Today’s' },
        chat: [
          { from: 'me', es: 'Hoy no llego a todo', en: 'I will not get through everything today' },
          { from: 'bot', es: 'He repartido lo que queda en tus huecos libres: 3 tareas movidas, ninguna reunión tocada y ningún plazo saltado.', en: 'I spread what is left across your free slots: 3 tasks moved, no meetings touched and no deadlines missed.' }
        ]
      },
      {
        id: 'idea', icon: 'bi-lightbulb', color: 'teal',
        name: { es: 'Capturar idea', en: 'Capture idea' },
        chat: [
          { from: 'me', es: 'Reel sobre agentes que trabajan mientras duermes', en: 'Reel about agents that work while you sleep' },
          { from: 'bot', es: 'Guardada en Notion, categoría Reels. Entra en la propuesta del domingo.', en: 'Saved to Notion, Reels category. It goes into Sunday’s proposal.' }
        ]
      },
      {
        id: 'shopping', icon: 'bi-basket', color: 'teal',
        name: { es: 'Lista de la compra', en: 'Shopping list' },
        chat: [
          { from: 'me', es: 'Pasar la lista del menú semanal', en: 'Send this week’s menu list' },
          { from: 'bot', es: 'Lista pasada a Recordatorios. Te saltará sola al llegar al súper.', en: 'List sent to Reminders. It will pop up by itself when you reach the supermarket.' }
        ]
      },
      {
        id: 'expense', icon: 'bi-graph-up', color: 'green',
        name: { es: 'Expense Tracker', en: 'Expense Tracker' },
        chat: [
          { from: 'me', es: '23,40 € en el súper', en: '€23.40 at the supermarket' },
          { from: 'bot', es: 'Registrado en Gastos 2026. El saldo del mes está actualizado.', en: 'Logged in Expenses 2026. The month’s balance is up to date.' }
        ]
      }
    ],
    teamTitle: { es: 'Mi equipo', en: 'My team' },
    teamText: {
      es: 'Cada bot tiene un tema. Así sé por el nombre del chat si algo es urgente, creativo o de un cliente.',
      en: 'Each bot has one topic. The chat name tells me whether something is urgent, creative or from a client.'
    },
    team: [
      { img: 'img/projects/lab/bananinforms.jpg', name: 'BananInforms', role: { es: 'Mi asistente del día a día: briefing a las 8:30, reparto de fin de día y resumen de los viernes.', en: 'My day-to-day assistant: 8:30 briefing, end-of-day reshuffle and Friday summary.' } },
      { img: 'img/projects/lab/bananasalud.jpg', name: 'BananaSalud', role: { es: 'Nutricionista de bolsillo: registra comidas, prepara el menú semanal y la lista de la compra.', en: 'Pocket nutritionist: logs meals, plans the weekly menu and the shopping list.' } },
      { img: 'img/projects/lab/bananer-bot.jpg', name: 'bananer_bot', role: { es: 'Productor de reels: propone temas, escribe guiones y cuenta las tomas que grabo.', en: 'Reels producer: proposes topics, writes scripts and counts the takes I record.' } },
      { img: 'img/projects/lab/bananaerrors.jpg', name: 'BananaErrors', role: { es: 'Solo malas noticias: recibe los errores de unos 100 workflows y dice de qué cliente es cada uno.', en: 'Bad news only: receives errors from about 100 workflows and says which client each belongs to.' } },
      { img: 'img/projects/lab/hermes.jpg', name: 'Hermes', role: { es: 'Agente autónomo en mi propio servidor, con memoria y tareas programadas. Radar diario de IA y copiloto de Protocol 418.', en: 'Autonomous agent on my own server, with memory and scheduled tasks. Daily AI radar and Protocol 418 copilot.' } }
    ]
  },

  /* ═══════════════════════════════════════════════════════
     SKILLS
  ═══════════════════════════════════════════════════════ */
  skills: [
    { group: { es: 'Automatización e IA', en: 'Automation and AI' }, items: ['n8n', 'Make', 'GoHighLevel', 'Claude', 'OpenAI', { es: 'Agentes de IA', en: 'AI agents' }, 'Retell', 'ElevenLabs', 'Airtable', 'Azure Custom Vision'] },
    { group: { es: 'Automatización en iPhone', en: 'iPhone automation' }, items: [{ es: 'Atajos de Apple', en: 'Apple Shortcuts' }, { es: 'Webhooks', en: 'Webhooks' }, { es: 'Recordatorios y ubicación', en: 'Reminders and location' }, 'Telegram bots'] },
    { group: { es: 'Desarrollo', en: 'Development' }, items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Next.js', 'Python', 'Flask', 'SQL', 'SQLAlchemy', 'Supabase', 'REST API', 'Git'] },
    { group: { es: 'Metodologías', en: 'Methodologies' }, items: ['Scrum', 'Agile', 'Design Thinking', 'Spec-Driven Development', 'OKR', 'KPIs', 'Growth Marketing'] },
    { group: { es: 'Gestión y liderazgo', en: 'Management and leadership' }, items: [{ es: 'Análisis de procesos', en: 'Process analysis' }, { es: 'Liderazgo de equipos', en: 'Team leadership' }, { es: 'Gestión de proyectos', en: 'Project management' }, { es: 'Formación de equipos', en: 'Team training' }, { es: 'Gestión de clientes', en: 'Client management' }, { es: 'Entornos multiculturales', en: 'Multicultural teams' }] },
    { group: { es: 'Idiomas', en: 'Languages' }, items: [{ es: 'Español nativo', en: 'Spanish, native' }, { es: 'Inglés bilingüe', en: 'English, bilingual' }] }
  ],

  /* ═══════════════════════════════════════════════════════
     CONTACT (always open)
  ═══════════════════════════════════════════════════════ */
  contact: {
    title: { es: '¿Hablamos?', en: 'Shall we talk?' },
    text: {
      es: 'Si has llegado hasta aquí, ya sé algo de ti. Escríbeme y seguimos la conversación.',
      en: 'If you made it this far, I already know something about you. Write to me and let’s keep talking.'
    },
    links: [
      { icon: 'bi-envelope', label: 'Email', value: 'lacarramolina@gmail.com', href: 'mailto:lacarramolina@gmail.com' },
      { icon: 'bi-telephone', label: { es: 'Teléfono', en: 'Phone' }, value: '+34 652 492 499', href: 'tel:+34652492499' },
      { icon: 'bi-linkedin', label: 'LinkedIn', value: 'sonialacarramolina', href: 'https://www.linkedin.com/in/sonialacarramolina/' },
      { icon: 'bi-github', label: 'GitHub', value: 'inflanubes', href: 'https://github.com/inflanubes' },
      { icon: 'bi-globe2', label: 'Be Banana', value: 'bebanana.io', href: 'https://www.bebanana.io' },
      { icon: 'bi-cup-hot', label: 'Protocol 418', value: 'protocol418.com', href: 'https://protocol418.com' }
    ]
  }
};
