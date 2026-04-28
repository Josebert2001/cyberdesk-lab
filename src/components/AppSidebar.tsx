import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FlaskConical, Gamepad2, MessageCircle, BookOpen, Menu, X, Zap, Home, GraduationCap, FolderOpen, Trophy, Map, Info, Users, Layers, LogOut } from "lucide-react";
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
    items: [
      { title: "Home", path: "/welcome", icon: Home },
    ],
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

  const displayName = profile?.name || user?.email?.split("@")[0] || "Student";

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-primary/10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full border-2 border-primary flex items-center justify-center bg-card">
            <span className="font-display text-[11px] tracking-[0.08em] text-primary">DSA</span>
          </div>
          <div>
            <h1 className="font-display text-xl tracking-[0.08em] text-primary leading-none">
              DOCSSA
            </h1>
            <p className="text-[10px] font-mono text-muted-foreground tracking-wider mt-1">
              UNIUYO · CYBER SEC
            </p>
          </div>
        </div>
        {user && (
          <p className="text-xs text-muted-foreground/70 font-mono mt-3 truncate">
            &gt; {displayName}
          </p>
        )}
      </div>

      <nav className="flex-1 px-3 space-y-4 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.label || "home"}>
            {group.label && (
              <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground/50 px-4 mb-1">
                {group.label}
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
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm transition-all duration-200 ${
                      isActive
                        ? "text-primary border-l-2 border-primary bg-primary/5 font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <item.icon className={`h-4 w-4 shrink-0 ${isActive ? "text-primary" : ""}`} />
                    <span>{item.title}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

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
              RANK UP!
            </div>
          )}
        </div>
      </div>

      <div className="px-4 pb-4 pt-2 space-y-3">
        {user && (
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors font-mono"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>Logout</span>
          </button>
        )}
        <p className="text-[10px] text-muted-foreground/70 font-mono px-2 tracking-wider uppercase">
          DOCSSA · UniUyo
        </p>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-md bg-card border border-border text-foreground"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
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
