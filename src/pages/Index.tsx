import { useEffect } from "react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/company-hero.jpg";
import heroVideo from "@/assets/RADIUS-VIDEO.mp4";
import trammelCrowLogo from "@/assets/Trammel-Crow.webp";
import tollBrothersLogo from "@/assets/Toll-Brothers.webp";
import triPointeLogo from "@/assets/Tri-Pointe.webp";
import mcAdamsLogo from "@/assets/McAdams.webp";
import woodPartnersLogo from "@/assets/Wood-Partners.webp";
import teamPhoto139 from "@/assets/RICKY.webp";
import teamPhoto140 from "@/assets/GAURANG.webp";
import teamPhoto141 from "@/assets/141-2000-q86.webp";
import teamPhoto142 from "@/assets/142-2000-q86.webp";
import investorCtaBg from "@/assets/INVESTOR-2000-q86.webp";
import HomepageAdvantageSection from "@/components/home/HomepageAdvantageSection";
import HomepagePropertiesSlideshow from "@/components/home/HomepagePropertiesSlideshow";
import HomepageSignatureProofSection from "@/components/home/HomepageSignatureProofSection";
import PlatformCapabilityCard from "@/components/home/PlatformCapabilityCard";
import LazyBackground from "@/components/media/LazyBackground";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { homepageAdvantageContent } from "@/content/homepageAdvantage";
import { homepageCapabilities } from "@/content/homepageCapabilities";
import { projects } from "@/content/projects";
import { signatureProofContent } from "@/content/signatureProof";
import useRadiusCursor from "@/hooks/useRadiusCursor";

const partnerLogoSlots = [
  {
    name: "Trammell Crow",
    image: trammelCrowLogo,
  },
  {
    name: "Toll Brothers",
    image: tollBrothersLogo,
  },
  {
    name: "Tri-Pointe Homes",
    image: triPointeLogo,
  },
  {
    name: "McAdams",
    image: mcAdamsLogo,
  },
  {
    name: "Wood Partners",
    image: woodPartnersLogo,
  },
] as const;

const teamMembers = [
  {
    name: "Ricky Joshi",
    role: "General Partner",
    theme: "team-01",
    image: teamPhoto139,
  },
  {
    name: "Gaurang Gala",
    role: "General Partner",
    theme: "team-02",
    image: teamPhoto140,
  },
  {
    name: "Tarek Morshed",
    role: "General Partner",
    theme: "team-03",
    image: teamPhoto141,
  },
  {
    name: "Elizabeth Eichen",
    role: "Head of Investor Relations",
    theme: "team-04",
    image: teamPhoto142,
  },
] as const;

const Index = () => {
  useRadiusCursor();

  useEffect(() => {
    const sthumb = document.getElementById("sthumb")!;
    const hbg = document.getElementById("hbg")!;
    const hwm = document.getElementById("hwm")!;
    const heroSection = document.getElementById("hero");
    const heroVideoEl = document.getElementById("hvideo") as HTMLVideoElement | null;
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      sthumb.style.height = Math.min(pct, 100) + "%";
      hbg.style.transform = `translateY(${window.scrollY * 0.22}px)`;
      hwm.style.transform = `translateY(calc(-50% + ${window.scrollY * 0.1}px))`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // HERO VIDEO
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let heroObs: IntersectionObserver | null = null;
    const syncHeroVideo = (shouldPlay: boolean) => {
      if (!heroVideoEl) return;
      if (reducedMotion) {
        heroVideoEl.pause();
        return;
      }
      if (shouldPlay && !document.hidden) {
        void heroVideoEl.play().catch(() => {});
      } else {
        heroVideoEl.pause();
      }
    };
    const onVisibility = () => {
      if (!heroSection) return;
      const rect = heroSection.getBoundingClientRect();
      const visible = rect.bottom > window.innerHeight * 0.2 && rect.top < window.innerHeight * 0.8;
      syncHeroVideo(visible);
    };
    if (heroSection && heroVideoEl) {
      heroObs = new IntersectionObserver(
        (entries) => syncHeroVideo(entries[0]?.isIntersecting ?? false),
        { threshold: 0.2 }
      );
      heroObs.observe(heroSection);
      document.addEventListener("visibilitychange", onVisibility);
      onVisibility();
    }

    // REVEAL
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("on"); }), { threshold: 0.07, rootMargin: "0px 0px -30px 0px" });
    document.querySelectorAll(".rv").forEach(el => obs.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      obs.disconnect();
      heroObs?.disconnect();
    };
  }, []);

  return (
    <>
      {/* CURSOR */}
      <div id="cur"></div><div id="cdot"></div>
      {/* SCROLL PROGRESS */}
      <div id="sbar"><div id="sthumb"></div></div>

      <SiteHeader currentPath="/" />

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hbg" id="hbg" style={{backgroundImage:`url(${heroBg})`}}>
          <video
            className="hbgv"
            id="hvideo"
            muted
            loop
            playsInline
            preload="metadata"
            poster={heroBg}
            aria-hidden="true"
            disablePictureInPicture
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        </div>
        <div className="hwm" id="hwm">RADIUS</div>
        <div className="hinner">
          <div className="glass text-left">
            <div className="ey">Land &nbsp;·&nbsp; Development &nbsp;·&nbsp; Retail</div>
            <h1>
              We Find High Value Development Opportunities{" "}
              <span className="hero-headline-accent">Before the Market Sees Them</span>
            </h1>
            <p className="hsp">Land acquisition, development partnerships, and scalable retail concepts across high-growth markets.</p>
            <div className="hbtns">
              <Link to="/projects" className="bp">View Projects</Link>
              <a href="#" className="bg">Investor Portal &nbsp;→</a>
            </div>
          </div>
        </div>
        <div className="si">
          <div className="silbl">Scroll</div>
          <div className="sil"></div>
        </div>
      </section>

      <div className="logos rv">
        <div className="lbh">Trusted Partners &amp; Institutional Counterparties</div>
        <div className="lrow">
          {partnerLogoSlots.map((partner) => (
            <div key={partner.name} className="li">
              <div className="lslot">
                <div
                  className={`limg${partner.image ? " has-logo" : ""}`}
                  aria-hidden="true"
                  style={partner.image ? { backgroundImage: `url(${partner.image})` } : undefined}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WHO WE ARE */}
      <HomepageAdvantageSection content={homepageAdvantageContent} />

      {/* PLATFORM */}
      <section className="plat" id="platform">
        <div className="sh">
          <div>
            <div className="plat-ey rv">OUR CAPABILITIES</div>
            <div className="plat-st rv d1">A Smarter Path to<br/>Real Estate Value Creation</div>
          </div>
          <p className="plat-sd rv d2">At Radius, we operate across the full lifecycle of real estate value creation—from identifying land opportunity, to partnering on institutional-scale development, to building iconic retail destinations.</p>
        </div>
        <div className="bento">
          {homepageCapabilities.map((capability, index) => (
            <PlatformCapabilityCard
              key={capability.id}
              capability={capability}
              revealDelayClass={index === 0 ? undefined : `d${Math.min(index, 2)}`}
            />
          ))}
        </div>
      </section>

      <div className="homepage-dark-flow">
        {/* FEATURED PROJECTS */}
        <section className="fps" id="featured-projects">
          <div className="fps__header">
            <div className="fps__header-copy">
              <div className="fps-ey rv">Active Pipeline</div>
              <div className="st rv d1">Landmark Projects</div>
            </div>
            <p className="sd rv d2">Current projects moving through entitlement, strategic development structuring, and retail execution across high-growth markets.</p>
          </div>
          <HomepagePropertiesSlideshow projects={projects} />
        </section>

        {/* SIGNATURE PROOF */}
        <HomepageSignatureProofSection content={signatureProofContent} />
      </div>

      {/* OUR TEAM */}
      <section className="team" id="team">
        <div className="teami">
          <div className="teamcopy">
            <div className="team-ey rv">Our Team</div>
            <div className="team-title rv d1">Experienced Operators, Structured for Execution</div>
            <p className="teambody rv d2">Radius is built around a senior team with deep experience across land acquisition, entitlement strategy, structured development, and capital execution. We combine institutional rigor with principal-led decisiveness, giving our partners a team that can move quickly without compromising discipline.</p>
          </div>

          <div className="teammedia rv d1">
            <div className="teamgrid">
              {teamMembers.map((member, index) => (
                <Link
                  key={member.name}
                  to="/company#meet-the-team"
                  className={`teamcard ${member.theme} rv d${Math.min(index + 1, 4)}`}
                >
                  <LazyBackground className="teamimage" image={member.image} ariaHidden />
                  <div className="teammeta">
                    <div className="teamname">{member.name}</div>
                    <div className="teamrole">{member.role}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Link to="/company" className="team-cta rv d3">
            About Us
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="investorcta">
        <div className="investorctai">
          <LazyBackground className="investorcta-bg rv d1" image={investorCtaBg} ariaHidden />
          <div className="investorcard rv d2">
            <div className="ey rv">Investor Access</div>
            <div className="st rv d3">Interested in Learning More?</div>
            <p className="investorbody rv d4">
              We&apos;re always looking to partner with accredited investors who share our vision for real estate value creation. Join us to access exclusive opportunities, local expertise, and a team committed to helping you achieve your goals.
            </p>
            <div className="investoractions rv d4">
              <a href="#" className="bp">Become an Investor</a>
              <a href="#" className="bp">Investor Portal</a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter currentPath="/" />
    </>
  );
};

export default Index;
