# Pixi for Python

Slidev deck for the PyHEP Dev summit presentation.

## Run it (with pixi)

```bash
pixi run start    # http://localhost:3030
pixi run build    # static site to ./dist
pixi run export   # PDF export
```

`pixi` will fetch `nodejs` and `pnpm` and run `pnpm install` for you on first run.

## Run it (without pixi)

```bash
pnpm install
pnpm run dev
```

## Files
- `slides.md`, the deck itself
- `slidev-theme-tufte/`, local theme (cream paper, serif, restrained)
- `components/`, small Vue helpers
- `public/`, images referenced as `/foo.png`
- `assets/`, diagrams referenced via relative paths in slides

## Images to drop into `public/`
- `ruben.jpg`, speaker photo
- `robotics-job.jpg`, old robotics gig (optional click step on *Who am I?*)

The deck renders fine without them; missing images are hidden via `onerror`.
