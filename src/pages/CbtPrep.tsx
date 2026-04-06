import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useXPContext } from "@/components/XPContext";
import { GraduationCap, RotateCcw, LayoutGrid } from "lucide-react";

interface Question {
  q: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface Course {
  code: string;
  title: string;
  level: string;
  questions: Question[];
}

const courses: Course[] = [
  {
    code: "PHY 111",
    title: "General Physics I",
    level: "100L",
    questions: [
      { q: "What is the SI unit of force?", options: ["Joule", "Newton", "Pascal", "Watt"], answer: "Newton", explanation: "1 Newton = 1 kg·m/s², named after Isaac Newton." },
      { q: "Which is a scalar quantity?", options: ["Velocity", "Displacement", "Speed", "Force"], answer: "Speed", explanation: "Speed has magnitude only; velocity has magnitude and direction." },
      { q: "What is the acceleration due to gravity on Earth?", options: ["8.9 m/s²", "9.8 m/s²", "10.8 m/s²", "7.6 m/s²"], answer: "9.8 m/s²", explanation: "g ≈ 9.8 m/s² at Earth's surface." },
      { q: "Newton's second law states F = ?", options: ["mv", "ma", "m/a", "m+a"], answer: "ma", explanation: "Force = mass × acceleration." },
      { q: "What is the unit of electric current?", options: ["Volt", "Ohm", "Ampere", "Watt"], answer: "Ampere", explanation: "Current is measured in Amperes (A)." },
      { q: "Work done = Force × ?", options: ["Mass", "Time", "Distance", "Speed"], answer: "Distance", explanation: "W = F × d (when force and displacement are parallel)." },
      { q: "Which is NOT a fundamental quantity?", options: ["Mass", "Length", "Velocity", "Time"], answer: "Velocity", explanation: "Velocity is derived (length/time), not fundamental." },
      { q: "Ohm's law: V = ?", options: ["IR", "I/R", "I+R", "R/I"], answer: "IR", explanation: "Voltage = Current × Resistance." },
      { q: "What is the unit of energy?", options: ["Newton", "Pascal", "Joule", "Watt"], answer: "Joule", explanation: "Energy and work are both measured in Joules." },
      { q: "Frequency is measured in?", options: ["Hertz", "Decibel", "Lumen", "Tesla"], answer: "Hertz", explanation: "Frequency (cycles per second) is measured in Hz." },
    ],
  },
  {
    code: "SEN 211",
    title: "Software Engineering",
    level: "200L",
    questions: [
      { q: "What does SDLC stand for?", options: ["Software Design Life Cycle", "System Development Life Cycle", "Software Development Life Cycle", "System Design Language Construct"], answer: "Software Development Life Cycle", explanation: "SDLC is the structured process for planning, creating, testing and deploying software." },
      { q: "Which SDLC model is most flexible to changes?", options: ["Waterfall", "Spiral", "Agile", "V-Model"], answer: "Agile", explanation: "Agile uses iterative sprints making it highly adaptable to changing requirements." },
      { q: "What is a use case diagram used for?", options: ["Database design", "Showing system-user interactions", "Network topology", "Hardware layout"], answer: "Showing system-user interactions", explanation: "Use case diagrams model how actors interact with a system's functions." },
      { q: "Which testing checks individual components in isolation?", options: ["Integration testing", "System testing", "Unit testing", "Acceptance testing"], answer: "Unit testing", explanation: "Unit testing validates individual functions or modules independently." },
      { q: "What is the purpose of a requirements specification document?", options: ["To write code", "To define what the system must do", "To test the software", "To deploy the system"], answer: "To define what the system must do", explanation: "SRS documents functional and non-functional requirements before development begins." },
      { q: "Cohesion in software design means?", options: ["Modules are loosely connected", "A module does one well-defined task", "Classes inherit from each other", "Code has no bugs"], answer: "A module does one well-defined task", explanation: "High cohesion means a module is focused on a single responsibility." },
      { q: "What does UML stand for?", options: ["Unified Modelling Language", "Universal Machine Language", "Unified Machine Logic", "Universal Modelling Logic"], answer: "Unified Modelling Language", explanation: "UML is the standard language for visualising software design." },
      { q: "Agile development uses?", options: ["Big bang releases", "Waterfall phases", "Iterative sprints", "No documentation"], answer: "Iterative sprints", explanation: "Agile delivers working software in short cycles called sprints." },
      { q: "Which is a version control system?", options: ["MySQL", "Git", "Apache", "Docker"], answer: "Git", explanation: "Git tracks changes to source code enabling collaboration and rollback." },
      { q: "Black-box testing focuses on?", options: ["Internal code logic", "Input-output behaviour", "Database queries", "Memory usage"], answer: "Input-output behaviour", explanation: "Black-box testing evaluates outputs from given inputs without knowledge of internal code." },
    ],
  },
  {
    code: "CYB 212",
    title: "Introduction to Cybersecurity",
    level: "200L",
    questions: [
      { q: "What does CIA stand for in cybersecurity?", options: ["Central Intelligence Agency", "Confidentiality Integrity Availability", "Cyber Intrusion Analysis", "Computer Integrity Assessment"], answer: "Confidentiality Integrity Availability", explanation: "The CIA triad is the core model for information security policy." },
      { q: "What is a firewall?", options: ["A physical security door", "Software that monitors network traffic", "An antivirus program", "A type of encryption"], answer: "Software that monitors network traffic", explanation: "Firewalls filter incoming and outgoing traffic based on security rules." },
      { q: "Phishing is an example of?", options: ["Malware", "Social engineering", "Brute force attack", "SQL injection"], answer: "Social engineering", explanation: "Phishing manipulates users psychologically rather than exploiting technical vulnerabilities." },
      { q: "What does VPN stand for?", options: ["Virtual Private Network", "Very Protected Node", "Virtual Public Network", "Verified Private Node"], answer: "Virtual Private Network", explanation: "VPNs encrypt traffic and mask IP addresses for secure communication." },
      { q: "Which encryption uses the same key for encryption and decryption?", options: ["Asymmetric", "Public key", "Symmetric", "Hashing"], answer: "Symmetric", explanation: "Symmetric encryption (e.g. AES) uses a single shared key for both operations." },
      { q: "What is a zero-day vulnerability?", options: ["A bug fixed immediately", "An unknown vulnerability with no patch", "A virus released at midnight", "A vulnerability in old software"], answer: "An unknown vulnerability with no patch", explanation: "Zero-day vulnerabilities are unknown to vendors and therefore have no available fix." },
      { q: "What does SQL injection target?", options: ["Network routers", "Databases", "Operating systems", "Physical hardware"], answer: "Databases", explanation: "SQL injection inserts malicious SQL code to manipulate or extract database data." },
      { q: "Two-factor authentication adds?", options: ["A second password", "A second username", "An additional verification layer", "Biometric data only"], answer: "An additional verification layer", explanation: "2FA combines something you know with something you have or are." },
      { q: "What is malware?", options: ["Malfunctioning hardware", "Malicious software", "A network error", "A firewall rule"], answer: "Malicious software", explanation: "Malware includes viruses, ransomware, spyware and other harmful programs." },
      { q: "HTTPS differs from HTTP by?", options: ["Being faster", "Using encryption (TLS/SSL)", "Using a different port (80)", "Being text-only"], answer: "Using encryption (TLS/SSL)", explanation: "HTTPS encrypts data in transit using TLS, protecting against eavesdropping." },
    ],
  },
  {
    code: "CYB 213",
    title: "Cybercrime & Digital Forensics",
    level: "200L",
    questions: [
      { q: "What is cybercrime?", options: ["Crimes committed using computers or networks", "Physical theft of computers", "Software bugs", "Hardware failure"], answer: "Crimes committed using computers or networks", explanation: "Cybercrime encompasses illegal activities targeting or using digital systems." },
      { q: "Digital forensics involves?", options: ["Repairing damaged hardware", "Collecting and analysing digital evidence", "Writing security policies", "Developing antivirus software"], answer: "Collecting and analysing digital evidence", explanation: "Digital forensics recovers and investigates data from digital devices for legal proceedings." },
      { q: "Which Nigerian law addresses cybercrime?", options: ["NDLEA Act", "Cybercrimes Act 2015", "Companies Act", "EFCC Act"], answer: "Cybercrimes Act 2015", explanation: "Nigeria's Cybercrimes (Prohibition, Prevention, etc.) Act 2015 is the primary legislation on cybercrime." },
      { q: "Chain of custody in forensics means?", options: ["A blockchain network", "Documentation tracking evidence handling", "Linking suspects together", "A type of malware"], answer: "Documentation tracking evidence handling", explanation: "Chain of custody documents who handled evidence and when, maintaining its integrity for court." },
      { q: "What is ransomware?", options: ["Free software", "Malware that encrypts files and demands payment", "A network scanner", "A forensic tool"], answer: "Malware that encrypts files and demands payment", explanation: "Ransomware locks victim data and demands cryptocurrency payment for decryption." },
      { q: "Steganography means?", options: ["Encrypting messages", "Hiding messages within other files", "Deleting evidence", "Scanning networks"], answer: "Hiding messages within other files", explanation: "Steganography conceals data inside images, audio or other media without detection." },
      { q: "What is a botnet?", options: ["A secure network", "A network of infected computers controlled remotely", "A type of firewall", "A cloud service"], answer: "A network of infected computers controlled remotely", explanation: "Botnets are zombie networks used for spam, DDoS attacks and data theft." },
      { q: "MD5 and SHA are examples of?", options: ["Encryption algorithms", "Hashing algorithms", "Compression tools", "Firewall rules"], answer: "Hashing algorithms", explanation: "MD5 and SHA produce fixed-length digests used to verify data integrity." },
      { q: "What does EFCC stand for?", options: ["Electronic Fraud Control Committee", "Economic and Financial Crimes Commission", "Electronic Financial Crimes Council", "Enforcement of Financial Crimes Commission"], answer: "Economic and Financial Crimes Commission", explanation: "Nigeria's EFCC investigates financial crimes including cybercrime and fraud." },
      { q: "First response in digital forensics should?", options: ["Immediately wipe the drive", "Preserve the crime scene and avoid altering evidence", "Install antivirus", "Reboot the system"], answer: "Preserve the crime scene and avoid altering evidence", explanation: "First responders must preserve evidence integrity — any alteration can invalidate it in court." },
    ],
  },
];

type Screen = "courses" | "quiz" | "results";

export default function CbtPrep() {
  const { addXP } = useXPContext();
  const [screen, setScreen] = useState<Screen>("courses");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [sessionXP, setSessionXP] = useState(0);

  function startQuiz(course: Course) {
    setSelectedCourse(course);
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setSessionXP(0);
    setScreen("quiz");
  }

  function handleSelect(option: string) {
    if (selected !== null) return;
    setSelected(option);
    const correct = option === selectedCourse!.questions[currentIndex].answer;
    const xpGain = correct ? 10 : 5;
    addXP(xpGain);
    setSessionXP((prev) => prev + xpGain);
    if (correct) setScore((prev) => prev + 1);
  }

  function handleNext() {
    const total = selectedCourse!.questions.length;
    if (currentIndex + 1 >= total) {
      setScreen("results");
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelected(null);
    }
  }

  function gradeMessage(s: number) {
    if (s <= 4) return "Keep Studying 📚";
    if (s <= 7) return "Good Progress! 💪";
    return "Excellent! You're Ready 🏆";
  }

  if (screen === "courses") {
    return (
      <div className="p-6 md:p-12 max-w-4xl mx-auto animate-fade-in">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="h-8 w-8 text-primary neon-text-glow" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground font-mono">
              CBT Practice Zone
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Exam-style questions for your courses — practice until you pass
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div
              key={course.code}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors duration-300 flex flex-col gap-4"
            >
              <div>
                <p className="text-2xl font-mono font-bold text-primary neon-text-glow mb-1">
                  {course.code}
                </p>
                <h3 className="text-foreground font-semibold text-lg leading-snug">
                  {course.title}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono bg-primary/10 text-primary border border-primary/20 rounded px-2 py-0.5">
                  {course.level}
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  {course.questions.length} questions
                </span>
              </div>
              <Button
                variant="neon"
                className="font-mono w-full mt-auto"
                onClick={() => startQuiz(course)}
              >
                Start Quiz
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (screen === "quiz" && selectedCourse) {
    const q = selectedCourse.questions[currentIndex];
    const total = selectedCourse.questions.length;
    const answered = selected !== null;

    return (
      <div className="p-6 md:p-12 max-w-2xl mx-auto animate-fade-in">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-mono text-muted-foreground">
              {selectedCourse.code} — {selectedCourse.title}
            </span>
            <span className="text-xs font-mono text-primary">
              Question {currentIndex + 1} of {total}
            </span>
          </div>
          <Progress value={((currentIndex + 1) / total) * 100} className="h-2" />
        </div>

        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <p className="text-foreground font-semibold text-lg leading-relaxed">
            {q.q}
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {q.options.map((option) => {
            const isCorrect = option === q.answer;
            const isSelected = option === selected;

            let borderClass = "border-border hover:border-primary/40";
            let bgClass = "bg-card";
            let textClass = "text-foreground";

            if (answered) {
              if (isCorrect) {
                borderClass = "border-green-500";
                bgClass = "bg-green-500/10";
                textClass = "text-green-400";
              } else if (isSelected && !isCorrect) {
                borderClass = "border-red-500";
                bgClass = "bg-red-500/10";
                textClass = "text-red-400";
              }
            }

            return (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                disabled={answered}
                className={`w-full text-left px-5 py-4 rounded-lg border ${borderClass} ${bgClass} ${textClass} font-mono text-sm transition-all duration-200 disabled:cursor-default`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="bg-card border border-border rounded-lg px-5 py-4 mb-6 animate-fade-in">
            <p className="text-muted-foreground text-sm italic">{q.explanation}</p>
          </div>
        )}

        <Button
          variant="neon"
          className="font-mono w-full"
          disabled={!answered}
          onClick={handleNext}
        >
          {currentIndex + 1 >= total ? "See Results" : "Next Question"}
        </Button>
      </div>
    );
  }

  if (screen === "results" && selectedCourse) {
    const total = selectedCourse.questions.length;
    return (
      <div className="p-6 md:p-12 max-w-2xl mx-auto animate-fade-in">
        <div className="bg-card border border-border rounded-lg p-10 text-center space-y-6">
          <GraduationCap className="h-14 w-14 text-primary neon-text-glow mx-auto" />

          <div>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">
              Your Score
            </p>
            <p className="text-6xl font-bold font-mono text-primary neon-text-glow">
              {score} <span className="text-2xl text-muted-foreground">/ {total}</span>
            </p>
          </div>

          <p className="text-foreground text-xl font-semibold">
            {gradeMessage(score)}
          </p>

          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-5 py-3">
            <span className="text-primary font-mono font-bold text-lg">+{sessionXP} XP</span>
            <span className="text-muted-foreground text-sm font-mono">earned this session</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              variant="neon"
              className="font-mono flex-1"
              onClick={() => startQuiz(selectedCourse)}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Button
              variant="outline"
              className="font-mono flex-1"
              onClick={() => setScreen("courses")}
            >
              <LayoutGrid className="h-4 w-4 mr-2" />
              Choose Another Course
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
