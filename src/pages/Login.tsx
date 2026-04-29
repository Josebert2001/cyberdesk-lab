import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MatrixRain } from "@/components/MatrixRain";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function friendlyAuthError(msg: string): string {
    if (msg.includes("Invalid login credentials") || msg.includes("invalid_credentials")) {
      return "Invalid email or password.";
    }
    if (msg.includes("Email not confirmed")) {
      return "Please confirm your email before logging in.";
    }
    if (msg.includes("rate limit") || msg.includes("too many requests")) {
      return "Too many attempts. Please wait a moment and try again.";
    }
    return "Login failed. Please try again.";
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(friendlyAuthError(error.message));
      return;
    }
    navigate("/lab", { replace: true });
  };

  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center p-6 overflow-hidden">
      <MatrixRain />
      <div className="absolute inset-0 brand-grid-bg opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/70 to-background pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm animate-fade-in">
        <Link to="/welcome" className="flex items-center gap-2.5 justify-center mb-8">
          <img src="/logo-256.png" alt="DOCSSA" className="h-10 w-10" />
          <span className="font-display text-xl tracking-[0.12em] text-primary font-bold">DOCSSA</span>
        </Link>

        <div className="border border-primary/20 bg-card/90 backdrop-blur-sm overflow-hidden">
          {/* Terminal chrome */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-primary/10 bg-primary/[0.04]">
            <span className="w-2.5 h-2.5 rounded-full bg-destructive/65" />
            <span className="w-2.5 h-2.5 rounded-full bg-brand-ember-bright/55" />
            <span className="w-2.5 h-2.5 rounded-full bg-primary/65" />
            <span className="ml-2 font-mono text-[9px] text-muted-foreground/55 tracking-wider">auth â€” secure login</span>
          </div>

          <div className="p-6">
            <h1 className="font-display text-3xl tracking-[0.06em] text-foreground mb-0.5">&gt; login_</h1>
            <p className="font-mono text-[10px] text-muted-foreground/60 mb-6 tracking-wide">
              Authenticate to enter the portal.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="font-mono text-[9px] tracking-widest text-primary/55 uppercase">
                  EMAIL
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 font-mono text-sm bg-background/50"
                  autoComplete="email"
                />
              </div>
              <div>
                <Label htmlFor="password" className="font-mono text-[9px] tracking-widest text-primary/55 uppercase">
                  PASSWORD
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1.5 font-mono text-sm bg-background/50"
                  autoComplete="current-password"
                />
              </div>

              {error && (
                <p className="font-mono text-[10px] text-destructive">
                  <span className="text-destructive/60">&gt;</span> ERROR: {error}
                </p>
              )}

              <Button
                type="submit"
                variant="neon"
                className="w-full font-mono text-[10px] uppercase tracking-widest mt-2"
                disabled={loading}
              >
                {loading ? "Authenticating..." : "Login â†’"}
              </Button>
            </form>

            <p className="font-mono text-[10px] text-muted-foreground/50 mt-6 text-center">
              No account?{" "}
              <Link to="/signup" className="text-primary hover:text-brand-ember-bright transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

