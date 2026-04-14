import { Link } from "react-router-dom";
import type { HomepageCapability } from "@/content/homepageCapabilities";
import LazyBackground from "@/components/media/LazyBackground";

type PlatformCapabilityCardProps = {
  capability: HomepageCapability;
  revealDelayClass?: string;
};

const capabilityIcons = {
  land: (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <rect x=".5" y=".5" width="25" height="25" stroke="currentColor" strokeWidth=".75" />
      <path d="M4 19L13 7L22 19" stroke="currentColor" strokeWidth=".75" fill="none" />
      <line x1="4" y1="19" x2="22" y2="19" stroke="currentColor" strokeWidth=".75" />
    </svg>
  ),
  development: (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <rect x=".5" y=".5" width="25" height="25" stroke="currentColor" strokeWidth=".75" />
      <rect x="3" y="10" width="7" height="13" stroke="currentColor" strokeWidth=".75" fill="none" />
      <rect x="14" y="6" width="9" height="17" stroke="currentColor" strokeWidth=".75" fill="none" />
      <line x1="10" y1="23" x2="14" y2="23" stroke="currentColor" strokeWidth=".75" />
    </svg>
  ),
  retail: (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <rect x=".5" y=".5" width="25" height="25" stroke="currentColor" strokeWidth=".75" />
      <rect x="2" y="13" width="22" height="10" stroke="currentColor" strokeWidth=".75" fill="none" />
      <line x1="2" y1="13" x2="2" y2="9" stroke="currentColor" strokeWidth=".75" />
      <line x1="24" y1="13" x2="24" y2="9" stroke="currentColor" strokeWidth=".75" />
      <path d="M2 9Q13 3 24 9" stroke="currentColor" strokeWidth=".75" fill="none" />
      <line x1="10" y1="13" x2="10" y2="23" stroke="currentColor" strokeWidth=".5" />
      <line x1="16" y1="13" x2="16" y2="23" stroke="currentColor" strokeWidth=".5" />
    </svg>
  ),
} as const;

const PlatformCapabilityCard = ({ capability, revealDelayClass }: PlatformCapabilityCardProps) => (
  <article
    className={`platform-card platform-card--${capability.tone} rv${revealDelayClass ? ` ${revealDelayClass}` : ""}`}
  >
    <div className="platform-card__media">
      <LazyBackground className="platform-card__image" image={capability.image} ariaHidden />
      <div className="platform-card__scrim" />
      <div className="platform-card__topbar">
        <div className="platform-card__eyebrow">{capability.eyebrow}</div>
        <div className="platform-card__icon" aria-hidden="true">
          {capabilityIcons[capability.icon]}
        </div>
      </div>
    </div>

    <div className="platform-card__panel">
      <div className="platform-card__accent" aria-hidden="true" />
      <h3 className="platform-card__title">{capability.title}</h3>
      <p className="platform-card__summary">{capability.summary}</p>
      <p className="platform-card__detail">{capability.detail}</p>
      <Link to={capability.href} className="platform-card__cta">
        {capability.ctaLabel}
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  </article>
);

export default PlatformCapabilityCard;
