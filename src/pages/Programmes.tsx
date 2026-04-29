import { BookOpen, Users, GraduationCap } from "lucide-react";

const programmes = [
  {
    icon: GraduationCap,
    degree: "B.Sc. Cybersecurity",
    entry: "UTME Entry",
    duration: "4 Years",
    description: "Four-year undergraduate degree programme. Full immersion in cybersecurity theory, practice, and professional ethics.",
    highlights: [
      "Comprehensive curriculum covering all 6 core objectives",
      "Hands-on labs and practical security testing",
      "Industry-aligned projects and case studies",
      "Internship and placement opportunities",
      "Professional certification pathways",
    ],
  },
  {
    icon: Users,
    degree: "B.Sc. Cybersecurity",
    entry: "Direct Entry (200L)",
    duration: "3 Years",
    description: "Three-year route for candidates entering at 200 Level with prior tertiary qualifications in a relevant science field.",
    highlights: [
      "Accelerated pathway for qualified candidates",
      "Advanced technical modules",
      "Flexible scheduling for working professionals",
      "Prior learning recognition",
      "Shortened time-to-degree",
    ],
  },
  {
    icon: BookOpen,
    degree: "Postgraduate Research",
    entry: "Coming Soon",
    duration: "Varies",
    description: "Postgraduate research pathways in emerging areas of cybersecurity, digital forensics, and AI security.",
    highlights: [
      "MPhil and PhD research programmes",
      "Emerging research areas: AI/ML Security, IoT, Blockchain",
      "Interdisciplinary collaboration",
      "Publication and impact focus",
      "International research partnerships",
    ],
  },
];

const requirements = {
  utme: {
    title: "UTME Requirements",
    items: [
      "Five SSC credits including English Language, Mathematics, Physics and any other relevant Science subjects in not more than two sittings",
      "Valid JAMB UTME Score",
    ],
  },
  directEntry: {
    title: "Direct Entry Requirements",
    items: [
      "Minimum of a credit at University/ND/NCE level",
      "Five SSC credit passes in relevant Science subjects",
      "Subjects must include English Language, Mathematics, and Physics",
    ],
  },
};

export default function Programmes() {
  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto space-y-12 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Graduation className="h-8 w-8 text-primary neon-text-glow" />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground font-mono">
            Academic Programmes
          </h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Degrees & Entry Routes
        </p>
      </div>

      {/* Programme Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {programmes.map((prog, i) => {
          const Icon = prog.icon;
          return (
            <div
              key={i}
              className="bg-card border border-border rounded-lg p-6 space-y-4 hover:border-primary/40 transition-colors animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start gap-3">
                <Icon className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-foreground font-bold text-lg">{prog.degree}</h3>
                  <p className="text-xs font-mono text-primary uppercase tracking-widest mt-1">
                    {prog.entry}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Duration</p>
                <p className="text-foreground font-bold">{prog.duration}</p>
              </div>

              <p className="text-foreground/80 text-sm leading-relaxed border-l-2 border-primary/30 pl-3">
                {prog.description}
              </p>

              <div className="space-y-2">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Key Features</p>
                <ul className="space-y-1">
                  {prog.highlights.map((h, j) => (
                    <li key={j} className="text-xs text-foreground/70 flex gap-2">
                      <span className="text-primary shrink-0">▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Requirements */}
      <div className="space-y-6">
        <h2 className="text-foreground font-bold text-2xl font-mono border-b border-border pb-4">
          Admission Requirements
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* UTME */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <h3 className="text-foreground font-bold text-lg">{requirements.utme.title}</h3>
            <ul className="space-y-3">
              {requirements.utme.items.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-foreground/80">
                  <span className="text-primary font-mono font-bold shrink-0">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Entry */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <h3 className="text-foreground font-bold text-lg">{requirements.directEntry.title}</h3>
            <ul className="space-y-3">
              {requirements.directEntry.items.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-foreground/80">
                  <span className="text-primary font-mono font-bold shrink-0">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Application CTA */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center space-y-4">
        <h3 className="text-foreground font-bold text-xl">Ready to Join?</h3>
        <p className="text-foreground/80 max-w-2xl mx-auto">
          Apply through JAMB (UTME) or via Direct Entry. For postgraduate programmes, contact the Department of Cybersecurity directly.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a
            href="https://jamb.gov.ng"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-mono text-sm hover:bg-primary/90 transition-colors"
          >
            JAMB Portal
          </a>
          <a
            href="https://uniuyo.edu.ng"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 border border-primary text-primary rounded-lg font-mono text-sm hover:bg-primary/5 transition-colors"
          >
            University Website
          </a>
        </div>
      </div>
    </div>
  );
}
