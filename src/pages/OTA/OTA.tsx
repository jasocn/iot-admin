import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type DeviceUpgrade = {
  id: string;
  currentVersion: string;
  targetVersion: string;
  status: "待推送" | "已完成" | "失败";
};

const initialDevices: DeviceUpgrade[] = [
  { id: "iot2050-001", currentVersion: "v1.2.0", targetVersion: "v1.3.0", status: "待推送" },
  { id: "iot2050-002", currentVersion: "v1.2.0", targetVersion: "v1.3.0", status: "待推送" },
  { id: "iot2050-003", currentVersion: "v1.1.5", targetVersion: "v1.3.0", status: "待推送" },
];

const OTA = () => {
  const [devices, setDevices] = useState(initialDevices);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFileName(e.target.files[0].name);
    }
  };

  const handlePush = (id: string) => {
    const updated = devices.map((d) =>
      d.id === id
        ? ({
            ...d,
            status: Math.random() > 0.2 ? "已完成" : "失败", // 模拟成功率
          } as DeviceUpgrade)
        : d
    );
    setDevices(updated);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">OTA 升级管理</h2>

      <div className="flex items-center gap-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <Button onClick={() => fileInputRef.current?.click()}>上传升级文件</Button>
        {fileName && <span className="text-sm text-gray-600">📦 当前文件：{fileName}</span>}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>设备</TableHead>
            <TableHead>当前版本</TableHead>
            <TableHead>目标版本</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {devices.map((d) => (
            <TableRow key={d.id}>
              <TableCell>{d.id}</TableCell>
              <TableCell>{d.currentVersion}</TableCell>
              <TableCell>{d.targetVersion}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    d.status === "已完成"
                      ? "default"
                      : d.status === "失败"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {d.status}
                </Badge>
              </TableCell>
              <TableCell>
                {d.status !== "已完成" && (
                  <Button size="sm" onClick={() => handlePush(d.id)}>
                    推送
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

export default OTA;
