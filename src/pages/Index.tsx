import { useEffect } from "react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/RADIUS-VIDEO-poster.jpg";
import heroVideo from "@/assets/RADIUS-VIDEO.mp4";
import trammelCrowLogo from "@/assets/Trammel-Crow.webp";
import tollBrothersLogo from "@/assets/Toll-Brothers.webp";
import triPointeLogo from "@/assets/Tri-Pointe.webp";
import mcAdamsLogo from "@/assets/McAdams.webp";
import whoWeAreBg from "@/assets/3.jpg";
import todBg from "@/assets/TOD.jpg";
import woodPartnersLogo from "@/assets/Wood-Partners.webp";
import teamPhoto139 from "@/assets/139.jpg";
import teamPhoto140 from "@/assets/140.jpg";
import teamPhoto141 from "@/assets/141.jpg";
import teamPhoto142 from "@/assets/142.jpg";
import investorCtaBg from "@/assets/investor.jpg";
import PlatformCapabilityCard from "@/components/home/PlatformCapabilityCard";
import LazyBackground from "@/components/media/LazyBackground";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { homepageCapabilities } from "@/content/homepageCapabilities";
import { projects } from "@/content/projects";
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

const whyRadiusItems = [
  {
    number: "01",
    title: "Speed",
    body: "We move quickly on opportunities others cannot execute, using internal decision-making, market conviction, and capital readiness to compress timelines.",
  },
  {
    number: "02",
    title: "Structure",
    body: "Options, phased takedowns, land banks, and joint ventures allow us to unlock value where conventional buyers cannot.",
  },
  {
    number: "03",
    title: "Access",
    body: "Longstanding relationships with national developers and institutional partners create deal flow that rarely reaches the open market.",
  },
  {
    number: "04",
    title: "Selectivity",
    body: "We pursue high-conviction opportunities only. Our track record reflects disciplined underwriting, not transaction volume.",
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

const homepageProjectPresentation = {
  "the-shiloh": { theme: "fp-01" },
  "the-franklin": { theme: "fp-02", layout: "fp-left-middle" },
  "terraces-at-west-cary": { theme: "fp-04", layout: "fp-right-middle" },
  "pittard-sears": { theme: "fp-05", layout: "fp-square-a" },
  "cary-estates": { theme: "fp-06", layout: "fp-square-b" },
  "rdu-town-center": { theme: "fp-08", layout: "fp-wide-bottom" },
} as const;

const Index = () => {
  const homepageProjects = projects.map((project) => ({
    ...project,
    ...homepageProjectPresentation[project.slug as keyof typeof homepageProjectPresentation],
  }));
  const [primaryProject, ...secondaryProjects] = homepageProjects;

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

    // COUNT-UP
    const statDefs = [
      { id: "wwa-val-0", end: 1.1, decimals: 1, prefix: "", suffix: "B" },
      { id: "wwa-val-1", end: 300000, decimals: 0, prefix: "", suffix: "" },
      { id: "wwa-val-2", end: 2200, decimals: 0, prefix: "", suffix: "" },
      { id: "wwa-val-3", end: 2.2, decimals: 1, prefix: "", suffix: "X" },
    ];
    const formatStatValue = (value: number, decimals: number) =>
      value.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    const setFinal = () => statDefs.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) el.textContent = s.prefix + formatStatValue(s.end, s.decimals) + s.suffix;
    });
    let statsObs: IntersectionObserver | null = null;
    const statsEl = document.getElementById("wwa-stats");
    if (statsEl) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        setFinal();
      } else {
        statsObs = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting) {
            statsObs!.disconnect();
            const duration = 1400;
            const startTime = performance.now();
            const tick = (now: number) => {
              const progress = Math.min((now - startTime) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              statDefs.forEach(s => {
                const el = document.getElementById(s.id);
                if (!el) return;
                const val = s.end * eased;
                const displayValue = s.decimals > 0 ? Number(val.toFixed(s.decimals)) : Math.floor(val);
                el.textContent = s.prefix + formatStatValue(displayValue, s.decimals) + s.suffix;
              });
              if (progress < 1) requestAnimationFrame(tick);
              else setFinal();
            };
            requestAnimationFrame(tick);
          }
        }, { threshold: 0.35 });
        statsObs.observe(statsEl);
      }
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      obs.disconnect();
      statsObs?.disconnect();
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
      <section className="wwa" id="about">
        <div className="wwai">
          <div className="wwacopy">
            <div className="ey rv">THE RADIUS ADVANTAGE</div>
            <div className="wwah rv d1">Building Beyond Expectations</div>
            <div className="wwabody rv d2">
              <p>
                Our creative approach to real estate, supported by our diverse team of best-in-class
                professionals, has allowed us to successfully invest across several asset classes,
                including mixed-use, affordable housing, residential condos, commercial office space,
                and retail.
              </p>
              <p>
                We pride ourselves in working collaboratively across each of our business units in
                pursuit of our core pillars: adding value to our partners, perfecting our execution,
                and innovatively solving complex real estate challenges while positively impacting the
                communities we serve.
              </p>
            </div>
            <a href="#" className="bp rv d3">Learn More</a>
          </div>
          <div className="wwapanel rv d1">
            <LazyBackground className="wwaimg" image={whoWeAreBg} ariaHidden />
            <div className="wwaov"></div>
            <div className="wwastats" id="wwa-stats">
              <div className="wwastat">
                <div className="wwaval" id="wwa-val-0">1.1B</div>
                <div className="wwalbl">ACTIVE PIPELINE</div>
              </div>
              <div className="wwastat">
                <div className="wwaval" id="wwa-val-1">300,000</div>
                <div className="wwalbl">SQ FT DEVELOPED</div>
              </div>
              <div className="wwastat">
                <div className="wwaval" id="wwa-val-2">2,200</div>
                <div className="wwalbl">RESIDENTIAL UNITS</div>
              </div>
              <div className="wwastat">
                <div className="wwaval" id="wwa-val-3">2.2X</div>
                <div className="wwalbl">LAND VALUE CREATION</div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* FEATURED PROJECTS */}
      <section className="fps" id="featured-projects">
        <div className="fph">
          <div>
            <div className="ey rv">Active Pipeline</div>
            <div className="st rv d1">Landmark Projects</div>
          </div>
          <p className="sd rv d2">Current projects moving through entitlement, strategic development structuring, and retail execution across high-growth markets.</p>
        </div>
        <div className="fplayout">
          <Link
            to={`/projects/${primaryProject.slug}`}
            className={`fpcard fphero rv ${primaryProject.theme}${primaryProject.image ? " fp-has-image" : ""}`}
          >
              <div className="fpmedia" aria-hidden="true">
                {primaryProject.image ? (
                  <LazyBackground
                    className="fpimage"
                    image={primaryProject.image}
                    style={{ backgroundPosition: primaryProject.imagePosition }}
                    ariaHidden
                  />
                ) : null}
                <div className="fpglow"></div>
                <div className="fpgridline"></div>
            </div>
            <div className="fpcontent">
              <div className={`fplabel${primaryProject.statusTone ? ` ${primaryProject.statusTone}` : ""}`}>{primaryProject.status}</div>
              <div className="fpname">{primaryProject.name}</div>
              {primaryProject.highlightTags ? (
                <div className="fptags">
                  {primaryProject.highlightTags.map((highlight) => (
                    <div key={highlight.text} className={`fptag ${highlight.tone}`}>
                      {highlight.text}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="fpdesc">{primaryProject.shortDescription}</p>
              )}
            </div>
          </Link>
          <div className="fpstack">
            {secondaryProjects.map((project, index) => (
              <Link
                key={project.name}
                to={`/projects/${project.slug}`}
                className={`fpcard fpside rv d${Math.min(index + 1, 5)} ${project.theme} ${project.layout}${project.image ? " fp-has-image" : ""}`}
              >
                <div className="fpmedia" aria-hidden="true">
                  {project.image ? (
                    <LazyBackground
                      className="fpimage"
                      image={project.image}
                      style={{ backgroundPosition: project.imagePosition }}
                      ariaHidden
                    />
                  ) : null}
                  <div className="fpglow"></div>
                  <div className="fpgridline"></div>
                </div>
                <div className="fpcontent">
                  <div className={`fplabel${project.statusTone ? ` ${project.statusTone}` : ""}`}>{project.status}</div>
                  <div className="fpname">{project.name}</div>
                  {project.highlightTags ? (
                    <div className="fptags">
                      {project.highlightTags.map((highlight) => (
                        <div key={highlight.text} className={`fptag ${highlight.tone}`}>
                          {highlight.text}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="fpdesc">{project.shortDescription}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="fpcta rv d3">
          <Link to="/projects" className="bp">View All Projects</Link>
        </div>
      </section>

      {/* RECENTLY CLOSED */}
      <section className="closed" id="recently-closed">
        <div className="clh">
          <div>
            <div className="ey rv"> Recently Closed</div>
            <div className="st rv d1">Our Track Record</div>
          </div>
          <p className="sd rv d2">A representative outcome illustrating Radius&apos;s land strategy, entitlement execution, and realized value creation.</p>
        </div>
        <div className="clpanel rv">
          <div className="clmedia rv d1">
            <LazyBackground className="clvisual" image={todBg} ariaHidden>
              <div className="clvoverlay">
                <div className="clvlabel closed">Closed</div>
                <div className="clvtitle">TOD - Phase One</div>
                <div className="clvloc">Research Triangle Park, NC</div>
              </div>
            </LazyBackground>
          </div>
          <div className="clcontent">
            <div className="clstatus">Transaction Spotlight</div>
            <h3 className="cltitle">Fully-Entitled TOD land project delivered to a national multifamily developer.</h3>
            <p className="clsummary">Radius executed the land assembly, acquisition, and rezoning strategy for TOD Phase 1, converting the site into a market-ready opportunity for institutional-scale residential delivery.</p>

            <div className="clrows">
              <div className="clrow">
                <div className="clrowlabel">Project Scope</div>
                <div className="clrowvalue">350 Class-A Multifamily Units</div>
              </div>
              <div className="clrow">
                <div className="clrowlabel">Our Role</div>
                <div className="clrowvalue">Land Assembly, Acquisition, Rezoning</div>
              </div>
              <div className="clrow">
                <div className="clrowlabel">Strategy</div>
                <div className="clrowvalue">First phase in massive TOD (Transit Oriented Development) expansion</div>
              </div>
              <div className="clrow">
                <div className="clrowlabel">Buyer</div>
                <div className="clbuyer">
                  <span>Wood Partners</span>
                  <img src={woodPartnersLogo} alt="Wood Partners" />
                </div>
              </div>
            </div>

            <div className="cloutcome">
              <div>
                <div className="cloutlabel">Outcome</div>
                <div className="cloutmeta">Value Creation in 3 Years</div>
              </div>
              <div className="cloutvalue">2.1x Return</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY RADIUS */}
      <section className="wyr" id="retail">
        <div className="wyri">
          <div className="wyrleft">
            <div className="wyrhead">
              <div className="ey rv">Why Radius</div>
              <div className="st rv d1">Built for Speed, Structure, and Scale</div>
              <p className="wyrintro rv d2">Principal-led execution, creative structuring, and longstanding institutional relationships allow Radius to move with unusual precision across the land cycle.</p>
            </div>
            <div className="wyrlist">
              {whyRadiusItems.map((item, index) => (
                <div key={item.number} className={`wyritem rv d${Math.min(index + 1, 4)}`}>
                  <div className="wyrnum">{item.number}</div>
                  <div className="wyrcopy">
                    <div className="wyrtitle">{item.title}</div>
                    <p className="wyrbody">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="wyrrail">
            <div className="wyrstat rv d2">
              <div className="wyrstatnum">2.2x</div>
              <div className="wyrstatlabel">Average Return Multiple</div>
            </div>
            <div className="wyrstat rv d3">
              <div className="wyrstatnum wyrstatnum-sm">18 mo.</div>
              <div className="wyrstatlabel">Average Hold Period</div>
            </div>
            <div className="wyrquote rv d4">
              <div className="wyrquotemark">"</div>
              <p className="wyrquotetext">The best land deals rarely make it to market. We are built to see them early and execute with precision.</p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR TEAM */}
      <section className="team" id="team">
        <div className="teami">
          <div className="teammedia rv d1">
            <div className="teamgrid">
              {teamMembers.map((member, index) => (
                <div key={member.name} className={`teamcard ${member.theme} rv d${Math.min(index + 1, 4)}`}>
                  <LazyBackground className="teamimage" image={member.image} ariaHidden />
                  <div className="teammeta">
                    <div className="teamname">{member.name}</div>
                    <div className="teamrole">{member.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="teamcopy">
            <div className="ey rv">Our Team</div>
            <div className="st rv d1">Experienced Operators, Structured for Execution</div>
            <p className="teambody rv d2">Radius is built around a senior team with deep experience across land acquisition, entitlement strategy, structured development, and capital execution. We combine institutional rigor with principal-led decisiveness, giving our partners a team that can move quickly without compromising discipline.</p>
            <a href="#about" className="bp rv d3">About Us</a>
          </div>
        </div>
      </section>

      <section className="investorcta">
        <div className="investorctai">
          <LazyBackground className="investorcta-bg rv d1" image={investorCtaBg} ariaHidden />
          <div className="investorcard rv d2">
            <div className="ey rv">Investor Access</div>
            <div className="st rv d3">Interested in Learning More?</div>
            <p className="investorbody rv d4">
              We&apos;re always looking to partner with accredited investors who share our vision for Central Texas. Join us to access exclusive opportunities, local expertise, and a team committed to helping you achieve your goals.
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
