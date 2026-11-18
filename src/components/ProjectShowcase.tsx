import { useState } from "react";
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, Code2, Layers3 } from "lucide-react";
import { Link } from "react-router-dom";
import { projects, type Project } from "@/lib/portfolio-data";
import "./project-showcase.css";

type Filter = "All" | Project["role"];
type Props = { variant?: "home" | "full" };

const filters: { label: string; value: Filter }[] = [
  { label: "All work", value: "All" },
  { label: "Founder-led", value: "Founder" },
  { label: "Development", value: "Developer" },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const title = project.title.replace(/ \([^)]*\)$/, "");
  const hostname = project.link ? new URL(project.link).hostname : "Case study";
  return (
    <article className="ps-card">
      <div className="ps-card-media">
        {project.link ? (
          <a className="ps-preview" href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Open ${title} website (new tab)`}>
            <div className="ps-browser" aria-hidden="true">
              <span className="ps-browser-lights"><i /><i /><i /></span>
              <span className="ps-browser-domain">{hostname}</span>
              <ArrowUpRight size={15} />
            </div>
            <div className="ps-preview-canvas">
              <img src={project.preview} alt={`${title} project screenshot`} loading="lazy" decoding="async" />
            </div>
            <span className="ps-media-cta" aria-hidden="true">View live project <ArrowUpRight size={16} /></span>
          </a>
        ) : (
          <div className="ps-preview ps-preview-static">
            <div className="ps-browser"><span className="ps-browser-domain">{hostname}</span></div>
            <div className="ps-preview-canvas"><img src={project.preview} alt={`${title} project screenshot`} loading="lazy" decoding="async" /></div>
          </div>
        )}
        <span className="ps-project-number" aria-hidden="true">{String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
      </div>
      <div className="ps-card-content">
        <div className="ps-card-meta">
          <span className="ps-role">{project.role === "Developer" ? <Code2 size={14} /> : <BriefcaseBusiness size={14} />}{project.position ?? project.role}</span>
          <span>{project.category}</span>
        </div>
        <h3>{title}</h3>
        <p className="ps-description">{project.description}</p>
        <div className="ps-case-study">
          <span className="ps-case-study-label">My contribution</span>
          <p>{project.outcome}</p>
        </div>
        <div className="ps-tags" aria-label="Project technologies and areas">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <div className="ps-card-footer">
          {project.link ? (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="ps-visit">
              {project.linkLabel ?? "Explore project"} <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          ) : <span className="ps-visit-disabled">Case study</span>}
          <span className="ps-card-index">PROJECT {String(index + 1).padStart(2, "0")}</span>
        </div>
      </div>
    </article>
  );
}

export default function ProjectShowcase({ variant = "home" }: Props) {
  const [selected, setSelected] = useState<Filter>("All");
  const shown = projects.filter((project) => selected === "All" || project.role === selected);

  return (
    <div className={`ps-showcase ps-showcase--${variant}`}>
      <div className="ps-toolbar">
        <div className="ps-filter-list" role="group" aria-label="Filter projects by role">
          {filters.map(({ label, value }) => (
            <button
              key={value}
              type="button"
              className={`ps-filter ${selected === value ? "is-active" : ""}`}
              aria-pressed={selected === value}
              onClick={() => setSelected(value)}
            >
              {label}
              {value === "All" && <span className="ps-filter-count">{projects.length}</span>}
            </button>
          ))}
        </div>
        <p className="ps-total"><Layers3 size={16} aria-hidden="true" /> Showing {shown.length} of {projects.length} projects</p>
      </div>
      <div className="ps-grid" aria-live="polite">
        {shown.map((project) => (
          <ProjectCard key={project.id} project={project} index={projects.indexOf(project)} />
        ))}
      </div>
      {variant === "home" && (
        <div className="ps-more">
          <Link to="/portfolio" className="ps-more-link">Explore all projects <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
      )}
    </div>
  );
}
