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
  Eye,
  Lock,
  Brain,
  Users,
  Globe,
  FlaskConical,
  MapPin,
  Mail,
} from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Programmes", href: "#programmes" },
  { label: "Staff", href: "#staff" },
  { label: "Research", href: "#research" },
  { label: "Student Body", href: "#student-body" },
  { label: "Contact", href: "#contact" },
];

const heroStats = [
  { num: "B.Sc.", label: "Degree Awarded" },
  { num: "4 Yrs", label: "UTME Duration" },
  { num: "3 Yrs", label: "Direct Entry" },
  { num: "Computing", label: "Our Faculty" },
];

const objectives = [
  {
    code: "01",
    tag: "detect_prevent",
    title: "Detect & Prevent",
    subtitle: "Cyber-Fraud Detection & Prevention",
    icon: Eye,
    desc: "Produce graduates with a requisite foundation in cybersecurity knowledge, skills and strategies to detect and prevent cyber-fraud at organisational and national scale.",
  },
  {
    code: "02",
    tag: "analyse_develop",
    title: "Analyse & Develop",
    subtitle: "Threat Analysis & Detective Coding",
    icon: Code2,
    desc: "Empower graduates to analyse cybersecurity threats, attacks and risks for organisations — with the capacity to develop detective codes and supportive software agents.",
  },
  {
    code: "03",
    tag: "protect_investigate",
    title: "Protect & Investigate",
    subtitle: "Cryptography & Digital Forensics",
    icon: Lock,
    desc: "Develop graduates with knowledge of cryptography, steganography, and digital forensic science techniques for privacy protection and cybercrime detection.",
  },
  {
    code: "04",
    tag: "think_strategise",
    title: "Think & Strategise",
    subtitle: "Cyber Intelligence & Strategy",
    icon: Brain,
    desc: "Produce graduates who can think critically about cyber intelligence security issues, and develop and implement tactical strategies drawing on national and international case studies.",
  },
  {
    code: "05",
    tag: "lead_employ",
    title: "Lead & Employ",
    subtitle: "Professional Practice & Entrepreneurship",
    icon: Briefcase,
    desc: "Prepare graduates for self-employment, cybersecurity-based job placement, and professional practice in government agencies and private industries across Nigeria and Africa.",
  },
  {
    code: "06",
    tag: "understand_impact",
    title: "Understand Impact",
    subtitle: "Cybercrime Impact & Business Security",
    icon: Shield,
    desc: "Equip graduates to understand the impact of cybercrime on business and the public, and implement specific security practices and techniques to enhance systems security.",
  },
];

const programmes = [
  {
    icon: GraduationCap,
    tag: "utme_entry",
    title: "B.Sc. Cybersecurity — UTME",
    duration: "4 Years",
    desc: "Four-year undergraduate degree programme. Full immersion in cybersecurity theory, practice, and professional ethics.",
    requirements: [
      "English Language (Credit)",
      "Mathematics (Credit)",
      "Physics (Credit)",
      "Two other Science subjects",
      "Valid JAMB UTME Score",
    ],
  },
  {
    icon: Zap,
    tag: "direct_entry",
    title: "B.Sc. Cybersecurity — Direct Entry",
    duration: "3 Years (200L)",
    desc: "Three-year route for candidates entering at 200 Level with prior tertiary qualifications in a relevant science field.",
    requirements: [
      "University/ND/NCE credit level",
      "Five SSC credits in Science subjects",
      "English Language (Credit)",
      "Mathematics (Credit)",
      "Physics (Credit)",
    ],
  },
  {
    icon: Microscope,
    tag: "postgraduate",
    title: "Postgraduate Research",
    duration: "MPhil / PhD — Upcoming",
    desc: "Postgraduate research pathways in emerging areas of cybersecurity, digital forensics, and AI security — to be announced.",
    requirements: [
      "Details to be announced",
      "Digital Forensics track",
      "AI Security track",
      "Cybercrime Law track",
    ],
  },
];

const staffRoles = [
  { initials: "UE", role: "Head of Department", specialisation: "Department of Cybersecurity", isHOD: true, name: "Prof. Uyinomen O. Ekong" },
  { initials: "SL", role: "Senior Lecturer", specialisation: "Network Security · Cryptography", isHOD: false },
  { initials: "SL", role: "Senior Lecturer", specialisation: "Digital Forensics · Cyber Law", isHOD: false },
  { initials: "L2", role: "Lecturer II", specialisation: "Ethical Hacking · Penetration Testing", isHOD: false },
  { initials: "L2", role: "Lecturer II", specialisation: "Information Security · Risk Management", isHOD: false },
  { initials: "L2", role: "Lecturer II", specialisation: "Cloud Security · IoT Security", isHOD: false },
];

const researchAreas = [
  {
    icon: Shield,
    title: "Threat Intelligence & Cyber Defence",
    status: "Active",
    desc: "Investigating proactive cyber threat intelligence frameworks tailored to the Nigerian enterprise and government environment, including critical national information infrastructure protection.",
  },
  {
    icon: FlaskConical,
    title: "Digital Forensics & Cybercrime Investigation",
    status: "Active",
    desc: "Developing forensic science methodologies for gathering, analysing, and presenting digital evidence in a legally admissible manner for Nigerian courts and organisations.",
  },
  {
    icon: Lock,
    title: "Cryptography & Data Privacy",
    status: "Active",
    desc: "Research into cryptographic techniques, steganography, and privacy-preserving mechanisms for protecting sensitive data in corporate and government systems across Africa.",
  },
  {
    icon: Brain,
    title: "AI & Machine Learning for Security",
    status: "Emerging",
    desc: "Exploring AI-powered anomaly detection, intrusion detection systems, and automated threat response frameworks suited to the African network infrastructure context.",
  },
  {
    icon: Globe,
    title: "IoT Security & Privacy",
    status: "Emerging",
    desc: "Addressing security vulnerabilities in Internet of Things deployments across smart agriculture, healthcare, and energy systems in Nigeria and Sub-Saharan Africa.",
  },
  {
    icon: BookOpen,
    title: "Cybercrime Law & Countermeasures",
    status: "Emerging",
    desc: "Interdisciplinary research at the intersection of Nigerian cybercrime law, ethics of professional cybersecurity practice, and the legal framework governing digital evidence.",
  },
];

const docsssaActivities = [
  { icon: Swords, label: "CTF Competitions & Ethical Hacking Events" },
  { icon: Code2, label: "Skills Bootcamps & Industry Workshops" },
  { icon: BookOpen, label: "Academic Support & Exam Preparation" },
  { icon: Users, label: "Hackathon Teams & National Competitions" },
  { icon: Briefcase, label: "Industry Networking & Internship Pipelines" },
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

          <ul className="hidden lg:flex items-center gap-7 list-none">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground hover:text-primary transition-colors"
                >
                  {label}
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
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] font-bold px-5 py-2.5 bg-primary text-primary-foreground hover:bg-brand-gold-bright transition-all"
            >
              Apply Now <ChevronRight className="h-3 w-3" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-primary/10 bg-sidebar/98 backdrop-blur-sm">
            <div className="px-6 py-5 space-y-1">
              {navLinks.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3 border-b border-primary/8 font-mono text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                >
                  {label}
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
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest font-bold py-3 hover:bg-brand-gold-bright transition-colors"
                >
                  Apply Now →
                </a>
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
          style={{ background: "radial-gradient(circle, rgba(30,80,200,0.22) 0%, transparent 62%)" }}
        />
        <div
          className="absolute bottom-0 -right-20 w-[600px] h-[600px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,184,0,0.07) 0%, transparent 65%)" }}
        />

        <div className="relative z-10 max-w-7xl w-full mx-auto grid md:grid-cols-[1fr_360px] gap-12 lg:gap-20 items-center">
          {/* Left */}
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-3 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
              <span className="font-mono text-[10px] text-primary tracking-widest uppercase">
                Faculty of Computing · University of Uyo
              </span>
            </div>

            <h1 className="font-display text-[3.5rem] sm:text-[5rem] md:text-[5.5rem] lg:text-[7rem] leading-[0.9] tracking-[0.02em] text-foreground">
              DEPARTMENT
              <br />
              <span className="text-primary neon-text-glow">OF CYBER</span>
              <br />
              SECURITY
            </h1>

            <div className="mt-8 mb-10">
              <p className="font-mono text-[10px] text-primary/45 mb-2 tracking-widest">// mission</p>
              <p className="font-mono text-sm text-muted-foreground leading-[1.85] max-w-lg">
                Building Nigeria's next generation of digital defenders. We equip graduates with the knowledge, skills,
                and ethical grounding to protect organisations, critical infrastructure, and cyberspace — nationally
                and globally.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#programmes"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.1em] font-bold px-7 py-3.5 hover:bg-brand-gold-bright hover:shadow-[0_6px_24px_rgba(255,184,0,0.35)] transition-all"
              >
                Explore Programmes
                <ChevronRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 border border-primary/35 text-primary font-mono text-xs uppercase tracking-[0.1em] px-7 py-3.5 hover:border-primary hover:bg-primary/5 transition-all"
              >
                About the Department
              </a>
            </div>
          </div>

          {/* Right: Terminal HUD */}
          <div className="hidden md:block animate-fade-in" style={{ animationDelay: "0.15s" }}>
            <div className="border border-primary/20 bg-card/85 backdrop-blur-sm overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-primary/10 bg-primary/[0.04]">
                <span className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-brand-gold/55" />
                <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
                <span className="ml-2 font-mono text-[9px] text-muted-foreground/60 tracking-wider">dept_portal — bash</span>
              </div>
              <div className="p-5 font-mono text-xs space-y-1.5">
                <p>
                  <span className="text-primary">$</span>{" "}
                  <span className="text-muted-foreground">connect --host dept.cybersec.uniuyo.edu.ng</span>
                </p>
                <p className="text-muted-foreground/50 text-[10px]">Establishing secure connection...</p>
                <p className="text-primary text-[10px]">✓ Connection established.</p>
                <div className="mt-4 space-y-1 text-[11px]">
                  <p>
                    <span className="text-primary/55">[DEPT]</span>{" "}
                    <span className="text-foreground">CYBERSECURITY</span>
                  </p>
                  <p>
                    <span className="text-primary/55">[FACULTY]</span>{" "}
                    <span className="text-foreground">COMPUTING</span>
                  </p>
                  <p>
                    <span className="text-primary/55">[UNIV]</span>{" "}
                    <span className="text-foreground">UNIVERSITY_OF_UYO</span>
                  </p>
                  <p>
                    <span className="text-primary/55">[HOD]</span>{" "}
                    <span className="text-foreground">U.O._EKONG</span>
                  </p>
                  <p>
                    <span className="text-primary/55">[STATUS]</span>{" "}
                    <span className="text-primary font-bold">● ONLINE</span>
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-primary/10 space-y-1.5 text-[11px]">
                  {heroStats.map((s) => (
                    <p key={s.label}>
                      <span className="text-primary/55">
                        [{s.label.toUpperCase().replace(/ /g, "_")}]
                      </span>{" "}
                      <span className="text-foreground font-bold">{s.num}</span>
                    </p>
                  ))}
                </div>
                <p className="mt-4 text-primary text-base leading-none animate-pulse-dot">█</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="bg-primary/[0.04] border-y border-primary/12 py-8 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {heroStats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-[2.4rem] leading-none tracking-[0.04em] text-primary neon-text-glow">
                {s.num}
              </div>
              <div className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase mt-1.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* UNIVERSITY MISSION / VISION / MOTTO BANNER */}
      <div className="border-y border-primary/10 bg-primary/[0.03] py-12 px-6 md:px-12">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 md:gap-12">
          <div className="text-center md:text-left">
            <p className="font-mono text-[9px] text-primary/40 tracking-[0.25em] uppercase mb-3">// Motto</p>
            <p className="font-display text-xl tracking-[0.06em] text-primary neon-text-glow">
              Unity, Learning<br />and Service
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="font-mono text-[9px] text-primary/40 tracking-[0.25em] uppercase mb-3">// Vision</p>
            <p className="font-mono text-[11px] text-muted-foreground leading-[1.85] italic border-l-2 border-primary/35 pl-4 mb-4">
              "To be a centre of academic excellence by utilizing the available human and technological resources for
              teaching, research, community service and sustainable development."
            </p>
            <p className="font-mono text-[9px] text-primary/40 tracking-[0.25em] uppercase mb-2">// Mission</p>
            <p className="font-mono text-[11px] text-muted-foreground leading-[1.85] italic border-l-2 border-primary/20 pl-4">
              "To diligently pursue scholarship and deploy its output for human capacity development and economic growth
              in the society, with active participation in ICT, sensitivity to Nigeria's rich cultural heritage and
              responsiveness to global environmental changes."
            </p>
          </div>
        </div>
      </div>

      {/* PUBLIC FEEDS — Department Updates */}
      <section className="py-20 px-6 md:px-12 border-b border-primary/8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="font-mono text-[10px] text-primary tracking-[0.2em] uppercase mb-2">// Department Feed</p>
              <h2 className="font-display text-3xl md:text-4xl leading-none tracking-[0.02em]">
                News & <span className="text-primary">Updates</span>
              </h2>
            </div>
            <span className="hidden sm:flex items-center gap-1.5 font-mono text-[9px] text-primary/60 tracking-widest border border-primary/20 px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
              LIVE FEED
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { date: "MAY 2026", tag: "WORKSHOP", title: "IoT Security Practical Session", body: "Hands-on practical on securing Internet of Things deployments — sensors, gateways, and protocol analysis. Open to 300L and 400L students.", badge: "Upcoming" },
              { date: "APR 2026", tag: "COMPETITION", title: "CTF Challenge — Team Registration", body: "DOCSSA is registering teams for the 2026 national Capture the Flag competition. Contact the Software & Hardware Director to join.", badge: "Open" },
              { date: "APR 2026", tag: "ACADEMIC", title: "2025/2026 Second Semester Registration", body: "Course registration for the second semester is ongoing. Minimum 15 credit units. Ensure all fees are cleared before submitting CRF.", badge: "Ongoing" },
              { date: "MAR 2026", tag: "INDUSTRY", title: "Tech Talk: AI in Cyber Defence", body: "A guest lecture series on artificial intelligence applications in cybersecurity — threat detection, anomaly identification, and automated response.", badge: "Past" },
              { date: "FEB 2026", tag: "EXAM PREP", title: "CBT Mock Tests Available", body: "Practice CBT examination sessions now available on the DOCSSA portal. Covers GST, core cybersecurity, and elective modules.", badge: "Available" },
              { date: "JAN 2026", tag: "NOTICE", title: "SIWES Placement Announcement", body: "Students scheduled for SIWES should liaise with the department office for placement letters and approved industry partner listing.", badge: "Notice" },
            ].map(({ date, tag, title, body, badge }) => (
              <div key={title} className="brand-card group relative overflow-hidden flex flex-col">
                <div className="flex items-center justify-between px-4 py-2 border-b border-primary/8 bg-primary/[0.03]">
                  <span className="font-mono text-[8px] text-primary/40 tracking-widest">[{tag}]</span>
                  <span className={`font-mono text-[8px] tracking-widest px-2 py-0.5 border ${
                    badge === "Upcoming" || badge === "Open" || badge === "Ongoing"
                      ? "border-primary/30 text-primary bg-primary/5"
                      : badge === "Available"
                      ? "border-blue-400/30 text-blue-300"
                      : "border-muted-foreground/20 text-muted-foreground/40"
                  }`}>{badge}</span>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <p className="font-mono text-[9px] text-muted-foreground/40 tracking-widest mb-2">{date}</p>
                  <h3 className="font-display text-[1rem] tracking-[0.03em] text-foreground mb-2">{title}</h3>
                  <p className="font-mono text-[10px] text-muted-foreground/65 leading-[1.75] flex-1">{body}</p>
                </div>
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-[10px] text-primary tracking-[0.2em] uppercase mb-3">// 01 — About the Department</p>
          <h2 className="font-display text-4xl md:text-6xl leading-none tracking-[0.02em] mb-16">
            Shaping the Cyber <span className="text-primary">Defenders</span>
            <br />
            of Tomorrow
          </h2>

          <div className="grid md:grid-cols-[1fr_340px] gap-16 items-start">
            <div>
              <p className="font-mono text-sm text-muted-foreground leading-[1.85] mb-6">
                The Department of Cybersecurity at the University of Uyo is one of the pioneering departments within
                the Faculty of Computing. It was established to address the growing national and global demand for
                qualified cybersecurity professionals capable of protecting digital infrastructure and responding to
                evolving cyber threats.
              </p>

              <blockquote className="border-l-2 border-primary/50 pl-5 mb-8">
                <p className="font-mono text-[11px] text-muted-foreground/80 leading-[1.9] italic">
                  "The philosophy of this programme is to build capacity and develop human capital in the field of
                  cybersecurity, to safeguard business transactions, corporate assets, critical infrastructure and
                  all cyber operations in cyberspace, nationally and globally."
                </p>
              </blockquote>

              <p className="font-mono text-sm text-muted-foreground leading-[1.85]">
                Our graduates leave equipped to think critically about cyber intelligence issues, develop and implement
                security strategies, and pursue careers in government agencies, private enterprise, consultancy, or
                entrepreneurship. We place particular emphasis on practical, hands-on learning alongside rigorous
                academic theory.
              </p>
            </div>

            {/* Info terminal */}
            <div className="border border-primary/18 bg-card/60 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-primary/10 bg-primary/[0.04]">
                <span className="w-2 h-2 rounded-full bg-destructive/55" />
                <span className="w-2 h-2 rounded-full bg-brand-gold/45" />
                <span className="w-2 h-2 rounded-full bg-primary/55" />
                <span className="ml-2 font-mono text-[9px] text-muted-foreground/50 tracking-wider">dept_info.txt</span>
              </div>
              <div className="p-6 font-mono text-[11px] space-y-3">
                <div className="flex justify-center mb-4">
                  <img src="/logo-256.png" alt="DOCSSA" className="h-20 w-20 opacity-90 brand-logo" />
                </div>
                {[
                  { label: "HOD", value: "Uyinomen O. Ekong" },
                  { label: "DEAN", value: "Prof. Uduak A. Umoh" },
                  { label: "FACULTY", value: "Faculty of Computing" },
                  { label: "LOCATION", value: "Waniba Road, Uyo, AKS" },
                  { label: "ACCREDITATION", value: "NUC Approved" },
                  { label: "WEBSITE", value: "uniuyo.edu.ng" },
                ].map(({ label, value }) => (
                  <p key={label}>
                    <span className="text-primary/50">[{label}]</span>{" "}
                    <span className="text-muted-foreground">{value}</span>
                  </p>
                ))}
                <div className="pt-3 border-t border-primary/10">
                  <p className="text-[10px] text-muted-foreground/40">
                    Alongside: Computer Science · Data Science
                    <br />
                    Information Technology · Software Engineering
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="mx-6 md:mx-12 border-0 h-px bg-gradient-to-r from-transparent via-primary/18 to-transparent" />

      {/* PROGRAMME OBJECTIVES */}
      <section className="py-24 px-6 md:px-12 bg-primary/[0.025]">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="font-mono text-[10px] text-primary tracking-[0.2em] uppercase mb-3">// 02 — Programme Objectives</p>
            <h2 className="font-display text-4xl md:text-6xl leading-none tracking-[0.02em]">
              What Our Graduates <span className="text-primary">Are Built</span> to Do
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {objectives.map(({ code, tag, title, subtitle, icon: Icon, desc }) => (
              <div key={code} className="brand-card group relative overflow-hidden">
                <div className="flex items-center gap-1.5 px-4 py-2 border-b border-primary/8 bg-primary/[0.03]">
                  <span className="w-2 h-2 rounded-full bg-destructive/45" />
                  <span className="w-2 h-2 rounded-full bg-brand-gold/35" />
                  <span className="w-2 h-2 rounded-full bg-primary/45" />
                  <span className="ml-2 font-mono text-[9px] text-primary/35 tracking-widest">[{tag}]</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 border border-primary/25 bg-primary/5 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-display text-4xl text-primary/10 tracking-widest">{code}</span>
                  </div>
                  <h3 className="font-display text-[1.25rem] tracking-[0.04em] text-primary mb-1">{title}</h3>
                  <p className="font-mono text-[9px] text-primary/50 tracking-wide uppercase mb-3">{subtitle}</p>
                  <p className="font-mono text-[11px] text-muted-foreground leading-[1.75]">{desc}</p>
                </div>
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="mx-6 md:mx-12 border-0 h-px bg-gradient-to-r from-transparent via-primary/18 to-transparent" />

      {/* ACADEMIC PROGRAMMES */}
      <section id="programmes" className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="font-mono text-[10px] text-primary tracking-[0.2em] uppercase mb-3">// 03 — Academic Programmes</p>
            <h2 className="font-display text-4xl md:text-6xl leading-none tracking-[0.02em]">
              Degrees & <span className="text-primary">Entry Routes</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programmes.map(({ icon: Icon, tag, title, duration, desc, requirements }) => (
              <div key={tag} className="border border-primary/15 bg-card/60 hover:border-primary/38 transition-all group flex flex-col">
                <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-primary/10 bg-primary/[0.04]">
                  <span className="w-2 h-2 rounded-full bg-destructive/45" />
                  <span className="w-2 h-2 rounded-full bg-brand-gold/35" />
                  <span className="w-2 h-2 rounded-full bg-primary/45" />
                  <span className="ml-2 font-mono text-[9px] text-primary/40 tracking-widest">[{tag}]</span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-9 h-9 border border-primary/25 bg-primary/5 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-mono text-[9px] text-primary/60 tracking-widest border border-primary/20 px-2 py-1">{duration}</span>
                  </div>
                  <h3 className="font-display text-[1.2rem] tracking-[0.03em] text-foreground mb-2">{title}</h3>
                  <p className="font-mono text-[11px] text-muted-foreground leading-[1.75] mb-5">{desc}</p>
                  <div className="mt-auto pt-4 border-t border-primary/8">
                    <p className="font-mono text-[9px] text-primary/40 tracking-widest uppercase mb-2">Requirements</p>
                    <ul className="space-y-1">
                      {requirements.map((r) => (
                        <li key={r} className="font-mono text-[10px] text-muted-foreground/70 flex gap-2">
                          <span className="text-primary/40 shrink-0">→</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACADEMIC STAFF */}
      <section id="staff" className="py-24 px-6 md:px-12 bg-primary/[0.025]">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="font-mono text-[10px] text-primary tracking-[0.2em] uppercase mb-3">// 04 — Academic Staff</p>
            <h2 className="font-display text-4xl md:text-6xl leading-none tracking-[0.02em]">
              Meet Our <span className="text-primary">Faculty</span>
            </h2>
          </div>

          {/* HOD Spotlight */}
          <div className="border border-primary/25 bg-card/70 p-6 md:p-8 mb-8 grid md:grid-cols-[auto_1fr] gap-6 items-start">
            <div className="w-20 h-20 border-2 border-primary/50 bg-primary/8 flex items-center justify-center font-display text-3xl tracking-wider text-primary neon-text-glow shrink-0">
              UE
            </div>
            <div>
              <div className="font-mono text-[9px] text-primary/40 tracking-widest uppercase mb-1">[Head of Department]</div>
              <h3 className="font-display text-2xl tracking-[0.05em] text-foreground mb-1">Prof. Uyinomen O. Ekong</h3>
              <p className="font-mono text-[10px] text-primary/60 tracking-wide uppercase mb-4">
                HOD, Department of Cybersecurity
              </p>
              <blockquote className="border-l-2 border-primary/30 pl-4">
                <p className="font-mono text-[11px] text-muted-foreground/80 leading-[1.85] italic">
                  "Our department is committed to producing graduates who will be at the forefront of securing Nigeria's
                  digital future — with integrity, technical excellence, and global perspective."
                </p>
              </blockquote>
            </div>
          </div>

          {/* Staff grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {staffRoles.filter((s) => !s.isHOD).map((s, i) => (
              <div
                key={i}
                className="text-center p-5 border border-primary/12 bg-card/60 hover:border-primary/38 hover:-translate-y-0.5 transition-all group"
              >
                <div className="font-mono text-[8px] text-primary/35 tracking-widest mb-3 uppercase">[{s.role}]</div>
                <div className="w-14 h-14 mx-auto mb-3 border border-primary/25 bg-primary/5 flex items-center justify-center font-display text-xl tracking-wider text-primary/60">
                  {s.initials}
                </div>
                <div className="font-mono text-[9px] text-muted-foreground/50 leading-relaxed tracking-tight">
                  {s.specialisation}
                </div>
              </div>
            ))}
          </div>
          <p className="font-mono text-[10px] text-muted-foreground/30 tracking-widest text-center mt-6">
            * Staff profiles with names and photos to be updated
          </p>
        </div>
      </section>

      {/* RESEARCH FOCUS */}
      <section id="research" className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="font-mono text-[10px] text-primary tracking-[0.2em] uppercase mb-3">// 05 — Research</p>
            <h2 className="font-display text-4xl md:text-6xl leading-none tracking-[0.02em]">
              Areas of Research <span className="text-primary">& Inquiry</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {researchAreas.map(({ icon: Icon, title, status, desc }) => (
              <div key={title} className="brand-card group relative overflow-hidden">
                <div className="flex items-center gap-1.5 px-4 py-2 border-b border-primary/8 bg-primary/[0.03]">
                  <span className="w-2 h-2 rounded-full bg-destructive/45" />
                  <span className="w-2 h-2 rounded-full bg-brand-gold/35" />
                  <span className="w-2 h-2 rounded-full bg-primary/45" />
                  <span className={`ml-auto font-mono text-[8px] tracking-widest px-2 py-0.5 border ${
                    status === "Active"
                      ? "border-primary/30 text-primary bg-primary/5"
                      : "border-muted-foreground/20 text-muted-foreground/50"
                  }`}>
                    {status}
                  </span>
                </div>
                <div className="p-6">
                  <div className="w-8 h-8 border border-primary/25 bg-primary/5 flex items-center justify-center mb-4">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-display text-[1.1rem] tracking-[0.03em] text-foreground mb-3">{title}</h3>
                  <p className="font-mono text-[11px] text-muted-foreground leading-[1.75]">{desc}</p>
                </div>
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STUDENT BODY / DOCSSA */}
      <section id="student-body" className="py-24 px-6 md:px-12 bg-primary/[0.025]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="font-mono text-[10px] text-primary tracking-[0.2em] uppercase mb-3">// 06 — Student Body</p>
            <h2 className="font-display text-4xl md:text-5xl leading-none tracking-[0.02em] mb-6">
              DOCSSA — <span className="text-primary">Inside</span>
              <br />
              the Department
            </h2>

            <p className="font-mono text-[11px] text-muted-foreground/60 uppercase tracking-widest mb-3">
              Department of Cyber Security Students Association
            </p>
            <p className="font-mono text-sm text-muted-foreground leading-[1.85] mb-4">
              DOCSSA is the official student body operating <em>within</em> the Department of Cybersecurity at the
              University of Uyo. It exists to complement the department's academic mission by building community,
              running extracurricular programmes, and preparing students for the professional world.
            </p>
            <p className="font-mono text-sm text-muted-foreground leading-[1.85]">
              As a departmental association — not a separate entity — DOCSSA activities are coordinated under the
              oversight of the department and contribute directly to student life, skills development, and industry
              engagement.
            </p>

            <div className="mt-8">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.1em] font-bold px-7 py-3.5 hover:bg-brand-gold-bright hover:shadow-[0_6px_24px_rgba(255,184,0,0.35)] transition-all"
              >
                Join DOCSSA <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Activities terminal */}
          <div className="border border-primary/18 bg-card/60 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-primary/10 bg-primary/[0.04]">
              <span className="w-2 h-2 rounded-full bg-destructive/55" />
              <span className="w-2 h-2 rounded-full bg-brand-gold/45" />
              <span className="w-2 h-2 rounded-full bg-primary/55" />
              <span className="ml-2 font-mono text-[9px] text-muted-foreground/50 tracking-wider">docssa_activities.sh</span>
            </div>
            <div className="p-6 font-mono text-xs">
              <p className="text-primary/50 mb-4">$ cat DOCSSA_ACTIVITIES</p>
              <div className="space-y-4">
                {docsssaActivities.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-7 h-7 shrink-0 border border-primary/25 bg-primary/5 flex items-center justify-center mt-0.5">
                      <Icon className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p className="text-muted-foreground leading-[1.75] text-[11px]">{label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-primary/10 text-[11px] space-y-1">
                <p>
                  <span className="text-primary/50">[PORTAL]</span>{" "}
                  <Link to="/lab" className="text-primary hover:underline">cyberdesk-lab.vercel.app</Link>
                </p>
                <p>
                  <span className="text-primary/50">[STATUS]</span>{" "}
                  <span className="text-primary">● ACTIVELY RECRUITING</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <div
        className="relative border-y border-primary/18 text-center py-24 px-6 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #060F1E 0%, #0A1428 55%, #091830 100%)" }}
      >
        <div className="absolute inset-0 scanlines opacity-18 pointer-events-none" />
        <div className="absolute inset-0 brand-grid-bg opacity-60" />
        <span
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[18vw] text-primary/[0.035] tracking-[0.1em] whitespace-nowrap pointer-events-none select-none"
        >
          UNIUYO
        </span>
        <div className="relative">
          <p className="font-mono text-[10px] text-primary/60 tracking-[0.25em] uppercase mb-5">// Ready to apply?</p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-[0.03em] text-foreground mb-4">
            DEFEND THE
            <br />
            <span className="text-primary neon-text-glow">DIGITAL FRONTIER</span>
          </h2>
          <p className="font-mono text-sm text-muted-foreground max-w-lg mx-auto mb-10 leading-[1.8]">
            Join Nigeria's premier cybersecurity department and build the skills, knowledge, and network to protect
            the digital world — locally and globally.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.1em] font-bold px-10 py-4 hover:bg-brand-gold-bright hover:shadow-[0_8px_32px_rgba(255,184,0,0.4)] transition-all"
            >
              Apply via JAMB <ChevronRight className="h-3.5 w-3.5" />
            </a>
            <Link
              to="/signup"
              className="inline-flex items-center gap-3 border border-primary/35 text-primary font-mono text-xs uppercase tracking-[0.1em] px-10 py-4 hover:border-primary hover:bg-primary/5 transition-all"
            >
              Join DOCSSA Portal
            </Link>
          </div>
        </div>
      </div>

      {/* FOOTER / CONTACT */}
      <footer id="contact" className="bg-background border-t border-primary/8 px-6 md:px-12 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_auto_auto] gap-12">
          {/* Dept info */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src="/logo-256.png" alt="DOCSSA" className="h-10 w-10 shrink-0 brand-logo" />
              <div>
                <div className="font-display text-lg tracking-[0.1em] text-primary">DOCSSA</div>
                <div className="font-mono text-[9px] text-muted-foreground/50 tracking-widest">Dept. of Cybersecurity · UniUyo</div>
              </div>
            </div>
            <div className="font-mono text-[11px] text-muted-foreground/60 space-y-1.5">
              <div className="flex items-start gap-2">
                <MapPin className="h-3 w-3 text-primary/40 mt-0.5 shrink-0" />
                <span>Waniba Road, Uyo, Akwa Ibom State, Nigeria</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3 w-3 text-primary/40 shrink-0" />
                <span>cybersecurity@uniuyo.edu.ng</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="font-mono text-[9px] text-primary/40 tracking-[0.2em] uppercase mb-4">Quick Links</p>
            <ul className="space-y-2">
              {[
                { label: "University Website", href: "#" },
                { label: "Faculty of Computing", href: "#" },
                { label: "JAMB Portal", href: "#" },
                { label: "Student Portal", href: "#" },
                { label: "Academic Calendar", href: "#" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="font-mono text-[10px] text-muted-foreground/50 hover:text-primary transition-colors tracking-wide">
                    → {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Department nav */}
          <div>
            <p className="font-mono text-[9px] text-primary/40 tracking-[0.2em] uppercase mb-4">Department</p>
            <ul className="space-y-2">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className="font-mono text-[10px] text-muted-foreground/50 hover:text-primary transition-colors tracking-wide">
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/lab" className="font-mono text-[10px] text-primary/60 hover:text-primary transition-colors tracking-wide">
                  DOCSSA Portal →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-primary/8 flex flex-wrap items-center justify-between gap-4">
          <div className="font-mono text-[10px] text-muted-foreground/30 tracking-tight">
            © 2025 Department of Cybersecurity, University of Uyo. All rights reserved.
          </div>
          <div className="font-mono text-[10px] text-muted-foreground/25 tracking-tight">
            UNIUYO · Faculty of Computing · Cybersecurity
          </div>
        </div>
      </footer>
    </div>
  );
}
