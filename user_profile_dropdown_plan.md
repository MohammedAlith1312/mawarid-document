# User Profile Dropdown — Implementation Plan

## Goal

Add a **user profile dropdown** to the right side of the Docusaurus navbar, showing the logged-in user's GitHub avatar and username. Clicking it toggles a dropdown with **Profile** and **Settings** links that navigate to their official GitHub pages. The existing **Sign Out button is not touched**.

---

## Visual Design

```
┌──────────────────────────────────────────────────────────────────────┐
│  🟢 Mawarid    Docs          GitHub   [👤 john-doe]   [Sign Out]    │
└──────────────────────────────────────────────────────────────────────┘
                                              │
                                        ┌─────▼──────────────┐
                                        │  👤  Profile       │ → github.com/john-doe
                                        │  ⚙️  Settings      │ → github.com/settings
                                        └────────────────────┘
```

### Navbar Order (left → right)
1. Mawarid logo + title
2. Docs link
3. GitHub link
4. **👤 User Profile** ← NEW (avatar + name, no arrow indicator)
5. Sign Out button ← UNCHANGED

---

## Data Sources (No New API Calls Needed)

| Data | How to Get | Example |
|---|---|---|
| Username | `localStorage.getItem('github_username')` | `"john-doe"` |
| Avatar Image | `https://github.com/{username}.png` | `https://github.com/john-doe.png` |
| Profile URL | `https://github.com/{username}` | `https://github.com/john-doe` |
| Settings URL | `https://github.com/settings` | (same for all users) |

> **Note:** GitHub provides avatar images at `https://github.com/{username}.png` without any API call or authentication. This is a public URL that works for all GitHub users.

---

## Implementation Steps

### Step 1: Create the Component

**New file**: `src/components/UserProfileDropdown.tsx`

**Behavior:**
- On mount, read `github_username` from `localStorage`
- If no username → render nothing (component returns `null`)
- If username exists → render:
  - Circular avatar image (`https://github.com/{username}.png`) — ~28px
  - Username text next to avatar
- On **click** of the avatar/name area → toggle dropdown visibility
- Dropdown contains:
  - **"Profile"** button with user icon → opens `https://github.com/{username}` in a new tab
  - **"Settings"** button with gear icon → opens `https://github.com/settings` in a new tab
- On **click outside** the dropdown → close it
- On **Escape key** → close it

**Fallbacks:**
- If avatar image fails to load → show a circle with the first letter of the username
- If username is empty string → show generic "User" with a default icon

---

### Step 2: Style the Component

**New file**: `src/components/UserProfileDropdown.module.css`

**Design tokens:**
- Avatar: `28px` circle, `2px` solid border (subtle), slight shadow on hover
- Name: `0.84rem` font, `600` weight (matching existing Sign Out button font)
- Dropdown card:
  - `min-width: 180px`
  - Background: uses existing theme variable `--tb-card-bg`
  - Border: `1px solid` using `--tb-card-border`
  - Shadow: using `--tb-card-shadow`
  - Border radius: `8px`
  - Positioned absolutely below the trigger
- Dropdown items:
  - Padding: `10px 16px`
  - Hover: `--tb-btn-secondary-hover` background
  - Icons: inline SVG, `16px`
  - Text color: `--tb-card-text`
- Animation: `opacity 0→1` + `translateY(-4px → 0)` over `150ms ease`

**Theme support:**
- Uses existing CSS variables from `custom.css`
- Automatically adapts to light/dark mode — no extra work needed

---

### Step 3: Register as Custom Navbar Item

**Modify file**: `src/theme/NavbarItem/ComponentTypes.tsx`

- The project already has a swizzled `NavbarItem` folder at `src/theme/NavbarItem/`
- Register `UserProfileDropdown` as a custom navbar item type (e.g., `'custom-userProfile'`)
- This allows Docusaurus to render the component as a navbar item

---

### Step 4: Add to Navbar Config

**Modify file**: `docusaurus.config.ts`

- Add **one new entry** in the `themeConfig.navbar.items` array
- Insert it **before** the existing Sign Out HTML item (second-to-last position)
- Example entry:
  ```ts
  {
    type: 'custom-userProfile',
    position: 'right',
  },
  ```

> **Important:** This is the **only change** to `docusaurus.config.ts`. The existing Sign Out button HTML block remains completely untouched.

---

## Files Changed

| Action | File | Description |
|---|---|---|
| ✅ Create | `src/components/UserProfileDropdown.tsx` | New dropdown component |
| ✅ Create | `src/components/UserProfileDropdown.module.css` | Styling for the dropdown |
| ✏️ Modify | `src/theme/NavbarItem/ComponentTypes.tsx` | Register custom navbar item type |
| ✏️ Modify | `docusaurus.config.ts` | Add one new navbar item entry |

## Files NOT Changed

| File | Reason |
|---|---|
| ❌ Sign Out button in `docusaurus.config.ts` | Stays exactly as-is |
| ❌ `backend/server.js` | No backend changes needed |
| ❌ `src/pages/auth-callback.tsx` | Already stores username — no changes |
| ❌ `src/theme/Root.tsx` | Not involved |
| ❌ `src/pages/login.tsx` | Not involved |

---

## Component Interaction Flow

```
Page Loads
    │
    ▼
localStorage has github_username?
    │
    ├── No → Render nothing
    │
    └── Yes → Show Avatar + Username in Navbar
                    │
                    ▼
              User clicks avatar?
                    │
                    ├── Yes → Toggle Dropdown
                    │           │
                    │           ├── Profile clicked → Open github.com/{username} (new tab)
                    │           ├── Settings clicked → Open github.com/settings (new tab)
                    │           └── Click outside → Close Dropdown
                    │
                    └── No → Do nothing
```

---

## Edge Cases

| Scenario | Handling |
|---|---|
| User not logged in | Component returns `null` — nothing rendered |
| Username is empty/undefined | Show generic user icon with "User" text |
| Avatar image 404 (private/deleted account) | `onError` handler replaces with initial letter circle |
| Mobile/responsive view | Dropdown shifts to not overflow the viewport |
| Multiple rapid clicks | Toggle state — click open, click close, no jitter |
| Dark mode | All styles use CSS variables — automatic adaptation |

---

## Estimated Effort

- **2 new files** to create (~150 lines total)
- **2 existing files** with minor modifications (~10 lines changed each)
- **Zero backend changes**
- **Zero auth flow changes**
