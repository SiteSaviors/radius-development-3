import { useEffect, useState } from "react";
import companyHeroBg from "@/assets/company-hero.jpg";
import companyHeroMobileBg from "@/assets/RADIUS-MOBILE.jpg";
import CompanyMissionWheel from "@/components/company/CompanyMissionWheel";
import CompanyTeamGrid from "@/components/company/CompanyTeamGrid";
import LazyBackground from "@/components/media/LazyBackground";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { companyAbout, companyHero, companyMission, companyNumbers, companyTeam } from "@/content/company";
import useRadiusCursor from "@/hooks/useRadiusCursor";

const formatCompanyStatValue = (value: number, decimals: number) =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

const formatCompanyStat = (value: number, prefix: string, suffix: string, decimals: number) =>
  `${prefix}${formatCompanyStatValue(value, decimals)}${suffix}`;

const Company = () => {
  const [numberValues, setNumberValues] = useState(() =>
    companyNumbers.stats.map((stat) => formatCompanyStat(0, stat.prefix, stat.suffix, stat.decimals))
  );

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

  useEffect(() => {
    const numbersSection = document.getElementById("company-numbers-grid");
    if (!numbersSection) return;

    const setFinal = () =>
      setNumberValues(
        companyNumbers.stats.map((stat) =>
          formatCompanyStat(stat.end, stat.prefix, stat.suffix, stat.decimals)
        )
      );

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setFinal();
      return;
    }

    let frame = 0;
    let hasAnimated = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || hasAnimated) return;

        hasAnimated = true;
        observer.disconnect();

        const duration = 1400;
        const startTime = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);

          setNumberValues(
            companyNumbers.stats.map((stat) => {
              const animatedValue = stat.end * eased;
              const displayValue =
                stat.decimals > 0
                  ? Number(animatedValue.toFixed(stat.decimals))
                  : Math.floor(animatedValue);

              return formatCompanyStat(displayValue, stat.prefix, stat.suffix, stat.decimals);
            })
          );

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

    observer.observe(numbersSection);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div id="cur"></div>
      <div id="cdot"></div>
      <SiteHeader currentPath="/company" />

      <main className="company-page">
        <section className="wwd-hero">
          <LazyBackground
            className="wwd-hero-media"
            image={companyHeroBg}
            mobileImage={companyHeroMobileBg}
            eager
            ariaHidden
          />
          <div className="wwd-hero-copy">
            <div className="wwd-hero-eyebrow">{companyHero.eyebrow}</div>
            <h1 className="wwd-hero-title">{companyHero.title}</h1>
            {companyHero.body ? <p className="wwd-hero-body">{companyHero.body}</p> : null}
          </div>
        </section>

        <section className="company-numbers" aria-labelledby="company-numbers-title">
          <div className="company-numbers-inner">
            <h2 id="company-numbers-title" className="company-numbers-title">
              {companyNumbers.title}
            </h2>

            <div className="company-numbers-grid" id="company-numbers-grid">
              {companyNumbers.stats.map((stat, index) => (
                <div key={stat.id} className="company-numbers-item">
                  <div className="company-numbers-value" id={stat.id}>
                    {numberValues[index]}
                  </div>
                  <div className="company-numbers-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="company-about" aria-labelledby="company-about-title">
          <div className="company-about-inner">
            <div className="company-about-media">
              <figure className="company-about-media-card">
                <img
                  className="company-about-image"
                  src={companyAbout.image}
                  alt={companyAbout.imageAlt}
                />
              </figure>
              <figure className="company-about-inset-card">
                <img
                  className="company-about-inset-image"
                  src={companyAbout.insetImage}
                  alt={companyAbout.insetImageAlt}
                />
              </figure>
            </div>

            <div className="company-about-copy">
              <div className="company-about-rule" aria-hidden="true" />
              <div className="company-about-eyebrow">{companyAbout.eyebrow}</div>
              <h2 id="company-about-title" className="company-about-title">
                {companyAbout.title}
              </h2>
              <div className="company-about-body">
                {companyAbout.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="company-mission" aria-label="Our Mission">
          <div className="company-mission-inner">
            <div className="company-mission-copy">
              <div className="company-mission-rule" aria-hidden="true" />
              <div className="company-mission-eyebrow">{companyMission.eyebrow}</div>
              <h2 id="company-mission-title" className="company-mission-title">
                {companyMission.headline}
              </h2>
              <div className="company-mission-body">
                {companyMission.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="company-mission-wheel-wrap">
              <div className="company-mission-wheel-stage">
                <div className="company-mission-wheel-glow" aria-hidden="true" />
                <div className="company-mission-wheel-panel" aria-hidden="true" />
                <div className="company-mission-wheel-orbit" aria-hidden="true" />
                <div className="company-mission-wheel-backing" aria-hidden="true" />
                <div className="company-mission-wheel-pedestal" aria-hidden="true" />
                <CompanyMissionWheel
                  values={companyMission.values}
                  centerLabel={companyMission.centerLabel}
                  ariaLabel="Interactive mission values wheel"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="company-team" id="meet-the-team" aria-labelledby="company-team-title">
          <div className="company-team-inner">
            <h2 id="company-team-title" className="company-team-title">
              {companyTeam.title}
            </h2>
            <CompanyTeamGrid title={companyTeam.title} members={companyTeam.members} />
          </div>
        </section>
      </main>

      <SiteFooter currentPath="/company" />
    </>
  );
};

export default Company;
