import { z } from "zod";
import { cleanGeminiJson, invokeGeminiProxy, type GeminiChatMessage } from "@/lib/gemini-proxy";

const ChatAiResponseSchema = z.object({
  answer: z.string(),
  example: z.string().default(""),
  exam_summary: z.string().default(""),
});

export type ChatAiResponse = z.infer<typeof ChatAiResponseSchema>;

export async function chatWithGemini(conversationHistory: GeminiChatMessage[]): Promise<ChatAiResponse> {
  const rawText = await invokeGeminiProxy({
    mode: "chat",
    conversationHistory,
  });

  try {
    const parsed = JSON.parse(cleanGeminiJson(rawText));
    return ChatAiResponseSchema.parse(parsed);
  } catch {
    return { answer: rawText, example: "", exam_summary: "" };
  }
}
