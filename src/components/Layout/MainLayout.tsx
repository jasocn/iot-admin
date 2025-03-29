import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Home, Server, Activity, History, Settings, AlertTriangle, Upload, FileText, Users } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserMenu } from "@/components/UserMenu";

const menuItems = [
  { name: "Dashboard", path: "/", icon: <Home size={18} /> },
  { name: "Devices", path: "/devices", icon: <Server size={18} /> },
  { name: "Realtime", path: "/realtime", icon: <Activity size={18} /> },
  { name: "History", path: "/history", icon: <History size={18} /> },
  { name: "Config", path: "/config", icon: <Settings size={18} /> },
  { name: "Alerts", path: "/alerts", icon: <AlertTriangle size={18} /> },
  { name: "OTA", path: "/ota", icon: <Upload size={18} /> },
  { name: "Logs", path: "/logs", icon: <FileText size={18} /> },
  { name: "Users", path: "/users", icon: <Users size={18} /> },
  { name: "Settings", path: "/settings", icon: <Settings size={18} /> }
];

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-900 text-white">
        <div className="p-4 text-xl font-bold border-b border-gray-700">IoT Admin</div>
        <nav className="mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2 hover:bg-gray-800 ${location.pathname === item.path ? "bg-gray-800" : ""}`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 bg-gray-50 overflow-y-auto">
        <div className="p-4 border-b border-gray-200 bg-white shadow">
          <h1 className="text-xl font-semibold">IoT Admin Platform</h1>
          <div className="ml-auto flex items-center space-x-2"><ThemeToggle /><UserMenu /></div>
        </div>
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
