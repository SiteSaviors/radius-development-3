import type { CSSProperties } from "react";
import type { RecentlyClosedSpotlightContent } from "@/content/recentlyClosed";

type HomepageRecentlyClosedSpotlightProps = {
  content: RecentlyClosedSpotlightContent;
};

const HomepageRecentlyClosedSpotlight = ({
  content,
}: HomepageRecentlyClosedSpotlightProps) => {
  const mediaStyle = {
    "--closed-image-position": content.imagePosition ?? "center center",
    "--closed-mobile-image-position":
      content.mobileImagePosition ?? content.imagePosition ?? "center center",
  } as CSSProperties;

  const facts = [
    { label: "Project Scope", value: content.scope },
    { label: "Our Role", value: content.role },
  ];

  return (
    <div className="closed-spotlight">
      <div className="closed-spotlight__media rv d1" style={mediaStyle}>
        <picture>
          {content.mobileImage ? (
            <source media="(max-width: 768px)" srcSet={content.mobileImage} />
          ) : null}
          <img
            className="closed-spotlight__media-image"
            src={content.image}
            alt={`${content.title}, ${content.location}`}
          />
        </picture>
        <div className="closed-spotlight__scrim" aria-hidden="true"></div>
        <div className="closed-spotlight__overlay">
          <div className="closed-spotlight__label">Closed</div>
          <div className="closed-spotlight__title">{content.title}</div>
          <div className="closed-spotlight__location">{content.location}</div>
        </div>
      </div>

      <div className="closed-spotlight__proof rv d2">
        <div className="closed-spotlight__proof-eyebrow">{content.eyebrow}</div>
        <h3 className="closed-spotlight__headline">{content.headline}</h3>

        <div className="closed-spotlight__outcome rv d3">
          <div>
            <div className="closed-spotlight__outcome-label">{content.outcomeLabel}</div>
            <div className="closed-spotlight__outcome-meta">{content.outcomeMeta}</div>
          </div>
          <div className="closed-spotlight__outcome-value">{content.outcomeValue}</div>
        </div>

        <p className="closed-spotlight__summary">{content.summary}</p>

        <div className="closed-spotlight__facts" role="list" aria-label="Transaction facts">
          {facts.map((fact, index) => (
            <div
              key={fact.label}
              className={`closed-spotlight__fact rv d${Math.min(index + 3, 4)}`}
              role="listitem"
            >
              <div className="closed-spotlight__fact-label">{fact.label}</div>
              <div className="closed-spotlight__fact-value">{fact.value}</div>
            </div>
          ))}
          <div className="closed-spotlight__fact closed-spotlight__fact--buyer rv d4" role="listitem">
            <div className="closed-spotlight__fact-label">Buyer</div>
            <div className="closed-spotlight__buyer">
              <span>{content.buyerName}</span>
              <img src={content.buyerLogo} alt={content.buyerName} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageRecentlyClosedSpotlight;
