const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";

const SYSTEM_PROMPT = `You are CyberDesk AI, a penetration testing instructor and ethical hacking mentor for university cybersecurity students.

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

export interface AiAnalysis {
  concept: string;
  how_it_works: string;
  demonstration: string;
  challenge: string;
  defense: string;
  exam_bullets: string[];
}

export async function analyzeWithGemini(userPrompt: string): Promise<AiAnalysis> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error("VITE_GEMINI_API_KEY is not configured");

  const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        { role: "user", parts: [{ text: SYSTEM_PROMPT + "\n\n" + userPrompt }] },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${text}`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  
  // Strip markdown code fences if present
  const cleaned = rawText.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
  
  try {
    return JSON.parse(cleaned) as AiAnalysis;
  } catch {
    throw new Error("Failed to parse AI response as JSON");
  }
}
