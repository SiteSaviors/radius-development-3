import { Link } from "react-router-dom";

type SiteFooterProps = {
  currentPath: string;
};

const SiteFooter = ({ currentPath: _currentPath }: SiteFooterProps) => {
  const investorPortalHref = "#";
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer id="contact" className="site-footer">
        <div className="fbrand">
          <Link to="/" className="flogo">radius</Link>
          <p className="ftag">
            Principal-led land investment and development platform operating across
            high-growth markets.
          </p>
          <p className="fmeta">
            Land strategy, development execution, and institutional partnerships.
          </p>
        </div>
        <div className="fcol">
          <div className="fct">Navigation</div>
          <ul className="flinks">
            <li><Link to="/what-we-do">What We Do</Link></li>
            <li><Link to="/projects">Current Projects</Link></li>
            <li><Link to="/company">Company</Link></li>
            <li><a href={investorPortalHref}>Investor Portal</a></li>
          </ul>
        </div>
        <div className="fcol fcontact">
          <div className="fct">Contact Us</div>
          <div className="fcontact-list">
            <div className="fcontact-item">
              <div className="fcontact-label">Email Address</div>
              <a className="fcontact-value" href="mailto:info@radiusbuilt.com">
                info@radiusbuilt.com
              </a>
            </div>
            <div className="fcontact-item">
              <div className="fcontact-label">Phone Number</div>
              <a className="fcontact-value" href="tel:+19192750109">
                (919) 275-0109
              </a>
            </div>
            <div className="fcontact-item">
              <div className="fcontact-label">Address</div>
              <address className="fcontact-value fcontact-address">
                105 Kilmayne Drive, Suite C, Cary, NC 27511
              </address>
            </div>
          </div>
        </div>
      </footer>
      <div className="fbot">
        <span className="fcp">© {currentYear} Radius Development Group. All rights reserved.</span>
      </div>
    </>
  );
};

export default SiteFooter;
