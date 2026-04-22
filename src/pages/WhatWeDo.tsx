import type { CSSProperties, KeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";
import whatWeDoHeroBg from "@/assets/WHAT-WE-DO-2200-q86.webp";
import whatWeDoHeroMobileBg from "@/assets/WWD-HERO-MOB-2200-q86.webp";
import universeCommercialImage from "@/assets/CARY-E-2200-q86.webp";
import universeMixedUseImage from "@/assets/FRANKLIN-2200-q86.webp";
import universeResidentialImage from "@/assets/PITTARD-2200-q86.webp";
import universeRetailImage from "@/assets/LUX-RETAIL-2200-q86.webp";
import LazyBackground from "@/components/media/LazyBackground";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { cn } from "@/lib/utils";
import {
  whatWeDoCta,
  whatWeDoFrameworkChapters,
  whatWeDoFrameworkHandoff,
  whatWeDoHero,
  whatWeDoUniverse,
  whatWeDoUniverseSectors,
} from "@/content/whatWeDo";
import useRadiusCursor from "@/hooks/useRadiusCursor";

const universeQuadrantClasses = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
] as const;

const universeSectorMeta = {
  residential: {
    image: universeResidentialImage,
    accentRgb: "124, 164, 102",
  },
  retail: {
    image: universeRetailImage,
    accentRgb: "181, 138, 61",
  },
  commercial: {
    image: universeCommercialImage,
    accentRgb: "104, 136, 190",
  },
  "mixed-use": {
    image: universeMixedUseImage,
    accentRgb: "161, 115, 92",
  },
} as const;

const WhatWeDo = () => {
  type UniverseSectorId = (typeof whatWeDoUniverseSectors)[number]["id"];

  const [activeDesktopSectorId, setActiveDesktopSectorId] = useState<UniverseSectorId | null>(null);
  const [activeMobileSectorId, setActiveMobileSectorId] = useState<UniverseSectorId | null>(null);
  const desktopTileRefs = useRef<Array<HTMLButtonElement | null>>([]);

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

  const handleDesktopSectorKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
    sectorId: UniverseSectorId
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActiveDesktopSectorId((current) => (current === sectorId ? null : sectorId));
      return;
    }

    let nextIndex = index;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = index % 2 === 0 ? index + 1 : index;
        break;
      case "ArrowLeft":
        nextIndex = index % 2 === 1 ? index - 1 : index;
        break;
      case "ArrowDown":
        nextIndex = index < 2 ? index + 2 : index;
        break;
      case "ArrowUp":
        nextIndex = index >= 2 ? index - 2 : index;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = whatWeDoUniverseSectors.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    desktopTileRefs.current[nextIndex]?.focus();
  };

  return (
    <>
      <div id="cur"></div>
      <div id="cdot"></div>
      <SiteHeader currentPath="/what-we-do" />

      <main className="wwd-page">
        <section className="wwd-hero wwd-hero--what-we-do">
          <LazyBackground
            className="wwd-hero-media"
            image={whatWeDoHeroBg}
            mobileImage={whatWeDoHeroMobileBg}
            eager
            ariaHidden
          />
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
              {whatWeDoFrameworkChapters.map((chapter) => (
                <article
                  key={chapter.id}
                  data-chapter={chapter.id}
                  className={cn(
                    "wwd-framework-chapter",
                    `wwd-framework-chapter--${chapter.tone}`,
                    { "wwd-framework-chapter--reverse": chapter.layout === "media-left" }
                  )}
                >
                  <div className="wwd-framework-chapter__copy">
                    <div className="wwd-framework-chapter__eyebrow">
                      {`${chapter.sequence} / ${chapter.navLabel.toUpperCase()}`}
                    </div>
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
              <div
                className="wwd-universe-board wwd-universe-board--desktop"
                role="group"
                aria-label="Market segments desktop board"
              >
                <div
                  className="wwd-universe-grid"
                  role="tablist"
                  aria-label="Market segments"
                  data-active-position={
                    activeDesktopSectorId
                      ? universeQuadrantClasses[
                          Math.max(
                            0,
                            whatWeDoUniverseSectors.findIndex((sector) => sector.id === activeDesktopSectorId)
                          )
                        ]
                      : undefined
                  }
                  data-expanded={activeDesktopSectorId ? "true" : "false"}
                >
                  {whatWeDoUniverseSectors.map((sector, index) => {
                    const positionClass = universeQuadrantClasses[index];
                    const isActive = activeDesktopSectorId === sector.id;
                    const sectorMeta = universeSectorMeta[sector.id as keyof typeof universeSectorMeta];

                    return (
                      <article
                        key={sector.id}
                        data-sector={sector.id}
                        className={cn(
                          "wwd-segment-tile",
                          `wwd-segment-tile--${positionClass}`,
                          { "is-active": isActive }
                        )}
                        style={{ "--segment-accent-rgb": sectorMeta.accentRgb } as CSSProperties}
                      >
                        <button
                          ref={(node) => {
                            desktopTileRefs.current[index] = node;
                          }}
                          type="button"
                          className="wwd-segment-tile__trigger"
                          role="tab"
                          id={`wwd-segment-tab-${sector.id}`}
                          aria-label={sector.title}
                          aria-selected={isActive}
                          aria-controls={`wwd-segment-panel-${sector.id}`}
                          tabIndex={isActive || (!activeDesktopSectorId && index === 0) ? 0 : -1}
                          onClick={() =>
                            setActiveDesktopSectorId((current) =>
                              current === sector.id ? null : sector.id
                            )
                          }
                          onKeyDown={(event) => handleDesktopSectorKeyDown(event, index, sector.id)}
                        >
                          <span className="wwd-segment-tile__surface" aria-hidden="true"></span>
                          <span className="wwd-segment-tile__eyebrow-line" aria-hidden="true"></span>
                          <span className="wwd-segment-tile__title-wrap">
                            <span className="wwd-segment-tile__title">{sector.title}</span>
                          </span>
                          <span className="wwd-segment-tile__icon" aria-hidden="true">
                            {isActive ? "×" : "+"}
                          </span>
                        </button>

                        <div
                          className="wwd-segment-tile__panel"
                          id={`wwd-segment-panel-${sector.id}`}
                          role="tabpanel"
                          aria-hidden={!isActive}
                          aria-labelledby={`wwd-segment-tab-${sector.id}`}
                        >
                          <ul
                            className={cn("wwd-segment-tile__list", {
                              "wwd-segment-tile__list--columns": sector.items.length >= 4,
                            })}
                          >
                            {sector.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                          <div
                            className="wwd-segment-tile__media"
                            aria-hidden="true"
                            style={{ backgroundImage: `url(${sectorMeta.image})` }}
                          ></div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>

              <div
                className="wwd-universe-board-mobile"
                role="group"
                aria-label="Market segments mobile board"
              >
                <div
                  className={cn("wwd-universe-grid-mobile", {
                    "is-active": !!activeMobileSectorId,
                  })}
                  data-active-position={
                    activeMobileSectorId
                      ? universeQuadrantClasses[
                          Math.max(
                            0,
                            whatWeDoUniverseSectors.findIndex((sector) => sector.id === activeMobileSectorId)
                          )
                        ]
                      : undefined
                  }
                >
                  {whatWeDoUniverseSectors.map((sector, index) => {
                    const positionClass = universeQuadrantClasses[index];
                    const isActive = activeMobileSectorId === sector.id;
                    const sectorMeta = universeSectorMeta[sector.id as keyof typeof universeSectorMeta];

                    return (
                      <article
                        key={sector.id}
                        data-sector={sector.id}
                        className={cn(
                          "wwd-segment-mobile",
                          `wwd-segment-mobile--${positionClass}`,
                          { "is-active": isActive }
                        )}
                        style={{ "--segment-accent-rgb": sectorMeta.accentRgb } as CSSProperties}
                      >
                        <button
                          type="button"
                          className="wwd-segment-mobile__trigger"
                          aria-label={sector.title}
                          aria-expanded={isActive}
                          aria-controls={`wwd-segment-mobile-panel-${sector.id}`}
                          onClick={() =>
                            setActiveMobileSectorId((current) =>
                              current === sector.id ? null : sector.id
                            )
                          }
                          >
                          <span className="wwd-segment-mobile__surface" aria-hidden="true"></span>
                          <span className="wwd-segment-mobile__eyebrow-line" aria-hidden="true"></span>
                          <span className="wwd-segment-mobile__title-wrap">
                            <span className="wwd-segment-mobile__title">{sector.title}</span>
                          </span>
                          <span className="wwd-segment-mobile__icon" aria-hidden="true">
                            {isActive ? "×" : "+"}
                          </span>
                        </button>

                        <div
                          className="wwd-segment-mobile__panel"
                          id={`wwd-segment-mobile-panel-${sector.id}`}
                          aria-hidden={!isActive}
                        >
                          <ul className="wwd-segment-mobile__list">
                            {sector.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                          <div
                            className="wwd-segment-mobile__media"
                            aria-hidden="true"
                            style={{ backgroundImage: `url(${sectorMeta.image})` }}
                          ></div>
                        </div>
                      </article>
                    );
                  })}
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
