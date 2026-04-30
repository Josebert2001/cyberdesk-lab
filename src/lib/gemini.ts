import { z } from "zod";
import { cleanGeminiJson, invokeGeminiProxy } from "@/lib/gemini-proxy";

const AiAnalysisSchema = z.object({
  concept: z.string(),
  how_it_works: z.string().optional().default(""),
  demonstration: z.string().optional().default(""),
  challenge: z.string().optional().default(""),
  defense: z.string().optional().default(""),
  exam_bullets: z.array(z.string()).optional().default([]),
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
  } catch (e) {
    console.error("AI response:", rawText);
    console.error("Parse error:", e);
    throw new Error(`AI returned an unexpected format. Please try again. (${e instanceof Error ? e.message : "unknown error"})`);
  }
}
