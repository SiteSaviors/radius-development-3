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
  title: string;
  paragraphs: string[];
  centerLabel: string;
  values: CompanyMissionValue[];
};

export const companyHero: CompanyHeroContent = {
  eyebrow: "COMPANY",
  title: "Future Focused Real Estate",
  body: "",
};

export const companyMission: CompanyMissionContent = {
  title: "Our Mission",
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
