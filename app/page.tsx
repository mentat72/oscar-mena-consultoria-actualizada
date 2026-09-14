"use client";

import { FormEvent, useState } from "react";

const services = [
  {
    number: "01",
    icon: "/brand/diagnostico.png",
    title: "Análisis de pliegos y oportunidades",
    intro: "Una lectura ordenada antes de comprometer tiempo y recursos.",
    items: [
      "Requisitos excluyentes y documentación",
      "Matriz de criterios de adjudicación",
      "Calendario, checklist y responsables",
      "Viabilidad preliminar y riesgos",
    ],
    result: "Decidir con mayor rapidez y fundamento si merece la pena concurrir.",
  },
  {
    number: "02",
    icon: "/brand/hoja-ruta.png",
    title: "Redacción de proyectos técnicos",
    intro: "Del pliego a una propuesta coherente, concreta y evaluable.",
    items: [
      "Objetivos, metodología y actividades",
      "Organización, coordinación y protocolos",
      "Calidad, igualdad, innovación y participación",
      "Indicadores y sistema de evaluación",
    ],
    result: "Propuestas claras, consistentes, realistas y alineadas con el pliego.",
  },
  {
    number: "03",
    icon: "/brand/resultados.png",
    title: "Revisión y mejora de memorias",
    intro: "Una revisión criterio por criterio antes de presentar.",
    items: [
      "Detección de contenidos ausentes",
      "Coherencia, estructura y claridad",
      "Eliminación de repeticiones",
      "Relación entre propuesta, indicadores y pliego",
    ],
    result: "Una memoria más sólida antes de su presentación.",
  },
  {
    number: "04",
    icon: "/brand/datos-decision.png",
    title: "Evaluación e indicadores",
    intro: "Sistemas que explican qué se hace, cómo evoluciona y qué consigue.",
    items: [
      "Teoría del cambio y marco lógico",
      "Matrices e indicadores de evaluación",
      "Sistemas de recogida de datos",
      "Informes técnicos y cuadros de mando",
    ],
    result: "Demostrar la actividad, la evolución y los resultados del programa.",
  },
  {
    number: "05",
    icon: "/brand/automatizacion.png",
    title: "Datos y automatización",
    intro: "Menos tareas repetitivas y una información operativa más fiable.",
    items: [
      "Integración y limpieza de archivos",
      "Bases de datos y control de calidad",
      "Tablas, gráficos e informes automáticos",
      "Alertas y seguimiento de entregables",
    ],
    result: "Reducir errores y tiempo dedicado al reporting.",
  },
  {
    number: "06",
    icon: "/brand/adopcion.png",
    title: "Conocimiento e IA aplicada",
    intro: "La experiencia de la organización, accesible y reutilizable.",
    items: [
      "Organización y clasificación documental",
      "Repositorios de metodologías y experiencias",
      "Sistemas RAG y asistentes internos",
      "Análisis asistido de pliegos",
    ],
    result: "Convertir experiencia acumulada en conocimiento útil y controlado.",
  },
];

const packages = [
  {
    label: "Necesidad puntual",
    title: "Licitación concreta",
    text: "Para organizaciones que necesitan apoyo senior en una convocatoria específica.",
    items: [
      "Análisis del pliego",
      "Matriz de requisitos",
      "Estructura de la memoria",
      "Redacción de apartados",
      "Revisión técnica final",
    ],
  },
  {
    label: "Mejora operativa",
    title: "Sistema de evaluación y datos",
    text: "Para programas que quieren mejorar su seguimiento y demostrar resultados.",
    items: [
      "Diagnóstico de información",
      "Modelo de datos",
      "Indicadores y recogida",
      "Cuadro de mando",
      "Informe reproducible",
    ],
  },
  {
    label: "Apoyo recurrente",
    title: "Oficina técnica externa",
    text: "Una colaboración mensual y flexible para reforzar al equipo cuando lo necesita.",
    items: [
      "Vigilancia de oportunidades",
      "Análisis, redacción y revisión",
      "Bases documentales",
      "Reporting y automatización",
      "Evaluación de proyectos",
    ],
  },
];

const dataUses = [
  ["Análisis asistido de pliegos", "Extracción de requisitos, fechas, criterios, documentación y riesgos, siempre con revisión profesional final."],
  ["Automatización de memorias", "Los datos periódicos se convierten en tablas, gráficos, indicadores y borradores de informes consistentes."],
  ["Calidad de datos", "Detección de duplicados, campos incompletos, errores e inconsistencias entre servicios o equipos."],
  ["Predicción de cargas de trabajo", "Análisis de tendencias y estacionalidad para anticipar necesidades de personal o presión asistencial."],
  ["Segmentación de usuarios o servicios", "Identificación de perfiles y patrones para adaptar intervenciones y asignar mejor los recursos."],
  ["Base de conocimiento interna", "Acceso rápido y controlado a metodologías, protocolos, indicadores y propuestas anteriores."],
];

const cases = [
  {
    number: "A",
    title: "Análisis de una licitación socioeducativa",
    situation: "Una organización necesita decidir si concurrir a una convocatoria.",
    intervention: "Lectura del pliego, matriz de requisitos, análisis de riesgos y estructura propuesta para la memoria.",
    tools: "Matriz de cumplimiento, checklist y revisión documental asistida.",
    result: "Una decisión informada y una hoja de ruta clara para preparar la propuesta.",
  },
  {
    number: "B",
    title: "Sistema de indicadores para un programa",
    situation: "Una entidad gestiona varios centros con archivos separados.",
    intervention: "Modelo de datos común, catálogo de indicadores y cuadro de mando para actividad, resultados y calidad.",
    tools: "Excel o SQL, Power BI y reglas de control de calidad.",
    result: "Información comparable y útil para el seguimiento técnico.",
  },
  {
    number: "C",
    title: "Automatización de la memoria mensual",
    situation: "Diferentes equipos remiten datos periódicos en formatos distintos.",
    intervention: "Consolidación, comprobaciones de calidad y generación de tablas y gráficos.",
    tools: "Python o R, plantillas de informe y flujo automatizado.",
    result: "Un proceso de reporting más consistente y fácil de revisar.",
  },
  {
    number: "D",
    title: "Base de conocimiento de proyectos",
    situation: "Memorias, protocolos e indicadores están dispersos en múltiples carpetas.",
    intervention: "Clasificación, etiquetado y sistema de recuperación de contenidos reutilizables.",
    tools: "Repositorio documental, buscador semántico y sistema RAG.",
    result: "Conocimiento localizable, gobernado y disponible para nuevos proyectos.",
  },
];

const technologies = [
  ["Python", "Integración, limpieza, análisis y automatización de datos."],
  ["R", "Evaluación estadística e informes reproducibles."],
  ["SQL", "Organización y consulta de bases de datos."],
  ["Power BI", "Cuadros de mando e indicadores."],
  ["Excel avanzado", "Modelos operativos y reporting."],
  ["IA generativa", "Análisis documental y apoyo a la redacción."],
  ["RAG", "Bases de conocimiento internas."],
  ["n8n y Make", "Automatización de flujos de trabajo."],
];

const collaborationModes = [
  {
    title: "Proyecto cerrado",
    description: "Encargo con alcance, entregables, calendario y presupuesto definidos desde el inicio.",
  },
  {
    title: "Apoyo durante una licitación",
    description: "Refuerzo puntual para analizar pliegos, estructurar la propuesta y revisar la documentación antes de su entrega.",
  },
  {
    title: "Bolsa de horas",
    description: "Horas disponibles para consultas, revisiones y tareas concretas que surgen de forma no continuada.",
  },
  {
    title: "Colaboración mensual",
    description: "Acompañamiento recurrente con una dedicación acordada para dar continuidad a proyectos y mejoras.",
  },
  {
    title: "Refuerzo temporal del equipo",
    description: "Integración durante un periodo limitado para asumir carga de trabajo o aportar una especialización concreta.",
  },
  {
    title: "Diagnóstico y piloto",
    description: "Análisis inicial y prueba acotada para validar una solución antes de ampliar su alcance.",
  },
  {
    title: "Trabajo remoto o híbrido",
    description: "Colaboración a distancia con sesiones presenciales cuando el proyecto y la ubicación lo requieran.",
  },
  {
    title: "Proyectos en toda España",
    description: "Disponibilidad para colaborar con organizaciones de cualquier territorio, de forma remota o combinada.",
  },
];

const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSddyfZ9ECIDI-7LPPlzkrOWdlkZyaWuE9UjvsgDeKS11kUSNA/formResponse";

const CALENDAR_BOOKING_URL = "https://calendar.app.google/8vG2oif9GxqhPAyw6";

const GOOGLE_FORM_FIELDS = {
  name: "entry.744806318",
  organization: "entry.1585734743",
  email: "entry.489825174",
  phone: "entry.1467619151",
  need: "entry.818891534",
  deadline: "entry.50956394",
  message: "entry.1984668565",
  consent: "entry.1975974068",
} as const;

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState("");
  const [selectedMeetingMode, setSelectedMeetingMode] = useState("");

  function chooseContactNeed(need: string) {
    setSelectedNeed(need);
    setSubmitted(false);
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      document.querySelector<HTMLSelectElement>('#contact-form select[name="need"]')?.focus();
    }, 450);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const sourceForm = event.currentTarget;
    const formData = new FormData(sourceForm);

    if (formData.get("website")) {
      setSubmitted(true);
      sourceForm.reset();
      setSelectedNeed("");
      setSelectedMeetingMode("");
      return;
    }

    const meetingMode = String(formData.get("meetingMode") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const googleForm = document.createElement("form");
    googleForm.action = GOOGLE_FORM_ACTION;
    googleForm.method = "POST";
    googleForm.target = "google-form-target";
    googleForm.hidden = true;

    const responseValues: Record<keyof typeof GOOGLE_FORM_FIELDS, string> = {
      name: String(formData.get("name") ?? ""),
      organization: String(formData.get("organization") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      need: String(formData.get("need") ?? ""),
      deadline: String(formData.get("deadline") ?? ""),
      message: meetingMode
        ? `Modalidad preferida: ${meetingMode}${message ? `\n\n${message}` : ""}`
        : message,
      consent: "Aceptado",
    };

    Object.entries(GOOGLE_FORM_FIELDS).forEach(([field, entryName]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = entryName;
      input.value = responseValues[field as keyof typeof GOOGLE_FORM_FIELDS];
      googleForm.appendChild(input);
    });

    document.body.appendChild(googleForm);
    googleForm.submit();
    googleForm.remove();
    sourceForm.reset();
    setSelectedNeed("");
    setSelectedMeetingMode("");
    setSubmitted(true);
  }

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>

      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Oscar Mena, inicio">
          <span className="brand-mark" aria-hidden="true">
            <img src="/brand/marca-personal/OM_isotipo_negativo.svg" alt="" />
          </span>
          <span className="brand-copy">
            <strong><span>Oscar</span> Mena</strong>
            <small>Consultoría de proyectos y transformación</small>
          </span>
        </a>

        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span aria-hidden="true">{menuOpen ? "Cerrar" : "Menú"}</span>
        </button>

        <nav
          id="main-navigation"
          className={menuOpen ? "navigation is-open" : "navigation"}
          aria-label="Navegación principal"
        >
          {[
            ["Inicio", "#inicio"],
            ["Cómo puedo ayudar", "#ayuda"],
            ["Servicios", "#servicios"],
            ["Metodología", "#metodologia"],
            ["Trayectoria", "#trayectoria"],
            ["Casos de uso", "#casos"],
            ["Contacto", "#contacto"],
          ].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </nav>
      </header>

      <main id="contenido">
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <p className="eyebrow">Consultoría independiente · EMPRESAS DEL ÁMBITO SOCIOEDUCATIVO Y TERCER SECTOR</p>
            <h1>
              <span>Propuestas técnicas</span>
              <em>diseñadas para ganar.</em>
            </h1>
            <p className="hero-lead">
              Experiencia socioeducativa, análisis de pliegos, redacción estratégica y especialización en datos para
              convertir cada oportunidad en una candidatura competitiva
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#contacto">Concertar una conversación <span aria-hidden="true">→</span></a>
              <a className="button secondary" href="#ayuda">Explorar servicios</a>
              <a className="text-link" href="/perfil-oscar-mena.pdf" download>
                Descargar perfil <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className="hero-location">Madrid · Proyectos para toda España · Modalidad remota e híbrida</p>
          </div>

          <div className="hero-visual" aria-label="Identidad visual de Oscar Mena: claridad, sistema y avance">
            <div className="signal-beam" aria-hidden="true" />
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="visual-core">
              <img src="/brand/marca-personal/OM_isotipo_negativo.svg" alt="" />
            </div>
            <div className="hero-keyword keyword-one">proyectos</div>
            <div className="hero-keyword keyword-two">personas</div>
            <div className="hero-keyword keyword-three">datos</div>
            <div className="visual-note">Claridad que activa</div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Ámbitos de especialización">
          <span>Licitaciones</span>
          <span>Proyectos técnicos</span>
          <span>Evaluación</span>
          <span>Datos</span>
          <span>Automatización</span>
        </section>

        <section className="section pillars-section" id="servicios">
          <div className="section-heading">
            <p className="eyebrow">Una combinación poco habitual</p>
            <h2>Experiencia sectorial y capacidad analítica, en la misma mesa de trabajo.</h2>
          </div>
          <div className="pillar-grid">
            <article>
              <span className="line-icon" aria-hidden="true">I</span>
              <h3>Experiencia sectorial</h3>
              <p>Casi dos décadas gestionando programas socioeducativos complejos, equipos multidisciplinares, relaciones con la Administración, memorias e indicadores.</p>
            </article>
            <article>
              <span className="line-icon" aria-hidden="true">II</span>
              <h3>Proyectos y evaluación</h3>
              <p>Redacción técnica, evaluación de resultados, seguimiento de programas, elaboración de informes y participación en licitaciones públicas.</p>
            </article>
            <article>
              <span className="line-icon" aria-hidden="true">III</span>
              <h3>Datos, automatización e IA</h3>
              <p>Bases de datos, Python, R, cuadros de mando, automatización e IA para mejorar procesos documentales, reporting y decisiones.</p>
            </article>
          </div>
          <blockquote className="statement">
            <span aria-hidden="true">“</span>
            No se trata de incorporar tecnología porque sí, sino de utilizarla para diseñar mejores proyectos,
            reducir errores, liberar tiempo profesional y demostrar resultados.
          </blockquote>
        </section>

        <section className="section services-section" id="ayuda">
          <div className="section-heading split">
            <div>
              <p className="eyebrow light">Cómo puedo ayudar</p>
              <h2>Apoyo senior justo donde el proyecto lo necesita.</h2>
            </div>
            <p>Especialmente útil para organizaciones sin un departamento amplio de licitaciones, datos o evaluación, o que necesitan un refuerzo flexible durante picos de trabajo.</p>
          </div>
          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card" key={service.number}>
                <div className="service-card-top">
                  <img className="service-icon" src={service.icon} alt="" />
                  <div className="service-number">{service.number}</div>
                </div>
                <h3>{service.title}</h3>
                <p>{service.intro}</p>
                <ul>
                  {service.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <div className="result"><span>Resultado esperado</span>{service.result}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="section packages-section">
          <div className="section-heading centered">
            <p className="eyebrow">Soluciones de colaboración</p>
            <h2>Tres formas de convertir una necesidad en un encargo claro.</h2>
          </div>
          <div className="packages-grid">
            {packages.map((pack, index) => (
              <article className={index === 1 ? "package-card featured" : "package-card"} key={pack.title}>
                <p className="package-label">{pack.label}</p>
                <h3>{pack.title}</h3>
                <p>{pack.text}</p>
                <ul>{pack.items.map((item) => <li key={item}>{item}</li>)}</ul>
                <a href="#contacto">Consultar esta modalidad <span aria-hidden="true">→</span></a>
              </article>
            ))}
          </div>
          <div className="center-action">
            <a className="button primary" href="#contacto">Solicitar una propuesta adaptada</a>
          </div>
        </section>

        <section className="section data-section">
          <div className="section-heading split">
            <div>
              <p className="eyebrow">Aplicaciones prácticas de los datos y la IA</p>
              <h2>Tecnología aplicada a problemas operativos concretos.</h2>
            </div>
            <p>Sin proyectos sobredimensionados ni soluciones opacas. Primero se entiende la necesidad; después se elige la herramienta proporcionada.</p>
          </div>
          <div className="data-grid">
            {dataUses.map(([title, text], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <aside className="professional-note">
            <strong>Supervisión profesional, siempre.</strong>
            <p>La inteligencia artificial se utiliza como apoyo al análisis y a la producción documental. Las decisiones sensibles, la interpretación técnica y la validación final permanecen bajo supervisión profesional.</p>
          </aside>
        </section>

        <section className="section methodology-section" id="metodologia">
          <div className="method-intro">
            <p className="eyebrow light">Metodología de trabajo</p>
            <h2>De la información dispersa a una solución que el equipo puede utilizar.</h2>
            <p>Cada solución debe ser útil, mantenible y proporcionada al tamaño y madurez de la organización.</p>
          </div>
          <ol className="method-list">
            {[
              ["Comprender", "Revisión del pliego, proyecto, organización, documentación y objetivos."],
              ["Estructurar", "Ordenación de requisitos, criterios, fuentes, tareas y responsables."],
              ["Diseñar", "Construcción de la propuesta, metodología, indicadores o solución de datos."],
              ["Validar", "Comprobación de viabilidad, consistencia, calidad y correspondencia."],
              ["Transferir", "Entrega de documentos y herramientas comprensibles, evitando dependencias innecesarias."],
            ].map(([title, text], index) => (
              <li key={title}>
                <span>{index + 1}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className="section trajectory-section" id="trayectoria">
          <div className="trajectory-copy">
            <p className="eyebrow">Trayectoria profesional</p>
            <h2>Conocimiento construido desde la gestión real.</h2>
            <p className="large-copy">
              Psicólogo organizacional con casi 19 años de experiencia en dirección y coordinación de un programa
              socioeducativo del Ayuntamiento de Madrid.
            </p>
            <p>
              He liderado equipos multidisciplinares de más de 65 profesionales, el seguimiento aproximado de 4.000
              casos anuales y la elaboración de más de 1.000 informes técnicos, indicadores y cuadros de mando. La
              trayectoria acumulada abarca más de 72.000 casos.
            </p>
            <p>
              Mi trabajo ha incluido presentación de resultados ante responsables técnicos de alto nivel,
              participación en estudios y publicaciones, proyectos técnicos para licitaciones, gestión de recursos y
              presupuestos, y la transición del programa al trabajo remoto e híbrido. El equipo participó en el
              reconocimiento concedido por la FEMP en 2016.
            </p>
            <p>
              Posteriormente he ampliado la experiencia hacia selección, incorporación de profesionales, análisis de
              puestos, formación y transformación organizacional, junto con una especialización universitaria reciente
              en Ciencia de Datos y Big Data.
            </p>
          </div>
          <aside className="trajectory-aside">
            <p>Propuesta de valor</p>
            <blockquote>“Experiencia socioeducativa, proyectos sólidos y decisiones basadas en datos.”</blockquote>
            <span>Dirección · evaluación · transformación</span>
          </aside>
        </section>

        <section className="numbers-section" aria-label="Cifras destacadas de la trayectoria">
          {[
            ["+18", "años dirigiendo programas complejos"],
            ["+65", "profesionales coordinados"],
            ["+72.000", "casos en la trayectoria"],
            ["+1.000", "informes técnicos y de evaluación"],
            ["4.000", "casos analizados al año, aproximadamente"],
            ["FEMP 2016", "reconocimiento al trabajo del equipo"],
          ].map(([number, label]) => (
            <div key={number}><strong>{number}</strong><span>{label}</span></div>
          ))}
        </section>

        <section className="section cases-section" id="casos">
          <div className="section-heading split">
            <div>
              <p className="eyebrow">Casos de uso</p>
              <h2>Cómo se traduce el enfoque en situaciones reales.</h2>
            </div>
            <p className="example-notice"><strong>Ejemplos de aplicación.</strong> No representan clientes reales ni incluyen resultados cuantitativos inventados.</p>
          </div>
          <div className="case-list">
            {cases.map((item) => (
              <article key={item.number}>
                <div className="case-title">
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                </div>
                <dl>
                  <div><dt>Situación</dt><dd>{item.situation}</dd></div>
                  <div><dt>Intervención</dt><dd>{item.intervention}</dd></div>
                  <div><dt>Herramientas</dt><dd>{item.tools}</dd></div>
                  <div><dt>Resultado esperado</dt><dd>{item.result}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className="section technology-section">
          <div className="section-heading">
            <p className="eyebrow">Tecnologías al servicio del proyecto</p>
            <h2>La herramienta adecuada, explicada por su utilidad.</h2>
          </div>
          <div className="technology-grid">
            {technologies.map(([name, text]) => (
              <div key={name}><strong>{name}</strong><span>{text}</span></div>
            ))}
          </div>
        </section>

        <section className="section collaboration-section">
          <div>
            <p className="eyebrow light">Modalidades de colaboración</p>
            <h2>Flexibilidad para reforzar equipos y proyectos.</h2>
            <p>El alcance, el plazo y el presupuesto se definen después de una primera conversación, en función de la necesidad y la documentación disponible.</p>
          </div>
          <ul>
            {collaborationModes.map((item, index) => (
              <li key={item.title} className={index >= 6 ? "dropdown-up" : undefined}>
                <details name="collaboration-mode">
                  <summary>{item.title}</summary>
                  <p>{item.description}</p>
                </details>
              </li>
            ))}
          </ul>
        </section>

        <section className="section contact-section" id="contacto">
          <div className="contact-intro">
            <p className="eyebrow">Contacto</p>
            <h2>Cuéntame qué necesitas resolver.</h2>
            <p>Una primera conversación permite valorar el encaje, concretar el alcance y decidir el siguiente paso con claridad.</p>
            <div className="contact-prompts">
              <p>¿Tienes una licitación próxima?</p>
              <div className="contact-prompt-list" aria-label="Motivos habituales de consulta">
                <button type="button" onClick={() => chooseContactNeed("Otra consulta")}>
                  Solicitar una valoración inicial <span aria-hidden="true">→</span>
                </button>
                <button type="button" onClick={() => chooseContactNeed("Revisión de memoria")}>
                  Revisar un pliego o una memoria <span aria-hidden="true">→</span>
                </button>
                <button type="button" onClick={() => chooseContactNeed("Evaluación e indicadores")}>
                  Diagnosticar el sistema de indicadores <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
            <div className="contact-details">
              <a href="mailto:oscar.menasan@gmail.com">oscar.menasan@gmail.com</a>
              <span>Madrid, España</span>
              <span>Proyectos para toda España · Remoto o híbrido</span>
            </div>
            <a className="button linkedin" href="https://www.linkedin.com/in/oscarmenz-psicologomadrid" target="_blank" rel="noreferrer">
              Contactar por LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>

          <form className="contact-form" id="contact-form" onSubmit={handleSubmit}>
            <label className="honeypot" aria-hidden="true">
              Sitio web
              <input name="website" type="text" tabIndex={-1} autoComplete="off" />
            </label>
            <div className="form-row">
              <label>Nombre
                <input name="name" type="text" autoComplete="name" required />
              </label>
              <label>Organización
                <input name="organization" type="text" autoComplete="organization" required />
              </label>
            </div>
            <div className="form-row">
              <label>Correo electrónico
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <label>Teléfono <span>(opcional)</span>
                <input name="phone" type="tel" autoComplete="tel" />
              </label>
            </div>
            <label>Modalidad de conversación
              <select name="meetingMode" value={selectedMeetingMode} onChange={(event) => setSelectedMeetingMode(event.target.value)} required>
                <option value="" disabled>Selecciona una opción</option>
                <option value="Conversación telefónica">Conversación telefónica</option>
                <option value="Videollamada">Videollamada</option>
              </select>
            </label>
            <label>Tipo de necesidad
              <select name="need" value={selectedNeed} onChange={(event) => setSelectedNeed(event.target.value)} required>
                <option value="" disabled>Selecciona una opción</option>
                <option>Análisis de pliego</option>
                <option>Redacción de proyecto</option>
                <option>Revisión de memoria</option>
                <option>Evaluación e indicadores</option>
                <option>Bases de datos y reporting</option>
                <option>Automatización o IA</option>
                <option>Colaboración recurrente</option>
                <option>Otra consulta</option>
              </select>
            </label>
            <label>Fecha o plazo aproximado
              <input name="deadline" type="text" placeholder="Por ejemplo: septiembre de 2026" />
            </label>
            <label>Mensaje
              <textarea name="message" rows={5} required placeholder="Describe brevemente el proyecto, la convocatoria o la necesidad." />
            </label>
            <label className="privacy-check">
              <input type="checkbox" required />
              <span>He leído y acepto la <a href="#privacidad">política de privacidad</a>.</span>
            </label>
            <button className="button primary submit-button" type="submit">
              Solicitar una primera conversación <span aria-hidden="true">→</span>
            </button>
            <div className="booking-option">
              <span>O, si lo prefieres</span>
              <a
                className="button booking-button"
                href={CALENDAR_BOOKING_URL}
                target="_blank"
                rel="noreferrer"
              >
                Elegir fecha para una conversación de 20 minutos <span aria-hidden="true">↗</span>
              </a>
            </div>
            {submitted && <p className="form-status" role="status">Solicitud registrada correctamente. Me pondré en contacto contigo lo antes posible.</p>}
            <iframe name="google-form-target" title="Confirmación de registro" hidden />
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <a className="brand footer-brand" href="#inicio">
            <span className="brand-mark" aria-hidden="true">
              <img src="/brand/marca-personal/OM_isotipo_negativo.svg" alt="" />
            </span>
            <span className="brand-copy"><strong><span>Oscar</span> Mena</strong><small>Consultoría de proyectos y transformación</small></span>
          </a>
          <p>Experiencia para comprender. Método para estructurar. Datos para mejorar.</p>
        </div>
        <details id="privacidad" className="privacy-policy">
          <summary>Política de privacidad</summary>
          <p>
            Los datos que facilites se utilizarán exclusivamente para responder a tu consulta profesional. El
            responsable del tratamiento es Oscar Mena Sánchez y la base jurídica es tu consentimiento. No se
            comunicarán datos a terceros salvo obligación legal ni se conservarán más tiempo del necesario para
            atender la consulta. Puedes solicitar acceso, rectificación, supresión, limitación u oposición escribiendo
            a <a href="mailto:oscar.menasan@gmail.com">oscar.menasan@gmail.com</a>. No introduzcas datos especialmente
            sensibles en el formulario.
          </p>
        </details>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Oscar Mena Sánchez</span>
          <a href="mailto:oscar.menasan@gmail.com">Correo</a>
          <a href="https://www.linkedin.com/in/oscarmenz-psicologomadrid" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="#inicio">Volver arriba ↑</a>
        </div>
      </footer>
    </>
  );
}
