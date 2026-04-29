import { BookOpen, Beaker, Target, Zap } from "lucide-react";

const researchAreas = [
  {
    num: "01",
    title: "Threat Intelligence & Cyber Defence",
    status: "Active",
    statusColor: "bg-green-500/20 text-green-600 border-green-500/30",
    description: "Investigating proactive cyber threat intelligence frameworks tailored to the Nigerian enterprise and government environment, including critical national information infrastructure protection.",
    focus: ["Threat Detection", "Defense Strategies", "National Infrastructure", "Enterprise Security"],
  },
  {
    num: "02",
    title: "Digital Forensics & Cybercrime Investigation",
    status: "Active",
    statusColor: "bg-green-500/20 text-green-600 border-green-500/30",
    description: "Developing forensic science methodologies for gathering, analysing, and presenting digital evidence in a legally admissible and professional manner for Nigerian courts and organisations.",
    focus: ["Evidence Analysis", "Legal Compliance", "Investigation Methods", "Court Procedures"],
  },
  {
    num: "03",
    title: "Cryptography & Data Privacy",
    status: "Active",
    statusColor: "bg-green-500/20 text-green-600 border-green-500/30",
    description: "Research into cryptographic techniques, steganography, and privacy-preserving mechanisms for protecting sensitive data in corporate and government systems across Africa.",
    focus: ["Encryption Methods", "Steganography", "Privacy Protection", "Data Security"],
  },
  {
    num: "04",
    title: "AI & Machine Learning for Security",
    status: "Emerging",
    statusColor: "bg-blue-500/20 text-blue-600 border-blue-500/30",
    description: "Exploring AI-powered anomaly detection, intrusion detection systems, and automated threat response frameworks suited to the African network infrastructure context.",
    focus: ["Anomaly Detection", "Intrusion Detection", "Automated Response", "AI Models"],
  },
  {
    num: "05",
    title: "IoT Security & Privacy",
    status: "Emerging",
    statusColor: "bg-blue-500/20 text-blue-600 border-blue-500/30",
    description: "Addressing security vulnerabilities in Internet of Things deployments across smart agriculture, healthcare, and energy systems in Nigeria and Sub-Saharan Africa.",
    focus: ["Smart Agriculture", "Healthcare Systems", "Energy Security", "IoT Protocols"],
  },
  {
    num: "06",
    title: "Cybercrime Law & Countermeasures",
    status: "Emerging",
    statusColor: "bg-blue-500/20 text-blue-600 border-blue-500/30",
    description: "Interdisciplinary research at the intersection of Nigerian cybercrime law, ethics of professional cybersecurity practice, and the legal framework governing digital evidence.",
    focus: ["Legal Framework", "Ethics & Practice", "Policy Development", "Compliance"],
  },
];

export default function Research() {
  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto space-y-12 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Beaker className="h-8 w-8 text-primary neon-text-glow" />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground font-mono">
            Research Focus
          </h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Areas of Research & Inquiry
        </p>
      </div>

      {/* Status Legend */}
      <div className="flex gap-4 justify-center flex-wrap text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          <span className="text-foreground/80">Active Research</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500"></span>
          <span className="text-foreground/80">Emerging Research</span>
        </div>
      </div>

      {/* Research Areas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {researchAreas.map((area, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-lg p-6 space-y-4 hover:border-primary/40 transition-colors animate-fade-in"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1">
                <span className="text-2xl font-mono font-bold text-primary shrink-0">{area.num}</span>
                <div className="flex-1">
                  <h3 className="text-foreground font-bold text-base leading-snug">{area.title}</h3>
                </div>
              </div>
              <span
                className={`text-xs font-mono px-2 py-1 rounded border whitespace-nowrap shrink-0 ${area.statusColor}`}
              >
                {area.status}
              </span>
            </div>

            {/* Description */}
            <p className="text-foreground/80 text-sm leading-relaxed">
              {area.description}
            </p>

            {/* Focus Areas */}
            <div className="space-y-2">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Research Focus</p>
              <div className="flex flex-wrap gap-2">
                {area.focus.map((f, j) => (
                  <span
                    key={j}
                    className="text-xs font-mono bg-primary/10 text-primary border border-primary/30 rounded px-2 py-1"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Research Collaboration */}
      <div className="space-y-6">
        <h2 className="text-foreground font-bold text-2xl font-mono border-b border-border pb-4">
          Research Collaboration & Contributions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-lg p-6 space-y-3">
            <Target className="h-6 w-6 text-primary" />
            <h3 className="text-foreground font-bold text-base">Industry Partnerships</h3>
            <p className="text-foreground/80 text-sm">
              Collaborate with government agencies, enterprises, and international organizations on applied research and security solutions.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 space-y-3">
            <BookOpen className="h-6 w-6 text-primary" />
            <h3 className="text-foreground font-bold text-base">Publication & Impact</h3>
            <p className="text-foreground/80 text-sm">
              Publish findings in peer-reviewed journals and conferences. Focus on practical impact for African cybersecurity landscape.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 space-y-3">
            <Zap className="h-6 w-6 text-primary" />
            <h3 className="text-foreground font-bold text-base">Student Engagement</h3>
            <p className="text-foreground/80 text-sm">
              Involve undergraduate and postgraduate students in live research projects, building practical expertise and career pathways.
            </p>
          </div>
        </div>
      </div>

      {/* Getting Involved */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 space-y-4">
        <h3 className="text-foreground font-bold text-xl">Interested in Research?</h3>
        <p className="text-foreground/80">
          Undergraduate and postgraduate students are encouraged to get involved in active research projects. Opportunities include research assistantships, internships, and co-authored publications. Contact the Department of Cybersecurity for more information.
        </p>
        <p className="text-sm font-mono text-primary">
          cybersecurity@uniuyo.edu.ng
        </p>
      </div>
    </div>
  );
}
