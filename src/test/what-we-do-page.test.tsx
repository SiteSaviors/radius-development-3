import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { homepageAdvantageContent } from "@/content/homepageAdvantage";
import { homepageCapabilities } from "@/content/homepageCapabilities";
import { whatWeDoHero, whatWeDoMirrorIntro } from "@/content/whatWeDo";
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
  it("renders the standalone route with the bridge section, process list, and closing CTA", () => {
    renderWhatWeDoPage();

    expect(screen.getByRole("heading", { name: whatWeDoHero.title })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "We don't merely acquire value. We create it." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "We don't merely acquire value. We create it." })).toBeInTheDocument();
    expect(
      screen.getByText(/Radius approaches each opportunity with a value-creation mindset/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "The Franklin mixed-use development exterior at sunset" })
    ).toBeInTheDocument();
    expect(screen.getByRole("region", { name: whatWeDoMirrorIntro.title })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: whatWeDoMirrorIntro.title })).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Pittard residential land plan showing lot layout and circulation" })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Our Step-By-Step Approach To Land Development" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Acquire with Edge" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Execute & Realize Returns" })).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(4);
    expect(screen.getByRole("link", { name: "Contact Radius" })).toHaveAttribute("href", "/#contact");
  });

  it("renders the bridge section before the universe section and keeps universe interactions intact", () => {
    renderWhatWeDoPage();

    const bridgeSection = screen.getByRole("region", { name: "We don't merely acquire value. We create it." });
    const mirroredBridgeSection = screen.getByRole("region", { name: whatWeDoMirrorIntro.title });
    const universeSection = screen.getByRole("region", { name: "Radius Development Universe" });
    const residentialButton = screen.getByRole("button", { name: "Residential" });
    const residentialContent = document.getElementById("wwd-uc-content-residential");

    expect(bridgeSection.compareDocumentPosition(mirroredBridgeSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(mirroredBridgeSection.compareDocumentPosition(universeSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Radius Development Universe" })).toBeInTheDocument();
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
  });
});
