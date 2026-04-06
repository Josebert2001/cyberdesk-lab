import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAiPanel } from "@/components/AiPanelContext";
import { useXPContext } from "@/components/XPContext";
import { Terminal } from "lucide-react";

export function NetworkScannerLab() {
  const [ip, setIp] = useState("192.168.1.1");
  const [scanning, setScanning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [xpAwarded, setXpAwarded] = useState(false);
  const { analyze } = useAiPanel();
  const { addXP } = useXPContext();

  function handleScan() {
    if (scanning) return;
    setScanning(true);
    setOutput(null);

    setTimeout(() => {
      const result = `Starting Nmap scan...
Host: ${ip}  Status: Up

PORT     STATE  SERVICE
22/tcp   open   ssh
80/tcp   open   http
443/tcp  open   https
3306/tcp open   mysql

Nmap done: 1 IP address scanned`;
      setOutput(result);
      setScanning(false);
      if (!xpAwarded) {
        addXP(10);
        setXpAwarded(true);
      }
    }, 2000);
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold font-mono text-foreground mb-1">Network Scanner (Simulated)</h2>
        <p className="text-muted-foreground text-sm">Simulate an Nmap-style port scan in a safe environment.</p>
      </div>

      {/* Input */}
      <div className="bg-card border border-border rounded-lg p-5 space-y-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="Enter target IP"
            className="flex-1 bg-background border border-border rounded-lg py-2 px-4 text-foreground placeholder:text-muted-foreground font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
          <Button variant="neon" className="font-mono" onClick={handleScan} disabled={scanning}>
            {scanning ? "Scanning..." : "Scan"}
          </Button>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="bg-black border border-border rounded-lg overflow-hidden">
        <div className="bg-card border-b border-border px-4 py-2 flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-mono text-muted-foreground">terminal</span>
          <div className="flex gap-1.5 ml-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-destructive" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
          </div>
        </div>
        <div className="p-4 min-h-[180px] font-mono text-sm">
          {scanning && (
            <p className="text-primary animate-pulse">Scanning host {ip}...</p>
          )}
          {!scanning && !output && (
            <p className="text-muted-foreground">$ Enter an IP address and press Scan to begin.</p>
          )}
          {output && (
            <pre className="text-green-400 whitespace-pre-wrap leading-relaxed">{output}</pre>
          )}
        </div>
      </div>

      {/* Port explanation */}
      {output && (
        <div className="bg-card border border-border rounded-lg p-5 space-y-3 animate-fade-in">
          <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Open Ports — What They Mean</h3>
          {[
            { port: "22/tcp — SSH", risk: "Remote login. If exposed publicly with weak credentials, attackers can brute-force in." },
            { port: "80/tcp — HTTP", risk: "Unencrypted web traffic. Vulnerable to sniffing and injection attacks." },
            { port: "443/tcp — HTTPS", risk: "Encrypted web traffic. Generally safe, but misconfigurations can still be exploited." },
            { port: "3306/tcp — MySQL", risk: "Database port exposed publicly — a critical risk. Should never be internet-facing." },
          ].map(({ port, risk }) => (
            <div key={port} className="flex gap-3 text-sm">
              <span className="text-primary font-mono shrink-0 w-32">{port}</span>
              <span className="text-muted-foreground">{risk}</span>
            </div>
          ))}
          <div className="mt-3 bg-primary/5 border border-primary/20 rounded-lg px-4 py-3">
            <p className="text-xs font-mono text-primary font-bold mb-1">Defense Tip</p>
            <p className="text-sm text-foreground/80">Close unused ports. Use a firewall to restrict access. Never expose database ports publicly.</p>
          </div>
        </div>
      )}

      {output && (
        <Button
          variant="outline"
          className="font-mono w-full"
          onClick={() => analyze(`Explain what Nmap port scanning is, what the open ports 22 (SSH), 80 (HTTP), 443 (HTTPS), and 3306 (MySQL) mean from a security perspective, what attackers can do with this information, and how to defend against reconnaissance scanning.`)}
        >
          Analyze with AI →
        </Button>
      )}
    </div>
  );
}
