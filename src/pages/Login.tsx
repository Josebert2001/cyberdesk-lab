import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Terminal } from "lucide-react";
import { MatrixRain } from "@/components/MatrixRain";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    navigate("/lab", { replace: true });
  };

  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center p-6 overflow-hidden">
      <MatrixRain />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />

      <div className="relative z-10 w-full max-w-md">
        <Link to="/welcome" className="flex items-center gap-2 justify-center mb-8">
          <Terminal className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-foreground font-mono">CYB Dept.</span>
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
