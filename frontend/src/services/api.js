const BASE = '/api';

function token() {
  return localStorage.getItem('token');
}

async function api(path, opts = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token()) headers.Authorization = `Bearer ${token()}`;

  const res = await fetch(BASE + path, { ...opts, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Something went wrong');
  return data;
}

export async function initSession() {
  const data = await api('/auth/session', { method: 'POST', body: '{}' });
  localStorage.setItem('token', data.token);
}

export function roll(sides) {
  return api('/roll', { method: 'POST', body: JSON.stringify({ sides }) });
}

export function getHistory() {
  return api('/history');
}

export function clearHistory() {
  return api('/history', { method: 'DELETE' });
}
