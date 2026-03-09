import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MatrixRain } from "@/components/MatrixRain";
import { Shield, Brain, Terminal, Zap, BookOpen, Users } from "lucide-react";

const features = [
  { icon: Terminal, title: "Interactive Labs", desc: "Hands-on hacking challenges" },
  { icon: Brain, title: "AI Tutor", desc: "Get instant help & explanations" },
  { icon: BookOpen, title: "Exam Prep", desc: "Practice exam-style questions" },
  { icon: Shield, title: "Safe Environment", desc: "Learn without real-world risk" },
  { icon: Zap, title: "Earn XP", desc: "Level up as you learn" },
  { icon: Users, title: "Community", desc: "Join fellow cyber learners" },
];

export default function Welcome() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <MatrixRain />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />

      <div className="relative z-10">
        {/* Nav */}
        <nav className="flex items-center justify-between p-6 max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <Terminal className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">CyberDesk</span>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button variant="neon" asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </nav>

        {/* Hero */}
        <section className="max-w-4xl mx-auto text-center px-6 pt-20 pb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Learn to <span className="text-primary neon-text-glow">Hack Ethically</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Master cybersecurity through interactive labs, AI-powered tutoring, and hands-on challenges. 
            Your journey to becoming a security expert starts here.
          </p>

          {/* Terminal snippet */}
          <div className="bg-card border border-border rounded-lg p-4 font-mono text-sm text-left max-w-md mx-auto mb-10">
            <div className="flex gap-2 mb-3">
              <span className="w-3 h-3 rounded-full bg-destructive" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-primary" />
            </div>
            <div className="text-muted-foreground">
              <p>&gt; initializing CyberDesk...</p>
              <p>&gt; loading exploit modules... <span className="text-primary">done</span></p>
              <p>&gt; <span className="text-primary animate-pulse">ready_</span></p>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="neon" asChild>
              <Link to="/signup">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/login">I Have an Account</Link>
            </Button>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
              >
                <Icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 text-muted-foreground text-sm">
          © 2024 CyberDesk. Learn responsibly.
        </footer>
      </div>
    </div>
  );
}
