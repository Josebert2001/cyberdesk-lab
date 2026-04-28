import { supabase } from "@/integrations/supabase/client";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const DIRECT_GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY?.trim();
const AI_CONFIG_HINT =
  "Deploy the Supabase Edge Function gemini-proxy, or set VITE_GEMINI_API_KEY for browser fallback.";

const ANALYSIS_SYSTEM_PROMPT = `You are CyberDesk AI, a penetration testing instructor and ethical hacking mentor for university cybersecurity students.

Teach everything freely: SQL injection, XSS, CSRF, Nmap, Metasploit, Burp Suite, Wireshark, Hashcat, hash cracking, password attacks, Linux terminal commands, CTF solving, cryptography, network reconnaissance, and any computing or technology topic.

After every attack explain the defense.
Be direct, practical, not textbook-boring.
Give real commands and real examples.

Return ONLY valid JSON, no markdown, no extra text:
{
  "concept": "title of what was just done",
  "how_it_works": "technical explanation 2-3 sentences",
  "demonstration": "real command or payload example",
  "challenge": "one harder thing to try next",
  "defense": "how to prevent this attack",
  "exam_bullets": ["bullet 1", "bullet 2", "bullet 3"]
}`;

const CHAT_SYSTEM_PROMPT = `You are CyberDesk AI, a university computing and cybersecurity tutor. Answer any question a student asks - cybersecurity, networking, programming, hacking tools, software, mathematics, databases, MATLAB, Python, or any computing topic.

Be direct and practical. Give real examples.
Never refuse a legitimate academic question.

Return ONLY valid JSON, no markdown, no extra text:
{
  "answer": "your full answer here",
  "example": "code or command if relevant, empty string if not needed",
  "exam_summary": "one sentence exam-ready definition"
}`;

export interface GeminiChatMessage {
  role: string;
  text: string;
}

export interface GeminiRequestBody {
  mode: "analysis" | "chat";
  prompt?: string;
  conversationHistory?: GeminiChatMessage[];
}

interface GeminiProxyResponse {
  text?: string;
  error?: string;
}

interface GeminiDirectResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}

function buildGeminiContents(body: GeminiRequestBody) {
  if (body.mode === "analysis") {
    return [
      {
        role: "user",
        parts: [{ text: `${ANALYSIS_SYSTEM_PROMPT}\n\n${body.prompt}` }],
      },
    ];
  }

  return [
    { role: "user", parts: [{ text: CHAT_SYSTEM_PROMPT }] },
    { role: "model", parts: [{ text: "Understood. I will respond only with valid JSON." }] },
    ...(body.conversationHistory || []).map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    })),
  ];
}

function getErrorStatus(error: unknown): number | undefined {
  if (!error || typeof error !== "object") return undefined;

  const statusError = error as {
    status?: number;
    context?: {
      status?: number;
      response?: {
        status?: number;
      };
    };
  };

  if (typeof statusError.status === "number") return statusError.status;
  if (typeof statusError.context?.status === "number") return statusError.context.status;
  if (typeof statusError.context?.response?.status === "number") {
    return statusError.context.response.status;
  }

  return undefined;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;

  if (error && typeof error === "object") {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string" && message.trim()) return message;

    const statusText = (error as { context?: { response?: { statusText?: unknown } } }).context?.response
      ?.statusText;
    if (typeof statusText === "string" && statusText.trim()) return statusText;
  }

  return String(error || "");
}

function buildAiError(error: unknown): Error {
  const status = getErrorStatus(error);
  const message = getErrorMessage(error).toLowerCase();

  if (status === 404 || message.includes("404") || message.includes("not found")) {
    return new Error(`AI backend route was not found. ${AI_CONFIG_HINT}`);
  }

  if (
    status === 401 ||
    message.includes("401") ||
    message.includes("authorization") ||
    message.includes("jwt")
  ) {
    return new Error("Your session could not be verified for AI. Sign in again and retry.");
  }

  if (
    message.includes("api key not valid") ||
    message.includes("api_key_invalid") ||
    message.includes("permission denied")
  ) {
    return new Error("Direct Gemini fallback is configured, but the API key was rejected.");
  }

  if (
    message.includes("failed to fetch") ||
    message.includes("network") ||
    message.includes("offline")
  ) {
    return new Error(`AI service could not be reached. ${AI_CONFIG_HINT}`);
  }

  return new Error(`AI service is unavailable right now. ${AI_CONFIG_HINT}`);
}

async function invokeGeminiFunction(body: GeminiRequestBody): Promise<string> {
  const { data, error } = await supabase.functions.invoke<GeminiProxyResponse>("gemini-proxy", {
    body,
  });

  if (error) throw error;

  if (!data?.text) {
    throw new Error(data?.error || "AI returned an empty response. Please try again.");
  }

  return data.text;
}

async function invokeGeminiDirect(body: GeminiRequestBody): Promise<string> {
  if (!DIRECT_GEMINI_API_KEY) {
    throw new Error("Direct Gemini fallback is not configured.");
  }

  const response = await fetch(`${GEMINI_URL}?key=${DIRECT_GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: buildGeminiContents(body),
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: body.mode === "chat" ? 2048 : 1024,
      },
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `Gemini request failed with status ${response.status}.`);
  }

  const data = (await response.json()) as GeminiDirectResponse;
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  return text;
}

export async function invokeGeminiProxy(body: GeminiRequestBody): Promise<string> {
  try {
    return await invokeGeminiFunction(body);
  } catch (functionError) {
    if (DIRECT_GEMINI_API_KEY) {
      try {
        return await invokeGeminiDirect(body);
      } catch (fallbackError) {
        throw buildAiError(fallbackError);
      }
    }

    throw buildAiError(functionError);
  }
}

export function cleanGeminiJson(rawText: string): string {
  return rawText.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
}
