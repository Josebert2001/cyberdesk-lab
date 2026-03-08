import { NavLink, useLocation } from "react-router-dom";
import { FlaskConical, Gamepad2, MessageCircle, BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { title: "Lab", path: "/", icon: FlaskConical },
  { title: "Playground", path: "/playground", icon: Gamepad2 },
  { title: "Ask Anything", path: "/ask", icon: MessageCircle },
  { title: "Exam Prep", path: "/exam-prep", icon: BookOpen },
];

export function AppSidebar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary neon-text-glow font-mono">
          CyberDesk
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Don't just study it. Break it.
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

      <div className="p-6">
        <p className="text-xs text-muted-foreground font-mono">
          Powered by Gemini AI
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile trigger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-md bg-card border border-border text-foreground"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
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
