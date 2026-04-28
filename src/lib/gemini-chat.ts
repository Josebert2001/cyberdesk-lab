import { cleanGeminiJson, invokeGeminiProxy, type GeminiChatMessage } from "@/lib/gemini-proxy";

export interface ChatAiResponse {
  answer: string;
  example: string;
  exam_summary: string;
}

export async function chatWithGemini(conversationHistory: GeminiChatMessage[]): Promise<ChatAiResponse> {
  const rawText = await invokeGeminiProxy({
    mode: "chat",
    conversationHistory,
  });

  try {
    return JSON.parse(cleanGeminiJson(rawText)) as ChatAiResponse;
  } catch {
    return { answer: rawText, example: "", exam_summary: "" };
  }
}
