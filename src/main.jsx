import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";
import { SettingsProvider } from "./context/SettingsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ThemeProvider>
      <TaskProvider>
        <SettingsProvider>
          <App />
        </SettingsProvider>
      </TaskProvider>
    </ThemeProvider>
  </AuthProvider>,
);
