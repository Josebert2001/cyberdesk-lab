import { cleanGeminiJson, invokeGeminiProxy } from "@/lib/gemini-proxy";

export interface AiAnalysis {
  concept: string;
  how_it_works: string;
  demonstration: string;
  challenge: string;
  defense: string;
  exam_bullets: string[];
}

export async function analyzeWithGemini(userPrompt: string): Promise<AiAnalysis> {
  const rawText = await invokeGeminiProxy({
    mode: "analysis",
    prompt: userPrompt,
  });

  try {
    return JSON.parse(cleanGeminiJson(rawText)) as AiAnalysis;
  } catch {
    throw new Error("AI returned an unexpected format. Please try again.");
  }
}
