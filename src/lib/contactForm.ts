export type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

export type ContactSubmissionPayload = ContactFormValues & {
  sourcePage: string;
  submittedAt: string;
};

const STUB_DELAY_MS = 750;

const wait = (duration: number) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });

export const buildContactSubmissionPayload = (
  values: ContactFormValues,
  sourcePage = "/contact"
): ContactSubmissionPayload => ({
  ...values,
  sourcePage,
  submittedAt: new Date().toISOString(),
});

export const submitContactForm = async (
  values: ContactFormValues,
  sourcePage = "/contact"
) => {
  const payload = buildContactSubmissionPayload(values, sourcePage);
  const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;

  if (!endpoint) {
    await wait(STUB_DELAY_MS);
    return { mode: "stub" as const, payload };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Contact form request failed");
  }

  return { mode: "remote" as const, payload };
};
