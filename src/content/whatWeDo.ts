import whatWeDoBridgeImage from "@/assets/Franklin.jpg";
import whatWeDoBridgeMirrorImage from "@/assets/Pittard.jpg";

export type WhatWeDoProcessStep = {
  step: string;
  title: string;
  body: string;
};

export type WhatWeDoHeroContent = {
  eyebrow: string;
  title: string;
  body: string;
};

export type WhatWeDoIntroContent = {
  title: string;
  paragraphs: string[];
};

export type WhatWeDoProcessIntroContent = {
  title: string;
  bodyStart: string;
  bodyHighlight: string;
  bodyEnd: string;
};

export type WhatWeDoUniverseContent = {
  title: string;
  body: string;
};

export type WhatWeDoUniverseSector = {
  id: string;
  title: string;
  items: string[];
};

export type WhatWeDoCtaContent = {
  title: string;
  body: string;
  label: string;
  href: string;
};

export type WhatWeDoBridgeContent = {
  image: string;
  alt: string;
  caption?: string;
};

export type WhatWeDoFrameworkProofPoint = {
  label: string;
};

export type WhatWeDoFrameworkChapter = {
  id:
    | "strategic-acquisition"
    | "entitlement-strategy"
    | "capital-strategy"
    | "value-realization";
  sequence: "01" | "02" | "03" | "04";
  navLabel: string;
  layout: "media-right" | "media-left";
  title: string;
  paragraphs: string[];
  image: string;
  alt: string;
  caption: string;
  tone: "green" | "gold";
  proofPoints: WhatWeDoFrameworkProofPoint[];
};

export type WhatWeDoFrameworkHandoffItem = {
  label: string;
};

export type WhatWeDoFrameworkHandoff = {
  eyebrow: string;
  items: WhatWeDoFrameworkHandoffItem[];
};

export const whatWeDoHero: WhatWeDoHeroContent = {
  eyebrow: "WHAT WE DO",
  title: "Future-Focused Development",
  body:
    "Whether we’re creating new retail, office, multifamily, or mixed-use projects or revitalizing existing properties, we’re driven by the opportunity to bring great places to life.",
};

export const whatWeDoIntro: WhatWeDoIntroContent = {
  title: "We don't merely acquire value. We create it.",
  paragraphs: [
    "Radius approaches each opportunity with a value-creation mindset rooted in land strategy, development intelligence, and institutional alignment.",
    "From early sourcing to downstream execution, our role is to make complex opportunities cleaner, stronger, and more actionable.",
  ],
};

export const whatWeDoProcessIntro: WhatWeDoProcessIntroContent = {
  title: "Our Step-By-Step Approach To Land Development",
  bodyStart: "We start with a site review and move through ",
  bodyHighlight: "zoning, permitting, and planning,",
  bodyEnd:
    " then handle the full build. From raw land to finished projects, we manage each step to keep things clear, on track, and built right.",
};

export const whatWeDoProcessSteps: WhatWeDoProcessStep[] = [
  {
    step: "01",
    title: "Acquire with Edge",
    body: "Source and control high-quality land positions through proprietary channels, local relationships, and disciplined underwriting. We focus on assets in structurally advantaged markets with clear demand drivers and favorable long-term fundamentals. Every acquisition is grounded in a defined path to value creation.",
  },
  {
    step: "02",
    title: "Entitle for Maximum Value",
    body: "Drive the entitlement and planning process to unlock the highest and best use of each site. We manage zoning, approvals, and site design with precision, reducing risk, increasing certainty, and positioning the asset for institutional-quality execution. This phase transforms land into a financeable, development-ready investment.",
  },
  {
    step: "03",
    title: "Select the Optimal Strategy",
    body: "Determine the highest-value execution path based on market dynamics, capital efficiency, and risk-adjusted returns. We maintain full flexibility, pursuing vertical development, structuring joint ventures with leading operators, or monetizing the asset through a sale. Capital is allocated where it is most effective, not constrained by a fixed model.",
  },
  {
    step: "04",
    title: "Execute & Realize Returns",
    body: "Execute with speed and discipline to capture value and deliver strong outcomes. We focus on clean transactions, aligned partnerships, and efficient capital recycling, whether through a land sale, structured JV, or selective long-term hold. Each project is managed with a clear objective: maximize returns while preserving optionality.",
  },
];

export const whatWeDoUniverse: WhatWeDoUniverseContent = {
  title: "Radius Development Universe",
  body: "Radius operates across four primary sectors, with each opportunity shaped through disciplined land strategy, development judgment, and execution readiness.",
};

export const whatWeDoBridge: WhatWeDoBridgeContent = {
  image: whatWeDoBridgeImage,
  alt: "The Franklin mixed-use development exterior at sunset",
  caption: "The Franklin",
};

export const whatWeDoMirrorIntro: WhatWeDoIntroContent = {
  title: "We position every opportunity around real market demand.",
  paragraphs: [
    "Radius studies growth patterns, supply pipelines, and demand signals early so each opportunity is positioned against the realities of its market, not assumptions.",
    "We use market strategy to inform product mix, phasing, and timing, helping projects move forward with clearer conviction, stronger economics, and a cleaner path to execution.",
  ],
};

export const whatWeDoMirrorBridge: WhatWeDoBridgeContent = {
  image: whatWeDoBridgeMirrorImage,
  alt: "Pittard residential land plan showing lot layout and circulation",
  caption: "Pittard",
};

export const whatWeDoFrameworkChapters: WhatWeDoFrameworkChapter[] = [
  {
    id: "strategic-acquisition",
    sequence: "01",
    navLabel: "Strategic Acquisition",
    layout: "media-left",
    title: "Strategic acquisition starts with real market demand.",
    paragraphs: [
      "Radius studies growth patterns, supply pipelines, and demand signals early so each opportunity is positioned against the realities of its market, not assumptions.",
      "We use market strategy to inform product mix, phasing, and timing before committing capital, helping each site move forward with clearer conviction, stronger economics, and a cleaner path to execution.",
    ],
    image: whatWeDoBridgeMirrorImage,
    alt: "Pittard residential land plan showing lot layout and circulation",
    caption: "Pittard",
    tone: "gold",
    proofPoints: [
      { label: "Growth Pattern Review" },
      { label: "Supply Pipeline Analysis" },
      { label: "Product Mix Strategy" },
      { label: "Phasing & Timing" },
    ],
  },
  {
    id: "entitlement-strategy",
    sequence: "02",
    navLabel: "Entitlement Strategy",
    layout: "media-right",
    title: "Entitlement strategy turns land into a clearer path to execution.",
    paragraphs: [
      "Radius drives the entitlement and planning process to unlock the highest and best use of each site. We manage zoning strategy, approvals, and site design with precision so complexity is reduced before it can slow the opportunity.",
      "This phase is where land becomes cleaner, stronger, and more financeable. By coordinating entitlement sequencing early, we improve certainty, reduce execution risk, and position each asset for institutional-quality delivery.",
    ],
    image: whatWeDoBridgeImage,
    alt: "The Franklin mixed-use development exterior at sunset",
    caption: "The Franklin",
    tone: "green",
    proofPoints: [
      { label: "Zoning Strategy" },
      { label: "Approval Sequencing" },
      { label: "Site Plan Coordination" },
      { label: "Entitlement Readiness" },
    ],
  },
  {
    id: "capital-strategy",
    sequence: "03",
    navLabel: "Capital Strategy",
    layout: "media-left",
    title: "Capital strategy keeps execution flexible and returns aligned.",
    paragraphs: [
      "Radius determines the highest-value execution path based on market dynamics, capital efficiency, and risk-adjusted returns. We evaluate whether to pursue vertical development, structure a joint venture with the right operator, or monetize the asset through a sale.",
      "That flexibility allows capital to be allocated where it is most effective rather than forced into a fixed model. The result is a cleaner strategy, stronger partner alignment, and better control over how value is ultimately realized.",
    ],
    image: whatWeDoBridgeMirrorImage,
    alt: "Pittard residential land plan showing lot layout and circulation",
    caption: "Pittard",
    tone: "gold",
    proofPoints: [
      { label: "Execution Path Selection" },
      { label: "JV Structuring" },
      { label: "Capital Partner Alignment" },
      { label: "Risk-Adjusted Returns" },
    ],
  },
  {
    id: "value-realization",
    sequence: "04",
    navLabel: "Value Realization",
    layout: "media-right",
    title: "We don't merely acquire value. We realize it.",
    paragraphs: [
      "Radius approaches each opportunity with a value-realization mindset rooted in land strategy, development intelligence, and institutional alignment.",
      "From early sourcing to downstream execution, our role is to make complex opportunities cleaner, stronger, and more actionable so value can be captured with discipline, preserved through execution, and realized through the right outcome.",
    ],
    image: whatWeDoBridgeImage,
    alt: "The Franklin mixed-use development exterior at sunset",
    caption: "The Franklin",
    tone: "green",
    proofPoints: [
      { label: "Execution Discipline" },
      { label: "Partner-Ready Delivery" },
      { label: "Capital Recycling" },
      { label: "Monetization Strategy" },
    ],
  },
];

export const whatWeDoFrameworkHandoff: WhatWeDoFrameworkHandoff = {
  eyebrow: "THE OPERATING SEQUENCE",
  items: [
    { label: "Strategic Acquisition" },
    { label: "Entitlement Strategy" },
    { label: "Capital Strategy" },
    { label: "Value Realization" },
  ],
};

export const whatWeDoUniverseSectors: WhatWeDoUniverseSector[] = [
  {
    id: "residential",
    title: "Residential",
    items: [
      "Multifamily",
      "Build-to-Rent",
      "Townhomes",
      "Single Family Rentals",
      "Student Housing",
      "Senior Housing",
    ],
  },
  {
    id: "retail",
    title: "Retail",
    items: [
      "Lifestyle Centers",
      "Luxury Retail",
      "Daily-Needs Retail",
      "Dining & Entertainment",
    ],
  },
  {
    id: "commercial",
    title: "Commercial",
    items: [
      "Office",
      "Industrial",
      "Medical Office",
      "Institutional Partnerships",
    ],
  },
  {
    id: "mixed-use",
    title: "Mixed-Use",
    items: [
      "Town Centers",
      "District-Scale Communities",
      "Residential + Retail",
      "Integrated Placemaking",
    ],
  },
];

export const whatWeDoCta: WhatWeDoCtaContent = {
  title: "Lead with conviction. Build with trusted partners.",
  body: "If you are evaluating land, development, or partnership opportunities, Radius is positioned to help shape a clearer path to value.",
  label: "Contact Radius",
  href: "/#contact",
};
