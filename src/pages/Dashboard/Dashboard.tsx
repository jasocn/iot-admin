import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Server, Bell, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const stats = [
  {
    title: "在线设备数",
    icon: <Server className="h-5 w-5 text-green-600" />,
    value: "8 / 10",
    description: "当前活跃设备",
    trend: [6, 7, 8, 8, 9, 8, 8],
  },
  {
    title: "今日告警数",
    icon: <Bell className="h-5 w-5 text-red-600" />,
    value: "5",
    description: "过去24小时触发的告警",
    trend: [1, 3, 4, 4, 5, 5, 5],
  },
  {
    title: "平均采集频率",
    icon: <Activity className="h-5 w-5 text-blue-600" />,
    value: "500ms",
    description: "当前系统平均采样周期",
    trend: [520, 510, 500, 495, 490, 500, 500],
  },
  {
    title: "数据上传成功率",
    icon: <TrendingUp className="h-5 w-5 text-indigo-600" />,
    value: "99.8%",
    description: "与服务器通信成功率",
    trend: [98.6, 98.9, 99.2, 99.5, 99.7, 99.8, 99.8],
  },
];

const systemTrend = Array.from({ length: 20 }, (_, i) => ({
  time: `T-${20 - i}`,
  cpu: 20 + Math.random() * 60,
  mem: 30 + Math.random() * 40,
}));

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">系统总览</h2>
        <Button variant="outline">刷新数据</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {stats.map((item, index) => (
          <Card key={index} className="shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
              <ResponsiveContainer width="100%" height={40}>
                <LineChart data={item.trend.map((v, i) => ({ x: i, y: v }))}>
                  <Line type="monotone" dataKey="y" stroke="#4f46e5" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rounded-xl border bg-white p-4 shadow dark:bg-slate-900">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">系统资源使用情况</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={systemTrend}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="cpu" stroke="#ef4444" name="CPU (%)" dot={false} />
            <Line type="monotone" dataKey="mem" stroke="#3b82f6" name="内存 (%)" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
