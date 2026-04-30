import { Send, Loader2, Trash2, Save, BookOpen } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { HttpChatTransport, type UIMessage } from "ai";
import { useXPContext } from "@/components/XPContext";
import { safeScopedJsonParse, safeSetScopedJson, saveToExamPrep } from "@/lib/storage";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/contexts/AuthContext";

const CHAT_STORAGE_KEY = "ask_chat";
const MAX_STORED_MESSAGES = 50;

function getMessageText(msg: UIMessage): string {
  for (const part of msg.parts) {
    if (part.type === "text") return part.text;
  }
  return "";
}

function AiMessage({ content, userId }: { content: string; userId: string | null | undefined }) {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const title = content.slice(0, 60) + (content.length > 60 ? "..." : "");
    saveToExamPrep(userId, title, [content]);
    setSaved(true);
    toast("Saved to Exam Prep");
  };

  return (
    <div className="flex flex-col items-start gap-2 max-w-[80%]">
      <div className="bg-secondary rounded-lg rounded-tl-none px-4 py-3">
        <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
      <button
        onClick={handleSave}
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addXP } = useXPContext();
  const { user } = useAuth();
  const [input, setInput] = useState("");

  const CYBER_TUTOR_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/cyber-tutor`;

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new HttpChatTransport({
      url: CYBER_TUTOR_URL,
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      },
    }),
    onFinish: () => {
      addXP(5);
    },
  });

  const isLoading = status === "submitted" || status === "streaming";
  const hasError = status === "error";

  // Load persisted conversation on mount
  useEffect(() => {
    const stored = safeScopedJsonParse<UIMessage[]>(CHAT_STORAGE_KEY, user?.id, []);
    if (stored.length > 0) {
      setMessages(stored);
    }
  }, [user?.id, setMessages]);

  // Persist conversation whenever it changes
  useEffect(() => {
    if (messages.length > 0) {
      safeSetScopedJson(CHAT_STORAGE_KEY, user?.id, messages.slice(-MAX_STORED_MESSAGES));
    }
  }, [messages, user?.id]);

  // Auto-scroll on new messages
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  const submit = () => {
    const text = input.trim();
    if (!text || isLoading) return;
    sendMessage({ text });
    setInput("");
  };

  const clearHistory = () => {
    setMessages([]);
    safeSetScopedJson(CHAT_STORAGE_KEY, user?.id, []);
    toast("Conversation cleared");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="p-6 md:px-12 md:pt-8 pb-2 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Ask CyberDesk Anything</h1>
          <p className="text-muted-foreground text-sm">
            Cybersecurity, hacking, programming, networking, MATLAB — anything.
          </p>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-destructive transition-colors mt-1 shrink-0"
            aria-label="Clear conversation"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear
          </button>
        )}
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
                <p className="text-foreground text-sm">{getMessageText(msg)}</p>
              </div>
            </div>
          ) : (
            <div key={msg.id}>
              <AiMessage content={getMessageText(msg)} userId={user?.id} />
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

        {hasError && (
          <div className="flex items-start">
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg rounded-tl-none px-4 py-3">
              <p className="text-destructive text-xs font-mono">
                Connection error. Check your network and try again.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="p-4 md:px-12 md:py-5 border-t border-border">
        <form
          onSubmit={(e) => { e.preventDefault(); submit(); }}
          className="flex gap-3 max-w-3xl mx-auto"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question..."
            className="flex-1 bg-card border border-border rounded-lg py-3 px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-shadow font-mono text-sm"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-primary text-primary-foreground p-3 rounded-lg hover:neon-glow transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AskAnything;
