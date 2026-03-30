import { useEffect } from "react";
import heroBg from "@/assets/Radius-Back.jpeg";
import landEntitlementBg from "@/assets/land-entitlement.jpg";
import luxRetailBg from "@/assets/lux-retail.jpg";

const Index = () => {
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

    const hoverEls = document.querySelectorAll(".bp,.bg,.txlnk,.txrow,.bc,.li,.nbtn,.flinks a,.nlinks a,.rts");
    const enter = () => cur.classList.add("x");
    const leave = () => cur.classList.remove("x");
    hoverEls.forEach(el => { el.addEventListener("mouseenter", enter); el.addEventListener("mouseleave", leave); });

    // SCROLL
    const sthumb = document.getElementById("sthumb")!;
    const hbg = document.getElementById("hbg")!;
    const hwm = document.getElementById("hwm")!;
    const navEl = document.querySelector("nav")!;
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      sthumb.style.height = Math.min(pct, 100) + "%";
      hbg.style.transform = `translateY(${window.scrollY * 0.22}px)`;
      hwm.style.transform = `translateY(calc(-50% + ${window.scrollY * 0.1}px))`;
      if (window.scrollY > 40) { navEl.classList.add("scrolled"); } else { navEl.classList.remove("scrolled"); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // REVEAL
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("on"); }), { threshold: 0.07, rootMargin: "0px 0px -30px 0px" });
    document.querySelectorAll(".rv").forEach(el => obs.observe(el));

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      hoverEls.forEach(el => { el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); });
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
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
          <li><a href="#">What We Do</a></li>
          <li><a href="#">Current Projects</a></li>
          <li><a href="#">Segments</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        <button className="nbtn">Investor Portal</button>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hbg" id="hbg" style={{backgroundImage:`url(${heroBg})`}}></div>
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
          <div className="li"><span className="lt">Trammel Crow</span></div>
          <div className="li"><span className="lt">Wood Brothers</span></div>
          <div className="li"><span className="lt">Tri-Pointe Homes</span></div>
          <div className="li"><span className="lt">McAdams</span></div>
          <div className="li"><span className="lt">Toll Brothers</span></div>
        </div>
      </div>

      {/* PLATFORM */}
      <section className="plat" id="platform">
        <div className="sh">
          <div>
            <div className="ey rv">The Three Pillars</div>
            <div className="st rv d1">A Vertically Integrated<br/>Land Intelligence Platform</div>
          </div>
          <p className="sd rv d2">From raw land entitlement to retail site delivery, Radius operates across the full lifecycle of residential and commercial development — providing institutional-grade execution at every stage.</p>
        </div>
        <div className="bento">
          <div className="bc rv">
            <div className="bcbg land-photo" style={{backgroundImage:`url(${landEntitlementBg})`}}></div>
            <div className="bctop">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x=".5" y=".5" width="25" height="25" stroke="rgba(255,255,255,.22)" strokeWidth=".75"/><path d="M4 19L13 7L22 19" stroke="rgba(255,255,255,.5)" strokeWidth=".75" fill="none"/><line x1="4" y1="19" x2="22" y2="19" stroke="rgba(255,255,255,.5)" strokeWidth=".75"/></svg>
            </div>
            <div className="bcc">
              <div className="bcn">01 / Land</div>
              <div className="bct">Land Entitlement</div>
              <div className="bcd">Site identification, due diligence, and structured acquisition of raw and entitled land across high-growth Sun Belt metros.</div>
              <div className="bcs"><span className="bcsv">8,400+</span><span className="bcsl">Acres Controlled</span></div>
            </div>
          </div>
          <div className="bc rv d1">
            <div className="bcbg dev"></div>
            <div className="bctop">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x=".5" y=".5" width="25" height="25" stroke="rgba(255,255,255,.22)" strokeWidth=".75"/><rect x="3" y="10" width="7" height="13" stroke="rgba(255,255,255,.5)" strokeWidth=".75" fill="none"/><rect x="14" y="6" width="9" height="17" stroke="rgba(255,255,255,.5)" strokeWidth=".75" fill="none"/><line x1="10" y1="23" x2="14" y2="23" stroke="rgba(255,255,255,.5)" strokeWidth=".75"/></svg>
            </div>
            <div className="bcc">
              <div className="bcn">02 / Development</div>
              <div className="bct">Joint Ventures</div>
              <div className="bcd">Master-planned community execution and residential lot delivery — structured for institutional builder partners.</div>
              <div className="bcs"><span className="bcsv">$287M</span><span className="bcsl">Avg. Deal Size</span></div>
            </div>
          </div>
          <div className="bc rv d2">
            <div className="bcbg retail-photo" style={{backgroundImage:`url(${luxRetailBg})`}}></div>
            <div className="bctop">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x=".5" y=".5" width="25" height="25" stroke="rgba(255,255,255,.22)" strokeWidth=".75"/><rect x="2" y="13" width="22" height="10" stroke="rgba(255,255,255,.5)" strokeWidth=".75" fill="none"/><line x1="2" y1="13" x2="2" y2="9" stroke="rgba(255,255,255,.5)" strokeWidth=".75"/><line x1="24" y1="13" x2="24" y2="9" stroke="rgba(255,255,255,.5)" strokeWidth=".75"/><path d="M2 9Q13 3 24 9" stroke="rgba(255,255,255,.5)" strokeWidth=".75" fill="none"/><line x1="10" y1="13" x2="10" y2="23" stroke="rgba(255,255,255,.3)" strokeWidth=".5"/><line x1="16" y1="13" x2="16" y2="23" stroke="rgba(255,255,255,.3)" strokeWidth=".5"/></svg>
            </div>
            <div className="bcc">
              <div className="bcn">03 / Retail</div>
              <div className="bct">Retail Development</div>
              <div className="bcd">Outparcel strategy, retail site delivery, and commercial entitlement — anchoring residential communities at scale.</div>
              <div className="bcs"><span className="bcsv">47</span><span className="bcsl">Active Retail Sites</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSACTIONS */}
      <section className="txs" id="transactions">
        <div className="txh">
          <div>
            <div className="ey rv">Deal Sheet</div>
            <div className="st rv d1">Selected Transactions</div>
          </div>
          <a href="#" className="txlnk rv d2">Full Portfolio &nbsp;→</a>
        </div>
        <div className="txcols rv">
          <div className="txcl"></div>
          <div className="txcl">Project</div>
          <div className="txcl">Transaction Value</div>
          <div className="txcl">Acreage</div>
          <div className="txcl">Type</div>
          <div className="txcl">Status</div>
        </div>

        {/* TX 01 */}
        <div className="txrow rv">
          <div className="txth"><svg viewBox="0 0 76 50" fill="none"><rect width="76" height="50" fill="#0a0a0a"/><line x1="0" y1="12" x2="76" y2="12" stroke="#252525" strokeWidth=".5"/><line x1="0" y1="25" x2="76" y2="25" stroke="#252525" strokeWidth=".5"/><line x1="0" y1="37" x2="76" y2="37" stroke="#252525" strokeWidth=".5"/><line x1="19" y1="0" x2="19" y2="50" stroke="#252525" strokeWidth=".5"/><line x1="38" y1="0" x2="38" y2="50" stroke="#252525" strokeWidth=".5"/><line x1="57" y1="0" x2="57" y2="50" stroke="#252525" strokeWidth=".5"/><rect x="3" y="3" width="29" height="19" fill="none" stroke="rgba(255,255,255,.52)" strokeWidth=".75"/><rect x="41" y="3" width="30" height="9" fill="none" stroke="rgba(255,255,255,.36)" strokeWidth=".5"/><rect x="41" y="14" width="13" height="9" fill="none" stroke="rgba(255,255,255,.3)" strokeWidth=".5"/><rect x="56" y="14" width="14" height="9" fill="none" stroke="rgba(255,255,255,.3)" strokeWidth=".5"/><rect x="3" y="28" width="9" height="18" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth=".5"/><rect x="14" y="28" width="9" height="18" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth=".5"/><rect x="25" y="28" width="9" height="18" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth=".5"/><rect x="41" y="28" width="29" height="18" fill="none" stroke="rgba(255,255,255,.52)" strokeWidth=".75"/></svg></div>
          <div><div className="txnm">Canyon Ridge</div><div className="txlc">Phoenix, AZ</div></div>
          <div className="txv">$124.5M</div>
          <div className="txac">847 acres</div>
          <div className="txtp">Residential Land</div>
          <div><span className="badge bex">Executed</span></div>
        </div>

        {/* TX 02 */}
        <div className="txrow rv d1">
          <div className="txth"><svg viewBox="0 0 76 50" fill="none"><rect width="76" height="50" fill="#0a0a0a"/><circle cx="38" cy="25" r="18" stroke="#222" strokeWidth=".5"/><circle cx="38" cy="25" r="9" stroke="#2a2a2a" strokeWidth=".5"/><line x1="20" y1="25" x2="56" y2="25" stroke="#252525" strokeWidth=".5"/><line x1="38" y1="7" x2="38" y2="43" stroke="#252525" strokeWidth=".5"/><rect x="7" y="7" width="20" height="14" fill="none" stroke="rgba(255,255,255,.48)" strokeWidth=".75"/><rect x="49" y="7" width="20" height="14" fill="none" stroke="rgba(255,255,255,.48)" strokeWidth=".75"/><rect x="7" y="29" width="20" height="14" fill="none" stroke="rgba(255,255,255,.48)" strokeWidth=".75"/><rect x="49" y="29" width="20" height="14" fill="none" stroke="rgba(255,255,255,.48)" strokeWidth=".75"/><circle cx="38" cy="25" r="3" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth=".75"/></svg></div>
          <div><div className="txnm">Meridian Commons</div><div className="txlc">Denver, CO</div></div>
          <div className="txv">$287.0M</div>
          <div className="txac">1,240 acres</div>
          <div className="txtp">Master-Planned</div>
          <div><span className="badge bex">Executed</span></div>
        </div>

        {/* TX 03 */}
        <div className="txrow rv d2">
          <div className="txth"><svg viewBox="0 0 76 50" fill="none"><rect width="76" height="50" fill="#0a0a0a"/><rect x="3" y="3" width="70" height="44" fill="none" stroke="#202020" strokeWidth=".5"/><line x1="3" y1="25" x2="73" y2="25" stroke="#2a2a2a" strokeWidth=".5"/><rect x="7" y="6" width="60" height="14" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth=".75"/><rect x="7" y="28" width="13" height="14" fill="none" stroke="rgba(255,255,255,.32)" strokeWidth=".5"/><rect x="23" y="28" width="13" height="14" fill="none" stroke="rgba(255,255,255,.32)" strokeWidth=".5"/><rect x="39" y="28" width="13" height="14" fill="none" stroke="rgba(255,255,255,.32)" strokeWidth=".5"/><rect x="55" y="28" width="12" height="14" fill="none" stroke="rgba(255,255,255,.32)" strokeWidth=".5"/><line x1="3" y1="21" x2="73" y2="21" stroke="#1a1a1a" strokeWidth=".4" strokeDasharray="3,3"/></svg></div>
          <div><div className="txnm">Silverbell Ranch</div><div className="txlc">Tucson, AZ</div></div>
          <div className="txv">$156.2M</div>
          <div className="txac">2,100 acres</div>
          <div className="txtp">Mixed-Use Entitlement</div>
          <div><span className="badge bac">Active</span></div>
        </div>

        {/* TX 04 */}
        <div className="txrow rv d3">
          <div className="txth"><svg viewBox="0 0 76 50" fill="none"><rect width="76" height="50" fill="#0a0a0a"/><line x1="38" y1="0" x2="38" y2="50" stroke="#222" strokeWidth=".5"/><line x1="0" y1="25" x2="76" y2="25" stroke="#222" strokeWidth=".5"/><polygon points="3,3 33,3 33,47 3,47" fill="none" stroke="rgba(255,255,255,.52)" strokeWidth=".75"/><polygon points="41,3 73,3 73,22 41,22" fill="none" stroke="rgba(255,255,255,.42)" strokeWidth=".5"/><polygon points="41,28 56,28 56,47 41,47" fill="none" stroke="rgba(255,255,255,.42)" strokeWidth=".5"/><polygon points="60,28 73,28 73,47 60,47" fill="none" stroke="rgba(255,255,255,.42)" strokeWidth=".5"/><line x1="3" y1="14" x2="33" y2="14" stroke="#252525" strokeWidth=".5"/><line x1="3" y1="35" x2="33" y2="35" stroke="#252525" strokeWidth=".5"/><line x1="18" y1="3" x2="18" y2="47" stroke="#252525" strokeWidth=".5"/></svg></div>
          <div><div className="txnm">Vista Del Sol</div><div className="txlc">Las Vegas, NV</div></div>
          <div className="txv">$98.2M</div>
          <div className="txac">680 acres</div>
          <div className="txtp">Residential Land</div>
          <div><span className="badge bex">Executed</span></div>
        </div>

        {/* TX 05 */}
        <div className="txrow rv d4">
          <div className="txth"><svg viewBox="0 0 76 50" fill="none"><rect width="76" height="50" fill="#0a0a0a"/><rect x="3" y="3" width="70" height="44" fill="none" stroke="#1e1e1e" strokeWidth=".5"/><rect x="9" y="8" width="20" height="12" fill="none" stroke="rgba(255,255,255,.52)" strokeWidth=".75"/><rect x="33" y="8" width="20" height="12" fill="none" stroke="rgba(255,255,255,.52)" strokeWidth=".75"/><rect x="57" y="8" width="12" height="12" fill="none" stroke="rgba(255,255,255,.36)" strokeWidth=".5"/><rect x="9" y="28" width="12" height="14" fill="none" stroke="rgba(255,255,255,.32)" strokeWidth=".5"/><rect x="25" y="28" width="12" height="14" fill="none" stroke="rgba(255,255,255,.32)" strokeWidth=".5"/><rect x="41" y="28" width="12" height="14" fill="none" stroke="rgba(255,255,255,.32)" strokeWidth=".5"/><rect x="57" y="28" width="12" height="14" fill="none" stroke="rgba(255,255,255,.32)" strokeWidth=".5"/><line x1="3" y1="24" x2="73" y2="24" stroke="#282828" strokeWidth=".5"/><circle cx="19" cy="14" r="2" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth=".5"/><circle cx="43" cy="14" r="2" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth=".5"/></svg></div>
          <div><div className="txnm">Summit Gate</div><div className="txlc">Salt Lake City, UT</div></div>
          <div className="txv">$341.0M</div>
          <div className="txac">1,560 acres</div>
          <div className="txtp">Master-Planned</div>
          <div><span className="badge bpp">Pipeline</span></div>
        </div>

        <div className="txtot rv">
          <div className="ttlbl">Total Portfolio Value</div>
          <div className="tval">$1.006B</div>
          <div></div><div></div><div></div>
        </div>
      </section>

      {/* RETAIL */}
      <section className="rtl" id="retail">
        <div className="rtlbg"></div>
        <div className="rtlgrid"></div>
        <div className="rtli">
          <div className="wfwrap rv">
            <svg viewBox="0 0 520 440" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs><pattern id="mg" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0L0 0 0 20" fill="none" stroke="rgba(255,255,255,.035)" strokeWidth=".5"/></pattern></defs>
              <rect width="520" height="440" fill="url(#mg)"/>
              <rect x="20" y="20" width="480" height="400" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth=".75" strokeDasharray="5,4"/>
              <rect x="20" y="188" width="480" height="22" fill="rgba(255,255,255,.03)"/>
              <line x1="20" y1="188" x2="500" y2="188" stroke="rgba(255,255,255,.22)" strokeWidth=".75"/>
              <line x1="20" y1="210" x2="500" y2="210" stroke="rgba(255,255,255,.22)" strokeWidth=".75"/>
              <line x1="20" y1="199" x2="500" y2="199" stroke="rgba(255,255,255,.09)" strokeWidth=".5" strokeDasharray="12,8"/>
              <rect x="248" y="20" width="16" height="400" fill="rgba(255,255,255,.025)"/>
              <line x1="248" y1="20" x2="248" y2="420" stroke="rgba(255,255,255,.18)" strokeWidth=".75"/>
              <line x1="264" y1="20" x2="264" y2="420" stroke="rgba(255,255,255,.18)" strokeWidth=".75"/>
              <rect x="30" y="30" width="208" height="148" fill="rgba(27,42,74,.14)" stroke="rgba(255,255,255,.35)" strokeWidth=".75"/>
              <rect x="40" y="40" width="188" height="128" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth=".4"/>
              <text x="134" y="107" fontFamily="monospace" fontSize="8" fill="rgba(255,255,255,.32)" textAnchor="middle" letterSpacing="2">ANCHOR TENANT</text>
              <text x="134" y="122" fontFamily="monospace" fontSize="7.5" fill="rgba(255,255,255,.2)" textAnchor="middle" letterSpacing="1">85,000 SF</text>
              <rect x="274" y="30" width="216" height="64" fill="rgba(27,42,74,.1)" stroke="rgba(255,255,255,.28)" strokeWidth=".75"/>
              <line x1="328" y1="30" x2="328" y2="94" stroke="rgba(255,255,255,.14)" strokeWidth=".5"/>
              <line x1="382" y1="30" x2="382" y2="94" stroke="rgba(255,255,255,.14)" strokeWidth=".5"/>
              <line x1="436" y1="30" x2="436" y2="94" stroke="rgba(255,255,255,.14)" strokeWidth=".5"/>
              <text x="300" y="65" fontFamily="monospace" fontSize="6.5" fill="rgba(255,255,255,.25)" textAnchor="middle">SHOP A</text>
              <text x="354" y="65" fontFamily="monospace" fontSize="6.5" fill="rgba(255,255,255,.25)" textAnchor="middle">SHOP B</text>
              <text x="408" y="65" fontFamily="monospace" fontSize="6.5" fill="rgba(255,255,255,.25)" textAnchor="middle">SHOP C</text>
              <text x="461" y="65" fontFamily="monospace" fontSize="6.5" fill="rgba(255,255,255,.25)" textAnchor="middle">QSR</text>
              <rect x="274" y="104" width="76" height="74" fill="rgba(27,42,74,.12)" stroke="rgba(255,255,255,.3)" strokeWidth=".75"/>
              <text x="312" y="140" fontFamily="monospace" fontSize="6.5" fill="rgba(255,255,255,.28)" textAnchor="middle">OUTPARCEL</text>
              <text x="312" y="153" fontFamily="monospace" fontSize="6.5" fill="rgba(255,255,255,.18)" textAnchor="middle">3,200 SF</text>
              <rect x="364" y="104" width="76" height="74" fill="rgba(27,42,74,.12)" stroke="rgba(255,255,255,.3)" strokeWidth=".75"/>
              <text x="402" y="140" fontFamily="monospace" fontSize="6.5" fill="rgba(255,255,255,.28)" textAnchor="middle">OUTPARCEL</text>
              <text x="402" y="153" fontFamily="monospace" fontSize="6.5" fill="rgba(255,255,255,.18)" textAnchor="middle">4,100 SF</text>
              <rect x="30" y="220" width="100" height="168" fill="rgba(27,42,74,.1)" stroke="rgba(255,255,255,.28)" strokeWidth=".75"/>
              <text x="80" y="310" fontFamily="monospace" fontSize="6.5" fill="rgba(255,255,255,.25)" textAnchor="middle">JR. ANCHOR</text>
              <text x="80" y="324" fontFamily="monospace" fontSize="6.5" fill="rgba(255,255,255,.18)" textAnchor="middle">24,000 SF</text>
              <rect x="142" y="220" width="96" height="168" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth=".75"/>
              <line x1="142" y1="262" x2="238" y2="262" stroke="rgba(255,255,255,.1)" strokeWidth=".4"/>
              <line x1="142" y1="304" x2="238" y2="304" stroke="rgba(255,255,255,.1)" strokeWidth=".4"/>
              <line x1="142" y1="346" x2="238" y2="346" stroke="rgba(255,255,255,.1)" strokeWidth=".4"/>
              <text x="190" y="246" fontFamily="monospace" fontSize="6.5" fill="rgba(255,255,255,.2)" textAnchor="middle">INLINE A</text>
              <text x="190" y="288" fontFamily="monospace" fontSize="6.5" fill="rgba(255,255,255,.2)" textAnchor="middle">INLINE B</text>
              <text x="190" y="330" fontFamily="monospace" fontSize="6.5" fill="rgba(255,255,255,.2)" textAnchor="middle">INLINE C</text>
              <text x="190" y="372" fontFamily="monospace" fontSize="6.5" fill="rgba(255,255,255,.2)" textAnchor="middle">INLINE D</text>
              <rect x="274" y="220" width="78" height="78" fill="rgba(27,42,74,.12)" stroke="rgba(255,255,255,.3)" strokeWidth=".75"/>
              <text x="313" y="260" fontFamily="monospace" fontSize="6.5" fill="rgba(255,255,255,.28)" textAnchor="middle">PAD SITE</text>
              <text x="313" y="273" fontFamily="monospace" fontSize="6.5" fill="rgba(255,255,255,.18)" textAnchor="middle">QSR / BANK</text>
              <rect x="368" y="220" width="78" height="78" fill="rgba(27,42,74,.12)" stroke="rgba(255,255,255,.3)" strokeWidth=".75"/>
              <text x="407" y="260" fontFamily="monospace" fontSize="6.5" fill="rgba(255,255,255,.28)" textAnchor="middle">PAD SITE</text>
              <text x="407" y="273" fontFamily="monospace" fontSize="6.5" fill="rgba(255,255,255,.18)" textAnchor="middle">MEDICAL</text>
              <rect x="274" y="312" width="216" height="76" fill="rgba(255,255,255,.012)" stroke="rgba(255,255,255,.1)" strokeWidth=".5"/>
              <g stroke="rgba(255,255,255,.09)" strokeWidth=".4">
                <line x1="290" y1="312" x2="290" y2="388"/><line x1="306" y1="312" x2="306" y2="388"/>
                <line x1="322" y1="312" x2="322" y2="388"/><line x1="338" y1="312" x2="338" y2="388"/>
                <line x1="354" y1="312" x2="354" y2="388"/><line x1="370" y1="312" x2="370" y2="388"/>
                <line x1="386" y1="312" x2="386" y2="388"/><line x1="402" y1="312" x2="402" y2="388"/>
                <line x1="418" y1="312" x2="418" y2="388"/><line x1="434" y1="312" x2="434" y2="388"/>
                <line x1="450" y1="312" x2="450" y2="388"/><line x1="466" y1="312" x2="466" y2="388"/>
              </g>
              <text x="382" y="356" fontFamily="monospace" fontSize="6.5" fill="rgba(255,255,255,.18)" textAnchor="middle">PARKING FIELD</text>
              <line x1="30" y1="428" x2="238" y2="428" stroke="rgba(255,255,255,.14)" strokeWidth=".5"/>
              <line x1="30" y1="424" x2="30" y2="432" stroke="rgba(255,255,255,.14)" strokeWidth=".5"/>
              <line x1="238" y1="424" x2="238" y2="432" stroke="rgba(255,255,255,.14)" strokeWidth=".5"/>
              <text x="134" y="438" fontFamily="monospace" fontSize="6.5" fill="rgba(255,255,255,.18)" textAnchor="middle">175,000 SF GLA</text>
              <g transform="translate(486,36)"><circle cx="0" cy="0" r="11" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth=".5"/><path d="M0,-9L3,4L0,1L-3,4Z" fill="rgba(255,255,255,.4)"/><path d="M0,-9L-3,4L0,1L3,4Z" fill="rgba(255,255,255,.15)"/><text x="0" y="-13" fontFamily="monospace" fontSize="6" fill="rgba(255,255,255,.4)" textAnchor="middle">N</text></g>
            </svg>
          </div>
          <div>
            <div className="ey rv">Retail Platform</div>
            <div className="st rv d1">The Outparcel<br/>Intelligence Engine</div>
            <p className="sd rv d2" style={{marginTop:"22px"}}>Radius has built the region's most sophisticated retail land platform — identifying, entitling, and delivering outparcels and inline retail sites at the intersection of residential growth corridors.</p>
            <div className="rtstats rv d3">
              <div className="rts"><div className="rtsn">47</div><div className="rtsl">Active Retail Sites</div></div>
              <div className="rts"><div className="rtsn">2.8M</div><div className="rtsl">Sq Ft in Development</div></div>
              <div className="rts"><div className="rtsn">$1.2B</div><div className="rtsl">Retail Portfolio Value</div></div>
              <div className="rts"><div className="rtsn">12</div><div className="rtsl">Metro Markets</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="fnd" id="about">
        <div className="fwm">Conviction</div>
        <div className="fi">
          <div>
            <span className="fqm rv">"</span>
            <p className="fq rv d1">"We don't speculate on land. We underwrite it with the same discipline a private equity fund applies to leveraged acquisitions — with the speed and conviction only a principal can bring."</p>
            <div className="rv d2">
              <div className="fan">James R. Harmon</div>
              <div className="fat">Founder &amp; Managing Principal, Radius Development Group</div>
            </div>
          </div>
          <div className="fr rv d1">
            <p className="fb">For over two decades, Radius Development Group has operated at the nexus of institutional capital and complex land markets. We are not a brokerage. We are not a REIT. We are a principal-led platform that takes calculated, high-conviction positions in the land cycle — and executes with precision.</p>
            <p className="fb">Our edge is structural: deep market intelligence, preferred relationships with national builders, and a legal and entitlement infrastructure that compresses time-to-close and de-risks execution for our capital partners.</p>
            <div className="fsig">
              <svg viewBox="0 0 160 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8,34 C14,18 18,12 24,16 C30,20 26,36 32,34 C38,32 40,20 46,22 C52,24 48,40 54,38 C59,36 62,26 68,24 C74,22 72,36 78,34 C84,32 86,20 94,18 C102,16 100,30 105,32 C110,34 114,28 118,24 C122,20 124,18 128,20 C132,22 130,36 136,33 C140,31 144,24 150,26" stroke="rgba(255,255,255,.72)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18,40 C22,42 28,44 34,42" stroke="rgba(255,255,255,.38)" strokeWidth=".8" strokeLinecap="round"/>
                <path d="M152,27 C156,30 156,36 152,38" stroke="rgba(255,255,255,.42)" strokeWidth=".8" strokeLinecap="round"/>
              </svg>
              <p>James R. Harmon — Managing Principal</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div>
          <div className="flogo">Radius Development</div>
          <p className="ftag">Principal-led land investment and development platform operating across the Sun Belt and Mountain West.</p>
        </div>
        <div>
          <div className="fct">Platform</div>
          <ul className="flinks">
            <li><a href="#">Land Acquisition</a></li>
            <li><a href="#">Vertical Development</a></li>
            <li><a href="#">Retail Strategy</a></li>
            <li><a href="#">Capital Partnerships</a></li>
          </ul>
        </div>
        <div>
          <div className="fct">Transactions</div>
          <ul className="flinks">
            <li><a href="#">Deal Sheet</a></li>
            <li><a href="#">Portfolio Overview</a></li>
            <li><a href="#">Active Opportunities</a></li>
            <li><a href="#">Exit Summaries</a></li>
          </ul>
        </div>
        <div>
          <div className="fct">Company</div>
          <ul className="flinks">
            <li><a href="#">About Radius</a></li>
            <li><a href="#">Leadership</a></li>
            <li><a href="#">Market Coverage</a></li>
            <li><a href="#">Request Access</a></li>
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
