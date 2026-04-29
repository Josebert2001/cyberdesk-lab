import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";
import { MatrixRain } from "@/components/MatrixRain";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function friendlyAuthError(msg: string): string {
    if (msg.includes("User already registered") || msg.includes("already been registered")) {
      return "An account with this email already exists.";
    }
    if (msg.includes("Password should be at least") || msg.includes("password")) {
      return "Password must be at least 8 characters.";
    }
    if (msg.includes("rate limit") || msg.includes("too many requests")) {
      return "Too many attempts. Please wait a moment and try again.";
    }
    if (msg.includes("signup is disabled")) {
      return "Sign up is currently disabled. Contact your administrator.";
    }
    return "Sign up failed. Please try again.";
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/welcome`,
        data: { name, year },
      },
    });

    setLoading(false);

    if (error) {
      setError(friendlyAuthError(error.message));
      return;
    }

    if (data.session) {
      // Email confirmation disabled â€” straight to portal
      navigate("/lab", { replace: true });
    } else {
      setSuccess(true);
    }
  };

  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center p-6 overflow-hidden">
      <MatrixRain />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />

      <div className="relative z-10 w-full max-w-md">
        <Link to="/welcome" className="flex items-center gap-2.5 justify-center mb-8">
          <img src="/logo-256.png" alt="DOCSSA" className="h-10 w-10 brand-logo" />
          <span className="font-display text-xl tracking-[0.12em] text-primary font-bold">DOCSSA</span>
        </Link>

        <div className="bg-card border border-border rounded-lg p-6 font-mono">
          <div className="flex gap-2 mb-4">
            <span className="w-3 h-3 rounded-full bg-destructive" />
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="w-3 h-3 rounded-full bg-primary" />
          </div>

          {success ? (
            <div className="text-center py-6">
              <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-lg font-bold text-foreground mb-2">Check your email</h2>
              <p className="text-sm text-muted-foreground mb-6">
                We sent a confirmation link to <span className="text-primary">{email}</span>.
                Click it to activate your account.
              </p>
              <Button asChild variant="outline" className="font-mono">
                <Link to="/login">Back to Login</Link>
              </Button>
            </div>
          ) : (
            <>
              <h1 className="text-xl font-bold text-foreground mb-1">&gt; signup_</h1>
              <p className="text-xs text-muted-foreground mb-6">Create your CYB Dept. account.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-xs">FULL NAME</Label>
                  <Input
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 font-mono"
                  />
                </div>
                <div>
                  <Label htmlFor="year" className="text-xs">YEAR (e.g. 200, 300)</Label>
                  <Input
                    id="year"
                    required
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="mt-1 font-mono"
                  />
                </div>
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
                  <Label htmlFor="password" className="text-xs">PASSWORD (min 8)</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 font-mono"
                    autoComplete="new-password"
                  />
                </div>

                {error && (
                  <p className="text-xs text-destructive font-mono">&gt; ERROR: {error}</p>
                )}

                <Button type="submit" variant="neon" className="w-full font-mono" disabled={loading}>
                  {loading ? "Creating account..." : "Sign Up"}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground mt-6 text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">Login</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


