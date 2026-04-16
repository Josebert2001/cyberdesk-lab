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

interface ExamNote {
  id: number;
  topic: string;
  bullets: string[];
  date: string;
}

export function saveToExamPrep(topic: string, bullets: string[]) {
  const existing = safeJsonParse<ExamNote[]>("cyberdesk_exam_notes", []);
  existing.push({
    id: Date.now(),
    topic,
    bullets,
    date: new Date().toLocaleDateString(),
  });
  localStorage.setItem("cyberdesk_exam_notes", JSON.stringify(existing));
}
