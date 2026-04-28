import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

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

type ChatMessage = {
  role: string;
  text: string;
};

type RequestBody =
  | {
      mode: "analysis";
      prompt: string;
    }
  | {
      mode: "chat";
      conversationHistory: ChatMessage[];
    };

function jsonResponse(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const geminiApiKey = Deno.env.get("GEMINI_API_KEY");

    if (!supabaseUrl || !supabaseAnonKey || !geminiApiKey) {
      return jsonResponse(500, { error: "Missing function configuration." });
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return jsonResponse(401, { error: "Missing authorization header." });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: { Authorization: authHeader },
      },
    });

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return jsonResponse(401, { error: "Authentication required." });
    }

    const body = (await req.json()) as RequestBody;

    let contents: Array<{ role: string; parts: Array<{ text: string }> }>;
    if (body.mode === "analysis") {
      contents = [
        {
          role: "user",
          parts: [{ text: `${ANALYSIS_SYSTEM_PROMPT}\n\n${body.prompt}` }],
        },
      ];
    } else {
      contents = [
        { role: "user", parts: [{ text: CHAT_SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "Understood. I will respond only with valid JSON." }] },
        ...(body.conversationHistory || []).map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        })),
      ];
    }

    const response = await fetch(`${GEMINI_URL}?key=${geminiApiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: body.mode === "chat" ? 2048 : 1024,
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
