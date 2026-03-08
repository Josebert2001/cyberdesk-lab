import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAiPanel } from "@/components/AiPanelContext";
import { useState } from "react";

const labs = [
  { title: "Caesar Cipher", desc: "Encrypt & crack messages" },
  { title: "SQL Injection", desc: "Break a login form" },
  { title: "Hash Cracker", desc: "Crack MD5 hashes" },
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
    <div className="p-6 md:p-12 max-w-4xl mx-auto">
      <div className="text-center mt-12 mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
          Don't just study it.{" "}
          <span className="text-primary neon-text-glow">Break it.</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Your personal ethical hacking lab and cybersecurity tutor.
        </p>
      </div>

      <form onSubmit={handleSearch} className="relative max-w-xl mx-auto mb-16">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask anything or pick a lab below..."
          className="w-full bg-card border border-border rounded-lg py-3 pl-11 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-shadow"
        />
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {labs.map((lab) => (
          <div
            key={lab.title}
            className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors duration-300 group"
          >
            <h3 className="text-foreground font-semibold text-lg mb-2 font-mono">
              {lab.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-6">{lab.desc}</p>
            <Button
              variant="neon"
              size="sm"
              onClick={() => navigate("/playground")}
              className="w-full font-mono text-xs"
            >
              Launch Lab
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lab;
