import { useEffect, useState } from "react";
import whatWeDoHeroBg from "@/assets/Radius-Back.jpeg";
import LazyBackground from "@/components/media/LazyBackground";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import {
  whatWeDoCta,
  whatWeDoHero,
  whatWeDoIntro,
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

  return (
    <>
      <div id="cur"></div>
      <div id="cdot"></div>
      <SiteHeader currentPath="/what-we-do" />

      <main className="wwd-page">
        <section className="wwd-hero">
          <LazyBackground className="wwd-hero-media" image={whatWeDoHeroBg} eager ariaHidden />
          <div className="wwd-hero-copy">
            <div className="wwd-hero-eyebrow">{whatWeDoHero.eyebrow}</div>
            <h1 className="wwd-hero-title">{whatWeDoHero.title}</h1>
            <p className="wwd-hero-body">{whatWeDoHero.body}</p>
          </div>
        </section>

        <section className="wwd-intro">
          <div className="wwd-intro-inner">
            <h2 className="wwd-intro-title">{whatWeDoIntro.title}</h2>
            <div className="wwd-intro-body">
              {whatWeDoIntro.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
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
              <h2 id="wwd-universe-title" className="wwd-universe-title">
                {whatWeDoUniverse.title}
              </h2>
              <p className="wwd-universe-body">{whatWeDoUniverse.body}</p>
            </div>

            <div className="wwd-universe-stage">
              <div className="wwd-universe-board" aria-hidden="true"></div>

              {whatWeDoUniverseSectors.map((sector) => {
                const isActive = activeUniverseSectorId === sector.id;

                if (isActive) {
                  return (
                    <article
                      key={sector.id}
                      className={`wwd-universe-card wwd-universe-card--${sector.id} is-active`}
                      id={`wwd-universe-panel-${sector.id}`}
                    >
                      <span className="wwd-universe-card-shape" aria-hidden="true"></span>
                      <div className="wwd-universe-card-content">
                        <h3 className="wwd-universe-card-title">{sector.title}</h3>
                        <ul
                          className={`wwd-universe-card-list${sector.items.length > 4 ? " has-columns" : ""}`}
                        >
                          {sector.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                        <button
                          type="button"
                          className="wwd-universe-card-close"
                          aria-label={`Collapse ${sector.title}`}
                          onClick={() => setActiveUniverseSectorId(null)}
                        >
                          <span aria-hidden="true">+</span>
                        </button>
                      </div>
                    </article>
                  );
                }

                return (
                  <button
                    key={sector.id}
                    type="button"
                    className={`wwd-universe-card wwd-universe-card--${sector.id}`}
                    aria-expanded="false"
                    aria-controls={`wwd-universe-panel-${sector.id}`}
                    onClick={() => setActiveUniverseSectorId(sector.id)}
                  >
                    <span className="wwd-universe-card-shape" aria-hidden="true"></span>
                    <span className="wwd-universe-card-content">
                      <span className="wwd-universe-card-title">{sector.title}</span>
                      <span className="wwd-universe-card-icon" aria-hidden="true">
                        +
                      </span>
                    </span>
                  </button>
                );
              })}
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
