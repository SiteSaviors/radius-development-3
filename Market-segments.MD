Radius — "Where Radius Creates Value" Section Enhancement
Context
The section titled "Where Radius Creates Value" features an interactive isometric diamond with four market segment cards (Commercial, Residential, Mixed-Use, Retail) that expand on click to reveal sub-categories.
The diamond widget itself works well and must not be modified. The interaction and styling of the diamond are final.
The problem: The widget sits in a vacuum on plain cream negative space. The section reads as under-designed compared to the richer sections above it — the eye lands on a cool object floating in a field of nothing.

Goal:
Turn the cream negative space into a subtle surveyed-land visual that

Reinforces Radius's positioning ("disciplined land strategy")
Fills the empty canvas with purposeful texture, not noise
Makes the diamond read as sitting on surveyed land, not floating above it
Keeps the diamond as the clear hero — the background is quiet support

Design Direction

Isometric parcel grid behind the widget at 30° angles matching the diamond's perspective
Warm taupe stroke at 8–12% opacity (fine grid) and 18–22% opacity (heavier parcel boundaries every 4–6 cells)
Radial fade toward the edges so the grid dissolves naturally into the cream instead of ending at a hard rectangle
Optional surveyor-style annotations in the corners — N↑ arrow, "PLAT 01" label, scale bar — in the same typography as the existing MARKET SEGMENTS eyebrow
Everything stacks behind the diamond widget and is fully pointer-events: none

Implementation
1. Section wrapper
The parent section needs to be a positioning context with overflow clipped:
css.market-segments-section {
  position: relative;
  overflow: hidden;
}
2. Isometric parcel grid (SVG)
Insert as the first child of the section, before the heading and widget:
html<div class="parcel-grid" aria-hidden="true">
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
    <defs>
      <!-- Fine isometric grid: 30° angles -->
      <pattern id="iso-grid" width="120" height="69" patternUnits="userSpaceOnUse">
        <path d="M 0 69 L 120 0" stroke="#6B5D47" stroke-width="0.5" fill="none"/>
        <path d="M 0 0 L 120 69" stroke="#6B5D47" stroke-width="0.5" fill="none"/>
      </pattern>

      <!-- Heavier parcel boundary lines every 5 cells -->
      <pattern id="parcel-lines" width="600" height="345" patternUnits="userSpaceOnUse">
        <path d="M 0 345 L 600 0" stroke="#6B5D47" stroke-width="1" fill="none"/>
        <path d="M 0 0 L 600 345" stroke="#6B5D47" stroke-width="1" fill="none"/>
      </pattern>

      <!-- Radial fade so the grid dissolves at the edges -->
      <radialGradient id="fade-gradient" cx="50%" cy="50%" r="65%">
        <stop offset="0%"  stop-color="white" stop-opacity="1"/>
        <stop offset="70%" stop-color="white" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="white" stop-opacity="0"/>
      </radialGradient>
      <mask id="grid-mask">
        <rect width="100%" height="100%" fill="url(#fade-gradient)"/>
      </mask>
    </defs>

    <g mask="url(#grid-mask)">
      <rect width="100%" height="100%" fill="url(#iso-grid)" opacity="0.12"/>
      <rect width="100%" height="100%" fill="url(#parcel-lines)" opacity="0.22"/>
    </g>
  </svg>
</div>
css.parcel-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;   /* CRITICAL — do not block widget clicks */
  z-index: 0;
}

.parcel-grid svg {
  width: 100%;
  height: 100%;
  display: block;
}

/* Ensure the headline and diamond widget stack above the grid */
.market-segments-section > *:not(.parcel-grid) {
  position: relative;
  z-index: 1;
}
Grid math note: A true 30° isometric line has a slope of tan(30°) ≈ 0.577. At pattern width 120, the pattern height should be 120 × 0.577 ≈ 69.3 — using 69 keeps the lines cleanly tiling at a true isometric angle so they align with the diamond's faces.
3. Surveyor annotations (optional but recommended)
Adds a site-plan/blueprint vocabulary that pays off the "land strategy" concept:
html<div class="plan-annotations" aria-hidden="true">
  <div class="annotation annotation--north">
    <span class="annotation__arrow">↑</span>
    <span class="annotation__label">N</span>
  </div>
  <div class="annotation annotation--plat">PLAT 01</div>
  <div class="annotation annotation--scale">
    <div class="annotation__scale-bar"></div>
    <span>0 — 100 FT</span>
  </div>
</div>
css.plan-annotations {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1; /* above grid, below widget */
}

.annotation {
  position: absolute;
  font-family: var(--eyebrow-font, inherit); /* match MARKET SEGMENTS eyebrow */
  font-size: 0.6875rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #6B5D47;
  opacity: 0.5;
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.annotation--north { top: 2.5rem; right: 3rem; }
.annotation--plat  { bottom: 2.5rem; left: 3rem; }
.annotation--scale { bottom: 2.5rem; right: 3rem; }

.annotation__arrow {
  font-size: 1rem;
  line-height: 1;
}

.annotation__scale-bar {
  width: 3rem;
  height: 1px;
  background: currentColor;
  position: relative;
}
.annotation__scale-bar::before,
.annotation__scale-bar::after {
  content: '';
  position: absolute;
  top: -1.5px;
  width: 1px;
  height: 4px;
  background: currentColor;
}
.annotation__scale-bar::before { left: 0; }
.annotation__scale-bar::after  { right: 0; }

/* Hide annotations on mobile — too cramped */
@media (max-width: 768px) {
  .plan-annotations { display: none; }
}
4. Color tuning
Starting values assume a cream background around #F5EFE0. Adjust the stroke color to harmonize with the actual site palette:
Cream backgroundStroke colorFine grid opacityParcel lines opacity#F5EFE0 (default)#6B5D470.120.22#EDE5D3 (warmer)#5A4F3C0.100.20#FAF6EC (lighter)#7A6B520.140.26
If the site uses CSS custom properties for its palette, swap the hardcoded colors for var(--color-…) references so the grid stays in sync with future palette tweaks.
Do NOT

Modify the diamond widget's HTML, JavaScript, click logic, or expand/collapse animation
Change the section's cream background color
Add a drop shadow, border, or container box around the widget
Use raster images — everything stays as SVG for crispness at every resolution
Make the grid dense enough to compete with the widget — check at 1440px, 1024px, 768px, and 375px
Introduce pointer-events on any decorative layer (the widget must remain fully clickable)

Test After Implementation

Interaction — click each of the four segments; expand/collapse still works on all of them
Responsive — grid looks purposeful (not noisy, not sparse) at desktop, tablet, and mobile widths
Accessibility — decorative SVG and annotations have aria-hidden="true"; no contrast violations introduced
Performance — SVG patterns are cheap; confirm no layout shift or repaint regressions
Print / reduced-motion — optional, but the grid should degrade gracefully

Stretch Goal (only if the above lands well)
Add a thin dashed measurement line connecting the headline block to the top corner of the diamond — like a construction drawing callout. Use the same taupe stroke at ~30% opacity with stroke-dasharray: 2 4. This is where the section earns extra design credit, but skip it if it clutters the composition.