import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { getDevices, restartDevice } from "@/services/api";

// 声明设备类型，便于类型检查
type Device = {
  id: string;
  name: string;
  ip: string;
  status: string;
  lastSeen: string;
};

const Devices = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    // 从后端加载设备列表
    getDevices(token).then((data) => {
      // 服务器返回的时间戳为 UTC，需要转换为本地时间字符串
      const list = data.map((d: any) => ({
        id: d.id,
        name: d.name,
        ip: d.ip,
        status: d.status,
        lastSeen: new Date(d.lastSeen).toLocaleString(),
      }));
      setDevices(list);
    });
  }, [token]);

  const handleRestart = async (id: string) => {
    await restartDevice(id, token);
    // 重新刷新列表
    const data = await getDevices(token);
    const list = data.map((d: any) => ({
      id: d.id,
      name: d.name,
      ip: d.ip,
      status: d.status,
      lastSeen: new Date(d.lastSeen).toLocaleString(),
    }));
    setDevices(list);
  };

  return (
    // 此处保留原有的布局和表格结构，但将数据源替换为 devices
    <>
      {/* 设备管理页面内容 */}
      <h2 className="text-2xl font-bold mb-4">设备管理</h2>
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
          {devices.map((device) => (
            <TableRow key={device.id}>
              <TableCell>{device.id}</TableCell>
              <TableCell>{device.name}</TableCell>
              <TableCell>{device.ip}</TableCell>
              <TableCell>{device.status === 'online' ? '在线' : '离线'}</TableCell>
              <TableCell>{device.lastSeen}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() => handleRestart(device.id)}
                >
                  重启
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Devices;
