# Smart IT Solutions design

This file records the visual direction. Read it before changing UI. The tokens live in `src/styles/tokens.css`.

## World: "the studio colour index"

The site is printed like a page from a 1970s corporate identity manual (Otl Aicher's colour system for Munich 1972, Wim Crouwel's grid posters for Total Design): light paper, one black ink and four flat spot inks.

- **Every discipline has an ink, and the ink follows the work.** Web is sky blue, backend is green, mobile is orange, design is pink. The same colour marks the service band, every project tagged with that discipline, and the person who leads it. Colour is never decoration; if something is coloured, it belongs to a discipline.
- **The bands are the image.** Under the headline, the four disciplines are set as full-bleed flat colour bands that step in one column each, like a printed spectrum. Each band overlaps the one above by a few pixels with `mix-blend-mode: multiply`, so the overlap prints as a third colour, the way a screen-print trap does.
- **Wide type.** Headlines and band names use Mona Sans at width 112–125%, which reads like Univers Extended on a poster. Body text stays at normal width.
- **A strict asymmetric grid.** 12 columns from 900px. The hero headline takes columns 1–9 and a short info column takes 10–12. The project index uses columns 1–7 for the list and 8–12 for a sticky screenshot preview.
- **Rules not boxes.** A 2px ink rule opens each section; 1px tint rules separate rows. Nothing is boxed or carded.
- **Duotone people.** Team photos are greyscale and multiplied onto their discipline's ink, like a two-colour print.

**Mode: Persuade, briefly.** A business owner should get what we do, see real work and reach us in under a minute. One primary action: start a project.

## Scene

A small-business owner at a desk during work hours, comparing two or three studios in browser tabs. Daylight, so light paper is the default. A dark variant exists for evening reading and follows the system setting unless the visitor picks one.

## Colour (primary ink ≥8:1, secondary ink ≥7:1; verified with `contrast.py`)

| role         | light     | dark      | notes                                     |
| ------------ | --------- | --------- | ----------------------------------------- |
| `--paper`    | `#F2F2EE` | `#131614` | cool, not cream                           |
| `--ink`      | `#111412` | `#ECEDE8` | 16.5:1 / 15.5:1                           |
| `--ink-2`    | `#505250` | `#A0A29E` | 7.0:1 / 7.1:1, the lightest that passes   |
| `--on-spot`  | `#111412` | `#111412` | text on a spot field, same in both themes |
| `--spot-web` | `#74B8EC` |           | 8.7:1 with `--on-spot`                    |
| `--spot-api` | `#5EC283` |           | 8.4:1                                     |
| `--spot-app` | `#F79E4C` |           | 8.8:1                                     |
| `--spot-ui`  | `#F5AECB` |           | 10.4:1                                    |

- Spot inks are fields and marks only. They are never used as text colour on paper.
- On a spot field, all text is `--on-spot` at full strength. There is no secondary ink on spot fields (it would need 87% ink to reach 7:1, which reads the same).
- Tints (`--rule`, `--paper-2`) are mixed from paper and ink with `color-mix()`. Never hard-code them.

## Type

- **One variable family: Mona Sans**, self-hosted via `@fontsource-variable/mona-sans/wdth.css`, with weight 200–900 and width 75–125%.
    - Wordmark: 800, width 125%.
    - Hero headline: 500, width 125%, tracking −0.035em, line-height 0.95.
    - Band names and section titles: 700, width 118%.
    - Project titles: 650, width 112%.
    - Body: 400, width 100%. Years and counts use tabular figures.
- **Nothing renders below 14px.** The small scale is 14 / 15 / 16px; body is 18px; supporting text in the hero info column is 18px.
- Labels are sentence case. No tracked uppercase eyebrows, no section numbers.

## Grid & space

- 12 columns from 900px, 24px gutter, page margin `clamp(16px, 4vw, 56px)`, measure capped at 1440px. The colour bands ignore the cap and run to the right edge of the viewport.
- Tight inside a group, generous between sections (`--space-section`).

## Shape, depth & motion

- Square corners everywhere; form controls get 2px. No shadows at all.
- One authored motion moment: on first load the bands print in from the left (scaleX, staggered by 90ms). The project preview cross-fades in 180ms. `prefers-reduced-motion` turns both off.

## Icon & favicon

- No icon font. The few icons (external link arrow) are inline SVG in `currentColor`.
- The favicon is the bands in miniature: four stepped stripes on paper.

## Content rules

- Real projects only, with real years from GitHub. A project whose live site is down says so and links to its source instead.
- No invented testimonials, numbers or clients.

## Refuse

Gradients, glass or blur, cards and tiles, stat tiles, eyebrow labels, pill chips, icon-per-heading, emoji, centred hero, particles, fade-up on scroll, spot inks used as text colour, more than one typeface, and shadows.
