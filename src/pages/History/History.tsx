import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, Wifi, Car, TrendingUp } from "lucide-react";

const generateHistoryData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    timestamp: new Date(Date.now() - i * 60000).toLocaleTimeString(),
    uploadSuccessRate: (98 + Math.random() * 2).toFixed(2) + "%",
    vehiclesInLine: Math.floor(Math.random() * 4 + 1),
    cycleTime: (60 + Math.random() * 10).toFixed(1) + "s",
    jph: (30 + Math.random() * 10).toFixed(1),
  }));
};

const History = () => {
  const [data, setData] = useState(generateHistoryData());

  useEffect(() => {
    const timer = setInterval(() => {
      setData(generateHistoryData());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">历史数据记录</h2>
      <div className="flex flex-wrap items-center gap-4">
        <label className="text-sm font-medium">起止时间：</label>
        <input type="datetime-local" className="border px-2 py-1 rounded text-sm" />
        <input type="datetime-local" className="border px-2 py-1 rounded text-sm" />
        <select className="border px-2 py-1 rounded text-sm">
          <option>全部工位</option>
          <option>总装一线</option>
          <option>电池包线</option>
          <option>门盖线</option>
        </select>
        <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">查询</button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Clock className="w-4 h-4" />
            最近采集数据（自动每 30 秒刷新）
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">时间戳</TableHead>
                  <TableHead><Wifi className="inline w-4 h-4 mr-1" />上传成功率</TableHead>
                  <TableHead><Car className="inline w-4 h-4 mr-1" />车辆台数</TableHead>
                  <TableHead><Clock className="inline w-4 h-4 mr-1" />节拍</TableHead>
                  <TableHead><TrendingUp className="inline w-4 h-4 mr-1" />JPH</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{row.timestamp}</TableCell>
                    <TableCell>{row.uploadSuccessRate}</TableCell>
                    <TableCell>{row.vehiclesInLine}</TableCell>
                    <TableCell>{row.cycleTime}</TableCell>
                    <TableCell>{row.jph}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default History;
