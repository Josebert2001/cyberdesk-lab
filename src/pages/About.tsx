import { Info, BookOpen } from "lucide-react";

const stats = [
  { value: "4 Yrs", label: "UTME Duration" },
  { value: "3 Yrs", label: "Direct Entry" },
  { value: "6", label: "Core Objectives" },
  { value: "6", label: "Research Areas" },
];

const objectives = [
  { num: "01", title: "Detect & Prevent", desc: "Produce graduates with requisite foundation in cybersecurity knowledge, skills and strategies to detect and prevent cyber-fraud at organisational and national scale." },
  { num: "02", title: "Analyse & Develop", desc: "Empower graduates to analyse cybersecurity threats, attacks and risks for organisations — with capacity to develop detective codes and supportive software agents." },
  { num: "03", title: "Protect & Investigate", desc: "Develop graduates with knowledge of cryptography, steganography, and digital forensic science techniques for privacy protection and cybercrime detection." },
  { num: "04", title: "Think & Strategise", desc: "Produce graduates who can think critically about cyber intelligence security issues, and develop and implement tactical strategies drawing on national and international case studies." },
  { num: "05", title: "Lead & Employ", desc: "Prepare graduates for self-employment, cybersecurity-based job placement, and professional practice in government agencies and private industries across Nigeria and Africa." },
  { num: "06", title: "Understand Impact", desc: "Equip graduates to understand the impact of cybercrime on business and the public, and implement specific security practices and techniques to enhance systems security." },
];

export default function About() {
  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto space-y-12 animate-fade-in">

      {/* SECTION 1 — Hero */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Info className="h-8 w-8 text-primary neon-text-glow" />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground font-mono">
            Department of Cybersecurity
          </h1>
        </div>
        <p className="text-primary font-mono text-sm neon-text-glow">
          Faculty of Computing · University of Uyo
        </p>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Training the next generation of cybersecurity professionals for Nigeria and the world.
        </p>
      </div>

      {/* SECTION 2 — University Vision */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 italic text-center space-y-2">
        <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">University Vision</p>
        <p className="text-foreground/90 text-base leading-relaxed">
          "To be a centre of academic excellence by utilizing the available human and technological resources for teaching, research, community service and sustainable development."
        </p>
        <p className="text-xs text-muted-foreground font-mono">— University of Uyo</p>
      </div>

      {/* SECTION 3 — HOD Message */}
      <div className="bg-card border border-border rounded-lg p-6 border-l-4 border-l-primary relative overflow-hidden">
        <span className="absolute top-4 right-6 text-6xl text-primary/10 font-serif leading-none select-none">"</span>
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
          Head of Department
        </p>
        <p className="text-foreground font-bold text-lg mb-4">Uyinomen O. Ekong</p>
        <p className="text-foreground/80 leading-relaxed text-sm md:text-base italic">
          Our department is committed to producing graduates who will be at the forefront of securing Nigeria's digital future — with integrity, technical excellence, and global perspective.
        </p>
      </div>

      {/* SECTION 4 — Overview */}
      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-foreground font-bold text-xl font-mono border-b border-border pb-2">
            Shaping the Cyber Defenders of Tomorrow
          </h2>
          <p className="text-foreground/80 text-sm leading-relaxed">
            The Department of Cybersecurity at the University of Uyo is one of the pioneering departments within the Faculty of Computing. It was established to address the growing national and global demand for qualified cybersecurity professionals capable of protecting digital infrastructure and responding to evolving cyber threats.
          </p>
          <div className="bg-card border border-border rounded-lg p-5 border-l-4 border-l-primary">
            <p className="text-foreground/80 text-sm leading-relaxed italic">
              "The philosophy of this programme is to build capacity and develop human capital in the field of cybersecurity, to safeguard business transactions, corporate assets, critical infrastructure and all cyber operations in cyberspace, nationally and globally."
            </p>
          </div>
          <p className="text-foreground/80 text-sm leading-relaxed">
            Our graduates leave equipped to think critically about cyber intelligence issues, develop and implement security strategies, and pursue careers in government agencies, private enterprise, consultancy, or entrepreneurship. We place particular emphasis on practical, hands-on learning alongside rigorous academic theory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="text-xs font-mono text-primary uppercase tracking-widest">Head of Department</p>
            <p className="text-foreground font-bold">Uyinomen O. Ekong</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-mono text-primary uppercase tracking-widest">Faculty Dean</p>
            <p className="text-foreground font-bold">Prof. Uduak A. Umoh</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-mono text-primary uppercase tracking-widest">Faculty</p>
            <p className="text-foreground font-bold">Faculty of Computing</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-mono text-primary uppercase tracking-widest">Accreditation</p>
            <p className="text-foreground font-bold">National Universities Commission (NUC)</p>
          </div>
        </div>
      </div>

      {/* SECTION 5 — Programme Objectives */}
      <div className="space-y-4">
        <h2 className="text-foreground font-bold text-xl font-mono border-b border-border pb-2">
          Programme Objectives: What Our Graduates Are Built to Do
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {objectives.map((obj) => (
            <div key={obj.num} className="bg-card border border-border rounded-lg p-5 space-y-2">
              <div className="flex items-start gap-3">
                <span className="text-2xl font-mono font-bold text-primary shrink-0">{obj.num}</span>
                <div className="flex-1">
                  <p className="text-foreground font-bold text-sm">{obj.title}</p>
                </div>
              </div>
              <p className="text-foreground/80 text-xs leading-relaxed">{obj.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 6 — Admission Requirements */}
      <div className="space-y-4">
        <h2 className="text-foreground font-bold text-xl font-mono border-b border-border pb-2">
          Admission Requirements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-card border border-border rounded-lg p-5 space-y-3">
            <p className="text-xs font-mono text-primary uppercase tracking-widest">🎓 UTME Entry — 4 Years</p>
            <p className="text-foreground font-bold text-sm mb-2">Requirements:</p>
            <ul className="text-foreground/80 text-sm space-y-1 leading-relaxed">
              <li>→ English Language (Credit)</li>
              <li>→ Mathematics (Credit)</li>
              <li>→ Physics (Credit)</li>
              <li>→ Two other Science subjects</li>
              <li>→ Valid JAMB UTME Score</li>
            </ul>
          </div>
          <div className="bg-card border border-border rounded-lg p-5 space-y-3">
            <p className="text-xs font-mono text-primary uppercase tracking-widest">⚡ Direct Entry — 3 Years</p>
            <p className="text-foreground font-bold text-sm mb-2">Requirements:</p>
            <p className="text-foreground/80 text-sm leading-relaxed">
              Minimum of a credit at University/ND/NCE level with five SSC credit passes in relevant Science subjects including English Language, Mathematics, and Physics.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 7 — Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ value, label }) => (
          <div key={label} className="bg-card border border-border rounded-lg p-5 text-center">
            <p className="text-2xl font-mono font-bold text-primary neon-text-glow mb-1">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
