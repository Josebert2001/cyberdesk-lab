const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

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
  if (!apiKey) {
    throw new Error(
      "AI features require a Gemini API key. Add VITE_GEMINI_API_KEY to your environment secrets."
    );
  }

  const contents = [
    { role: "user", parts: [{ text: CHAT_SYSTEM_PROMPT }] },
    { role: "model", parts: [{ text: "Understood. I will respond only with valid JSON." }] },
    ...conversationHistory.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    })),
  ];

  let response: Response;
  try {
    response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
      }),
    });
  } catch {
    throw new Error("Unable to reach the AI service. Please check your internet connection.");
  }

  if (response.status === 429) {
    throw new Error("AI rate limit reached. Please wait a moment and try again.");
  }

  if (response.status === 403) {
    throw new Error("Gemini API key is invalid or has been revoked. Please check your configuration.");
  }

  if (!response.ok) {
    throw new Error(`AI service returned an error (${response.status}). Please try again later.`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

  if (!rawText) {
    throw new Error("AI returned an empty response. Please try rephrasing your question.");
  }

  const cleaned = rawText.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();

  try {
    return JSON.parse(cleaned) as ChatAiResponse;
  } catch {
    return { answer: rawText, example: "", exam_summary: "" };
  }
}
