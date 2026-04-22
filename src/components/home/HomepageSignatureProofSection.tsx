import { useEffect, useRef } from "react";
import todProofVideo from "@/assets/TOD-GIF.mp4";
import type { SignatureProofContent } from "@/content/signatureProof";

type HomepageSignatureProofSectionProps = {
  content: SignatureProofContent;
};

const HomepageSignatureProofSection = ({ content }: HomepageSignatureProofSectionProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let isInViewport = false;

    const syncPlayback = () => {
      if (reducedMotion || document.hidden || !isInViewport) {
        video.pause();
        return;
      }

      void video.play().catch(() => {});
    };

    const handleVisibilityChange = () => {
      syncPlayback();
    };

    let observer: IntersectionObserver | null = null;

    if (typeof IntersectionObserver === "undefined") {
      isInViewport = true;
      syncPlayback();
    } else {
      observer = new IntersectionObserver(
        ([entry]) => {
          isInViewport = entry?.isIntersecting ?? false;
          syncPlayback();
        },
        { threshold: 0.3 }
      );

      observer.observe(section);
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer?.disconnect();
      video.pause();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="signature-proof"
      id="retail"
      aria-labelledby="signature-proof-title"
    >
      <div className="signature-proof__inner">
        <div className="signature-proof__thesis-row">
          <div className="signature-proof__copy">
            <div className="signature-proof__eyebrow rv">{content.eyebrow}</div>
            <h2 className="signature-proof__headline rv d1" id="signature-proof-title">
              <span>From Raw Land to</span>
              <span>Realized Value</span>
            </h2>
          </div>
          <p className="signature-proof__subtext">{content.subtext}</p>
        </div>

        <div className="signature-proof__video-stage rv d3">
          <div className="signature-proof__media-panel">
            <video
              ref={videoRef}
              className="signature-proof__video"
              src={todProofVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
            <div className="signature-proof__video-scrim" aria-hidden="true"></div>

            <div className="signature-proof__video-copy">
              <div className="signature-proof__video-eyebrow">{content.outcome.eyebrow}</div>
              <h3 className="signature-proof__video-title">{content.outcome.title}</h3>
              <div className="signature-proof__video-location">{content.outcome.location}</div>
            </div>
          </div>

          <aside className="signature-proof__outcome-panel" aria-label="Representative outcome">
            <div className="signature-proof__outcome-metrics">
              <div className="signature-proof__outcome-metric signature-proof__outcome-metric--return">
                <div className="signature-proof__outcome-value">{content.outcome.value}</div>
                <div className="signature-proof__outcome-label">{content.outcome.label}</div>
              </div>
              <div className="signature-proof__outcome-metric signature-proof__outcome-metric--hold">
                <div className="signature-proof__outcome-value">{content.outcome.holdValue}</div>
                <div className="signature-proof__outcome-label">{content.outcome.holdLabel}</div>
              </div>
            </div>
            <p className="signature-proof__outcome-line">{content.outcome.supportingLine}</p>
            <div className="signature-proof__chips">
              {content.outcome.chips.map((chip) => (
                <span className="signature-proof__chip" key={chip}>
                  {chip}
                </span>
              ))}
            </div>
            <div className="signature-proof__outcome-footer">{content.outcome.footer}</div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default HomepageSignatureProofSection;
