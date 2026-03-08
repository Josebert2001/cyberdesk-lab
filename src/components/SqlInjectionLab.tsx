import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAiPanel } from "./AiPanelContext";

export function SqlInjectionLab() {
  const { analyze } = useAiPanel();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "injected" | "failed">("idle");

  const handleLogin = () => {
    if (username.includes("' OR '1'='1")) {
      setStatus("injected");
    } else {
      setStatus("failed");
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-xs text-muted-foreground font-mono tracking-widest uppercase">
        Target: Fake University Login Portal
      </p>

      {/* Fake login form */}
      <div className="max-w-md mx-auto bg-[hsl(220,20%,14%)] border border-[hsl(220,15%,22%)] rounded-lg overflow-hidden">
        {/* Header bar */}
        <div className="bg-[hsl(220,60%,35%)] px-6 py-4">
          <h2 className="text-[hsl(210,40%,98%)] font-semibold text-lg">🎓 UniPortal Login</h2>
          <p className="text-[hsl(210,30%,80%)] text-xs mt-0.5">Secure Student & Faculty Access</p>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs text-[hsl(210,20%,70%)] mb-1.5">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setStatus("idle"); }}
              placeholder="Enter your student ID"
              className="w-full bg-[hsl(220,20%,10%)] border border-[hsl(220,15%,25%)] rounded py-2.5 px-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-[hsl(220,60%,50%)] text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-xs text-[hsl(210,20%,70%)] mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setStatus("idle"); }}
              placeholder="Enter your password"
              className="w-full bg-[hsl(220,20%,10%)] border border-[hsl(220,15%,25%)] rounded py-2.5 px-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-[hsl(220,60%,50%)] text-sm font-mono"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-[hsl(220,60%,45%)] hover:bg-[hsl(220,60%,50%)] text-[hsl(210,40%,98%)] py-2.5 rounded text-sm font-medium transition-colors"
          >
            Login
          </button>

          {status === "failed" && (
            <p className="text-destructive text-sm text-center animate-fade-in">
              Invalid credentials. Try again.
            </p>
          )}
        </div>
      </div>

      {/* Injection success */}
      {status === "injected" && (
        <div className="space-y-5 animate-fade-in">
          {/* Flashing banner */}
          <div className="bg-destructive/10 border border-destructive/40 rounded-lg px-5 py-3 text-center animate-pulse">
            <p className="text-destructive font-bold font-mono text-sm">
              ⚠ ACCESS GRANTED — SQL Injection Successful
            </p>
          </div>

          {/* Terminal output */}
          <div className="bg-background border border-border rounded-lg p-5 font-mono text-sm space-y-2">
            <p className="text-muted-foreground text-xs mb-3">QUERY EXECUTED</p>
            <p className="text-primary">
              SELECT * FROM users WHERE username=''
            </p>
            <p className="text-primary">
              OR '1'='1' --' AND password='anything'
            </p>
            <div className="border-t border-border my-3" />
            <p className="text-muted-foreground">
              Result: <span className="text-foreground">Returned ALL users in database.</span>
            </p>
            <p className="text-muted-foreground">
              Logged in as: <span className="text-primary neon-text-glow font-bold">admin</span>
            </p>
          </div>

          {/* Explanation */}
          <p className="text-muted-foreground text-sm leading-relaxed">
            The <code className="font-mono text-foreground bg-card px-1.5 py-0.5 rounded text-xs">' OR '1'='1</code> payload
            broke the SQL query logic, making the condition always true.
          </p>

          {/* AI button */}
          <Button variant="neon" className="font-mono" onClick={() => analyze("I just performed an SQL injection on a login form using the payload ' OR '1'='1. The query became: SELECT * FROM users WHERE username='' OR '1'='1' --' AND password='anything'. It returned all users and logged me in as admin. Analyze this SQL injection attack.")}>
            Analyze with AI →
          </Button>
        </div>
      )}
    </div>
  );
}
