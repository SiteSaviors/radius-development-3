import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactDetails, contactFormConfig, contactHero } from "@/content/contact";
import useRadiusCursor from "@/hooks/useRadiusCursor";
import { submitContactForm, type ContactFormValues } from "@/lib/contactForm";

const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(10, "Please share a few more details."),
});

const Contact = () => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useRadiusCursor();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitError(null);

    try {
      await submitContactForm(values, "/contact");
      setIsSubmitted(true);
      form.reset();
    } catch {
      setSubmitError(contactFormConfig.errorBody);
    }
  };

  return (
    <>
      <div id="cur"></div>
      <div id="cdot"></div>
      <SiteHeader currentPath="/contact" />

      <main className="contact-page">
        <section className="contact-hero">
          <div className="contact-shell">
            <div className="contact-copy">
              <div className="contact-eyebrow">{contactHero.eyebrow}</div>
              <h1 className="contact-title">{contactHero.title}</h1>
              <p className="contact-body">{contactHero.body}</p>

              <div className="contact-details" aria-label="Contact details">
                {contactDetails.map((detail) => (
                  <div key={detail.id} className="contact-detail-item">
                    <div className="contact-detail-label">{detail.label}</div>
                    {detail.href ? (
                      <a className="contact-detail-value" href={detail.href}>
                        {detail.value}
                      </a>
                    ) : (
                      <address className="contact-detail-value contact-detail-address">
                        {detail.value}
                      </address>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="contact-form-card" aria-labelledby="contact-form-title">
              {isSubmitted ? (
                <div className="contact-success" role="status" aria-live="polite">
                  <div className="contact-success-eyebrow">Success</div>
                  <h2 id="contact-form-title" className="contact-form-title">
                    {contactFormConfig.successTitle}
                  </h2>
                  <p className="contact-form-body">{contactFormConfig.successBody}</p>
                  <Button
                    type="button"
                    className="contact-success-reset"
                    onClick={() => {
                      setIsSubmitted(false);
                      setSubmitError(null);
                    }}
                  >
                    {contactFormConfig.resetLabel}
                  </Button>
                </div>
              ) : (
                <>
                  <div className="contact-form-head">
                    <div className="contact-form-eyebrow">Contact Form</div>
                    <h2 id="contact-form-title" className="contact-form-title">
                      {contactFormConfig.title}
                    </h2>
                    <p className="contact-form-body">{contactFormConfig.description}</p>
                  </div>

                  <Form {...form}>
                    <form className="contact-form-grid" onSubmit={form.handleSubmit(onSubmit)} noValidate>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="contact-form-item">
                            <FormLabel className="contact-form-label">Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder={contactFormConfig.placeholders.name}
                                className="contact-form-input"
                                autoComplete="name"
                              />
                            </FormControl>
                            <FormMessage className="contact-form-message" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="contact-form-item">
                            <FormLabel className="contact-form-label">Email</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                placeholder={contactFormConfig.placeholders.email}
                                className="contact-form-input"
                                autoComplete="email"
                              />
                            </FormControl>
                            <FormMessage className="contact-form-message" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem className="contact-form-item">
                            <FormLabel className="contact-form-label">Message</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                rows={7}
                                placeholder={contactFormConfig.placeholders.message}
                                className="contact-form-input contact-form-textarea"
                              />
                            </FormControl>
                            <FormMessage className="contact-form-message" />
                          </FormItem>
                        )}
                      />

                      {submitError ? (
                        <div className="contact-error" role="alert">
                          {submitError}
                        </div>
                      ) : null}

                      <Button
                        type="submit"
                        className="contact-form-submit"
                        disabled={form.formState.isSubmitting}
                      >
                        {form.formState.isSubmitting ? "Sending..." : contactFormConfig.submitLabel}
                      </Button>
                    </form>
                  </Form>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter currentPath="/contact" />
    </>
  );
};

export default Contact;
