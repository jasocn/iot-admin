/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { getStatsOverview } from "@/services/api";

import StatCard from "@/components/StatCard";
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

type ChartKey = 'onlineDevices' | 'alerts' | 'cycle' | 'successRate';

const chartData: Record<ChartKey, { time: string; value: number }[]> = {
  onlineDevices: Array.from({ length: 20 }, (_, i) => ({
    time: `T-${20 - i}`,
    value: Math.floor(Math.random() * 6),
  })),
  alerts: Array.from({ length: 20 }, (_, i) => ({
    time: `T-${20 - i}`,
    value: Math.floor(Math.random() * 5 + 2),
  })),
  cycle: Array.from({ length: 20 }, (_, i) => ({
    time: `T-${20 - i}`,
    value: 60 + Math.random() * 15,
  })),
  successRate: Array.from({ length: 20 }, (_, i) => ({
    time: `T-${20 - i}`,
    value: 97 + Math.random() * 3,
  })),
};


// 仪表盘卡片配置，由接口返回的数据填充
const statDefinitions = [
  {
    key: "onlineDevices",
    title: "在线采集终端",
    icon: <Server className="w-8 h-8" />,
    description: "总装产线上的边缘采集器运行状态",
  },
  {
    key: "alertsToday",
    title: "今日报警次数",
    icon: <Bell className="w-8 h-8" />,
    description: "包含扭矩偏差、扫码失败等生产异常报警",
  },
  {
    key: "avgCycle",
    title: "平均节拍周期",
    icon: <Activity className="w-8 h-8" />,
    description: "总装产线单工位平均装配时间",
  },
  {
    key: "successRate",
    title: "数据上传成功率",
    icon: <TrendingUp className="w-8 h-8" />,
    description: "MQTT 实时上报至中心服务器的成功率",
  },
];
type Stats = {
  onlineDevices?: number;
  alertsToday?: number;
  avgCycle?: number;
  successRate?: number;
  [key: string]: any;
};

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({});
  const [selectedKey, setSelectedKey] = useState<ChartKey>('onlineDevices');
  const [selectedRange, setSelectedRange] = useState(14);
  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    // 加载仪表盘统计信息
    getStatsOverview(token).then((data) => {
      setStats(data);
    });
  }, [token]);



  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-2">
        <h2 className="text-2xl font-semibold tracking-tight">总装车间 - 系统总览</h2>
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
        {statDefinitions.map((item) => (
          <StatCard
            key={item.key}
            title={item.title}
            value={stats[item.key]}
            icon={item.icon}
            description={item.description}
            onClick={() => setSelectedKey(item.key as ChartKey)}
            className={`shadow cursor-pointer transition-all border-2 ${
              selectedKey === item.key ? "border-blue-600" : "border-transparent"
            }`}
          />
        ))}
      </div>

      <div className="rounded-xl border bg-white p-4 shadow dark:bg-slate-900">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
           {statDefinitions.find((s) => s.key === selectedKey)?.title} - 变化趋势图
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData[selectedKey].slice(-selectedRange)}>
            <XAxis dataKey="time" tick={{ fontSize: 12 }} label={{ value: "时间", position: "insideBottomRight", offset: -5 }} />
            <YAxis
              allowDecimals
              domain={["auto", "auto"]}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => {
                switch (selectedKey) {
                  case "cycle":
                    return value + " 秒";
                  case "successRate":
                    return value.toFixed(1) + "%";
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
