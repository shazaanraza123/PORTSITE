import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./workshop/styles/base.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
