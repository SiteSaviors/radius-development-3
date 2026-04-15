import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomepageSignatureProofSection from "@/components/home/HomepageSignatureProofSection";
import { signatureProofContent } from "@/content/signatureProof";

const renderSection = () => render(<HomepageSignatureProofSection content={signatureProofContent} />);

describe("homepage signature proof section", () => {
  it("renders the locked thesis copy without the old proof box content", () => {
    renderSection();

    expect(screen.getByText(signatureProofContent.eyebrow)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: signatureProofContent.headline })
    ).toBeInTheDocument();
    expect(screen.getByText(signatureProofContent.subtext)).toBeInTheDocument();
    expect(screen.queryByText("2.2x")).not.toBeInTheDocument();
    expect(screen.queryByText("Average Return Multiple")).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        "The best land deals rarely make it to market. We are built to see them early and execute with precision."
      )
    ).not.toBeInTheDocument();
  });

  it("does not render the removed strategic pillar bar", () => {
    renderSection();

    expect(screen.queryByText("Speed")).not.toBeInTheDocument();
    expect(screen.queryByText("Structure")).not.toBeInTheDocument();
    expect(screen.queryByText("Access")).not.toBeInTheDocument();
    expect(screen.queryByText("Selectivity")).not.toBeInTheDocument();
  });

  it("renders the proof video with required playback behavior", () => {
    const { container } = renderSection();
    const video = container.querySelector(".signature-proof__video") as HTMLVideoElement | null;

    expect(video).not.toBeNull();
    expect(video).toHaveAttribute("autoplay");
    expect(video).toHaveAttribute("loop");
    expect(video).toHaveAttribute("playsinline");
    expect(video).toHaveAttribute("preload", "metadata");
    expect(video).toHaveAttribute("aria-hidden", "true");
    expect(video?.muted).toBe(true);
    expect(video?.controls).toBe(false);
  });

  it("renders the representative outcome overlay content", () => {
    renderSection();

    expect(screen.getByText(signatureProofContent.outcome.eyebrow)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: signatureProofContent.outcome.title })
    ).toBeInTheDocument();
    expect(screen.getByText(signatureProofContent.outcome.location)).toBeInTheDocument();
    expect(screen.getByText(signatureProofContent.outcome.value)).toBeInTheDocument();
    expect(screen.getByText(signatureProofContent.outcome.label)).toBeInTheDocument();
    expect(screen.getByText(signatureProofContent.outcome.holdValue)).toBeInTheDocument();
    expect(screen.getByText(signatureProofContent.outcome.holdLabel)).toBeInTheDocument();
    expect(screen.getByText(signatureProofContent.outcome.supportingLine)).toBeInTheDocument();

    signatureProofContent.outcome.chips.forEach((chip) => {
      expect(screen.getByText(chip)).toBeInTheDocument();
    });

    expect(screen.getByText(signatureProofContent.outcome.footer)).toBeInTheDocument();
  });

  it("does not render the old separated section headings", () => {
    renderSection();

    expect(screen.queryByText("Our Track Record")).not.toBeInTheDocument();
    expect(screen.queryByText("Built for Speed, Structure, and Scale")).not.toBeInTheDocument();
  });
});
