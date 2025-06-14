import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./chrome-extension/global.css";
import Popup from "./chrome-extension/popup";
import { CivicAuthProvider } from "./chrome-extension/popup/hooks/civic-auth-context";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="bg-white w-[400px] h-[600px]">
      <CivicAuthProvider>
        <Popup />
      </CivicAuthProvider>
    </div>
  </StrictMode>
);
