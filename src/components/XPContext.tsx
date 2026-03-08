import { createContext, useContext, ReactNode } from "react";
import { useXP } from "@/hooks/useXP";

type XPContextType = ReturnType<typeof useXP>;

const XPContext = createContext<XPContextType | null>(null);

export function XPProvider({ children }: { children: ReactNode }) {
  const xp = useXP();
  return <XPContext.Provider value={xp}>{children}</XPContext.Provider>;
}

export function useXPContext(): XPContextType {
  const ctx = useContext(XPContext);
  if (!ctx) throw new Error("useXPContext must be used within XPProvider");
  return ctx;
}
