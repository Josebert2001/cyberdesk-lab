import { BookOpen, Users, GraduationCap, AlertCircle, CheckCircle } from "lucide-react";

const programmes = [
  {
    icon: GraduationCap,
    degree: "B.Sc. Cybersecurity",
    entry: "UTME Entry",
    duration: "4 Years (min) · 6 Sessions + 1 Sem (max)",
    description: "Four-year undergraduate degree programme. Full immersion in cybersecurity theory, practice, and professional ethics.",
    highlights: [
      "Comprehensive curriculum covering all 6 core objectives",
      "Hands-on labs: forensics, penetration testing, CTF",
      "Big data analytics, AI cyber defence, threat hunting",
      "Deep & dark web security modules",
      "SIWES industrial attachment included",
    ],
    requirements: [
      "Five SSC credits: English, Mathematics, Physics + 2 relevant Science subjects",
      "Must be obtained in not more than two sittings",
      "Valid JAMB UTME score (competitive cut-off applies)",
    ],
  },
  {
    icon: Users,
    degree: "B.Sc. Cybersecurity",
    entry: "Direct Entry (200L)",
    duration: "3 Years (min) · 5 Sessions + 1 Sem (max)",
    description: "Three-year route for candidates entering at 200 Level with prior tertiary qualifications in a relevant science field.",
    highlights: [
      "Accelerated pathway from 200 Level",
      "All GST first-year courses may be required",
      "Prior learning recognised",
      "Full access to department labs and activities",
      "Same graduation requirements as UTME track",
    ],
    requirements: [
      "Minimum credit at University/National Diploma/NCE level",
      "Five SSC credit passes in relevant Science subjects",
      "Must include English Language, Mathematics, and Physics",
    ],
  },
  {
    icon: BookOpen,
    degree: "Postgraduate Research",
    entry: "Coming Soon",
    duration: "MPhil / PhD / PGD — Varies",
    description: "Postgraduate research pathways in emerging areas of cybersecurity, digital forensics, and AI security — to be announced.",
    highlights: [
      "Postgraduate Diploma (PGD) — planned",
      "M.Sc. Cybersecurity — planned",
      "PhD Cybersecurity — planned",
      "Research areas: AI Security, IoT, Digital Forensics, Crypto",
      "Contact department directly for updates",
    ],
    requirements: [
      "Details to be announced by the department",
      "Prospective applicants may contact HOD for roadmap",
    ],
  },
];

const degreeClasses = [
  { cls: "First Class Honours", cgpa: "4.50 – 5.00" },
  { cls: "Second Class (Upper Division)", cgpa: "3.50 – 4.49" },
  { cls: "Second Class (Lower Division)", cgpa: "2.50 – 3.49" },
  { cls: "Third Class", cgpa: "1.50 – 2.49" },
  { cls: "Pass", cgpa: "1.00 – 1.49" },
  { cls: "Fail", cgpa: "Below 1.00" },
];

const policies = [
  {
    icon: CheckCircle,
    title: "Graduation Requirements",
    items: [
      "Pass ALL core, faculty-required, and elective courses",
      "Minimum 120 credit units (UTME) or 90 credit units (Direct Entry)",
      "Minimum CGPA of 1.00",
      "Found worthy in character throughout studentship",
      "Must complete SIWES, Seminar, and Final Year Project",
    ],
  },
  {
    icon: AlertCircle,
    title: "Academic Standing — Probation & Withdrawal",
    items: [
      "Good standing: CGPA ≥ 1.00 at end of each session",
      "Probation: CGPA < 1.00 at end of any session — max 15 credit hours next semester",
      "Withdrawal: Two consecutive sessions on probation",
      "Pass mark per course: 40% (CA 30% + Exam 70%)",
      "Failed courses MUST be repeated at the next available opportunity",
    ],
  },
  {
    icon: BookOpen,
    title: "Course Registration Rules",
    items: [
      "Minimum 15 credit hours per semester; maximum 24 credit hours",
      "Exceeding these limits requires Senate approval via HOD and Dean",
      "Registration must be completed within 2 weeks of resumption",
      "Late registration allowed until week 3 only (penalty applies)",
      "Failure to register after week 3 = voluntary withdrawal",
    ],
  },
];

export default function Programmes() {
  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto space-y-14 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3 mb-4">
          <GraduationCap className="h-8 w-8 text-primary neon-text-glow" />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground font-mono">
            Academic Programmes
          </h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Degrees, entry routes, and academic regulations for the B.Sc. Cybersecurity programme.
        </p>
      </div>

      {/* Programme Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {programmes.map((prog, i) => {
          const Icon = prog.icon;
          return (
            <div
              key={i}
              className="bg-card border border-border p-6 space-y-4 hover:border-primary/40 transition-colors animate-fade-in flex flex-col"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start gap-3">
                <Icon className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-foreground font-bold text-lg">{prog.degree}</h3>
                  <p className="text-xs font-mono text-primary uppercase tracking-widest mt-1">{prog.entry}</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Duration</p>
                <p className="text-foreground font-bold text-sm">{prog.duration}</p>
              </div>

              <p className="text-foreground/80 text-sm leading-relaxed border-l-2 border-primary/30 pl-3">
                {prog.description}
              </p>

              <div className="space-y-2">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Key Features</p>
                <ul className="space-y-1">
                  {prog.highlights.map((h) => (
                    <li key={h} className="text-xs text-foreground/70 flex gap-2">
                      <span className="text-primary shrink-0">▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2 mt-auto pt-4 border-t border-border">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Admission Requirements</p>
                <ul className="space-y-1">
                  {prog.requirements.map((r) => (
                    <li key={r} className="text-xs text-foreground/70 flex gap-2">
                      <span className="text-primary font-mono font-bold shrink-0">→</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Degree Classification */}
      <div className="space-y-4">
        <h2 className="text-foreground font-bold text-2xl font-mono border-b border-border pb-4">
          Degree Classification
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-mono border border-border">
            <thead>
              <tr className="bg-primary/5 border-b border-border">
                <th className="text-left px-5 py-3 text-xs text-primary uppercase tracking-widest">Class of Degree</th>
                <th className="text-left px-5 py-3 text-xs text-primary uppercase tracking-widest">CGPA Range</th>
              </tr>
            </thead>
            <tbody>
              {degreeClasses.map(({ cls, cgpa }, i) => (
                <tr key={cls} className={`border-b border-border last:border-0 ${i === 0 ? "bg-primary/5" : ""}`}>
                  <td className={`px-5 py-3 font-bold ${i === 0 ? "text-primary" : "text-foreground"}`}>{cls}</td>
                  <td className={`px-5 py-3 ${i === degreeClasses.length - 1 ? "text-destructive" : "text-foreground/80"}`}>
                    {cgpa}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground font-mono">
          CGPA calculated on a 5.0 scale. A student must attain a minimum CGPA of 1.00 to be eligible for the degree.
        </p>
      </div>

      {/* Academic Policies */}
      <div className="space-y-6">
        <h2 className="text-foreground font-bold text-2xl font-mono border-b border-border pb-4">
          Academic Regulations
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {policies.map(({ icon: Icon, title, items }) => (
            <div key={title} className="bg-card border border-border p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-primary shrink-0" />
                <h3 className="text-foreground font-bold text-sm">{title}</h3>
              </div>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item} className="flex gap-2 text-xs text-foreground/70 leading-relaxed">
                    <span className="text-primary shrink-0 font-mono">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Application CTA */}
      <div className="bg-primary/5 border border-primary/20 p-8 text-center space-y-4">
        <h3 className="text-foreground font-bold text-xl">Ready to Join?</h3>
        <p className="text-foreground/80 max-w-2xl mx-auto text-sm">
          Apply through JAMB (UTME) or via Direct Entry. For postgraduate programmes, contact the
          Department of Cybersecurity directly at the Faculty of Computing, University of Uyo.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a
            href="https://jamb.gov.ng"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-primary text-primary-foreground font-mono text-sm hover:bg-primary/90 transition-colors"
          >
            JAMB Portal
          </a>
          <a
            href="https://uniuyo.edu.ng"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 border border-primary text-primary font-mono text-sm hover:bg-primary/5 transition-colors"
          >
            University Website
          </a>
        </div>
      </div>
    </div>
  );
}
