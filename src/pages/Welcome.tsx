import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Zap,
  BookOpen,
  Swords,
  GraduationCap,
  Microscope,
  Briefcase,
  Code2,
  ChevronRight,
  Menu,
  X,
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
    tag: "offensive_sec",
    desc: "Internal and inter-university Capture The Flag competitions covering web exploitation, cryptography, forensics, and reverse engineering.",
  },
  {
    icon: Code2,
    title: "Skills Bootcamp",
    tag: "training",
    desc: "Intensive short courses on networking, Linux, Python for security, and cloud security fundamentals â€” fully free for DOCSSA members.",
  },
  {
    icon: Microscope,
    title: "Research Cluster",
    tag: "research",
    desc: "Faculty-supervised research groups publishing on AI security, threat intelligence, and digital forensics for African contexts.",
  },
  {
    icon: Briefcase,
    title: "Industry Connect",
    tag: "career",
    desc: "Monthly guest lectures and internship pipelines with Lagos, Abuja, and remote cybersecurity firms â€” helping you land your first role.",
  },
  {
    icon: Zap,
    title: "Hackathon Squad",
    tag: "competition",
    desc: "Team formation and coaching for national hackathons â€” DOCSSA members have placed in multiple regional tech competitions.",
  },
  {
    icon: BookOpen,
    title: "Exam Prep Hub",
    tag: "academic",
    desc: "Past question banks, CBT practice tools, and peer-led revision sessions to keep your GPA strong while you skill up.",
  },
];

const tags = ["Cybersecurity", "UniUyo", "CTF", "Ethical Hacking", "Python", "Networking", "Nigeria", "OSINT"];

const stats = [
  { num: "200+", label: "Active Members" },
  { num: "12", label: "Programs Yearly" },
  { num: "5", label: "Exec Portfolios" },
  { num: "1st", label: "CyberSec Dept" },
];

const executives = [
  { initials: "PR", name: "President", role: "Executive President" },
  { initials: "VP", name: "Vice President", role: "Vice President" },
  { initials: "SG", name: "Sec. General", role: "Secretary General" },
  { initials: "FO", name: "Treasurer", role: "Financial Officer" },
  { initials: "PR", name: "PRO", role: "Public Relations" },
];

export default function Welcome() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 brand-glass border-b border-primary/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
          <Link to="/welcome" className="flex items-center gap-3">
            <img src="/logo-256.png" alt="DOCSSA" className="h-9 w-9 shrink-0 brand-logo" />
            <div className="leading-none">
              <span className="font-display text-xl tracking-[0.12em] text-primary font-bold">DOCSSA</span>
              <span className="hidden sm:inline font-mono text-[9px] text-muted-foreground/40 ml-2 tracking-widest">// UNIUYO</span>
            </div>
          </Link>

          <ul className="hidden md:flex items-center gap-8 list-none">
            {["about", "programs", "executives", "contact"].map((link) => (
              <li key={link}>
                <a
                  href={`#${link}`}
                  className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground hover:text-primary transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden sm:block font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors px-3 py-2"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] font-bold px-5 py-2.5 bg-primary text-primary-foreground hover:bg-brand-ember-bright transition-all"
            >
              Join <ChevronRight className="h-3 w-3" />
            </Link>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-primary/10 bg-sidebar/98 backdrop-blur-sm">
            <div className="px-6 py-5 space-y-1">
              {["about", "programs", "executives", "contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3 border-b border-primary/8 font-mono text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                >
                  {link}
                  <ChevronRight className="h-3.5 w-3.5 opacity-40" />
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center border border-primary/30 text-primary font-mono text-xs uppercase tracking-widest py-3 hover:bg-primary/5 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest font-bold py-3 hover:bg-brand-ember-bright transition-colors"
                >
                  Join Now →
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-28 pb-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 brand-grid-bg" />
        <div className="absolute inset-0 scanlines opacity-25 pointer-events-none" />
        <div
          className="absolute -top-40 -left-20 w-[900px] h-[900px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,100,0,0.18) 0%, transparent 62%)" }}
        />
        <div
          className="absolute bottom-0 -right-20 w-[600px] h-[600px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,136,0,0.07) 0%, transparent 65%)" }}
        />

        <div className="relative z-10 max-w-7xl w-full mx-auto grid md:grid-cols-[1fr_360px] gap-12 lg:gap-20 items-center">
          {/* Left: Main content */}
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-3 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
              <span className="font-mono text-[10px] text-primary tracking-widest uppercase">
                System Online Â· UniUyo Â· Est. 2024
              </span>
            </div>

            <h1 className="font-display text-[4.5rem] sm:text-[6rem] md:text-[7rem] lg:text-[8.5rem] leading-[0.88] tracking-[0.02em] text-foreground">
              DEFEND.
              <br />
              <span className="text-primary neon-text-glow">INNOVATE.</span>
              <br />
              LEAD.
            </h1>

            <div className="mt-8 mb-10">
              <p className="font-mono text-[10px] text-primary/45 mb-2 tracking-widest">// mission statement</p>
              <p className="font-mono text-sm text-muted-foreground leading-[1.85] max-w-lg">
                The Department of Cyber Security Students Association at UniUyo â€” building the next generation of
                digital defenders, ethical hackers, and cybersecurity leaders across Nigeria.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.1em] font-bold px-7 py-3.5 hover:bg-brand-ember-bright hover:shadow-[0_6px_24px_rgba(255,136,0,0.35)] transition-all"
              >
                <span>Enlist Now</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
              <a
                href="#programs"
                className="inline-flex items-center gap-2 border border-primary/35 text-primary font-mono text-xs uppercase tracking-[0.1em] px-7 py-3.5 hover:border-primary hover:bg-primary/5 transition-all"
              >
                Our Programs
              </a>
            </div>
          </div>

          {/* Right: Terminal HUD panel */}
          <div className="hidden md:block animate-fade-in" style={{ animationDelay: "0.15s" }}>
            <div className="border border-primary/20 bg-card/85 backdrop-blur-sm overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-primary/10 bg-primary/[0.04]">
                <span className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-brand-ember-bright/55" />
                <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
                <span className="ml-2 font-mono text-[9px] text-muted-foreground/60 tracking-wider">docssa_portal â€” bash</span>
              </div>
              <div className="p-5 font-mono text-xs space-y-1.5">
                <p>
                  <span className="text-primary">$</span>{" "}
                  <span className="text-muted-foreground">connect --host docssa.uniuyo.ng</span>
                </p>
                <p className="text-muted-foreground/50 text-[10px]">Establishing secure connection...</p>
                <p className="text-primary text-[10px]">âœ“ Connection established.</p>
                <div className="mt-4">
                  <p>
                    <span className="text-primary">$</span>{" "}
                    <span className="text-muted-foreground">status --verbose</span>
                  </p>
                </div>
                <div className="mt-2 space-y-1 text-[11px]">
                  <p>
                    <span className="text-primary/55">[DEPT]</span>{" "}
                    <span className="text-foreground">CYBER_SECURITY</span>
                  </p>
                  <p>
                    <span className="text-primary/55">[UNIV]</span>{" "}
                    <span className="text-foreground">UNIVERSITY_OF_UYO</span>
                  </p>
                  <p>
                    <span className="text-primary/55">[YEAR]</span>{" "}
                    <span className="text-foreground">EST._2024</span>
                  </p>
                  <p>
                    <span className="text-primary/55">[STAT]</span>{" "}
                    <span className="text-primary font-bold">â— ONLINE</span>
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-primary/10 space-y-1.5 text-[11px]">
                  {stats.map((s) => (
                    <p key={s.label}>
                      <span className="text-primary/55">
                        [{s.label.toUpperCase().replace(/ /g, "_")}]
                      </span>{" "}
                      <span className="text-foreground font-bold">{s.num}</span>
                    </p>
                  ))}
                </div>
                <p className="mt-4 text-primary text-base leading-none animate-pulse-dot">â–ˆ</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="bg-primary/[0.04] border-y border-primary/12 py-8 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-[2.8rem] leading-none tracking-[0.04em] text-primary neon-text-glow">
                {s.num}
              </div>
              <div className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase mt-1.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="font-mono text-[10px] text-primary tracking-[0.2em] uppercase mb-3">// 01 â€” Who We Are</p>
            <h2 className="font-display text-4xl md:text-6xl leading-none tracking-[0.02em]">
              Nigeria's Boldest{" "}
              <span className="text-primary">Cyber</span>
              <br />
              Student Body
            </h2>
            <p className="font-mono text-sm text-muted-foreground leading-[1.85] mt-6">
              DOCSSA is the official student association of the Department of Cyber Security, University of Uyo. We
              bridge the gap between classroom learning and real-world digital defense â€” equipping students with
              hands-on CTF experience, industry mentorship, and a powerful alumni network.
            </p>

            <div className="flex flex-col gap-5 mt-8">
              {pillars.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-9 h-9 shrink-0 border border-primary/25 bg-primary/5 flex items-center justify-center mt-0.5">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-mono text-sm font-bold text-foreground mb-1">{title}</h4>
                    <p className="font-mono text-[11px] text-muted-foreground leading-[1.75]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills terminal */}
          <div>
            <div className="border border-primary/18 bg-card/60 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-primary/10 bg-primary/[0.04]">
                <span className="w-2 h-2 rounded-full bg-destructive/55" />
                <span className="w-2 h-2 rounded-full bg-brand-ember-bright/45" />
                <span className="w-2 h-2 rounded-full bg-primary/55" />
                <span className="ml-2 font-mono text-[9px] text-muted-foreground/50 tracking-wider">skills.txt â€” vim</span>
              </div>
              <div className="p-6 font-mono text-xs">
                <p className="text-primary/50 mb-3">$ grep -r skills ./docssa</p>
                <p className="text-muted-foreground/45 mb-4 text-[10px]">Found {tags.length} matches in /domains/</p>
                <div className="flex justify-center mb-6">
                  <img src="/logo-256.png" alt="DOCSSA" className="h-28 w-28 opacity-90 brand-logo" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="border border-primary/25 bg-primary/5 px-3 py-1.5 text-[11px] text-primary/85 tracking-tight"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-primary/10 space-y-2 text-[11px]">
                  <p>
                    <span className="text-primary/50">STATUS</span>
                    {"  "}
                    <span className="text-primary">â— ACTIVELY RECRUITING</span>
                  </p>
                  <p>
                    <span className="text-primary/50">LOCATION</span>
                    {"  "}
                    <span className="text-muted-foreground">University of Uyo, Nigeria</span>
                  </p>
                  <p>
                    <span className="text-primary/50">FOCUS</span>
                    {"    "}
                    <span className="text-muted-foreground">Offensive & Defensive Security</span>
                  </p>
                  <p>
                    <span className="text-primary/50">TOOLS</span>
                    {"    "}
                    <span className="text-muted-foreground">Kali, Wireshark, Burp, Python</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="mx-6 md:mx-12 border-0 h-px bg-gradient-to-r from-transparent via-primary/18 to-transparent" />

      {/* PROGRAMS */}
      <section id="programs" className="py-24 px-6 md:px-12 bg-primary/[0.025]">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="font-mono text-[10px] text-primary tracking-[0.2em] uppercase mb-3">// 02 â€” What We Do</p>
          <h2 className="font-display text-4xl md:text-6xl leading-none tracking-[0.02em]">
            Our <span className="text-primary">Programs</span>
          </h2>
          <p className="font-mono text-[11px] text-muted-foreground leading-[1.75] mt-4 max-w-lg mx-auto">
            From beginner workshops to advanced research, DOCSSA runs programs designed to fast-track your
            cybersecurity career.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {programs.map(({ icon: Icon, title, tag, desc }) => (
            <div key={title} className="brand-card group relative overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-2 border-b border-primary/8 bg-primary/[0.03]">
                <span className="w-2 h-2 rounded-full bg-destructive/45" />
                <span className="w-2 h-2 rounded-full bg-brand-ember-bright/35" />
                <span className="w-2 h-2 rounded-full bg-primary/45" />
                <span className="ml-2 font-mono text-[9px] text-primary/35 tracking-widest">[{tag}]</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 border border-primary/25 bg-primary/5 flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <h3 className="font-display text-[1.35rem] tracking-[0.04em] text-foreground mb-2.5">{title}</h3>
                <p className="font-mono text-[11px] text-muted-foreground leading-[1.75]">{desc}</p>
              </div>
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </div>
          ))}
        </div>
      </section>

      {/* EXECUTIVES */}
      <section id="executives" className="py-24 px-6 md:px-12">
        <div className="max-w-xl mx-auto text-center mb-16">
          <p className="font-mono text-[10px] text-primary tracking-[0.2em] uppercase mb-3">// 03 â€” Leadership</p>
          <h2 className="font-display text-4xl md:text-6xl leading-none tracking-[0.02em]">
            The <span className="text-primary">Executive</span> Council
          </h2>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {executives.map((exec, i) => (
            <div
              key={`${exec.role}-${i}`}
              className="text-center p-5 border border-primary/12 bg-card/60 hover:border-primary/38 hover:-translate-y-0.5 transition-all group"
            >
              <div className="font-mono text-[8px] text-primary/35 tracking-widest mb-3 uppercase">[ID VERIFIED]</div>
              <div className="w-16 h-16 mx-auto mb-3 border border-primary/30 bg-primary/5 flex items-center justify-center font-display text-2xl tracking-wider text-primary group-hover:neon-glow transition-all">
                {exec.initials}
              </div>
              <div className="font-mono text-xs font-bold text-foreground mb-1">{exec.name}</div>
              <div className="font-mono text-[9px] text-primary tracking-wide uppercase leading-relaxed">{exec.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BAND */}
      <div
        id="join"
        className="relative border-y border-primary/18 text-center py-24 px-6 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1A0E00 0%, #0D0906 55%, #180A00 100%)" }}
      >
        <div className="absolute inset-0 scanlines opacity-18 pointer-events-none" />
        <div className="absolute inset-0 brand-grid-bg opacity-60" />
        <span
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[18vw] text-primary/[0.035] tracking-[0.1em] whitespace-nowrap pointer-events-none select-none"
        >
          DOCSSA
        </span>
        <div className="relative">
          <p className="font-mono text-[10px] text-primary/60 tracking-[0.25em] uppercase mb-5">// Ready to join?</p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-[0.03em] text-foreground mb-4">
            DEFEND THE
            <br />
            <span className="text-primary neon-text-glow">DIGITAL FRONTIER</span>
          </h2>
          <p className="font-mono text-sm text-muted-foreground max-w-lg mx-auto mb-10 leading-[1.8]">
            Join over 200 cybersecurity students building skills, friendships, and careers at Nigeria's premier cyber
            department.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.1em] font-bold px-10 py-4 hover:bg-brand-ember-bright hover:shadow-[0_8px_32px_rgba(255,136,0,0.4)] transition-all"
          >
            <span>Apply for Membership</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer
        id="contact"
        className="bg-background border-t border-primary/8 px-6 md:px-12 py-8 flex flex-wrap items-center justify-between gap-6"
      >
        <div className="flex items-center gap-3">
          <img src="/logo-256.png" alt="DOCSSA" className="h-8 w-8 shrink-0 brand-logo" />
          <span className="font-mono text-sm text-primary/60">DOCSSA Â· UniUyo</span>
        </div>
        <div className="flex gap-6">
          {["About", "Programs", "Contact"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors tracking-wide"
            >
              {l}
            </a>
          ))}
          <Link
            to="/lab"
            className="font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors tracking-wide"
          >
            Portal
          </Link>
        </div>
        <div className="font-mono text-[10px] text-muted-foreground/40 tracking-tight">
          Â© 2026 DOCSSA â€” Dept. of Cyber Security, University of Uyo
        </div>
      </footer>
    </div>
  );
}


