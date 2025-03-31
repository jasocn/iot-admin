import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, AlertTriangle, Clock, Wifi, CheckCircle, MapPin } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const generateChartData = () => Array.from({ length: 20 }, (_, i) => ({
  time: `T-${20 - i}`,
  value: 60 + Math.random() * 20,
}));

const generateQualityData = () => Array.from({ length: 10 }, (_, i) => ({
  batch: `VIN-${1000 + i}`,
  rate: 95 + Math.random() * 5,
}));

const stats = [
  {
    title: "在线设备",
    icon: <Server className="h-6 w-6 text-green-500" />,
    value: "24 / 26",
    desc: "在线边缘网关数量",
  },
  {
    title: "报警次数",
    icon: <AlertTriangle className="h-6 w-6 text-red-500" />,
    value: "12",
    desc: "今日累计报警",
  },
  {
    title: "节拍时间",
    icon: <Clock className="h-6 w-6 text-blue-500" />,
    value: "68s",
    desc: "平均单车装配节拍",
  },
  {
    title: "上传成功率",
    icon: <Wifi className="h-6 w-6 text-indigo-500" />,
    value: "99.2%",
    desc: "MQTT 数据上报成功率",
  },
];

const workshopData = [
  { name: "焊装", count: 12 },
  { name: "涂装", count: 8 },
  { name: "总装", count: 26 },
  { name: "检测", count: 5 },
];

const DashboardScreen = () => {
  const [chartData, setChartData] = useState(generateChartData());
  const [qualityData, setQualityData] = useState(generateQualityData());

  useEffect(() => {
    const timer = setInterval(() => {
      setChartData(generateChartData());
      setQualityData(generateQualityData());
    }, 30000); // 每 30 秒刷新

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8 space-y-8">
      <h1 className="text-3xl font-bold tracking-wide text-center">汽车工厂 · 总装数据看板</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, i) => (
          <Card key={i} className="bg-slate-800 border-none shadow-xl">
            <CardHeader className="flex flex-row justify-between items-center pb-1">
              <CardTitle className="text-sm text-gray-300">{item.title}</CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{item.value}</div>
              <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-slate-800 p-6 rounded-xl shadow-xl">
        <h2 className="text-lg font-semibold mb-4">节拍趋势图（近 20 次装配）</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="time" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
            <Line type="monotone" dataKey="value" stroke="#38bdf8" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <h2 className="text-lg font-semibold">一次合格率(10 辆车）</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={qualityData}>
              <XAxis dataKey="batch" stroke="#ccc" />
              <YAxis stroke="#ccc" domain={[90, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} formatter={(v) => `${v.toFixed(1)}%`} />
              <Bar dataKey="rate" fill="#4ade80" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-5 w-5 text-yellow-400" />
            <h2 className="text-lg font-semibold">车间设备分布</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={workshopData} layout="vertical">
              <XAxis type="number" stroke="#ccc" />
              <YAxis dataKey="name" type="category" stroke="#ccc" width={80} />
              <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
              <Bar dataKey="count" fill="#facc15" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
