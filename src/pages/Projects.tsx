import { useEffect, useMemo, useState } from "react";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import ProjectArchiveCard from "@/components/projects/ProjectArchiveCard";
import {
  getProjectFilterCategories,
  projectFilterCategories,
  projects,
  type ProjectFilterCategory,
  type ProjectStatus,
} from "@/content/projects";
import LazyBackground from "@/components/media/LazyBackground";
import useRadiusCursor from "@/hooks/useRadiusCursor";
import projectsHeroBg from "@/assets/8.jpg";
import investorCtaBg from "@/assets/investor.jpg";

const Projects = () => {
  const [statusFilter, setStatusFilter] = useState<"All" | ProjectStatus>("All");
  const [categoryFilter, setCategoryFilter] = useState<"All" | ProjectFilterCategory>("All");

  useRadiusCursor();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const statusMatches = statusFilter === "All" || project.status === statusFilter;
      const categoryMatches =
        categoryFilter === "All" || getProjectFilterCategories(project).includes(categoryFilter);
      return statusMatches && categoryMatches;
    });
  }, [statusFilter, categoryFilter]);

  return (
    <>
      <div id="cur"></div>
      <div id="cdot"></div>
      <SiteHeader currentPath="/projects" />

      <main className="projects-page">
        <section className="projects-hero">
          <LazyBackground className="projects-hero-media" image={projectsHeroBg} eager ariaHidden />
          <div className="projects-hero-copy">
            <div className="ey">Current Projects</div>
            <h1 className="projects-hero-title">Projects Shaped by Land Strategy</h1>
            <p className="projects-hero-body">
              A portfolio of projects advancing through entitlement, land assembly, institutional planning, and mixed-use execution across high-growth markets.
            </p>
          </div>
        </section>

        <section className="projects-archive">
          <div className="projects-filter-wrap">
            <div className="projects-filter-group">
              <div className="projects-filter-label">Status</div>
              <div className="projects-filter-row">
                {(["All", "Under Development", "Open Project"] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    className={`filterpill${statusFilter === status ? " active" : ""}`}
                    onClick={() => setStatusFilter(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="projects-filter-group">
              <div className="projects-filter-label">Category</div>
              <div className="projects-filter-row">
                {(["All", ...projectFilterCategories] as const).map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`filterpill${categoryFilter === category ? " active" : ""}`}
                    onClick={() => setCategoryFilter(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filteredProjects.length ? (
            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <ProjectArchiveCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <div className="projects-empty">
              <div className="projects-empty-title">No projects match the selected filters.</div>
              <button
                type="button"
                className="archive-reset"
                onClick={() => {
                  setStatusFilter("All");
                  setCategoryFilter("All");
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        <section className="projects-cta">
          <div className="projects-cta-shell">
            <LazyBackground className="projects-cta-bg" image={investorCtaBg} ariaHidden />
            <div className="projects-cta-copy">
              <div className="ey">Investor Access</div>
              <div className="st">Interested in Learning More?</div>
              <p className="projects-cta-body">
                We&apos;re always looking to partner with accredited investors who share our vision for Central Texas. Join us to access exclusive opportunities, local expertise, and a team committed to helping you achieve your goals.
              </p>
              <div className="projects-cta-actions">
                <a href="#" className="bp">Become an Investor</a>
                <a href="#" className="bp">Investor Portal</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter currentPath="/projects" />
    </>
  );
};

export default Projects;
