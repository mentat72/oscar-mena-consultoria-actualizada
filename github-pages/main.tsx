import React from "react";
import { createRoot } from "react-dom/client";
import "../app/globals.css";
import "../app/marca-personal.css";
import Home from "../app/page";

const root = document.getElementById("root");

if (!root) {
  throw new Error("No se ha encontrado el contenedor principal de la página.");
}

createRoot(root).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
);
