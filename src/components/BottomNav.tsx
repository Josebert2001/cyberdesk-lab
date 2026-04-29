import { NavLink } from "react-router-dom";
import { Home, FlaskConical, MessageCircle, GraduationCap, LayoutGrid } from "lucide-react";

const items = [
  { title: "Home", path: "/welcome", icon: Home },
  { title: "Lab", path: "/lab", icon: FlaskConical },
  { title: "Ask", path: "/ask", icon: MessageCircle },
  { title: "Prep", path: "/cbt-prep", icon: GraduationCap },
  { title: "More", path: "/opportunities", icon: LayoutGrid },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-sidebar border-t border-primary/15 safe-area-bottom">
      <div className="flex items-stretch">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground/60 hover:text-muted-foreground"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`h-[18px] w-[18px] shrink-0 ${isActive ? "neon-text-glow" : ""}`} />
                <span className="font-mono text-[9px] uppercase tracking-widest">{item.title}</span>
                {isActive && (
                  <span className="absolute bottom-0 w-8 h-0.5 bg-primary rounded-full" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
