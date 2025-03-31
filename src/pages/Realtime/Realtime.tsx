import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wifi, Car, Clock, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const generateJPHData = () => Array.from({ length: 20 }, (_, i) => ({
  time: `T-${20 - i}`,
  value: 30 + Math.random() * 10,
}));

const generateRealtimeStats = () => [
  {
    title: "数据上传成功率",
    icon: <Wifi className="h-5 w-5 text-cyan-600" />,
    value: `${(98 + Math.random() * 2).toFixed(2)}%`,
    desc: "当前 MQTT 实时上传成功率",
  },
  {
    title: "实时车辆台数",
    icon: <Car className="h-5 w-5 text-lime-600" />,
    value: `${Math.floor(Math.random() * 4 + 1)} 台`,
    desc: "产线中正在装配的车辆数",
  },
  {
    title: "实时节拍",
    icon: <Clock className="h-5 w-5 text-orange-600" />,
    value: `${(60 + Math.random() * 10).toFixed(1)}s`,
    desc: "当前工位节拍周期",
  },
  {
    title: "实时 JPH",
    icon: <TrendingUp className="h-5 w-5 text-violet-600" />,
    value: `${(Math.random() * 20 + 30).toFixed(1)}`,
    desc: "每小时产出预测（Jobs Per Hour）",
  },
];

const Realtime = () => {
  const [stats, setStats] = useState(generateRealtimeStats());
  const [jphData, setJphData] = useState(generateJPHData());

  useEffect(() => {
    const timer = setInterval(() => {
      setStats(generateRealtimeStats());
      setJphData(generateJPHData());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">实时监控</h2>
      <div className="flex flex-wrap items-center gap-4">
        <label className="text-sm font-medium">时间范围：</label>
        <select className="border px-2 py-1 rounded text-sm">
          <option>最近 30 分钟</option>
          <option>最近 1 小时</option>
          <option>最近 2 小时</option>
        </select>
        <select className="border px-2 py-1 rounded text-sm">
          <option>全部工位</option>
          <option>总装一线</option>
          <option>电池包线</option>
          <option>门盖线</option>
        </select>
        <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">查询</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, index) => (
          <Card key={index} className="shadow">
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 border rounded-xl shadow p-4">
        <h3 className="text-lg font-semibold mb-4">JPH 实时趋势</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={jphData}>
            <XAxis dataKey="time" stroke="#999" />
            <YAxis stroke="#999" />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Realtime;
