import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

/**
 * 通用统计卡片组件。在多个页面中重复出现的统计卡片被抽象成单一组件，
 * 接收标题、数值、图标和描述等参数，减少重复代码。
 */
export interface StatCardProps {
  /** 卡片标题 */
  title: string;
  /** 主显示的数值或节点 */
  value: React.ReactNode;
  /** 可选的图标 */
  icon?: React.ReactNode;
  /** 描述信息 */
  description?: string;
  /** 额外的类名，用于自定义样式 */
  className?: string;
  /** 头部区额外的类名 */
  headerClassName?: string;
  /** 内容区额外的类名 */
  contentClassName?: string;

  /** 点击事件，可选 */
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  description,
  className = "",
  headerClassName = "",
  contentClassName = "",
  onClick,
}) => {
  return (
    <Card className={className} onClick={onClick}>
      <CardHeader
        className={`flex items-center justify-between space-y-0 pb-2 ${headerClassName}`}
      >
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className={contentClassName}>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;