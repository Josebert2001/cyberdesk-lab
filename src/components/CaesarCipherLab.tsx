import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAiPanel } from "./AiPanelContext";

function encryptCaesar(text: string, shift: number): string {
  return text
    .split("")
    .map((ch) => {
      if (/[a-zA-Z]/.test(ch)) {
        const base = ch >= "a" ? 97 : 65;
        return String.fromCharCode(((ch.charCodeAt(0) - base + shift) % 26) + base);
      }
      return ch;
    })
    .join("");
}

function getTransformations(text: string, shift: number) {
  return text
    .split("")
    .filter((ch) => /[a-zA-Z]/.test(ch))
    .map((ch) => {
      const base = ch >= "a" ? 97 : 65;
      const encrypted = String.fromCharCode(((ch.charCodeAt(0) - base + shift) % 26) + base);
      return { original: ch.toUpperCase(), shifted: encrypted.toUpperCase(), shift };
    });
}

export function CaesarCipherLab() {
  const { analyze } = useAiPanel();
  const [mode, setMode] = useState<"encrypt" | "crack">("encrypt");

  // Encrypt state
  const [message, setMessage] = useState("");
  const [shift, setShift] = useState(3);
  const [encryptedResult, setEncryptedResult] = useState("");
  const [transformations, setTransformations] = useState<{ original: string; shifted: string; shift: number }[]>([]);

  // Crack state
  const [guess, setGuess] = useState("");
  const [crackStatus, setCrackStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [showHint, setShowHint] = useState(false);

  const handleEncrypt = () => {
    if (!message.trim()) return;
    const result = encryptCaesar(message, shift);
    setEncryptedResult(result);
    setTransformations(getTransformations(message, shift));
  };

  const handleCheck = () => {
    if (guess.trim().toUpperCase() === "HELLO WORLD") {
      setCrackStatus("correct");
    } else {
      setCrackStatus("wrong");
    }
  };

  const showAiButton = encryptedResult !== "" || crackStatus === "correct";

  return (
    <div className="space-y-6">
      {/* Mode toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => { setMode("encrypt"); setCrackStatus("idle"); setGuess(""); setShowHint(false); }}
          className={`px-4 py-2 rounded-md text-sm font-mono transition-all duration-200 ${
            mode === "encrypt"
              ? "bg-primary text-primary-foreground neon-glow"
              : "bg-card border border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          Encrypt Mode
        </button>
        <button
          onClick={() => { setMode("crack"); setEncryptedResult(""); setTransformations([]); }}
          className={`px-4 py-2 rounded-md text-sm font-mono transition-all duration-200 ${
            mode === "crack"
              ? "bg-primary text-primary-foreground neon-glow"
              : "bg-card border border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          Crack Mode
        </button>
      </div>

      {mode === "encrypt" ? (
        <div className="space-y-5 animate-fade-in">
          {/* Message input */}
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Enter your message</label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full bg-card border border-border rounded-lg py-3 px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 font-mono"
            />
          </div>

          {/* Shift control */}
          <div>
            <label className="block text-sm text-muted-foreground mb-2">
              Shift (1–25): <span className="text-primary font-mono font-bold">{shift}</span>
            </label>
            <input
              type="range"
              min={1}
              max={25}
              value={shift}
              onChange={(e) => setShift(Number(e.target.value))}
              className="w-full accent-primary"
              style={{ accentColor: "hsl(153 100% 50%)" }}
            />
          </div>

          <Button variant="neon" onClick={handleEncrypt} className="font-mono">
            Encrypt
          </Button>

          {/* Terminal output */}
          {encryptedResult && (
            <div className="animate-fade-in space-y-4">
              <div className="bg-background border border-border rounded-lg p-5 font-mono">
                <p className="text-xs text-muted-foreground mb-1">OUTPUT</p>
                <p className="text-primary text-lg tracking-widest neon-text-glow">{encryptedResult}</p>
              </div>

              {/* Character breakdown */}
              <div className="bg-background border border-border rounded-lg p-4 font-mono text-xs">
                <p className="text-muted-foreground mb-3">TRANSFORMATION</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {transformations.map((t, i) => (
                    <span key={i} className="text-muted-foreground">
                      <span className="text-foreground">{t.original}</span>
                      <span className="text-muted-foreground/60">(shift {t.shift})</span>
                      <span className="text-muted-foreground/40"> → </span>
                      <span className="text-primary">{t.shifted}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-5 animate-fade-in">
          {/* Challenge */}
          <div className="bg-background border border-border rounded-lg p-5 font-mono">
            <p className="text-xs text-muted-foreground mb-1">ENCRYPTED MESSAGE</p>
            <p className="text-primary text-lg tracking-widest neon-text-glow">KHOOR ZRUOG</p>
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2">What do you think this says?</label>
            <input
              type="text"
              value={guess}
              onChange={(e) => { setGuess(e.target.value); setCrackStatus("idle"); }}
              placeholder="Your guess..."
              className="w-full bg-card border border-border rounded-lg py-3 px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 font-mono"
            />
          </div>

          <div className="flex gap-3 items-center">
            <Button variant="neon" onClick={handleCheck} className="font-mono">
              Check Answer
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
              💡 The shift number is <span className="text-primary font-bold">3</span>
            </p>
          )}

          {crackStatus === "correct" && (
            <div className="animate-fade-in text-center py-6">
              <p className="text-4xl font-bold text-primary neon-text-glow font-mono animate-pulse">
                ✓ CRACKED
              </p>
            </div>
          )}

          {crackStatus === "wrong" && (
            <p className="text-destructive font-mono text-sm animate-fade-in">
              ✗ Try again
            </p>
          )}
        </div>
      )}

      {/* AI button */}
      {showAiButton && (
        <div className="pt-4 animate-fade-in">
          <Button variant="neon" className="font-mono" onClick={() => {
            const ctx = mode === "encrypt"
              ? `I just encrypted "${message}" with a Caesar Cipher shift of ${shift}. Result: "${encryptedResult}". Analyze this Caesar Cipher encryption.`
              : `I just cracked the Caesar Cipher "KHOOR ZRUOG" — the answer is "HELLO WORLD" with shift 3. Analyze this Caesar Cipher crack.`;
            analyze(ctx);
          }}>
            Analyze with AI →
          </Button>
        </div>
      )}
    </div>
  );
}
