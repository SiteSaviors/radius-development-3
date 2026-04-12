import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Company from "@/pages/Company";

const renderCompanyPage = () =>
  render(
    <MemoryRouter initialEntries={["/company"]}>
      <Routes>
        <Route path="/company" element={<Company />} />
      </Routes>
    </MemoryRouter>
  );

describe("company page", () => {
  it("renders the standalone company route with the duplicated hero, mission section, and route-aware company links", () => {
    renderCompanyPage();

    const heroHeading = screen.getByRole("heading", { name: "Future Focused Real Estate" });
    const missionSection = screen.getByRole("region", { name: "Our Mission" });

    expect(heroHeading).toBeInTheDocument();
    expect(missionSection).toBeInTheDocument();
    expect(heroHeading.compareDocumentPosition(missionSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Our Mission" })).toBeInTheDocument();
    expect(screen.getByText("Integrity")).toBeInTheDocument();
    expect(screen.getByText("Innovative")).toBeInTheDocument();
    expect(screen.getByText("Thinking")).toBeInTheDocument();
    expect(screen.getByText("Community")).toBeInTheDocument();
    expect(screen.getByText("Impact")).toBeInTheDocument();
    expect(screen.getByText("Collaboration")).toBeInTheDocument();
    expect(screen.getByText("Relationships")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Interactive mission values wheel" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /company/i })[0]).toHaveAttribute("href", "/company");
    expect(screen.getAllByRole("link", { name: /company/i })[1]).toHaveAttribute("href", "/company");
    expect(screen.getAllByRole("link", { name: "What We Do" })[0]).toHaveAttribute("href", "/what-we-do");
  });

  it("toggles wheel content by click and keyboard while restoring the default wordmark when closed", () => {
    renderCompanyPage();

    const wheel = screen.getByRole("img", { name: "Interactive mission values wheel" });
    const integrityButton = screen.getByRole("button", { name: "Integrity" });
    const communityImpactButton = screen.getByRole("button", { name: "Community Impact" });

    expect(within(wheel).getByText("radius")).toBeInTheDocument();
    expect(screen.queryByText("We act with honesty,")).not.toBeInTheDocument();

    fireEvent.click(integrityButton);

    expect(integrityButton).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("We act with honesty,")).toBeInTheDocument();
    expect(within(wheel).queryByText("radius")).not.toBeInTheDocument();

    fireEvent.click(integrityButton);

    expect(integrityButton).toHaveAttribute("aria-pressed", "false");
    expect(screen.queryByText("We act with honesty,")).not.toBeInTheDocument();
    expect(within(wheel).getByText("radius")).toBeInTheDocument();

    fireEvent.keyDown(communityImpactButton, { key: "Enter" });

    expect(communityImpactButton).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("We work to positively impact")).toBeInTheDocument();

    fireEvent.keyDown(communityImpactButton, { key: " " });

    expect(communityImpactButton).toHaveAttribute("aria-pressed", "false");
    expect(screen.queryByText("We work to positively impact")).not.toBeInTheDocument();
    expect(within(wheel).getByText("radius")).toBeInTheDocument();
  });
});
