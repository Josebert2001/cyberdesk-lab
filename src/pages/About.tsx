import { Info } from "lucide-react";

const stats = [
  { value: "4 Years", label: "Programme Duration" },
  { value: "200+", label: "Students Enrolled" },
  { value: "5", label: "Core Objectives" },
  { value: "100%", label: "Career-Focused" },
];

const objectives = [
  "Produce graduates with foundation knowledge of cybersecurity skills to detect and prevent cyber-fraud.",
  "Empower graduates to analyse cybersecurity threats and develop detective codes and software agents to address them.",
  "Develop knowledge of cryptography, steganography and digital forensic techniques for cybercrime detection.",
  "Produce graduates who can think critically about cyber intelligence and implement strategic cybersecurity tactics.",
  "Prepare graduates for self-employment, job placement and professional practice in government and industry.",
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

      {/* SECTION 2 — HOD Message */}
      <div className="bg-card border border-border rounded-lg p-6 border-l-4 border-l-primary relative overflow-hidden">
        <span className="absolute top-4 right-6 text-6xl text-primary/10 font-serif leading-none select-none">"</span>
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
          Head of Department
        </p>
        <p className="text-foreground font-bold text-lg mb-4">Dr. Uyinomen O. Ekong</p>
        <p className="text-foreground/80 leading-relaxed text-sm md:text-base italic">
          "Welcome to the Department of Cybersecurity. Our mission is to equip you with the knowledge, skills and ethical grounding to defend cyberspace — locally and globally. Make the most of every resource this platform offers."
        </p>
      </div>

      {/* SECTION 3 — Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: About the Programme */}
        <div className="space-y-4">
          <h2 className="text-foreground font-bold text-xl font-mono border-b border-border pb-2">
            About the Programme
          </h2>
          <p className="text-foreground/80 text-sm leading-relaxed">
            Recent developments in computing, network technologies, internet, and cloud technologies have generated
            the need for reliability and secure exchange of digital information vital to most human activities such
            as banking, medicine, infrastructure management and elections.
          </p>
          <p className="text-foreground/80 text-sm leading-relaxed">
            As the use of information technology expands, so do the potential consequences of cyber-attacks, and
            the need for a skilled workforce to prevent and defend against them. The pool of available talent to
            build and certify secure applications is inadequate to meet the growing global demand.
          </p>
          <p className="text-foreground/80 text-sm leading-relaxed">
            This programme equips students with knowledge and skills to minimise and prevent cybersecurity threats,
            gather and analyse digital evidence, and understand the impact of cybercrime on business and the public.
          </p>
        </div>

        {/* Right: Philosophy + Objectives */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-foreground font-bold text-xl font-mono border-b border-border pb-2">
              Programme Philosophy
            </h2>
            <p className="text-foreground/80 text-sm leading-relaxed">
              The philosophy of this programme is to build capacity and develop human capital in the field of
              cybersecurity, to safeguard business transactions, corporate assets, critical infrastructure and all
              cyber operations in cyberspace — nationally and globally.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-foreground font-bold text-base font-mono">Programme Objectives</h3>
            <div className="space-y-2">
              {objectives.map((obj, i) => (
                <div key={i} className="flex gap-3 bg-card border border-border rounded-lg p-3">
                  <span className="text-primary font-mono font-bold text-sm shrink-0 w-5">{i + 1}.</span>
                  <p className="text-foreground/80 text-sm leading-relaxed">{obj}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4 — Admission Requirements */}
      <div className="space-y-4">
        <h2 className="text-foreground font-bold text-xl font-mono border-b border-border pb-2">
          Admission Requirements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-card border border-border rounded-lg p-5 space-y-3">
            <p className="text-xs font-mono text-primary uppercase tracking-widest">4-Year Programme (UTME)</p>
            <p className="text-foreground/80 text-sm leading-relaxed">
              UTME score + five SSC credit passes including English Language, Mathematics, Physics and any other
              relevant Science subjects in not more than two sittings.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-5 space-y-3">
            <p className="text-xs font-mono text-primary uppercase tracking-widest">3-Year Programme (Direct Entry)</p>
            <p className="text-foreground/80 text-sm leading-relaxed">
              Minimum credit at University/National Diploma or NCE with five SSC credit passes in relevant Science
              subjects including English Language, Mathematics and Physics.
            </p>
          </div>
        </div>
        <p className="text-center text-xs font-mono text-muted-foreground">
          Minimum duration: 4 academic sessions (UTME) · 3 academic sessions (Direct Entry)
        </p>
      </div>

      {/* SECTION 5 — Stats */}
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
