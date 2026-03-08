import { BookOpen } from "lucide-react";

const ExamPrep = () => {
  return (
    <div className="p-6 md:p-12">
      <h1 className="text-2xl font-bold text-foreground mb-8">
        Your Exam Notes
      </h1>

      <div className="flex flex-col items-center justify-center h-64 bg-card border border-border rounded-lg">
        <BookOpen className="h-10 w-10 text-muted-foreground/30 mb-4" />
        <p className="text-muted-foreground text-sm text-center max-w-xs">
          Complete a lab or ask a question to build your exam notes.
        </p>
      </div>
    </div>
  );
};

export default ExamPrep;
