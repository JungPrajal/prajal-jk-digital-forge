

# Retro CRT Terminal for the About Section

## Overview
Create a new `RetroTerminal.tsx` component styled as a physical CRT monitor with scanline overlay, barrel-bulge distortion, and green monospaced auto-typing text. Integrate it into the existing `EducationSection` (which serves as the "About" section) alongside the current education card.

## Component: `src/components/RetroTerminal.tsx`

### Auto-Typing Engine
- Store "About Me" text as an array of terminal-style lines (e.g., `$ cat about.txt`, followed by bio paragraphs about Prajal).
- Use a character-by-character typing effect with `useState`/`useEffect`, ~50ms per character, with a blinking green cursor (`█`).
- After all lines are typed, pause 3 seconds, then reset and loop.

### CRT Visual Effects
- **Scanline overlay**: A pseudo-element or overlay div with repeating linear gradient (`transparent 50%, rgba(0,0,0,0.3) 50%`) at 2-3px intervals, `pointer-events: none`.
- **Barrel bulge distortion**: CSS `filter` isn't sufficient, so use a subtle CSS trick: apply a very slight `border-radius` on the screen area combined with `box-shadow: inset` to fake curvature, plus a radial gradient overlay that darkens edges (vignette). For actual distortion, we can use a small SVG `<filter>` with `feTurbulence` or simply rely on the visual illusion.
- **Screen glow**: Multi-layered `box-shadow` in green (`0 0 30px rgba(0,255,0,0.15)`) to simulate phosphor glow.
- **Flicker**: A subtle CSS animation that varies opacity between 0.97-1.0 rapidly.

### 3D Monitor Frame
- Thick dark-grey bezel (`bg-gray-800/bg-gray-900`) with rounded corners and inner shadow.
- Monitor stand and base below (similar to existing `DeskSetup3D` pattern).
- Perspective transform matching the Cyber-LoFi room aesthetic.

### Color Palette
- Screen background: near-black with slight green tint (`#0a120a`)
- Text: classic terminal green (`#00ff41`)
- Commands (`$`): brighter green
- Output lines: slightly dimmer green
- Bezel: dark greys matching `CyberRoom` palette

## Integration: `src/pages/Index.tsx`

- Import `RetroTerminal` into the `EducationSection`.
- Restructure the section into a two-column layout (on `md+`): the CRT terminal on the left, the existing education card on the right.
- On mobile, stack vertically: terminal on top, education card below.
- Update section title from "Education" to "About Me" to match the nav label.

## CSS: `src/index.css`

- Add `@keyframes scanlineScroll` for a moving scanline bar effect.
- Add `@keyframes crtFlicker` for the subtle opacity flicker.
- Add `.crt-screen` utility class combining the scanline overlay and effects.

## Files to Create/Modify
1. **Create** `src/components/RetroTerminal.tsx` — the full CRT terminal component
2. **Modify** `src/pages/Index.tsx` — integrate terminal into EducationSection, two-column layout
3. **Modify** `src/index.css` — add CRT keyframes and utility classes

