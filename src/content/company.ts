import companyAboutImage from "@/assets/START (1).jpg";
import companyAboutInsetImage from "@/assets/3.jpg";
import teamPhoto139 from "@/assets/139.jpg";
import teamPhoto140 from "@/assets/140.jpg";
import teamPhoto141 from "@/assets/141.jpg";
import teamPhoto142 from "@/assets/142.jpg";

export type CompanyHeroContent = {
  eyebrow: string;
  title: string;
  body: string;
};

export type CompanyMissionValue = {
  id: string;
  labelLines: string[];
  descriptionLines: string[];
  activeColor: string;
  inactiveColor: string;
  iconColor: string;
};

export type CompanyMissionContent = {
  eyebrow: string;
  headline: string;
  paragraphs: string[];
  centerLabel: string;
  values: CompanyMissionValue[];
};

export type CompanyNumberStat = {
  id: string;
  label: string;
  end: number;
  decimals: number;
  prefix: string;
  suffix: string;
};

export type CompanyNumbersContent = {
  title: string;
  stats: CompanyNumberStat[];
};

export type CompanyAboutContent = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  insetImage: string;
  insetImageAlt: string;
};

export type CompanyTeamMember = {
  id: string;
  name: string;
  role: string;
  image?: string;
  imageAlt: string;
  bio: string;
  isPlaceholder?: boolean;
};

export type CompanyTeamContent = {
  title: string;
  members: CompanyTeamMember[];
};

export const companyHero: CompanyHeroContent = {
  eyebrow: "COMPANY",
  title: "Future Focused Real Estate",
  body: "",
};

export const companyNumbers: CompanyNumbersContent = {
  title: "Radius By The Numbers",
  stats: [
    {
      id: "company-stat-0",
      label: "ACTIVE PIPELINE",
      end: 1.1,
      decimals: 1,
      prefix: "",
      suffix: "B",
    },
    {
      id: "company-stat-1",
      label: "SQ FT DEVELOPED",
      end: 300,
      decimals: 0,
      prefix: "",
      suffix: "K",
    },
    {
      id: "company-stat-2",
      label: "RESIDENTIAL UNITS",
      end: 2200,
      decimals: 0,
      prefix: "",
      suffix: "",
    },
    {
      id: "company-stat-3",
      label: "LAND VALUE CREATION",
      end: 2.2,
      decimals: 1,
      prefix: "",
      suffix: "X",
    },
  ],
};

export const companyAbout: CompanyAboutContent = {
  eyebrow: "About Radius",
  title: "Principal-led land strategy built for long-term value.",
  paragraphs: [
    "Radius operates across the land cycle with a focus on acquisition, entitlement strategy, structured development, and execution. We look for opportunities where speed, clarity, and discipline create an edge before value is obvious to the broader market.",
    "Our team combines institutional rigor with principal-led decisiveness, allowing us to move early, structure creatively, and advance complex opportunities with a cleaner path to execution. The result is a platform built to shape value from the ground up.",
  ],
  image: companyAboutImage,
  imageAlt: "A wide city-view balcony overlooking an urban skyline at sunset",
  insetImage: companyAboutInsetImage,
  insetImageAlt: "A modern Radius residential interior with open living space",
};

export const companyMission: CompanyMissionContent = {
  eyebrow: "Our Mission",
  headline: "A trusted, innovative partner focused on lasting value.",
  paragraphs: [
    "Our mission is to be a trusted, innovative partner striving to create lasting value for those we serve over the long term.",
    "In pursuit of our mission, we embrace five core values that guide everything we do: integrity, innovative thinking, community impact, collaboration, and relationships.",
    "These values support our commitment to excellence while acting as responsible partners and seeking to make a positive impact for all.",
  ],
  centerLabel: "radius",
  values: [
    {
      id: "integrity",
      labelLines: ["Integrity"],
      descriptionLines: ["We act with", "honesty, respect,", "and care in all", "our endeavors."],
      activeColor: "#5E9B5E",
      inactiveColor: "#3A6B3A",
      iconColor: "#5E9B5E",
    },
    {
      id: "innovative-thinking",
      labelLines: ["Innovative", "Thinking"],
      descriptionLines: [
        "We embrace",
        "open-mindedness and",
        "creativity in pursuit",
        "of every opportunity.",
      ],
      activeColor: "#6BB86B",
      inactiveColor: "#437543",
      iconColor: "#6BB86B",
    },
    {
      id: "community-impact",
      labelLines: ["Community", "Impact"],
      descriptionLines: [
        "We work to positively",
        "impact the communities",
        "where we invest",
        "and live.",
      ],
      activeColor: "#4DAF72",
      inactiveColor: "#2E6B45",
      iconColor: "#4DAF72",
    },
    {
      id: "collaboration",
      labelLines: ["Collaboration"],
      descriptionLines: [
        "We promote an",
        "inclusive culture",
        "built on trust and",
        "a shared vision.",
      ],
      activeColor: "#5A8C5A",
      inactiveColor: "#375937",
      iconColor: "#5A8C5A",
    },
    {
      id: "relationships",
      labelLines: ["Relationships"],
      descriptionLines: [
        "We build enduring",
        "relationships with",
        "our investors and",
        "operating partners.",
      ],
      activeColor: "#6BA06B",
      inactiveColor: "#426542",
      iconColor: "#6BA06B",
    },
  ],
};

const companyTeamBio =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere, sapien non cursus facilisis, erat libero ultrices velit, vitae tincidunt risus erat id lorem. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.";

export const companyTeam: CompanyTeamContent = {
  title: "Meet The Team",
  members: [
    {
      id: "ricky-joshi",
      name: "Ricky Joshi",
      role: "General Partner",
      image: teamPhoto139,
      imageAlt: "Portrait of Ricky Joshi",
      bio: companyTeamBio,
    },
    {
      id: "gaurang-gala",
      name: "Gaurang Gala",
      role: "General Partner",
      image: teamPhoto140,
      imageAlt: "Portrait of Gaurang Gala",
      bio: companyTeamBio,
    },
    {
      id: "tarek-morshed",
      name: "Tarek Morshed",
      role: "General Partner",
      image: teamPhoto141,
      imageAlt: "Portrait of Tarek Morshed",
      bio: companyTeamBio,
    },
    {
      id: "elizabeth-eichen",
      name: "Elizabeth Eichen",
      role: "Head of Investor Relations",
      image: teamPhoto142,
      imageAlt: "Portrait of Elizabeth Eichen",
      bio: companyTeamBio,
    },
    {
      id: "placeholder-1",
      name: "Additional Team Member",
      role: "Leadership Role",
      imageAlt: "Placeholder portrait for future team member",
      bio: companyTeamBio,
      isPlaceholder: true,
    },
    {
      id: "placeholder-2",
      name: "Additional Team Member",
      role: "Leadership Role",
      imageAlt: "Placeholder portrait for future team member",
      bio: companyTeamBio,
      isPlaceholder: true,
    },
  ],
};
