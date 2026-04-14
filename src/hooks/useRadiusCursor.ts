import { useEffect } from "react";

const DEFAULT_HOVER_SELECTOR = ".bp,.bg,.homepage-advantage__visual,.homepage-advantage__proof-card,.homepage-advantage__cta,.platform-card,.platform-card__cta,.fps__arrow,.fps__dot,.fps__view-all,.fps-slide__cta,.teamcard,.li,.nbtn,.flinks a,.nlinks a,.rts,.project-archive-card,.project-related-card,.filterpill,.archive-reset";

const useRadiusCursor = (hoverSelector: string = DEFAULT_HOVER_SELECTOR) => {
  useEffect(() => {
    const cur = document.getElementById("cur");
    const cdot = document.getElementById("cdot");
    if (!cur || !cdot) return;

    let mx = -200;
    let my = -200;
    let cx = -200;
    let cy = -200;

    const onMove = (event: MouseEvent) => {
      mx = event.clientX;
      my = event.clientY;
      cdot.style.left = `${mx}px`;
      cdot.style.top = `${my}px`;
    };

    document.addEventListener("mousemove", onMove);

    let raf = 0;
    const animate = () => {
      cx += (mx - cx) * 0.11;
      cy += (my - cy) * 0.11;
      cur.style.left = `${cx}px`;
      cur.style.top = `${cy}px`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const hoverElements = Array.from(document.querySelectorAll<HTMLElement>(hoverSelector));
    const enter = () => cur.classList.add("x");
    const leave = () => cur.classList.remove("x");
    hoverElements.forEach((element) => {
      element.addEventListener("mouseenter", enter);
      element.addEventListener("mouseleave", leave);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      hoverElements.forEach((element) => {
        element.removeEventListener("mouseenter", enter);
        element.removeEventListener("mouseleave", leave);
      });
    };
  }, [hoverSelector]);
};

export default useRadiusCursor;
