import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import LoginView from "./pages/LoginView.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoginView />
  </StrictMode>
);
