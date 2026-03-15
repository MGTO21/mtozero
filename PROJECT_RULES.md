# 📖 MTOZERO Project Master Guidelines

This document is the **Ground Truth** for the MTOZERO project. Any developer or AI agent modifying this project **must** adhere to these rules strictly to ensure stability, localization integrity, and architectural consistency.

---

## 🛠 1. Tech Stack Summary
- **Backend**: Laravel 11 (Stateless REST API)
- **Admin Panel**: Filament PHP v3
- **Frontend**: Next.js 14.2 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Animation**: Framer Motion **v11**
- **Database**: PostgreSQL
- **i18n**: `Spatie/Translatable` (Backend) & `next-intl` (Frontend)

---

## 🏗 2. Project Structure
```text
mtozero/
├── api/                # Laravel Backend
├── client/             # Next.js Frontend
│   ├── src/app/[locale]# Localized App Router
│   ├── src/components/ # Shared UI & Header
│   └── messages/       # Translation JSON Files (ar.json, en.json)
└── logo.jpeg           # Project Identity
```

---

## 🖥 3. Backend (Laravel / Filament) Rules

### 💎 Model Translation (Spatie)
- **Rule**: Translatable fields **MUST NOT** be cast to `'array'`.
- **Filament**: Use `Translatable` trait in resources and pages.

---

## 🌐 4. Frontend (Next.js) Rules

### 🌍 i18n & Localization
- **Next-Intl**: Use structured keys (e.g., `title_main`, `title_highlight`) for precise typography control.
- **Dynamic Imports**: Keep `src/i18n/request.ts` pathing robust (`../../messages/${locale}.json`).

### 🎨 Premium Typography & Design
- **Fonts**: Use **Outfit** (Latin) and **Cairo** (Arabic) for high-end tech aesthetics.
- **Bespoke UI**: Avoid generic templates. Use custom SVG visuals, liquid gradients, and grain/noise textures.
- **Arabic Spacing**: Always use higher line-height (`leading-[1.2]` or more) for Arabic text to prevent dot clashing.

### 🎭 Animations
- **Framer**: Use v11 only. Prefer `useScroll` for parallax and staggered entrances.

---

## 🚀 5. Development Workflow
- **Frontend**: `cd client && npm run dev`
- **Backend**: `cd api && php artisan serve`
- **Cache Purge**: `Remove-Item -Recurse -Force .next` on build/link errors.

---

## ⚠️ 6. Critical "Don't" List
- ❌ **Don't** use `leading` values below `1.1` for large Arabic text.
- ❌ **Don't** upgrade `framer-motion` to v12.
- ❌ **Don't** hardcode text; use JSON messages.
- ❌ **Don't** apply motion directly to Next.js `<Link>`.
