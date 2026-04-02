# Who We Are Section Plan

## Purpose

The `Who We Are` section should be the first grounding editorial section on the homepage after the hero. Its job is to shift the page from aspirational positioning into credibility:

- establish who Radius is in one concise, premium statement
- introduce the platform in a more human and institutional way
- give the user immediate proof through four high-value operating stats
- create a visual bridge from the cinematic hero into the more structured sections below

This should not feel like a startup KPI block or a generic corporate about section. It should feel like a high-end editorial introduction with institutional weight.

## Current Homepage Context

Current homepage order:

1. fixed nav
2. hero
3. logo bar
4. `The Radius Advantage`
5. `Active Pipeline`
6. `Recently Closed`
7. retail section
8. founder section
9. footer

Important note:
- the old stat bar has already been removed from the homepage
- if the user intent is still “below the hero and stats bar,” the cleanest interpretation in the current codebase is to place `Who We Are` immediately below the hero and above the logo bar

Recommended placement:
- insert `Who We Are` between the hero and the logo bar

Why:
- it gives the homepage a better narrative progression
- hero sets ambition
- `Who We Are` establishes platform identity and operating scale
- logo bar then reads as external validation instead of being the first thing after the hero

## Section Goals

- clarify the Radius platform in one strong editorial message
- support the brand with real operating scale
- add visual depth without competing with the hero
- create a calmer, more structured moment before the denser content below

## Recommended Content Hierarchy

### Left side

1. small label
2. main headline
3. supporting body copy
4. `Learn More` button

Suggested structure:

- Label:
  - `Who We Are`
- Headline:
  - one elegant statement about Radius as a principal-led land and development platform
- Body:
  - 2 short paragraphs max, or 1 moderately sized paragraph
- CTA:
  - `Learn More`

Recommended copy behavior:
- headline should be emotional and strategic
- body copy should be specific and credible
- CTA should feel understated, not sales-heavy

### Right side

1. dark image panel
2. subtle overlay treatment
3. 4-stat grid anchored inside the panel

The image should support atmosphere and authority, not distract from the numbers.

## Recommended Layout Structure

Desktop layout:
- two-column section
- left column: content block
- right column: dark image panel with stats overlay

Recommended desktop balance:
- left: `0.9fr`
- right: `1.1fr`

This keeps the right side visually powerful without collapsing the reading comfort of the left side.

Section rhythm:
- use the same outer horizontal padding as hero-adjacent and major editorial sections
- maintain a generous vertical gap from hero to avoid feeling stacked too tightly
- keep the section visually quieter than the hero but more substantial than the logo bar

## Visual Direction

The section should feel:

- premium
- editorial
- modern
- restrained
- architectural

It should not feel:

- dashboard-like
- pitch-deck-like
- startup KPI-heavy
- template-based

## Right-Side Image Treatment

Recommended treatment:
- use a dark, full-panel background image
- image should be architectural, land-development, or urban-environment focused
- avoid overly bright sky or high-contrast clutter
- image should carry atmosphere, not narrative complexity

Recommended visual layering:

1. base image
2. dark gradient overlay
3. very subtle grid or texture layer, only if needed
4. stat cards or stat blocks overlaid in the lower or central region

Best overlay approach:
- top of image can stay more open and cinematic
- lower half should be darker for stat readability

Avoid:
- hard boxes floating randomly
- too many diagram lines
- bright accent glows
- over-designed “tech luxury” effects

## Stats Overlay Structure

Recommended arrangement:
- `2 x 2` grid

Why `2 x 2` is the cleanest choice:
- it matches the four-stat content naturally
- it feels balanced and premium
- it preserves readability
- it avoids a single long strip that feels like a KPI dashboard
- it is easier to scale to mobile cleanly

Each stat cell should contain:

1. value
2. descriptor line

Recommended stat hierarchy:
- value is the hero
- descriptor is compact, calm, and readable

Recommended content:

1. `3,137`
   `Residential units delivered and under construction`

2. `1.2M`
   `sq. ft. developed and under development`

3. `$250M`
   `in total capitalized assets`

4. `30+`
   `Years Combined Experience`

Recommended stat presentation:
- values large but not oversized
- descriptors small and refined
- consistent line length where possible
- use restrained borders and subtle separation

## Count-Up Animation Logic

Animation behavior:
- stats should count up only once
- trigger the first time the section enters the viewport
- do not replay when the user scrolls away and back

Recommended implementation approach:

1. section wrapper gets a `ref`
2. `IntersectionObserver` watches the section
3. when the section first becomes visible past a threshold, set a boolean like `hasAnimated` to `true`
4. stat values animate from `0` to target
5. observer disconnects or no-op after first trigger

Recommended threshold:
- around `0.3` to `0.45`

This prevents the animation from firing too early while still feeling responsive.

Recommended count-up behavior per value:
- `3,137`: integer increment
- `1.2M`: decimal animation to `1.2`, then append `M`
- `$250M`: animate numeric portion, then prefix `$` and suffix `M`
- `30+`: animate to `30`, then append `+`

Recommended duration:
- `1200ms` to `1800ms`

This should feel smooth and premium, not hyperactive.

## First-Scroll Trigger Behavior

The section should animate only once per page load.

Recommended state model:

- `isInView`
- `hasAnimated`

Logic:
- if section enters viewport and `hasAnimated === false`, start count-up
- once animation starts, set `hasAnimated` to `true`
- never reset it on scroll out

Fallback behavior:
- if JavaScript fails or is disabled, show final values immediately

## Accessibility Considerations

- stats must remain readable against the image
- contrast ratio should remain strong enough for white or near-white text
- do not rely on the animation alone to communicate meaning
- final values should exist in the DOM as real text
- if count-up is animated, consider `prefers-reduced-motion`

Recommended reduced-motion behavior:
- skip the counting animation entirely
- show final values immediately

Screen reader considerations:
- avoid overly fragmented stat markup
- value and descriptor should read as one cohesive unit
- CTA must remain a proper button or anchor with clear text

## Desktop Behavior

Recommended desktop composition:

- left side vertically centered or slightly top-weighted
- right side image panel taller than the left content block visually
- stats anchored in the lower portion of the panel
- section should feel substantial, but not hero-sized

Recommended desktop panel height:
- roughly `560px` to `680px`

This is enough to feel premium without dominating the page.

## Mobile Behavior

Recommended mobile order:

1. label
2. headline
3. body
4. CTA
5. image/stat panel

Reason:
- left-side copy should be read before the stats
- avoids forcing the user to decode a dense visual first

Mobile layout:
- single-column stack
- image panel remains large enough to feel intentional
- stats stay as a `2 x 2` grid if space allows
- if the descriptors wrap too aggressively, switch to a single-column stat stack inside the image panel

Recommended mobile fallback hierarchy:
- try `2 x 2` first
- switch to `1 x 4` only if descriptor length makes the grid feel cramped

My recommendation:
- keep `2 x 2` on tablet and larger phones
- use a single-column stack only on narrower mobile widths if needed

## Spacing and Visual Rhythm

This section should act as a decompression zone between the hero and the denser homepage content.

Recommended spacing behavior:
- generous top padding from the hero
- tighter bottom spacing into the logo bar than into the hero
- enough breathing room inside the left content block
- image panel should have internal padding if stats are inset

Desired rhythm:
- hero = cinematic
- who we are = editorial and grounded
- logo bar = proof and validation
- platform section = capabilities

## Relationship to the Hero and Logo Bar

This section should not compete with the hero headline.

It should instead:
- translate the hero promise into platform credibility
- lower the visual intensity slightly
- shift from emotion to proof

Relationship to the logo bar:
- if this section is inserted above the logo bar, the logos will feel more earned
- the user first understands who Radius is, then sees counterparties and partners

This is stronger than going directly from hero to logos.

## Recommended Component Structure

Cleanest future structure:

- `WhoWeAreSection`
  - wrapper and layout
- `WhoWeAreContent`
  - label, headline, body, CTA
- `WhoWeAreStatsPanel`
  - image panel and stat grid
- `WhoWeAreStat`
  - individual stat item
- optional hook:
  - `useCountUpOnView`

Recommended data structure:

- array of stat objects:
  - `value`
  - `suffix`
  - `label`
  - `duration`
  - `format`

This keeps the section easy to maintain and avoids hardcoding four separate stat implementations.

## Styling Approach

Recommended approach:
- dedicated section classes in `radius.css`
- align with current homepage conventions:
  - `ey` for eyebrow
  - `st`-style display logic for headline tone
  - dark backgrounds
  - serif display + Syne metadata + Inter body

Suggested class family:

- `.wwa`
- `.wwai`
- `.wwacopy`
- `.wwapanel`
- `.wwastats`
- `.wwastat`
- `.wwavalue`
- `.wwalabel`
- `.wwaimg`
- `.wwaoverlay`

Do not overload:
- hero classes
- platform card classes
- featured-projects card classes

This section should be its own sibling pattern.

## Animation Recommendations Beyond Count-Up

Keep additional motion subtle:

- section reveal can use the existing `.rv` pattern
- image panel can have a very light fade/translate reveal
- stat cells can appear with slight stagger
- count-up should be the main motion event

Avoid:
- multiple competing hover effects
- excessive floating or parallax
- anything that makes the section feel tech-demo-ish

## Implementation Risks

1. Placement ambiguity
- the request references a stats bar that no longer exists
- recommended resolution: place the section between hero and logo bar

2. Image readability
- if the chosen image is too busy or too bright, the stat overlay will feel cluttered

3. Stat descriptor length
- long descriptors can create uneven card heights or awkward wrapping

4. Overdesign risk
- too many overlays, borders, textures, or glows will make the section feel crowded

5. Mobile compression
- the right image panel can become too dense if the stats and copy are both oversized

## Decisions to Make Before Coding

1. Exact section placement:
- below hero and above logo bar is recommended

2. Image source:
- choose whether this section uses a real image asset or a placeholder treatment first

3. Final copy:
- headline and body copy need to be finalized or at least directionally approved

4. CTA destination:
- define where `Learn More` should link

5. Mobile stat layout:
- default recommendation is responsive `2 x 2`, with stacked fallback only if needed

## Recommended Final Direction

The cleanest version is:

- a two-column editorial section
- left-side brand narrative
- right-side dark image panel
- inset `2 x 2` stat grid
- one-time count-up on first scroll into view
- subtle motion only
- placed directly between the hero and the logo bar

This gives the homepage a stronger narrative sequence and adds credibility early without cluttering the page.
