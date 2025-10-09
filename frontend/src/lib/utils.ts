import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const API_BASE = import.meta.env.VITE_API_BASE || '';

export async function fetchReport() {
  const res = await fetch(`${API_BASE}/report/out/report.json`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load report');
  return res.json();
}

export async function fetchLogs() {
  const res = await fetch(`${API_BASE}/evidence/sidecar.log.jsonl`, { cache: 'no-store' });
  if (!res.ok) return '';
  return res.text();
}