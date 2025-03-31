import  { useState } from "react";
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
    value: 20 + Math.floor(Math.random() * 6),
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

const stats = [
  {
    key: "onlineDevices",
    title: "在线采集终端",
    icon: <Server className="h-5 w-5 text-green-600" />,
    value: "24 / 26",
    description: "总装产线上的边缘采集器运行状态",
  },
  {
    key: "alerts",
    title: "今日报警次数",
    icon: <Bell className="h-5 w-5 text-red-600" />,
    value: "12",
    description: "包含扭矩偏差、扫码失败等生产异常报警",
  },
  {
    key: "cycle",
    title: "平均节拍周期",
    icon: <Activity className="h-5 w-5 text-blue-600" />,
    value: "68s",
    description: "总装产线单工位平均装配时间",
  },
  {
    key: "successRate",
    title: "数据上传成功率",
    icon: <TrendingUp className="h-5 w-5 text-indigo-600" />,
    value: "99.2%",
    description: "MQTT 实时上报至中心服务器的成功率",
  },
];

const Dashboard = () => {
  const [selectedKey, setSelectedKey] = useState<keyof typeof chartData>("onlineDevices");
  const [selectedRange, setSelectedRange] = useState(14);

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
          <LineChart data={chartData[selectedKey].slice(-selectedRange)}>
            <XAxis dataKey="time" tick={{ fontSize: 12 }} label={{ value: "时间", position: "insideBottomRight", offset: -5 }} />
            <YAxis
              allowDecimals
              domain={["auto", "auto"]}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => {
                switch (selectedKey) {
                  case "cycle":
                    return value + "s";
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
