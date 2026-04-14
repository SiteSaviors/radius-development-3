import whoWeAreBg from "@/assets/3.jpg";

export type HomepageAdvantageMetricId =
  | "active-pipeline"
  | "sq-ft-developed"
  | "residential-units"
  | "land-value-creation";

export type HomepageAdvantageMetric = {
  id: HomepageAdvantageMetricId;
  value: string;
  animatedEnd: number;
  decimals: number;
  suffix: string;
  label: string;
  role: "hero" | "support";
};

export type HomepageAdvantageContent = {
  eyebrow: string;
  title: string;
  body: string[];
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
  proofEyebrow: string;
  proofTitle: string;
  metrics: HomepageAdvantageMetric[];
};

export const homepageAdvantageContent: HomepageAdvantageContent = {
  eyebrow: "THE RADIUS ADVANTAGE",
  title: "Building Beyond Expectations",
  body: [
    "Our creative approach to real estate and principal-led execution have allowed Radius to invest across mixed-use, affordable housing, residential condos, commercial office, and retail with unusual discipline and range.",
    "We work collaboratively across our business units to add value to partners, elevate execution, and solve complex real estate challenges in ways that create stronger outcomes for the communities we serve.",
  ],
  ctaLabel: "Learn More",
  ctaHref: "/company",
  image: whoWeAreBg,
  imageAlt: "Modern multifamily development exterior representing Radius platform execution",
  proofEyebrow: "Radius at a Glance",
  proofTitle: "",
  metrics: [
    {
      id: "active-pipeline",
      value: "1.1B",
      animatedEnd: 1.1,
      decimals: 1,
      suffix: "B",
      label: "ACTIVE PIPELINE",
      role: "hero",
    },
    {
      id: "sq-ft-developed",
      value: "300,000",
      animatedEnd: 300000,
      decimals: 0,
      suffix: "",
      label: "SQ FT DEVELOPED",
      role: "support",
    },
    {
      id: "residential-units",
      value: "2,200",
      animatedEnd: 2200,
      decimals: 0,
      suffix: "",
      label: "RESIDENTIAL UNITS",
      role: "support",
    },
    {
      id: "land-value-creation",
      value: "2.2X",
      animatedEnd: 2.2,
      decimals: 1,
      suffix: "X",
      label: "LAND VALUE CREATION",
      role: "support",
    },
  ],
};
