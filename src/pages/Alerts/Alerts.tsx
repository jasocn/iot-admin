import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type AlertItem = {
  id: number;
  time: string;
  device: string;
  variable: string;
  value: string;
  level: "Info" | "Warning" | "Critical";
  status: "未确认" | "已确认";
};

const initialAlerts: AlertItem[] = [
  {
    id: 1,
    time: "2025-03-30 10:32",
    device: "iot2050-001",
    variable: "温度",
    value: "98.2 ℃",
    level: "Critical",
    status: "未确认",
  },
  {
    id: 2,
    time: "2025-03-30 10:28",
    device: "iot2050-002",
    variable: "压力",
    value: "0.3 Bar",
    level: "Warning",
    status: "未确认",
  },
  {
    id: 3,
    time: "2025-03-30 10:10",
    device: "iot2050-003",
    variable: "电压",
    value: "198 V",
    level: "Info",
    status: "已确认",
  },
];

const Alerts = () => {
  const [alerts, setAlerts] = useState(initialAlerts);

  const handleConfirm = (id: number) => {
    const updated = alerts.map((a) =>
      a.id === id ? { ...a, status: "已确认" } : a
    );
    setAlerts(updated);
    alert("已确认告警 ID: " + id);
  };

  const renderLevelBadge = (level: string) => {
    switch (level) {
      case "Critical":
        return <Badge className="bg-red-600">🟥 严重</Badge>;
      case "Warning":
        return <Badge className="bg-yellow-500 text-black">🟧 警告</Badge>;
      default:
        return <Badge className="bg-blue-500">🟦 提示</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">告警日志</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>时间</TableHead>
            <TableHead>设备</TableHead>
            <TableHead>变量</TableHead>
            <TableHead>值</TableHead>
            <TableHead>级别</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alerts.map((a) => (
            <TableRow key={a.id}>
              <TableCell>{a.time}</TableCell>
              <TableCell>{a.device}</TableCell>
              <TableCell>{a.variable}</TableCell>
              <TableCell>{a.value}</TableCell>
              <TableCell>{renderLevelBadge(a.level)}</TableCell>
              <TableCell>
                <Badge variant={a.status === "已确认" ? "default" : "destructive"}>
                  {a.status}
                </Badge>
              </TableCell>
              <TableCell>
                {a.status === "未确认" && (
                  <Button size="sm" onClick={() => handleConfirm(a.id)}>
                    确认
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Alerts;
