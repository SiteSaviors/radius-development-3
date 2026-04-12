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
  eyebrow: "WHAT WE DO",
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
      descriptionLines: ["We act with honesty,", "respect, and care", "in all our endeavors."],
      activeColor: "#8FCB7B",
      inactiveColor: "#1f2c1c",
      iconColor: "#8FCB7B",
    },
    {
      id: "innovative-thinking",
      labelLines: ["Innovative", "Thinking"],
      descriptionLines: [
        "We embrace open-mindedness",
        "and creativity in pursuit",
        "of every opportunity.",
      ],
      activeColor: "#6F89A6",
      inactiveColor: "#1a2430",
      iconColor: "#6F89A6",
    },
    {
      id: "community-impact",
      labelLines: ["Community", "Impact"],
      descriptionLines: [
        "We work to positively impact",
        "the communities where",
        "we invest and live.",
      ],
      activeColor: "#1B2A4A",
      inactiveColor: "#111926",
      iconColor: "#1B2A4A",
    },
    {
      id: "collaboration",
      labelLines: ["Collaboration"],
      descriptionLines: [
        "We promote an inclusive",
        "culture built on trust",
        "and a shared vision.",
      ],
      activeColor: "#41536E",
      inactiveColor: "#161d27",
      iconColor: "#41536E",
    },
    {
      id: "relationships",
      labelLines: ["Relationships"],
      descriptionLines: [
        "We build enduring relationships",
        "with our investors and",
        "operating partners.",
      ],
      activeColor: "#708396",
      inactiveColor: "#1b2128",
      iconColor: "#708396",
    },
  ],
};
