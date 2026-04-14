import todBg from "@/assets/TOD.jpg";
import woodPartnersLogo from "@/assets/Wood-Partners.webp";

export type RecentlyClosedSpotlightContent = {
  eyebrow: string;
  title: string;
  location: string;
  thesis: string;
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
  thesis: "Fully entitled TOD land project delivered to a national multifamily developer.",
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
