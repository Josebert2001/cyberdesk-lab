import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAiPanel } from "./AiPanelContext";

const WORDLIST = ["password", "hello", "admin", "123456", "letmein", "welcome", "monkey", "dragon"];
const CORRECT = "password";

export function HashCrackerLab() {
  const { analyze } = useAiPanel();
  const [guess, setGuess] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "in-list" | "not-in-list">("idle");
  const [showHint, setShowHint] = useState(false);

  const handleCrack = () => {
    const g = guess.trim().toLowerCase();
    if (g === CORRECT) {
      setStatus("correct");
    } else if (WORDLIST.includes(g)) {
      setStatus("in-list");
    } else {
      setStatus("not-in-list");
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-xs text-muted-foreground font-mono tracking-widest uppercase">
        Target Hash (MD5)
      </p>

      <div className="bg-background border border-border rounded-lg p-5 font-mono">
        <p className="text-primary text-lg tracking-wider neon-text-glow break-all">
          5f4dcc3b5aa765d61d8327deb882cf99
        </p>
      </div>

      <p className="text-muted-foreground text-sm">Can you crack it?</p>

      <div>
        <label className="block text-sm text-muted-foreground mb-2">Enter your guess</label>
        <input
          type="text"
          value={guess}
          onChange={(e) => { setGuess(e.target.value); setStatus("idle"); }}
          placeholder="Type a word..."
          className="w-full bg-card border border-border rounded-lg py-3 px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 font-mono"
        />
      </div>

      <div className="flex gap-3 items-center">
        <Button variant="neon" onClick={handleCrack} className="font-mono">
          Crack It
        </Button>
        <button
          onClick={() => setShowHint(true)}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono underline underline-offset-4"
        >
          Show Hint
        </button>
      </div>

      {showHint && (
        <p className="text-sm text-muted-foreground font-mono animate-fade-in">
          💡 Think about the most common password ever used.
        </p>
      )}

      {status === "correct" && (
        <div className="space-y-4 animate-fade-in">
          <div className="text-center py-4">
            <p className="text-3xl font-bold text-primary neon-text-glow font-mono animate-pulse">
              ✓ CRACKED: password
            </p>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            This hash was generated with MD5. MD5 is broken and should never be used for passwords.
          </p>
          <Button variant="neon" className="font-mono" onClick={() => analyze("I just cracked the MD5 hash 5f4dcc3b5aa765d61d8327deb882cf99 using a wordlist attack. The plaintext is 'password'. Analyze this MD5 hash cracking attack.")}>
            Analyze with AI →
          </Button>
        </div>
      )}

      {status === "in-list" && (
        <p className="text-yellow-500 text-sm font-mono animate-fade-in">
          That word is in the wordlist but doesn't match this hash. Keep trying.
        </p>
      )}

      {status === "not-in-list" && (
        <p className="text-destructive text-sm font-mono animate-fade-in">
          Not in wordlist. Real crackers use millions of words.
        </p>
      )}
    </div>
  );
}
