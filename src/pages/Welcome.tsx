import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MatrixRain } from "@/components/MatrixRain";
import { Shield, Brain, Terminal, Zap, BookOpen, FolderOpen } from "lucide-react";

const features = [
  { icon: Terminal, title: "Interactive Labs", desc: "Hands-on cybersecurity challenges built around your syllabus" },
  { icon: Brain, title: "CYB AI Assistant", desc: "Ask any cybersecurity, networking or programming question" },
  { icon: BookOpen, title: "CBT Practice Zone", desc: "Exam-style questions for PHY 111, SEN 211, CYB 212, CYB 213" },
  { icon: FolderOpen, title: "Resource Library", desc: "Lecture notes, past questions and tools — all in one place" },
  { icon: Zap, title: "Earn XP & Rank Up", desc: "Level up from Script Kiddie to Legend as you learn" },
  { icon: Shield, title: "Safe Environment", desc: "Learn offensive and defensive security without real-world risk" },
];

export default function Welcome() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <MatrixRain />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />

      <div className="relative z-10">
        <nav className="flex items-center justify-between p-6 max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <Terminal className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Dept. of Cybersecurity</span>
          </div>
          <Button variant="neon" asChild>
            <Link to="/lab">Enter Portal</Link>
          </Button>
        </nav>

        <section className="max-w-4xl mx-auto text-center px-6 pt-20 pb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Your Cybersecurity Department.{" "}
            <span className="text-primary neon-text-glow">Reimagined.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Access interactive labs, past questions, AI-powered tutoring and course resources — built for UniUyo Cybersecurity students by the Director of Software &amp; Hardware.
          </p>

          <div className="bg-card border border-border rounded-lg p-4 font-mono text-sm text-left max-w-md mx-auto mb-10">
            <div className="flex gap-2 mb-3">
              <span className="w-3 h-3 rounded-full bg-destructive" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-primary" />
            </div>
            <div className="text-muted-foreground">
              <p>&gt; initializing dept. portal...</p>
              <p>&gt; loading student resources... <span className="text-primary">done</span></p>
              <p>&gt; <span className="text-primary animate-pulse">welcome, cyb student_</span></p>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="neon" asChild>
              <Link to="/lab">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
            Everything You Need to Succeed
          </h2>
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

        <footer className="text-center py-8 text-muted-foreground text-sm">
          © 2026 Department of Cybersecurity, University of Uyo. Built by the Director of Software &amp; Hardware.
        </footer>
      </div>
    </div>
  );
}
