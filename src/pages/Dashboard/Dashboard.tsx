import React, { useState } from "react";
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

const chartData = {
  onlineDevices: Array.from({ length: 20 }, (_, i) => ({
    time: `T-${20 - i}`,
    value: 6 + Math.random() * 4,
  })),
  alerts: Array.from({ length: 20 }, (_, i) => ({
    time: `T-${20 - i}`,
    value: Math.floor(Math.random() * 10),
  })),
  cycle: Array.from({ length: 20 }, (_, i) => ({
    time: `T-${20 - i}`,
    value: 480 + Math.random() * 40,
  })),
  successRate: Array.from({ length: 20 }, (_, i) => ({
    time: `T-${20 - i}`,
    value: 98 + Math.random() * 2,
  })),
};

const stats = [
  {
    key: "onlineDevices",
    title: "在线设备数",
    icon: <Server className="h-5 w-5 text-green-600" />,
    value: "8 / 10",
    description: "当前活跃设备",
  },
  {
    key: "alerts",
    title: "今日告警数",
    icon: <Bell className="h-5 w-5 text-red-600" />,
    value: "5",
    description: "过去24小时触发的告警",
  },
  {
    key: "cycle",
    title: "平均采集频率",
    icon: <Activity className="h-5 w-5 text-blue-600" />,
    value: "500ms",
    description: "当前系统平均采样周期",
  },
  {
    key: "successRate",
    title: "数据上传成功率",
    icon: <TrendingUp className="h-5 w-5 text-indigo-600" />,
    value: "99.8%",
    description: "与服务器通信成功率",
  },
];

const Dashboard = () => {
  const [selectedRange, setSelectedRange] = useState(14);
  const [selectedKey, setSelectedKey] = useState("onlineDevices");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-2">
        <h2 className="text-2xl font-semibold tracking-tight">系统总览</h2>
        <Button variant="outline">刷新数据</Button>
      </div>

      <div className="flex gap-4">
        <Button
          variant={selectedRange === 7 ? "default" : "outline"}
          onClick={() => setSelectedRange(7)}
        >
          最近 7 条
        </Button>
        <Button
          variant={selectedRange === 14 ? "default" : "outline"}
          onClick={() => setSelectedRange(14)}
        >
          最近 14 条
        </Button>
        <Button
          variant={selectedRange === 20 ? "default" : "outline"}
          onClick={() => setSelectedRange(20)}
        >
          最近 20 条
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {stats.map((item) => (
          <Card
            key={item.key}
            className={`shadow cursor-pointer transition-all border-2 ${
              selectedKey === item.key ? "border-blue-600" : "border-transparent"
            }`}
            onClick={() => setSelectedKey(item.key)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rounded-xl border bg-white p-4 shadow dark:bg-slate-900">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          {stats.find((s) => s.key === selectedKey)?.title} - 变化趋势图
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          {/* Chart dynamically sliced by selectedRange */}
          <LineChart data={chartData[selectedKey].slice(-selectedRange)}>
            <XAxis dataKey="time" tick={{ fontSize: 12 }} label={{ value: "时间", position: "insideBottomRight", offset: -5 }} />
            <YAxis
              allowDecimals
              domain={["auto", "auto"]}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => {
                switch (selectedKey) {
                  case "cycle":
                    return value + "ms";
                  case "successRate":
                    return value.toFixed(1) + "%";
                  case "alerts":
                  case "onlineDevices":
                  default:
                    return value;
                }
              }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#4f46e5"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
