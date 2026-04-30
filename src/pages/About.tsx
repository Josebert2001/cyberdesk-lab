import { BookOpen, Star, Target, Briefcase, MapPin, Plane } from "lucide-react";

const historyTimeline = [
  { year: "1930s", event: "Practising School", detail: "The campus begins as a practising school on what is now Nwaniba Road, Uyo." },
  { year: "1940s", event: "Teacher Training College", detail: "Upgraded to a full Teacher Training College serving the then Cross River region." },
  { year: "1960s", event: "Advanced Teachers' Training College", detail: "Further upgraded to an Advanced Teachers' Training College as education needs grew." },
  { year: "1975",  event: "College of Education", detail: "Converted to a College of Education, expanding its academic mandate." },
  { year: "1981",  event: "University of Cross River State", detail: "Established as a state university (UNICROSS) by the Cross River State Government." },
  { year: "1983",  event: "UNICROSS Campus, Uyo", detail: "The Uyo campus formally becomes part of the growing university system." },
  { year: "1987",  event: "Akwa Ibom State Created", detail: "Akwa Ibom State is carved out of Cross River State, with Uyo as its capital. The university becomes jointly owned by both states." },
  { year: "1991",  event: "University of Uyo (Federal)", detail: "The Federal Government converts UNICROSS to the University of Uyo — a conventional federal university. Academic activities commence in the 1991/92 session.", highlight: true },
  { year: "2022",  event: "Dept. of Cybersecurity Founded", detail: "The Department of Cybersecurity is established within the Faculty of Computing, taking off in the 2022/2023 academic session.", highlight: true },
];

const campuses = [
  { name: "Main Campus", location: "Nwaniba Road, Uyo" },
  { name: "Town Campus & Annex", location: "Ikpa Road, Uyo" },
  { name: "College of Health Sciences Campus", location: "Uyo" },
  { name: "Ime Umanah Campus", location: "Uyo" },
];

const airports = [
  { name: "Ibom International Airport", location: "Uyo, Akwa Ibom State" },
  { name: "Margaret Ekpo International Airport", location: "Calabar, Cross River State" },
];

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

const principalOfficerTiers = [
  {
    tier: "University Executive",
    color: "border-primary bg-primary/5",
    labelColor: "text-primary",
    officers: [
      { role: "Vice Chancellor", name: "Prof. Nyaudoh U. Ndaeyo", initials: "NN" },
      { role: "Deputy Vice Chancellor (Admin)", name: "Prof. Aniekan Offiong", initials: "AO" },
      { role: "Deputy Vice Chancellor (Academic)", name: "Prof. Anthonia Maurice Essien", initials: "AM" },
    ],
  },
  {
    tier: "Principal Administrative Officers",
    color: "border-blue-400/30 bg-blue-400/5",
    labelColor: "text-blue-300",
    officers: [
      { role: "Registrar", name: "Mrs. Blosson Okorie", initials: "BO" },
      { role: "Bursar", name: "Mrs. Mfon N. Bassey", initials: "MB" },
      { role: "Acting Librarian", name: "Dr. Mary M. Bassey", initials: "MM" },
    ],
  },
  {
    tier: "Faculty of Computing",
    color: "border-muted-foreground/20 bg-muted/5",
    labelColor: "text-muted-foreground",
    officers: [
      { role: "Dean, Faculty of Computing", name: "Prof. Uduak A. Umoh", initials: "UA" },
    ],
  },
  {
    tier: "Department of Cybersecurity",
    color: "border-primary/40 bg-primary/8",
    labelColor: "text-primary",
    officers: [
      { role: "Head of Department", name: "Prof. Uyinomen O. Ekong", initials: "UE" },
    ],
  },
];

const objectives = [
  {
    num: "01",
    title: "Detect & Prevent",
    desc: "Produce graduates with requisite foundation knowledge of cybersecurity, skills, and strategies that would enable them to detect and prevent cyber-fraud.",
  },
  {
    num: "02",
    title: "Analyse & Develop",
    desc: "Empower graduates with the ability to analyze cybersecurity threats, attacks, and risks for organizations, with the capacity to develop detective codes and supportive software agents to address cybersecurity threats.",
  },
  {
    num: "03",
    title: "Protect & Investigate",
    desc: "Develop graduates with knowledge of cryptography and steganography for privacy of information on computer systems and digital forensic science techniques for the detection of cybercrimes.",
  },
  {
    num: "04",
    title: "Think & Strategise",
    desc: "Produce graduates who can think critically about cyber intelligence security issues, develop and implement tactics strategic to cybersecurity, drawing on national and international recent case studies.",
  },
  {
    num: "05",
    title: "Lead & Employ",
    desc: "Prepare graduates for the purpose of self-employment, cybersecurity-based job placement and professional practice in government and industries.",
  },
];

const careerSkills = [
  {
    icon: BookOpen,
    type: "Soft Skills",
    desc: "Excellent presentation and communications skills, ability to clearly articulate complex cyber-concepts, and usage of active listening skills.",
  },
  {
    icon: Target,
    type: "Technical Skills",
    desc: "Understanding the architecture, administration and management of operating systems, networking, and virtualisation software; firewalls and network load balancers; programming languages; and cybersecurity certifications.",
  },
  {
    icon: Briefcase,
    type: "Implementation Skills",
    desc: "Cyber hunting, cyber intelligence and threat modelling; vulnerability assessment; identifying cybersecurity controls and how they are used; and writing code to automate cybersecurity tasks.",
  },
];

const skills21 = [
  "Problem-solving", "Critical Thinking", "Communication", "Creativity",
  "Collaboration", "Information Literacy", "Global Awareness", "Innovation", "Social Skills",
];

export default function About() {
  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto space-y-16 animate-fade-in">

      {/* Header */}
      <div className="text-center space-y-3">
        <p className="text-xs font-mono text-primary/60 tracking-[0.25em] uppercase">University of Uyo · Faculty of Computing</p>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground font-mono">
          Department of Cybersecurity
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Building Nigeria's next generation of digital defenders — with integrity, technical excellence, and global perspective.
        </p>
      </div>

      {/* Motto / Vision / Mission */}
      <div className="space-y-3">
        <h2 className="font-mono font-bold text-sm text-foreground border-b border-border pb-2 uppercase tracking-widest">
          University Identity
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-primary/5 border border-primary/25 p-5 text-center flex flex-col items-center justify-center gap-2">
            <p className="text-[10px] font-mono text-primary/60 tracking-[0.2em] uppercase">Motto</p>
            <p className="text-primary font-display text-xl tracking-wide neon-text-glow leading-snug">
              Unity, Learning<br />and Service
            </p>
          </div>
          <div className="bg-card border border-border p-5 space-y-2">
            <p className="text-[10px] font-mono text-muted-foreground/60 tracking-[0.2em] uppercase">Vision</p>
            <p className="text-foreground/80 text-sm leading-relaxed italic">
              "To be a centre of academic excellence by utilizing the available human and technological
              resources for teaching, research, community service and sustainable development."
            </p>
          </div>
          <div className="bg-card border border-border p-5 space-y-2">
            <p className="text-[10px] font-mono text-muted-foreground/60 tracking-[0.2em] uppercase">Mission</p>
            <p className="text-foreground/80 text-sm leading-relaxed italic">
              "To diligently pursue scholarship and deploy its output for human capacity development
              and economic growth in the society, with active participation in ICT, sensitivity to
              Nigeria's rich cultural heritage and responsiveness to global environmental changes."
            </p>
          </div>
        </div>
      </div>

      {/* University History Timeline */}
      <div className="space-y-5">
        <h2 className="font-mono font-bold text-sm text-foreground border-b border-border pb-2 uppercase tracking-widest">
          Historical Background
        </h2>
        <p className="text-foreground/80 text-sm leading-relaxed">
          The University of Uyo has a unique and remarkable historical metamorphosis spanning nearly a century.
          What began as a practising school in the 1930s has grown into one of Nigeria's leading federal universities,
          located in Uyo — the capital of Akwa Ibom State, Nigeria. When the Federal Government took over in 1991,
          it was resolved that the university would be a conventional university rather than a Federal University
          of Technology (FUT), ensuring a broader academic mandate. It is today a citadel of learning, research,
          and community development.
        </p>
        <div className="relative">
          <div className="absolute left-[72px] top-0 bottom-0 w-px bg-primary/15 hidden sm:block" />
          <div className="space-y-3">
            {historyTimeline.map(({ year, event, detail, highlight }) => (
              <div key={year} className="flex gap-4 sm:gap-6 items-start">
                <div className={`shrink-0 w-16 text-right font-mono text-xs font-bold pt-3 ${
                  highlight ? "text-primary" : "text-muted-foreground/50"
                }`}>
                  {year}
                </div>
                <div className="hidden sm:flex items-start pt-4 shrink-0">
                  <div className={`w-2.5 h-2.5 rounded-full border-2 mt-0.5 ${
                    highlight ? "border-primary bg-primary" : "border-muted-foreground/30 bg-background"
                  }`} />
                </div>
                <div className={`flex-1 p-4 border ${
                  highlight
                    ? "border-primary/25 bg-primary/5"
                    : "border-border bg-card/60"
                }`}>
                  <p className={`font-bold text-sm mb-1 ${highlight ? "text-primary" : "text-foreground"}`}>
                    {event}
                  </p>
                  <p className="text-foreground/70 text-xs leading-relaxed">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campuses & Access */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h2 className="font-mono font-bold text-sm text-foreground border-b border-border pb-2 uppercase tracking-widest">
            <MapPin className="inline h-3.5 w-3.5 text-primary mr-1.5 mb-0.5" />
            Campus System
          </h2>
          <p className="text-foreground/70 text-xs leading-relaxed">
            The University runs a multi-campus system across Uyo, Akwa Ibom State.
          </p>
          <div className="space-y-2">
            {campuses.map(({ name, location }) => (
              <div key={name} className="flex gap-3 bg-card border border-border p-3">
                <div className="w-1.5 shrink-0 bg-primary/40 self-stretch" />
                <div>
                  <p className="text-foreground font-bold text-xs">{name}</p>
                  <p className="text-muted-foreground text-xs">{location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="font-mono font-bold text-sm text-foreground border-b border-border pb-2 uppercase tracking-widest">
            <Plane className="inline h-3.5 w-3.5 text-primary mr-1.5 mb-0.5" />
            International Airports (within 100km)
          </h2>
          <p className="text-foreground/70 text-xs leading-relaxed">
            Uyo is accessible by road and served by two international airports.
          </p>
          <div className="space-y-2">
            {airports.map(({ name, location }) => (
              <div key={name} className="flex gap-3 bg-card border border-border p-3">
                <div className="w-1.5 shrink-0 bg-primary/40 self-stretch" />
                <div>
                  <p className="text-foreground font-bold text-xs">{name}</p>
                  <p className="text-muted-foreground text-xs">{location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Principal Officers — Hierarchy */}
      <div className="space-y-5">
        <h2 className="font-mono font-bold text-sm text-foreground border-b border-border pb-2 uppercase tracking-widest">
          Principal Officers — Hierarchy
        </h2>
        <p className="text-foreground/70 text-xs leading-relaxed">
          The University of Uyo operates through a defined leadership structure from University Executive
          down through Faculty to Department level.
        </p>
        <div className="space-y-4">
          {principalOfficerTiers.map(({ tier, color, labelColor, officers }, ti) => (
            <div key={tier}>
              <div className="flex items-center gap-3 mb-2">
                {ti > 0 && <div className="w-6 h-px bg-muted-foreground/20" />}
                <p className={`text-[10px] font-mono uppercase tracking-[0.18em] font-bold ${labelColor}`}>
                  {ti + 1}. {tier}
                </p>
              </div>
              <div className={`border ${color} ${ti > 0 ? "ml-6" : ""}`}>
                <div className="divide-y divide-border/50">
                  {officers.map(({ role, name, initials }) => (
                    <div key={role} className="flex items-center gap-4 px-4 py-3">
                      <div className="w-9 h-9 rounded-full bg-background border border-border flex items-center justify-center shrink-0">
                        <span className={`font-mono font-bold text-xs ${labelColor}`}>{initials}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground font-bold text-sm truncate">{name}</p>
                        <p className="text-muted-foreground text-xs">{role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-4">
        <h2 className="font-mono font-bold text-sm text-foreground border-b border-border pb-2 uppercase tracking-widest">
          <Star className="inline h-3.5 w-3.5 text-primary mr-1.5 mb-0.5" />
          Core Values
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {coreValues.map((v, i) => (
            <div key={v} className="flex items-start gap-2.5 bg-card border border-border p-3">
              <span className="font-mono text-[10px] text-primary/50 shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-foreground/80 text-xs leading-relaxed">{v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About the Department */}
      <div className="space-y-5">
        <h2 className="font-mono font-bold text-sm text-foreground border-b border-border pb-2 uppercase tracking-widest">
          About the Department
        </h2>
        <div className="bg-card border border-border border-l-4 border-l-primary p-5 relative overflow-hidden">
          <span className="absolute top-3 right-5 text-5xl text-primary/8 font-serif leading-none select-none">"</span>
          <p className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest mb-2">Head of Department</p>
          <p className="text-foreground font-bold mb-3">Prof. Uyinomen O. Ekong</p>
          <p className="text-foreground/80 text-sm leading-relaxed italic">
            Our department is committed to producing graduates who will be at the forefront of securing Nigeria's
            digital future — with integrity, technical excellence, and global perspective.
          </p>
        </div>
        <p className="text-foreground/80 text-sm leading-relaxed">
          Recent developments in computing, network technologies, the internet, and cloud technologies have generated
          the need for reliable and secure exchange of digital information vital to banking, medicine, infrastructure
          management, and elections. As the use of information technology expands, so do the potential consequences
          of cyber-attacks. The pool of available talent to build and certify applications designed to withstand
          attacks, diagnose and prevent security intrusions is <strong className="text-foreground">inadequate to meet the growing needs all over the world</strong>.
          Government agencies, businesses, industries, and the military are scrambling to find qualified professionals
          to safeguard their systems.
        </p>
        <p className="text-foreground/80 text-sm leading-relaxed">
          The Department of Cybersecurity was established in the <strong className="text-foreground">2022/2023 academic session</strong> within the
          Faculty of Computing, with Prof. Uyinomen O. Ekong as pioneer Head of Department. The department
          currently offers the B.Sc. Cybersecurity degree, with plans on hand to run a Postgraduate Diploma,
          M.Sc., and PhD in Cybersecurity.
        </p>
        <div className="bg-card border border-border p-5">
          <p className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest mb-2">Programme Philosophy</p>
          <p className="text-foreground/80 text-sm leading-relaxed italic">
            "The philosophy of the programme is to build capacity and develop human capital in the field of
            cybersecurity, to safeguard business transactions, corporate assets, critical infrastructure, and
            all cyber operations in cyberspace, nationally and globally."
          </p>
        </div>
        <div className="bg-primary/5 border border-primary/20 p-5">
          <p className="text-[10px] font-mono text-primary/60 uppercase tracking-widest mb-2">What Makes This Programme Unique</p>
          <p className="text-foreground/80 text-sm leading-relaxed">
            The programme introduces <strong className="text-foreground">Big Data Analytics</strong>, <strong className="text-foreground">Cyber Threat Intelligence</strong> and Cyber Conflict,
            <strong className="text-foreground"> Deep and Dark Web Security</strong>, <strong className="text-foreground">Cyber Threat Hunting</strong>, Monitors and Controllers,
            <strong className="text-foreground"> Artificial Intelligence Cyber Defence</strong>, and Surveillance in Cyber Defence Operations —
            areas not commonly found in traditional computing programmes in Nigeria.
          </p>
        </div>
      </div>

      {/* Programme Objectives — exactly 5, verbatim from handbook */}
      <div className="space-y-4">
        <h2 className="font-mono font-bold text-sm text-foreground border-b border-border pb-2 uppercase tracking-widest">
          Programme Objectives
        </h2>
        <div className="space-y-3">
          {objectives.map((obj) => (
            <div key={obj.num} className="flex gap-4 bg-card border border-border p-5">
              <span className="font-mono text-2xl font-bold text-primary/25 shrink-0 leading-none">{obj.num}</span>
              <div>
                <p className="text-foreground font-bold text-sm mb-1">{obj.title}</p>
                <p className="text-foreground/75 text-xs leading-relaxed">{obj.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 21st Century Skills */}
      <div className="space-y-4">
        <h2 className="font-mono font-bold text-sm text-foreground border-b border-border pb-2 uppercase tracking-widest">
          21st Century Skills Students Will Develop
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
        <h2 className="font-mono font-bold text-sm text-foreground border-b border-border pb-2 uppercase tracking-widest">
          Career Opportunities
        </h2>
        <p className="text-foreground/80 text-sm leading-relaxed">
          Our society has been transformed into an information hub, connecting all data processing and information
          management organisations with the private sector and the general public through the internet. The Cybersecurity
          graduate therefore has a bright future — cybersecurity skills are <strong className="text-foreground">hard skills required in all jobs</strong>.
          Graduates will be equipped in three distinct skill categories:
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

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { value: "1991", label: "UniUyo Founded" },
          { value: "2022", label: "Dept. Established" },
          { value: "5", label: "Programme Objectives" },
          { value: "12", label: "Core Values" },
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
