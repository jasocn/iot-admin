import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const generateMockData = () => {
  const now = new Date();
  return {
    time: now.toLocaleTimeString(),
    temperature: (Math.random() * 20 + 60).toFixed(2),
    pressure: (Math.random() * 2 + 0.5).toFixed(2),
    voltage: (Math.random() * 10 + 210).toFixed(2),
  };
};

const Realtime = () => {
  const [device, setDevice] = useState("iot2050-001");
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const next = [...prev, generateMockData()];
        return next.length > 20 ? next.slice(-20) : next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">实时监控</h2>
        <Select onValueChange={setDevice} defaultValue={device}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="选择设备" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="iot2050-001">iot2050-001</SelectItem>
            <SelectItem value="iot2050-002">iot2050-002</SelectItem>
            <SelectItem value="iot2050-003">iot2050-003</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-medium mb-2">温度 (℃)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <XAxis dataKey="time" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Line type="monotone" dataKey="temperature" stroke="#8884d8" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-medium mb-2">压力 (Bar)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <XAxis dataKey="time" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Line type="monotone" dataKey="pressure" stroke="#82ca9d" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-medium mb-2">电压 (V)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <XAxis dataKey="time" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Line type="monotone" dataKey="voltage" stroke="#ffc658" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Realtime;
