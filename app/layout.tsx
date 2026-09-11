import type { Metadata } from "next";
import "./globals.css";
import "./marca-personal.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://oscar-mena-marca-personal.menaosrolsol.chatgpt.site"),
  title: "Oscar Mena | Proyectos socioeducativos, licitaciones y evaluación",
  description:
    "Consultoría senior para empresas y entidades sociales en proyectos técnicos, licitaciones públicas, evaluación, indicadores, datos y automatización.",
  keywords: [
    "consultor proyectos socioeducativos",
    "redacción de proyectos técnicos",
    "licitaciones públicas servicios sociales",
    "evaluación de programas sociales",
    "técnico de proyectos freelance",
    "consultoría tercer sector",
    "indicadores de programas sociales",
    "automatización entidades sociales",
    "análisis de datos proyectos sociales",
    "memorias técnicas licitaciones",
  ],
  authors: [{ name: "Oscar Mena Sánchez" }],
  creator: "Oscar Mena Sánchez",
  openGraph: {
    type: "website",
    locale: "es_ES",
    title: "Oscar Mena | Proyectos socioeducativos, licitaciones y evaluación",
    description:
      "Claridad para dirigir. Capacidad para transformar.",
    siteName: "Oscar Mena Sánchez",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Oscar Mena — Consultoría socioeducativa" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oscar Mena | Consultoría socioeducativa",
    description: "Claridad para dirigir. Capacidad para transformar.",
    images: ["/og.png"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon.png", sizes: "48x48", type: "image/png" }],
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
