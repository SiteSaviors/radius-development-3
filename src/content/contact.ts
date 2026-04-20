export type ContactHeroContent = {
  eyebrow: string;
  title: string;
  body: string;
};

export type ContactDetail = {
  id: "email" | "phone" | "address";
  label: string;
  value: string;
  href?: string;
};

export type ContactFormConfig = {
  title: string;
  description: string;
  submitLabel: string;
  resetLabel: string;
  successTitle: string;
  successBody: string;
  errorBody: string;
  placeholders: {
    name: string;
    email: string;
    message: string;
  };
};

export const contactHero: ContactHeroContent = {
  eyebrow: "Contact",
  title: "Let’s build something better together",
  body:
    "If you are evaluating land, development, or partnership opportunities, Radius is positioned to help shape a clearer path to value.",
};

export const contactDetails: ContactDetail[] = [
  {
    id: "email",
    label: "Email Address",
    value: "info@radiusbuilt.com",
    href: "mailto:info@radiusbuilt.com",
  },
  {
    id: "phone",
    label: "Phone Number",
    value: "(919) 275-0109",
    href: "tel:+19192750109",
  },
  {
    id: "address",
    label: "Address",
    value: "105 Kilmayne Drive, Suite C, Cary, NC 27511",
  },
];

export const contactFormConfig: ContactFormConfig = {
  title: "Send an inquiry",
  description: "Share a few details and our team will follow up with you directly.",
  submitLabel: "Send Inquiry",
  resetLabel: "Send another inquiry",
  successTitle: "Inquiry received",
  successBody: "Thanks for reaching out. We’ll review your message and follow up soon.",
  errorBody: "We couldn’t send your message right now. Please try again in a moment.",
  placeholders: {
    name: "Your name",
    email: "you@example.com",
    message: "Tell us a little about your project or opportunity",
  },
};
