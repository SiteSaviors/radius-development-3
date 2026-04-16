import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type LazyBackgroundProps = {
  className: string;
  image: string;
  mobileImage?: string;
  style?: CSSProperties;
  mobileStyle?: CSSProperties;
  eager?: boolean;
  ariaHidden?: boolean;
  children?: ReactNode;
};

const LazyBackground = ({
  className,
  image,
  mobileImage,
  style,
  mobileStyle,
  eager = false,
  ariaHidden,
  children,
}: LazyBackgroundProps) => {
  const [loaded, setLoaded] = useState(eager);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();

  const activeImage = isMobile && mobileImage ? mobileImage : image;
  const activeStyle = isMobile && mobileStyle ? { ...style, ...mobileStyle } : style;

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
        ...activeStyle,
        ...(loaded ? { backgroundImage: `url(${activeImage})` } : undefined),
      }}
    >
      {children}
    </div>
  );
};

export default LazyBackground;
