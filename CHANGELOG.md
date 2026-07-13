# Changelog

All notable changes to this project are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/), and this
project follows [Semantic Versioning](https://semver.org/).

## [1.4.1] — 2026-07-14
### Changed
- Sparkles now float across the whole heart (dark part too), gently drifting upward,
  instead of appearing only inside the water.

## [1.4.0] — 2026-07-14
### Added
- Twinkling star sparkles inside the water (flash and fade).
- 3D volume: soft glass highlight on top + inner edge vignette.

## [1.3.0] — 2026-07-14
### Added
- Second translucent wave behind the main one — water gets visual depth.
- Donation "thump": on a new donation the heart itself kicks harder (one-off scale pulse).
- Droplets now glow softly, visible over bright water too.

## [1.2.0] — 2026-07-14
### Added
- Waves now splash in sync with the heartbeat (amplitude jumps on each beat).
- Droplets fly off the wave crests on strong beats and fall back.
- Rare sparkles rise from the water surface and fade.
- Donation burst: when the raised amount grows, a big one-off splash — high wave,
  extra droplets, bright glow on the outline and water line.

## [1.1.1] — 2026-07-07
### Changed
- Restyled the percentage inside the heart: thin clean font (Montserrat ExtraLight), smaller, understated and exactly centered. Replaced the decorative script font.

## [1.1.0] — 2026-07-07
### Added
- Collected percentage shown **inside the heart** in a decorative font (Pacifico). Hide with `&percent=0`.
### Changed
- Config file renamed to `link.txt` (from `goal-link.txt`); template `link.example.txt`. Just paste the link — no comments.

## [1.0.1] — 2026-07-07
### Changed
- Renamed files to English: config file is now `goal-link.txt` (from `ссылка-на-сбор.txt`),
  template `goal-link.example.txt`.
- The link file now contains just the link — no comments needed.
- Removed the redundant `ИНСТРУКЦИЯ.txt` (the bilingual README covers everything).

## [1.0.0] — 2026-07-07
### Added
- Neon heart widget that fills with animated water as a DonationAlerts goal progresses.
- Live goal data via a lightweight local helper (`server.js`); token/goal read from `goal-link.txt`.
- OBS integration: `heart-helper.lua` starts the helper together with OBS; the helper
  shuts itself down ~15 s after OBS closes (no background process when not streaming).
- Visual effects: subtle heartbeat pulse, synced glow burst (inner + outer), slow inner light shimmer.
- Goal title and amount display; switch collection by editing a single text file (no restart).
- Widget URL options: `size`, `title`, `pulse`, `level`.
- Self-contained widget (`heart-obs.html`) with the image embedded — one file, no external assets.
- Alternative pure-CSS method (`obs-heart.css`) that needs no helper (stylised water, not the image).
