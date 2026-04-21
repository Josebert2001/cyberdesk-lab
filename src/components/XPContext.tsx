import { createContext, useContext, ReactNode, useEffect, useRef } from "react";
import { useXP } from "@/hooks/useXP";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

type XPContextType = ReturnType<typeof useXP>;

const XPContext = createContext<XPContextType | null>(null);

export function XPProvider({ children }: { children: ReactNode }) {
  const xp = useXP();
  const { user, profile } = useAuth();
  const initializedRef = useRef(false);
  const writeTimerRef = useRef<number | null>(null);

  // Hydrate local XP from profile once when user logs in
  useEffect(() => {
    if (!user || !profile || initializedRef.current) return;
    if (profile.xp > xp.xp) {
      // bring local up to cloud value
      xp.addXP(profile.xp - xp.xp);
    }
    initializedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, profile]);

  // Debounced write-back to profile
  useEffect(() => {
    if (!user) return;
    if (writeTimerRef.current) window.clearTimeout(writeTimerRef.current);
    writeTimerRef.current = window.setTimeout(() => {
      supabase
        .from("profiles")
        .update({ xp: xp.xp, rank: xp.rank.title })
        .eq("id", user.id)
        .then(() => {});
    }, 800);
    return () => {
      if (writeTimerRef.current) window.clearTimeout(writeTimerRef.current);
    };
  }, [xp.xp, xp.rank.title, user]);

  return <XPContext.Provider value={xp}>{children}</XPContext.Provider>;
}

export function useXPContext(): XPContextType {
  const ctx = useContext(XPContext);
  if (!ctx) throw new Error("useXPContext must be used within XPProvider");
  return ctx;
}
