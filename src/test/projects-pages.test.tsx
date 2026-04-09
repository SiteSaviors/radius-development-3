import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import ProjectDetail from "@/pages/ProjectDetail";
import Projects from "@/pages/Projects";

const renderProjectsPage = () =>
  render(
    <MemoryRouter initialEntries={["/projects"]}>
      <Routes>
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </MemoryRouter>
  );

const renderProjectDetail = (slug: string) =>
  render(
    <MemoryRouter initialEntries={[`/projects/${slug}`]}>
      <Routes>
        <Route path="/projects/:slug" element={<ProjectDetail />} />
      </Routes>
    </MemoryRouter>
  );

describe("projects pages", () => {
  it("renders the archive page with all six launch projects and route-aware nav links", () => {
    renderProjectsPage();

    expect(screen.getByText("Projects Shaped by Land Strategy")).toBeInTheDocument();
    expect(screen.getByText("The Shiloh")).toBeInTheDocument();
    expect(screen.getByText("The Franklin")).toBeInTheDocument();
    expect(screen.getByText("Terraces At West Cary")).toBeInTheDocument();
    expect(screen.getByText("Pittard Sears")).toBeInTheDocument();
    expect(screen.getByText("Cary Estates")).toBeInTheDocument();
    expect(screen.getByText("RDU Town Center")).toBeInTheDocument();

    expect(screen.getAllByRole("link", { name: "Current Projects" })[0]).toHaveAttribute("href", "/projects");
    expect(screen.getAllByRole("link", { name: "What We Do" })[0]).toHaveAttribute("href", "/what-we-do");
  });

  it("filters by status and category, shows empty state, and resets", () => {
    renderProjectsPage();

    fireEvent.click(screen.getByRole("button", { name: "Under Development" }));
    expect(screen.getByText("The Shiloh")).toBeInTheDocument();
    expect(screen.queryByText("Pittard Sears")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Commercial" }));
    expect(screen.getByText("No projects match the selected filters.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Reset Filters" }));
    expect(screen.getByText("Pittard Sears")).toBeInTheDocument();
    expect(screen.queryByText("No projects match the selected filters.")).not.toBeInTheDocument();
  });

  it("renders a detail route and excludes the current project from related cards", () => {
    renderProjectDetail("the-shiloh");

    expect(screen.getByRole("heading", { name: "The Shiloh" })).toBeInTheDocument();
    expect(screen.getByText("Project Overview")).toBeInTheDocument();
    expect(screen.getByText("Explore More Projects")).toBeInTheDocument();
    expect(screen.queryAllByText("The Shiloh")).toHaveLength(1);
  });

  it("renders not found for an invalid project slug", () => {
    renderProjectDetail("does-not-exist");

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Oops! Page not found")).toBeInTheDocument();
  });
});
