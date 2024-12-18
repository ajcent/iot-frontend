import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import { AuthProvider } from "./contexts/authContext";
import ProtectedRoute from "./components/protectedRoute";
import DashboardHome from "./pages/dashboard/home";

const queryClient = new QueryClient();

import { useEffect } from "react";
import WebFont from "webfontloader";

const useWebFontLoader = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Open Sans:100,200,300,400,500,600,700"],
      },
      active: () => {
        console.log("Fonts are loaded");
      },
      inactive: () => {
        console.log("Fonts failed to load");
      },
    });
  }, []);
};

function App() {
  useWebFontLoader();

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
