export type SignatureProofOutcome = {
  eyebrow: string;
  title: string;
  location: string;
  value: string;
  label: string;
  holdValue: string;
  holdLabel: string;
  supportingLine: string;
  chips: string[];
  footer: string;
};

export type SignatureProofContent = {
  eyebrow: string;
  headline: string;
  subtext: string;
  outcome: SignatureProofOutcome;
};

export const signatureProofContent: SignatureProofContent = {
  eyebrow: "WHY RADIUS",
  headline: "From Raw Land to Realized Value",
  subtext:
    "Radius combines early conviction, disciplined structuring, and execution expertise to move land from overlooked opportunity to institutional-quality outcome.",
  outcome: {
    eyebrow: "CLOSED",
    title: "TOD \u2014 Phase One",
    location: "Research Triangle Park, NC",
    value: "2.1x",
    label: "Value Creation",
    holdValue: "18 mo.",
    holdLabel: "Hold Period",
    supportingLine:
      "Fully entitled TOD land project delivered to a national multifamily developer.",
    chips: ["350 Units", "Land Assemblage", "Residential"],
    footer: "Delivered to Wood Partners",
  },
};
