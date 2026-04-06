import { NavLink, useLocation } from "react-router-dom";
import { FlaskConical, Gamepad2, MessageCircle, BookOpen, Menu, X, Zap, Home, GraduationCap } from "lucide-react";
import { useState } from "react";
import { useXPContext } from "@/components/XPContext";
import { Progress } from "@/components/ui/progress";

const navItems = [
  { title: "Home", path: "/welcome", icon: Home },
  { title: "Lab", path: "/", icon: FlaskConical },
  { title: "Playground", path: "/playground", icon: Gamepad2 },
  { title: "Ask Anything", path: "/ask", icon: MessageCircle },
  { title: "Exam Prep", path: "/exam-prep", icon: BookOpen },
  { title: "CBT Prep", path: "/cbt-prep", icon: GraduationCap },
];

export function AppSidebar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { xp, rank, nextRank, progress, rankUp } = useXPContext();

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary neon-text-glow font-mono">
          CYB Dept.
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          University of Uyo · Faculty of Computing
        </p>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm transition-colors duration-200 ${
                isActive
                  ? "text-primary border-l-2 border-primary bg-primary/5 font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* XP Section */}
      <div className="px-4 pb-2">
        <div
          className={`rounded-lg border border-border bg-card p-4 transition-all duration-300 ${
            rankUp ? "neon-glow-strong border-primary" : ""
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Zap className={`h-4 w-4 text-primary ${rankUp ? "animate-pulse" : ""}`} />
            <span className={`text-xs font-mono font-bold text-primary ${rankUp ? "neon-text-glow" : ""}`}>
              {rank.title}
            </span>
          </div>
          <Progress value={progress} className="h-2 mb-1.5" />
          <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
            <span>{xp} XP</span>
            {nextRank ? <span>{nextRank.minXP} XP</span> : <span>MAX</span>}
          </div>
          {rankUp && (
            <div className="mt-2 text-center text-xs font-mono text-primary neon-text-glow animate-fade-in font-bold">
              ⚡ RANK UP! ⚡
            </div>
          )}
        </div>
      </div>

      <div className="p-6 pt-2">
        <p className="text-xs text-muted-foreground font-mono">
          Dept. of Cybersecurity, UniUyo
        </p>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-md bg-card border border-border text-foreground"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-60 bg-sidebar border-r border-border transition-transform duration-300 md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:block`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
