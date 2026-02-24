# Indira Gundavarapu — Portfolio

Personal portfolio website.

**Live site:** https://gundavarapuindira25-max.github.io/my-portfolio

---

## About

A portfolio built with vanilla HTML, CSS, and JavaScript. No frameworks, no build tools, just fast, hand-crafted front-end code.

## Features

- **Easter egg terminal** — press `` ` `` or click the hint to open an interactive terminal with commands (`help`, `whoami`, `skills`, `projects`, `contact`, `clear`)
- **Animated pie charts** — skills section rendered as interactive SVG cone charts with per-slice hover effects and fact callouts
- **Project filter** — filter cards by Full-Stack / ML / LLM category
- **Contact form** — wired to Formspree, sends email on submission
- **Custom cursor** — radium green SVG arrow cursor
- **Scroll reveal** — IntersectionObserver-based fade-in animations

## Stack

| Layer | Tech |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (custom properties, grid, flexbox) |
| Logic | Vanilla JavaScript (ES6+) |
| Fonts | JetBrains Mono, Syne (Google Fonts) |
| Contact form | Formspree |
| Resume | Google Drive (PDF export) |
| Hosting | GitHub Pages |

## Structure

```
├── index.html   # Single-page markup
├── style.css    # All styles
├── main.js      # Terminal, pie charts, form, animations
└── .gitignore
```

## Local Development

No build step needed. Just open `index.html` in a browser:

```bash
open index.html
```

Or use any static server:

```bash
npx serve .
```

## Deployment

Hosted on GitHub Pages from the `main` branch. Push changes and the site updates automatically.

---

*Crafted with coffee and curiosity.*
