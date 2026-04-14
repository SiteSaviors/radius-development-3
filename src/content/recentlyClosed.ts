import todBg from "@/assets/TOD.jpg";
import woodPartnersLogo from "@/assets/Wood-Partners.webp";

export type RecentlyClosedSpotlightContent = {
  eyebrow: string;
  title: string;
  location: string;
  headline: string;
  summary: string;
  scope: string;
  role: string;
  buyerName: string;
  buyerLogo: string;
  outcomeLabel: string;
  outcomeMeta: string;
  outcomeValue: string;
  image: string;
  imagePosition?: string;
  mobileImage?: string;
  mobileImagePosition?: string;
};

export const recentlyClosedContent: RecentlyClosedSpotlightContent = {
  eyebrow: "Transaction Spotlight",
  title: "TOD - Phase One",
  location: "Research Triangle Park, NC",
  headline: "Fully-Entitled TOD land project delivered to a national multifamily developer.",
  summary:
    "Radius executed the land assembly, acquisition, and rezoning strategy for TOD Phase 1, converting the site into a market-ready opportunity for institutional-scale residential delivery.",
  scope: "350 Class-A Multifamily Units",
  role: "Land Assembly, Acquisition, Rezoning",
  buyerName: "Wood Partners",
  buyerLogo: woodPartnersLogo,
  outcomeLabel: "Outcome",
  outcomeMeta: "Value Creation in 3 Years",
  outcomeValue: "2.1x Return",
  image: todBg,
  imagePosition: "center 44%",
};
