# 🍷 Mood&Food — Premium Restaurant Website

A fully responsive, production-ready static restaurant website built with pure HTML5, CSS3, and Vanilla JavaScript. Designed to match the quality of premium WordPress restaurant themes.

## 📁 Project Structure

```
moodfood/
├── index.html          ← Home page
├── menu.html           ← Full dining menu
├── reservation.html    ← Accessible booking form
├── about.html          ← Restaurant story & team
├── styles.css          ← Complete stylesheet (WCAG AA)
├── main.js             ← JavaScript features
└── assets/
    └── images/         ← Drop local images here
         ├── hero.jpg
         ├── dish1.jpg
         ├── dish2.jpg
         ├── dish3.jpg
         └── interior.jpg
```

## 🚀 Deployment (GitHub Pages)

1. Create a new GitHub repository
2. Upload all files preserving the folder structure
3. Go to Settings → Pages → Source: `main` branch → `/ (root)`
4. Your site will be live at `https://yourusername.github.io/repo-name`

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#8B2635` | Headings, buttons, brand |
| `--color-accent` | `#C8965A` | Decorative gold highlights |
| `--color-accent-dark` | `#A0722A` | Interactive text links |
| `--color-bg` | `#FAFAF8` | Page background |
| `--font-heading` | Playfair Display | All headings |
| `--font-body` | Inter | Body text |

## ♿ Accessibility Features (WCAG 2.1 AA)

- ✅ Skip-to-content link on every page
- ✅ Semantic HTML5 landmarks (header, nav, main, section, footer)
- ✅ Proper heading hierarchy (h1 → h2 → h3, no skipping)
- ✅ Descriptive alt text on all images
- ✅ Visible focus states (`:focus-visible` outlines)
- ✅ Full keyboard navigation support
- ✅ ARIA labels on all interactive elements
- ✅ `aria-live` regions for form feedback
- ✅ `role="alert"` for error messages
- ✅ `aria-expanded` on mobile nav toggle
- ✅ Focus trap in mobile menu
- ✅ Contrast ratios: primary text > 10:1
- ✅ `prefers-reduced-motion` respected
- ✅ Breadcrumb navigation with aria
- ✅ Fieldset + legend on form groups

## 🔎 SEO Features

- Unique `<title>` tag per page
- `<meta name="description">` per page
- Open Graph tags (og:title, og:description, og:image, og:url)
- Twitter Card tags
- `<link rel="canonical">` per page
- Semantic HTML structure
- `lang="en"` on html element

## ⚙️ JavaScript Features

- Sticky header with scroll shadow
- Mobile hamburger menu with focus trap
- Scroll reveal animations (IntersectionObserver)
- Active nav link highlighting
- Menu category filter tabs
- Reservation form validation (real-time + on-submit)
- Accessible error/success messages
- Date picker (min = today)
- Smooth scrolling for anchors
- Keyboard Escape to close mobile menu

## 🖼️ Images

The site uses Unsplash CDN images by default for demo purposes. Replace them with your own by:
1. Adding your images to `assets/images/`
2. Updating `src` attributes in HTML files

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|-----------|--------|
| > 1024px | Full desktop with sidebar |
| 768–1024px | Tablet — stacked layouts |
| < 768px | Mobile — hamburger nav |
| < 480px | Small mobile — single column |

---

Built with ❤️ — HTML5, CSS3, Vanilla JS only. No frameworks, no build tools.
