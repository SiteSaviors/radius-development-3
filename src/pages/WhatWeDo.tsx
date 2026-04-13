import { useEffect, useState } from "react";
import whatWeDoHeroBg from "@/assets/wwd-hero.jpg";
import LazyBackground from "@/components/media/LazyBackground";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { cn } from "@/lib/utils";
import {
  whatWeDoBridge,
  whatWeDoCta,
  whatWeDoHero,
  whatWeDoIntro,
  whatWeDoMirrorBridge,
  whatWeDoMirrorIntro,
  whatWeDoProcessIntro,
  whatWeDoProcessSteps,
  whatWeDoUniverse,
  whatWeDoUniverseSectors,
} from "@/content/whatWeDo";
import useRadiusCursor from "@/hooks/useRadiusCursor";

const WhatWeDo = () => {
  const [activeUniverseSectorId, setActiveUniverseSectorId] = useState<string | null>(null);

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

  useEffect(() => {
    const brandSections = Array.from(document.querySelectorAll<HTMLElement>(".wwd-brand-strip"));
    if (brandSections.length === 0) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      brandSections.forEach((section) => {
        section
          .querySelector<HTMLElement>(".wwd-intro-brand-stack")
          ?.style.setProperty("--wwd-intro-brand-shift", "0px");
      });
      return;
    }

    let raf = 0;

    const syncBrandStrips = () => {
      const viewportHeight = window.innerHeight;
      const maxShift = window.innerWidth < 768 ? 48 : 140;

      brandSections.forEach((section) => {
        const brandStack = section.querySelector<HTMLElement>(".wwd-intro-brand-stack");
        if (!brandStack) return;

        const rect = section.getBoundingClientRect();
        const progress = Math.min(
          Math.max((viewportHeight - rect.top) / (viewportHeight + rect.height), 0),
          1
        );

        brandStack.style.setProperty("--wwd-intro-brand-shift", `${-maxShift * progress}px`);
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(syncBrandStrips);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    syncBrandStrips();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div id="cur"></div>
      <div id="cdot"></div>
      <SiteHeader currentPath="/what-we-do" />

      <main className="wwd-page">
        <section className="wwd-hero">
          <LazyBackground className="wwd-hero-media" image={whatWeDoHeroBg} eager ariaHidden />
          <div className="wwd-hero-shell">
            <div className="wwd-hero-copy">
              <div className="wwd-hero-eyebrow">{whatWeDoHero.eyebrow}</div>
              <h1 className="wwd-hero-title">{whatWeDoHero.title}</h1>
              {whatWeDoHero.body ? <p className="wwd-hero-body">{whatWeDoHero.body}</p> : null}
            </div>
          </div>
        </section>

        <section className="wwd-intro wwd-intro-transition wwd-brand-strip" aria-label="Radius brand transition">
          <div className="wwd-intro-brand" aria-hidden="true">
            <div className="wwd-intro-brand-stack">
              <div className="wwd-intro-brand-text">radius</div>
              <div className="wwd-intro-brand-text">radius</div>
              <div className="wwd-intro-brand-text">radius</div>
            </div>
          </div>
        </section>

        <section className="wwd-bridge" aria-labelledby="wwd-bridge-title">
          <div className="wwd-bridge-inner">
            <div className="wwd-bridge-copy-shell">
              <div className="wwd-bridge-copy wwd-bridge-copy--approach">
                <div className="wwd-bridge-rule" aria-hidden="true" />
                <div className="wwd-bridge-eyebrow">Our Approach</div>
                <h2 id="wwd-bridge-title" className="wwd-bridge-title" aria-label={whatWeDoIntro.title}>
                  <span className="wwd-bridge-title-line">We don&apos;t merely acquire value.</span>
                  <span className="wwd-bridge-title-line">We create it.</span>
                </h2>
                <div className="wwd-bridge-body">
                  {whatWeDoIntro.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="wwd-bridge-media-wrap">
              <figure className="wwd-bridge-media-card wwd-bridge-media-card--franklin">
                <img
                  className="wwd-bridge-media wwd-bridge-media--top"
                  src={whatWeDoBridge.image}
                  alt={whatWeDoBridge.alt}
                />
                {whatWeDoBridge.caption ? (
                  <figcaption className="wwd-bridge-caption">{whatWeDoBridge.caption}</figcaption>
                ) : null}
              </figure>
            </div>
          </div>
        </section>

        <section className="wwd-bridge wwd-bridge--mirrored" aria-labelledby="wwd-bridge-mirror-title">
          <div className="wwd-bridge-strip wwd-brand-strip wwd-bridge-strip--mirrored" aria-hidden="true">
            <div className="wwd-intro-brand wwd-intro-brand--mirrored">
              <div className="wwd-intro-brand-stack wwd-intro-brand-stack--mirrored">
                <div className="wwd-intro-brand-text">radius</div>
                <div className="wwd-intro-brand-text">radius</div>
                <div className="wwd-intro-brand-text">radius</div>
              </div>
            </div>
          </div>
          <div className="wwd-bridge-inner">
            <div className="wwd-bridge-copy-shell wwd-bridge-copy-shell--mirrored">
              <div className="wwd-bridge-copy">
                <h2 id="wwd-bridge-mirror-title" className="wwd-bridge-title">
                  {whatWeDoMirrorIntro.title}
                </h2>
                <div className="wwd-bridge-body">
                  {whatWeDoMirrorIntro.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="wwd-bridge-media-wrap wwd-bridge-media-wrap--mirrored">
              <figure className="wwd-bridge-media-card">
                <img
                  className="wwd-bridge-media"
                  src={whatWeDoMirrorBridge.image}
                  alt={whatWeDoMirrorBridge.alt}
                />
                {whatWeDoMirrorBridge.caption ? (
                  <figcaption className="wwd-bridge-caption wwd-bridge-caption--left">
                    {whatWeDoMirrorBridge.caption}
                  </figcaption>
                ) : null}
              </figure>
            </div>
          </div>
        </section>

        <section className="wwd-process-head">
          <div className="wwd-process-head-inner">
            <h2 className="wwd-process-title">{whatWeDoProcessIntro.title}</h2>
            <p className="wwd-process-body">
              {whatWeDoProcessIntro.bodyStart}
              <span className="wwd-process-highlight">{whatWeDoProcessIntro.bodyHighlight}</span>
              {whatWeDoProcessIntro.bodyEnd}
            </p>
          </div>
        </section>

        <section className="wwd-process">
          <div className="wwd-process-inner">
            <div className="wwd-process-track" aria-hidden="true">
              <div className="wwd-process-line"></div>
            </div>
            {whatWeDoProcessSteps.map((step, index) => {
              return (
                <article
                  key={step.step}
                  className={`wwd-step${index === 0 ? " is-active" : ""}`}
                >
                  <div className="wwd-step-marker">
                    <div className="wwd-step-counter">{step.step}</div>
                  </div>
                  <h3 className="wwd-step-title">{step.title}</h3>
                  <p className="wwd-step-body">{step.body}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="wwd-universe" aria-labelledby="wwd-universe-title">
          <div className="wwd-universe-inner">
            <div className="wwd-universe-head">
              <h2 id="wwd-universe-title" className="wwd-universe-title">
                {whatWeDoUniverse.title}
              </h2>
              <p className="wwd-universe-body">{whatWeDoUniverse.body}</p>
            </div>

            <div className="wwd-universe-stage">
              <div className={cn('wwd-universe-board', { 'wwd-universe-board--active': !!activeUniverseSectorId })}>
                <div className="wwd-universe-plate">
                  <div className="wwd-universe-row">
                    {whatWeDoUniverseSectors.map((sector) => {
                      const isActive = activeUniverseSectorId === sector.id;
                      return (
                        <div
                          key={sector.id}
                          className={cn(`wwd-universe-col wwd-universe-col--${sector.id}`, { 'is-active': isActive })}
                          tabIndex={0}
                          role="button"
                          aria-expanded={isActive}
                          aria-controls={`wwd-uc-content-${sector.id}`}
                          onClick={() => setActiveUniverseSectorId(isActive ? null : sector.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setActiveUniverseSectorId(isActive ? null : sector.id);
                            }
                          }}
                        >
                          <span className="wwd-uc-bg" aria-hidden="true"></span>
                          <span className="wwd-uc-title" id={`wwd-uc-title-${sector.id}`}>
                            {sector.title}
                          </span>
                          <div
                            className={cn('wwd-uc-content', { 'has-columns': sector.items.length >= 4 })}
                            id={`wwd-uc-content-${sector.id}`}
                            aria-hidden={!isActive}
                            aria-labelledby={`wwd-uc-title-${sector.id}`}
                          >
                            <h3 className="wwd-uc-content-title">{sector.title}</h3>
                            <ul className="wwd-uc-list">
                              {sector.items.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </div>
                          <span className="wwd-uc-icon" aria-hidden="true">+</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="wwd-cta">
          <div className="wwd-cta-inner">
            <h2 className="wwd-cta-title">{whatWeDoCta.title}</h2>
            <p className="wwd-cta-body">{whatWeDoCta.body}</p>
            <div className="wwd-cta-actions">
              <a href={whatWeDoCta.href} className="bp">
                {whatWeDoCta.label}
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter currentPath="/what-we-do" />
    </>
  );
};

export default WhatWeDo;
