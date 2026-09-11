from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
OUTPUT = PUBLIC / "perfil-oscar-mena.pdf"
PUBLIC.mkdir(parents=True, exist_ok=True)

INK = colors.HexColor("#071C33")
NAVY = colors.HexColor("#0A315D")
BLUE = colors.HexColor("#146FB5")
GOLD = colors.HexColor("#F3CA52")
PAPER = colors.HexColor("#F5F9FC")
LINE = colors.HexColor("#D8E8F2")
SOFT = colors.HexColor("#526B82")
WHITE = colors.HexColor("#FFFFFF")
GOLD_PALE = colors.HexColor("#FFF2C8")


def register_fonts():
    font_dir = Path("C:/Windows/Fonts")
    fonts = {
        "ProfileSans": font_dir / "arial.ttf",
        "ProfileSansBold": font_dir / "arialbd.ttf",
    }
    for name, path in fonts.items():
        if path.exists():
            pdfmetrics.registerFont(TTFont(name, str(path)))


register_fonts()

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(
    name="Eyebrow", fontName="ProfileSansBold", fontSize=7.6, leading=9,
    textColor=BLUE, spaceAfter=4 * mm, tracking=1.25,
))
styles.add(ParagraphStyle(
    name="Display", fontName="ProfileSansBold", fontSize=27, leading=30,
    textColor=NAVY, spaceAfter=5 * mm,
))
styles.add(ParagraphStyle(
    name="Lead", fontName="ProfileSansBold", fontSize=12.5, leading=17,
    textColor=INK, spaceAfter=3.5 * mm,
))
styles.add(ParagraphStyle(
    name="Body", fontName="ProfileSans", fontSize=8.5, leading=12.3,
    textColor=SOFT, spaceAfter=2.2 * mm,
))
styles.add(ParagraphStyle(
    name="Section", fontName="ProfileSansBold", fontSize=16.5, leading=19,
    textColor=NAVY, spaceBefore=1.5 * mm, spaceAfter=3.5 * mm,
))
styles.add(ParagraphStyle(
    name="Subsection", fontName="ProfileSansBold", fontSize=12.5, leading=15,
    textColor=NAVY, spaceBefore=1 * mm, spaceAfter=2.2 * mm,
))
styles.add(ParagraphStyle(
    name="CardTitle", fontName="ProfileSansBold", fontSize=9.5, leading=12,
    textColor=NAVY, spaceAfter=1.6 * mm,
))
styles.add(ParagraphStyle(
    name="CardBody", fontName="ProfileSans", fontSize=7.6, leading=10.6,
    textColor=SOFT,
))
styles.add(ParagraphStyle(
    name="BulletProfile", fontName="ProfileSans", fontSize=7.7, leading=10.5,
    leftIndent=3.8 * mm, firstLineIndent=-3 * mm, textColor=SOFT,
    spaceAfter=0.9 * mm,
))
styles.add(ParagraphStyle(
    name="MetricNumber", fontName="ProfileSansBold", fontSize=12.5, leading=14,
    textColor=BLUE, spaceAfter=1.2 * mm,
))
styles.add(ParagraphStyle(
    name="MetricLabel", fontName="ProfileSans", fontSize=6.9, leading=9,
    textColor=SOFT,
))
styles.add(ParagraphStyle(
    name="RoleMeta", fontName="ProfileSansBold", fontSize=7.1, leading=9,
    textColor=BLUE, spaceAfter=1.7 * mm,
))
styles.add(ParagraphStyle(
    name="TimelineYear", fontName="ProfileSansBold", fontSize=11.5, leading=13,
    alignment=TA_CENTER, textColor=WHITE,
))
styles.add(ParagraphStyle(
    name="MethodNumber", fontName="ProfileSansBold", fontSize=11.5, leading=13,
    textColor=GOLD, spaceAfter=1.2 * mm,
))
styles.add(ParagraphStyle(
    name="CardTitleLight", fontName="ProfileSansBold", fontSize=8.5, leading=10.5,
    textColor=WHITE, spaceAfter=1.2 * mm,
))
styles.add(ParagraphStyle(
    name="SmallLight", fontName="ProfileSans", fontSize=6.4, leading=8.2,
    textColor=LINE,
))
styles.add(ParagraphStyle(
    name="Quote", fontName="ProfileSansBold", fontSize=10.5, leading=14,
    textColor=INK,
))


def header_footer(canvas, doc):
    width, height = A4
    canvas.saveState()
    canvas.setFillColor(INK)
    canvas.rect(0, height - 16 * mm, width, 16 * mm, fill=1, stroke=0)

    logo_path = PUBLIC / "brand" / "om-white.png"
    if logo_path.exists():
        canvas.drawImage(
            str(logo_path), 18 * mm, height - 12.5 * mm,
            width=21 * mm, height=9 * mm, preserveAspectRatio=True, mask="auto",
        )

    canvas.setFillColor(WHITE)
    canvas.setFont("ProfileSansBold", 8)
    canvas.drawString(43 * mm, height - 9.8 * mm, "OSCAR MENA SÁNCHEZ")
    canvas.setFont("ProfileSans", 6.8)
    canvas.drawRightString(width - 18 * mm, height - 9.8 * mm, "PROYECTOS · LICITACIONES · DATOS")
    canvas.setStrokeColor(GOLD)
    canvas.setLineWidth(2)
    canvas.line(width - 53 * mm, height - 16 * mm, width - 46 * mm, height)

    canvas.setStrokeColor(LINE)
    canvas.line(18 * mm, 15 * mm, width - 18 * mm, 15 * mm)
    canvas.setFillColor(SOFT)
    canvas.setFont("ProfileSans", 6.6)
    canvas.drawString(18 * mm, 9.5 * mm, "oscar.menasan@gmail.com  ·  +34 630 140 088  ·  Madrid")
    canvas.drawRightString(width - 18 * mm, 9.5 * mm, str(doc.page))
    canvas.restoreState()


doc = BaseDocTemplate(
    str(OUTPUT), pagesize=A4,
    leftMargin=18 * mm, rightMargin=18 * mm, topMargin=23 * mm, bottomMargin=22 * mm,
    title="Perfil profesional de consultoría - Oscar Mena Sánchez",
    author="Oscar Mena Sánchez",
    subject="Proyectos técnicos, licitaciones, evaluación y datos para el ámbito socioeducativo",
)
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="normal")
doc.addPageTemplates([PageTemplate(id="profile", frames=[frame], onPage=header_footer)])


def metric(number, label):
    return [Paragraph(number, styles["MetricNumber"]), Paragraph(label, styles["MetricLabel"])]


def bullet(text):
    return Paragraph(f"- {text}", styles["BulletProfile"])


def card(title, body):
    return [Paragraph(title, styles["CardTitle"]), Paragraph(body, styles["CardBody"])]


def experience(role, organization, period, summary, items):
    content = [
        Paragraph(role, styles["CardTitle"]),
        Paragraph(f"{organization}  |  {period}", styles["RoleMeta"]),
        Paragraph(summary, styles["CardBody"]),
        Spacer(1, 1 * mm),
    ]
    content.extend(bullet(item) for item in items)
    return content


story = []

# Page 1 - commercial positioning supported by evidence
story.append(Paragraph("PERFIL PROFESIONAL PARA CONSULTORÍA DE PROYECTOS", styles["Eyebrow"]))
story.append(Paragraph("Propuestas técnicas sólidas.<br/>Proyectos preparados para ejecutarse.", styles["Display"]))
story.append(Paragraph(
    "Consultor senior para empresas del ámbito socioeducativo y entidades del tercer sector que necesitan convertir una oportunidad, un pliego o una necesidad interna en una propuesta viable, evaluable y competitiva.",
    styles["Lead"],
))
story.append(Paragraph(
    "Aporto más de 18 años dirigiendo programas complejos, coordinando equipos multidisciplinares y respondiendo ante la Administración. Integro esa experiencia con redacción técnica, evaluación, indicadores y especialización actual en datos para reforzar la coherencia entre lo que se propone, lo que puede ejecutarse y lo que después debe demostrarse.",
    styles["Body"],
))

stats = [
    [
        metric("+18 años", "dirección de programas socioeducativos"),
        metric("+65", "profesionales coordinados"),
        metric("+72.000", "casos gestionados en la trayectoria"),
    ],
    [
        metric("+1.000", "informes técnicos e indicadores"),
        metric("4.000/año", "casos analizados aproximadamente"),
        metric("FEMP 2016", "reconocimiento al trabajo del equipo"),
    ],
]
stats_table = Table(stats, colWidths=[doc.width / 3] * 3, rowHeights=[21 * mm, 21 * mm])
stats_table.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), PAPER),
    ("BOX", (0, 0), (-1, -1), 0.6, LINE),
    ("INNERGRID", (0, 0), (-1, -1), 0.6, LINE),
    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ("LEFTPADDING", (0, 0), (-1, -1), 5.5 * mm),
    ("RIGHTPADDING", (0, 0), (-1, -1), 4.5 * mm),
]))
story.append(Spacer(1, 2.5 * mm))
story.append(stats_table)
story.append(Spacer(1, 4 * mm))

story.append(Paragraph("Una combinación orientada al resultado", styles["Section"]))
evidence_cards = [
    [
        card("01  Experiencia sectorial y de ejecución", "Conocimiento directo de servicios públicos, intervención socioeducativa, coordinación territorial, continuidad operativa y relación con responsables técnicos."),
        card("02  Proyectos y licitaciones", "Participación en proyectos técnicos para licitaciones públicas, memorias, estudios y documentación que debe ser clara, consistente y aplicable."),
    ],
    [
        card("03  Dirección y gestión del cambio", "Planificación, recursos, presupuestos, contratación, liderazgo de equipos, transformación de procesos y adopción de nuevas formas de trabajo."),
        card("04  Evaluación, datos y reporting", "Indicadores, cuadros de mando, análisis cuantitativo e informes para explicar actividad, detectar desviaciones y fundamentar decisiones."),
    ],
]
evidence_table = Table(evidence_cards, colWidths=[doc.width / 2] * 2, rowHeights=[29 * mm, 29 * mm])
evidence_table.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), WHITE),
    ("BOX", (0, 0), (-1, -1), 0.6, LINE),
    ("INNERGRID", (0, 0), (-1, -1), 0.6, LINE),
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 5.5 * mm),
    ("RIGHTPADDING", (0, 0), (-1, -1), 5.5 * mm),
    ("TOPPADDING", (0, 0), (-1, -1), 4.5 * mm),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 3.5 * mm),
]))
story.append(evidence_table)
story.append(Spacer(1, 4 * mm))
story.append(Table(
    [[Paragraph(
        "La propuesta de valor: <b>comprender el servicio desde dentro, estructurar una respuesta técnica convincente y diseñar desde el inicio cómo se gestionará, medirá y explicará.</b>",
        styles["Quote"],
    )]],
    colWidths=[doc.width],
    style=TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), GOLD_PALE),
        ("LINEBEFORE", (0, 0), (0, -1), 3, GOLD),
        ("LEFTPADDING", (0, 0), (-1, -1), 7 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 4 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4 * mm),
    ]),
))

# Page 2 - career evidence
story.append(PageBreak())
story.append(Paragraph("TRAYECTORIA PROFESIONAL", styles["Eyebrow"]))
story.append(Paragraph("La propuesta se apoya en experiencia real", styles["Display"]))
story.append(Paragraph(
    "Dirección de programas, interlocución institucional, documentación técnica, evaluación, gestión de personas y mejora basada en datos: capacidades desarrolladas en contextos de alta complejidad y trasladables a nuevos proyectos.",
    styles["Body"],
))
story.append(Spacer(1, 2 * mm))

experience_rows = [
    [
        Paragraph("2026<br/><font size='7'>actualidad</font>", styles["TimelineYear"]),
        experience(
            "Consultor independiente",
            "Analítica, automatización e IA aplicada",
            "Madrid  |  ene. 2026 - actualidad",
            "Colaboración con equipos multidisciplinares para ordenar información, mejorar procesos y apoyar decisiones con datos y conocimiento reutilizable.",
            [
                "Identificación de tareas repetitivas, necesidades de indicadores y oportunidades de automatización.",
                "Diseño conceptual de bases de conocimiento, soluciones RAG y sistemas de gestión de datos.",
                "Enfoque híbrido de negocio, personas y datos, con supervisión profesional y transferencia al equipo.",
            ],
        ),
    ],
    [
        Paragraph("2005<br/><font size='7'>2023</font>", styles["TimelineYear"]),
        experience(
            "Coordinador de programas y proyectos",
            "Ayuntamiento de Madrid - Arci Nature / Doc 2001",
            "Madrid  |  feb. 2005 - dic. 2023",
            "Dirección de un programa socioeducativo de alta complejidad vinculado al absentismo escolar, con responsabilidad sobre equipos, información, recursos y resultados.",
            [
                "Liderazgo directo de más de 65 profesionales y coordinación con responsables técnicos de la Administración.",
                "Gestión y análisis de unos 4.000 casos anuales y más de 72.000 expedientes acumulados.",
                "Más de 1.000 informes, memorias periódicas, indicadores, herramientas de seguimiento y cuadros de mando.",
                "Presentación y defensa de resultados ante responsables técnicos de alto nivel.",
                "Participación en estudios, publicaciones y proyectos técnicos para licitaciones públicas en programas socioeducativos.",
                "Gestión de presupuestos, recursos y contratación; adaptación del programa al trabajo remoto e híbrido.",
                "Participación, junto con el equipo, en el reconocimiento concedido por la FEMP en 2016.",
            ],
        ),
    ],
    [
        Paragraph("2025", styles["TimelineYear"]),
        experience(
            "Gestión de talento, selección y desarrollo organizacional",
            "Grupo RolSol",
            "Córdoba, Argentina  |  abr. 2025 - ago. 2025",
            "Experiencia de transformación interna que refuerza la gestión de personas, la definición de responsabilidades y la adopción de cambios.",
            [
                "Participación en 10 procesos de selección, 30 incorporaciones y 20 puestos cubiertos.",
                "Diseño y mejora de onboarding, formación, comunicación interna y flujos de trabajo.",
                "Análisis y descripción de aproximadamente el 60 % del organigrama, incluidos roles directivos.",
            ],
        ),
    ],
]
experience_table = Table(experience_rows, colWidths=[29 * mm, doc.width - 29 * mm])
experience_table.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), PAPER),
    ("BACKGROUND", (0, 0), (0, -1), NAVY),
    ("BOX", (0, 0), (-1, -1), 0.6, LINE),
    ("INNERGRID", (0, 0), (-1, -1), 0.6, LINE),
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("ALIGN", (0, 0), (0, -1), "CENTER"),
    ("LEFTPADDING", (0, 0), (0, -1), 3 * mm),
    ("RIGHTPADDING", (0, 0), (0, -1), 3 * mm),
    ("TOPPADDING", (0, 0), (0, -1), 6 * mm),
    ("LEFTPADDING", (1, 0), (1, -1), 6 * mm),
    ("RIGHTPADDING", (1, 0), (1, -1), 6 * mm),
    ("TOPPADDING", (1, 0), (1, -1), 4.5 * mm),
    ("BOTTOMPADDING", (1, 0), (1, -1), 3.5 * mm),
]))
story.append(experience_table)

# Page 3 - offer and credentials
story.append(PageBreak())
story.append(Paragraph("CAPACIDADES DE CONSULTORÍA", styles["Eyebrow"]))
story.append(Paragraph("Refuerzo senior donde el proyecto lo necesita", styles["Display"]))

services = [
    ("01  Análisis de pliegos", "Requisitos, criterios de adjudicación, documentación, calendario, viabilidad y riesgos."),
    ("02  Redacción técnica", "Objetivos, metodología, actividades, organización, protocolos, cronograma e indicadores."),
    ("03  Revisión de memorias", "Coherencia, claridad, contenidos ausentes y trazabilidad entre criterios y respuesta."),
    ("04  Evaluación e indicadores", "Teoría del cambio, matrices, recogida de datos, cuadros de mando e informes."),
    ("05  Datos y automatización", "Integración, calidad, reporting reproducible, alertas y seguimiento de entregables."),
    ("06  Conocimiento e IA", "Organización documental, RAG y análisis asistido con revisión profesional final."),
]
service_rows = []
for index in range(0, len(services), 2):
    service_rows.append([card(title, body) for title, body in services[index:index + 2]])

service_table = Table(service_rows, colWidths=[doc.width / 2] * 2, rowHeights=[22.5 * mm] * 3)
service_table.setStyle(TableStyle([
    ("BOX", (0, 0), (-1, -1), 0.6, LINE),
    ("INNERGRID", (0, 0), (-1, -1), 0.6, LINE),
    ("BACKGROUND", (0, 0), (-1, -1), PAPER),
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 5.5 * mm),
    ("RIGHTPADDING", (0, 0), (-1, -1), 5.5 * mm),
    ("TOPPADDING", (0, 0), (-1, -1), 3.8 * mm),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 3 * mm),
]))
story.append(service_table)
story.append(Spacer(1, 3 * mm))

story.append(Paragraph("Método de trabajo", styles["Subsection"]))
methods = [
    ("01", "Comprender", "Contexto, objetivos y documentos."),
    ("02", "Estructurar", "Criterios, tareas y responsables."),
    ("03", "Diseñar", "Propuesta, sistema o solución."),
    ("04", "Validar", "Viabilidad, calidad y consistencia."),
    ("05", "Transferir", "Entrega útil y mantenible."),
]
method_cells = [[[
    Paragraph(number, styles["MethodNumber"]),
    Paragraph(title, styles["CardTitleLight"]),
    Paragraph(body, styles["SmallLight"]),
] for number, title, body in methods]]
method_table = Table(method_cells, colWidths=[doc.width / 5] * 5, rowHeights=[25 * mm])
method_table.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), NAVY),
    ("BOX", (0, 0), (-1, -1), 0.6, NAVY),
    ("INNERGRID", (0, 0), (-1, -1), 0.6, colors.HexColor("#28527A")),
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 3.5 * mm),
    ("RIGHTPADDING", (0, 0), (-1, -1), 3.5 * mm),
    ("TOPPADDING", (0, 0), (-1, -1), 3.5 * mm),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 3 * mm),
]))
story.append(method_table)
story.append(Spacer(1, 3 * mm))

credentials_left = [
    Paragraph("Formación que refuerza la propuesta", styles["Subsection"]),
    bullet("<b>Diploma de Especialización en Big Data y Data Science aplicados a la Economía y a la ADE</b> - UNED, 2026."),
    bullet("<b>Licenciado en Psicología, especialidad Industrial</b> - UNED, 2003. Nivel 7 EQF."),
    bullet("<b>Diplomatura en Gestión y Tecnología para Pymes</b> - Universidad Nacional de Villa María, 2025."),
    bullet("<b>Dirección de Centros de Servicios Sociales</b> - Grupo 5, 2007."),
    bullet("Más de 500 horas en Project Management, Agile, Lean, liderazgo, negociación y tecnologías aplicadas."),
]
credentials_right = [
    Paragraph("Capacidad técnica aplicada", styles["Subsection"]),
    Paragraph(
        "<b>Gestión y colaboración</b><br/>Microsoft 365, Teams, Slack, Trello, Jira y Miro.<br/><br/>"
        "<b>Datos y reporting</b><br/>Power BI, Excel avanzado, SQL, Python, R, RMarkdown y Tableau.<br/><br/>"
        "<b>Automatización y conocimiento</b><br/>n8n, Make, RAG, bases de conocimiento e IA generativa.<br/><br/>"
        "<b>Idiomas</b><br/>Castellano nativo · Inglés B1.",
        styles["Body"],
    ),
]
credentials = Table([[credentials_left, credentials_right]], colWidths=[doc.width * 0.58, doc.width * 0.42])
credentials.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (0, -1), 0),
    ("RIGHTPADDING", (0, 0), (0, -1), 7 * mm),
    ("LEFTPADDING", (1, 0), (1, -1), 7 * mm),
    ("RIGHTPADDING", (1, 0), (1, -1), 0),
    ("LINEBEFORE", (1, 0), (1, -1), 0.6, LINE),
]))
story.append(credentials)
story.append(Spacer(1, 2 * mm))

contact = Table([[
    Paragraph(
        "<b>Modalidades</b><br/>Proyecto cerrado, apoyo durante una licitación, bolsa de horas, refuerzo temporal, colaboración mensual o diagnóstico y piloto.",
        styles["Body"],
    ),
    Paragraph(
        "<b><a color='#071C33' href='mailto:oscar.menasan@gmail.com'>oscar.menasan@gmail.com</a></b><br/>"
        "+34 630 140 088<br/>"
        "<a color='#146FB5' href='https://oscar-mena-consultoria.menaosrolsol.chatgpt.site'>Web profesional</a> · "
        "<a color='#146FB5' href='https://www.linkedin.com/in/oscarmenz-psicologomadrid'>LinkedIn</a><br/>"
        "Madrid · Remoto o híbrido · Toda España",
        styles["Body"],
    ),
]], colWidths=[doc.width * 0.56, doc.width * 0.44])
contact.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), GOLD_PALE),
    ("LINEABOVE", (0, 0), (-1, -1), 3, GOLD),
    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ("LEFTPADDING", (0, 0), (-1, -1), 6 * mm),
    ("RIGHTPADDING", (0, 0), (-1, -1), 6 * mm),
    ("TOPPADDING", (0, 0), (-1, -1), 3 * mm),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5 * mm),
]))
story.append(contact)

doc.build(story)
print(OUTPUT)
