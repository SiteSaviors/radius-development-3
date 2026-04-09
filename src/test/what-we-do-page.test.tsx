import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Index from "@/pages/Index";
import WhatWeDo from "@/pages/WhatWeDo";

vi.spyOn(window.HTMLMediaElement.prototype, "play").mockImplementation(() => Promise.resolve());
vi.spyOn(window.HTMLMediaElement.prototype, "pause").mockImplementation(() => {});

const renderWhatWeDoPage = () =>
  render(
    <MemoryRouter initialEntries={["/what-we-do"]}>
      <Routes>
        <Route path="/what-we-do" element={<WhatWeDo />} />
      </Routes>
    </MemoryRouter>
  );

const renderHomePage = () =>
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </MemoryRouter>
  );

describe("what we do page", () => {
  it("renders the standalone route with the process list and closing CTA", () => {
    renderWhatWeDoPage();

    expect(
      screen.getByRole("heading", { name: "We Create Value Before the Market Fully Prices It" })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Our Step-By-Step Approach To Land Development" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Site Sourcing" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Final Review And Handover" })).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(4);
    expect(screen.getByRole("link", { name: "Contact Radius" })).toHaveAttribute("href", "/#contact");
  });

  it("renders the universe section closed by default and expands a selected sector in place", () => {
    renderWhatWeDoPage();

    expect(screen.getByRole("heading", { name: "Private Real Estate Development Universe" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Residential" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Commercial" })).toBeInTheDocument();
    expect(screen.queryByText("Multifamily")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Residential" }));

    expect(screen.getByRole("heading", { name: "Residential" })).toBeInTheDocument();
    expect(screen.getByText("Multifamily")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Collapse Residential" }));

    expect(screen.queryByText("Multifamily")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Residential" })).toBeInTheDocument();
  });

  it("uses the standalone what we do route in shared header and footer links", () => {
    renderWhatWeDoPage();

    const whatWeDoLinks = screen.getAllByRole("link", { name: "What We Do" });
    expect(whatWeDoLinks[0]).toHaveAttribute("href", "/what-we-do");
    expect(whatWeDoLinks[1]).toHaveAttribute("href", "/what-we-do");
  });

  it("routes homepage capability ctas to the standalone page", () => {
    renderHomePage();

    expect(screen.getByRole("link", { name: "Let's Talk Land" })).toHaveAttribute("href", "/what-we-do");
    expect(screen.getByRole("link", { name: "Let's Talk Development" })).toHaveAttribute("href", "/what-we-do");
    expect(screen.getByRole("link", { name: "Let's Talk Retail" })).toHaveAttribute("href", "/what-we-do");
  });
});
