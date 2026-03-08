import { useState } from "react";
import { CaesarCipherLab } from "@/components/CaesarCipherLab";
import { SqlInjectionLab } from "@/components/SqlInjectionLab";
import { HashCrackerLab } from "@/components/HashCrackerLab";
const tabs = ["Caesar Cipher", "SQL Injection", "Hash Cracker"];

const Playground = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="p-6 md:p-12">
      <div className="flex gap-1 border-b border-border mb-8">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(i)}
            className={`px-4 py-3 text-sm font-mono transition-colors duration-200 border-b-2 -mb-px ${
              active === i
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {active === 0 && <CaesarCipherLab />}
      {active === 1 && <SqlInjectionLab />}
      {active === 2 && <HashCrackerLab />}
    </div>
  );
};

export default Playground;
