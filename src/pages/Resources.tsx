import { FolderOpen, ExternalLink } from "lucide-react";

const resources = [
  {
    title: "OWASP Top 10",
    desc: "The standard awareness document for web application security risks.",
    url: "https://owasp.org/www-project-top-ten/",
    category: "Web Security",
  },
  {
    title: "CyberChef",
    desc: "A web app for encryption, encoding, compression and data analysis.",
    url: "https://gchq.github.io/CyberChef/",
    category: "Tools",
  },
  {
    title: "TryHackMe",
    desc: "Learn cybersecurity through hands-on exercises and labs.",
    url: "https://tryhackme.com",
    category: "Learning",
  },
  {
    title: "Hack The Box",
    desc: "Online platform to test and advance your penetration testing skills.",
    url: "https://www.hackthebox.com",
    category: "Practice",
  },
  {
    title: "OverTheWire Wargames",
    desc: "Learn and practice security concepts in the form of fun-filled games.",
    url: "https://overthewire.org/wargames/",
    category: "Practice",
  },
  {
    title: "Exploit Database",
    desc: "Archive of exploits and vulnerable software for security researchers.",
    url: "https://www.exploit-db.com",
    category: "Reference",
  },
  {
    title: "Wireshark User Guide",
    desc: "Official documentation for the world's most popular network protocol analyzer.",
    url: "https://www.wireshark.org/docs/wsug_html/",
    category: "Tools",
  },
  {
    title: "Python for Cybersecurity",
    desc: "Free Python resources for automating security tasks and building tools.",
    url: "https://docs.python.org/3/",
    category: "Learning",
  },
];

export default function Resources() {
  return (
    <div className="p-6 md:p-12 max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <FolderOpen className="h-8 w-8 text-primary neon-text-glow" />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground font-mono">
            Resources
          </h1>
        </div>
        <p className="text-muted-foreground">
          Curated cybersecurity tools, references and learning platforms
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {resources.map((r, i) => (
          <a
            key={r.title}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card border border-border rounded-lg p-5 hover:border-primary/40 transition-colors animate-fade-in group block"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-foreground font-bold font-mono text-sm group-hover:text-primary transition-colors">
                {r.title}
              </h3>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
            </div>
            <span className="text-xs font-mono bg-primary/10 text-primary border border-primary/30 rounded px-2 py-0.5 mb-3 inline-block">
              {r.category}
            </span>
            <p className="text-foreground/70 text-sm leading-relaxed mt-2">{r.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
