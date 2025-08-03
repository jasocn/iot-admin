import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import LevelBadge from "@/components/LevelBadge";
import { useEffect, useState } from "react";
import { getAlerts, confirmAlert } from "@/services/api";

type AlertItem = {
  id: number;
  time: string;
  device: string;
  variable: string;
  value: string;
  level: "Info" | "Warning" | "Critical";
  status: "未确认" | "已确认";
};

const Alerts = () => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    getAlerts(token).then((data) => {
      const list = data.map((a: any) => ({
        id: a.id,
        time: new Date(a.time).toLocaleString(),
        device: a.deviceId,
        variable: a.variable,
        value: a.value,
        level: a.level as AlertItem['level'],
        status: a.status as AlertItem['status'],
      }));
      setAlerts(list);
    });
  }, [token]);

  const handleConfirm = async (id: number) => {
    await confirmAlert(id, token);
    // 更新本地状态
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, status: '已确认' } : a)));
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">告警日志</h2>
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
              <TableCell>
                <LevelBadge level={a.level} />
              </TableCell>
              <TableCell>{a.status}</TableCell>
              <TableCell>
                {a.status === '未确认' && (
                  <Button variant="outline" onClick={() => handleConfirm(a.id)}>
                    确认
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Alerts;
