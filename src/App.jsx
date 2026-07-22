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
        <ScrollToTop />
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
