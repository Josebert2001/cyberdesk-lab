import { useState } from "react";
import { Trophy, Bookmark, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Opportunity {
  id: number;
  title: string;
  host: string;
  type: "Hackathon" | "Internship" | "Scholarship" | "Competition";
  deadline: string;
  prize: string;
  desc: string;
  url: string;
}

const opportunities: Opportunity[] = [
  { id: 1, title: "Octoverse Hackathon", host: "GitHub", type: "Hackathon", deadline: "Check site", prize: "Cash prizes + GitHub swag", desc: "Annual global hackathon for open source projects. Build tools that help developers.", url: "https://github.com" },
  { id: 2, title: "Google for Startups Accelerator Africa", host: "Google", type: "Competition", deadline: "Rolling", prize: "Up to $350,000 in cloud credits + mentorship", desc: "For early-stage African tech startups solving African problems. Equity-free support.", url: "https://startup.google.com/accelerator/africa/" },
  { id: 3, title: "ALX Software Engineering Programme", host: "ALX Africa", type: "Internship", deadline: "Rolling", prize: "Full scholarship — 12-month remote programme", desc: "Intensive software engineering training for African youth. Free for accepted students.", url: "https://www.alxafrica.com/" },
  { id: 4, title: "Zindi Africa Data Science Competitions", host: "Zindi", type: "Competition", deadline: "Multiple active", prize: "Cash prizes per competition", desc: "Africa's largest data science community. Multiple active competitions on AI and ML.", url: "https://zindi.africa" },
  { id: 5, title: "Meta Bug Bounty Program", host: "Meta", type: "Hackathon", deadline: "Ongoing", prize: "$500–$1,500,000 depending on severity", desc: "Report security vulnerabilities in Meta products. Open to all security researchers.", url: "https://bugbounty.meta.com/" },
  { id: 6, title: "Mastercard Foundation Scholars Program", host: "Mastercard Foundation", type: "Scholarship", deadline: "Check site", prize: "Full university scholarship", desc: "For academically talented yet economically disadvantaged African students.", url: "https://mastercardfdn.org/all/scholars/" },
  { id: 7, title: "HackerEarth University Hackathons", host: "HackerEarth", type: "Hackathon", deadline: "Multiple active", prize: "Cash + certificates", desc: "Regular online hackathons open to university students globally including Nigeria.", url: "https://www.hackerearth.com/challenges/" },
  { id: 8, title: "Nigeria Cybersecurity Innovation Challenge", host: "NITDA Nigeria", type: "Competition", deadline: "Check NITDA site", prize: "Recognition + funding support", desc: "National competition for Nigerian students building cybersecurity solutions.", url: "https://nitda.gov.ng" },
  { id: 9, title: "Microsoft Learn Student Ambassadors", host: "Microsoft", type: "Internship", deadline: "Rolling", prize: "Free Azure credits + Microsoft certifications + mentorship", desc: "Leadership programme for student tech enthusiasts. Build your campus tech community.", url: "https://studentambassadors.microsoft.com/" },
  { id: 10, title: "CTFtime — Capture the Flag Events", host: "CTFtime.org", type: "Competition", deadline: "Multiple active", prize: "Points + rankings + some cash prizes", desc: "Global directory of CTF competitions. Perfect for practising real hacking skills.", url: "https://ctftime.org" },
];

const typeStyles: Record<Opportunity["type"], string> = {
  Hackathon: "bg-primary/10 text-primary border-primary/30",
  Internship: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  Scholarship: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  Competition: "bg-purple-500/10 text-purple-400 border-purple-500/30",
};

const FILTERS = ["All", "Hackathons", "Internships", "Scholarships", "Competitions", "Bookmarked"] as const;
type Filter = (typeof FILTERS)[number];

function getBookmarks(): number[] {
  return JSON.parse(localStorage.getItem("cyb_bookmarked_opps") || "[]");
}

function saveBookmarks(ids: number[]) {
  localStorage.setItem("cyb_bookmarked_opps", JSON.stringify(ids));
}

export default function Opportunities() {
  const [filter, setFilter] = useState<Filter>("All");
  const [search, setSearch] = useState("");
  const [bookmarks, setBookmarks] = useState<number[]>(getBookmarks);

  function toggleBookmark(id: number) {
    setBookmarks((prev) => {
      const next = prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id];
      saveBookmarks(next);
      return next;
    });
  }

  const typeMap: Record<string, Opportunity["type"]> = {
    Hackathons: "Hackathon",
    Internships: "Internship",
    Scholarships: "Scholarship",
    Competitions: "Competition",
  };

  const filtered = opportunities.filter((o) => {
    if (filter === "Bookmarked") return bookmarks.includes(o.id);
    if (filter !== "All" && typeMap[filter]) return o.type === typeMap[filter];
    return true;
  }).filter((o) =>
    search === "" ||
    o.title.toLowerCase().includes(search.toLowerCase()) ||
    o.host.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="h-8 w-8 text-primary neon-text-glow" />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground font-mono">
            Hackathon & Opportunity Board
          </h1>
        </div>
        <p className="text-muted-foreground">
          Curated for Nigerian Cybersecurity &amp; Tech students — updated by the Director of Software &amp; Hardware
        </p>
      </div>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search opportunities..."
        className="w-full bg-card border border-border rounded-lg py-3 px-4 text-foreground placeholder:text-muted-foreground font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 mb-4"
      />

      {/* Filter tabs */}
      <div className="flex gap-1 border-b border-border mb-8 overflow-x-auto">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-3 text-sm font-mono whitespace-nowrap transition-colors duration-200 border-b-2 -mb-px ${
              filter === f
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
            {f === "Bookmarked" && bookmarks.length > 0 && (
              <span className="ml-1.5 text-xs bg-primary/20 text-primary rounded-full px-1.5">{bookmarks.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground font-mono">
          No opportunities found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((opp) => (
            <div
              key={opp.id}
              className="bg-card border border-border rounded-lg p-5 hover:border-primary/40 transition-colors flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-foreground font-bold text-base leading-snug">{opp.title}</h3>
                  <p className="text-muted-foreground text-xs font-mono mt-0.5">{opp.host}</p>
                </div>
                <button
                  onClick={() => toggleBookmark(opp.id)}
                  className={`shrink-0 p-1.5 rounded-md transition-colors ${bookmarks.includes(opp.id) ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <Bookmark className={`h-4 w-4 ${bookmarks.includes(opp.id) ? "fill-primary" : ""}`} />
                </button>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-mono border rounded px-2 py-0.5 ${typeStyles[opp.type]}`}>
                  {opp.type}
                </span>
                <span className="text-xs font-mono text-muted-foreground border border-border rounded px-2 py-0.5">
                  📅 {opp.deadline}
                </span>
              </div>

              <p className="text-muted-foreground text-sm italic">{opp.prize}</p>
              <p className="text-foreground/80 text-sm leading-relaxed">{opp.desc}</p>

              <div className="mt-auto pt-2">
                <Button
                  variant="neon"
                  size="sm"
                  className="font-mono w-full flex items-center gap-2"
                  asChild
                >
                  <a href={opp.url} target="_blank" rel="noopener noreferrer">
                    View &amp; Apply <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
