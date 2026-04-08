import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type LazyBackgroundProps = {
  className: string;
  image: string;
  style?: CSSProperties;
  eager?: boolean;
  ariaHidden?: boolean;
  children?: ReactNode;
};

const LazyBackground = ({ className, image, style, eager = false, ariaHidden, children }: LazyBackgroundProps) => {
  const [loaded, setLoaded] = useState(eager);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (loaded) return;

    const node = containerRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setLoaded(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [loaded]);

  return (
    <div
      ref={containerRef}
      className={className}
      aria-hidden={ariaHidden}
      style={{
        ...style,
        ...(loaded ? { backgroundImage: `url(${image})` } : undefined),
      }}
    >
      {children}
    </div>
  );
};

export default LazyBackground;
