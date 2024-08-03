import "./assets/main.css";

import { ThemeProvider } from "next-themes";
import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import MainLayout from "./components/MainLayout";
import RecordForm from "./components/RecordForm";
import RecordsTable from "./components/RecordsTable";
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";

const router = createHashRouter([
  {
    path: "/",
    Component: App,
    errorElement: (
      <div className="flex h-full w-full items-center justify-center">404</div>
    ),
    children: [
      {
        path: "",
        element: (
          <MainLayout>
            <RecordForm />
          </MainLayout>
        ),
      },
      {
        path: "records",
        element: (
          <MainLayout>
            <RecordsTable />
          </MainLayout>
        ),
      },
      {
        path: "settings",
        element: (
          <div className="flex h-full w-full items-center justify-center">
            404
          </div>
        ),
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
