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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />

      <div className="relative z-10 w-full max-w-md">
        <Link to="/welcome" className="flex items-center gap-3 justify-center mb-8">
          <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center bg-card">
            <span className="font-display text-xs tracking-[0.08em] text-primary">DSA</span>
          </div>
          <span className="font-display text-2xl tracking-[0.08em] text-[#7ECBEF]">DOCSSA</span>
        </Link>

        <div className="bg-card border border-border rounded-lg p-6 font-mono">
          <div className="flex gap-2 mb-4">
            <span className="w-3 h-3 rounded-full bg-destructive" />
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="w-3 h-3 rounded-full bg-primary" />
          </div>

          <h1 className="text-xl font-bold text-foreground mb-1">&gt; login_</h1>
          <p className="text-xs text-muted-foreground mb-6">Authenticate to enter the portal.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-xs">EMAIL</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 font-mono"
                autoComplete="email"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-xs">PASSWORD</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 font-mono"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="text-xs text-destructive font-mono">&gt; ERROR: {error}</p>
            )}

            <Button type="submit" variant="neon" className="w-full font-mono" disabled={loading}>
              {loading ? "Authenticating..." : "Login"}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-6 text-center">
            No account?{" "}
            <Link to="/signup" className="text-primary hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
