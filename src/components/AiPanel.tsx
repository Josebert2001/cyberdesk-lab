import { useAiPanel } from "./AiPanelContext";
import { X, BookOpen, Save, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { saveToExamPrep } from "@/lib/storage";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/contexts/AuthContext";

const LOADING_TEXTS = [
  "Analyzing...",
  "Thinking like an attacker...",
  "Building your answer...",
  "Almost there...",
];

function LoadingState() {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((i) => (i + 1) % LOADING_TEXTS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      <p className="text-primary font-mono text-sm neon-text-glow transition-all duration-300">
        {LOADING_TEXTS[textIndex]}
      </p>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      toast("Could not copy — try selecting and copying manually");
    });
  }

  return (
    <button
      onClick={handleCopy}
      className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
      aria-label="Copy to clipboard"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

export function AiPanel() {
  const { isOpen, isLoading, analysis, error, close } = useAiPanel();
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(false);
  }, [analysis]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
        onClick={close}
      />

      <div className="fixed top-0 right-0 z-50 h-full w-full md:w-[40%] bg-card border-l border-border overflow-y-auto animate-slide-in-right">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between z-10">
          <h2 className="text-primary font-mono font-bold text-sm neon-text-glow">
            CYB AI Assistant
          </h2>
          <button
            onClick={close}
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
            aria-label="Close panel"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {isLoading && <LoadingState />}

          {error && (
            <div className="text-destructive font-mono text-sm text-center py-12">
              {error}
            </div>
          )}

          {analysis && (
            <div className="space-y-6 animate-fade-in">
              <section>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
                    What Happened
                  </h3>
                  <CopyButton text={analysis.concept} />
                </div>
                <p className="text-foreground font-semibold text-lg">{analysis.concept}</p>
              </section>

              <section>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
                    How It Works
                  </h3>
                  <CopyButton text={analysis.how_it_works} />
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed">{analysis.how_it_works}</p>
              </section>

              <section>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
                    Live Example
                  </h3>
                  <CopyButton text={analysis.demonstration} />
                </div>
                <div className="bg-background border border-border rounded-lg p-4 font-mono text-primary text-sm whitespace-pre-wrap neon-text-glow">
                  {analysis.demonstration}
                </div>
              </section>

              <section>
                <h3 className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-2">
                  Try This Next
                </h3>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-sm text-foreground">
                  {analysis.challenge}
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
                    Defend Against It
                  </h3>
                  <CopyButton text={analysis.defense} />
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed">{analysis.defense}</p>
              </section>

              <section>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
                    Exam Bullets
                  </h3>
                  <CopyButton text={analysis.exam_bullets.join("\n")} />
                </div>
                <div className="space-y-2">
                  {analysis.exam_bullets.map((bullet, i) => (
                    <div
                      key={i}
                      className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-3 text-sm text-primary font-mono"
                    >
                      {bullet}
                    </div>
                  ))}
                </div>
              </section>

              <Button
                variant={saved ? "secondary" : "neon"}
                className="font-mono w-full"
                disabled={saved}
                onClick={() => {
                  saveToExamPrep(user?.id, analysis.concept, analysis.exam_bullets);
                  setSaved(true);
                  toast("Saved to Exam Prep");
                }}
              >
                {saved ? (
                  <>
                    <BookOpen className="h-4 w-4 mr-2" /> Saved to Exam Prep
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" /> Save to Exam Prep
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
