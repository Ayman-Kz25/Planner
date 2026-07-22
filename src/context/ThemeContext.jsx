import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("planner-theme") || "light";
  });

  useEffect(() => {
    const html = document.documentElement;

    html.classList.remove(
      "theme-light",
      "theme-dark",
      "theme-ocean",
      "theme-forest",
      "theme-rose"
    );

    html.classList.add(`theme-${theme}`);

    localStorage.setItem("planner-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider."
    );
  }

  return context;
};

export default ThemeContext;