# CYB Dept. — Cybersecurity Department Portal

Student portal for the Department of Cybersecurity, University of Uyo.

## Tech Stack
- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui (Radix primitives)
- React Router v6 (SPA)
- Gemini 1.5 Pro API (AI tutoring + lab analysis)
- localStorage for all persistence (XP, bookmarks, exam notes, roadmap progress)

## Architecture
Pure frontend SPA — no backend, no database, no authentication.
All data is stored in the browser's localStorage.

## Environment Variables
| Variable | Required | Purpose |
|---|---|---|
| `VITE_GEMINI_API_KEY` | For AI features | Gemini API key from https://aistudio.google.com/app/apikey |

The app runs without the key — AI features show a friendly error message instead of crashing.

## Pages & Routes
| Route | Page | Description |
|---|---|---|
| `/welcome` | Welcome | Landing page (root `/` redirects here) |
| `/lab` | Lab | Dashboard with lab cards and AI search |
| `/playground` | Playground | 6 interactive labs (Caesar, SQL, Hash, XSS, Network, Password) |
| `/ask` | Ask Anything | Chat-based AI tutor (Gemini) |
| `/exam-prep` | Exam Prep | Saved exam notes from AI interactions |
| `/cbt-prep` | CBT Prep | Multiple choice practice (PHY 111, SEN 211, CYB 212, CYB 213) |
| `/opportunities` | Opportunities | Hackathons, internships, scholarships with bookmarks |
| `/roadmap` | Roadmap | 4-level learning path (100L–400L) with milestone tracking |
| `/resources` | Resources | Curated cybersecurity tools and learning platforms |
| `/about` | About | Department info, programme details, admission requirements |
| `/staff` | Staff | Faculty and staff profiles with filter tabs |
| `/showcase` | Showcase | Student project gallery with likes and submission form |

## Key Files
- `src/App.tsx` — Router config
- `src/components/AppSidebar.tsx` — Navigation sidebar with XP display
- `src/components/XPContext.tsx` + `src/hooks/useXP.ts` — XP/ranking system
- `src/lib/gemini.ts` — Lab analysis AI service
- `src/lib/gemini-chat.ts` — Chat AI service
- `src/lib/storage.ts` — Safe localStorage utilities

## Development
- Port: 5000
- Start: `npm run dev`
- Build: `npx vite build`
- Tests: `npx vitest run`
- Type check: `npx tsc --noEmit`

## UI/UX Enhancements (completed)
- Sidebar navigation grouped into sections: Learn, Practice, Explore, Department
- XP toast notifications on every XP gain + rank-up celebration toasts
- Copy buttons on all AI panel sections (concept, explanation, example, defense, exam bullets)
- Save-to-exam-prep toast feedback across AiPanel and AskAnything
- Bookmark toast feedback on Opportunities page
- Delete toast on Exam Prep notes
- Playground lab metadata: difficulty badges (Beginner/Intermediate/Advanced), estimated time, descriptions
- Improved Exam Prep empty state with CTAs linking to labs and AI tutor
- ErrorBoundary component wrapping entire app for graceful crash recovery
- Accessibility improvements: aria-labels on sidebar toggle and close buttons

## Audit Notes (completed)
- Supabase integration removed (was unused, empty schema, hardcoded credentials)
- Login/Signup links removed (no auth system exists)
- React Query removed (was unused)
- `next-themes`, `lovable-tagger` removed (unused)
- localStorage reads hardened with safe fallback parsing
- Gemini error handling improved with user-friendly messages
- `saveToExamPrep` centralized in `src/lib/storage.ts` (deduplicated from AiPanel + AskAnything)
- 26 tests covering XP calculations, storage helpers, and Gemini error handling
