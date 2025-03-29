import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

type User = {
  id: number;
  username: string;
  role: "管理员" | "运维" | "只读";
  enabled: boolean;
  createdAt: string;
};

const initialUsers: User[] = [
  { id: 1, username: "admin", role: "管理员", enabled: true, createdAt: "2024-01-01" },
  { id: 2, username: "operator", role: "运维", enabled: false, createdAt: "2024-03-01" },
  { id: 3, username: "viewer", role: "只读", enabled: true, createdAt: "2025-03-01" },
];

const Users = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState("");

  const toggleUserStatus = (id: number) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, enabled: !u.enabled } : u)));
  };

  const filteredUsers = users.filter((u) => u.username.includes(search));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">用户管理</h2>

      <div className="flex gap-4 items-center">
        <Button onClick={() => alert("打开添加用户表单（模拟）")}>添加用户</Button>
        <Input
          placeholder="搜索用户名"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>用户名</TableHead>
            <TableHead>角色</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>创建时间</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.id}</TableCell>
              <TableCell>{u.username}</TableCell>
              <TableCell>{u.role}</TableCell>
              <TableCell>
                <Badge variant={u.enabled ? "default" : "destructive"}>
                  {u.enabled ? "启用" : "禁用"}
                </Badge>
              </TableCell>
              <TableCell>{u.createdAt}</TableCell>
              <TableCell className="space-x-2">
                <Button size="sm" onClick={() => alert("编辑用户：" + u.username)}>编辑</Button>
                <Button
                  size="sm"
                  variant={u.enabled ? "destructive" : "secondary"}
                  onClick={() => toggleUserStatus(u.id)}
                >
                  {u.enabled ? "禁用" : "启用"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Users;
