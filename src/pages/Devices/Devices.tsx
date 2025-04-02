import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const mockDevices = [
  {
    id: "iot2050-001",
    name: "前电机加液",
    ip: "192.168.1.10",
    status: "online",
    lastSeen: "2025-03-30 10:32",
  },
  {
    id: "iot2050-002",
    name: "轮胎机",
    ip: "192.168.1.11",
    status: "offline",
    lastSeen: "2025-03-30 09:48",
  },
  {
    id: "iot2050-003",
    name: "HOP线",
    ip: "192.168.1.12",
    status: "online",
    lastSeen: "2025-03-30 10:30",
  },
  {
    id: "iot2050-003",
    name: "底盘合装线",
    ip: "192.168.1.12",
    status: "online",
    lastSeen: "2025-03-30 10:30",
  },
];

const Devices = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">设备管理</h2>
        <Input className="w-64" placeholder="搜索设备 ID..." />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>名称</TableHead>
            <TableHead>IP 地址</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>最后心跳</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockDevices.map((device) => (
            <TableRow key={device.id}>
              <TableCell>{device.id}</TableCell>
              <TableCell>{device.name}</TableCell>
              <TableCell>{device.ip}</TableCell>
              <TableCell>
                <Badge variant={device.status === "online" ? "default" : "destructive"}>
                  {device.status === "online" ? "在线" : "离线"}
                </Badge>
              </TableCell>
              <TableCell>{device.lastSeen}</TableCell>
              <TableCell className="space-x-2">
                <Button size="sm" variant="outline" onClick={() => alert(`配置 ${device.id}`)}>配置</Button>
                <Button size="sm" variant="outline" onClick={() => alert(`日志 ${device.id}`)}>日志</Button>
                <Button size="sm" variant="secondary" onClick={() => alert(`重启 ${device.id}`)}>重启</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Devices;
