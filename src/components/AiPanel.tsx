import { useAiPanel } from "./AiPanelContext";
import { X, BookOpen, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { saveToExamPrep } from "@/lib/storage";

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

export function AiPanel() {
  const { isOpen, isLoading, analysis, error, close } = useAiPanel();
  const [saved, setSaved] = useState(false);

  // Reset saved state when new analysis arrives
  useEffect(() => {
    setSaved(false);
  }, [analysis]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
        onClick={close}
      />

      {/* Panel */}
      <div className="fixed top-0 right-0 z-50 h-full w-full md:w-[40%] bg-card border-l border-border overflow-y-auto animate-slide-in-right">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between z-10">
          <h2 className="text-primary font-mono font-bold text-sm neon-text-glow">
            CYB AI Assistant
          </h2>
          <button
            onClick={close}
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
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
              {/* Concept */}
              <section>
                <h3 className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-2">
                  What Happened
                </h3>
                <p className="text-foreground font-semibold text-lg">{analysis.concept}</p>
              </section>

              {/* How it works */}
              <section>
                <h3 className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-2">
                  How It Works
                </h3>
                <p className="text-foreground/80 text-sm leading-relaxed">{analysis.how_it_works}</p>
              </section>

              {/* Live Example */}
              <section>
                <h3 className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-2">
                  Live Example
                </h3>
                <div className="bg-background border border-border rounded-lg p-4 font-mono text-primary text-sm whitespace-pre-wrap neon-text-glow">
                  {analysis.demonstration}
                </div>
              </section>

              {/* Challenge */}
              <section>
                <h3 className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-2">
                  Try This Next
                </h3>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-sm text-foreground">
                  {analysis.challenge}
                </div>
              </section>

              {/* Defense */}
              <section>
                <h3 className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-2">
                  Defend Against It
                </h3>
                <p className="text-foreground/80 text-sm leading-relaxed">{analysis.defense}</p>
              </section>

              {/* Exam Bullets */}
              <section>
                <h3 className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-2">
                  Exam Bullets
                </h3>
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

              {/* Save button */}
              <Button
                variant={saved ? "secondary" : "neon"}
                className="font-mono w-full"
                disabled={saved}
                onClick={() => {
                  saveToExamPrep(analysis.concept, analysis.exam_bullets);
                  setSaved(true);
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
