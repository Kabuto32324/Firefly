# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Firefly is a modern, beautiful Astro-based static blog theme template, forked from [fuwari](https://github.com/saicaca/fuwari). Built with Astro 6, Svelte 5, and Tailwind CSS 4.

## Tech Stack

- **Framework**: Astro 6.4.2 with Svelte integration
- **Styling**: Tailwind CSS 4.3.0
- **Language**: TypeScript 5.9.2
- **Package Manager**: pnpm (enforced via `preinstall` hook)
- **Linter/Formatter**: Biome 2.4.15
- **Deployment**: Cloudflare Workers (via wrangler)

## Common Commands

```bash
# Development
pnpm dev                    # Start dev server at localhost:4321
pnpm build                  # Production build (generates icons, LQIP, builds, indexes with Pagefind)
pnpm preview                # Preview production build

# Code Quality
pnpm check                  # Run Astro type checking
pnpm format                 # Format code with Biome
pnpm lint                   # Lint code with Biome

# Content
pnpm new-post <filename>    # Create a new blog post
pnpm new-post <filename> --folder <subfolder>  # Create post in subfolder

# Icons & Images
pnpm icons                  # Generate icon sprite
pnpm lqips                  # Generate low-quality image placeholders
```

## Architecture

### Configuration System

All site configuration lives in `src/config/` with a central `index.ts` barrel export. Key config files:

- `siteConfig.ts` - Core site settings (title, URL, theme, pages, analytics)
- `sidebarConfig.ts` - Sidebar layout (single/dual sidebars, widget placement)
- `navBarConfig.ts` - Navigation bar customization
- `backgroundWallpaper.ts` - Background wallpaper settings
- `profileConfig.ts` - User profile/avatar settings

### Component Structure

```
src/components/
├── layout/       # Core layout: Navbar, SideBar, Footer, PostCard, PostPage
├── controls/     # UI controls: Search, LightDarkSwitch, BackToTop, FloatingTOC
├── common/       # Reusable: ButtonTag, Pagination, ImageWrapper, Markdown
├── features/     # Feature modules: MusicPlayer, Live2DWidget, SpineModel, SakuraEffect
├── widget/       # Sidebar widgets: Profile, Calendar, SiteStats, Tags, Categories
├── pages/        # Page-specific: bangumi/, gallery/
├── comment/      # Comment systems: Giscus, Twikoo, Waline, Artalk, Disqus
├── analytics/    # Analytics: Google, Umami, 51la, MicrosoftClarity
├── misc/         # License, RecommendedPost, SharePoster
```

### Content System

- Posts: `src/content/posts/` (Markdown with frontmatter)
- Special pages: `src/content/spec/` (about, guestbook)
- Content config: `src/content.config.ts` defines schemas

### Markdown Extensions

Custom remark/rehype plugins in `src/plugins/`:
- `remark-image-grid.js` - Image grid layouts
- `remark-mermaid.js` / `remark-plantuml.js` - Diagram support
- `rehype-component-github-card.mjs` - GitHub repo cards
- `rehype-email-protection.mjs` - Email obfuscation
- `rehype-external-links.mjs` - External link handling

### i18n

Multi-language support (zh_CN, zh_TW, en, ja, ru) via `src/i18n/`. Translation keys defined in `src/i18n/i18nKey.ts`.

### Layout System

The theme supports multiple layout modes configured in `sidebarConfig.ts`:
- Single/dual sidebars
- Grid (multi-column) and waterfall layouts
- Configurable via `postListLayout` in `siteConfig.ts`

### Deployment

Deployed to Cloudflare Workers. Build process:
1. `generate-icons.js` - Generates icon sprite
2. `generate-lqips.ts` - Creates LQIP placeholders
3. `astro build` - Static site generation
4. `pagefind --site dist` - Search index generation

## Code Style

- Biome formatter with tab indentation, double quotes
- Conventional Commits format for git messages
- No unused imports (enforced by Biome)
- Svelte components use TypeScript
