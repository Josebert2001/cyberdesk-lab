const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";

const CHAT_SYSTEM_PROMPT = `You are CyberDesk AI, a university computing and cybersecurity tutor. Answer any question a student asks — cybersecurity, networking, programming, hacking tools, software, mathematics, databases, MATLAB, Python, or any computing topic.

Be direct and practical. Give real examples.
Never refuse a legitimate academic question.

Return ONLY valid JSON, no markdown, no extra text:
{
  "answer": "your full answer here",
  "example": "code or command if relevant, empty string if not needed",
  "exam_summary": "one sentence exam-ready definition"
}`;

export interface ChatAiResponse {
  answer: string;
  example: string;
  exam_summary: string;
}

export async function chatWithGemini(conversationHistory: { role: string; text: string }[]): Promise<ChatAiResponse> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error("VITE_GEMINI_API_KEY is not configured");

  const contents = [
    { role: "user", parts: [{ text: CHAT_SYSTEM_PROMPT }] },
    { role: "model", parts: [{ text: "Understood. I will respond only with valid JSON." }] },
    ...conversationHistory.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    })),
  ];

  const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents,
      generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${text}`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  const cleaned = rawText.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();

  try {
    return JSON.parse(cleaned) as ChatAiResponse;
  } catch {
    // Fallback: return raw text as answer
    return { answer: rawText, example: "", exam_summary: "" };
  }
}
