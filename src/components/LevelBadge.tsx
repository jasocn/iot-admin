import React from "react";
import { Badge } from "@/components/ui/badge";

/**
 * 用于在日志和告警列表中显示级别的统一徽章组件。
 * 根据传入的级别字符串返回不同颜色的 Badge，减少重复逻辑。
 */
export interface LevelBadgeProps {
  level: string;
}

const LevelBadge: React.FC<LevelBadgeProps> = ({ level }) => {
  switch (level) {
    case "Critical":
      return <Badge className="bg-red-600">🟥 严重</Badge>;
    case "Warning":
      return <Badge className="bg-yellow-500 text-black">🟧 警告</Badge>;
    case "ERROR":
      return <Badge className="bg-red-600">错误</Badge>;
    case "WARN":
      return <Badge className="bg-yellow-500 text-black">警告</Badge>;
    case "INFO":
      return <Badge className="bg-blue-500">信息</Badge>;
    default:
      return <Badge className="bg-blue-500">{level}</Badge>;
  }
};

export default LevelBadge;