import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

export function PublicPageWrapper({ children }: Props) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 brand-glass border-b border-primary/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <Link
              to="/welcome"
              className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </Link>
            <div className="w-px h-5 bg-primary/15" />
            <div className="flex items-center gap-2.5">
              <div className="bg-white/95 px-1.5 py-0.5 hidden sm:flex items-center">
                <img src="/uniuyo-crest.png" alt="UniUyo" className="h-5 w-auto" />
              </div>
              <div className="hidden sm:block w-px h-5 bg-primary/15" />
              <img src="/logo-256.png" alt="DOCSSA" className="h-6 w-6 brand-logo" />
              <span className="font-display text-sm tracking-[0.1em] text-primary font-bold">DOCSSA</span>
              <span className="font-mono text-[9px] text-muted-foreground/40 tracking-widest hidden md:inline">// UNIUYO</span>
            </div>
          </div>
          <Link
            to="/login"
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          >
            Student Login →
          </Link>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
