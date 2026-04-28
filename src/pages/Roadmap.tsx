import { useState } from "react";
import { Map, Check, ExternalLink } from "lucide-react";
import { getScopedStorageKey, safeGetScopedBoolean, safeSetScopedBoolean } from "@/lib/storage";
import { useAuth } from "@/contexts/AuthContext";

const categoryStyles: Record<string, string> = {
  Foundation: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  Technical: "bg-primary/10 text-primary border-primary/30",
  Tools: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  Certification: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  Career: "bg-pink-500/10 text-pink-400 border-pink-500/30",
};

interface Milestone {
  title: string;
  category: string;
  desc: string;
  link?: { label: string; url: string };
}

interface Level {
  id: string;
  label: string;
  title: string;
  description: string;
  milestones: Milestone[];
}

const levels: Level[] = [
  {
    id: "100L",
    label: "100L",
    title: "Build Your Foundation",
    description: "Start strong — build the conceptual and technical base every cybersecurity professional needs.",
    milestones: [
      { title: "Understand the CIA Triad", category: "Foundation", desc: "Learn what Confidentiality, Integrity and Availability mean — the core pillars of cybersecurity." },
      { title: "Learn Basic Networking", category: "Foundation", desc: "Understand IP addresses, DNS, HTTP, ports and how data travels across the internet." },
      { title: "Master Linux Command Line Basics", category: "Technical", desc: "Get comfortable with the terminal — most security tools run on Linux." },
      { title: "Learn Python Basics", category: "Technical", desc: "Python is the most used language in cybersecurity scripting and automation.", link: { label: "python.org", url: "https://python.org" } },
      { title: "Understand How the Web Works", category: "Foundation", desc: "Learn HTTP/HTTPS, how browsers communicate with servers, cookies and sessions." },
      { title: "Complete PHY 111 & Intro Courses", category: "Foundation", desc: "Build your academic foundation — physics and maths underpin cryptography and algorithms." },
      { title: "Create a GitHub Account", category: "Tools", desc: "Version control is essential. Start pushing your practice code and projects.", link: { label: "github.com", url: "https://github.com" } },
      { title: "Try Your First CTF", category: "Technical", desc: "Attempt beginner CTF challenges on PicoCTF or CTFtime to apply what you've learned.", link: { label: "picoctf.org", url: "https://picoctf.org" } },
    ],
  },
  {
    id: "200L",
    label: "200L",
    title: "Go Technical",
    description: "Deepen your hands-on skills — tools, attacks, forensics, and your first real security projects.",
    milestones: [
      { title: "Master CYB 212 — Introduction to Cybersecurity", category: "Foundation", desc: "Understand attack types, defence strategies, cryptography basics and the CIA model deeply." },
      { title: "Learn SQL & SQL Injection", category: "Technical", desc: "Understand relational databases and how SQL injection attacks exploit them." },
      { title: "Study CYB 213 — Cybercrime & Digital Forensics", category: "Technical", desc: "Learn Nigerian cybercrime laws, digital evidence handling and forensic investigation." },
      { title: "Set Up Kali Linux", category: "Tools", desc: "Install Kali Linux as a VM or dual boot. This is your primary ethical hacking OS.", link: { label: "kali.org", url: "https://kali.org" } },
      { title: "Learn Nmap & Wireshark", category: "Tools", desc: "Network scanning and packet analysis are core skills for any security professional." },
      { title: "Attempt Intermediate CTFs", category: "Technical", desc: "Move up to intermediate CTF challenges. Try HackTheBox starting point machines.", link: { label: "hackthebox.com", url: "https://hackthebox.com" } },
      { title: "Build a Portfolio Project", category: "Career", desc: "Build and document one small security tool or research project on GitHub." },
      { title: "Explore Bug Bounty Basics", category: "Career", desc: "Learn the basics of responsible disclosure and set up accounts on HackerOne or Bugcrowd." },
    ],
  },
  {
    id: "300L",
    label: "300L",
    title: "Specialise & Build",
    description: "Pick your path, go deep, and start building a reputation in the security community.",
    milestones: [
      { title: "Choose a Specialisation", category: "Career", desc: "Pick your focus: Penetration Testing, Digital Forensics, Cloud Security, or AppSec." },
      { title: "Learn Web Application Hacking", category: "Technical", desc: "Study OWASP Top 10. Practice on DVWA and WebGoat. Master Burp Suite." },
      { title: "Study Cryptography in Depth", category: "Technical", desc: "Go beyond basics — understand RSA, elliptic curves, TLS handshakes and PKI." },
      { title: "Pursue a Certification", category: "Certification", desc: "Target CompTIA Security+ or CEH as your first professional certification.", link: { label: "comptia.org", url: "https://comptia.org" } },
      { title: "Complete a Real-World Project", category: "Career", desc: "Build a security tool, conduct a simulated pentest or document a forensic investigation." },
      { title: "Contribute to Open Source", category: "Career", desc: "Find a security-related open source project on GitHub and make a contribution." },
      { title: "Participate in a Hackathon", category: "Career", desc: "Enter at least one hackathon or competition — Octoverse, Zindi or CTFtime events." },
      { title: "Start Networking", category: "Career", desc: "Join LinkedIn, follow security researchers, attend virtual cybersecurity conferences." },
    ],
  },
  {
    id: "400L",
    label: "400L",
    title: "Launch Your Career",
    description: "Graduate ready — certifications, portfolio, and your first professional role in cybersecurity.",
    milestones: [
      { title: "Complete Final Year Project", category: "Foundation", desc: "Choose a cybersecurity research topic that solves a real Nigerian or African problem." },
      { title: "Get Certified", category: "Certification", desc: "Sit for CompTIA Security+, CEH or OSCP depending on your specialisation." },
      { title: "Build a Strong GitHub Portfolio", category: "Career", desc: "Have at least 3 documented security projects publicly visible on GitHub." },
      { title: "Prepare Your CV & LinkedIn", category: "Career", desc: "Tailor your CV for cybersecurity roles. Get your LinkedIn to All-Star status." },
      { title: "Apply for Internships & Graduate Roles", category: "Career", desc: "Apply to EFCC, NCC, financial institutions, tech companies and cybersecurity firms in Nigeria." },
      { title: "Practise Interview Questions", category: "Career", desc: "Study common cybersecurity interview questions — technical and behavioural." },
      { title: "Explore Freelancing", category: "Career", desc: "Register on Upwork or Fiverr. Offer security audits, vulnerability assessments or training." },
      { title: "Consider Postgraduate Study", category: "Career", desc: "Explore MSc Cybersecurity programmes locally (UniUyo) or internationally for research careers." },
    ],
  },
];

function storageKey(userId: string | null | undefined, levelId: string, idx: number) {
  return getScopedStorageKey(`roadmap_${levelId}_${idx}`, userId);
}

export default function Roadmap() {
  const { user } = useAuth();
  const [activeLevel, setActiveLevel] = useState("100L");
  const level = levels.find((l) => l.id === activeLevel)!;

  const [done, setDone] = useState<boolean[]>(() =>
    level.milestones.map((_, i) => safeGetScopedBoolean(`roadmap_${activeLevel}_${i}`, user?.id))
  );

  function switchLevel(id: string) {
    setActiveLevel(id);
    const lv = levels.find((l) => l.id === id)!;
    setDone(lv.milestones.map((_, i) => safeGetScopedBoolean(`roadmap_${id}_${i}`, user?.id)));
  }

  function toggleDone(idx: number) {
    setDone((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      safeSetScopedBoolean(`roadmap_${activeLevel}_${idx}`, user?.id, next[idx]);
      return next;
    });
  }

  const completed = done.filter(Boolean).length;
  const total = level.milestones.length;
  const progress = Math.round((completed / total) * 100);

  return (
    <div className="p-6 md:p-12 max-w-3xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Map className="h-8 w-8 text-primary neon-text-glow" />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground font-mono">
            Your Cybersecurity Learning Roadmap
          </h1>
        </div>
        <p className="text-muted-foreground">
          Know exactly what to learn at every level — from 100L to graduation
        </p>
      </div>

      {/* Level Selector */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        {levels.map((lv) => (
          <button
            key={lv.id}
            onClick={() => switchLevel(lv.id)}
            className={`py-3 rounded-lg border font-mono font-bold text-sm transition-all duration-200 ${
              activeLevel === lv.id
                ? "border-primary bg-primary/10 text-primary neon-text-glow"
                : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {lv.label}
          </button>
        ))}
      </div>

      {/* Level Info + Progress */}
      <div className="bg-card border border-border rounded-lg p-5 mb-8">
        <h2 className="text-foreground font-bold text-xl font-mono mb-1">{level.title}</h2>
        <p className="text-muted-foreground text-sm mb-4">{level.description}</p>
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-2">
          <span>{completed}/{total} milestones completed</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 bg-background rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

        <div className="space-y-4">
          {level.milestones.map((m, i) => (
            <div key={i} className="relative pl-12 animate-fade-in">
              {/* Timeline dot */}
              <div className={`absolute left-2 top-5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                done[i] ? "bg-primary border-primary" : "bg-card border-border"
              }`}>
                {done[i] && <Check className="h-3 w-3 text-background" />}
              </div>

              <div className={`bg-card border rounded-lg p-5 transition-all duration-200 ${
                done[i] ? "border-primary/40 bg-primary/5" : "border-border hover:border-primary/30"
              }`}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className={`font-semibold text-sm ${done[i] ? "text-muted-foreground line-through" : "text-foreground"}`}>
                        {m.title}
                      </h3>
                      <span className={`text-xs font-mono border rounded px-2 py-0.5 ${categoryStyles[m.category]}`}>
                        {m.category}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
                    {m.link && (
                      <a
                        href={m.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary text-xs font-mono mt-2 hover:underline"
                      >
                        Learn → {m.link.label} <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => toggleDone(i)}
                    className={`shrink-0 mt-0.5 px-3 py-1.5 rounded-md text-xs font-mono border transition-all duration-200 ${
                      done[i]
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    {done[i] ? "✓ Done" : "Mark as Done"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
