import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/MainLayout";

import DashboardPage from "./pages/DashboardPage";
import InProgressPage from "./pages/InProgressPage";
import CompletedPage from "./pages/CompletedPage";
import CalendarPage from "./pages/CalendarPage";
import CategoryPage from "./pages/CategoryPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
