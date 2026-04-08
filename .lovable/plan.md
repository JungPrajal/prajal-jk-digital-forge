
# Neural Interface Portfolio — Final Phase

## Phase 1: Skill Web (3D Force-Directed Graph)
**Create `src/components/SkillWeb3D.tsx`**
- 3D force-directed graph using `@react-three/fiber` + `@react-three/drei`
- Nodes: Flutter/Dart, PHP/Laravel, Python/Django (per user's skill focus)
- Glowing cyan neon connection lines between related skills
- Hover triggers "neural firing": connected nodes pulse brighter, lines intensify
- `React.memo` wrapped, only renders when in viewport via IntersectionObserver
- Replace current skills display in `Index.tsx`

## Phase 2: Server Blade Gallery (Work Section)
**Create `src/components/ServerBladeCard.tsx`**
- Project cards styled as 3D server blades with metallic edges
- Scroll-triggered "slide out" animation using Framer Motion (translateX from rack)
- Binary code data stream overlay on project images (CSS animation, fades on hover)
- Subtle mechanical sound effect on entrance (Web Audio API, short click sample)
- Replace current project cards in `Index.tsx`

## Phase 3: Enhanced Cursor & Transitions
**Modify `src/components/LiquidCursor.tsx`**
- Add "flashlight" mode: radial reveal of a faint circuit-board SVG texture on background
- Keep existing liquid cursor behavior, layer circuit reveal underneath

**Create `src/components/GlitchTransition.tsx`**
- On link/nav click: momentary CSS `filter` pixelation effect (100ms glitch)
- Applied via a global wrapper component

## Phase 4: System Status Bar
**Create `src/components/SystemStatusBar.tsx`**
- Fixed bottom bar, 10px monospace font
- Displays: `MEM: XX.X% | CPU: XX.X% | CONNECTION: SECURE | UPTIME: XXhXXm`
- Values randomize subtly every 2-3 seconds
- Minimal height (~20px), semi-transparent background

## Phase 5: Performance
- Wrap 3D components in `React.memo` + viewport gating
- Use `dpr={[1, 1.5]}` and `powerPreference: 'high-performance'` on all Canvases
- Lazy-load heavy components with `React.lazy` + `Suspense`

## Files to Create
1. `src/components/SkillWeb3D.tsx`
2. `src/components/ServerBladeCard.tsx`
3. `src/components/GlitchTransition.tsx`
4. `src/components/SystemStatusBar.tsx`

## Files to Modify
1. `src/pages/Index.tsx` — integrate all new components
2. `src/components/LiquidCursor.tsx` — add circuit flashlight
3. `src/index.css` — binary stream animation, circuit texture, glitch keyframes
