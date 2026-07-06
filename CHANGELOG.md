# Changelog

All notable changes to this project are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/), and this
project follows [Semantic Versioning](https://semver.org/).

## [1.0.0] — 2026-07-07
### Added
- Neon heart widget that fills with animated water as a DonationAlerts goal progresses.
- Live goal data via a lightweight local helper (`server.js`); token/goal read from `ссылка-на-сбор.txt`.
- OBS integration: `heart-helper.lua` starts the helper together with OBS; the helper
  shuts itself down ~15 s after OBS closes (no background process when not streaming).
- Visual effects: subtle heartbeat pulse, synced glow burst (inner + outer), slow inner light shimmer.
- Goal title and amount display; switch collection by editing a single text file (no restart).
- Widget URL options: `size`, `title`, `pulse`, `level`.
- Self-contained widget (`heart-obs.html`) with the image embedded — one file, no external assets.
- Alternative pure-CSS method (`obs-heart.css`) that needs no helper (stylised water, not the image).
