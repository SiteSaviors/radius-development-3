import caryEstatesBg from "@/assets/CARY-E-2200-q86.webp";
import caryEstatesMobileBg from "@/assets/CARY-E-2200-q86.webp"; // TODO: replace with mobile crop
import franklinBg from "@/assets/FRANKLIN-2200-q86.webp";
import franklinMobileBg from "@/assets/Franklin-Mobile.jpg";
import pittardBg from "@/assets/PITTARD-2200-q86.webp";
import pittardMobileBg from "@/assets/PITTARD-2200-q86.webp"; // TODO: replace with mobile crop
import rduTownBg from "@/assets/RDU-TOWN-2200-q86.webp";
import rduTownMobileBg from "@/assets/RDU-TOWN-2200-q86.webp"; // TODO: replace with mobile crop
import shilohBg from "@/assets/SHILOH-2200-q86.webp";
import shilohMobileBg from "@/assets/SHILOH-MOBILE.jpg";
import terracesBg from "@/assets/TERRACES.jpg";
import terracesMobileBg from "@/assets/TERRACES-MOBILE.jpg"; // TODO: replace with mobile crop

export type ProjectStatus = "Under Development" | "Open Project";

export type ProjectCategory =
  | "Mixed-Use"
  | "Residential"
  | "Town Center"
  | "Institutional"
  | "Retail"
  | "Land Strategy"
  | "Land Assembly"
  | "Entitlement";

export type Project = {
  slug: string;
  name: string;
  status: ProjectStatus;
  statusTone?: "open-project";
  image: string;
  imagePosition?: string;
  mobileImage?: string;
  mobileImagePosition?: string;
  shortDescription: string;
  mobileShortDescription?: string;
  archiveDescription: string;
  location: string;
  market: string;
  categories: ProjectCategory[];
  highlightTags: Array<{
    text: string;
    tone: "mint" | "blue" | "gold" | "slate";
  }>;
  detail: {
    intro: string;
    strategy: string;
    opportunity: string;
    bullets: string[];
  };
};

export type ProjectFilterCategory =
  | "Mixed-Use"
  | "Residential"
  | "Commercial"
  | "Retail"
  | "Land Assembly";

export const projects: Project[] = [
  {
    slug: "the-shiloh",
    name: "The Shiloh",
    status: "Under Development",
    image: shilohBg,
    imagePosition: "center 42%",
    mobileImage: shilohMobileBg,
    mobileImagePosition: "center center",
    shortDescription: "Mixed-use land position advancing through entitlement and early planning.",
    archiveDescription: "A major mixed-use land position being shaped into a phased district with residential, retail, and long-horizon placemaking potential.",
    location: "Research Triangle",
    market: "Cary, NC",
    categories: ["Mixed-Use", "Residential", "Retail"],
    highlightTags: [
      { text: "Mixed-Use", tone: "mint" },
      { text: "2000+ Residential Units", tone: "blue" },
      { text: "225,000 Sq Ft Retail Space", tone: "gold" },
    ],
    detail: {
      intro: "The Shiloh represents a scaled mixed-use land strategy positioned to capture long-term demand across residential and retail uses. Radius is advancing the site through early planning and entitlement with a focus on creating a highly legible district framework.",
      strategy: "Radius is structuring the project around phased delivery, land-use flexibility, and durable frontage value so the site can evolve with market timing rather than forcing a single-path outcome.",
      opportunity: "The opportunity is to convert a large-format land position into a partner-ready mixed-use platform with institutional relevance, embedded placemaking potential, and multiple paths to execution.",
      bullets: [
        "Large-format district planning opportunity",
        "Residential and retail mix designed for phased execution",
        "Entitlement work structured to preserve optionality",
      ],
    },
  },
  {
    slug: "the-franklin",
    name: "The Franklin",
    status: "Under Development",
    image: franklinBg,
    imagePosition: "center 40%",
    mobileImage: franklinMobileBg,
    shortDescription: "Residential and retail pipeline asset in a high-growth Sun Belt corridor.",
    archiveDescription: "A residential-led project with integrated retail potential in a corridor where growth, visibility, and neighborhood demand align.",
    location: "Research Triangle",
    market: "Cary, NC",
    categories: ["Residential", "Retail"],
    highlightTags: [
      { text: "Residential", tone: "blue" },
      { text: "36 Luxury Condos", tone: "moss" },
      { text: "0.5 Acre High-End Design", tone: "gold" },
    ],
    detail: {
      intro: "The Franklin is a residential-focused development opportunity enhanced by strategic retail integration. The project is being positioned to meet corridor growth with a product mix grounded in real neighborhood demand.",
      strategy: "Radius is coordinating land positioning, use mix, and frontage value to create a development program that is both executable and attractive to institutional-quality partners.",
      opportunity: "The opportunity lies in pairing residential density with supporting retail in a corridor where population growth and daily-use demand continue to deepen.",
      bullets: [
        "Residential-led program with supporting retail",
        "Located in an expanding growth corridor",
        "Designed to be partner-ready and execution-focused",
      ],
    },
  },
  {
    slug: "terraces-at-west-cary",
    name: "Terraces At West Cary",
    status: "Under Development",
    image: terracesBg,
    imagePosition: "center 34%",
    mobileImage: terracesMobileBg,
    shortDescription: "Strategic land assembly moving toward partner-ready delivery.",
    archiveDescription: "Residential community positioned in one of the fastest-growing residential corridors 1-mile from Apple East HQ.",
    location: "Research Triangle",
    market: "Cary, NC",
    categories: ["Residential", "Land Assembly"],
    highlightTags: [
      { text: "Residential", tone: "blue" },
      { text: "55 Luxury Townhomes", tone: "mint" },
      { text: "12 Acre Community", tone: "gold" },
    ],
    detail: {
      intro: "Terraces At West Cary is a strategic land assembly being shaped into a residential development opportunity with clear market fit and partner relevance.",
      strategy: "Radius is approaching the site through disciplined assembly and positioning, with the goal of delivering a cleaner, more institutional-quality opportunity than the market would otherwise see.",
      opportunity: "The project offers the chance to unlock value through land control, assembly coherence, and program clarity in one of the Southeast's strongest growth markets.",
      bullets: [
        "Assembly-led value creation",
        "Residential focus with strong market alignment",
        "Structured for downstream partner execution",
      ],
    },
  },
  {
    slug: "pittard-sears",
    name: "Pittard Sears",
    status: "Open Project",
    statusTone: "open-project",
    image: pittardBg,
    imagePosition: "center center",
    mobileImage: pittardMobileBg,
    shortDescription: "Town center land strategy progressing through phased entitlement and anchor planning.",
    archiveDescription: "A town center-oriented land strategy where entitlement and anchor planning are being used to create a stronger market-facing opportunity.",
    location: "Research Triangle",
    market: "Cary, NC",
    categories: ["Town Center", "Entitlement"],
    highlightTags: [
      { text: "Town Center", tone: "gold" },
      { text: "Entitlement", tone: "mint" },
    ],
    detail: {
      intro: "Pittard Sears is being advanced as a town center opportunity where entitlement strategy, anchor planning, and sequencing can materially improve eventual execution outcomes.",
      strategy: "Radius is focusing on phased entitlement work and land-use planning that can support multiple commercial and mixed-use outcomes while strengthening the site's identity.",
      opportunity: "The site presents an opportunity to shape a more coherent center-format project before it is presented to the broader market or downstream partners.",
      bullets: [
        "Town center positioning with phased planning",
        "Entitlement path designed to support anchor uses",
        "Built around pre-market value creation",
      ],
    },
  },
  {
    slug: "cary-estates",
    name: "Cary Estates",
    status: "Open Project",
    statusTone: "open-project",
    image: caryEstatesBg,
    imagePosition: "center 42%",
    mobileImage: caryEstatesMobileBg,
    shortDescription: "Retail-adjacent mixed-use site moving through partner structuring.",
    archiveDescription: "A residential land position with strong adjacency dynamics and a structure-oriented approach to future partner execution.",
    location: "Research Triangle",
    market: "Cary, NC",
    categories: ["Residential", "Land Strategy"],
    highlightTags: [
      { text: "Residential", tone: "blue" },
      { text: "Land Position", tone: "mint" },
    ],
    detail: {
      intro: "Cary Estates is a residential-oriented land position where surrounding growth and adjacency dynamics create a compelling basis for structured execution.",
      strategy: "Radius is positioning the project through disciplined land strategy and partner structuring so the opportunity can be delivered with clarity rather than speculation.",
      opportunity: "The site's value comes from pairing a strong residential use case with a cleaner execution path, making it more actionable for downstream development partners.",
      bullets: [
        "Residential-focused land position",
        "Value enhanced through partner structuring",
        "Strong adjacency and neighborhood context",
      ],
    },
  },
  {
    slug: "rdu-town-center",
    name: "RDU Town Center",
    status: "Open Project",
    statusTone: "open-project",
    image: rduTownBg,
    imagePosition: "center center",
    mobileImage: rduTownMobileBg,
    shortDescription: "Institutional-quality development position advancing toward market-facing delivery.",
    archiveDescription: "An institutional-scale land strategy aimed at creating a highly legible development opportunity with broad downstream relevance.",
    location: "Research Triangle",
    market: "Cary, NC",
    categories: ["Institutional", "Land Strategy"],
    highlightTags: [
      { text: "Institutional", tone: "slate" },
      { text: "Land Strategy", tone: "mint" },
    ],
    detail: {
      intro: "RDU Town Center is being advanced as an institutional-quality land opportunity with a strong planning framework, clear scale, and broad relevance to future development partners.",
      strategy: "Radius is organizing the site around land strategy, visibility, and execution clarity so the project can move from concept to market-facing opportunity with minimal friction.",
      opportunity: "The project offers meaningful scale and planning coherence in a market where institutional-quality land positions are increasingly difficult to assemble and present cleanly.",
      bullets: [
        "Institutional-scale land opportunity",
        "Planning-forward positioning for partner delivery",
        "Located in a high-conviction regional growth market",
      ],
    },
  },
];

export const projectBySlug = Object.fromEntries(projects.map((project) => [project.slug, project])) as Record<string, Project>;

const projectCategoryToFilterCategory: Record<ProjectCategory, ProjectFilterCategory[]> = {
  "Mixed-Use": ["Mixed-Use"],
  "Residential": ["Residential"],
  "Town Center": ["Commercial"],
  "Institutional": ["Commercial"],
  "Retail": ["Retail"],
  "Land Strategy": ["Land Assembly"],
  "Land Assembly": ["Land Assembly"],
  "Entitlement": ["Commercial"],
};

export const projectFilterCategories: ProjectFilterCategory[] = [
  "Mixed-Use",
  "Residential",
  "Commercial",
  "Retail",
  "Land Assembly",
];

export const getProjectFilterCategories = (project: Project): ProjectFilterCategory[] =>
  Array.from(
    new Set(project.categories.flatMap((category) => projectCategoryToFilterCategory[category]))
  );
