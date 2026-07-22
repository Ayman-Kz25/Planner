import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";

import DashboardPage from "./pages/DashboardPage";
import InProgressPage from "./pages/InProgressPage";
import CompletedPage from "./pages/CompletedPage";
import CalendarPage from "./pages/CalendarPage";
import CategoryPage from "./pages/CategoryPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ScrollToTop from "./components/ui/ScrollToTop";
import AccountPage from "./pages/AccountPage";
import ThemePage from "./pages/ThemePage";
import SettingsPage from "./pages/SettingsPage";
import "./index.css";

const App = () => {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="in-progress" element={<InProgressPage />} />
          <Route path="completed" element={<CompletedPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="category/:category" element={<CategoryPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="theme" element={<ThemePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
