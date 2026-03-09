import { createContext, useContext, useMemo, useState, useEffect } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";

type Mode = "light" | "dark" | "system";

const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: any) => {
  const [mode, setModeState] = useState<Mode>(
    (localStorage.getItem("theme") as Mode) || "system",
  );

  const setMode = (value: Mode) => {
    localStorage.setItem("theme", value);
    setModeState(value);
  };

  const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const [systemTheme, setSystemTheme] = useState(getSystemTheme());

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const listener = () => {
      setSystemTheme(media.matches ? "dark" : "light");
    };

    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, []);

  const actualMode = mode === "system" ? systemTheme : mode;

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: actualMode,
          background: {
            first: actualMode === "dark" ? "#ffffffff" : "#000000ff",
            second: actualMode === "dark" ? "#525060" : "#EAEAEA",
            third: actualMode === "dark" ? "#2D2C35" : "#FFFFFF",
            fourth: actualMode === "dark" ? "#2A2932" : "#FBFBFB",
            fiveth: actualMode === "dark" ? "#27272F" : "#F5F5F5",
            sixth: actualMode === "dark" ? "#22682A" : "#82B988",
            seventh: actualMode === "dark" ? "#696969" : "#D9D9D9",
            eighth: actualMode === "dark" ? "#C06000" : "#F0AF20",
            nineth: actualMode === "dark" ? "#222227" : "#FFFFFF",
            hovered: actualMode === "dark" ? "#87859eff" : "#696777ff",
            inversion: actualMode === "dark" ? "#000000ff" : "#ffffffff",

            default: actualMode === "dark" ? "#34333eff" : "#FFFFFF",
            paper: actualMode === "dark" ? "#2D2C35" : "#FFFFFF",
          },
        },
        typography: {
          fontFamily: "Montserrat, sans-serif",
          fontWeightRegular: "600",
        },
      }),
    [actualMode],
  );

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
