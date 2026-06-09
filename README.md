# Earnergy Kofe

Immersive web experience starter — React, TypeScript, Tailwind CSS, Three.js, and motion tooling pre-wired.

## Stack

| Layer | Tools |
| --- | --- |
| Core | React 19, TypeScript, Vite |
| Styling | Tailwind CSS v4 |
| 3D | Three.js, React Three Fiber, Drei |
| Motion | GSAP, ScrollTrigger, Lenis |
| State | Zustand |
| Dev controls | Leva (development only) |

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # ESLint
```

## Structure

```
src/
├── components/
│   ├── canvas/     # R3F scene & experience
│   ├── layout/     # Hero, scroll wrapper, page sections
│   └── ui/         # Reusable UI primitives
├── hooks/          # Lenis, GSAP context helpers
├── lib/            # GSAP plugin registration
└── stores/         # Zustand stores
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). In development, use the Leva panel to tweak 3D scene values live.
