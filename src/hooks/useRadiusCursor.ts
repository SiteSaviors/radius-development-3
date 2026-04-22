import { useEffect } from "react";

const DEFAULT_HOVER_SELECTOR = ".bp,.bg,.homepage-advantage__visual,.homepage-advantage__proof-card,.homepage-advantage__cta,.platform-card,.platform-card__cta,.fps__arrow,.fps__dot,.fps__view-all,.fps-slide__cta,.teamcard,.li,.nbtn,.flinks a,.nlinks a,.rts,.project-archive-card,.project-related-card,.filterpill,.archive-reset,.contact-detail-value,.contact-form-submit,.contact-success-reset";

const useRadiusCursor = (hoverSelector: string = DEFAULT_HOVER_SELECTOR) => {
  useEffect(() => {
    const supportsFinePointer =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(hover: hover) and (pointer: fine)").matches
        : true;

    if (!supportsFinePointer) return;

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

    const startAnimation = () => {
      if (!raf && !document.hidden) {
        raf = requestAnimationFrame(animate);
      }
    };

    const stopAnimation = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const onMouseOver = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      if (event.target.closest(hoverSelector)) {
        cur.classList.add("x");
      }
    };

    const onMouseOut = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const currentHoverTarget = event.target.closest(hoverSelector);
      if (!currentHoverTarget) return;

      const nextHoverTarget =
        event.relatedTarget instanceof Element ? event.relatedTarget.closest(hoverSelector) : null;

      if (nextHoverTarget) return;
      cur.classList.remove("x");
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
        return;
      }

      startAnimation();
    };

    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    document.addEventListener("visibilitychange", onVisibilityChange);
    startAnimation();

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      stopAnimation();
      cur.classList.remove("x");
    };
  }, [hoverSelector]);
};

export default useRadiusCursor;
