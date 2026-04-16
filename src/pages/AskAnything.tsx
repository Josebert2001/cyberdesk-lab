import { Send, ChevronDown, ChevronUp, Save, BookOpen, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { chatWithGemini, ChatAiResponse } from "@/lib/gemini-chat";
import { useXPContext } from "@/components/XPContext";
import { saveToExamPrep } from "@/lib/storage";

interface ChatMessage {
  id: number;
  role: "user" | "ai";
  text: string;
  aiData?: ChatAiResponse;
}

function AiMessage({ msg }: { msg: ChatMessage }) {
  const [examOpen, setExamOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const d = msg.aiData;
  if (!d) return null;

  return (
    <div className="flex flex-col items-start gap-2 max-w-[80%]">
      <div className="bg-secondary rounded-lg rounded-tl-none px-4 py-3 space-y-3">
        <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">{d.answer}</p>
        {d.example && (
          <div className="bg-background border border-border rounded-md p-3 font-mono text-primary text-xs whitespace-pre-wrap neon-text-glow">
            {d.example}
          </div>
        )}
      </div>

      {/* Exam summary chip */}
      {d.exam_summary && (
        <button
          onClick={() => setExamOpen(!examOpen)}
          className="flex items-center gap-1.5 text-xs font-mono text-primary hover:neon-text-glow transition-all"
        >
          {examOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          Exam Summary
        </button>
      )}
      {examOpen && d.exam_summary && (
        <div className="bg-primary/10 border border-primary/20 rounded-md px-3 py-2 text-xs text-primary font-mono animate-fade-in">
          {d.exam_summary}
        </div>
      )}

      {/* Save button */}
      <button
        onClick={() => {
          const bullets = [d.exam_summary || d.answer.slice(0, 100)];
          if (d.example) bullets.push(d.example);
          saveToExamPrep(d.answer.slice(0, 60) + "...", bullets);
          setSaved(true);
        }}
        disabled={saved}
        className={`flex items-center gap-1.5 text-xs font-mono transition-colors ${
          saved ? "text-muted-foreground" : "text-primary hover:neon-text-glow"
        }`}
      >
        {saved ? <BookOpen className="h-3 w-3" /> : <Save className="h-3 w-3" />}
        {saved ? "Saved" : "Save to Exam Prep"}
      </button>
    </div>
  );
}

const AskAnything = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addXP } = useXPContext();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = { id: Date.now(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const history = [...messages, userMsg].map((m) => ({
        role: m.role === "user" ? "user" : "model",
        text: m.role === "user" ? m.text : (m.aiData?.answer || m.text),
      }));
      const response = await chatWithGemini(history);
      addXP(5);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "ai", text: response.answer, aiData: response },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "ai", text: e instanceof Error ? e.message : "Something went wrong", aiData: { answer: "Error: " + (e instanceof Error ? e.message : "Unknown error"), example: "", exam_summary: "" } },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="p-6 md:px-12 md:pt-8 pb-2">
        <h1 className="text-2xl font-bold text-foreground mb-1">
          Ask CyberDesk Anything
        </h1>
        <p className="text-muted-foreground text-sm">
          Cybersecurity, hacking, programming, networking, MATLAB — anything.
        </p>
      </div>

      {/* Chat area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 md:px-12 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground/40 font-mono text-sm">Start a conversation...</p>
          </div>
        )}

        {messages.map((msg) =>
          msg.role === "user" ? (
            <div key={msg.id} className="flex justify-end">
              <div className="bg-primary/15 border border-primary/20 rounded-lg rounded-tr-none px-4 py-3 max-w-[80%]">
                <p className="text-foreground text-sm">{msg.text}</p>
              </div>
            </div>
          ) : (
            <div key={msg.id}>
              <AiMessage msg={msg} />
            </div>
          )
        )}

        {isLoading && (
          <div className="flex items-start">
            <div className="bg-secondary rounded-lg rounded-tl-none px-4 py-3">
              <div className="flex items-center gap-2 text-primary">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-xs font-mono">Thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="p-4 md:px-12 md:py-5 border-t border-border">
        <div className="flex gap-3 max-w-3xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question..."
            className="flex-1 bg-card border border-border rounded-lg py-3 px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-shadow font-mono text-sm"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-primary text-primary-foreground p-3 rounded-lg hover:neon-glow transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AskAnything;
