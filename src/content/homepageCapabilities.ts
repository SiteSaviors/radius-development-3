import jointVenturesBg from "@/assets/joint-ventures.jpg";
import landEntitlementBg from "@/assets/LAND-ENTITLEMENT-2200-q86.webp";
import luxRetailBg from "@/assets/LUX-RETAIL-2200-q86.webp";

export type HomepageCapabilityId = "land" | "development" | "retail";

export type HomepageCapability = {
  id: HomepageCapabilityId;
  eyebrow: string;
  title: string;
  summary: string;
  detail: string;
  ctaLabel: string;
  href: string;
  image: string;
  tone: "land" | "development" | "retail";
  icon: "land" | "development" | "retail";
};

export const homepageCapabilities: HomepageCapability[] = [
  {
    id: "land",
    eyebrow: "01 / Land",
    title: "Land Entitlement",
    summary: "Off-market land control in high-growth corridors.",
    detail:
      "Local relationships and proprietary sourcing help Radius secure sites before the broader market sees them.",
    ctaLabel: "Let's Talk Land",
    href: "/what-we-do",
    image: landEntitlementBg,
    tone: "land",
    icon: "land",
  },
  {
    id: "development",
    eyebrow: "02 / Development",
    title: "Development Partnerships",
    summary: "Institutional partnerships built for speed and execution.",
    detail:
      "We structure with best-in-class developers to align timing, returns, and long-term community value.",
    ctaLabel: "Let's Talk Development",
    href: "/what-we-do",
    image: jointVenturesBg,
    tone: "development",
    icon: "development",
  },
  {
    id: "retail",
    eyebrow: "03 / Retail",
    title: "Retail Development",
    summary: "Destination retail concepts in underserved premium markets.",
    detail:
      "We shape retail environments that fuse dining, service, and place into a cohesive destination.",
    ctaLabel: "Let's Talk Retail",
    href: "/what-we-do",
    image: luxRetailBg,
    tone: "retail",
    icon: "retail",
  },
];
