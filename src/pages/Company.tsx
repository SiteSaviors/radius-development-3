import { useEffect } from "react";
import companyHeroBg from "@/assets/wwd-hero.jpg";
import LazyBackground from "@/components/media/LazyBackground";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { whatWeDoHero } from "@/content/whatWeDo";
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
              <div className="wwd-hero-eyebrow">{whatWeDoHero.eyebrow}</div>
              <h1 className="wwd-hero-title">{whatWeDoHero.title}</h1>
              {whatWeDoHero.body ? <p className="wwd-hero-body">{whatWeDoHero.body}</p> : null}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter currentPath="/company" />
    </>
  );
};

export default Company;
