import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark", accent: string) => createTheme({
  palette: {
    mode,
    primary: { main: accent },
    secondary: { main: "#ff4081" },
    background: {
      default: mode === "light" ? "#f6f8fa" : "#181a1b",
      paper: mode === "light" ? "#fff" : "#23272f"
    }
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 8 } } },
    MuiPaper: { styleOverrides: { root: { borderRadius: 12 } } },
  }
});