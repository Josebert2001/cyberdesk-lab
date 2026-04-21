

# What's Missing in CyberDesk

The app looks polished on the surface, but several key pieces from your earlier requests were never wired up. Here's the gap analysis and a plan to close it.

## Gaps Found

**1. Authentication (requested earlier, never built)**
- No `/login` or `/signup` pages
- No auth context / `useAuth` hook
- No auth guard — every page is publicly accessible
- "Enter Portal" / "Get Started" on the Welcome page jump straight to `/lab` with no login wall
- No logged-in user name in the sidebar
- No logout button

**2. Database is empty**
- Supabase is connected (`vigyojlssthgvefqjqyw`) but **zero tables exist**
- The schema you provided (`profiles`, `sessions`, `lab_progress`, `exam_bullets`) was never created
- XP, rank, saved exam bullets, and lab progress all live only in `localStorage` — they vanish across devices and browsers

**3. Welcome page polish**
- "Enter Portal" button in the top nav should route to `/login` (not `/lab`) once auth exists
- No "Login" link for returning users — only a single CTA

**4. Minor cleanup**
- React Router v6 future-flag warnings in console (harmless but noisy)
- `MatrixRain` is rendered inside the `Lab` page's centered container, so it's clipped to `max-w-4xl` instead of filling the viewport

## Plan

### Step 1 — Create the database schema
Migration adds 4 tables with RLS:
- `profiles` (id, name, year, department, xp, rank, created_at) — auto-created via trigger on signup
- `sessions` (id, user_id, topic, lab_type, exam_bullets jsonb, created_at)
- `lab_progress` (id, user_id, lab_name, completed, score, completed_at)
- `saved_bullets` (id, user_id, topic, bullets jsonb, created_at)

Each table: `enable row level security` + policies so users can only read/write their own rows. Add `handle_new_user()` trigger that inserts a profile row from `auth.users.raw_user_meta_data` (name, year).

### Step 2 — Build auth pages
- `src/pages/Login.tsx` — email/password via `supabase.auth.signInWithPassword`, terminal-styled card matching Welcome
- `src/pages/Signup.tsx` — collects name, email, password, year; uses `signUp` with `emailRedirectTo: window.location.origin + '/welcome'`; shows "Check your email" success state
- Both pages handle errors inline in red, mono font

### Step 3 — Auth context + guard
- `src/contexts/AuthContext.tsx` — `AuthProvider` exposing `user`, `session`, `profile`, `loading`, `signOut`. Uses `onAuthStateChange` first, then `getSession` (correct order to avoid race conditions). Defers profile fetch with `setTimeout(0)` to prevent deadlocks.
- `src/components/AuthGuard.tsx` — redirects unauthenticated users to `/login`; shows skeleton while `loading`
- Wrap all `/lab`, `/playground`, `/ask`, `/cbt-prep`, `/exam-prep`, `/opportunities`, `/roadmap`, `/resources`, `/about`, `/staff`, `/showcase` routes in `<AuthGuard>`
- `/welcome`, `/login`, `/signup` stay public

### Step 4 — Sidebar updates
- Show logged-in user's name (small grey mono text) under the "CYB Dept." header
- Add Logout button at the bottom (door icon + "Logout") — calls `signOut()` then `navigate('/login')`

### Step 5 — Sync XP to the cloud
- Update `XPContext` to read initial XP from `profiles` row when user logs in
- Debounced write-back to `profiles.xp` and `profiles.rank` on changes
- Falls back to localStorage when offline

### Step 6 — Welcome page polish
- Top-nav "Enter Portal" → `/login`
- Add secondary "Sign Up" button next to "Get Started"
- If already logged in, both CTAs route to `/lab` instead

### Step 7 — Minor fixes
- Move `<MatrixRain />` in `Lab.tsx` outside the `max-w-4xl` wrapper so it fills the viewport
- Add React Router v7 future flags to silence the console warnings

## Technical Notes

- Auth uses Supabase's built-in email/password (already enabled by default in Lovable Cloud projects)
- Email confirmation will be ON by default — users must verify before login. Plan includes a note to disable it in Supabase dashboard for faster testing
- All RLS policies use `auth.uid() = user_id` pattern — no recursive policies, no `SECURITY DEFINER` functions needed for this scope
- Profile creation trigger keeps `auth` and `public` schemas in sync automatically
- No roles/admin system needed yet (everyone is a student); can be added later with the `user_roles` + `has_role()` pattern

