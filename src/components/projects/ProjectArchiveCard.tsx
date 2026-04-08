import { Link } from "react-router-dom";
import LazyBackground from "@/components/media/LazyBackground";
import type { Project } from "@/content/projects";

type ProjectArchiveCardProps = {
  project: Project;
  className?: string;
};

const ProjectArchiveCard = ({ project, className = "" }: ProjectArchiveCardProps) => {
  return (
    <Link to={`/projects/${project.slug}`} className={`project-archive-card ${className}`.trim()}>
      <div className="project-archive-card-media">
        <LazyBackground
          className="project-archive-card-image"
          image={project.image}
          style={{ backgroundPosition: project.imagePosition }}
          ariaHidden
        />
        <div className={`project-archive-card-overlay-status${project.statusTone ? ` ${project.statusTone}` : ""}`}>
          {project.status}
        </div>
      </div>
      <div className="project-archive-card-copy">
        <div className="project-archive-card-title">{project.name}</div>
        <div className="project-archive-card-location">{project.location}</div>
        <p className="project-archive-card-body">{project.archiveDescription}</p>
        <div className="project-archive-card-tags">
          {project.categories.slice(0, 2).map((category) => (
            <span key={category} className="project-archive-card-tag">
              {category}
            </span>
          ))}
        </div>
        <div className="project-archive-card-cta">View Project</div>
      </div>
    </Link>
  );
};

export default ProjectArchiveCard;
