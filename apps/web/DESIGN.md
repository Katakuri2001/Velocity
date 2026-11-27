# Velocity — Noir editorial design system

Direction: deep black stage, warm ivory editorial breaks, champagne gold as a thin foil line only. No brass, no violet, no pink, no gradients, no borrowed TikTok imagery.

## Tokens

- Background: `#050505` (primary), `#0a0a0a` (well), `#141414` (card)
- Border / hairline: `#262626`
- Text: ivory `#f5f0e8`, secondary `#a6a39c`
- Editorial break: ivory `#f5f0e8`, ink `#111111`, body `#3d3a35`
- Foil: `#c9a86a` — 1px rules, small-caps labels, one CTA outline; never a large fill

## Type

- Display: Playfair Display italic for short headlines (2–5 words), one per section
- Body: Inter / system sans, 16px+, line length under 80 characters
- Small caps: 0.7rem, wide tracking, foil on dark, ink on ivory

## Components

- Card: `#141414` surface, 1px `#262626` border, hover scale 1.02 + gold 40% border over 0.4s
- Primary CTA: foil text, 1px foil border, dark fill; never a solid gold block
- Toggle: preserve PR #2 contrast — active `#111111` on `#ffffff`
- Price: `Price on enquiry` when unset; NULL specs read `To be confirmed`

## Motion

- Reveal: opacity 0→1, y 16→0, 0.8s ease-out, staggered 0.08s, once per section
- `MotionConfig reducedMotion="user"` in Shell; reduced motion renders content instantly
- Intro: letter stagger 0.06s, foil sweep, car scale 1.05→1.0, total ≤2.2s; Skip always visible
- No looping hero animation, no autoplay video, no carousel

## Numbers

Only verified values appear in count-ups. This branch ships 11 vehicles, 4 categories, 1 showroom. The expanded 26-car catalog is PR #7 and is not merged here.
