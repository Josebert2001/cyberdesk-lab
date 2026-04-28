import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useAiPanel } from "@/components/AiPanelContext";
import { useXPContext } from "@/components/XPContext";
import { Eye, EyeOff, Check, X, Copy, RefreshCw } from "lucide-react";

const CHARS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  num: "0123456789",
  special: "!@#$%^&*()-_=+[]{}|;:,.<>?",
};

function generatePassword(): string {
  const all = CHARS.upper + CHARS.lower + CHARS.num + CHARS.special;
  const pwd = [
    CHARS.upper[Math.floor(Math.random() * CHARS.upper.length)],
    CHARS.lower[Math.floor(Math.random() * CHARS.lower.length)],
    CHARS.num[Math.floor(Math.random() * CHARS.num.length)],
    CHARS.special[Math.floor(Math.random() * CHARS.special.length)],
  ];
  for (let i = 4; i < 16; i++) {
    pwd.push(all[Math.floor(Math.random() * all.length)]);
  }
  return pwd.sort(() => Math.random() - 0.5).join("");
}

interface Check {
  label: string;
  pass: boolean;
}

function analyzePassword(pwd: string): { checks: Check[]; score: number; crackTime: string } {
  const checks: Check[] = [
    { label: "Length ≥ 12 characters", pass: pwd.length >= 12 },
    { label: "Has uppercase letters", pass: /[A-Z]/.test(pwd) },
    { label: "Has lowercase letters", pass: /[a-z]/.test(pwd) },
    { label: "Has numbers", pass: /[0-9]/.test(pwd) },
    { label: "Has special characters", pass: /[^A-Za-z0-9]/.test(pwd) },
  ];
  const score = checks.filter((c) => c.pass).length;
  const times = ["seconds", "hours", "days", "months", "years", "centuries"];
  const crackTime = times[score];
  return { checks, score, crackTime };
}

function strengthLabel(score: number): { label: string; color: string; barColor: string } {
  if (score <= 1) return { label: "Very Weak", color: "text-red-400", barColor: "bg-red-500" };
  if (score === 2) return { label: "Weak", color: "text-orange-400", barColor: "bg-orange-500" };
  if (score === 3) return { label: "Fair", color: "text-yellow-400", barColor: "bg-yellow-500" };
  if (score === 4) return { label: "Strong", color: "text-lime-400", barColor: "bg-lime-500" };
  return { label: "Very Strong", color: "text-green-400", barColor: "bg-green-500" };
}

export function PasswordStrengthLab() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  const [xpAwarded, setXpAwarded] = useState(false);
  const { analyze } = useAiPanel();
  const { addXP } = useXPContext();

  const { checks, score, crackTime } = analyzePassword(password);
  const { label, color, barColor } = strengthLabel(score);

  useEffect(() => {
    if (score >= 4 && !xpAwarded && password.length > 0) {
      addXP(5);
      setXpAwarded(true);
    }
  }, [score, xpAwarded, password, addXP]);

  function handleGenerate() {
    const pwd = generatePassword();
    setPassword(pwd);
    setShow(true);
    setCopied(false);
    setXpAwarded(false);
    navigator.clipboard.writeText(pwd).then(() => setCopied(true));
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold font-mono text-foreground mb-1">Password Strength Analyzer</h2>
        <p className="text-muted-foreground text-sm">Analyze the strength of any password in real time.</p>
      </div>

      {/* Input */}
      <div className="bg-card border border-border rounded-lg p-5 space-y-4">
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a password to analyze"
            className="w-full bg-background border border-border rounded-lg py-3 pl-4 pr-12 text-foreground placeholder:text-muted-foreground font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
          <button
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        {/* Strength Bar */}
        {password.length > 0 && (
          <div className="space-y-2 animate-fade-in">
            <div className="flex justify-between items-center">
              <span className={`text-sm font-mono font-bold ${color}`}>{label}</span>
              <span className="text-xs font-mono text-muted-foreground">{score}/5</span>
            </div>
            <div className="h-2 bg-background rounded-full overflow-hidden">
              <div
                className={`h-full ${barColor} transition-all duration-300`}
                style={{ width: `${(score / 5) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Checks */}
      {password.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-5 space-y-3 animate-fade-in">
          <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Strength Checks</h3>
          {checks.map(({ label, pass }) => (
            <div key={label} className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${pass ? "bg-green-500/20 border border-green-500" : "bg-red-500/20 border border-red-500"}`}>
                {pass
                  ? <Check className="h-3 w-3 text-green-400" />
                  : <X className="h-3 w-3 text-red-400" />}
              </div>
              <span className={`text-sm font-mono ${pass ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
            </div>
          ))}

          {/* Crack time */}
          <div className="mt-4 bg-background border border-border rounded-lg px-4 py-3">
            <p className="text-xs font-mono text-muted-foreground mb-1">Estimated crack time</p>
            <p className={`text-lg font-mono font-bold ${color}`}>{crackTime}</p>
          </div>
        </div>
      )}

      {/* Generate Button */}
      <Button
        variant="outline"
        className="font-mono w-full flex items-center gap-2"
        onClick={handleGenerate}
      >
        {copied ? <Copy className="h-4 w-4 text-primary" /> : <RefreshCw className="h-4 w-4" />}
        {copied ? "Copied to Clipboard!" : "Generate Strong Password"}
      </Button>

      {/* Analyze with AI */}
      <Button
        variant="outline"
        className="font-mono w-full"
        disabled={password.length === 0}
        onClick={() => analyze(`Explain password security — what makes a password strong (score: ${score}/5, estimated crack time: ${crackTime}), common cracking methods like brute force, dictionary attacks and rainbow tables, and best practices for password management including password managers.`)}
      >
        Analyze with AI →
      </Button>
    </div>
  );
}
