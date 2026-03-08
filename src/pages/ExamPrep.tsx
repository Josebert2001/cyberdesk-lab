import { BookOpen, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

interface ExamNote {
  id: number;
  topic: string;
  bullets: string[];
  date: string;
}

const ExamPrep = () => {
  const [notes, setNotes] = useState<ExamNote[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cyberdesk_exam_notes") || "[]");
    setNotes(stored);
  }, []);

  const handleDelete = (id: number) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    localStorage.setItem("cyberdesk_exam_notes", JSON.stringify(updated));
  };

  return (
    <div className="p-6 md:p-12">
      <h1 className="text-2xl font-bold text-foreground mb-8">
        Your Exam Notes
      </h1>

      {notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-card border border-border rounded-lg">
          <BookOpen className="h-10 w-10 text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground text-sm text-center max-w-xs">
            Complete a lab or ask a question to build your exam notes.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <div key={note.id} className="bg-card border border-border rounded-lg p-5 animate-fade-in">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-foreground font-semibold font-mono">{note.topic}</h3>
                  <p className="text-xs text-muted-foreground">{note.date}</p>
                </div>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors p-1"
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
