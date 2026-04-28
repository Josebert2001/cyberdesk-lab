import { z } from "zod";
import { cleanGeminiJson, invokeGeminiProxy } from "@/lib/gemini-proxy";

const AiAnalysisSchema = z.object({
  concept: z.string(),
  how_it_works: z.string(),
  demonstration: z.string(),
  challenge: z.string(),
  defense: z.string(),
  exam_bullets: z.array(z.string()),
});

export type AiAnalysis = z.infer<typeof AiAnalysisSchema>;

export async function analyzeWithGemini(userPrompt: string): Promise<AiAnalysis> {
  const rawText = await invokeGeminiProxy({
    mode: "analysis",
    prompt: userPrompt,
  });

  try {
    const parsed = JSON.parse(cleanGeminiJson(rawText));
    return AiAnalysisSchema.parse(parsed);
  } catch {
    throw new Error("AI returned an unexpected format. Please try again.");
  }
}
