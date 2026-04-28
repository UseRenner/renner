# RENNER-AUDIT-2A: Copy — Landing, Sign in, Sign up, Become a Renner, Profile setup

All strings verbatim. Variables shown as `{name}`. The `MarketingHeader` (signed-out) and `SiteFooter` are rendered on every page below; their copy appears once at the end.

---

## `/`  —  Landing page

**Files:** `src/app/page.tsx`, `src/app/LandingSignupForm.tsx`

### Left panel — hero

#### Headline
- "Keep real estate running."  *(the word "running." is rendered in italic, lighter weight, color #647589)*

#### Sample task card *(decorative, `aria-hidden`)*
- Category badge: "Signs"
- Pay: "$45"
- Task title: "Install sign rider at 4821 Olive St"
- Task meta: "RiNo, Denver  ·  Today, 2:00 – 5:00 PM"

#### Category pills *(decorative, `aria-hidden`)*
- "Signs"
- "Lockbox"
- "Showing"
- "Courier"
- "Photos"
- "Guest access"

### Right panel — top-right link
- "Have an account? Sign in"  *("Sign in" links to `/signin`)*

### Right panel — `LandingSignupForm`

#### Headings
- "Get started"
- "Sign up to post a task."

#### Input labels
- "Email"
- "Full name"
- "Password"  *(min length 8)*

#### Buttons
- "Sign up"  *(primary; renders a loading spinner while submitting)*
- "Become a Renner"  *(secondary, links to `/become-a-renner`)*

#### Divider
- "Or"

#### Errors
- "Please enter both a first and last name."
- "Names may only contain letters, hyphens, and apostrophes."
- *(passthrough)* `{supabase signUp error message}`
- *(passthrough)* `{supabase profile upsert error message}`

---

## `/signin`  —  Sign in

**File:** `src/app/signin/page.tsx`

### Heading
- "Welcome back"

### Input labels
- "Email"
- "Password"

### Button
- "Sign in"  *(loading spinner while submitting)*

### Footer link
- "Don't have an account? Sign up"  *("Sign up" links to `/signup`)*

### Errors
- *(passthrough)* `{supabase signInWithPassword error message}`

---

## `/signup`  —  Sign up

**File:** `src/app/signup/page.tsx`

### Pending-task notice *(only shown when a draft task is in session)*
- "Your task is saved. Sign up and we'll post it for you."

### Role picker  *(two `RoleBox` buttons)*
- Renner — title: "Renner"; subtitle: "Complete tasks"
- Client — title: "Client"; subtitle: "Post tasks"

### Heading
- "Create your account"   *(default)*
- "One last step"   *(when a pending task is in session)*

### Input labels
- "First name"
- "Last name"
- "Email"
- "Password"  *(min length 8)*

### Button
- "Create account"  *(loading spinner while submitting)*

### Footer link
- "Already have an account? Sign in"  *("Sign in" links to `/signin`)*

### Legal disclosure
- "By creating an account, you agree to Renner's Terms of Service and Privacy Policy."  *("Terms of Service" → `/terms`, "Privacy Policy" → `/privacy`)*

### Errors
- "First and last name may only contain letters, hyphens, and apostrophes."
- "Account created, but we couldn't post your task: {taskError.message}"
- *(passthrough)* `{supabase signUp error message}`
- *(passthrough)* `{supabase profile upsert error message}`

---

## `/become-a-renner`  —  Become a Renner

**Files:** `src/app/(marketing)/become-a-renner/page.tsx`, `src/app/(marketing)/become-a-renner/BecomeARennerForm.tsx`

*(Document `<title>`: "Become a Renner · Renner")*

### Heading
- "Become a Renner"

### Subtext
- "Sign up to complete tasks in your area."

### Input labels
- "Email"
- "First name"
- "Last name"
- "Password"  *(min length 8)*
- "Categories you can work in"

### Category pills *(toggle buttons; values from `TASK_CATEGORIES`)*
- "Signs"
- "Lockbox"
- "Courier"
- "Photos"
- "Property access"
- "Guest access"
- "Host assistance"
- "Showing"
- "Open house"
- "Other"

### Background-check consent *(checkbox)*
- **Bold:** "I agree to a background check."
- "Renner requires a background check for all tasks. By signing up, you consent to a background check through our verification partner."

### Button
- "Create account"  *(loading spinner while submitting)*

### Footer link
- "Already have an account? Sign in"  *("Sign in" links to `/signin`)*

### Errors
- "First and last name may only contain letters, hyphens, and apostrophes."
- "Pick at least one category you want to work in."
- "Please consent to a background check to continue."
- *(passthrough)* `{supabase signUp error message}`
- *(passthrough)* `{supabase profile upsert error message}`

---

## `/profile-setup`  —  Profile setup

**Files:** `src/app/profile-setup/page.tsx`, `src/components/LicenseAttestation.tsx`

### Micro-label (eyebrow)
- "Step 1 of 1"

### Heading
- "Set up your profile"  *(the word "profile" rendered with `.headline-em` styling)*

### Section: Legal name
- Section label: "Legal name"
- Helper text: "Letters, hyphens, and apostrophes only. We display you as "{previewName}" on Renner."  *(`{previewName}` = derived display name; "—" when both name fields empty)*
- Input label: "First name"
- Input label: "Last name"
- Checkbox: "Show my full last name instead of just the initial."

### Section: Company / firm  *(only when role is "client")*
- Input label: "Company / firm"
- Optional indicator: "(optional)"
- Placeholder: "e.g. Compass, SERHANT., Coldwell Banker"
- Helper text: "Shown after your name to Renners — e.g. "{previewName} · Compass"."  *(when company empty, the example "{previewName} · Compass" is shown; when company is filled, it's "{previewName} · {company}")*

### Section: Phone number
- Input label: "Phone number"

### Section: Location
- Input label: "City"
- Input label: "State"  *(maxLength 2)*
- Input label: "Zip code"  *(maxLength 10)*

### Section: Bio
- Input label: "Bio"  *(textarea)*

### Section: Task categories
- Section label: "Task categories"
- Pills *(values from `TASK_CATEGORIES`)*: "Signs", "Lockbox", "Courier", "Photos", "Property access", "Guest access", "Host assistance", "Showing", "Open house", "Other"

### Section: Real estate license  *(`LicenseAttestationCard`)*
- Section label: "Real estate license"
- Attestation copy: "I attest that I hold an active real estate license in the state indicated below. I understand that misrepresenting my license status may result in removal from the Renner platform."
- Input label *(when attested)*: "License number"
- Input label *(when attested)*: "License state"
- Default select option *(disabled)*: "—"
- Other select options *(from `US_STATES`)*: "{code} — {name}"  *(e.g., "CA — California")*

### Button
- "Save & continue"  *(loading spinner while submitting)*

### Errors
- "First and last name may only contain letters, hyphens, and apostrophes."
- "Please provide your license number and state."
- *(passthrough)* `{supabase users update error message}`

---

## Shared chrome on these pages

### `MarketingHeader` *(rendered above signin, signup, become-a-renner, profile-setup; landing has its own header)*
- Wordmark `aria-label`: "Renner"  *(visible text: "Renner")*
- Right-side link: "Sign in"  *(suppressed when already on `/signin`)*

### `SiteFooter` *(rendered on landing, signin, signup, profile-setup; become-a-renner has none)*
- Wordmark visible text: "Renner"
- Column header: "Platform"
  - "How it works"  →  `/how-it-works`
  - "Become a Renner"  →  `/become-a-renner`
  - "Contact"  →  `/contact`
- Column header: "Legal"
  - "Terms"  →  `/terms`
  - "Privacy"  →  `/privacy`
- Footer meta: "© 2026 Renner"

### `LoadingSpinner`
- `aria-label`: "Loading"
