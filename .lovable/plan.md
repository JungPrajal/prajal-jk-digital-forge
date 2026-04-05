

# Horizontal Parallax Slider with 3D Tilt & Magnetic Button — Work Section

## Overview
Replace the current Bento Grid layout in the Work/Projects section with a horizontal parallax slider. Each project card will feature scroll-driven parallax physics, a 1.1x scale-up when active, mouse-driven 3D tilt, and a floating magnetic "View Project" button.

## Technical Approach

### 1. Horizontal Parallax Slider (ProjectsSection rewrite)
- Replace the `grid` layout with a horizontally-scrolling container using CSS `overflow-x: auto` and `scroll-snap-type: x mandatory`.
- Each card gets `scroll-snap-align: center` and sits side-by-side with generous gaps.
- Use `IntersectionObserver` (threshold 0.6) on each card to detect the "active" (center) card and apply the 1.1x scale transform.
- Add a parallax offset: cards further from center translate slightly in the opposite scroll direction for depth. This is computed via each card's `getBoundingClientRect()` relative to the viewport center.

### 2. 3D Tilt Effect on Active Card
- Track mouse position within the active card.
- Compute `rotateX` and `rotateY` values (max ~8deg) based on cursor offset from the card center.
- Apply via inline `transform` with `perspective(800px)`.
- Reset smoothly on mouse leave with a spring-like CSS transition.

### 3. Magnetic "View Project" Button
- Inside each project card, render a floating button (absolutely positioned).
- On `mousemove` within the card's hit-box, the button translates toward the cursor using the existing `MagneticButton` component with increased `strength` (~0.5).
- The button replaces any existing "View Project" link and uses the existing `MagneticButton` wrapper.

### 4. Visual Continuity
- Each card continues using `MeshGradientCard` for the glassmorphism background.
- The GitHub CTA cell moves below the slider as a centered standalone link.
- Section header ("Featured Projects") remains above the slider.

## Files to Modify

**`src/pages/Index.tsx`**
- Rewrite `ProjectsSection`: horizontal scroll container with snap, parallax offset logic, IntersectionObserver for active detection.
- Rewrite `BentoProjectCard`: add 3D tilt mouse tracking, 1.1x active scale, integrate `MagneticButton` as floating "View Project" CTA.
- Move GitHub CTA outside the slider.

**`src/index.css`** (minor)
- Add scrollbar-hide utility for the horizontal slider track.

