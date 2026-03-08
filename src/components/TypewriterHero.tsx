import { useState, useEffect } from "react";

const lines = [
  "> initializing CyberDesk...",
  "> loading exploit modules...",
  "> ready.",
];

export function TypewriterHero() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;

    const currentLine = lines[lineIndex];

    if (charIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + currentLine[charIndex]);
        setCharIndex((c) => c + 1);
      }, 45);
      return () => clearTimeout(timeout);
    }

    // Line finished typing
    const pause = setTimeout(() => {
      setDisplayedLines((prev) => [...prev, currentText]);
      setCurrentText("");
      setCharIndex(0);
      if (lineIndex < lines.length - 1) {
        setLineIndex((i) => i + 1);
      } else {
        setDone(true);
      }
    }, 400);
    return () => clearTimeout(pause);
  }, [charIndex, lineIndex, currentText, done]);

  return (
    <div className="font-mono text-left space-y-1 mb-6">
      {displayedLines.map((line, i) => (
        <div
          key={i}
          className={`text-lg md:text-2xl ${
            line === "> ready."
              ? "text-primary neon-text-glow font-bold"
              : "text-muted-foreground"
          }`}
        >
          {line}
        </div>
      ))}
      {!done && (
        <div className="text-lg md:text-2xl text-muted-foreground">
          {currentText}
          <span className="animate-pulse text-primary">█</span>
        </div>
      )}
      {done && (
        <div className="text-lg md:text-2xl text-primary neon-text-glow font-bold">
          <span className="animate-pulse">█</span>
        </div>
      )}
    </div>
  );
}
