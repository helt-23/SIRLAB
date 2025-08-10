import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "../node_modules/boxicons/css/boxicons.min.css";
import {QueryProvider} from './providers/QueryProvider.js'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </StrictMode>
);
