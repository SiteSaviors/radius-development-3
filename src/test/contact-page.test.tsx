import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import Contact from "@/pages/Contact";

const renderContactPage = () =>
  render(
    <MemoryRouter initialEntries={["/contact"]}>
      <Routes>
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </MemoryRouter>
  );

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("contact page", () => {
  it("renders the standalone contact route with page content, contact details, and route-aware nav links", () => {
    renderContactPage();
    const details = screen.getByLabelText("Contact details");

    expect(
      screen.getByRole("heading", { name: "Let’s build something better together" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "If you are evaluating land, development, or partnership opportunities, Radius is positioned to help shape a clearer path to value."
      )
    ).toBeInTheDocument();
    expect(within(details).getByText("info@developnc.com")).toBeInTheDocument();
    expect(within(details).getByText("(919) 275-0109")).toBeInTheDocument();
    expect(within(details).getByText("105 Kilmayne Drive, Suite C, Cary, NC 27511")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send Inquiry" })).toBeInTheDocument();
    expect(document.querySelector("footer#contact")).not.toBeNull();

    screen.getAllByRole("link", { name: "Contact" }).forEach((link) => {
      expect(link).toHaveAttribute("href", "/contact");
    });
  });

  it("shows validation errors for incomplete or invalid submissions", async () => {
    renderContactPage();

    fireEvent.click(screen.getByRole("button", { name: "Send Inquiry" }));

    expect(await screen.findByText("Please enter your name.")).toBeInTheDocument();
    expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument();
    expect(screen.getByText("Please share a few more details.")).toBeInTheDocument();
  });

  it("shows the inline success state when no endpoint is configured", async () => {
    vi.useFakeTimers();
    vi.stubGlobal("requestAnimationFrame", vi.fn(() => 0));
    vi.stubGlobal("cancelAnimationFrame", vi.fn());
    renderContactPage();

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Taylor Radius" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "taylor@example.com" } });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "I would like to discuss a development opportunity in Cary." },
    });

    fireEvent.click(screen.getByRole("button", { name: "Send Inquiry" }));

    expect(screen.getByRole("button", { name: "Sending..." })).toBeDisabled();

    await act(async () => {
      await vi.runAllTimersAsync();
    });

    expect(await screen.findByRole("heading", { name: "Inquiry received" })).toBeInTheDocument();
    expect(
      screen.getByText("Thanks for reaching out. We’ll review your message and follow up soon.")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send another inquiry" })).toBeInTheDocument();
  });

  it("posts to a configured endpoint and preserves values on failure", async () => {
    vi.stubEnv("VITE_CONTACT_FORM_ENDPOINT", "https://example.com/contact");
    const fetchMock = vi.fn().mockResolvedValue({ ok: false });
    vi.stubGlobal("fetch", fetchMock);

    renderContactPage();

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Taylor Radius" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "taylor@example.com" } });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "I would like to discuss a development opportunity in Cary." },
    });

    fireEvent.click(screen.getByRole("button", { name: "Send Inquiry" }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    expect(
      await screen.findByText("We couldn’t send your message right now. Please try again in a moment.")
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("Taylor Radius")).toBeInTheDocument();
    expect(screen.getByDisplayValue("taylor@example.com")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("I would like to discuss a development opportunity in Cary.")
    ).toBeInTheDocument();
  });
});
