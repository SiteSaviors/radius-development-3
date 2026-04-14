import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import HomepagePropertiesSlideshow from "@/components/home/HomepagePropertiesSlideshow";
import { projects } from "@/content/projects";

const defaultMatchMedia = window.matchMedia;

const emblaMock = vi.hoisted(() => {
  let selectedIndex = 0;
  let slideCount = 0;
  const listeners = {
    reInit: new Set<() => void>(),
    select: new Set<() => void>(),
  };

  const emit = (eventName: keyof typeof listeners) => {
    listeners[eventName].forEach((listener) => listener());
  };

  const api = {
    scrollNext: vi.fn(() => {
      selectedIndex = (selectedIndex + 1) % slideCount;
      emit("select");
    }),
    scrollPrev: vi.fn(() => {
      selectedIndex = (selectedIndex - 1 + slideCount) % slideCount;
      emit("select");
    }),
    scrollTo: vi.fn((index: number) => {
      selectedIndex = ((index % slideCount) + slideCount) % slideCount;
      emit("select");
    }),
    selectedScrollSnap: () => selectedIndex,
    scrollSnapList: () => Array.from({ length: slideCount }, (_, index) => index),
    on: (eventName: keyof typeof listeners, listener: () => void) => {
      listeners[eventName].add(listener);
    },
    off: (eventName: keyof typeof listeners, listener: () => void) => {
      listeners[eventName].delete(listener);
    },
  };

  const ref = (node: HTMLDivElement | null) => {
    if (!node) return;
    slideCount = node.querySelectorAll("[data-embla-slide]").length;
    emit("reInit");
  };

  const useEmblaCarouselMock = vi.fn(() => {
    return [ref, api] as const;
  });

  const reset = (count: number) => {
    selectedIndex = 0;
    slideCount = count;
    listeners.reInit.clear();
    listeners.select.clear();
    api.scrollNext.mockClear();
    api.scrollPrev.mockClear();
    api.scrollTo.mockClear();
    useEmblaCarouselMock.mockClear();
  };

  return {
    api,
    reset,
    useEmblaCarouselMock,
  };
});

vi.mock("embla-carousel-react", () => ({
  default: emblaMock.useEmblaCarouselMock,
}));

const renderSlideshow = (projectSet = projects) =>
  render(
    <MemoryRouter>
      <HomepagePropertiesSlideshow projects={projectSet} />
    </MemoryRouter>
  );

const setMatchMedia = ({
  reducedMotion = false,
  mobileViewport = false,
}: {
  reducedMotion?: boolean;
  mobileViewport?: boolean;
}) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches:
        query === "(prefers-reduced-motion: reduce)"
          ? reducedMotion
          : query === "(max-width: 768px)"
            ? mobileViewport
            : false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    }),
  });
};

describe("homepage properties slideshow", () => {
  beforeEach(() => {
    emblaMock.reset(projects.length);
    setMatchMedia({});
    vi.useRealTimers();
  });

  it("renders the first property as active with dots and routing intact", () => {
    renderSlideshow();

    expect(screen.getByRole("heading", { name: projects[0].name })).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(projects.length);
    expect(screen.getByRole("link", { name: "View Project" })).toHaveAttribute(
      "href",
      `/projects/${projects[0].slug}`
    );
    expect(screen.getByRole("link", { name: "View All Projects" })).toHaveAttribute(
      "href",
      "/projects"
    );
  });

  it("derives mobile fallback content for the active slide", () => {
    setMatchMedia({ mobileViewport: true });
    const { container } = renderSlideshow();
    const activeSlide = container.querySelector('.fps-slide[aria-hidden="false"]');

    expect(activeSlide).not.toBeNull();
    expect(
      activeSlide?.querySelector(".fps-slide__supporting--mobile")?.textContent
    ).toContain(projects[0].shortDescription);
    expect(activeSlide?.querySelector(".fps-slide__media")).toHaveStyle({
      backgroundPosition: projects[0].imagePosition,
    });
    expect(
      activeSlide?.querySelectorAll(".fps-slide__tags--mobile .fps-slide__tag")
    ).toHaveLength(Math.min(2, projects[0].highlightTags.length));
  });

  it("uses mobile-specific art direction when provided", () => {
    setMatchMedia({ mobileViewport: true });
    const mobileProjects = projects.map((project, index) =>
      index === 0
        ? {
            ...project,
            mobileImage: "/mobile-shiloh.jpg",
            mobileImagePosition: "center 20%",
            mobileShortDescription: "A tighter mobile-only editorial summary.",
          }
        : project
    );

    const { container } = renderSlideshow(mobileProjects);
    const activeSlide = container.querySelector('.fps-slide[aria-hidden="false"]');

    expect(activeSlide).not.toBeNull();
    expect(
      activeSlide?.querySelector(".fps-slide__supporting--mobile")?.textContent
    ).toContain("A tighter mobile-only editorial summary.");
    expect(activeSlide?.querySelector(".fps-slide__media")).toHaveStyle({
      backgroundPosition: "center 20%",
    });
    expect(screen.getByRole("link", { name: "View Project" })).toHaveAttribute(
      "href",
      `/projects/${projects[0].slug}`
    );
  });

  it("changes the active slide via dots, arrows, and keyboard navigation", () => {
    renderSlideshow();

    fireEvent.click(screen.getByRole("tab", { name: "Go to slide 3" }));
    expect(screen.getByRole("heading", { name: projects[2].name })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Next property" }));
    expect(screen.getByRole("heading", { name: projects[3].name })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Previous property" }));
    expect(screen.getByRole("heading", { name: projects[2].name })).toBeInTheDocument();

    fireEvent.keyDown(screen.getByRole("region", { name: "Landmark Projects slideshow" }), {
      key: "ArrowRight",
    });
    expect(screen.getByRole("heading", { name: projects[3].name })).toBeInTheDocument();
  });

  it("auto-advances when idle and pauses after user interaction before resuming", () => {
    vi.useFakeTimers();
    renderSlideshow();

    act(() => {
      vi.advanceTimersByTime(7000);
    });
    expect(screen.getByRole("heading", { name: projects[1].name })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: "Go to slide 4" }));
    expect(screen.getByRole("heading", { name: projects[3].name })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(7000);
    });
    expect(screen.getByRole("heading", { name: projects[3].name })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(screen.getByRole("heading", { name: projects[3].name })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(7000);
    });
    expect(screen.getByRole("heading", { name: projects[4].name })).toBeInTheDocument();
  });

  it("disables autoplay when reduced motion is preferred", () => {
    vi.useFakeTimers();
    setMatchMedia({ reducedMotion: true });
    renderSlideshow();

    act(() => {
      vi.advanceTimersByTime(20000);
    });

    expect(screen.getByRole("heading", { name: projects[0].name })).toBeInTheDocument();
  });
});

afterAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: defaultMatchMedia,
  });
});
