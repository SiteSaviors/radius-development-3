import { Link } from "react-router-dom";
import type { HomepageAdvantageContent } from "@/content/homepageAdvantage";
import HomepageAdvantageProofPanel from "@/components/home/HomepageAdvantageProofPanel";

type HomepageAdvantageSectionProps = {
  content: HomepageAdvantageContent;
};

const HomepageAdvantageSection = ({ content }: HomepageAdvantageSectionProps) => (
  <section className="homepage-advantage" id="about" aria-labelledby="homepage-advantage-title">
    <div className="homepage-advantage__inner">
      <div className="homepage-advantage__copy">
        <div className="homepage-advantage__eyebrow rv">{content.eyebrow}</div>
        <h2 id="homepage-advantage-title" className="homepage-advantage__title rv d1">
          {content.title}
        </h2>
        <div className="homepage-advantage__body rv d2">
          {content.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <Link to={content.ctaHref} className="homepage-advantage__cta rv d3">
          {content.ctaLabel}
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <HomepageAdvantageProofPanel content={content} />
    </div>
  </section>
);

export default HomepageAdvantageSection;
