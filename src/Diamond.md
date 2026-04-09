I inspected the live “Private Real Estate Universe” interactive diamond component and gathered a meaningful amount of the real DOM/CSS behavior. I do NOT need you to copy minified source literally — I need you to recreate the component cleanly and accurately based on the findings below.

Your job:
Rebuild this section as a production-quality interactive component that visually and functionally matches the inspected behavior as closely as possible. Use clean HTML, CSS, and JS. Prioritize fidelity to the interaction model, layout geometry, and animation logic.

==================================================
WHAT WE FOUND
==================================================

1) DOM STRUCTURE
The component uses a row wrapper with four cards. Each card has:
- a decorative background span
- a title span
- a hidden plaintext content block already present in the DOM
- an inline SVG plus icon

Example DOM structure:

<div class="scheme-layout-row">
  <div class="scheme-layout-col" tabindex="0">
    <span class="background" role="presentation"></span>
    <span class="title" aria-expanded="false" aria-haspopup="true" aria-controls="scheme-layout-col-content-0" id="scheme-layout-col-title-0" role="heading" aria-level="3">
      Lodging
    </span>
    <div aria-hidden="true" aria-labelledby="scheme-layout-col-title-0" id="scheme-layout-col-content-0" class="plaintext">
      <h3>Lodging</h3>
      <ul>
        <li>Hotels</li>
        <li>Resorts / Timeshare</li>
      </ul>
    </div>
    <span class="icon" role="presentation">
      [inline SVG plus icon]
    </span>
  </div>
</div>

The four categories in the original are:
- Lodging
- Commercial
- Residential
- Specialty

Residential uses:
class="plaintext has-columns"

This means the expanded content is already in the DOM and is revealed, not dynamically injected.

==================================================
2) OUTER LAYOUT GEOMETRY
==================================================

The main geometric container is not an image. It is built with transformed HTML/CSS.

Key rule found:

.scheme-layout {
   background: linear-gradient(225deg, rgb(225, 236, 240) 0%, rgb(255, 255, 255) 100%);
   display: block;
   width: 57%;
   aspect-ratio: 1 / 1;
   transform: rotate(-45deg) skew(16deg, 16deg);
   transform-origin: 85% 12%;
   position: relative;
   border-radius: 1.3em;
}

Interpretation:
- The large diamond plate is a transformed square
- It is rotated/skewed to create the overall diamond platform
- This is central to the look and should be preserved conceptually

Also found:

.scheme.scheme-1-view, .scheme.scheme-4-view {
   max-width: 68%;
   margin: 0 auto;
}

.scheme {
   position: relative;
}

==================================================
3) LAYOUT WRAPPERS
==================================================

.scheme-layout-row {
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
}

.scheme-decor {
   position: absolute;
   left: 0;
   top: 0;
   pointer-events: none;
   width: 100%;
   height: 100%;
}

Interpretation:
- The row is an absolute full-size overlay inside the transformed layout
- The cards are manually positioned within it
- Decorative elements may exist separately from the interactive cards

==================================================
4) CARD POSITIONING SYSTEM
==================================================

The cards are absolutely positioned.

Base rule:

.scheme-layout-col {
   width: 25%;
   aspect-ratio: 1 / 1;
   position: absolute;
   will-change: opacity;
}

In the 4-card version:

.scheme.scheme-1-view .scheme-layout-col,
.scheme.scheme-4-view .scheme-layout-col {
   width: 32%;
   cursor: pointer;
}

Cards are placed with nth-child positioning, not CSS grid/flex.

Examples found:

.scheme.scheme-4-view .scheme-layout-col:nth-child(1) {
   top: 12%;
   left: 12%;
}

.scheme.scheme-4-view .scheme-layout-col:nth-child(3) {
   top: 12%;
   right: 12%;
}

.scheme.scheme-4-view .scheme-layout-col:nth-child(4) {
   bottom: 12%;
   left: 12%;
}

This strongly suggests all four cards have custom absolute placement rules.

==================================================
5) CARD EXPANSION / ACTIVE STATE
==================================================

The open card is the same card becoming active — not a separate modal/popup.

Key rule:

.scheme.scheme-1-view .scheme-layout-col.active,
.scheme.scheme-4-view .scheme-layout-col.active {
   width: 68%;
}

This means:
- closed cards are about 32% width
- open card grows to about 68%

Example of custom active positioning for Residential (nth-child 3):

.scheme.scheme-4-view .scheme-layout-col.active:nth-child(3) {
   top: -14%;
   right: -14%;
}

Also:

.scheme.scheme-4-view .scheme-layout-col.active {
   transform: translate(0);
}

Interpretation:
- each card likely has a custom expanded position
- active state is not generic only; it likely depends on which card is open

==================================================
6) PARENT-LEVEL ACTIVE STATE
==================================================

Important discovery:
the row itself gets an active state class that affects other cards.

Example found:

.scheme.scheme-4-view .scheme-layout-row.active-col-1 .scheme-layout-col:nth-child(4) {
   bottom: 7%;
   left: 7%;
}

Interpretation:
- when a card opens, the parent row receives a class like:
  active-col-0
  active-col-1
  active-col-2
  active-col-3
- this parent class nudges/repositions the unopened cards
- that is how the whole composition shifts elegantly when one item opens

This is critical and should be reproduced.

==================================================
7) ANIMATION / TRANSITION MODEL
==================================================

Found transition rule:

.scheme.scheme-4-view .scheme-layout-col {
   transition:
     width 0.3s ease-out,
     transform 0.3s ease-out,
     top 0.3s ease-out,
     left 0.3s ease-out,
     bottom 0.3s ease-out,
     right 0.3s ease-out;
}

Interpretation:
- card animation is driven primarily by:
  - width
  - transform
  - positional offsets
- not just opacity
- open/close movement is physically repositioning the cards

==================================================
8) CARD FACE / BACKGROUND STYLING
==================================================

Found the background styling:

.scheme-layout-col .background {
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: #ffffff;
   border: 1px solid #99C2D4;
   box-shadow: -0.3em 0.4em 0.2em 0 rgba(68, 113, 150, 0.14);
   border-radius: 0.5em;
   transition: transform 0.3s ease-out;
   will-change: transform;
   pointer-events: none;
   backface-visibility: hidden;
}

Interpretation:
- the visible face of each card is a real white pane with:
  - light blue border
  - subtle blue-tinted shadow
  - soft radius
- this likely becomes the diamond because of the surrounding transform system

==================================================
9) TITLE TRANSFORM SYSTEM
==================================================

The title is not laid out normally. It is counter-transformed to appear readable inside the skewed/rotated geometry.

Found:

.scheme-layout-col .title {
   display: flex;
   align-items: center;
   justify-content: center;
   width: 130%;
   height: 100%;
   text-align: center;
   padding: 1em;
   font-family: "FormaDJRDeck", sans-serif;
   position: relative;
   transform: rotate(58deg) skew(13deg, -13deg) scale(0.77, 1.389) translate(-10%, 10%) translateZ(0);
   line-height: 1.2;
   font-weight: 400;
   font-size: 23px;
   user-select: none;
}

And for the 4-view titles:

.scheme.scheme-1-view .scheme-layout-col .title,
.scheme.scheme-4-view .scheme-layout-col .title {
   transition: color 0.15s ease-out 0.15s;
   user-select: none;
}

Interpretation:
- the parent card is transformed
- the title is counter-transformed back so it looks upright to the viewer
- this is one of the keys to matching the exact feel

==================================================
10) TITLE BEHAVIOR WHEN OPEN
==================================================

When a card becomes active, the title is not removed — it becomes transparent.

Found:

.scheme.scheme-1-view .scheme-layout-col.active .title,
.scheme.scheme-4-view .scheme-layout-col.active .title {
   color: transparent;
   transition-delay: 0s;
}

Interpretation:
- the original title fades out
- the expanded plaintext content becomes the visible content
- likely the plaintext block contains its own heading (h3), which effectively replaces the title visually

==================================================
11) PLAINTEXT CONTENT BEHAVIOR
==================================================

The expanded content exists in the DOM but is hidden until the card is active.

Found:

.scheme-layout-col .plaintext {
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
   width: 130%;
   height: 100%;
   transform: rotate(58deg) skew(13deg, -13deg) scale(0.77, 1.389) translate(-10%, 10%) translateZ(0);
   overflow: hidden;
   opacity: 0;
   pointer-events: none;
   transition: opacity 0.15s ease-out 0s;
   position: absolute;
   top: 0;
   left: 0;
   padding: 1em 2em 5em;
   font-size: 18px;
   line-height: 1.5;
}

And when active:

.scheme-layout-col.active .plaintext {
   opacity: 1;
   pointer-events: auto;
   transition-delay: 0.3s;
}

Interpretation:
- content is fully hidden in the closed state
- content fades in after a short delay
- that delay likely allows the card resize/move animation to begin first
- this staged reveal is important to the polished interaction feel

Residential additionally uses:
- `.plaintext.has-columns`
This likely turns the list into two columns in the expanded state. Please recreate that behavior.

==================================================
12) ICON POSITIONING
==================================================

The plus icon is also counter-transformed and manually positioned.

Found:

.scheme-layout-col .icon {
   width: 1em;
   height: 1em;
   border-radius: 50%;
   background-color: transparent;
   color: #000000;
   bottom: 22%;
   left: 23.5%;
   display: flex;
   align-items: center;
   justify-content: center;
   position: absolute;
   transform: rotate(58deg) skew(13deg, -13deg) scale(0.77, 1.389) translate(-10%, 10%) translateZ(0);
   opacity: 1;
   transition: background-color 0.3s ease-out, color 0.3s ease-out, bottom 0.3s ease-out, left 0.3s ease-out;
}

Interpretation:
- the plus icon is not simply centered with normal layout
- it is carefully placed to align visually within the transformed card
- there may also be an active-state change for the icon, even though we did not fully capture it

==================================================
13) ACCESSIBILITY / DOM STATE CLUES
==================================================

The title span contains:
- aria-expanded="false"
- aria-haspopup="true"
- aria-controls="..."
- role="heading"
- aria-level="3"

The content block contains:
- aria-hidden="true"
- aria-labelledby="..."

This strongly suggests:
- clicking a card should toggle aria-expanded on the title/control
- clicking a card should toggle aria-hidden on the content
- keyboard access matters
- the cards are focusable (tabindex="0")

Please preserve and improve accessibility:
- semantic buttons or button-like triggers
- aria-expanded
- aria-controls
- focus styling
- Enter/Space support
- reduced motion support

==================================================
WHAT I NEED YOU TO BUILD
==================================================

Please recreate this as a clean component with the same behavior model:

- 4 interactive diamond cards in a 2x2 geometric arrangement
- transformed outer plate behind them
- cards are absolutely positioned with per-card base positions
- clicking one card:
  - sets that card active
  - enlarges it from ~32% to ~68%
  - moves it to a custom expanded position
  - adds an active-col-X class (or equivalent state) to the parent row
  - repositions the non-active cards subtly
  - fades the title to transparent
  - fades in the hidden plaintext content after a slight delay
- only one card can be open at a time
- clicking the open card again closes it
- preserve the premium minimal visual feel:
  - white diamond faces
  - light blue border
  - soft bluish shadow
  - elegant motion
- on mobile, simplify if needed rather than forcing the exact desktop geometry

==================================================
IMPLEMENTATION PREFERENCES
==================================================

Please DO NOT try to literally reproduce minified source.
Instead:
- infer the cleanest architecture
- preserve the actual behavior we discovered
- keep class naming clean and understandable
- use modern CSS and lightweight JS
- create a maintainable implementation

Please provide:
1. HTML
2. CSS
3. JS
4. a brief explanation of how your recreated state system maps to the inspected behavior

Also, if you think a cleaner architecture would match the same visual/behavior result better than the original implementation, do that — but do not lose the look and motion logic described above.