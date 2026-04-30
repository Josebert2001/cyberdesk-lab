import { Info, BookOpen, Star, Target, Briefcase } from "lucide-react";

const coreValues = [
  "Faith in God",
  "Academic Excellence in Teaching and Research",
  "Institutional Autonomy",
  "Academic Freedom",
  "Peer and Professional Review",
  "Qualitative Service Delivery",
  "Strong Work Ethics",
  "Equal Opportunity",
  "Creativity and Innovation",
  "Integrity",
  "Transparency and Accountability",
  "Peace and Orderliness",
];

const objectives = [
  { num: "01", title: "Detect & Prevent", desc: "Produce graduates with requisite foundation in cybersecurity knowledge, skills and strategies to detect and prevent cyber-fraud at organisational and national scale." },
  { num: "02", title: "Analyse & Develop", desc: "Empower graduates to analyse cybersecurity threats, attacks and risks — with the capacity to develop detective codes and supportive software agents." },
  { num: "03", title: "Protect & Investigate", desc: "Develop graduates with knowledge of cryptography, steganography, and digital forensic science techniques for privacy protection and cybercrime detection." },
  { num: "04", title: "Think & Strategise", desc: "Produce graduates who can think critically about cyber intelligence security issues, and develop and implement tactical strategies drawing on national and international case studies." },
  { num: "05", title: "Lead & Employ", desc: "Prepare graduates for self-employment, cybersecurity-based job placement, and professional practice in government agencies and private industries." },
  { num: "06", title: "Understand Impact", desc: "Equip graduates to understand the impact of cybercrime on business and the public, and implement specific security practices and techniques to enhance systems security." },
];

const careerSkills = [
  {
    icon: BookOpen,
    type: "Soft Skills",
    desc: "Excellent presentation and communications skills, ability to clearly articulate complex cyber-concepts, and active listening skills.",
  },
  {
    icon: Target,
    type: "Technical Skills",
    desc: "Architecture, administration and management of operating systems, networking, and virtualisation software; firewalls; programming languages; and cybersecurity certifications.",
  },
  {
    icon: Briefcase,
    type: "Implementation Skills",
    desc: "Cyber hunting, threat intelligence, vulnerability assessment, cybersecurity controls evaluation, and writing automation code for cybersecurity tasks.",
  },
];

const skills21 = [
  "Problem-solving", "Critical Thinking", "Communication", "Creativity",
  "Collaboration", "Information Literacy", "Global Awareness", "Innovation", "Social Skills",
];

export default function About() {
  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto space-y-14 animate-fade-in">

      {/* Header */}
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
          Building Nigeria's next generation of digital defenders — locally and globally.
        </p>
      </div>

      {/* Motto / Vision / Mission */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-primary/5 border border-primary/20 p-5 text-center space-y-2">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Motto</p>
          <p className="text-primary font-display text-lg tracking-wide neon-text-glow">
            Unity, Learning<br />and Service
          </p>
        </div>
        <div className="bg-card border border-border p-5 space-y-2 md:col-span-2">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Vision</p>
          <p className="text-foreground/80 text-sm leading-relaxed italic">
            "To be a centre of academic excellence by utilizing the available human and technological resources
            for teaching, research, community service and sustainable development."
          </p>
        </div>
        <div className="bg-card border border-border p-5 space-y-2 md:col-span-3">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Mission</p>
          <p className="text-foreground/80 text-sm leading-relaxed italic">
            "To diligently pursue scholarship and deploy its output for human capacity development and economic
            growth in the society, with active participation in Information and Communication Technology,
            sensitivity to Nigeria's rich cultural heritage and responsiveness to global environmental changes."
          </p>
        </div>
      </div>

      {/* HOD Message */}
      <div className="bg-card border border-border p-6 border-l-4 border-l-primary relative overflow-hidden">
        <span className="absolute top-4 right-6 text-6xl text-primary/10 font-serif leading-none select-none">"</span>
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">Head of Department</p>
        <p className="text-foreground font-bold text-lg mb-4">Prof. Uyinomen O. Ekong</p>
        <p className="text-foreground/80 leading-relaxed text-sm md:text-base italic">
          Our department is committed to producing graduates who will be at the forefront of securing Nigeria's
          digital future — with integrity, technical excellence, and global perspective.
        </p>
      </div>

      {/* University Overview */}
      <div className="space-y-4">
        <h2 className="text-foreground font-bold text-xl font-mono border-b border-border pb-2">
          University of Uyo — Overview
        </h2>
        <p className="text-foreground/80 text-sm leading-relaxed">
          The University of Uyo was established in 1991 by the Federal Government of Nigeria, converting the
          University of Cross River State (established 1981) into a conventional federal university. The campus
          itself traces its origins to the 1930s — starting as a practising school, becoming a Teacher Training
          College in the 1940s, an Advanced Teachers' Training College in the 1960s, a College of Education in
          1975, and UNICROSS in 1983 before its current status.
        </p>
        <p className="text-foreground/80 text-sm leading-relaxed">
          Located in Uyo, capital of Akwa Ibom State, the University operates a multi-campus system: the Main
          Campus (Nwaniba Road), the Town Campus and Annex Campus (Ikpa Road), the College of Health Sciences
          Campus, and the Ime Umanah Campus. Two international airports serve the city within 100km —
          Margaret Ekpo International Airport (Calabar) and Ibom International Airport (Uyo).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-2">
          {[
            { label: "Vice Chancellor", value: "Prof. Nyaudoh U. Ndaeyo" },
            { label: "DVC (Admin)", value: "Prof. Aniekan Offiong" },
            { label: "DVC (Academic)", value: "Prof. Anthonia Maurice Essien" },
            { label: "Registrar", value: "Mrs. Blosson Okorie" },
            { label: "Bursar", value: "Mrs. Mfon N. Bassey" },
            { label: "Dean, Faculty of Computing", value: "Prof. Uduak A. Umoh" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-card border border-border p-4 flex gap-3">
              <div className="flex-1">
                <p className="text-xs font-mono text-primary/70 uppercase tracking-widest mb-0.5">{label}</p>
                <p className="text-foreground font-bold text-sm">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-4">
        <h2 className="text-foreground font-bold text-xl font-mono border-b border-border pb-2">
          <Star className="inline h-4 w-4 text-primary mr-2 mb-0.5" />
          Core Values
        </h2>
        <div className="flex flex-wrap gap-2">
          {coreValues.map((v) => (
            <span key={v} className="text-xs font-mono bg-primary/10 text-primary border border-primary/30 px-3 py-1.5">
              {v}
            </span>
          ))}
        </div>
      </div>

      {/* About the Department */}
      <div className="space-y-5">
        <h2 className="text-foreground font-bold text-xl font-mono border-b border-border pb-2">
          About the Department
        </h2>
        <p className="text-foreground/80 text-sm leading-relaxed">
          The Department of Cybersecurity was established in 2022/2023 within the Faculty of Computing in
          response to the growing national and global demand for qualified cybersecurity professionals.
          Dr. Uyinomen O. Ekong served as the pioneer Head of Department. The department offers the B.Sc.
          Cybersecurity degree with plans for a Postgraduate Diploma, M.Sc., and PhD in Cybersecurity.
        </p>
        <div className="bg-card border border-border p-5 border-l-4 border-l-primary">
          <p className="text-foreground/80 text-sm leading-relaxed italic">
            "The philosophy of this programme is to build capacity and develop human capital in the field of
            cybersecurity, to safeguard business transactions, corporate assets, critical infrastructure and
            all cyber operations in cyberspace, nationally and globally."
          </p>
        </div>
        <p className="text-foreground/80 text-sm leading-relaxed">
          The uniqueness of the programme lies in the introduction of big data analytics, cyber threat intelligence,
          deep and dark web security, cyber threat hunting, AI cyber defence, and surveillance in cyber defence
          operations — areas not commonly found in traditional computing programmes.
        </p>
      </div>

      {/* Programme Objectives */}
      <div className="space-y-4">
        <h2 className="text-foreground font-bold text-xl font-mono border-b border-border pb-2">
          Programme Objectives
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {objectives.map((obj) => (
            <div key={obj.num} className="bg-card border border-border p-5 space-y-2">
              <div className="flex items-start gap-3">
                <span className="text-2xl font-mono font-bold text-primary shrink-0">{obj.num}</span>
                <p className="text-foreground font-bold text-sm">{obj.title}</p>
              </div>
              <p className="text-foreground/80 text-xs leading-relaxed">{obj.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 21st Century Skills */}
      <div className="space-y-4">
        <h2 className="text-foreground font-bold text-xl font-mono border-b border-border pb-2">
          21st Century Skills Developed
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills21.map((s) => (
            <span key={s} className="text-xs font-mono bg-card border border-border text-foreground/80 px-3 py-1.5 hover:border-primary/40 transition-colors">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Career Opportunities */}
      <div className="space-y-4">
        <h2 className="text-foreground font-bold text-xl font-mono border-b border-border pb-2">
          Career Opportunities
        </h2>
        <p className="text-foreground/80 text-sm leading-relaxed">
          Our society has been transformed into an information hub. Cybersecurity graduates have bright futures
          — cybersecurity skills are hard skills required across all industries. Graduates will be equipped with:
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {careerSkills.map(({ icon: Icon, type, desc }) => (
            <div key={type} className="bg-card border border-border p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary" />
                <p className="text-sm font-mono font-bold text-foreground">{type}</p>
              </div>
              <p className="text-foreground/70 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { value: "4 Yrs", label: "UTME Duration" },
          { value: "3 Yrs", label: "Direct Entry" },
          { value: "6", label: "Core Objectives" },
          { value: "2022", label: "Year Founded" },
        ].map(({ value, label }) => (
          <div key={label} className="bg-card border border-border p-5 text-center">
            <p className="text-2xl font-mono font-bold text-primary neon-text-glow mb-1">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
