# Recently Closed Premium Redesign Plan

## Summary
Redesign the homepage `Recently Closed` section into a compact premium transaction spotlight that feels closer to the `Capabilities` cards than a case study panel.

The new direction should:
- reduce the overall vertical footprint substantially
- make ROI the hero
- keep the image cinematic and emotionally strong
- reveal secondary detail progressively instead of showing everything at once
- feel custom, elegant, and expensive

Core reference:
- use the `Capabilities` cards as the behavioral inspiration
- do **not** reuse their layout literally
- apply the same idea of controlled reveal, hierarchy, and premium motion to a closed-deal showcase

## Problem With Current Direction
The current implementation still reads like a mini report:
- image on one side
- proof rail on the other
- too much visible text
- too much height
- no strong focal point

That makes the section feel:
- type-heavy
- structurally busy
- more informational than premium
- visually weaker than the sections above it

## New Concept
Treat the section like a `transaction trophy panel`.

Instead of a full editorial proof rail, the section should become:
- one horizontal spotlight card
- one dominant image field
- one compact ROI block
- one hidden layer of supporting detail that appears on hover/focus

This gives the section:
- a strong default state
- better visual restraint
- less visible copy
- more delight through motion and reveal

## Design Direction
### Default state
At rest, the section should show only:
- `Closed`
- `TOD - Phase One`
- `Research Triangle Park, NC`
- `2.1x Return`
- `Value Creation in 3 Years`
- buyer logo

That is enough to understand:
- what the deal is
- where it is
- why it matters

### Reveal state
On hover or focus, reveal:
- one short transaction thesis
- two compact supporting facts:
  - `350 Class-A Multifamily Units`
  - `Land Assembly, Acquisition, Rezoning`

Do not reveal:
- a full paragraph block
- a multi-row facts grid
- extra narrative copy beyond what is needed

## Proposed Structure
### Desktop layout
Single horizontal spotlight card:
- left 65 to 70 percent:
  - cinematic image
  - overlaid status
  - project name
  - location
- right 30 to 35 percent:
  - ROI card
  - buyer logo
  - hidden detail layer revealed on hover/focus

### Height target
The full section should be no taller than the visual scale of the `Radius Advantage` section.

This means:
- avoid tall stacked proof rails
- avoid large text blocks
- avoid a second deep content column

### Mobile layout
Keep the same concept, but adapt for no-hover behavior:
- image first
- compact ROI block beneath or partially overlaid
- one short thesis line visible by default
- one very tight proof stack
- still much shorter and more distilled than the current design

## Information Hierarchy
### Primary
- ROI value: `2.1x Return`
- project name

### Secondary
- `Value Creation in 3 Years`
- location
- buyer logo

### Tertiary
- one short thesis
- two proof facts

The outcome metric should be the visual anchor.

## Motion Direction
Motion should be subtle and premium.

### At hover/focus
- image brightens slightly
- image scales very subtly
- ROI card lifts a few pixels
- accent rule grows
- hidden thesis/facts fade up and slide into place
- buyer logo sharpens slightly

### Reduced motion
For `prefers-reduced-motion: reduce`:
- no lift
- no scale
- no reveal choreography
- content remains readable and stable

## Content Rules
### Visible by default
- status
- project name
- location
- outcome value
- outcome meta
- buyer logo

### Revealed on interaction only
- transaction thesis
- `Project Scope`
- `Our Role`

### Remove from visible structure
- long summary paragraph
- strategy row
- four-card facts grid
- separate outcome module as its own boxed component

## Visual System
### Background
Keep the beige section background already introduced.

### Spotlight card
Use:
- dark charcoal shell
- refined border
- subtle inset highlight
- high-end shadow
- restrained accent line

Avoid:
- dashboard-style KPI box
- repeated glass cards
- multiple sibling panels fighting for attention

### Image treatment
Use:
- strong cinematic crop
- darker lower-third scrim
- crisp title overlay
- restrained warm highlight

## Implementation Direction
### Keep
- single featured closed transaction
- existing deal content
- existing image and buyer logo assets

### Rework
- replace the current proof rail layout
- replace the current facts grid
- make ROI the main content block
- make detailed deal copy conditional/revealed rather than always visible

### Component direction
The section should still live as a dedicated homepage component rather than inline markup in `Index.tsx`.

Recommended component shape:
- one parent spotlight shell
- one image area
- one ROI panel
- one hidden detail layer

## Acceptance Criteria
- section is materially shorter on desktop
- section feels premium and custom, not report-like
- ROI is the first thing the eye catches
- copy visible at rest is dramatically reduced
- reveal behavior feels similar in spirit to `Capabilities`
- mobile remains image-led and compact
- the section no longer competes with the sections above it through excess height or copy

## Guiding Principle
This section should feel like a `closed deal trophy`, not a `mini case study`.
