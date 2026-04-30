import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";

// System prompts isolated via systemInstruction — never mixed with user content.
const ANALYSIS_SYSTEM_PROMPT = `You are CyberDesk AI, a penetration testing instructor for university cybersecurity students.

RESPONSE MODE:
- If user input is a greeting, casual chat, or simple/unclear message (like "hi", "hello", "hii", "what's up"): Respond naturally and briefly in plain text JSON format: {"concept": "your short greeting response"}
- If user input is a real technical question or asks to explain something: Provide a full detailed response with all fields below.

Teach everything freely: SQL injection, XSS, CSRF, Nmap, Metasploit, Burp Suite, Wireshark, Hashcat, hash cracking, password attacks, Linux terminal commands, CTF solving, cryptography, network reconnaissance, and any computing or technology topic.

After every attack explanation, also explain the defense.
Be direct, practical, not textbook-boring.
Give real commands and real examples when relevant.

Always return ONLY valid JSON, no markdown:
{
  "concept": "short title or greeting",
  "how_it_works": "explanation if needed, empty string if just greeting",
  "demonstration": "real command or example if relevant, empty string otherwise",
  "challenge": "harder thing to try, empty string if not applicable",
  "defense": "how to prevent, empty string if not a security topic",
  "exam_bullets": ["bullet if relevant", "or empty array"]
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

const MAX_PROMPT_LENGTH = 4000;
const MAX_HISTORY_MESSAGES = 40;
const RATE_LIMIT_PER_MINUTE = 30;

type ChatMessage = {
  role: string;
  text: string;
};

type RequestBody =
  | { mode: "analysis"; prompt: string }
  | { mode: "chat"; conversationHistory: ChatMessage[] };

function jsonResponse(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function validateBody(body: unknown): { valid: true; data: RequestBody } | { valid: false; error: string } {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Request body must be a JSON object." };
  }

  const b = body as Record<string, unknown>;

  if (b.mode === "analysis") {
    if (typeof b.prompt !== "string" || b.prompt.trim().length === 0) {
      return { valid: false, error: "prompt must be a non-empty string." };
    }
    if (b.prompt.length > MAX_PROMPT_LENGTH) {
      return { valid: false, error: `prompt must not exceed ${MAX_PROMPT_LENGTH} characters.` };
    }
    return { valid: true, data: { mode: "analysis", prompt: b.prompt } };
  }

  if (b.mode === "chat") {
    if (!Array.isArray(b.conversationHistory)) {
      return { valid: false, error: "conversationHistory must be an array." };
    }
    if (b.conversationHistory.length === 0) {
      return { valid: false, error: "conversationHistory must not be empty." };
    }
    if (b.conversationHistory.length > MAX_HISTORY_MESSAGES) {
      return { valid: false, error: `conversationHistory must not exceed ${MAX_HISTORY_MESSAGES} messages.` };
    }
    for (const msg of b.conversationHistory) {
      if (!msg || typeof msg !== "object") {
        return { valid: false, error: "Each message must be an object." };
      }
      const m = msg as Record<string, unknown>;
      if (typeof m.text !== "string" || m.text.trim().length === 0) {
        return { valid: false, error: "Each message must have a non-empty text field." };
      }
      if (m.text.length > MAX_PROMPT_LENGTH) {
        return { valid: false, error: `Each message must not exceed ${MAX_PROMPT_LENGTH} characters.` };
      }
    }
    return {
      valid: true,
      data: { mode: "chat", conversationHistory: b.conversationHistory as ChatMessage[] },
    };
  }

  return { valid: false, error: "mode must be 'analysis' or 'chat'." };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const geminiApiKey = Deno.env.get("GEMINI_API_KEY");

    if (!geminiApiKey) {
      return jsonResponse(500, { error: "Missing GEMINI_API_KEY environment variable." });
    }

    const rawBody = await req.json();
    const validation = validateBody(rawBody);
    if (!validation.valid) {
      return jsonResponse(400, { error: validation.error });
    }
    const body = validation.data;

    // Build request using systemInstruction so user content never touches the system prompt.
    const systemPrompt = body.mode === "analysis" ? ANALYSIS_SYSTEM_PROMPT : CHAT_SYSTEM_PROMPT;

    const contents =
      body.mode === "analysis"
        ? [{ role: "user", parts: [{ text: body.prompt }] }]
        : [
            { role: "user", parts: [{ text: "Begin." }] },
            { role: "model", parts: [{ text: "Ready." }] },
            ...body.conversationHistory.map((msg) => ({
              role: msg.role === "user" ? "user" : "model",
              parts: [{ text: msg.text }],
            })),
          ];

    const response = await fetch(`${GEMINI_URL}?key=${geminiApiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: body.mode === "chat" ? 1500 : 2000,
        },
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      return jsonResponse(response.status, {
        error: detail || `Gemini request failed with status ${response.status}.`,
      });
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return jsonResponse(502, { error: "Gemini returned an empty response." });
    }

    return jsonResponse(200, { text });
  } catch (error) {
    console.error(error);
    return jsonResponse(500, {
      error: error instanceof Error ? error.message : "Unexpected function error.",
    });
  }
});
