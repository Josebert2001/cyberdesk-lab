export function safeJsonParse<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed = JSON.parse(raw);
    if (typeof fallback === "number" && typeof parsed !== "number") return fallback;
    if (Array.isArray(fallback) && !Array.isArray(parsed)) return fallback;
    return parsed as T;
  } catch {
    localStorage.removeItem(key);
    return fallback;
  }
}

export function safeGetNumber(key: string, fallback: number): number {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const num = parseInt(raw, 10);
    return isNaN(num) ? fallback : num;
  } catch {
    return fallback;
  }
}

const STORAGE_PREFIX = "cyberdesk";

interface ExamNote {
  id: number;
  topic: string;
  bullets: string[];
  date: string;
}

export function getScopedStorageKey(key: string, userId?: string | null): string {
  return `${STORAGE_PREFIX}:${userId ?? "guest"}:${key}`;
}

export function safeScopedJsonParse<T>(key: string, userId: string | null | undefined, fallback: T): T {
  return safeJsonParse(getScopedStorageKey(key, userId), fallback);
}

export function safeSetScopedJson<T>(key: string, userId: string | null | undefined, value: T) {
  localStorage.setItem(getScopedStorageKey(key, userId), JSON.stringify(value));
}

export function safeGetScopedNumber(key: string, userId: string | null | undefined, fallback: number): number {
  return safeGetNumber(getScopedStorageKey(key, userId), fallback);
}

export function safeSetScopedNumber(key: string, userId: string | null | undefined, value: number) {
  localStorage.setItem(getScopedStorageKey(key, userId), String(value));
}

export function safeGetScopedBoolean(key: string, userId: string | null | undefined, fallback = false): boolean {
  try {
    const raw = localStorage.getItem(getScopedStorageKey(key, userId));
    if (raw === null) return fallback;
    return raw === "true";
  } catch {
    return fallback;
  }
}

export function safeSetScopedBoolean(key: string, userId: string | null | undefined, value: boolean) {
  localStorage.setItem(getScopedStorageKey(key, userId), String(value));
}

export function saveToExamPrep(userId: string | null | undefined, topic: string, bullets: string[]) {
  const existing = safeScopedJsonParse<ExamNote[]>("exam_notes", userId, []);
  existing.push({
    id: Date.now(),
    topic,
    bullets,
    date: new Date().toLocaleDateString(),
  });
  safeSetScopedJson("exam_notes", userId, existing);
}
