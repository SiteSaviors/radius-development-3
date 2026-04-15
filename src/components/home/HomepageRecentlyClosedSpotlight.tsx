import { useEffect, useRef, type CSSProperties } from "react";
import type { RecentlyClosedSpotlightContent } from "@/content/recentlyClosed";

type HomepageRecentlyClosedSpotlightProps = {
  content: RecentlyClosedSpotlightContent;
};

const HomepageRecentlyClosedSpotlight = ({
  content,
}: HomepageRecentlyClosedSpotlightProps) => {
  const cardRef = useRef<HTMLElement | null>(null);
  const metricRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    const metricEl = metricRef.current;
    if (!card || !metricEl) return;

    const finalValue = content.outcomeAnimatedEnd;
    const decimals = content.outcomeDecimals;
    const suffix = content.outcomeSuffix;

    const setFinal = () => {
      metricEl.textContent = finalValue.toFixed(decimals) + suffix;
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setFinal();
      return;
    }

    let frame = 0;
    let hasRun = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || hasRun) return;
        hasRun = true;
        observer.disconnect();

        const duration = 1400;
        const startTime = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = finalValue * eased;
          metricEl.textContent = value.toFixed(decimals) + suffix;
          if (progress < 1) {
            frame = requestAnimationFrame(tick);
          } else {
            setFinal();
          }
        };

        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.35 }
    );

    observer.observe(card);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [content.outcomeAnimatedEnd, content.outcomeDecimals, content.outcomeSuffix]);

  const mediaStyle = {
    "--closed-image-position": content.imagePosition ?? "center center",
    "--closed-mobile-image-position":
      content.mobileImagePosition ?? content.imagePosition ?? "center center",
  } as CSSProperties;

  return (
    <>
      {content.stripStats.length > 0 && (
        <div className="closed-strip rv d1">
          {content.stripStats.map((stat) => (
            <div key={stat.label} className="closed-strip__item">
              <div className="closed-strip__value">{stat.value}</div>
              <div className="closed-strip__label">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      <article ref={cardRef} className="closed-trophy rv" tabIndex={0}>
        <div className="closed-trophy__media" style={mediaStyle}>
          <picture>
            {content.mobileImage ? (
              <source media="(max-width: 768px)" srcSet={content.mobileImage} />
            ) : null}
            <img
              className="closed-trophy__image"
              src={content.image}
              alt={`${content.title}, ${content.location}`}
            />
          </picture>
          <div className="closed-trophy__scrim" aria-hidden="true"></div>
          <div className="closed-trophy__copy">
            <div className="closed-trophy__label">Closed</div>
            <h3 className="closed-trophy__title">{content.title}</h3>
            <div className="closed-trophy__location">{content.location}</div>
          </div>
        </div>

        <div className="closed-trophy__panel">
          <div className="closed-trophy__eyebrow">{content.eyebrow}</div>

          <div className="closed-trophy__metric-block">
            <div className="closed-trophy__metric-label">{content.outcomeLabel}</div>
            <div className="closed-trophy__metric-value">
              <span ref={metricRef}>{content.outcomeValue}</span>
            </div>
            <div className="closed-trophy__metric-meta">{content.outcomeMeta}</div>
          </div>

          <div className="closed-trophy__pills">
            <span className="closed-pill">{content.scope}</span>
            <span className="closed-pill closed-pill--gold">{content.role}</span>
          </div>

          <p className="closed-trophy__thesis">{content.thesis}</p>

          <div className="closed-trophy__buyer">
            <div className="closed-trophy__buyer-block">
              <div className="closed-trophy__buyer-label">{content.buyerLabel}</div>
              <span className="closed-trophy__buyer-name">{content.buyerName}</span>
            </div>
            <img src={content.buyerLogo} alt={content.buyerName} />
          </div>
        </div>
      </article>
    </>
  );
};

export default HomepageRecentlyClosedSpotlight;
