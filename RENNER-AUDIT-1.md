# RENNER-AUDIT-1: Route Map

Auth enforcement: `middleware.ts` + `src/lib/supabase/middleware.ts` (PROTECTED_PATHS, AUTH_PATHS) and `src/lib/role.ts` (`requireViewer` / `requireClient` / `requireRenner`).

## Public (marketing & auth)

| File path | URL | Access | Roles | Description |
|---|---|---|---|---|
| `src/app/page.tsx` | `/` | Public | Any (signed-in users redirected to role home) | Landing page with role-aware signup form. |
| `src/app/signin/page.tsx` | `/signin` | Public (auth route) | Any (signed-in users redirected to `/browse`) | Email + password sign-in form. |
| `src/app/signup/page.tsx` | `/signup` | Public (auth route) | Any (signed-in users redirected to `/browse`) | Account creation form with role selection (renner/client). |
| `src/app/(marketing)/become-a-renner/page.tsx` | `/become-a-renner` | Public (auth route) | Any (signed-in users redirected to `/browse`) | Recruitment landing page for prospective Renners. |
| `src/app/(marketing)/how-it-works/page.tsx` | `/how-it-works` | Public | Any | Marketing explainer for how Renner works. |
| `src/app/(marketing)/contact/page.tsx` | `/contact` | Public | Any | Contact form / support page. |
| `src/app/(marketing)/terms/page.tsx` | `/terms` | Public | Any | Terms of Service. |
| `src/app/(marketing)/privacy/page.tsx` | `/privacy` | Public | Any | Privacy Policy. |
| `src/app/(marketing)/acceptable-use/page.tsx` | `/acceptable-use` | Public | Any | Acceptable Use policy. |
| `src/app/legacy/page.tsx` | `/legacy` | Public (noindex) | Any | Preview of legacy v1 landing page. |
| `src/app/(app)/post/page.tsx` | `/post` | Public (deferred auth) | Clients (renners redirected to `/browse`; unauthenticated users routed to `/signup` on submit) | Post-a-task form; collects task in session before requiring auth. |

## Authenticated (protected via middleware)

| File path | URL | Access | Roles | Description |
|---|---|---|---|---|
| `src/app/profile-setup/page.tsx` | `/profile-setup` | Authenticated | Any (post-signup) | Onboarding form to complete user profile (name, location, categories, license). |
| `src/app/(app)/browse/page.tsx` | `/browse` | Authenticated | Any | Default authenticated home for renners; lists open tasks near the viewer. |
| `src/app/(app)/browse/renners/page.tsx` | `/browse/renners` | Authenticated | Any | Directory of public Renner profiles, sorted by proximity. |
| `src/app/(app)/browse/clients/page.tsx` | `/browse/clients` | Authenticated | Any | Directory of public Client profiles, sorted by proximity. |
| `src/app/(app)/tasks/[id]/page.tsx` | `/tasks/[id]` | Authenticated | Any (apply gated to renners; cancel/start gated to participants) | Task detail page with apply / start / cancel / report actions. |
| `src/app/(app)/tasks/[id]/review/page.tsx` | `/tasks/[id]/review` | Authenticated | Task poster or booked runner only | Completion review screen (submit completion or approve/dispute). |
| `src/app/(app)/my-tasks/page.tsx` | `/my-tasks` | Authenticated | Client only | Client's list of posted tasks with applicant counts and statuses. |
| `src/app/(app)/my-tasks/[id]/applicants/page.tsx` | `/my-tasks/[id]/applicants` | Authenticated | Client only (must own task) | Applicants list for a client's task with book / favorite actions. |
| `src/app/(app)/my-applications/page.tsx` | `/my-applications` | Authenticated | Renner only | Renner's submitted applications and invitations with status. |
| `src/app/(app)/my-renners/page.tsx` | `/my-renners` | Authenticated | Client only | Client's saved (favorited) Renners with invite-to-task action. |
| `src/app/(app)/messages/page.tsx` | `/messages` | Authenticated | Any | Direct-message inbox and thread view. |
| `src/app/(app)/settings/page.tsx` | `/settings` | Authenticated | Any | Account settings: profile, payouts (Stripe), background check, visibility. |

## Dev-only previews (`/examples/*`, noindex; not auth-gated)

| File path | URL | Access | Roles | Description |
|---|---|---|---|---|
| `src/app/examples/page.tsx` | `/examples` | Public (noindex) | Any | Index of design preview scenes. |
| `src/app/examples/client-dashboard/page.tsx` | `/examples/client-dashboard` | Public (noindex) | Any | Static preview of the client dashboard. |
| `src/app/examples/renner-dashboard/page.tsx` | `/examples/renner-dashboard` | Public (noindex) | Any | Static preview of the renner dashboard. |
| `src/app/examples/client-profile/page.tsx` | `/examples/client-profile` | Public (noindex) | Any | Static preview of a client profile page. |
| `src/app/examples/renner-profile/page.tsx` | `/examples/renner-profile` | Public (noindex) | Any | Static preview of a renner profile page. |
| `src/app/examples/posted-task/page.tsx` | `/examples/posted-task` | Public (noindex) | Any | Static preview of a posted task with applicants. |
| `src/app/examples/task-application/page.tsx` | `/examples/task-application` | Public (noindex) | Any | Static preview of the apply-to-task flow. |
| `src/app/examples/task-in-progress/page.tsx` | `/examples/task-in-progress` | Public (noindex) | Any | Static preview of an in-progress booked task. |
| `src/app/examples/completed-task/page.tsx` | `/examples/completed-task` | Public (noindex) | Any | Static preview of a completed task with photos and review prompt. |
| `src/app/examples/review-flow/page.tsx` | `/examples/review-flow` | Public (noindex) | Any | Static preview of the post-completion review flow. |
| `src/app/examples/my-renners/page.tsx` | `/examples/my-renners` | Public (noindex) | Any | Static preview of the saved Renners list. |
| `src/app/examples/invite-modal/page.tsx` | `/examples/invite-modal` | Public (noindex) | Any | Static preview of the invite-to-task modal. |
