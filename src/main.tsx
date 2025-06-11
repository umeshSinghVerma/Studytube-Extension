import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./chrome-extension/global.css";
import Popup from "./chrome-extension/popup";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="bg-white w-[400px] h-[600px]">
      <Popup />
    </div>
  </StrictMode>
);
