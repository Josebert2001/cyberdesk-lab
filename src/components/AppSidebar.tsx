import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FlaskConical,
  Gamepad2,
  MessageCircle,
  BookOpen,
  Menu,
  X,
  Zap,
  Home,
  GraduationCap,
  FolderOpen,
  Trophy,
  Map,
  Info,
  Users,
  Layers,
  LogOut,
  Beaker,
} from "lucide-react";
import { useState } from "react";
import { useXPContext } from "@/components/XPContext";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";

interface NavItem {
  title: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: "",
    items: [{ title: "Home", path: "/welcome", icon: Home }],
  },
  {
    label: "Learn",
    items: [
      { title: "Lab", path: "/lab", icon: FlaskConical },
      { title: "Playground", path: "/playground", icon: Gamepad2 },
      { title: "Ask Anything", path: "/ask", icon: MessageCircle },
    ],
  },
  {
    label: "Practice",
    items: [
      { title: "CBT Prep", path: "/cbt-prep", icon: GraduationCap },
      { title: "Exam Prep", path: "/exam-prep", icon: BookOpen },
    ],
  },
  {
    label: "Explore",
    items: [
      { title: "Opportunities", path: "/opportunities", icon: Trophy },
      { title: "Roadmap", path: "/roadmap", icon: Map },
      { title: "Resources", path: "/resources", icon: FolderOpen },
      { title: "Showcase", path: "/showcase", icon: Layers },
    ],
  },
  {
    label: "Department",
    items: [
      { title: "About", path: "/about", icon: Info },
      { title: "Programmes", path: "/programmes", icon: GraduationCap },
      { title: "Research", path: "/research", icon: Beaker },
      { title: "Staff", path: "/staff", icon: Users },
    ],
  },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { xp, rank, nextRank, progress, rankUp } = useXPContext();
  const { user, profile, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/login", { replace: true });
  };

  const displayName = profile?.name || user?.email?.split("@")[0] || "student";

  const sidebarContent = (
    <div className="flex flex-col h-full bg-sidebar">
      {/* Header */}
      <div className="px-5 py-5 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <img src="/logo-256.png" alt="DOCSSA" className="h-9 w-9 shrink-0 brand-logo" />
          <div>
            <h1 className="font-display text-lg tracking-[0.12em] text-primary font-bold leading-none">DOCSSA</h1>
            <p className="font-mono text-[9px] text-muted-foreground/40 tracking-widest mt-0.5 uppercase">
              UniUyo Â· Cyber Sec
            </p>
          </div>
        </div>
        {user && (
          <p className="font-mono text-[10px] text-muted-foreground/50 mt-3 truncate tracking-wide">
            <span className="text-primary/40">&gt;</span> {displayName}@docssa
          </p>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.label || "home"}>
            {group.label && (
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-primary/38 px-3 mb-1.5">
                [{group.label}]
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 text-[11px] transition-all duration-150 border-l-2 ${
                      isActive
                        ? "text-primary border-primary bg-primary/5 font-bold font-mono"
                        : "text-muted-foreground hover:text-foreground hover:bg-primary/[0.04] font-mono border-transparent"
                    }`}
                  >
                    <item.icon className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-primary" : ""}`} />
                    <span>{item.title}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* XP section */}
      <div className="px-4 pb-2">
        <div
          className={`border border-primary/12 bg-card/50 p-3.5 transition-all duration-300 ${
            rankUp ? "neon-glow-strong border-primary" : ""
          }`}
        >
          <div className="flex items-center gap-2 mb-2.5">
            <Zap className={`h-3.5 w-3.5 text-primary ${rankUp ? "animate-pulse" : ""}`} />
            <span
              className={`font-mono text-[10px] font-bold text-primary tracking-widest uppercase ${
                rankUp ? "neon-text-glow" : ""
              }`}
            >
              {rank.title}
            </span>
          </div>
          <Progress value={progress} className="h-1.5 mb-1.5" />
          <div className="flex justify-between font-mono text-[9px] text-muted-foreground/50">
            <span>{xp} XP</span>
            {nextRank ? <span>{nextRank.minXP} XP</span> : <span>MAX</span>}
          </div>
          {rankUp && (
            <div className="mt-2 text-center font-mono text-[10px] text-primary neon-text-glow animate-fade-in font-bold tracking-widest">
              [RANK UP!]
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 pt-2 space-y-2">
        {user && (
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 font-mono text-[10px] text-muted-foreground/50 hover:text-destructive hover:bg-destructive/5 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5 shrink-0" />
            <span>logout</span>
          </button>
        )}
        <p className="font-mono text-[9px] text-muted-foreground/25 px-3 tracking-widest uppercase">
          DOCSSA Â· UniUyo
        </p>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-card border border-primary/20 text-foreground"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
      >
        {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-60 bg-sidebar border-r border-sidebar-border transition-transform duration-300 md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:block`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}


