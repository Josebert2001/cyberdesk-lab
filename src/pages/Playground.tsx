import { useState } from "react";
import { CaesarCipherLab } from "@/components/CaesarCipherLab";
import { SqlInjectionLab } from "@/components/SqlInjectionLab";
import { HashCrackerLab } from "@/components/HashCrackerLab";
import { XssLab } from "@/components/XssLab";
import { NetworkScannerLab } from "@/components/NetworkScannerLab";
import { PasswordStrengthLab } from "@/components/PasswordStrengthLab";
import { Shield, Gamepad2 } from "lucide-react";

interface LabMeta {
  name: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  time: string;
  desc: string;
}

const labs: LabMeta[] = [
  { name: "Caesar Cipher", difficulty: "Beginner", time: "5 min", desc: "Encrypt messages and crack ciphertext" },
  { name: "SQL Injection", difficulty: "Intermediate", time: "10 min", desc: "Break into a login form with SQL payloads" },
  { name: "Hash Cracker", difficulty: "Beginner", time: "5 min", desc: "Crack an MD5 hash with a wordlist attack" },
  { name: "XSS Playground", difficulty: "Intermediate", time: "10 min", desc: "Inject scripts into a fake social platform" },
  { name: "Network Scanner", difficulty: "Beginner", time: "5 min", desc: "Simulate an Nmap port scan on a target" },
  { name: "Password Strength", difficulty: "Beginner", time: "5 min", desc: "Analyze and generate strong passwords" },
];

const DIFF_COLORS: Record<string, string> = {
  Beginner: "bg-green-500/10 text-green-400 border-green-500/30",
  Intermediate: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  Advanced: "bg-red-500/10 text-red-400 border-red-500/30",
};

const Playground = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="p-6 md:p-12">
      <div className="flex items-center gap-3 mb-6">
        <Gamepad2 className="h-7 w-7 text-primary neon-text-glow" />
        <div>
          <h1 className="text-2xl font-bold text-foreground font-mono">Security Playground</h1>
          <p className="text-muted-foreground text-sm">Hands-on cybersecurity labs — learn by doing</p>
        </div>
      </div>

      <div className="flex gap-1 border-b border-border mb-2 overflow-x-auto">
        {labs.map((lab, i) => (
          <button
            key={lab.name}
            onClick={() => setActive(i)}
            className={`px-4 py-3 text-sm font-mono whitespace-nowrap transition-colors duration-200 border-b-2 -mb-px ${
              active === i
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {lab.name}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 py-3 mb-6">
        <span className={`text-xs font-mono border rounded px-2 py-0.5 ${DIFF_COLORS[labs[active].difficulty]}`}>
          {labs[active].difficulty}
        </span>
        <span className="text-xs text-muted-foreground font-mono flex items-center gap-1">
          <Shield className="h-3 w-3" /> {labs[active].time}
        </span>
        <span className="text-xs text-muted-foreground">
          {labs[active].desc}
        </span>
      </div>

      {active === 0 && <CaesarCipherLab />}
      {active === 1 && <SqlInjectionLab />}
      {active === 2 && <HashCrackerLab />}
      {active === 3 && <XssLab />}
      {active === 4 && <NetworkScannerLab />}
      {active === 5 && <PasswordStrengthLab />}
    </div>
  );
};

export default Playground;
