import { useState } from "react";
import { ThemeProvider, CssBaseline, Container, IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ScanCard from "./components/ScanCard";
import { getTheme } from "./theme/theme";
import { useScan } from "./hooks/useScan";
export default function App() {
  const [mode, setMode] = useState("light");
  const theme = getTheme(mode);
  const scan = useScan();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <IconButton
          sx={{ mb: 2 }}
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
        >
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
        <ScanCard {...scan} />
      </Container>
    </ThemeProvider>
  );
}