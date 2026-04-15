import { useEffect, useState } from "react";
import whatWeDoHeroBg from "@/assets/wwd-hero.jpg";
import LazyBackground from "@/components/media/LazyBackground";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { cn } from "@/lib/utils";
import {
  whatWeDoCta,
  whatWeDoFrameworkChapters,
  whatWeDoFrameworkHandoff,
  whatWeDoHero,
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

  return (
    <>
      <div id="cur"></div>
      <div id="cdot"></div>
      <SiteHeader currentPath="/what-we-do" />

      <main className="wwd-page">
        <section className="wwd-hero wwd-hero--what-we-do">
          <LazyBackground className="wwd-hero-media" image={whatWeDoHeroBg} eager ariaHidden />
          <div className="wwd-hero-shell">
            <div className="wwd-hero-copy">
              <div className="wwd-hero-eyebrow">{whatWeDoHero.eyebrow}</div>
              <h1 className="wwd-hero-title">{whatWeDoHero.title}</h1>
              {whatWeDoHero.body ? <p className="wwd-hero-body">{whatWeDoHero.body}</p> : null}
            </div>
          </div>
        </section>

        <section className="wwd-framework" aria-labelledby="wwd-framework-sequence-title">
          <div className="wwd-framework__handoff" aria-label={whatWeDoFrameworkHandoff.eyebrow}>
            <div className="wwd-framework__handoff-inner">
              <div className="wwd-framework__handoff-eyebrow" id="wwd-framework-sequence-title">
                {whatWeDoFrameworkHandoff.eyebrow}
              </div>
              <div className="wwd-framework__handoff-items">
                {whatWeDoFrameworkHandoff.items.map((item, index) => (
                  <div className="wwd-framework__handoff-item" key={item.label}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="wwd-framework__inner">
            <div className="wwd-framework__chapters">
              {whatWeDoFrameworkChapters.map((chapter, index) => (
                <article
                  key={chapter.id}
                  className={cn(
                    "wwd-framework-chapter",
                    `wwd-framework-chapter--${chapter.tone}`,
                    { "wwd-framework-chapter--reverse": index % 2 === 1 }
                  )}
                >
                  <div className="wwd-framework-chapter__copy">
                    <div className="wwd-framework-chapter__eyebrow">{chapter.eyebrow}</div>
                    <h3 className="wwd-framework-chapter__title">{chapter.title}</h3>
                    <div className="wwd-framework-chapter__body">
                      {chapter.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  <figure className="wwd-framework-chapter__media-stage">
                    <div className="wwd-framework-chapter__media-shell">
                      <img
                        className="wwd-framework-chapter__image"
                        src={chapter.image}
                        alt={chapter.alt}
                      />
                      <figcaption className="wwd-framework-chapter__caption">
                        {chapter.caption}
                      </figcaption>
                    </div>

                    <div
                      className="wwd-framework-chapter__proof"
                      aria-label={`${chapter.title} proof points`}
                    >
                      {chapter.proofPoints.map((point) => (
                        <div className="wwd-framework-chapter__proof-item" key={point.label}>
                          {point.label}
                        </div>
                      ))}
                    </div>
                  </figure>
                </article>
              ))}
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
              <div className="wwd-universe-eyebrow">Market Segments</div>
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
