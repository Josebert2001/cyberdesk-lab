import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { analyzeWithGemini, AiAnalysis } from "@/lib/gemini";

interface AiPanelContextType {
  isOpen: boolean;
  isLoading: boolean;
  analysis: AiAnalysis | null;
  error: string | null;
  analyze: (prompt: string) => void;
  close: () => void;
}

const AiPanelContext = createContext<AiPanelContextType | null>(null);

export function useAiPanel() {
  const ctx = useContext(AiPanelContext);
  if (!ctx) throw new Error("useAiPanel must be used within AiPanelProvider");
  return ctx;
}

export function AiPanelProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AiAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (prompt: string) => {
    setIsOpen(true);
    setIsLoading(true);
    setAnalysis(null);
    setError(null);
    try {
      const result = await analyzeWithGemini(prompt);
      setAnalysis(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setAnalysis(null);
    setError(null);
  }, []);

  return (
    <AiPanelContext.Provider value={{ isOpen, isLoading, analysis, error, analyze, close }}>
      {children}
    </AiPanelContext.Provider>
  );
}
