import todBg from "@/assets/TOD.jpg";
import woodPartnersLogo from "@/assets/Wood-Partners.webp";

export type ClosedStripStat = {
  label: string;
  value: string;
};

export type RecentlyClosedSpotlightContent = {
  eyebrow: string;
  title: string;
  location: string;
  thesis: string;
  scope: string;
  role: string;
  buyerLabel: string;
  buyerName: string;
  buyerLogo: string;
  outcomeLabel: string;
  outcomeMeta: string;
  outcomeValue: string;
  outcomeAnimatedEnd: number;
  outcomeDecimals: number;
  outcomeSuffix: string;
  stripStats: ClosedStripStat[];
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
  scope: "350 Units",
  role: "Land Assembly",
  buyerLabel: "Delivered to",
  buyerName: "Wood Partners",
  buyerLogo: woodPartnersLogo,
  outcomeLabel: "Return Multiple",
  outcomeMeta: "Value Creation · 3-Year Hold",
  outcomeValue: "2.1×",
  outcomeAnimatedEnd: 2.1,
  outcomeDecimals: 1,
  outcomeSuffix: "×",
  stripStats: [
    { label: "Total Transactions", value: "12+" },
    { label: "Markets", value: "4" },
    { label: "Avg. Hold Period", value: "18 mo." },
    { label: "Avg. Return Multiple", value: "2.2×" },
  ],
  image: todBg,
  imagePosition: "center 44%",
};
