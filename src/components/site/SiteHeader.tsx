import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type SiteHeaderProps = {
  currentPath: string;
};

const SiteHeader = ({ currentPath }: SiteHeaderProps) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const startsTransparent =
    currentPath === "/" ||
    currentPath === "/company" ||
    currentPath === "/contact" ||
    currentPath === "/what-we-do" ||
    currentPath === "/projects";
  const [scrolled, setScrolled] = useState(!startsTransparent);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(!startsTransparent || window.scrollY > 40);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [startsTransparent]);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [currentPath]);

  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <Link to="/" className="nlogo">radius</Link>
      <ul className="nlinks">
        <li><Link to="/what-we-do">What We Do</Link></li>
        <li><Link to="/projects">Current Projects</Link></li>
        <li><Link to="/company">Company</Link></li>
        <li><Link to="/contact">Contact</Link></li>
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
        <Link to="/what-we-do" onClick={() => setMobileNavOpen(false)}>What We Do</Link>
        <Link to="/projects" onClick={() => setMobileNavOpen(false)}>Current Projects</Link>
        <Link to="/company" onClick={() => setMobileNavOpen(false)}>Company</Link>
        <Link to="/contact" onClick={() => setMobileNavOpen(false)}>Contact</Link>
      </div>
    </nav>
  );
};

export default SiteHeader;
