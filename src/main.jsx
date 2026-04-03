import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import SmoothScrollProvider from "./components/shared/SmoothScrollProvider";
import { TooltipProvider } from "./components/ui/tooltip";
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TooltipProvider>
      <SmoothScrollProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SmoothScrollProvider>
    </TooltipProvider>
  </React.StrictMode>,
);
