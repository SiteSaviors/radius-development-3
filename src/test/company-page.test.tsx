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
    const numbersSection = screen.getByRole("region", { name: "Radius By The Numbers" });
    const aboutSection = screen.getByRole("region", { name: "Principal-led land strategy built for long-term value." });
    const missionSection = screen.getByRole("region", { name: "Our Mission" });
    const teamSection = screen.getByRole("region", { name: "Meet The Team" });

    expect(heroHeading).toBeInTheDocument();
    expect(numbersSection).toBeInTheDocument();
    expect(aboutSection).toBeInTheDocument();
    expect(missionSection).toBeInTheDocument();
    expect(teamSection).toBeInTheDocument();
    expect(heroHeading.compareDocumentPosition(numbersSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(numbersSection.compareDocumentPosition(aboutSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(aboutSection.compareDocumentPosition(missionSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(missionSection.compareDocumentPosition(teamSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(numbersSection.compareDocumentPosition(missionSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Radius By The Numbers" })).toBeInTheDocument();
    expect(screen.getByText("ACTIVE PIPELINE")).toBeInTheDocument();
    expect(screen.getByText("SQ FT DEVELOPED")).toBeInTheDocument();
    expect(screen.getByText("RESIDENTIAL UNITS")).toBeInTheDocument();
    expect(screen.getByText("LAND VALUE CREATION")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Principal-led land strategy built for long-term value." })).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "A wide city-view balcony overlooking an urban skyline at sunset" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "A modern Radius residential interior with open living space" })
    ).toBeInTheDocument();
    expect(heroHeading.compareDocumentPosition(missionSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByText("Our Mission")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "A trusted, innovative partner focused on lasting value." })
    ).toBeInTheDocument();
    expect(screen.getByText("Integrity")).toBeInTheDocument();
    expect(screen.getByText("Innovative")).toBeInTheDocument();
    expect(screen.getByText("Thinking")).toBeInTheDocument();
    expect(screen.getByText("Community")).toBeInTheDocument();
    expect(screen.getByText("Impact")).toBeInTheDocument();
    expect(screen.getByText("Collaboration")).toBeInTheDocument();
    expect(screen.getByText("Relationships")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Interactive mission values wheel" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Meet The Team" })).toBeInTheDocument();
    expect(screen.getByText("Ricky Joshi")).toBeInTheDocument();
    expect(screen.getByText("Gaurang Gala")).toBeInTheDocument();
    expect(screen.getByText("Tarek Morshed")).toBeInTheDocument();
    expect(screen.getByText("Elizabeth Eichen")).toBeInTheDocument();
    expect(screen.getAllByText("Additional Team Member")).toHaveLength(2);
    expect(screen.getAllByRole("button", { name: /Learn more about/i })).toHaveLength(6);
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
    expect(screen.queryByText("We act with")).not.toBeInTheDocument();

    fireEvent.click(integrityButton);

    expect(integrityButton).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("We act with")).toBeInTheDocument();
    expect(within(wheel).queryByText("radius")).not.toBeInTheDocument();

    fireEvent.click(integrityButton);

    expect(integrityButton).toHaveAttribute("aria-pressed", "false");
    expect(screen.queryByText("We act with")).not.toBeInTheDocument();
    expect(within(wheel).getByText("radius")).toBeInTheDocument();

    fireEvent.keyDown(communityImpactButton, { key: "Enter" });

    expect(communityImpactButton).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("We work to positively")).toBeInTheDocument();

    fireEvent.keyDown(communityImpactButton, { key: " " });

    expect(communityImpactButton).toHaveAttribute("aria-pressed", "false");
    expect(screen.queryByText("We work to positively")).not.toBeInTheDocument();
    expect(within(wheel).getByText("radius")).toBeInTheDocument();
  });

  it("opens and closes the centered team modal from card triggers", () => {
    renderCompanyPage();

    const rickyTrigger = screen.getByRole("button", { name: "Learn more about Ricky Joshi" });

    fireEvent.click(rickyTrigger);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText("Ricky Joshi")).toBeInTheDocument();
    expect(within(dialog).getByText("General Partner")).toBeInTheDocument();
    expect(within(dialog).getByText(/Lorem ipsum dolor sit amet/i)).toBeInTheDocument();
    expect(within(dialog).getByRole("img", { name: "Portrait of Ricky Joshi" })).toBeInTheDocument();

    fireEvent.click(within(dialog).getByRole("button", { name: "Close" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes the team modal with Escape and supports placeholder members", () => {
    renderCompanyPage();

    const placeholderTrigger = screen.getAllByRole("button", { name: "Learn more about Additional Team Member" })[0];

    fireEvent.click(placeholderTrigger);

    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText("Additional Team Member")).toBeInTheDocument();
    expect(within(dialog).getByText("Leadership Role")).toBeInTheDocument();
    expect(
      within(dialog).getByRole("img", { name: "Placeholder portrait for future team member" })
    ).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
