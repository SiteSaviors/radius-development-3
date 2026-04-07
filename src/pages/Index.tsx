import { useEffect, useState } from "react";
import heroBg from "@/assets/Radius-Back.jpeg";
import heroVideo from "@/assets/RADIUS-VIDEO.mp4";
import jointVenturesBg from "@/assets/joint-ventures.jpg";
import landEntitlementBg from "@/assets/land-entitlement.jpg";
import luxRetailBg from "@/assets/lux-retail.jpg";
import altaAriaBg from "@/assets/alta-aria.jpg";
import caryEstatesBg from "@/assets/CARY-E.jpg";
import franklinBg from "@/assets/Franklin.jpg";
import shilohBg from "@/assets/Shiloh.jpg";
import terracesBg from "@/assets/TERRACES.jpg";
import trammelCrowLogo from "@/assets/Trammel-Crow.webp";
import tollBrothersLogo from "@/assets/Toll-Brothers.webp";
import triPointeLogo from "@/assets/Tri-Pointe.webp";
import mcAdamsLogo from "@/assets/McAdams.webp";
import whoWeAreBg from "@/assets/3.jpg";
import todBg from "@/assets/TOD.jpg";
import woodPartnersLogo from "@/assets/Wood-Partners.webp";

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

const platformSegments = [
  { label: "Multi-Family", image: shilohBg, position: "center center" },
  { label: "Industrial", image: jointVenturesBg, position: "center center" },
  { label: "Senior Living", image: franklinBg, position: "center center" },
  { label: "Retail", image: luxRetailBg, position: "center center" },
  { label: "Office", image: altaAriaBg, position: "center center" },
  { label: "Mixed-Use", image: landEntitlementBg, position: "center center" },
] as const;

const featuredProjects = [
  {
    name: "The Shiloh",
    status: "Under Development",
    description: "Mixed-use land position advancing through entitlement and early planning.",
    href: "#",
    theme: "fp-01",
    image: shilohBg,
    imagePosition: "center 42%",
    highlights: [
      { text: "Mixed-Use", tone: "mint" },
      { text: "2000+ Residential Units", tone: "blue" },
      { text: "225,000 Sq Ft Retail Space", tone: "gold" },
    ],
  },
  {
    name: "The Franklin",
    status: "Under Development",
    description: "Residential and retail pipeline asset in a high-growth Sun Belt corridor.",
    href: "#",
    theme: "fp-02",
    image: franklinBg,
    imagePosition: "center 40%",
    layout: "fp-wide-top",
    highlights: [
      { text: "Residential", tone: "blue" },
      { text: "High-Growth Corridor", tone: "slate" },
      { text: "Retail Integration", tone: "gold" },
    ],
  },
  {
    name: "Alta Aria",
    status: "Under Development",
    description: "Retail-led development site being structured for phased execution.",
    href: "#",
    theme: "fp-03",
    image: altaAriaBg,
    imagePosition: "center 42%",
    layout: "fp-small-a",
    highlights: [
      { text: "Residential", tone: "blue" },
      { text: "Phase I", tone: "slate" },
    ],
  },
  {
    name: "Terraces At West Cary",
    status: "Under Development",
    description: "Strategic land assembly moving toward partner-ready delivery.",
    href: "#",
    theme: "fp-04",
    image: terracesBg,
    imagePosition: "center 34%",
    layout: "fp-small-b",
    highlights: [
      { text: "Residential", tone: "blue" },
      { text: "Land Assembly", tone: "mint" },
    ],
  },
  {
    name: "RDU Town Center",
    status: "Open Project",
    statusTone: "open-project",
    description: "Town center land strategy progressing through phased entitlement and anchor planning.",
    href: "#",
    theme: "fp-05",
    layout: "fp-tall-a",
    highlights: [
      { text: "Town Center", tone: "gold" },
      { text: "Entitlement", tone: "mint" },
    ],
  },
  {
    name: "Cary Estates",
    status: "Open Project",
    statusTone: "open-project",
    description: "Retail-adjacent mixed-use site moving through partner structuring.",
    href: "#",
    theme: "fp-06",
    image: caryEstatesBg,
    imagePosition: "center 42%",
    layout: "fp-tall-b",
    highlights: [
      { text: "Residential", tone: "blue" },
      { text: "Land Position", tone: "mint" },
    ],
  },
  {
    name: "Cary Land",
    status: "Open Project",
    statusTone: "open-project",
    description: "Pipeline multifamily and neighborhood retail concept in early execution planning.",
    href: "#",
    theme: "fp-07",
    layout: "fp-under-left",
    highlights: [
      { text: "Multifamily", tone: "blue" },
      { text: "Neighborhood Retail", tone: "gold" },
    ],
  },
  {
    name: "Pittard Sears",
    status: "Open Project",
    statusTone: "open-project",
    description: "Institutional-quality development position advancing toward market-facing delivery.",
    href: "#",
    theme: "fp-08",
    layout: "fp-under-right",
    highlights: [
      { text: "Institutional", tone: "slate" },
      { text: "Land Strategy", tone: "mint" },
    ],
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
    name: "James R. Harmon",
    role: "Founder & Managing Principal",
    theme: "team-01",
  },
  {
    name: "Avery Collins",
    role: "Partner, Development",
    theme: "team-02",
  },
  {
    name: "Lauren Mercer",
    role: "Partner, Investments",
    theme: "team-03",
  },
  {
    name: "Daniel Rhodes",
    role: "Director, Capital Markets",
    theme: "team-04",
  },
] as const;

const Index = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [primaryProject, ...secondaryProjects] = featuredProjects;

  useEffect(() => {
    // CURSOR
    const cur = document.getElementById("cur")!;
    const cdot = document.getElementById("cdot")!;
    let mx = -200, my = -200, cx = -200, cy = -200;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      cdot.style.left = mx + "px"; cdot.style.top = my + "px";
    };
    document.addEventListener("mousemove", onMove);
    let raf: number;
    const anim = () => {
      cx += (mx - cx) * 0.11; cy += (my - cy) * 0.11;
      cur.style.left = cx + "px"; cur.style.top = cy + "px";
      raf = requestAnimationFrame(anim);
    };
    raf = requestAnimationFrame(anim);

    const hoverEls = document.querySelectorAll(".bp,.bg,.bc,.fpcard,.teamcard,.li,.nbtn,.flinks a,.nlinks a,.rts");
    const enter = () => cur.classList.add("x");
    const leave = () => cur.classList.remove("x");
    hoverEls.forEach(el => { el.addEventListener("mouseenter", enter); el.addEventListener("mouseleave", leave); });

    // SCROLL
    const sthumb = document.getElementById("sthumb")!;
    const hbg = document.getElementById("hbg")!;
    const hwm = document.getElementById("hwm")!;
    const heroSection = document.getElementById("hero");
    const heroVideoEl = document.getElementById("hvideo") as HTMLVideoElement | null;
    const navEl = document.querySelector("nav")!;
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      sthumb.style.height = Math.min(pct, 100) + "%";
      hbg.style.transform = `translateY(${window.scrollY * 0.22}px)`;
      hwm.style.transform = `translateY(calc(-50% + ${window.scrollY * 0.1}px))`;
      if (window.scrollY > 40) { navEl.classList.add("scrolled"); } else { navEl.classList.remove("scrolled"); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

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
      { id: "wwa-val-0", end: 2,   decimals: 0, prefix: "",  suffix: "M+" },
      { id: "wwa-val-1", end: 300, decimals: 0, prefix: "$", suffix: "M"  },
      { id: "wwa-val-2", end: 2.2, decimals: 1, prefix: "",  suffix: "X"  },
      { id: "wwa-val-3", end: 30,  decimals: 0, prefix: "",  suffix: "+"  },
    ];
    const setFinal = () => statDefs.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) el.textContent = s.prefix + (s.decimals > 0 ? s.end.toFixed(s.decimals) : String(s.end)) + s.suffix;
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
                el.textContent = s.prefix + (s.decimals > 0 ? val.toFixed(s.decimals) : String(Math.floor(val))) + s.suffix;
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
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      hoverEls.forEach(el => { el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); });
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

      {/* NAV */}
      <nav>
        <div className="nlogo">radius</div>
        <ul className="nlinks">
          <li><a href="#platform">What We Do</a></li>
          <li><a href="#featured-projects">Current Projects</a></li>
          <li><a href="#retail">Segments</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button className="nbtn">Investor Portal</button>
        <button
          type="button"
          className={`mnavt${mobileNavOpen ? " open" : ""}`}
          aria-expanded={mobileNavOpen}
          aria-label="Toggle navigation"
          onClick={() => setMobileNavOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`mnav${mobileNavOpen ? " open" : ""}`}>
          <a href="#platform" onClick={() => setMobileNavOpen(false)}>What We Do</a>
          <a href="#featured-projects" onClick={() => setMobileNavOpen(false)}>Current Projects</a>
          <a href="#retail" onClick={() => setMobileNavOpen(false)}>Segments</a>
          <a href="#about" onClick={() => setMobileNavOpen(false)}>About Us</a>
          <a href="#contact" onClick={() => setMobileNavOpen(false)}>Contact</a>
        </div>
      </nav>

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
          <div className="glass rv text-left">
            <div className="ey">Land &nbsp;·&nbsp; Development &nbsp;·&nbsp; Retail</div>
            <h1>We Find High Value Development Opportunities Before the Market Sees Them</h1>
            <p className="hsp">Land acquisition, development partnerships, and scalable retail concepts across high-growth markets.</p>
            <div className="hbtns">
              <a href="#" className="bp">View Projects</a>
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
            <p className="wwabody rv d2">Our creative approach to real estate, supported by our diverse team of best-in-class professionals with specialized expertise, has allowed us to successfully invest across several asset classes, including mixed-use, affordable housing, residential condos, commercial office space, and retail. We pride ourselves in working collaboratively across each of our business units in pursuit of our core pillars: adding value to our partners, perfecting our execution, and innovatively solving complex real estate challenges while positively impacting the communities we serve.</p>
            <a href="#" className="bp rv d3">Learn More</a>
          </div>
          <div className="wwapanel rv d1">
            <div className="wwaimg" style={{ backgroundImage: `url(${whoWeAreBg})` }}></div>
            <div className="wwaov"></div>
            <div className="wwastats" id="wwa-stats">
              <div className="wwastat">
                <div className="wwaval" id="wwa-val-0">2M+</div>
                <div className="wwalbl">SQ FT DEVELOPED</div>
              </div>
              <div className="wwastat">
                <div className="wwaval" id="wwa-val-1">$300M</div>
                <div className="wwalbl">IN CAPITALIZED ASSETS</div>
              </div>
              <div className="wwastat">
                <div className="wwaval" id="wwa-val-2">2.2X</div>
                <div className="wwalbl">AVG RETURN MULTIPLE</div>
              </div>
              <div className="wwastat">
                <div className="wwaval" id="wwa-val-3">30+</div>
                <div className="wwalbl">YEARS COMBINED EXPERIENCE</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM */}
      <section className="plat" id="platform">
        <div className="sh">
          <div>
            <div className="ey rv">OUR CAPABILITIES</div>
            <div className="st rv d1">A Smarter Path to<br/>Real Estate Value Creation</div>
          </div>
          <p className="sd rv d2">At Radius, we operate across the full lifecycle of real estate value creation—from identifying land before the market sees it, to partnering on institutional-scale development, to building iconic retail destinations.</p>
        </div>
        <div className="bento">
          <div className="bc rv">
            <div className="bcmedia">
              <div className="bcbg land-photo" style={{backgroundImage:`url(${landEntitlementBg})`}}></div>
              <div className="bctop">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x=".5" y=".5" width="25" height="25" stroke="rgba(255,255,255,.22)" strokeWidth=".75"/><path d="M4 19L13 7L22 19" stroke="rgba(255,255,255,.5)" strokeWidth=".75" fill="none"/><line x1="4" y1="19" x2="22" y2="19" stroke="rgba(255,255,255,.5)" strokeWidth=".75"/></svg>
              </div>
            </div>
            <div className="bcc">
              <div className="bcn">01 / Land</div>
              <div className="bct">Land Entitlement</div>
              <div className="bcd">We identify off-market opportunities across high growth corridors while leveraging deep local relationships and proprietary data to secure sites before they reach the broader market.</div>
              <a href="#" className="bcta">Let&apos;s Talk Land</a>
            </div>
          </div>
          <div className="bc rv d1">
            <div className="bcmedia">
              <div className="bcbg development-photo" style={{backgroundImage:`url(${jointVenturesBg})`}}></div>
              <div className="bctop">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x=".5" y=".5" width="25" height="25" stroke="rgba(255,255,255,.22)" strokeWidth=".75"/><rect x="3" y="10" width="7" height="13" stroke="rgba(255,255,255,.5)" strokeWidth=".75" fill="none"/><rect x="14" y="6" width="9" height="17" stroke="rgba(255,255,255,.5)" strokeWidth=".75" fill="none"/><line x1="10" y1="23" x2="14" y2="23" stroke="rgba(255,255,255,.5)" strokeWidth=".75"/></svg>
              </div>
            </div>
            <div className="bcc">
              <div className="bcn">02 / Development</div>
              <div className="bct">Development Partnerships</div>
              <div className="bcd">From residential communities to mixed-use retail developments, we partner with best-in-class institutional developers with a focus on maximizing returns while building lasting community value.</div>
              <a href="#" className="bcta">Let&apos;s Talk Development</a>
            </div>
          </div>
          <div className="bc rv d2">
            <div className="bcmedia">
              <div className="bcbg retail-photo" style={{backgroundImage:`url(${luxRetailBg})`}}></div>
              <div className="bctop">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x=".5" y=".5" width="25" height="25" stroke="rgba(255,255,255,.22)" strokeWidth=".75"/><rect x="2" y="13" width="22" height="10" stroke="rgba(255,255,255,.5)" strokeWidth=".75" fill="none"/><line x1="2" y1="13" x2="2" y2="9" stroke="rgba(255,255,255,.5)" strokeWidth=".75"/><line x1="24" y1="13" x2="24" y2="9" stroke="rgba(255,255,255,.5)" strokeWidth=".75"/><path d="M2 9Q13 3 24 9" stroke="rgba(255,255,255,.5)" strokeWidth=".75" fill="none"/><line x1="10" y1="13" x2="10" y2="23" stroke="rgba(255,255,255,.3)" strokeWidth=".5"/><line x1="16" y1="13" x2="16" y2="23" stroke="rgba(255,255,255,.3)" strokeWidth=".5"/></svg>
              </div>
            </div>
            <div className="bcc">
              <div className="bcn">03 / Retail</div>
              <div className="bct">Retail Development</div>
              <div className="bcd">We develop high-end, experience-driven retail centers where demand is underserved. Rather than building commodity retail, we develop environments that blend retail, dining, and community into a cohesive destination.</div>
              <a href="#" className="bcta">Let&apos;s Talk Retail</a>
            </div>
          </div>
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
          <a
            href={primaryProject.href}
            className={`fpcard fphero rv ${primaryProject.theme}${primaryProject.image ? " fp-has-image" : ""}`}
          >
            <div className="fpmedia" aria-hidden="true">
              {primaryProject.image ? (
                <div
                  className="fpimage"
                  style={{
                    backgroundImage: `url(${primaryProject.image})`,
                    backgroundPosition: primaryProject.imagePosition,
                  }}
                ></div>
              ) : null}
              <div className="fpglow"></div>
              <div className="fpgridline"></div>
            </div>
            <div className="fpcontent">
              <div className={`fplabel${primaryProject.statusTone ? ` ${primaryProject.statusTone}` : ""}`}>{primaryProject.status}</div>
              <div className="fpname">{primaryProject.name}</div>
              {primaryProject.highlights ? (
                <div className="fptags">
                  {primaryProject.highlights.map((highlight) => (
                    <div key={highlight.text} className={`fptag ${highlight.tone}`}>
                      {highlight.text}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="fpdesc">{primaryProject.description}</p>
              )}
            </div>
          </a>
          <div className="fpstack">
            {secondaryProjects.map((project, index) => (
              <a
                key={project.name}
                href={project.href}
                className={`fpcard fpside rv d${Math.min(index + 1, 5)} ${project.theme} ${project.layout}${project.image ? " fp-has-image" : ""}`}
              >
                <div className="fpmedia" aria-hidden="true">
                  {project.image ? (
                    <div
                      className="fpimage"
                      style={{
                        backgroundImage: `url(${project.image})`,
                        backgroundPosition: project.imagePosition,
                      }}
                    ></div>
                  ) : null}
                  <div className="fpglow"></div>
                  <div className="fpgridline"></div>
                </div>
                <div className="fpcontent">
                  <div className={`fplabel${project.statusTone ? ` ${project.statusTone}` : ""}`}>{project.status}</div>
                  <div className="fpname">{project.name}</div>
                  {project.highlights ? (
                    <div className="fptags">
                      {project.highlights.map((highlight) => (
                        <div key={highlight.text} className={`fptag ${highlight.tone}`}>
                          {highlight.text}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="fpdesc">{project.description}</p>
                  )}
                </div>
              </a>
            ))}
          </div>
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
          <div className="clvisual" aria-hidden="true" style={{ backgroundImage: `url(${todBg})` }}>
            <div className="clvoverlay">
              <div className="clvlabel closed">Closed</div>
              <div className="clvtitle">TOD - Phase One</div>
              <div className="clvloc">Research Triangle Park, NC</div>
            </div>
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
                  <div className="teamimage" aria-hidden="true"></div>
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

      {/* FOOTER */}
      <footer id="contact">
        <div className="fbrand">
          <div className="flogo">radius</div>
          <p className="ftag">Principal-led land investment and development platform operating across the Sun Belt and Mountain West.</p>
          <p className="fmeta">Land strategy, development execution, and institutional partnerships across high-growth markets.</p>
        </div>
        <div className="fcol">
          <div className="fct">Platform</div>
          <ul className="flinks">
            <li><a href="#platform">What We Do</a></li>
            <li><a href="#featured-projects">Current Projects</a></li>
            <li><a href="#retail">Why Radius</a></li>
            <li><a href="#team">Our Team</a></li>
          </ul>
        </div>
        <div className="fcol">
          <div className="fct">Company</div>
          <ul className="flinks">
            <li><a href="#about">Who We Are</a></li>
            <li><a href="#team">Leadership</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#">Market Coverage</a></li>
          </ul>
        </div>
        <div className="fcol">
          <div className="fct">Access</div>
          <ul className="flinks">
            <li><a href="#">Investor Portal</a></li>
            <li><a href="#">Request Access</a></li>
            <li><a href="#featured-projects">Active Pipeline</a></li>
            <li><a href="#contact">General Inquiries</a></li>
          </ul>
        </div>
      </footer>
      <div className="fbot">
        <span className="fcp">© 2025 Radius Development Group. All rights reserved.</span>
        <span className="fcp">Phoenix, AZ &nbsp;·&nbsp; Denver, CO &nbsp;·&nbsp; Las Vegas, NV &nbsp;·&nbsp; Salt Lake City, UT</span>
      </div>
    </>
  );
};

export default Index;
