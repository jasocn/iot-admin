import {
  Home,
  Server,
  Activity,
  History,
  Settings,
  AlertTriangle,
  Upload,
  FileText,
  Users,
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserMenu } from "@/components/UserMenu";

const menuItems = [
  { name: "仪表盘", path: "/", icon: <Home className="w-4 h-4" /> },
  { name: "设备管理", path: "/devices", icon: <Server className="w-4 h-4" /> },
  { name: "实时监控", path: "/realtime", icon: <Activity className="w-4 h-4" /> },
  { name: "历史数据", path: "/history", icon: <History className="w-4 h-4" /> },
  { name: "配置下发", path: "/config", icon: <Settings className="w-4 h-4" /> },
  { name: "告警日志", path: "/alerts", icon: <AlertTriangle className="w-4 h-4" /> },
  { name: "OTA 升级", path: "/ota", icon: <Upload className="w-4 h-4" /> },
  { name: "日志系统", path: "/logs", icon: <FileText className="w-4 h-4" /> },
  { name: "用户管理", path: "/users", icon: <Users className="w-4 h-4" /> },
];

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-muted text-muted-foreground">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-slate-800">IoT Admin</div>
        <nav className="flex-1 overflow-auto">
          <ul className="py-4 space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-2 hover:bg-slate-800 ${
                    location.pathname === item.path ? "bg-slate-800" : ""
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="p-4 border-b border-gray-200 bg-white shadow flex justify-between items-center">
          <h1 className="text-xl font-semibold">IoT Admin Platform</h1>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-muted overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
