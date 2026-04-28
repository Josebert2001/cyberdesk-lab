import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Shared mock setup ────────────────────────────────────────────────────────

const { mockInvoke } = vi.hoisted(() => ({ mockInvoke: vi.fn() }));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: { functions: { invoke: mockInvoke } },
}));

beforeEach(() => {
  mockInvoke.mockReset();
  vi.resetModules();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

// ── analyzeWithGemini — Zod schema validation ────────────────────────────────

describe("analyzeWithGemini schema validation", () => {
  it("accepts a fully valid AiAnalysis response", async () => {
    mockInvoke.mockResolvedValue({
      data: {
        text: JSON.stringify({
          concept: "SQL Injection",
          how_it_works: "Attacker injects SQL into a query.",
          demonstration: "' OR '1'='1",
          challenge: "Try a UNION-based extraction.",
          defense: "Use parameterised queries.",
          exam_bullets: ["Input is not sanitised", "Attacker controls query logic"],
        }),
      },
      error: null,
    });

    const { analyzeWithGemini } = await import("@/lib/gemini");
    const result = await analyzeWithGemini("explain SQL injection");
    expect(result.concept).toBe("SQL Injection");
    expect(result.exam_bullets).toHaveLength(2);
  });

  it("throws when the response is missing required fields", async () => {
    mockInvoke.mockResolvedValue({
      data: { text: JSON.stringify({ concept: "XSS" }) }, // missing all other fields
      error: null,
    });

    const { analyzeWithGemini } = await import("@/lib/gemini");
    await expect(analyzeWithGemini("explain XSS")).rejects.toThrow(
      "AI returned an unexpected format"
    );
  });

  it("throws when exam_bullets is not an array", async () => {
    mockInvoke.mockResolvedValue({
      data: {
        text: JSON.stringify({
          concept: "XSS",
          how_it_works: "...",
          demonstration: "<script>",
          challenge: "Try stored XSS",
          defense: "Escape output",
          exam_bullets: "not an array",
        }),
      },
      error: null,
    });

    const { analyzeWithGemini } = await import("@/lib/gemini");
    await expect(analyzeWithGemini("explain XSS")).rejects.toThrow(
      "AI returned an unexpected format"
    );
  });

  it("throws when the proxy returns non-JSON text", async () => {
    mockInvoke.mockResolvedValue({
      data: { text: "Sorry, I cannot help with that." },
      error: null,
    });

    const { analyzeWithGemini } = await import("@/lib/gemini");
    await expect(analyzeWithGemini("explain XSS")).rejects.toThrow(
      "AI returned an unexpected format"
    );
  });
});

// ── chatWithGemini — Zod schema validation ───────────────────────────────────

describe("chatWithGemini schema validation", () => {
  it("accepts a valid ChatAiResponse", async () => {
    mockInvoke.mockResolvedValue({
      data: {
        text: JSON.stringify({
          answer: "Nmap is a network scanner.",
          example: "nmap -sV 192.168.1.0/24",
          exam_summary: "Nmap discovers hosts and services on a network.",
        }),
      },
      error: null,
    });

    const { chatWithGemini } = await import("@/lib/gemini-chat");
    const result = await chatWithGemini([{ role: "user", text: "what is nmap?" }]);
    expect(result.answer).toContain("Nmap");
    expect(result.example).toBe("nmap -sV 192.168.1.0/24");
  });

  it("fills in default empty strings for missing optional fields", async () => {
    mockInvoke.mockResolvedValue({
      data: { text: JSON.stringify({ answer: "Short answer." }) },
      error: null,
    });

    const { chatWithGemini } = await import("@/lib/gemini-chat");
    const result = await chatWithGemini([{ role: "user", text: "quick question" }]);
    expect(result.answer).toBe("Short answer.");
    expect(result.example).toBe("");
    expect(result.exam_summary).toBe("");
  });

  it("falls back gracefully when the response is not JSON", async () => {
    const rawText = "Here is your answer in plain text.";
    mockInvoke.mockResolvedValue({
      data: { text: rawText },
      error: null,
    });

    const { chatWithGemini } = await import("@/lib/gemini-chat");
    const result = await chatWithGemini([{ role: "user", text: "explain firewalls" }]);
    expect(result.answer).toBe(rawText);
    expect(result.example).toBe("");
    expect(result.exam_summary).toBe("");
  });
});

// ── Rate-limit error propagation ─────────────────────────────────────────────

describe("rate-limit error handling", () => {
  it("surfaces a 429 response as a user-friendly error", async () => {
    mockInvoke.mockResolvedValue({
      data: null,
      error: Object.assign(new Error("Too Many Requests"), {
        status: 429,
        context: { response: { status: 429 } },
      }),
    });

    const { analyzeWithGemini } = await import("@/lib/gemini");
    await expect(analyzeWithGemini("test")).rejects.toThrow();
  });
});

// ── cleanGeminiJson ──────────────────────────────────────────────────────────

describe("cleanGeminiJson", () => {
  it("strips markdown json fences", async () => {
    const { cleanGeminiJson } = await import("@/lib/gemini-proxy");
    expect(cleanGeminiJson("```json\n{}\n```")).toBe("{}");
  });

  it("strips plain code fences", async () => {
    const { cleanGeminiJson } = await import("@/lib/gemini-proxy");
    expect(cleanGeminiJson("```\n{\"key\":1}\n```")).toBe('{"key":1}');
  });

  it("leaves clean JSON unchanged", async () => {
    const { cleanGeminiJson } = await import("@/lib/gemini-proxy");
    const json = '{"answer":"hello"}';
    expect(cleanGeminiJson(json)).toBe(json);
  });

  it("trims surrounding whitespace", async () => {
    const { cleanGeminiJson } = await import("@/lib/gemini-proxy");
    expect(cleanGeminiJson("   {}   ")).toBe("{}");
  });
});
