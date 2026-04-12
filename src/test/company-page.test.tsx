import { render, screen } from "@testing-library/react";
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
  it("renders the standalone company route with the duplicated hero and route-aware company links", () => {
    renderCompanyPage();

    expect(screen.getByRole("heading", { name: "Future Focused Real Estate" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /company/i })[0]).toHaveAttribute("href", "/company");
    expect(screen.getAllByRole("link", { name: /company/i })[1]).toHaveAttribute("href", "/company");
    expect(screen.getAllByRole("link", { name: "What We Do" })[0]).toHaveAttribute("href", "/what-we-do");
  });
});
