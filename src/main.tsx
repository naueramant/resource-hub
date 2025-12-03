import { Box, CssBaseline, CssVarsProvider, styled } from "@mui/joy";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import HydrationGate from "./components/HydrationGate";
import "./index.scss";
import theme from "./theme";
import IndexView from "./views";

const Main = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  minHeight: "100%",
  backgroundColor: "var(--joy-palette-background-body)",
  color: "var(--joy-palette-text-primary)",
});

// Component that waits for zustand stores to hydrate before rendering children

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssVarsProvider
      theme={theme}
      defaultMode="system"
      modeStorageKey="resource-hub-theme-mode"
    >
      <CssBaseline />
      <Main>
        <HydrationGate>
          <IndexView />
        </HydrationGate>
      </Main>
    </CssVarsProvider>
  </StrictMode>
);
