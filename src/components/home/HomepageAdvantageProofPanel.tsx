import { useEffect, useRef, useState } from "react";
import type { HomepageAdvantageContent, HomepageAdvantageMetric } from "@/content/homepageAdvantage";
import LazyBackground from "@/components/media/LazyBackground";

type HomepageAdvantageProofPanelProps = {
  content: HomepageAdvantageContent;
};

const getMetricElementId = (id: HomepageAdvantageMetric["id"]) => `wwa-metric-${id}`;

const formatMetricValue = (value: number, decimals: number) =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

const HomepageAdvantageProofPanel = ({ content }: HomepageAdvantageProofPanelProps) => {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const setFinalValues = () => {
      content.metrics.forEach((metric) => {
        const element = document.getElementById(getMetricElementId(metric.id));
        if (!element) return;
        element.textContent = formatMetricValue(metric.animatedEnd, metric.decimals) + metric.suffix;
      });
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setFinalValues();
      setIsActive(true);
      return;
    }

    let observer: IntersectionObserver | null = null;
    let frame = 0;

    observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;

        observer?.disconnect();
        setIsActive(true);

        const duration = 1600;
        const startTime = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);

          content.metrics.forEach((metric) => {
            const element = document.getElementById(getMetricElementId(metric.id));
            if (!element) return;
            const value = metric.animatedEnd * eased;
            const displayValue =
              metric.decimals > 0 ? Number(value.toFixed(metric.decimals)) : Math.floor(value);
            element.textContent = formatMetricValue(displayValue, metric.decimals) + metric.suffix;
          });

          if (progress < 1) {
            frame = requestAnimationFrame(tick);
          } else {
            setFinalValues();
          }
        };

        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.35 }
    );

    observer.observe(shell);

    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [content]);

  const heroMetric = content.metrics.find((metric) => metric.role === "hero");
  const supportMetrics = content.metrics.filter((metric) => metric.role === "support");

  if (!heroMetric) return null;

  return (
    <div className={`homepage-advantage__visual rv d2${isActive ? " is-active" : ""}`}>
      <div ref={shellRef} className="homepage-advantage__image-shell">
        <LazyBackground className="homepage-advantage__image" image={content.image} ariaHidden />
        <div className="homepage-advantage__image-overlay" />

        <div className={`homepage-advantage__proof-card${isActive ? " is-active" : ""}`}>
          <div className="homepage-advantage__proof-header">
            <div className="homepage-advantage__proof-eyebrow">{content.proofEyebrow}</div>
            {content.proofTitle ? (
              <div className="homepage-advantage__proof-title">{content.proofTitle}</div>
            ) : null}
          </div>

          <div className="homepage-advantage__hero-metric">
            <div className="homepage-advantage__hero-value" id={getMetricElementId(heroMetric.id)}>
              {heroMetric.value}
            </div>
            <div className="homepage-advantage__hero-label">{heroMetric.label}</div>
          </div>

          <div className="homepage-advantage__support-list">
            {supportMetrics.map((metric, index) => (
              <div
                key={metric.id}
                className={`homepage-advantage__support-item homepage-advantage__support-item--${metric.id} support-delay-${index + 1}`}
              >
                <div className="homepage-advantage__support-value" id={getMetricElementId(metric.id)}>
                  {metric.value}
                </div>
                <div className="homepage-advantage__support-label">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageAdvantageProofPanel;
