import { Link } from "react-router-dom";
import {
  Shield,
  Brain,
  Terminal,
  Zap,
  BookOpen,
  FolderOpen,
  Swords,
  GraduationCap,
  Microscope,
  Briefcase,
  Code2,
} from "lucide-react";

const pillars = [
  {
    icon: Shield,
    title: "Ethical Hacking & CTF",
    desc: "Regular Capture The Flag competitions that sharpen practical offensive and defensive security skills.",
  },
  {
    icon: GraduationCap,
    title: "Academic Excellence",
    desc: "Study groups, past question banks, and peer mentorship to ensure no student falls behind.",
  },
  {
    icon: Briefcase,
    title: "Industry Connections",
    desc: "Seminars, hackathons, and partnerships with tech companies across Nigeria and Africa.",
  },
];

const programs = [
  {
    icon: Swords,
    title: "CTF Competitions",
    desc: "Internal and inter-university Capture The Flag competitions covering web exploitation, cryptography, forensics, and reverse engineering.",
  },
  {
    icon: Code2,
    title: "Skills Bootcamp",
    desc: "Intensive short courses on networking, Linux, Python for security, and cloud security fundamentals — fully free for DOCSSA members.",
  },
  {
    icon: Microscope,
    title: "Research Cluster",
    desc: "Faculty-supervised research groups publishing on AI security, threat intelligence, and digital forensics for African contexts.",
  },
  {
    icon: Briefcase,
    title: "Industry Connect",
    desc: "Monthly guest lectures and internship pipelines with Lagos, Abuja, and remote cybersecurity firms — helping you land your first role.",
  },
  {
    icon: Zap,
    title: "Hackathon Squad",
    desc: "Team formation and coaching for national hackathons — DOCSSA members have placed in multiple regional tech competitions.",
  },
  {
    icon: BookOpen,
    title: "Exam Prep Hub",
    desc: "Past question banks, CBT practice tools, and peer-led revision sessions to keep your GPA strong while you skill up.",
  },
];

const tags = ["Cybersecurity", "UniUyo", "CTF", "Ethical Hacking", "Python", "Networking", "Nigeria", "OSINT"];

const stats = [
  { num: "200+", label: "Active Members" },
  { num: "12", label: "Programs Yearly" },
  { num: "5", label: "Exec Portfolios" },
  { num: "1st", label: "CyberSec Dept in UniUyo" },
];

const executives = [
  { initials: "PR", name: "President", role: "Executive President" },
  { initials: "VP", name: "Vice President", role: "Vice President" },
  { initials: "SG", name: "Secretary General", role: "Sec. General" },
  { initials: "FO", name: "Financial Officer", role: "Treasurer" },
  { initials: "PR", name: "PRO", role: "Public Relations" },
];

function BrandLogo({ size = 160 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 0 30px rgba(75, 170, 220, 0.4))" }}
    >
      <circle cx="80" cy="80" r="76" fill="#0D1F4E" stroke="#4BAADC" strokeWidth="3" />
      <circle cx="80" cy="80" r="68" fill="none" stroke="#2B6FBF" strokeWidth="1" />
      <text x="80" y="60" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="10" fill="#8BACCF" letterSpacing="2">
        DEPARTMENT OF
      </text>
      <text x="80" y="74" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="8" fill="#8BACCF" letterSpacing="1">
        CYBER SECURITY
      </text>
      <text x="80" y="86" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="7" fill="#7ECBEF" letterSpacing="1">
        STUDENTS ASSOCIATION
      </text>
      <path
        d="M80 95 L65 103 L65 118 Q65 130 80 136 Q95 130 95 118 L95 103 Z"
        fill="#1A4A8A"
        stroke="#4BAADC"
        strokeWidth="1.5"
      />
      <text x="80" y="118" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="8" fill="white" fontWeight="bold">
        UNIUYO
      </text>
      <text
        x="80"
        y="148"
        textAnchor="middle"
        fontFamily="Arial Black, sans-serif"
        fontSize="11"
        fill="#4BAADC"
        letterSpacing="3"
        fontWeight="bold"
      >
        DOCSSA
      </text>
    </svg>
  );
}

export default function Welcome() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 brand-glass border-b border-primary/15">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
          <Link to="/welcome" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center bg-card">
              <span className="font-display text-xs tracking-[0.08em] text-primary">DSA</span>
            </div>
            <span className="font-display text-2xl tracking-[0.08em] text-[#7ECBEF]">DOCSSA</span>
          </Link>
          <ul className="hidden md:flex items-center gap-10 list-none">
            <li>
              <a href="#about" className="text-xs uppercase tracking-[0.06em] font-medium text-muted-foreground hover:text-[#7ECBEF] transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#programs" className="text-xs uppercase tracking-[0.06em] font-medium text-muted-foreground hover:text-[#7ECBEF] transition-colors">
                Programs
              </a>
            </li>
            <li>
              <a href="#executives" className="text-xs uppercase tracking-[0.06em] font-medium text-muted-foreground hover:text-[#7ECBEF] transition-colors">
                Executives
              </a>
            </li>
            <li>
              <a href="#contact" className="text-xs uppercase tracking-[0.06em] font-medium text-muted-foreground hover:text-[#7ECBEF] transition-colors">
                Contact
              </a>
            </li>
          </ul>
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="hidden sm:inline-block text-xs uppercase tracking-[0.06em] font-medium text-muted-foreground hover:text-[#7ECBEF] transition-colors px-3 py-2"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="inline-block bg-primary text-primary-foreground font-bold text-xs uppercase tracking-[0.06em] px-4 py-2.5 rounded hover:bg-[#7ECBEF] hover:-translate-y-px transition-all"
            >
              Join Us
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 brand-grid-bg" />
        <div
          className="absolute -top-32 -left-20 w-[700px] h-[700px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(27,74,138,0.45) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-52 -right-24 w-[600px] h-[600px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(75,170,220,0.15) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 max-w-7xl w-full mx-auto grid md:grid-cols-[1fr_auto] gap-12 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/35 rounded-full px-4 py-1.5 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
              <span className="text-[11px] font-mono text-primary tracking-wide">
                University of Uyo · Faculty of Computing · Est. 2024
              </span>
            </div>

            <h1 className="font-display text-[3.5rem] sm:text-7xl md:text-[6.5rem] leading-[0.95] tracking-[0.03em] text-foreground">
              Defend.
              <br />
              <span className="block text-primary">Innovate.</span>
              Lead.
            </h1>

            <p className="text-base text-muted-foreground leading-[1.75] max-w-xl mt-6 mb-10">
              The Department of Cyber Security Students Association at UniUyo — building the next generation of digital
              defenders, ethical hackers, and cybersecurity leaders across Nigeria.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/signup"
                className="inline-block bg-primary text-primary-foreground font-bold text-sm uppercase tracking-[0.05em] px-8 py-3.5 rounded hover:bg-[#7ECBEF] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(75,170,220,0.3)] transition-all"
              >
                Become a Member
              </Link>
              <a
                href="#programs"
                className="inline-block bg-transparent text-[#7ECBEF] border border-primary/40 font-semibold text-sm uppercase tracking-[0.05em] px-8 py-3.5 rounded hover:border-primary hover:bg-primary/[0.08] transition-all"
              >
                Our Programs
              </a>
            </div>
          </div>

          <div className="hidden md:block animate-float">
            <BrandLogo size={340} />
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="bg-[rgba(26,74,138,0.25)] border-y border-primary/15 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-x-20 gap-y-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-[2.8rem] leading-none tracking-[0.04em] text-primary">{s.num}</div>
              <div className="text-[11px] font-mono text-muted-foreground tracking-wider uppercase mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-mono text-[11px] text-primary tracking-[0.15em] uppercase mb-3">// Who We Are</p>
            <h2 className="font-display text-4xl md:text-6xl leading-none tracking-[0.03em]">
              Nigeria's Boldest <span className="text-primary">Cyber</span> Student Body
            </h2>
            <p className="text-base text-muted-foreground leading-[1.85] mt-6">
              DOCSSA is the official student association of the Department of Cyber Security, University of Uyo. We bridge
              the gap between classroom learning and real-world digital defense — equipping students with hands-on CTF
              experience, industry mentorship, and a powerful alumni network.
            </p>

            <div className="flex flex-col gap-5 mt-8">
              {pillars.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 bg-primary/10 border border-primary/30 rounded-lg flex items-center justify-center mt-0.5">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-[0.95rem] font-semibold text-foreground mb-1">{title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-gradient-to-br from-[rgba(26,74,138,0.4)] to-[rgba(13,31,78,0.6)] border border-primary/20 rounded-2xl p-10 overflow-hidden">
              <div className="absolute top-0 left-5 right-5 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="flex justify-center mb-8">
                <BrandLogo size={160} />
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="bg-primary/10 border border-primary/25 rounded px-3 py-1 text-xs font-mono text-[#7ECBEF] tracking-tight"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="mx-6 md:mx-12 border-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* PROGRAMS */}
      <section id="programs" className="py-24 px-6 md:px-12 bg-[rgba(13,31,78,0.5)]">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="font-mono text-[11px] text-primary tracking-[0.15em] uppercase mb-3">// What We Do</p>
          <h2 className="font-display text-4xl md:text-6xl leading-none tracking-[0.03em]">
            Our <span className="text-primary">Programs</span>
          </h2>
          <p className="text-muted-foreground text-[0.95rem] leading-[1.7] mt-4">
            From beginner workshops to advanced research, DOCSSA runs programs designed to fast-track your cybersecurity
            career.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="brand-card rounded-xl p-8 group relative overflow-hidden cursor-pointer">
              <Icon className="h-8 w-8 text-primary mb-5" />
              <h3 className="font-display text-2xl tracking-[0.03em] text-foreground mb-3">{title}</h3>
              <p className="text-sm text-muted-foreground leading-[1.7]">{desc}</p>
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </div>
          ))}
        </div>
      </section>

      {/* EXECUTIVES */}
      <section id="executives" className="py-24 px-6 md:px-12">
        <div className="max-w-xl mx-auto text-center mb-16">
          <p className="font-mono text-[11px] text-primary tracking-[0.15em] uppercase mb-3">// Leadership</p>
          <h2 className="font-display text-4xl md:text-6xl leading-none tracking-[0.03em]">
            The <span className="text-primary">Executive</span> Council
          </h2>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {executives.map((exec, i) => (
            <div
              key={`${exec.role}-${i}`}
              className="text-center p-8 px-4 bg-[rgba(8,21,64,0.6)] border border-primary/15 rounded-xl hover:border-primary/35 hover:-translate-y-0.5 transition-all"
            >
              <div className="w-[72px] h-[72px] rounded-full mx-auto mb-4 flex items-center justify-center font-display text-2xl tracking-wider text-white bg-gradient-to-br from-[#1A4A8A] to-[#4BAADC]">
                {exec.initials}
              </div>
              <div className="text-[0.95rem] font-semibold text-foreground mb-1">{exec.name}</div>
              <div className="text-[11px] font-mono text-primary tracking-wide uppercase leading-relaxed">{exec.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BAND */}
      <div
        id="join"
        className="relative bg-gradient-to-br from-[#1A4A8A] to-[#081540] border-y border-primary/20 text-center py-20 px-6 overflow-hidden"
      >
        <span
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[18vw] text-white/[0.03] tracking-[0.1em] whitespace-nowrap pointer-events-none"
        >
          DOCSSA
        </span>
        <div className="relative">
          <h2 className="font-display text-4xl md:text-6xl tracking-[0.04em] text-foreground mb-4">
            Ready to Defend the Digital Frontier?
          </h2>
          <p className="text-base text-muted-foreground max-w-lg mx-auto mb-10 leading-[1.75]">
            Join over 200 cybersecurity students building skills, friendships, and careers at Nigeria's premier cyber
            department.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-primary text-primary-foreground font-bold text-sm uppercase tracking-[0.05em] px-8 py-3.5 rounded hover:bg-[#7ECBEF] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(75,170,220,0.3)] transition-all"
          >
            Apply for Membership
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer
        id="contact"
        className="bg-[#081540] border-t border-primary/10 px-6 md:px-12 py-10 flex flex-wrap items-center justify-between gap-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border-2 border-primary flex items-center justify-center bg-card">
            <span className="font-display text-[10px] tracking-[0.08em] text-primary">DSA</span>
          </div>
          <span className="font-display text-lg tracking-[0.08em] text-[#7ECBEF]">DOCSSA · UniUyo</span>
        </div>
        <div className="flex gap-8">
          <a href="#about" className="text-xs text-muted-foreground hover:text-[#7ECBEF] transition-colors">
            About
          </a>
          <a href="#programs" className="text-xs text-muted-foreground hover:text-[#7ECBEF] transition-colors">
            Programs
          </a>
          <a href="#contact" className="text-xs text-muted-foreground hover:text-[#7ECBEF] transition-colors">
            Contact
          </a>
          <Link to="/lab" className="text-xs text-muted-foreground hover:text-[#7ECBEF] transition-colors">
            Portal
          </Link>
        </div>
        <div className="text-xs text-muted-foreground font-mono tracking-tight">
          © 2026 DOCSSA — Dept. of Cyber Security, University of Uyo
        </div>
      </footer>
    </div>
  );
}
