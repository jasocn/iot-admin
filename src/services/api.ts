// 统一封装与后端接口交互的函数，便于在应用中复用

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

// 登陆，返回包含 token 的响应
export async function login(username: string, password: string) {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
      });
      if (!res.ok) {
            throw new Error(await res.text());
      }
      return res.json() as Promise<{ token: string }>;
}

// 获取设备列表
export async function getDevices(token: string) {
      const res = await fetch(`${API_BASE_URL}/api/devices`, {
            headers: { Authorization: `Bearer ${token}` }
      });
      return res.json();
}

// 重启指定设备
export async function restartDevice(id: string, token: string) {
      const res = await fetch(`${API_BASE_URL}/api/devices/${id}/restart`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` }
      });
      return res.json();
}

// 获取告警列表，可按状态过滤
export async function getAlerts(token: string, status?: string) {
      const params = status ? `?status=${encodeURIComponent(status)}` : '';
      const res = await fetch(`${API_BASE_URL}/api/alerts${params}`, {
            headers: { Authorization: `Bearer ${token}` }
      });
      return res.json();
}

// 确认告警
export async function confirmAlert(id: number, token: string) {
      await fetch(`${API_BASE_URL}/api/alerts/${id}/confirm`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${token}` }
      });
}

// 获取日志列表，可按类型、级别、设备过滤
export async function getLogs(token: string, opts: { type?: string; level?: string; deviceId?: string; search?: string } = {}) {
      const query = new URLSearchParams();
      if (opts.type) query.append('type', opts.type);
      if (opts.level) query.append('level', opts.level);
      if (opts.deviceId) query.append('deviceId', opts.deviceId);
      if (opts.search) query.append('search', opts.search);
      const res = await fetch(`${API_BASE_URL}/api/logs?${query.toString()}`, {
            headers: { Authorization: `Bearer ${token}` }
      });
      return res.json();
}

// 获取指定设备的数据点列表
export async function getDataPoints(token: string, deviceId: string, rangeHours = 1) {
      const end = new Date();
      const start = new Date(end.getTime() - rangeHours * 3600 * 1000);
      const res = await fetch(`${API_BASE_URL}/api/datapoints/${deviceId}?startTime=${start.toISOString()}&endTime=${end.toISOString()}`, {
            headers: { Authorization: `Bearer ${token}` }
      });
      return res.json();
}

// 获取仪表盘概览统计
export async function getStatsOverview(token: string) {
      const res = await fetch(`${API_BASE_URL}/api/stats/overview`, {
            headers: { Authorization: `Bearer ${token}` }
      });
      return res.json();
}
