import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Tally } from "../src";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Tally scale={2} mode="hangout" />
  </StrictMode>,
);
