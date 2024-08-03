import "./assets/main.css";

import { ThemeProvider } from "next-themes";
import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Error from "./components/Error";
import RecordForm from "./components/RecordForm";
import RecordsTable from "./components/RecordsTable";
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";

const router = createHashRouter([
  {
    path: "/",
    Component: App,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <RecordForm />,
      },
      {
        path: "/records",
        element: <RecordsTable />,
      },
      {
        path: "/settings",
        element: <Error />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" enableSystem={false} attribute="class">
      <TooltipProvider>
        <RouterProvider router={router} />
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
