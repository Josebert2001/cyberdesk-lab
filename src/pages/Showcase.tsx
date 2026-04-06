/*
-- CREATE TABLE showcase_projects (
--   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
--   title text,
--   author text,
--   level text,
--   category text,
--   description text,
--   project_url text,
--   github_url text,
--   tags text,
--   created_at timestamptz DEFAULT now()
-- );
*/

import { useState } from "react";
import { Layers, ThumbsUp, ExternalLink, Github, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type Category = "Security Tools" | "Web Apps" | "Research" | "Forensics" | "AI & ML";

interface Project {
  id: string;
  title: string;
  author: string;
  level: string;
  year: number;
  category: Category;
  desc: string;
  tags: string[];
  projectUrl: string;
  githubUrl: string;
}

const SEEDED: Project[] = [
  {
    id: "guard9ja",
    title: "Guard9ja — AI-Powered Digital Security Platform",
    author: "Josebert Sunday Robert",
    level: "300L",
    year: 2026,
    category: "Security Tools",
    desc: "Nigeria's first AI-powered digital security awareness platform. Provides real-time threat alerts, cybersecurity education and incident reporting for Nigerian internet users.",
    tags: ["AI", "Nigeria", "Security Awareness", "Gemini"],
    projectUrl: "https://jrsolvy.com",
    githubUrl: "https://github.com/Josebert2001",
  },
  {
    id: "cyberdesk",
    title: "CyberDesk — University Cybersecurity Lab",
    author: "Josebert Sunday Robert",
    level: "300L",
    year: 2026,
    category: "Security Tools",
    desc: "An interactive cybersecurity learning platform for UniUyo students featuring hands-on labs, AI tutoring, CBT practice and a resource library. Built with React, TypeScript and Gemini AI.",
    tags: ["React", "TypeScript", "Gemini", "Education"],
    projectUrl: "#",
    githubUrl: "https://github.com/Josebert2001",
  },
  {
    id: "careersage",
    title: "CareerSage — AI Career Assistant",
    author: "Josebert Sunday Robert",
    level: "300L",
    year: 2025,
    category: "AI & ML",
    desc: "An AI-powered career guidance tool helping Nigerian graduates navigate job opportunities, build CVs and prepare for interviews in the tech industry.",
    tags: ["AI", "Career", "Nigeria", "React"],
    projectUrl: "#",
    githubUrl: "https://github.com/Josebert2001",
  },
  {
    id: "dept-ai-model",
    title: "Dept. Fine-Tuned AI Model",
    author: "Josebert Sunday Robert",
    level: "300L",
    year: 2026,
    category: "AI & ML",
    desc: "A fine-tuned language model trained on cybersecurity department data. Answers course-specific and general cybersecurity questions without censorship restrictions for academic use.",
    tags: ["LLM", "Fine-tuning", "Cybersecurity", "Groq"],
    projectUrl: "#",
    githubUrl: "https://github.com/Josebert2001",
  },
  {
    id: "temp-control",
    title: "Smart Temperature Control System",
    author: "Group B — CYB 214",
    level: "200L",
    year: 2026,
    category: "Research",
    desc: "An Arduino-based embedded system using DHT11 sensor, relay module and LCD display to automatically regulate temperature in a controlled environment.",
    tags: ["Arduino", "IoT", "Embedded Systems", "DHT11"],
    projectUrl: "#",
    githubUrl: "#",
  },
  {
    id: "motion-alarm",
    title: "Smart Wi-Fi Motion Detection Alarm",
    author: "Group D — CYB 214",
    level: "200L",
    year: 2026,
    category: "Security Tools",
    desc: "A NodeMCU ESP8266-based motion detection alarm system with a web dashboard for remote monitoring. Sends real-time alerts when motion is detected.",
    tags: ["NodeMCU", "IoT", "ESP8266", "Web Dashboard"],
    projectUrl: "#",
    githubUrl: "#",
  },
];

const CATEGORY_COLORS: Record<Category | string, string> = {
  "Security Tools": "bg-primary/10 text-primary border-primary/30",
  "Web Apps": "bg-blue-500/10 text-blue-400 border-blue-500/30",
  "Research": "bg-amber-500/10 text-amber-400 border-amber-500/30",
  "Forensics": "bg-purple-500/10 text-purple-400 border-purple-500/30",
  "AI & ML": "bg-pink-500/10 text-pink-400 border-pink-500/30",
};

const FILTERS = ["All", "Security Tools", "Web Apps", "Research", "Forensics", "AI & ML"] as const;
type Filter = (typeof FILTERS)[number];

const LEVELS = ["100L", "200L", "300L", "400L"];
const CATEGORIES: Category[] = ["Security Tools", "Web Apps", "Research", "Forensics", "AI & ML"];

function getLikes(id: string): number {
  return parseInt(localStorage.getItem(`cyb_likes_${id}`) || "0", 10);
}
function setLikes(id: string, n: number) {
  localStorage.setItem(`cyb_likes_${id}`, String(n));
}
function hasLiked(id: string): boolean {
  return localStorage.getItem(`cyb_liked_${id}`) === "true";
}
function markLiked(id: string) {
  localStorage.setItem(`cyb_liked_${id}`, "true");
}

function getSubmitted(): Project[] {
  return JSON.parse(localStorage.getItem("cyb_showcase_submitted") || "[]");
}
function saveSubmitted(projects: Project[]) {
  localStorage.setItem("cyb_showcase_submitted", JSON.stringify(projects));
}

export default function Showcase() {
  const { toast } = useToast();
  const [filter, setFilter] = useState<Filter>("All");
  const [search, setSearch] = useState("");
  const [submitted, setSubmitted] = useState<Project[]>(getSubmitted);
  const [likes, setLikesState] = useState<Record<string, number>>(() =>
    Object.fromEntries([...SEEDED, ...getSubmitted()].map((p) => [p.id, getLikes(p.id)]))
  );
  const [liked, setLikedState] = useState<Record<string, boolean>>(() =>
    Object.fromEntries([...SEEDED, ...getSubmitted()].map((p) => [p.id, hasLiked(p.id)]))
  );

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "", author: "", level: "100L", category: "Security Tools" as Category,
    desc: "", projectUrl: "", githubUrl: "", tags: "",
  });

  const allProjects = [...SEEDED, ...submitted];

  const filtered = allProjects.filter((p) => {
    if (filter !== "All" && p.category !== filter) return false;
    const q = search.toLowerCase();
    if (q && !p.title.toLowerCase().includes(q) && !p.author.toLowerCase().includes(q) && !p.tags.join(" ").toLowerCase().includes(q)) return false;
    return true;
  });

  function handleLike(id: string) {
    if (liked[id]) return;
    const next = (likes[id] || 0) + 1;
    setLikes(id, next);
    markLiked(id);
    setLikesState((prev) => ({ ...prev, [id]: next }));
    setLikedState((prev) => ({ ...prev, [id]: true }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim()) return;
    const newProject: Project = {
      id: `user_${Date.now()}`,
      title: form.title,
      author: form.author,
      level: form.level,
      year: new Date().getFullYear(),
      category: form.category,
      desc: form.desc,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      projectUrl: form.projectUrl || "#",
      githubUrl: form.githubUrl || "#",
    };
    const next = [...submitted, newProject];
    setSubmitted(next);
    saveSubmitted(next);
    setLikesState((prev) => ({ ...prev, [newProject.id]: 0 }));
    setLikedState((prev) => ({ ...prev, [newProject.id]: false }));
    setForm({ title: "", author: "", level: "100L", category: "Security Tools", desc: "", projectUrl: "", githubUrl: "", tags: "" });
    setShowForm(false);
    toast({ title: "Project submitted!", description: "Your project has been added to the showcase." });
  }

  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Layers className="h-8 w-8 text-primary neon-text-glow" />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground font-mono">
            Student Project Showcase
          </h1>
        </div>
        <p className="text-muted-foreground">
          Real projects built by Cybersecurity students at UniUyo
        </p>
      </div>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by title, author or tags..."
        className="w-full bg-card border border-border rounded-lg py-3 px-4 text-foreground placeholder:text-muted-foreground font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 mb-4"
      />

      {/* Filter tabs */}
      <div className="flex gap-1 border-b border-border mb-8 overflow-x-auto">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-3 text-sm font-mono whitespace-nowrap transition-colors duration-200 border-b-2 -mb-px ${
              filter === f ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {filtered.map((p, i) => (
          <div
            key={p.id}
            className="bg-card border border-border rounded-lg p-5 flex flex-col gap-3 hover:border-primary/40 transition-colors animate-fade-in"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {/* Title + year */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-foreground font-bold font-mono text-sm leading-snug flex-1">{p.title}</h3>
              <span className="text-xs font-mono text-muted-foreground shrink-0">{p.year}</span>
            </div>

            {/* Author + badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-muted-foreground font-mono">{p.author}</span>
              <span className="text-xs font-mono bg-card border border-border rounded px-2 py-0.5">{p.level}</span>
              <span className={`text-xs font-mono border rounded px-2 py-0.5 ${CATEGORY_COLORS[p.category]}`}>
                {p.category}
              </span>
            </div>

            {/* Description */}
            <p className="text-foreground/70 text-sm leading-relaxed">{p.desc}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((tag) => (
                <span key={tag} className="text-xs font-mono bg-background border border-border rounded px-2 py-0.5 text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-auto pt-2 flex-wrap">
              {p.projectUrl !== "#" ? (
                <Button variant="neon" size="sm" className="font-mono text-xs flex-1" asChild>
                  <a href={p.projectUrl} target="_blank" rel="noopener noreferrer">
                    View Project <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </Button>
              ) : (
                <Button variant="neon" size="sm" className="font-mono text-xs flex-1" disabled>
                  View Project
                </Button>
              )}
              {p.githubUrl !== "#" && (
                <Button variant="outline" size="sm" className="font-mono text-xs" asChild>
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-3.5 w-3.5" />
                  </a>
                </Button>
              )}
              <button
                onClick={() => handleLike(p.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-mono transition-all duration-200 ${
                  liked[p.id]
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
              >
                <ThumbsUp className="h-3.5 w-3.5" />
                {likes[p.id] || 0}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Submit section */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full flex items-center justify-between px-5 py-4 text-foreground font-mono text-sm font-bold hover:bg-secondary transition-colors"
        >
          <span>+ Submit Your Project</span>
          {showForm ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} className="px-5 pb-5 space-y-4 border-t border-border pt-5 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-muted-foreground">Project Title *</label>
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-background border border-border rounded-lg py-2 px-3 text-foreground text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-muted-foreground">Your Name *</label>
                <input required value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className="w-full bg-background border border-border rounded-lg py-2 px-3 text-foreground text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-muted-foreground">Level</label>
                <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}
                  className="w-full bg-background border border-border rounded-lg py-2 px-3 text-foreground text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary/50">
                  {LEVELS.map((l) => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-muted-foreground">Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
                  className="w-full bg-background border border-border rounded-lg py-2 px-3 text-foreground text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary/50">
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-muted-foreground">Description</label>
              <textarea rows={3} value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })}
                className="w-full bg-background border border-border rounded-lg py-2 px-3 text-foreground text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-muted-foreground">Project URL (optional)</label>
                <input value={form.projectUrl} onChange={(e) => setForm({ ...form, projectUrl: e.target.value })}
                  placeholder="https://"
                  className="w-full bg-background border border-border rounded-lg py-2 px-3 text-foreground text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-muted-foreground">GitHub URL (optional)</label>
                <input value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                  placeholder="https://github.com/"
                  className="w-full bg-background border border-border rounded-lg py-2 px-3 text-foreground text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary/50" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-muted-foreground">Tags (comma separated)</label>
              <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
                placeholder="React, AI, Security..."
                className="w-full bg-background border border-border rounded-lg py-2 px-3 text-foreground text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary/50" />
            </div>
            <Button type="submit" variant="neon" className="font-mono w-full">
              Submit Project
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
