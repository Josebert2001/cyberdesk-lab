import { supabase } from "@/integrations/supabase/client";

export interface GeminiChatMessage {
  role: string;
  text: string;
}

interface GeminiProxyResponse {
  text?: string;
  error?: string;
}

export async function invokeGeminiProxy(body: {
  mode: "analysis" | "chat";
  prompt?: string;
  conversationHistory?: GeminiChatMessage[];
}): Promise<string> {
  const { data, error } = await supabase.functions.invoke<GeminiProxyResponse>("gemini-proxy", {
    body,
  });

  if (error) {
    throw new Error("AI service is unavailable right now. Please try again later.");
  }

  if (!data?.text) {
    throw new Error(data?.error || "AI returned an empty response. Please try again.");
  }

  return data.text;
}

export function cleanGeminiJson(rawText: string): string {
  return rawText.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
}
