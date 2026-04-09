import { Link } from "react-router-dom";

type SiteFooterProps = {
  currentPath: string;
};

const SiteFooter = ({ currentPath }: SiteFooterProps) => {
  const isHome = currentPath === "/";
  const whyRadiusHref = isHome ? "#retail" : "/#retail";
  const aboutHref = isHome ? "#about" : "/#about";
  const teamHref = isHome ? "#team" : "/#team";
  const contactHref = isHome ? "#contact" : "/#contact";

  return (
    <>
      <footer id="contact">
        <div className="fbrand">
          <Link to="/" className="flogo">radius</Link>
          <p className="ftag">Principal-led land investment and development platform operating across the Sun Belt and Mountain West.</p>
          <p className="fmeta">Land strategy, development execution, and institutional partnerships across high-growth markets.</p>
        </div>
        <div className="fcol">
          <div className="fct">Platform</div>
          <ul className="flinks">
            <li><Link to="/what-we-do">What We Do</Link></li>
            <li><Link to="/projects">Current Projects</Link></li>
            <li><a href={whyRadiusHref}>Why Radius</a></li>
            <li><a href={teamHref}>Our Team</a></li>
          </ul>
        </div>
        <div className="fcol">
          <div className="fct">Company</div>
          <ul className="flinks">
            <li><a href={aboutHref}>Who We Are</a></li>
            <li><a href={teamHref}>Leadership</a></li>
            <li><a href={contactHref}>Contact</a></li>
            <li><a href="#">Market Coverage</a></li>
          </ul>
        </div>
        <div className="fcol">
          <div className="fct">Access</div>
          <ul className="flinks">
            <li><a href="#">Investor Portal</a></li>
            <li><a href="#">Request Access</a></li>
            <li><Link to="/projects">Active Pipeline</Link></li>
            <li><a href={contactHref}>General Inquiries</a></li>
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

export default SiteFooter;
