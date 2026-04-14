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

  return (
    <article className="closed-trophy rv" tabIndex={0}>
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

      <div className="closed-trophy__panel rv d2">
        <div className="closed-trophy__eyebrow">{content.eyebrow}</div>

        <div className="closed-trophy__metric-block">
          <div>
            <div className="closed-trophy__metric-label">{content.outcomeLabel}</div>
            <div className="closed-trophy__metric-meta">{content.outcomeMeta}</div>
          </div>
          <div className="closed-trophy__metric-value">{content.outcomeValue}</div>
        </div>

        <div className="closed-trophy__buyer">
          <span>{content.buyerName}</span>
          <img src={content.buyerLogo} alt={content.buyerName} />
        </div>

        <div className="closed-trophy__detail">
          <p className="closed-trophy__thesis">{content.thesis}</p>
          <div className="closed-trophy__facts" role="list" aria-label="Transaction facts">
            <div className="closed-trophy__fact" role="listitem">
              <div className="closed-trophy__fact-label">Project Scope</div>
              <div className="closed-trophy__fact-value">{content.scope}</div>
            </div>
            <div className="closed-trophy__fact" role="listitem">
              <div className="closed-trophy__fact-label">Our Role</div>
              <div className="closed-trophy__fact-value">{content.role}</div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default HomepageRecentlyClosedSpotlight;
