import companyAboutImage from "@/assets/START-2200-q86.webp";
import companyAboutInsetImage from "@/assets/3.jpg";
import teamPhoto139 from "@/assets/RICKY.webp";
import teamPhoto140 from "@/assets/GAURANG.webp";
import teamPhoto141 from "@/assets/141-2000-q86.webp";
import teamPhoto142 from "@/assets/142-2000-q86.webp";
import teamPhotoKyle from "@/assets/kyle.jpeg";
import teamPhotoBethlehem from "@/assets/bethlehem.png";

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
  title: "Exceptional is our standard.",
  body:
    "A multi-disciplinary real estate investment and development firm dedicated to creating value, fostering growth, and positively impacting the communities we serve through our investments.",
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

export const companyTeam: CompanyTeamContent = {
  title: "Meet The Team",
  members: [
    {
      id: "ricky-joshi",
      name: "Ricky Joshi",
      role: "General Partner",
      image: teamPhoto139,
      imageAlt: "Portrait of Ricky Joshi",
      bio: "Ricky Joshi is a General Partner and Co-Founder of Radius Development, where he focuses on sourcing, structuring, and executing mixed-use, retail, and residential projects. He previously co-founded Saatva, scaling it into a $600M+ omni-channel brand and leading its expansion to 39+ Brick and Mortar locations nationwide. At Radius, he has played a key role in projects including Shiloh, a $1B+ mixed-use development in North Carolina. He has over 15 years of real estate investing experience across land, residential, retail, and hospitality assets. Ricky holds a degree from Dartmouth College and an MBA from Columbia Business School.",
    },
    {
      id: "gaurang-gala",
      name: "Gaurang Gala",
      role: "General Partner",
      image: teamPhoto140,
      imageAlt: "Portrait of Gaurang Gala",
      bio: "Gaurang Gala is a General Partner and Co-Founder of Radius Development. He is a seasoned real estate investor and developer with a wealth of experience spanning over two decades, including a background in lending and commercial and residential real estate sales and development. With a keen eye for identifying market opportunities and a deep understanding of industry trends, Gaurang has consistently demonstrated his expertise in creating innovative and profitable investment projects on his own and with industry leading partnerships. Gaurang is a graduate of the University of North Carolina - Chapel Hill.",
    },
    {
      id: "tarek-morshed",
      name: "Tarek Morshed",
      role: "General Partner",
      image: teamPhoto141,
      imageAlt: "Portrait of Tarek Morshed",
      bio: "Tarek Morshed is a General Partner of Radius Development. In real estate since 1995, he brings a deep range of experience in value-add and ground-up development projects as a General Partner in his career. Re-positioning multi-family and mixed-use assets, ground-up multi-family developments, urban infill residential/mixed-use development and land development in Austin and beyond have been his primary focuses. He currently focuses on land development projects in Austin and beyond as well as niche strategies such as multi-family acquisitions in secondary markets. Additionally, Tarek is CEO of The Morshed Group at Sotheby's International, a longstanding boutique real estate broker practice in Austin, TX focused on serving the residential and commercial needs of Founders/Csuite/VC’s demographics. The Morshed Group is ranked in the top 1%. Mr. Morshed is a graduate of University of Texas with a Bachelor's in Accounting, a program consistently ranked top 5 in the nation.",
    },
    {
      id: "elizabeth-eichen",
      name: "Elizabeth Eichen",
      role: "Head of Investor Relations",
      image: teamPhoto142,
      imageAlt: "Portrait of Elizabeth Eichen",
      bio: "Elizabeth Eichen is a dedicated professional skilled in connecting clients with optimal investment opportunities. She analyzes market trends, evaluates investments, and crafts strategic recommendations with attention to detail and a deep understanding of the financial landscape, providing valuable insights that align with clients' goals.",
    },
    {
      id: "bethlehem-gonzalez",
      name: "Bethlehem Gonzalez",
      role: "Executive Assistant",
      image: teamPhotoBethlehem,
      imageAlt: "Portrait of Bethlehem Gonzalez",
      bio: "Bethlehem Gonzalez is an operations-focused professional specializing in organizational management, client coordination, and process execution. She manages workflows, aligns communication, and supports efficient operations. Through a proactive and structured approach, Bethlehem ensures seamless execution and reliable performance across all aspects of the business.",
    },
    {
      id: "kyle-trebing",
      name: "Kyle Trebing",
      role: "Project Manager",
      image: teamPhotoKyle,
      imageAlt: "Portrait of Kyle Trebing",
      bio: "Kyle is a results-driven professional with a Bachelor’s degree in Computer Information Systems from Appalachian State University. He brings a strong background in retail management and business education, with proven experience leading teams, optimizing operations, and driving efficiency. With skills in project management, data analysis, and systems integration, Kyle effectively bridges technical and operational needs. He is passionate about leveraging technology to streamline processes and support smart, strategic growth.",
    },
  ],
};
