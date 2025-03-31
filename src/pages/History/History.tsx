import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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

const generateHistoryData = () => {
  const result = [];
  const now = new Date();
  for (let i = 0; i < 30; i++) {
    const t = new Date(now.getTime() - (30 - i) * 60000);
    result.push({
      time: t.toLocaleTimeString(),
      temperature: (Math.random() * 20 + 60).toFixed(2),
      pressure: (Math.random() * 2 + 0.5).toFixed(2),
      voltage: (Math.random() * 10 + 210).toFixed(2),
    });
  }
  return result;
};

const History = () => {
  const [device, setDevice] = useState("iot2050-001");
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setData(generateHistoryData());
  }, [device]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">历史数据查询</h2>

      <div className="flex flex-wrap items-center gap-4">
        <Select onValueChange={setDevice} defaultValue={device}>
          <SelectTrigger className="w-60">
            <SelectValue placeholder="选择设备" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="iot2050-001">iot2050-001</SelectItem>
            <SelectItem value="iot2050-002">iot2050-002</SelectItem>
            <SelectItem value="iot2050-003">iot2050-003</SelectItem>
          </SelectContent>
        </Select>

        <Input type="date" />
        <Input type="date" />
        <Button onClick={() => setData(generateHistoryData())}>查询</Button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="font-medium mb-2">历史趋势图</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="time" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temperature" stroke="#8884d8" dot={false} />
            <Line type="monotone" dataKey="pressure" stroke="#82ca9d" dot={false} />
            <Line type="monotone" dataKey="voltage" stroke="#ffc658" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="font-medium mb-2">数据明细表</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>时间</TableHead>
              <TableHead>温度 (℃)</TableHead>
              <TableHead>压力 (Bar)</TableHead>
              <TableHead>电压 (V)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.temperature}</TableCell>
                <TableCell>{row.pressure}</TableCell>
                <TableCell>{row.voltage}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default History;
