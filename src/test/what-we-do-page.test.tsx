import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { homepageAdvantageContent } from "@/content/homepageAdvantage";
import { homepageCapabilities } from "@/content/homepageCapabilities";
import { signatureProofContent } from "@/content/signatureProof";
import {
  whatWeDoFrameworkChapters,
  whatWeDoFrameworkHandoff,
  whatWeDoHero,
  whatWeDoUniverse,
} from "@/content/whatWeDo";
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
  it("renders the standalone route with the premium framework, universe section, and closing CTA", () => {
    renderWhatWeDoPage();

    expect(screen.getByRole("heading", { name: whatWeDoHero.title })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: whatWeDoFrameworkHandoff.eyebrow })).toBeInTheDocument();
    expect(screen.queryByText("Value creation starts before the site reaches the market.")).not.toBeInTheDocument();
    expect(screen.queryByText(/Radius combines early conviction/i)).not.toBeInTheDocument();
    expect(screen.queryByText("THE RADIUS APPROACH")).not.toBeInTheDocument();

    expect(screen.getByText(whatWeDoFrameworkHandoff.eyebrow)).toBeInTheDocument();
    whatWeDoFrameworkHandoff.items.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
    expect(whatWeDoFrameworkHandoff.items).toHaveLength(4);
    expect(whatWeDoFrameworkChapters).toHaveLength(4);

    whatWeDoFrameworkChapters.forEach((chapter) => {
      expect(
        screen.getByText(`${chapter.sequence} / ${chapter.navLabel.toUpperCase()}`)
      ).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: chapter.title })).toBeInTheDocument();
      chapter.paragraphs.forEach((paragraph) => {
        expect(screen.getByText(paragraph)).toBeInTheDocument();
      });
      expect(screen.getAllByRole("img", { name: chapter.alt }).length).toBeGreaterThan(0);
      expect(screen.getAllByText(chapter.caption).length).toBeGreaterThan(0);
      chapter.proofPoints.forEach((point) => {
        expect(screen.getByText(point.label)).toBeInTheDocument();
      });
    });

    expect(screen.queryByText("Our Step-By-Step Approach To Land Development")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Acquire with Edge" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Execute & Realize Returns" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact Radius" })).toHaveAttribute("href", "/#contact");
  });

  it("renders the framework before the universe section and keeps universe interactions intact", () => {
    renderWhatWeDoPage();

    const frameworkSection = screen.getByRole("region", { name: whatWeDoFrameworkHandoff.eyebrow });
    const universeSection = screen.getByRole("region", { name: whatWeDoUniverse.title });
    const residentialButton = screen.getByRole("button", { name: "Residential" });
    const residentialContent = document.getElementById("wwd-uc-content-residential");

    expect(frameworkSection.compareDocumentPosition(universeSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    const chapterHeadings = whatWeDoFrameworkChapters.map((chapter) =>
      screen.getByRole("heading", { name: chapter.title })
    );
    chapterHeadings.slice(1).forEach((heading, index) => {
      expect(
        chapterHeadings[index].compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_FOLLOWING
      ).toBeTruthy();
    });
    expect(screen.getByRole("heading", { name: whatWeDoUniverse.title })).toBeInTheDocument();
    expect(residentialButton).toHaveAttribute("aria-expanded", "false");
    expect(residentialContent).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByRole("button", { name: "Commercial" })).toBeInTheDocument();

    fireEvent.click(residentialButton);

    expect(screen.getByRole("heading", { name: "Residential" })).toBeInTheDocument();
    expect(screen.getByText("Multifamily")).toBeInTheDocument();
    expect(residentialButton).toHaveAttribute("aria-expanded", "true");
    expect(residentialContent).toHaveAttribute("aria-hidden", "false");

    fireEvent.click(residentialButton);

    expect(residentialButton).toHaveAttribute("aria-expanded", "false");
    expect(residentialContent).toHaveAttribute("aria-hidden", "true");
  });

  it("uses the standalone what we do route in shared header and footer links", () => {
    renderWhatWeDoPage();

    const whatWeDoLinks = screen.getAllByRole("link", { name: "What We Do" });
    expect(whatWeDoLinks[0]).toHaveAttribute("href", "/what-we-do");
    expect(whatWeDoLinks[1]).toHaveAttribute("href", "/what-we-do");
    expect(screen.getAllByRole("link", { name: /company/i })[0]).toHaveAttribute("href", "/company");
    expect(screen.getAllByRole("link", { name: /company/i })[1]).toHaveAttribute("href", "/company");
  });

  it("routes homepage capability ctas to the standalone page", () => {
    renderHomePage();

    expect(screen.getByRole("heading", { name: homepageAdvantageContent.title })).toBeInTheDocument();
    homepageAdvantageContent.body.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });
    expect(screen.getByText(homepageAdvantageContent.proofEyebrow)).toBeInTheDocument();
    if (homepageAdvantageContent.proofTitle) {
      expect(screen.getByText(homepageAdvantageContent.proofTitle)).toBeInTheDocument();
    }
    expect(screen.getByRole("link", { name: homepageAdvantageContent.ctaLabel })).toHaveAttribute("href", "/company");
    homepageAdvantageContent.metrics.forEach((metric) => {
      expect(screen.getByText(metric.label)).toBeInTheDocument();
      expect(document.getElementById(`wwa-metric-${metric.id}`)).not.toBeNull();
    });

    homepageCapabilities.forEach((capability) => {
      expect(screen.getByRole("heading", { name: capability.title })).toBeInTheDocument();
      expect(screen.getByText(capability.summary)).toBeInTheDocument();
      expect(screen.getByRole("link", { name: capability.ctaLabel })).toHaveAttribute("href", "/what-we-do");
    });

    expect(screen.getByText(signatureProofContent.eyebrow)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: signatureProofContent.headline })).toBeInTheDocument();
    expect(screen.getByText(signatureProofContent.outcome.footer)).toBeInTheDocument();
    expect(screen.queryByText("Our Track Record")).not.toBeInTheDocument();
    expect(screen.queryByText("Built for Speed, Structure, and Scale")).not.toBeInTheDocument();
  });
});
