import { useNavigate } from "react-router-dom";
import { useAiPanel } from "@/components/AiPanelContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TypewriterHero } from "@/components/TypewriterHero";
import { MatrixRain } from "@/components/MatrixRain";

const labs = [
  { title: "Caesar Cipher", desc: "Encrypt & crack messages using classical substitution.", tab: 0, tag: "cryptography" },
  { title: "SQL Injection", desc: "Exploit a vulnerable login form — hands on.", tab: 1, tag: "web_exploit" },
  { title: "Hash Cracker", desc: "Crack MD5 hashes via dictionary wordlist.", tab: 2, tag: "forensics" },
];

const Lab = () => {
  const navigate = useNavigate();
  const { analyze } = useAiPanel();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      analyze(query.trim());
      setQuery("");
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-2rem)]">
      <MatrixRain />

      <div className="relative z-10 p-6 md:p-12 max-w-4xl mx-auto">
        <div className="text-center mt-12 mb-10">
          <TypewriterHero />
          <h1 className="font-display text-4xl md:text-6xl text-foreground mb-3 leading-tight tracking-[0.02em]">
            Built for UniUyo{" "}
            <span className="text-primary neon-text-glow">Cybersecurity Students.</span>
          </h1>
          <p className="font-mono text-sm text-muted-foreground max-w-xl mx-auto leading-[1.8]">
            Explore interactive labs, crack real challenges, and learn how attackers think.
          </p>
        </div>

        {/* Terminal search bar */}
        <form onSubmit={handleSearch} className="relative max-w-xl mx-auto mb-14">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-xs text-primary/55 select-none">$</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ask anything or pick a lab below..."
            className="w-full bg-card border border-primary/15 py-3 pl-10 pr-4 font-mono text-sm text-foreground placeholder:text-muted-foreground/45 focus:outline-none focus:border-primary/50 transition-all"
          />
        </form>

        {/* Lab cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {labs.map((lab) => (
            <div key={lab.title} className="brand-card group relative overflow-hidden">
              {/* Terminal chrome */}
              <div className="flex items-center gap-1.5 px-4 py-2 border-b border-primary/8 bg-primary/[0.03]">
                <span className="w-2 h-2 rounded-full bg-destructive/45" />
                <span className="w-2 h-2 rounded-full bg-brand-gold/35" />
                <span className="w-2 h-2 rounded-full bg-primary/45" />
                <span className="ml-2 font-mono text-[9px] text-primary/35 tracking-widest">[{lab.tag}]</span>
              </div>

              <div className="p-5">
                <h3 className="font-display text-xl tracking-[0.04em] text-foreground mb-1.5">{lab.title}</h3>
                <p className="font-mono text-[11px] text-muted-foreground leading-[1.7] mb-5">{lab.desc}</p>
                <Button
                  variant="neon"
                  size="sm"
                  onClick={() => navigate(`/playground?lab=${lab.tab}`)}
                  className="w-full font-mono text-[10px] tracking-widest uppercase"
                >
                  Launch Lab →
                </Button>
              </div>

              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lab;
