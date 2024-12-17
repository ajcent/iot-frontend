import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import { AuthProvider } from "./contexts/authContext";
import ProtectedRoute from "./components/protectedRoute";
import DashboardHome from "./pages/dashboard/home";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardHome />
              </ProtectedRoute>
            }
          />
        </Routes>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
