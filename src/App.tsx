import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import Login from "./pages/Login/Login";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = localStorage.getItem("auth") === "true";
  return isAuth ? children : <Navigate to="/login" />;
};

import Dashboard from "./pages/Dashboard/Dashboard";
import Devices from "./pages/Devices/Devices";
import Realtime from "./pages/Realtime/Realtime";
import History from "./pages/History/History";
import Config from "./pages/Config/Config";
import Alerts from "./pages/Alerts/Alerts";
import OTA from "./pages/OTA/OTA";
import Logs from "./pages/Logs/Logs";
import Users from "./pages/Users/Users";
import Settings from "./pages/Settings/Settings";
import DashboardScreen from "./pages/DashboardScreen/DashboardScreen";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <Router>
      {/* 全局通知容器，确保 toast 能正常渲染 */}
      <Toaster position="top-center" richColors />
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/screen" element={<DashboardScreen />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/realtime" element={<Realtime />} />
          <Route path="/history" element={<History />} />
          <Route path="/config" element={<Config />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/ota" element={<OTA />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
