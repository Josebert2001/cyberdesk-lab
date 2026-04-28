import { describe, it, expect, vi, beforeEach } from "vitest";
import { getRank, getNextRank, getProgressPercent, RANKS } from "@/hooks/useXP";
import { getScopedStorageKey, safeGetNumber, safeJsonParse } from "@/lib/storage";

const { mockInvoke } = vi.hoisted(() => ({
  mockInvoke: vi.fn(),
}));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    functions: {
      invoke: mockInvoke,
    },
  },
}));

describe("XP Rank Calculation", () => {
  it("returns Script Kiddie for 0 XP", () => {
    expect(getRank(0).title).toBe("Script Kiddie");
  });

  it("returns Script Kiddie for 50 XP", () => {
    expect(getRank(50).title).toBe("Script Kiddie");
  });

  it("returns Apprentice for 51 XP", () => {
    expect(getRank(51).title).toBe("Apprentice");
  });

  it("returns Hacker for 151 XP", () => {
    expect(getRank(151).title).toBe("Hacker");
  });

  it("returns Elite for 301 XP", () => {
    expect(getRank(301).title).toBe("Elite");
  });

  it("returns Legend for 501 XP", () => {
    expect(getRank(501).title).toBe("Legend");
  });

  it("returns Legend for very high XP", () => {
    expect(getRank(9999).title).toBe("Legend");
  });

  it("getNextRank returns Apprentice when Script Kiddie", () => {
    expect(getNextRank(0)?.title).toBe("Apprentice");
  });

  it("getNextRank returns null when Legend", () => {
    expect(getNextRank(501)).toBeNull();
  });

  it("getProgressPercent is 0 at rank start", () => {
    expect(getProgressPercent(0)).toBe(0);
  });

  it("getProgressPercent is 100 at max rank", () => {
    expect(getProgressPercent(999)).toBe(100);
  });

  it("getProgressPercent calculates mid-rank correctly", () => {
    const progress = getProgressPercent(100);
    expect(progress).toBeGreaterThan(0);
    expect(progress).toBeLessThan(100);
  });

  it("RANKS array has 5 entries", () => {
    expect(RANKS).toHaveLength(5);
  });

  it("RANKS are sorted by minXP ascending", () => {
    for (let i = 1; i < RANKS.length; i++) {
      expect(RANKS[i].minXP).toBeGreaterThan(RANKS[i - 1].minXP);
    }
  });
});

describe("Safe localStorage helpers", () => {
  beforeEach(() => {
    localStorage.clear();
    mockInvoke.mockReset();
  });

  describe("safeJsonParse", () => {
    it("returns fallback when key does not exist", () => {
      expect(safeJsonParse("nonexistent", [])).toEqual([]);
    });

    it("parses valid JSON array", () => {
      localStorage.setItem("test", JSON.stringify([1, 2, 3]));
      expect(safeJsonParse("test", [])).toEqual([1, 2, 3]);
    });

    it("returns fallback for corrupted JSON", () => {
      localStorage.setItem("test", "{broken json]]");
      expect(safeJsonParse("test", [])).toEqual([]);
    });

    it("removes corrupted key from storage", () => {
      localStorage.setItem("test", "not json at all");
      safeJsonParse("test", []);
      expect(localStorage.getItem("test")).toBeNull();
    });

    it("returns fallback if expected array but got object", () => {
      localStorage.setItem("test", JSON.stringify({ a: 1 }));
      expect(safeJsonParse("test", [])).toEqual([]);
    });

    it("returns fallback if expected number but got string", () => {
      localStorage.setItem("test", JSON.stringify("hello"));
      expect(safeJsonParse("test", 0)).toBe(0);
    });
  });

  describe("safeGetNumber", () => {
    it("returns fallback when key does not exist", () => {
      expect(safeGetNumber("nonexistent", 0)).toBe(0);
    });

    it("parses valid number", () => {
      localStorage.setItem("test", "42");
      expect(safeGetNumber("test", 0)).toBe(42);
    });

    it("returns fallback for NaN", () => {
      localStorage.setItem("test", "not-a-number");
      expect(safeGetNumber("test", 0)).toBe(0);
    });

    it("returns fallback for empty string", () => {
      localStorage.setItem("test", "");
      expect(safeGetNumber("test", 0)).toBe(0);
    });
  });

  it("builds user-scoped storage keys", () => {
    expect(getScopedStorageKey("exam_notes", "user-123")).toBe("cyberdesk:user-123:exam_notes");
    expect(getScopedStorageKey("exam_notes", null)).toBe("cyberdesk:guest:exam_notes");
  });
});

describe("Gemini service error handling", () => {
  it("analyzeWithGemini throws a friendly error when the proxy is unavailable", async () => {
    mockInvoke.mockResolvedValue({ data: null, error: new Error("offline") });
    const { analyzeWithGemini } = await import("@/lib/gemini");
    await expect(analyzeWithGemini("test")).rejects.toThrow(
      "AI service is unavailable right now"
    );
  });

  it("chatWithGemini parses a JSON response from the proxy", async () => {
    mockInvoke.mockResolvedValue({
      data: {
        text: JSON.stringify({
          answer: "hello",
          example: "ping localhost",
          exam_summary: "short summary",
        }),
      },
      error: null,
    });

    const { chatWithGemini } = await import("@/lib/gemini-chat");
    await expect(chatWithGemini([{ role: "user", text: "hello" }])).resolves.toEqual({
      answer: "hello",
      example: "ping localhost",
      exam_summary: "short summary",
    });
  });
});
