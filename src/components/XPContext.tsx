import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react";
import { toast } from "sonner";
import { getRank, useXP } from "@/hooks/useXP";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

type XPState = ReturnType<typeof useXP>;
type XPContextType = Omit<XPState, "addXP"> & {
  addXP: (amount: number) => Promise<void>;
};

const XPContext = createContext<XPContextType | null>(null);

export function XPProvider({ children }: { children: ReactNode }) {
  const { user, profile, refreshProfile } = useAuth();
  const xp = useXP(user?.id);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!user || !profile) {
      initializedRef.current = false;
      return;
    }
    if (initializedRef.current) return;
    xp.forceSetXP(profile.xp);
    initializedRef.current = true;
  }, [profile, user, xp]);

  const addXP = useCallback(async (amount: number) => {
    if (amount <= 0) return;
    if (!user) {
      toast("You need to be logged in to earn XP.");
      return;
    }

    const previousXp = xp.xp;
    const { data, error } = await supabase.rpc("award_xp", { xp_delta: amount });

    if (error) {
      console.error("award_xp error:", error.message);
      toast("Could not save XP right now.", {
        description: "Your progress was not changed. Please try again.",
      });
      await refreshProfile();
      return;
    }

    const latest = data?.[0];
    const nextXp = latest?.xp ?? previousXp + amount;
    const previousRank = getRank(previousXp);
    const nextRank = getRank(nextXp);

    xp.forceSetXP(nextXp);

    if (nextRank.title !== previousRank.title) {
      toast(`Rank Up: ${nextRank.title}!`, {
        description: `You've reached ${nextXp} XP`,
      });
      return;
    }

    toast(`+${amount} XP`, {
      description: `Total: ${nextXp} XP`,
      duration: 2000,
    });
  }, [refreshProfile, user, xp]);

  const value: XPContextType = {
    ...xp,
    addXP,
  };

  return <XPContext.Provider value={value}>{children}</XPContext.Provider>;
}

export function useXPContext(): XPContextType {
  const ctx = useContext(XPContext);
  if (!ctx) throw new Error("useXPContext must be used within XPProvider");
  return ctx;
}
