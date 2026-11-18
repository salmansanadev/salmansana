import { Braces, Cloud, Code2, Database, GitBranch, Globe2, Layers3, Server, Sparkles } from "lucide-react";
import "./developer-expertise.css";

const stack = [
  { name: "React", group: "Frontend", icon: Code2, detail: "Component-based interfaces" },
  { name: "TypeScript", group: "Frontend", icon: Braces, detail: "Maintainable application logic" },
  { name: "HTML & CSS", group: "Frontend", icon: Globe2, detail: "Responsive web foundations" },
  { name: "Next.js", group: "Frameworks", icon: Layers3, detail: "Full-stack web applications" },
  { name: "Supabase", group: "Backend", icon: Database, detail: "Data and authentication" },
  { name: "GitHub", group: "Workflow", icon: GitBranch, detail: "Version control & collaboration" },
  { name: "Vercel", group: "Deployment", icon: Cloud, detail: "Deployment and previews" },
  { name: "Cloudflare", group: "Deployment", icon: Server, detail: "Hosting and delivery" },
];

export default function DeveloperExpertise({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`dev-stack ${compact ? "dev-stack--compact" : ""}`} aria-labelledby={compact ? "dev-stack-about-title" : "dev-stack-home-title"}>
      <div className="dev-stack-heading">
        <div>
          <p className="dev-stack-kicker"><Sparkles size={15} aria-hidden="true" /> TOOLS & TECHNOLOGIES</p>
          <h2 id={compact ? "dev-stack-about-title" : "dev-stack-home-title"}>The tools behind <em>the work.</em></h2>
        </div>
        <p>A practical, evolving toolkit used across web development, product experiments, and deployments.</p>
      </div>
      <div className="dev-stack-grid">
        {stack.map(({name,group,icon:Icon,detail},index) => (
          <article className="dev-stack-card" key={name}>
            <div className="dev-stack-card-top">
              <span className="dev-stack-icon"><Icon size={22} strokeWidth={1.75} aria-hidden="true" /></span>
              <span className="dev-stack-number">{String(index+1).padStart(2,"0")}</span>
            </div>
            <span className="dev-stack-group">{group}</span>
            <h3>{name}</h3>
            <p>{detail}</p>
          </article>
        ))}
      </div>
      <div className="dev-stack-note"><span className="dev-stack-pulse" aria-hidden="true" /> Continuously learning, building and improving — no invented skill percentages.</div>
    </section>
  );
}
