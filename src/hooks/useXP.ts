import { useState, useCallback, useEffect, useRef } from "react";
import { safeGetNumber } from "@/lib/storage";

const XP_KEY = "cyberdesk_xp";

interface Rank {
  title: string;
  minXP: number;
}

export const RANKS: Rank[] = [
  { title: "Script Kiddie", minXP: 0 },
  { title: "Apprentice", minXP: 51 },
  { title: "Hacker", minXP: 151 },
  { title: "Elite", minXP: 301 },
  { title: "Legend", minXP: 501 },
];

export function getRank(xp: number): Rank {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (xp >= RANKS[i].minXP) return RANKS[i];
  }
  return RANKS[0];
}

export function getNextRank(xp: number): Rank | null {
  const current = getRank(xp);
  const idx = RANKS.indexOf(current);
  return idx < RANKS.length - 1 ? RANKS[idx + 1] : null;
}

export function getProgressPercent(xp: number): number {
  const current = getRank(xp);
  const next = getNextRank(xp);
  if (!next) return 100;
  const range = next.minXP - current.minXP;
  const progress = xp - current.minXP;
  return Math.min(100, Math.round((progress / range) * 100));
}

export function useXP() {
  const [xp, setXp] = useState(() => safeGetNumber(XP_KEY, 0));
  const [rankUp, setRankUp] = useState(false);
  const prevRankRef = useRef(getRank(xp).title);

  useEffect(() => {
    localStorage.setItem(XP_KEY, String(xp));
    const newRank = getRank(xp).title;
    if (newRank !== prevRankRef.current) {
      prevRankRef.current = newRank;
      setRankUp(true);
      setTimeout(() => setRankUp(false), 2000);
    }
  }, [xp]);

  const addXP = useCallback((amount: number) => {
    setXp((prev) => prev + amount);
  }, []);

  return {
    xp,
    addXP,
    rank: getRank(xp),
    nextRank: getNextRank(xp),
    progress: getProgressPercent(xp),
    rankUp,
    RANKS,
  };
}
