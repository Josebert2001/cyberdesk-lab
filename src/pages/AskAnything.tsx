import { Send } from "lucide-react";

const AskAnything = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="p-6 md:p-12 pb-4">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Ask CyberDesk Anything
        </h1>
        <p className="text-muted-foreground text-sm">
          Cybersecurity, hacking, programming, networking, MATLAB — anything.
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground/50 font-mono text-sm">
          Start a conversation...
        </p>
      </div>

      <div className="p-4 md:p-6 border-t border-border">
        <div className="flex gap-3 max-w-3xl mx-auto">
          <input
            type="text"
            placeholder="Type your question..."
            className="flex-1 bg-card border border-border rounded-lg py-3 px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-shadow"
          />
          <button className="bg-primary text-primary-foreground p-3 rounded-lg hover:neon-glow transition-shadow duration-300">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AskAnything;
