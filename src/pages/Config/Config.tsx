import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

type Variable = {
  /**
   * 唯一标识，确保列表渲染时不会使用索引作为 key。
   */
  id: number;
  name: string;
  address: string;
  type: string;
};

const Config = () => {
  const [device, setDevice] = useState("iot2050-001");
  const [plcIp, setPlcIp] = useState("192.168.1.100");
  const [plcPort, setPlcPort] = useState("102");
  const [cycleMs, setCycleMs] = useState("1000");
  const [variables, setVariables] = useState<Variable[]>([{
    id: 1,
    name: "Temperature",
    address: "DB1.DBW0",
    type: "INT",
  }, {
    id: 2,
    name: "Pressure",
    address: "DB1.DBW2",
    type: "INT",
  }]);

  const handleAddVariable = () => {
    // 计算下一个 ID，保证每个变量具有唯一标识
    const nextId = variables.length
      ? Math.max(...variables.map((v) => v.id)) + 1
      : 1;
    setVariables([...variables, { id: nextId, name: "", address: "", type: "INT" }]);
  };

  const handleRemoveVariable = (id: number) => {
    setVariables(variables.filter((v) => v.id !== id));
  };

  const handleVariableChange = (
    id: number,
    field: keyof Omit<Variable, "id">,
    value: string
  ) => {
    setVariables(
      variables.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
  };

  const handleSubmit = () => {
    const config = {
      deviceId: device,
      plcIp,
      plcPort,
      cycleMs,
      variables,
    };
    console.log("📤 配置下发内容：", config);
    toast.success("配置已准备下发（模拟），请查看控制台输出");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">配置下发</h2>

      <div className="flex gap-4 items-center">
        <Select onValueChange={setDevice} defaultValue={device}>
          <SelectTrigger className="w-60">
            <SelectValue placeholder="选择设备" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="iot2050-001">iot2050-001</SelectItem>
            <SelectItem value="iot2050-002">iot2050-002</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleSubmit}>保存并下发配置</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>PLC IP 地址</Label>
          <Input value={plcIp} onChange={(e) => setPlcIp(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>PLC 端口</Label>
          <Input value={plcPort} onChange={(e) => setPlcPort(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>采集周期（毫秒）</Label>
          <Input value={cycleMs} onChange={(e) => setCycleMs(e.target.value)} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">变量列表</h3>
        {variables.map((v) => (
          <div key={v.id} className="grid grid-cols-4 gap-4 items-center mb-2">
            <Input
              placeholder="变量名称"
              value={v.name}
              onChange={(e) => handleVariableChange(v.id, "name", e.target.value)}
            />
            <Input
              placeholder="PLC 地址（如 DB1.DBW0）"
              value={v.address}
              onChange={(e) => handleVariableChange(v.id, "address", e.target.value)}
            />
            <Select
              defaultValue={v.type}
              onValueChange={(value) => handleVariableChange(v.id, "type", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INT">INT</SelectItem>
                <SelectItem value="REAL">REAL</SelectItem>
                <SelectItem value="BOOL">BOOL</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="destructive" onClick={() => handleRemoveVariable(v.id)}>
              删除
            </Button>
          </div>
        ))}
        <Button onClick={handleAddVariable}>+ 添加变量</Button>
      </div>
    </div>
  );
};

export default Config;
