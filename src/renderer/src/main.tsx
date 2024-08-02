import "./assets/main.css";

import { ThemeProvider } from "next-themes";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Toaster } from "./components/ui/sonner";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" enableSystem={false} attribute="class">
      <App />
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>,
);
