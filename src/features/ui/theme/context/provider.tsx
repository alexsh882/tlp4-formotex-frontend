import useLocalStorage from "@/features/common/use-storage";
import { createContext, useEffect, useState } from "react";
import { AvailableThemesEnum } from "../../const/available-themes";

export type Theme = "dark" | "light" | "system";


type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {

  const { value: themeValue, setItem } = useLocalStorage(storageKey);

  const [theme, setTheme] = useState<Theme>(
    () => (themeValue as Theme) || defaultTheme
  );


  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(AvailableThemesEnum.LIGHT, AvailableThemesEnum.DARK);

    if (theme === AvailableThemesEnum.SYSTEM) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? AvailableThemesEnum.DARK
        : AvailableThemesEnum.LIGHT;

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setItem(theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
