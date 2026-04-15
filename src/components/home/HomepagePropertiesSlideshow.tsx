import { useEffect, useMemo, useRef, useState, type FocusEvent, type KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "react-router-dom";
import LazyBackground from "@/components/media/LazyBackground";
import type { Project } from "@/content/projects";

const AUTOPLAY_INTERVAL_MS = 7000;
const AUTOPLAY_RESUME_DELAY_MS = 10000;
const MOBILE_BREAKPOINT_QUERY = "(max-width: 768px)";

const slideToneBySlug = {
  "the-shiloh": "fps-slide--moss",
  "the-franklin": "fps-slide--slate",
  "terraces-at-west-cary": "fps-slide--ivory",
  "pittard-sears": "fps-slide--gold",
  "cary-estates": "fps-slide--blue",
  "rdu-town-center": "fps-slide--steel",
} as const;

type HomepagePropertiesSlideshowProps = {
  projects: Project[];
};

type HomepagePropertySlide = {
  slug: string;
  headline: string;
  displayIndex: string;
  statusLabel: string;
  statusTone?: Project["statusTone"];
  bodyCopy: string;
  mobileBodyCopy: string;
  metaLine: string;
  tags: Project["highlightTags"];
  mobileTags: Project["highlightTags"];
  image: string;
  imagePosition?: string;
  mobileImage: string;
  mobileImagePosition?: string;
  ctaHref: string;
  toneClassName: string;
};

const formatSlideNumber = (value: number) => `${value}`.padStart(2, "0");

const HomepagePropertiesSlideshow = ({ projects }: HomepagePropertiesSlideshowProps) => {
  const slides = useMemo<HomepagePropertySlide[]>(
    () =>
      projects.map((project, index) => ({
        slug: project.slug,
        headline: project.name,
        displayIndex: formatSlideNumber(index + 1),
        statusLabel: project.status,
        statusTone: project.statusTone,
        bodyCopy: project.archiveDescription,
        mobileBodyCopy: project.mobileShortDescription ?? project.shortDescription,
        metaLine: `${project.location} · ${project.market}`,
        tags: project.highlightTags.slice(0, 3),
        mobileTags: project.highlightTags.slice(0, 2),
        image: project.image,
        imagePosition: project.imagePosition,
        mobileImage: project.mobileImage ?? project.image,
        mobileImagePosition: project.mobileImagePosition ?? project.imagePosition,
        ctaHref: `/projects/${project.slug}`,
        toneClassName:
          slideToneBySlug[project.slug as keyof typeof slideToneBySlug] ?? "fps-slide--steel",
      })),
    [projects]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    duration: 28,
    dragFree: false,
    loop: true,
    skipSnaps: false,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>(() =>
    projects.map((_, index) => index)
  );
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocusWithin, setHasFocusWithin] = useState(false);
  const [isDocumentHidden, setIsDocumentHidden] = useState(
    typeof document !== "undefined" ? document.hidden : false
  );
  const [isInViewport, setIsInViewport] = useState(
    typeof IntersectionObserver === "undefined"
  );
  const [prefersReducedMotion] = useState(
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );
  const [isMobileViewport, setIsMobileViewport] = useState(
    typeof window !== "undefined" ? window.matchMedia(MOBILE_BREAKPOINT_QUERY).matches : false
  );

  const autoplayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showcaseRef = useRef<HTMLDivElement | null>(null);
  const hasResetInitialMobileSlideRef = useRef(false);

  const clearAutoplayTimer = () => {
    if (autoplayTimerRef.current) {
      window.clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  };

  const clearResumeTimer = () => {
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  };

  const registerUserInteraction = () => {
    clearAutoplayTimer();
    clearResumeTimer();
    setIsUserInteracting(true);
    resumeTimerRef.current = window.setTimeout(() => {
      setIsUserInteracting(false);
      resumeTimerRef.current = null;
    }, AUTOPLAY_RESUME_DELAY_MS);
  };

  useEffect(() => {
    if (!emblaApi) return;

    const syncSelection = () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
      setScrollSnaps(emblaApi.scrollSnapList());
    };

    syncSelection();
    emblaApi.on("select", syncSelection);
    emblaApi.on("reInit", syncSelection);

    return () => {
      emblaApi.off("select", syncSelection);
      emblaApi.off("reInit", syncSelection);
    };
  }, [emblaApi]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsDocumentHidden(document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setIsInViewport(true);
      return;
    }

    const node = showcaseRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      {
        threshold: 0.28,
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT_QUERY);
    const handleChange = () => setIsMobileViewport(mediaQuery.matches);

    handleChange();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  useEffect(() => {
    if (!emblaApi || !isMobileViewport || !isInViewport || hasResetInitialMobileSlideRef.current) {
      return;
    }

    emblaApi.scrollTo(0, true);
    setActiveIndex(0);
    hasResetInitialMobileSlideRef.current = true;
  }, [emblaApi, isInViewport, isMobileViewport]);

  useEffect(() => {
    clearAutoplayTimer();

    const autoplayBlocked =
      prefersReducedMotion ||
      isHovered ||
      hasFocusWithin ||
      isUserInteracting ||
      isDocumentHidden ||
      (isMobileViewport && !isInViewport) ||
      slides.length <= 1;

    if (!emblaApi || autoplayBlocked) {
      return;
    }

    autoplayTimerRef.current = window.setTimeout(() => {
      emblaApi.scrollNext();
    }, AUTOPLAY_INTERVAL_MS);

    return clearAutoplayTimer;
  }, [
    activeIndex,
    emblaApi,
    hasFocusWithin,
    isDocumentHidden,
    isHovered,
    isUserInteracting,
    isInViewport,
    isMobileViewport,
    prefersReducedMotion,
    slides.length,
  ]);

  useEffect(
    () => () => {
      clearAutoplayTimer();
      clearResumeTimer();
    },
    []
  );

  const handlePrev = () => {
    registerUserInteraction();
    emblaApi?.scrollPrev();
  };

  const handleNext = () => {
    registerUserInteraction();
    emblaApi?.scrollNext();
  };

  const handleDotClick = (index: number) => {
    registerUserInteraction();
    emblaApi?.scrollTo(index);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      handlePrev();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      handleNext();
    }
  };

  const handleFocusCapture = () => {
    if (hasFocusWithin) return;
    setHasFocusWithin(true);
    registerUserInteraction();
  };

  const handleBlurCapture = (event: FocusEvent<HTMLDivElement>) => {
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
    setHasFocusWithin(false);
  };

  const activeSlide = slides[activeIndex] ?? slides[0];

  if (!activeSlide) return null;

  return (
    <div className="fps__showcase rv d3" ref={showcaseRef}>
      <div className="fps__toolbar">
        <div className="fps__counter" aria-live="polite">
          <span className="fps__counter-current">{activeSlide.displayIndex}</span>
          <span className="fps__counter-divider">/</span>
          <span>{formatSlideNumber(slides.length)}</span>
        </div>
        <div className="fps__toolbar-actions">
          <Link to="/projects" className="fps__view-all">
            View All Projects
            <span aria-hidden="true">→</span>
          </Link>
          <div className="fps__arrows" aria-label="Slideshow navigation">
            <button
              type="button"
              className="fps__arrow"
              aria-label="Previous property"
              onClick={handlePrev}
            >
              <ArrowLeft size={16} strokeWidth={1.8} />
            </button>
            <button
              type="button"
              className="fps__arrow"
              aria-label="Next property"
              onClick={handleNext}
            >
              <ArrowRight size={16} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={emblaRef}
        className="fps__viewport"
        role="region"
        aria-roledescription="carousel"
        aria-label="Landmark Projects slideshow"
        tabIndex={0}
        onBlurCapture={handleBlurCapture}
        onFocusCapture={handleFocusCapture}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => {
          setIsHovered(true);
          registerUserInteraction();
        }}
        onMouseLeave={() => setIsHovered(false)}
        onPointerDownCapture={registerUserInteraction}
        onTouchStart={registerUserInteraction}
      >
        <div className="fps__track">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;

            return (
              <article
                key={slide.slug}
                aria-hidden={!isActive}
                aria-label={`${index + 1} of ${slides.length}`}
                aria-roledescription="slide"
                className={`fps-slide ${slide.toneClassName}${isActive ? " is-active" : ""}`}
                data-embla-slide
                role="group"
              >
                <div className="fps-slide__frame">
                  <div className="fps-slide__media-wrap">
                    <LazyBackground
                      key={`${slide.slug}-${isMobileViewport ? "mobile" : "desktop"}`}
                      className="fps-slide__media"
                      image={isMobileViewport ? slide.mobileImage : slide.image}
                      style={{
                        backgroundPosition: isMobileViewport
                          ? slide.mobileImagePosition
                          : slide.imagePosition,
                      }}
                      eager
                      ariaHidden
                    />
                    <div className="fps-slide__scrim" />
                    <div className="fps-slide__grid" />
                    <div className="fps-slide__beam" />
                    <div className="fps-slide__index-mark" aria-hidden="true">
                      {slide.displayIndex}
                    </div>
                  </div>

                  <div className="fps-slide__panel">
                    <div className="fps-slide__status-row">
                      <div
                        className={`fps-slide__status${slide.statusTone ? ` ${slide.statusTone}` : ""}`}
                      >
                        {slide.statusLabel}
                      </div>
                    </div>

                    <div className="fps-slide__copy">
                      <h3 className="fps-slide__title">{slide.headline}</h3>
                      <div className="fps-slide__meta-line">{slide.metaLine}</div>
                    </div>

                    <div className="fps-slide__detail">
                      <div className="fps-slide__tags fps-slide__tags--desktop">
                        {slide.tags.map((tag) => (
                          <span key={tag.text} className={`fps-slide__tag ${tag.tone}`}>
                            {tag.text}
                          </span>
                        ))}
                      </div>
                      <div className="fps-slide__tags fps-slide__tags--mobile">
                        {slide.mobileTags.map((tag) => (
                          <span key={`${tag.text}-mobile`} className={`fps-slide__tag ${tag.tone}`}>
                            {tag.text}
                          </span>
                        ))}
                      </div>
                      <p className="fps-slide__supporting fps-slide__supporting--desktop">
                        {slide.bodyCopy}
                      </p>
                      <p className="fps-slide__supporting fps-slide__supporting--mobile">
                        {slide.mobileBodyCopy}
                      </p>
                    </div>

                    <div className="fps-slide__actions">
                      <Link
                        to={slide.ctaHref}
                        className="fps-slide__cta"
                        tabIndex={isActive ? 0 : -1}
                      >
                        View Project
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="fps__footer">
        <div className="fps__dots" role="tablist" aria-label="Property slides">
          {scrollSnaps.map((_, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-selected={isActive}
                className={`fps__dot${isActive ? " is-active" : ""}`}
                onClick={() => handleDotClick(index)}
                role="tab"
              >
                <span className="sr-only">{`Slide ${index + 1}`}</span>
              </button>
            );
          })}
        </div>
        <div className="fps__gesture-hint">
          <span>Swipe, drag, or use the controls to explore.</span>
        </div>
      </div>
    </div>
  );
};

export default HomepagePropertiesSlideshow;
