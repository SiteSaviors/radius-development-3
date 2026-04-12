import { useEffect } from "react";
import companyHeroBg from "@/assets/wwd-hero.jpg";
import CompanyMissionWheel from "@/components/company/CompanyMissionWheel";
import LazyBackground from "@/components/media/LazyBackground";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { companyHero, companyMission } from "@/content/company";
import useRadiusCursor from "@/hooks/useRadiusCursor";

const Company = () => {
  useRadiusCursor();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const heroMedia = document.querySelector<HTMLElement>(".wwd-hero-media");
    if (!heroMedia) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      heroMedia.style.setProperty("--wwd-hero-shift", "0px");
      return;
    }

    let raf = 0;

    const syncHeroParallax = () => {
      const shift = Math.min(window.scrollY * 0.18, 120);
      heroMedia.style.setProperty("--wwd-hero-shift", `${shift}px`);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(syncHeroParallax);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    syncHeroParallax();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div id="cur"></div>
      <div id="cdot"></div>
      <SiteHeader currentPath="/company" />

      <main className="company-page">
        <section className="wwd-hero">
          <LazyBackground className="wwd-hero-media" image={companyHeroBg} eager ariaHidden />
          <div className="wwd-hero-shell">
            <div className="wwd-hero-copy">
              <div className="wwd-hero-eyebrow">{companyHero.eyebrow}</div>
              <h1 className="wwd-hero-title">{companyHero.title}</h1>
              {companyHero.body ? <p className="wwd-hero-body">{companyHero.body}</p> : null}
            </div>
          </div>
        </section>

        <section className="company-mission" aria-labelledby="company-mission-title">
          <div className="company-mission-inner">
            <div className="company-mission-copy">
              <h2 id="company-mission-title" className="company-mission-title">
                {companyMission.title}
              </h2>
              <div className="company-mission-body">
                {companyMission.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="company-mission-wheel-wrap">
              <CompanyMissionWheel
                values={companyMission.values}
                centerLabel={companyMission.centerLabel}
                ariaLabel="Interactive mission values wheel"
              />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter currentPath="/company" />
    </>
  );
};

export default Company;
