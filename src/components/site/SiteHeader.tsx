import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type SiteHeaderProps = {
  currentPath: string;
};

const SiteHeader = ({ currentPath }: SiteHeaderProps) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(currentPath !== "/");
  const isHome = currentPath === "/";

  const platformHref = isHome ? "#platform" : "/#platform";
  const segmentsHref = isHome ? "#retail" : "/#retail";
  const aboutHref = isHome ? "#about" : "/#about";
  const contactHref = isHome ? "#contact" : "/#contact";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(currentPath !== "/" || window.scrollY > 40);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [currentPath]);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [currentPath]);

  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <Link to="/" className="nlogo">radius</Link>
      <ul className="nlinks">
        <li><a href={platformHref}>What We Do</a></li>
        <li><Link to="/projects">Current Projects</Link></li>
        <li><a href={segmentsHref}>Segments</a></li>
        <li><a href={aboutHref}>About Us</a></li>
        <li><a href={contactHref}>Contact</a></li>
      </ul>
      <a href="#" className="nbtn">Investor Portal</a>
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
        <a href={platformHref} onClick={() => setMobileNavOpen(false)}>What We Do</a>
        <Link to="/projects" onClick={() => setMobileNavOpen(false)}>Current Projects</Link>
        <a href={segmentsHref} onClick={() => setMobileNavOpen(false)}>Segments</a>
        <a href={aboutHref} onClick={() => setMobileNavOpen(false)}>About Us</a>
        <a href={contactHref} onClick={() => setMobileNavOpen(false)}>Contact</a>
      </div>
    </nav>
  );
};

export default SiteHeader;
