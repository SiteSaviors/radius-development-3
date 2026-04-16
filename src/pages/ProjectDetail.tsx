import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import LazyBackground from "@/components/media/LazyBackground";
import ProjectArchiveCard from "@/components/projects/ProjectArchiveCard";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { projects, projectBySlug } from "@/content/projects";
import useRadiusCursor from "@/hooks/useRadiusCursor";
import NotFound from "./NotFound";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = slug ? projectBySlug[slug] : undefined;

  useRadiusCursor();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const relatedProjects = useMemo(() => {
    if (!project) return [];
    return projects.filter((candidate) => candidate.slug !== project.slug).slice(0, 3);
  }, [project]);

  if (!project) {
    return <NotFound />;
  }

  return (
    <>
      <div id="cur"></div>
      <div id="cdot"></div>
      <SiteHeader currentPath={`/projects/${project.slug}`} />

      <main className="project-detail-page">
        <section className="project-detail-hero">
          <LazyBackground
            className="project-detail-hero-bg"
            image={project.image}
            mobileImage={project.mobileImage}
            style={{ backgroundPosition: project.imagePosition }}
            mobileStyle={{
              backgroundPosition: project.mobileImagePosition ?? project.imagePosition,
            }}
            eager
            ariaHidden
          />
          <div className="project-detail-hero-copy">
            <div className={`project-detail-status${project.statusTone ? ` ${project.statusTone}` : ""}`}>{project.status}</div>
            <h1 className="project-detail-title">{project.name}</h1>
            <div className="project-detail-location">{project.location}</div>
            <div className="project-detail-tags">
              {project.highlightTags.map((tag) => (
                <span key={tag.text} className={`fptag ${tag.tone}`}>
                  {tag.text}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="project-detail-facts" aria-label={`${project.name} key facts`}>
          <div className="project-detail-facts-inner">
            <div className="project-detail-facts-copy">
              <div className="project-detail-facts-eyebrow">Project Highlights</div>
            </div>
            <div className="project-detail-facts-grid">
              {project.highlightTags.map((tag) => (
                <div className="project-detail-fact" key={tag.text}>
                  <span>{tag.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="project-detail-intro">
          <div className="project-detail-summary">
            <div className="ey">Project Overview</div>
            <p className="project-detail-summary-text">{project.shortDescription}</p>
            <p className="project-detail-summary-body">{project.detail.intro}</p>
          </div>
          <div className="project-detail-meta">
            <div className="project-detail-meta-row">
              <span>Status</span>
              <strong>{project.status}</strong>
            </div>
            <div className="project-detail-meta-row">
              <span>Market</span>
              <strong>{project.market}</strong>
            </div>
            <div className="project-detail-meta-row">
              <span>Primary Categories</span>
              <strong>{project.categories.join(", ")}</strong>
            </div>
          </div>
        </section>

        <section className="project-detail-sections">
          <div className="project-detail-section">
            <div className="project-detail-section-label">Strategy</div>
            <p>{project.detail.strategy}</p>
          </div>
          <div className="project-detail-section">
            <div className="project-detail-section-label">Opportunity</div>
            <p>{project.detail.opportunity}</p>
          </div>
          <div className="project-detail-section">
            <div className="project-detail-section-label">Key Considerations</div>
            <ul className="project-detail-bullets">
              {project.detail.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="project-related">
          <div className="project-related-head">
            <div>
              <div className="ey">Explore More</div>
              <div className="st">Explore More Projects</div>
            </div>
            <Link to="/projects" className="bg rts">Back to All Projects &rarr;</Link>
          </div>
          <div className="project-related-grid">
            {relatedProjects.map((relatedProject) => (
              <ProjectArchiveCard
                key={relatedProject.slug}
                project={relatedProject}
                className="project-related-card"
              />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter currentPath={`/projects/${project.slug}`} />
    </>
  );
};

export default ProjectDetail;
