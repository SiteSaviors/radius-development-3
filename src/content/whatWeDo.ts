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

export const whatWeDoHero: WhatWeDoHeroContent = {
  eyebrow: "WHAT WE DO",
  title: "We Create Value Before the Market Fully Prices It",
  body: "Radius operates across the land and development lifecycle with a focus on sourcing, structuring, entitlement, and execution clarity.",
};

export const whatWeDoIntro: WhatWeDoIntroContent = {
  title: "We drive outcomes through discipline, structure, and timing.",
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
    title: "Site Sourcing",
    body: "Radius identifies and acquires viable land positions only after rigorous diligence on location strength, entitlement path, market demand, and execution risk. We secure the opportunity first so investment and development partners are reviewing a site that has already been pressure-tested.",
  },
  {
    step: "02",
    title: "Planning And Permits",
    body: "Once we understand the site, we handle zoning, permitting, and move on to the development plans. We work with local officials to get approvals moving and make sure everything meets code. This step lays the groundwork for a smooth and compliant build.",
  },
  {
    step: "03",
    title: "Development And Construction",
    body: "After permits, we start with the ground. Our team manages the whole construction process, including grading, utilities, roads, and more. We stay hands-on, coordinate with subcontractors, and keep everything moving so the project stays on schedule.",
  },
  {
    step: "04",
    title: "Final Review And Handover",
    body: "Before wrapping up, we walk the site, check all the details, and make sure everything meets the plan that was discussed earlier. Once it's done, we hand over a clean, ready-to-go site, no loose ends, just a finished job you can move forward with.",
  },
];

export const whatWeDoUniverse: WhatWeDoUniverseContent = {
  title: "Radius Development Universe",
  body: "Radius operates across four primary sectors, with each opportunity shaped through disciplined land strategy, development judgment, and execution readiness.",
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
