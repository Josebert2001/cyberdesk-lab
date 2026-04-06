import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useAiPanel } from "@/components/AiPanelContext";
import { useXPContext } from "@/components/XPContext";
import { Shield } from "lucide-react";

export function XssLab() {
  const [postInput, setPostInput] = useState("");
  const [posts, setPosts] = useState<string[]>([]);
  const [xssDetected, setXssDetected] = useState(false);
  const [xpAwarded, setXpAwarded] = useState(false);
  const feedRef = useRef<HTMLDivElement>(null);
  const { analyze } = useAiPanel();
  const { addXP } = useXPContext();

  function handlePost() {
    if (!postInput.trim()) return;
    const hasScript = /<script[\s\S]*?>[\s\S]*?<\/script>/i.test(postInput) || /javascript:/i.test(postInput);
    setPosts((prev) => [...prev, postInput]);
    if (hasScript) {
      setXssDetected(true);
      if (!xpAwarded) {
        addXP(10);
        setXpAwarded(true);
      }
    }
    setPostInput("");
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold font-mono text-foreground mb-1">XSS Playground</h2>
        <p className="text-muted-foreground text-sm">Simulate a Cross-Site Scripting attack in a safe environment.</p>
      </div>

      {/* Fake Social Platform */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="bg-primary/10 border-b border-border px-4 py-3 flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          <span className="font-mono text-sm text-primary font-bold">UniPortal Social</span>
          <span className="text-xs text-muted-foreground ml-auto">@cyb_student</span>
        </div>

        <div className="p-4 space-y-3">
          <textarea
            value={postInput}
            onChange={(e) => setPostInput(e.target.value)}
            placeholder="Write a post..."
            rows={3}
            className="w-full bg-background border border-border rounded-lg p-3 text-foreground placeholder:text-muted-foreground text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none"
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-mono">
              Try: <span className="text-primary">&lt;script&gt;alert('hacked')&lt;/script&gt;</span>
            </p>
            <Button variant="neon" size="sm" className="font-mono" onClick={handlePost}>
              Post
            </Button>
          </div>
        </div>

        {/* XSS Alert Banner */}
        {xssDetected && (
          <div className="mx-4 mb-4 border border-red-500 bg-red-500/10 rounded-lg px-4 py-3 animate-fade-in">
            <p className="text-red-400 font-mono text-sm font-bold">
              ⚠ XSS Attack Detected — Script Executed
            </p>
            <p className="text-red-400/70 text-xs mt-1 font-mono">+10 XP awarded for finding the vulnerability</p>
          </div>
        )}

        {/* Feed */}
        {posts.length > 0 && (
          <div className="px-4 pb-4 space-y-3" ref={feedRef}>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Feed</p>
            {posts.map((post, i) => (
              <div key={i} className="bg-background border border-border rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary text-xs font-mono">C</span>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">@cyb_student</span>
                </div>
                <div
                  className="text-foreground text-sm"
                  dangerouslySetInnerHTML={{ __html: post }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* What just happened */}
      <div className="bg-card border border-border rounded-lg p-5 space-y-2">
        <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest">What Just Happened?</h3>
        <p className="text-foreground text-sm leading-relaxed">
          The app used <span className="text-primary font-mono">innerHTML</span> to render your post. When a{" "}
          <span className="text-primary font-mono">&lt;script&gt;</span> tag is injected, the browser executes it as
          JavaScript — this is Cross-Site Scripting (XSS). Real attackers use this to steal session cookies, redirect
          users, or deface websites.
        </p>
        <div className="mt-3 bg-primary/5 border border-primary/20 rounded-lg px-4 py-3">
          <p className="text-xs font-mono text-primary font-bold mb-1">Defense Tip</p>
          <p className="text-sm text-foreground/80">
            Always sanitize user input. Use <span className="font-mono text-primary">textContent</span> instead of{" "}
            <span className="font-mono text-primary">innerHTML</span>, or use a library like DOMPurify.
          </p>
        </div>
      </div>

      <Button
        variant="outline"
        className="font-mono w-full"
        onClick={() => analyze("Explain XSS (Cross-Site Scripting) attacks — how they work, real payloads, impact, and how to defend against them with proper sanitization.")}
      >
        Analyze with AI →
      </Button>
    </div>
  );
}
