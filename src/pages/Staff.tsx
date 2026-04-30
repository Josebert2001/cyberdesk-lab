import { useState } from "react";
import { Users, Building2 } from "lucide-react";

const principalOfficers = [
  { role: "Vice Chancellor", name: "Prof. Nyaudoh U. Ndaeyo", initials: "NN" },
  { role: "DVC (Admin)", name: "Prof. Aniekan Offiong", initials: "AO" },
  { role: "DVC (Academic)", name: "Prof. Anthonia Maurice Essien", initials: "AM" },
  { role: "Registrar", name: "Mrs. Blosson Okorie", initials: "BO" },
  { role: "Bursar", name: "Mrs. Mfon N. Bassey", initials: "MB" },
  { role: "Acting Librarian", name: "Dr. Mary M. Bassey", initials: "MM" },
  { role: "Dean, Faculty of Computing", name: "Prof. Uduak A. Umoh", initials: "UA" },
  { role: "HOD, Cybersecurity", name: "Prof. Uyinomen O. Ekong", initials: "UE" },
];

type StaffType = "Lecturers" | "Admin" | "Director";

interface StaffMember {
  name: string;
  role: string;
  department: string;
  specialisations: string[];
  bio: string;
  initials: string;
  types: StaffType[];
  portalBuilder?: boolean;
}

const staff: StaffMember[] = [
  {
    name: "Prof. Uduak A. Umoh",
    role: "Dean, Faculty of Computing",
    department: "Computer Science / Faculty of Computing",
    specialisations: ["Artificial Intelligence", "Soft Computing", "Fuzzy Systems", "Database Systems"],
    bio: "Professor Umoh holds a PhD in Computer Science (Soft Computing/AI) from the University of Port Harcourt (2012). She is Dean of the Faculty of Computing, an Adjunct Professor at Akwa Ibom State University and Obong University, and has published over 70 papers in international journals. She also serves as ICT Manager at Alternative Petroleum and Power Limited (APPL).",
    initials: "UU",
    types: ["Lecturers"],
  },
  {
    name: "Prof. Uyinomen O. Ekong",
    role: "Head of Department, Cybersecurity",
    department: "Department of Cybersecurity",
    specialisations: ["Cybersecurity", "Department Administration"],
    bio: "Prof. Ekong is the Head of the Department of Cybersecurity at the University of Uyo. He was appointed as the pioneer HOD when the department was established in the 2022/2023 academic session. He oversees academic and administrative activities and is committed to building a world-class cybersecurity programme.",
    initials: "UE",
    types: ["Lecturers", "Admin"],
  },
  {
    name: "Senior Lecturer (Network Security)",
    role: "Senior Lecturer",
    department: "Department of Cybersecurity",
    specialisations: ["Network Security", "Cryptography"],
    bio: "Specialises in network security infrastructure, cryptographic protocols, and secure communication systems. Contributes to research and teaching in threat detection and network defense mechanisms.",
    initials: "NS",
    types: ["Lecturers"],
  },
  {
    name: "Senior Lecturer (Digital Forensics)",
    role: "Senior Lecturer",
    department: "Department of Cybersecurity",
    specialisations: ["Digital Forensics", "Cyber Law"],
    bio: "Expert in digital forensic science methodologies, cyber evidence analysis, and the legal framework for cybercrime investigation. Develops curricula aligned with professional practice standards.",
    initials: "DF",
    types: ["Lecturers"],
  },
  {
    name: "Lecturer II (Ethical Hacking)",
    role: "Lecturer II",
    department: "Department of Cybersecurity",
    specialisations: ["Ethical Hacking", "Penetration Testing"],
    bio: "Teaches and researches defensive security practices through authorized penetration testing and vulnerability assessment methodologies. Guides student practical labs and industry applications.",
    initials: "EH",
    types: ["Lecturers"],
  },
  {
    name: "Lecturer II (Information Security)",
    role: "Lecturer II",
    department: "Department of Cybersecurity",
    specialisations: ["Information Security", "Risk Management"],
    bio: "Focuses on information security management systems, risk assessment frameworks, and organizational security policies. Contributes to security strategy and enterprise security architecture research.",
    initials: "IS",
    types: ["Lecturers"],
  },
  {
    name: "Lecturer II (Cloud & IoT Security)",
    role: "Lecturer II",
    department: "Department of Cybersecurity",
    specialisations: ["Cloud Security", "IoT Security"],
    bio: "Specialises in cloud computing security, Internet of Things infrastructure protection, and emerging technology threats. Researches smart agriculture, healthcare, and energy system security in African contexts.",
    initials: "CI",
    types: ["Lecturers"],
  },
  {
    name: "Josebert Sunday Robert",
    role: "Director of Software & Hardware",
    department: "Department of Cybersecurity",
    specialisations: ["AI Development", "IT Support", "Web Development", "Cybersecurity"],
    bio: "Josebert is the student Director of Software & Hardware for the Department of Cybersecurity. He is the founder of Jrsolvy, holds a Google AI Professional Certificate, and has 6+ years of IT experience. He built and maintains this student portal.",
    initials: "JS",
    types: ["Director"],
    portalBuilder: true,
  },
];

const FILTERS = ["All", "Lecturers", "Admin", "Director"] as const;
type Filter = (typeof FILTERS)[number];

export default function Staff() {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = filter === "All"
    ? staff
    : staff.filter((s) => s.types.includes(filter as StaffType));

  return (
    <div className="p-6 md:p-12 max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Users className="h-8 w-8 text-primary neon-text-glow" />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground font-mono">
            Faculty &amp; Staff
          </h1>
        </div>
        <p className="text-muted-foreground">
          Meet the team behind the Department of Cybersecurity, UniUyo
        </p>
      </div>

      {/* University Principal Officers */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-bold font-mono text-foreground">University Principal Officers</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {principalOfficers.map(({ role, name, initials }) => (
            <div key={role} className="bg-card border border-border p-3 text-center hover:border-primary/40 transition-colors">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <span className="text-primary font-mono font-bold text-sm">{initials}</span>
              </div>
              <p className="text-[10px] font-mono text-primary/70 uppercase tracking-widest leading-tight mb-1">{role}</p>
              <p className="text-xs text-foreground font-bold leading-snug">{name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 border-b border-border mb-8">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-3 text-sm font-mono transition-colors duration-200 border-b-2 -mb-px ${
              filter === f
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((member, i) => (
          <div
            key={member.name}
            className="bg-card border border-border rounded-lg p-6 flex flex-col gap-4 hover:border-primary/40 transition-colors animate-fade-in"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {/* Avatar + name */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                <span className="text-primary font-mono font-bold text-lg">{member.initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-foreground font-bold text-base leading-snug">{member.name}</h3>
                  {member.portalBuilder && (
                    <span className="text-xs font-mono bg-primary/20 text-primary border border-primary/30 rounded px-2 py-0.5 shrink-0">
                      Portal Builder
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground text-sm italic mt-0.5">{member.role}</p>
                <p className="text-xs font-mono text-primary/70 mt-0.5">{member.department}</p>
              </div>
            </div>

            {/* Specialisations */}
            <div className="flex flex-wrap gap-2">
              {member.specialisations.map((s) => (
                <span
                  key={s}
                  className="text-xs font-mono bg-primary/10 text-primary border border-primary/30 rounded px-2 py-0.5"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Bio */}
            <p className="text-foreground/70 text-sm leading-relaxed">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
