import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const SettingsContext = createContext();

const defaultSettings = {
  notifications: true,
  autoDelete: false,

  defaultCategory: "Work",
  defaultPriority: "Medium",

  weekStarts: "Monday",

  dateFormat: "DD/MM/YYYY",
  timeFormat: "24 Hours",
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const stored = localStorage.getItem("planner-settings");

    return stored
      ? JSON.parse(stored)
      : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem(
      "planner-settings",
      JSON.stringify(settings)
    );
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({
      ...prev,
      ...newSettings,
    }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSetting,
        updateSettings,
        resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error(
      "useSettings must be used inside SettingsProvider."
    );
  }

  return context;
};