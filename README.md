# Personal Site

A production-ready personal portfolio website built with Next.js 14, designed for a young startup builder / student founder profile.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS + shadcn/ui components
- **Content:** MDX + frontmatter (Git-based)
- **CMS:** Decap CMS (admin panel at `/admin`)
- **i18n:** next-intl (English + Czech)
- **Animations:** Framer Motion
- **Deployment:** GitHub Pages (static export)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npx serve out
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Folder Structure

```
personal-site/
├── content/                    # All editable content (MDX + frontmatter)
│   ├── projects/               # Project entries
│   ├── work/                   # Work / mentorship entries
│   ├── photography/            # Photography albums
│   ├── timeline/               # Timeline events
│   └── pages/                  # Static page content
├── public/
│   ├── admin/                  # Decap CMS (config.yml + index.html)
│   └── images/                 # Uploaded images
├── src/
│   ├── app/
│   │   ├── [locale]/           # All locale-prefixed pages
│   │   │   ├── about/
│   │   │   ├── projects/
│   │   │   ├── work/
│   │   │   ├── photography/
│   │   │   ├── timeline/
│   │   │   ├── contact/
│   │   │   └── sections/       # Home page sections
│   │   ├── layout.tsx          # Root layout (fonts, metadata)
│   │   └── page.tsx            # Root redirect → /en
│   ├── components/
│   │   ├── ui/                 # Base UI (button, card, badge, separator)
│   │   ├── navigation.tsx
│   │   ├── footer.tsx
│   │   ├── project-card.tsx
│   │   ├── work-card.tsx
│   │   ├── photo-card.tsx
│   │   ├── timeline-entry.tsx
│   │   ├── lightbox.tsx
│   │   ├── filter-bar.tsx
│   │   ├── cursor-glow.tsx
│   │   ├── page-transition.tsx
│   │   ├── section.tsx
│   │   └── mdx-content.tsx
│   ├── i18n/                   # Internationalization config
│   ├── lib/                    # Utilities, types, content reader
│   └── messages/               # Translation files (en.json, cs.json)
├── .github/workflows/          # GitHub Actions deployment
└── next.config.mjs
```

## Adding New Content

### Via Decap CMS (recommended)

1. Navigate to `yourdomain.me/admin`
2. Log in with your GitHub account
3. Select a collection (Projects, Work, Photography, Timeline)
4. Click "New" and fill in the fields
5. Save — the CMS commits directly to your repository
6. GitHub Actions auto-rebuilds and deploys

### Via File System

Create a new `.mdx` file in the appropriate `content/` subdirectory.

**Example — new project:**

```
content/projects/my-new-project.mdx
```

```mdx
---
title: "My New Project"
date: "2025-03"
location: "Prague"
category: "startup"
tags: ["saas", "b2b"]
coverImage: "/images/my-project.jpg"
excerpt: "Short description of the project."
language: "en"
featured: true
startup: "StartupName"
topic: "Topic Area"
---

Your project content here in **Markdown/MDX** format.
```

## Bilingual Content

The site supports English (primary) and Czech (secondary).

- **URL format:** `/en/projects`, `/cs/projects`
- **UI strings:** Edit `src/messages/en.json` and `src/messages/cs.json`
- **Content language:** Set `language: "en"` or `language: "cs"` in frontmatter
- **Fallback:** If a Czech translation is missing, English is shown

## Deploying to GitHub Pages

### Initial Setup

1. Create a GitHub repository
2. Update `public/admin/config.yml`:
   - Change `repo: YOUR_USERNAME/YOUR_REPO` to your actual repo
3. Push the code to GitHub
4. Go to **Settings → Pages → Source → GitHub Actions**
5. The included workflow (`.github/workflows/deploy.yml`) handles everything

### Custom Domain

1. In GitHub repo settings → Pages, add your custom domain (e.g. `yourname.me`)
2. Configure DNS: add a CNAME record pointing to `YOUR_USERNAME.github.io`
3. Enable "Enforce HTTPS"

### Manual Deployment

```bash
npm run build
# Static files are in the ./out directory
# Upload to any static hosting
```

## CMS Setup (Decap CMS)

1. Edit `public/admin/config.yml` with your GitHub repo
2. Register a GitHub OAuth app at https://github.com/settings/developers
3. Or use Decap CMS's built-in GitHub auth (recommended)
4. Access the admin panel at `/admin` on your deployed site

## Customization

- **Colors:** Edit CSS variables in `src/app/globals.css`
- **Fonts:** Edit `src/lib/fonts.ts`
- **Navigation:** Edit `src/components/navigation.tsx`
- **Social links:** Edit `src/components/footer.tsx` and contact/about pages
- **Translations:** Edit JSON files in `src/messages/`

## Performance

- Fully static (no server needed)
- All pages pre-rendered at build time
- Lazy-loaded images
- Optimized fonts via `next/font`
- Target: Lighthouse 90+
