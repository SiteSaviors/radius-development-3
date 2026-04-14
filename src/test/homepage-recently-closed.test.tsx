import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomepageRecentlyClosedSpotlight from "@/components/home/HomepageRecentlyClosedSpotlight";
import {
  recentlyClosedContent,
  type RecentlyClosedSpotlightContent,
} from "@/content/recentlyClosed";

describe("homepage recently closed spotlight", () => {
  it("renders the compact trophy panel content", () => {
    render(<HomepageRecentlyClosedSpotlight content={recentlyClosedContent} />);

    expect(screen.getByText("Closed")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: recentlyClosedContent.title, level: 3 })
    ).toBeInTheDocument();
    expect(screen.getByText(recentlyClosedContent.location)).toBeInTheDocument();
    expect(screen.getByText(recentlyClosedContent.outcomeValue)).toBeInTheDocument();
    expect(screen.getByText(recentlyClosedContent.outcomeMeta)).toBeInTheDocument();
    expect(screen.getByAltText(recentlyClosedContent.buyerName)).toBeInTheDocument();
    expect(screen.getByText(recentlyClosedContent.thesis)).toBeInTheDocument();

    const facts = within(screen.getByRole("list", { name: "Transaction facts" })).getAllByRole(
      "listitem"
    );
    expect(facts).toHaveLength(2);
    expect(screen.queryByText("Strategy")).not.toBeInTheDocument();
  });

  it("supports optional mobile art direction fields", () => {
    const mobileContent: RecentlyClosedSpotlightContent = {
      ...recentlyClosedContent,
      mobileImage: "/tod-mobile.jpg",
      mobileImagePosition: "center 28%",
    };

    render(<HomepageRecentlyClosedSpotlight content={mobileContent} />);

    const source = document.querySelector(
      '.closed-trophy__media source[media="(max-width: 768px)"]'
    );
    const media = document.querySelector(".closed-trophy__media");

    expect(source).not.toBeNull();
    expect(source).toHaveAttribute("srcset", "/tod-mobile.jpg");
    expect(media).toHaveStyle({
      "--closed-mobile-image-position": "center 28%",
    });
  });
});
