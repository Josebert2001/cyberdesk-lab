import { BookOpen, Trash2, FlaskConical, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { safeJsonParse } from "@/lib/storage";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

interface ExamNote {
  id: number;
  topic: string;
  bullets: string[];
  date: string;
}

const ExamPrep = () => {
  const [notes, setNotes] = useState<ExamNote[]>([]);

  useEffect(() => {
    setNotes(safeJsonParse<ExamNote[]>("cyberdesk_exam_notes", []));
  }, []);

  const handleDelete = (id: number) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    localStorage.setItem("cyberdesk_exam_notes", JSON.stringify(updated));
    toast("Note deleted");
  };

  return (
    <div className="p-6 md:p-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-mono">
            Your Exam Notes
          </h1>
          {notes.length > 0 && (
            <p className="text-sm text-muted-foreground mt-1">
              {notes.length} {notes.length === 1 ? "note" : "notes"} saved
            </p>
          )}
        </div>
      </div>

      {notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-card border border-border rounded-lg">
          <div className="w-16 h-16 rounded-full bg-primary/5 border border-primary/20 flex items-center justify-center mb-6">
            <BookOpen className="h-8 w-8 text-primary/40" />
          </div>
          <h2 className="text-foreground font-semibold text-lg mb-2 font-mono">No notes yet</h2>
          <p className="text-muted-foreground text-sm text-center max-w-sm mb-6">
            Complete labs or ask the AI tutor questions to automatically build your exam revision notes.
          </p>
          <div className="flex gap-3">
            <Link
              to="/playground"
              className="flex items-center gap-2 px-4 py-2.5 bg-primary/10 border border-primary/30 rounded-lg text-primary text-sm font-mono hover:bg-primary/20 transition-colors"
            >
              <FlaskConical className="h-4 w-4" />
              Try a Lab
            </Link>
            <Link
              to="/ask"
              className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-lg text-muted-foreground text-sm font-mono hover:text-foreground hover:bg-secondary transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              Ask Anything
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <div key={note.id} className="bg-card border border-border rounded-lg p-5 animate-fade-in hover:border-primary/20 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-foreground font-semibold font-mono">{note.topic}</h3>
                  <p className="text-xs text-muted-foreground">{note.date}</p>
                </div>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors p-1"
                  aria-label="Delete note"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-2">
                {note.bullets.map((bullet, i) => (
                  <div
                    key={i}
                    className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-2.5 text-sm text-primary font-mono"
                  >
                    {bullet}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExamPrep;
