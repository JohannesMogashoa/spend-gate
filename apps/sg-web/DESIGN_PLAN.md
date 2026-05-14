# SpendGate Visual Design Plan

> A comprehensive design system for SpendGate — the programmable card rule engine for Investec.

---

## Design Philosophy

SpendGate is a fintech application for tech-savvy financial c professionals. The design should convey:

- **Trust & Security**: Banking-grade professionalism with a modern edge
- **Clarity**: Data-dense interfaces that remain scannable and approachable
- **Control**: Empowering users to manage their spending rules confidently
- **Sophistication**: Premium feel aligned with Investec's brand positioning

---

## Color System (5 Colors Maximum)

### Primary Palette

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--background` | `#FAFAFA` | `#0A0A0A` | Page background |
| `--foreground` | `#0F172A` | `#F8FAFC` | Primary text |
| `--primary` | `#0F172A` | `#F8FAFC` | CTAs, active states |
| `--muted` | `#F1F5F9` | `#1E293B` | Card backgrounds, subtle fills |
| `--accent` | `#10B981` | `#34D399` | Success states, positive actions |

### Semantic Colors

```css
:root {
  /* Core neutrals */
  --background: oklch(0.985 0 0);
  --foreground: oklch(0.145 0.02 250);
  
  /* Cards & surfaces */
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0.02 250);
  
  /* Muted elements */
  --muted: oklch(0.96 0.005 250);
  --muted-foreground: oklch(0.45 0.015 250);
  
  /* Primary actions */
  --primary: oklch(0.145 0.02 250);
  --primary-foreground: oklch(0.985 0 0);
  
  /* Secondary elements */
  --secondary: oklch(0.96 0.005 250);
  --secondary-foreground: oklch(0.145 0.02 250);
  
  /* Accent (emerald - for positive/success) */
  --accent: oklch(0.696 0.17 162);
  --accent-foreground: oklch(0.145 0.02 250);
  
  /* Destructive (for blocks/errors) */
  --destructive: oklch(0.577 0.245 27);
  
  /* Borders & inputs */
  --border: oklch(0.91 0.005 250);
  --input: oklch(0.91 0.005 250);
  --ring: oklch(0.145 0.02 250);
  
  /* Radius */
  --radius: 0.625rem;
}

.dark {
  --background: oklch(0.08 0.005 250);
  --foreground: oklch(0.98 0 0);
  
  --card: oklch(0.12 0.01 250);
  --card-foreground: oklch(0.98 0 0);
  
  --muted: oklch(0.18 0.01 250);
  --muted-foreground: oklch(0.65 0.01 250);
  
  --primary: oklch(0.98 0 0);
  --primary-foreground: oklch(0.08 0.005 250);
  
  --secondary: oklch(0.18 0.01 250);
  --secondary-foreground: oklch(0.98 0 0);
  
  --accent: oklch(0.76 0.15 162);
  --accent-foreground: oklch(0.08 0.005 250);
  
  --destructive: oklch(0.704 0.191 22);
  
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.65 0.01 250);
}
```

### Status Colors (via Badge variants)

- **Blocked**: `destructive` variant - Red
- **Allowed**: `default` with accent background - Emerald
- **Notified**: `secondary` variant - Neutral
- **Active rule**: `default` variant
- **Inactive rule**: `outline` variant with `opacity-60`

---

## Typography

### Font Stack

```css
--font-sans: 'Geist', system-ui, -apple-system, sans-serif;
--font-mono: 'Geist Mono', ui-monospace, monospace;
```

### Type Scale

| Element | Class | Weight | Size |
|---------|-------|--------|------|
| Page title | `text-2xl font-semibold tracking-tight` | 600 | 24px |
| Section header | `text-lg font-semibold` | 600 | 18px |
| Card title | `text-base font-medium` | 500 | 16px |
| Body text | `text-sm` | 400 | 14px |
| Caption/label | `text-xs font-medium uppercase tracking-wide text-muted-foreground` | 500 | 12px |
| Monospace (code) | `font-mono text-xs` | 400 | 12px |

### Text Wrapping

- Titles and headlines: Use `text-balance`
- Body copy: Use `text-pretty`
- Table cells: Use `truncate` for overflow

---

## Layout Structure

### App Shell

```
┌─────────────────────────────────────────────────────────┐
│  Header (sticky)                                        │
│  ┌─────────────────────────────────────────────────────┤
│  │ Logo + Title    │    Nav Links    │  User Menu     │
└──┴─────────────────┴─────────────────┴─────────────────┘

┌─────────────────────────────────────────────────────────┐
│  Main Content (flex-1)                                  │
│                                                         │
│  ┌─────────────────────────────────────────────────────┤
│  │  Sidebar (optional)  │  Primary Content Area        │
│  │  240px fixed         │  flex-1, max-w-5xl centered  │
│  │                      │                              │
│  └──────────────────────┴──────────────────────────────┘
└─────────────────────────────────────────────────────────┘
```

### Responsive Breakpoints

- **Mobile**: < 640px — Single column, stacked layout
- **Tablet**: 640px - 1024px — Collapsible sidebar
- **Desktop**: > 1024px — Full sidebar + content

### Spacing Scale

Use Tailwind's spacing scale consistently:
- Page padding: `p-6` (24px)
- Section gaps: `gap-6` (24px)
- Card padding: `p-4` or `p-6`
- Form field gaps: `gap-4` (16px)
- Inline element gaps: `gap-2` (8px)

---

## Component Specifications

### 1. Header

```
┌──────────────────────────────────────────────────────────┐
│ ┌──────────┐                     ┌─────┐ ┌─────┐ ┌─────┐│
│ │SpendGate │  Dashboard  Rules  │Stats│ │Theme│ │User ││
│ │ tagline  │  Transactions  Sim │Badge│ │ ☀/☾ │ │ ●   ││
│ └──────────┘                     └─────┘ └─────┘ └─────┘│
└──────────────────────────────────────────────────────────┘
```

**Specifications:**
- Height: 64px (`h-16`)
- Background: `bg-card` with `border-b border-border`
- Logo: Text-based, `text-xl font-semibold`
- Navigation: `NavigationMenu` component with horizontal links
- Active rules badge: `Badge` with count
- Theme toggle: `Button` with `variant="ghost" size="icon"`

### 2. Dashboard Page

```
┌─────────────────────────────────────────────────────────┐
│  STATS ROW                                              │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐          │
│  │Active Rules│ │Saved Amount│ │Blocks Today│          │
│  │    12      │ │  R 2,450   │ │     3      │          │
│  └────────────┘ └────────────┘ └────────────┘          │
├─────────────────────────────────────────────────────────┤
│  MAIN CONTENT (2-column on desktop)                     │
│  ┌─────────────────────┐ ┌─────────────────────────────┤
│  │ Rules List          │ │ Activity Feed / Recent Txns │
│  │ [Rule Card]         │ │ [Transaction Row]           │
│  │ [Rule Card]         │ │ [Transaction Row]           │
│  │ [Rule Card]         │ │ [Transaction Row]           │
│  │ + Add Rule          │ │                             │
│  └─────────────────────┘ └─────────────────────────────┘
└─────────────────────────────────────────────────────────┘
```

**Stat Cards:**
- Use `Card` with `CardHeader` + `CardContent`
- Icon in muted color: `size-5 text-muted-foreground`
- Value: `text-3xl font-semibold tracking-tight`
- Label: `text-xs text-muted-foreground uppercase tracking-wide`

### 3. Rule Card

```
┌────────────────────────────────────────────────────────┐
│ ┌────┐                                    ┌──────────┐ │
│ │ #1 │  Block late-night spending         │ ● Active │ │
│ └────┘                                    └──────────┘ │
│                                                        │
│ If hour >= 23 AND amount > R500                       │
│ Then BLOCK + notify via push                          │
│                                                        │
│ ┌──────┐ ┌──────┐ ┌──────┐              ┌───┐ ┌───┐  │
│ │ Edit │ │ Test │ │Delete│              │ ▲ │ │ ▼ │  │
│ └──────┘ └──────┘ └──────┘              └───┘ └───┘  │
└────────────────────────────────────────────────────────┘
```

**Specifications:**
- Container: `Card` with hover state `hover:border-foreground/20`
- Priority badge: `Badge variant="outline"` with `#1` format
- Status toggle: `Switch` component
- Rule summary: `text-sm text-muted-foreground`
- Actions: `Button variant="ghost" size="sm"`
- Reorder: Icon buttons with `ChevronUp` / `ChevronDown`

### 4. Rule Builder Form

```
┌────────────────────────────────────────────────────────┐
│  Create New Rule                                       │
├────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐  │
│  │ Label                                            │  │
│  │ [Block late-night spending___________________]   │  │
│  └─────────────────────────────────────────────────┘  │
│                                                        │
│  CONDITIONS (all must match)                          │
│  ┌─────────────────────────────────────────────────┐  │
│  │ [Hour ▼] [>= ▼] [23______] [×]                  │  │
│  └─────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────┐  │
│  │ [Amount ▼] [> ▼] [50000___] [×]                 │  │
│  └─────────────────────────────────────────────────┘  │
│  + Add condition                                      │
│                                                        │
│  ACTION                                                │
│  ┌─────────────────────────────────────────────────┐  │
│  │ ○ Block    ● Notify    ○ Allow                  │  │
│  └─────────────────────────────────────────────────┘  │
│                                                        │
│  [☐ Stop processing after this rule]                  │
│                                                        │
│  ┌─────────────────────────────────────────────────┐  │
│  │               Save Rule                          │  │
│  └─────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

**Form Patterns:**
- Use `FieldGroup` + `Field` for form layout
- Condition rows: Inline `Select` + `Input` with `InputGroup`
- Action selection: `ToggleGroup` with `ToggleGroupItem`
- Checkbox: Standard `Checkbox` with label
- Submit: `Button` full-width with loading state via `Spinner`

### 5. Transaction Table

```
┌──────────────────────────────────────────────────────────┐
│  Recent Transactions                          [Filter ▼] │
├──────────┬────────────────┬────────┬─────────┬──────────┤
│ Date     │ Merchant       │ Amount │ Status  │ Actions  │
├──────────┼────────────────┼────────┼─────────┼──────────┤
│ May 14   │ Woolworths     │ R 450  │ Allowed │ [→]      │
│ May 14   │ Steam          │ R 899  │ Blocked │ [→]      │
│ May 13   │ Uber Eats      │ R 215  │ Notified│ [→]      │
└──────────┴────────────────┴────────┴─────────┴──────────┘
│ ← Prev                  1 of 5                    Next → │
└──────────────────────────────────────────────────────────┘
```

**Specifications:**
- Use shadcn `Table` with `TableHeader`, `TableBody`, `TableRow`, `TableCell`
- Status column: `Badge` with appropriate variant
- Amount: Right-aligned, `font-mono`
- Row hover: `hover:bg-muted/50`
- Pagination: `DataTablePagination` component
- Create rule action: Opens suggestion modal via `Sheet`

### 6. Simulation Panel

```
┌────────────────────────────────────────────────────────┐
│  ⚡ Test Your Rules                                    │
├────────────────────────────────────────────────────────┤
│  ┌──────────────────┐ ┌──────────────────┐            │
│  │ Amount (cents)   │ │ Merchant Name    │            │
│  │ [50000_________] │ │ [Woolworths____] │            │
│  └──────────────────┘ └──────────────────┘            │
│  ┌─────────────────────────────────────────────────┐  │
│  │ Date & Time                                      │  │
│  │ [2024-05-14T23:30_________________________]     │  │
│  └─────────────────────────────────────────────────┘  │
│                                                        │
│  ┌─────────────────────────────────────────────────┐  │
│  │            Run Simulation                        │  │
│  └─────────────────────────────────────────────────┘  │
│                                                        │
│  ┌─────────────────────────────────────────────────┐  │
│  │ ✗ BLOCKED                                       │  │
│  │ ─────────────────────────────────────────────── │  │
│  │ Triggered: Block late-night spending            │  │
│  │ Actions: Transaction declined                   │  │
│  └─────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

**Result Display:**
- Success state: `bg-accent/10 border-accent/30 text-accent-foreground`
- Blocked state: `bg-destructive/10 border-destructive/30 text-destructive`
- Use `Alert` component for result display

### 7. Onboarding / Credential Form

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│              ┌─────────────────────┐                  │
│              │   SpendGate Logo    │                  │
│              └─────────────────────┘                  │
│                                                        │
│         Connect your Investec account                  │
│     Your credentials are encrypted and secure          │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │ Client ID                                         │ │
│  │ [________________________________________]       │ │
│  └──────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────┐ │
│  │ Client Secret                                     │ │
│  │ [••••••••••••••••••••••••••••••••]              │ │
│  └──────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────┐ │
│  │ API Key                                           │ │
│  │ [________________________________________]       │ │
│  └──────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────┐ │
│  │ Card Key (optional)                               │ │
│  │ [________________________________________]       │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  [☐ Use sandbox environment]                          │
│                                                        │
│  [Use sandbox credentials]                            │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │              Connect →                            │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
└────────────────────────────────────────────────────────┘
```

**Specifications:**
- Centered layout: `min-h-screen flex items-center justify-center`
- Form card: `Card` with `max-w-md w-full`
- Password fields: `Input type="password"` with show/hide toggle
- Sandbox link: `Button variant="link"`
- Submit: `Button` full-width

### 8. Authentication Pages (Sign In / Sign Up)

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│     ┌───────────────────────────────────────────┐      │
│     │                                            │      │
│     │            Sign in to SpendGate           │      │
│     │                                            │      │
│     │  ┌────────────────────────────────────┐   │      │
│     │  │ Email                               │   │      │
│     │  │ [_________________________________] │   │      │
│     │  └────────────────────────────────────┘   │      │
│     │  ┌────────────────────────────────────┐   │      │
│     │  │ Password                            │   │      │
│     │  │ [_________________________________] │   │      │
│     │  └────────────────────────────────────┘   │      │
│     │                                            │      │
│     │  ┌────────────────────────────────────┐   │      │
│     │  │           Sign in                   │   │      │
│     │  └────────────────────────────────────┘   │      │
│     │                                            │      │
│     │  ─────────── or continue with ──────────  │      │
│     │                                            │      │
│     │  ┌──────────┐ ┌──────────┐               │      │
│     │  │  Google  │ │  GitHub  │               │      │
│     │  └──────────┘ └──────────┘               │      │
│     │                                            │      │
│     │  No account? Create one                   │      │
│     │                                            │      │
│     └───────────────────────────────────────────┘      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Interactive Elements

### Button Variants

| Variant | Usage |
|---------|-------|
| `default` | Primary actions (Save, Submit, Connect) |
| `secondary` | Secondary actions (Cancel, Back) |
| `outline` | Tertiary actions (Filter, Options) |
| `ghost` | In-context actions (Edit, Delete in lists) |
| `destructive` | Dangerous actions (Delete rule, Remove) |
| `link` | Navigation, external links |

### Loading States

1. **Button loading**: Disable + `Spinner` with `data-icon`
2. **Table loading**: `Skeleton` rows matching table structure
3. **Card loading**: `Skeleton` for content areas
4. **Full page**: Centered `Spinner` with `size-8`

### Empty States

Use the `Empty` component pattern:
```tsx
<Empty>
  <EmptyIcon>
    <InboxIcon />
  </EmptyIcon>
  <EmptyTitle>No rules yet</EmptyTitle>
  <EmptyDescription>
    Create your first rule to start managing your spending.
  </EmptyDescription>
  <Button>Create Rule</Button>
</Empty>
```

### Feedback

- **Toast notifications**: Use `sonner` for all feedback
  - Success: "Rule created successfully"
  - Error: "Failed to connect. Check your credentials."
  - Info: "Simulation complete"
  
- **Inline validation**: Use `Field` with `data-invalid` + `aria-invalid`

---

## Responsive Behavior

### Mobile (< 640px)

- Header: Logo + hamburger menu
- Navigation: `Sheet` sliding from left
- Stat cards: Single column, full width
- Rules list: Full width cards
- Tables: Horizontal scroll with sticky first column
- Forms: Single column layout

### Tablet (640px - 1024px)

- Header: Full navigation visible
- Stat cards: 2 columns
- Dashboard: Stacked sections
- Sidebar: Collapsible with toggle

### Desktop (> 1024px)

- Full layout as designed
- Sidebar always visible
- Multi-column layouts

---

## Dark Mode

- Toggle in header: Sun/Moon icon button
- CSS variables handle all color switching
- No manual `dark:` classes in components
- Persist preference in localStorage
- Respect `prefers-color-scheme` on initial load

---

## Animation & Transitions

### Micro-interactions

- Button hover: `transition-colors duration-150`
- Card hover: `transition-all duration-200`
- Toggle switch: Built into component
- Modal/Sheet: `duration-300` slide/fade

### Page Transitions

- Keep simple for performance
- Skeleton loading on route change
- No heavy animations

---

## Accessibility

### Requirements

- All interactive elements keyboard accessible
- Focus visible states using `ring`
- ARIA labels on icon-only buttons
- Screen reader text via `sr-only` class
- Color contrast: WCAG AA minimum
- Form labels properly associated

### Testing Checklist

- [ ] Tab through all interactive elements
- [ ] Screen reader announces all content
- [ ] Color contrast passes
- [ ] Animations respect `prefers-reduced-motion`

---

## File Structure

```
apps/sg-web/
├── app/
│   ├── globals.css              # Design tokens + base styles
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Dashboard (main)
│   ├── (auth)/
│   │   ├── sign-in/page.tsx
│   │   └── sign-up/page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── rules/
│   │   ├── page.tsx             # Rule list + builder
│   │   └── [id]/page.tsx        # Edit rule
│   ├── transactions/
│   │   └── page.tsx
│   ├── simulate/
│   │   └── page.tsx
│   ├── settings/
│   │   └── page.tsx
│   └── onboarding/
│       └── page.tsx
├── components/
│   ├── ui/                      # shadcn components
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── PageHeader.tsx
│   ├── dashboard/
│   │   ├── StatCard.tsx
│   │   └── ActivityFeed.tsx
│   ├── rules/
│   │   ├── RuleCard.tsx
│   │   ├── RuleList.tsx
│   │   ├── RuleBuilder.tsx
│   │   └── ConditionBuilder.tsx
│   ├── transactions/
│   │   ├── TransactionTable.tsx
│   │   └── TransactionRow.tsx
│   ├── simulate/
│   │   └── SimulationPanel.tsx
│   └── auth/
│       ├── SignInForm.tsx
│       └── SignUpForm.tsx
└── lib/
    └── utils.ts                 # cn() and utilities
```

---

## Implementation Priority

### Phase 1: Foundation
1. Update `globals.css` with new design tokens
2. Update `layout.tsx` with proper font configuration
3. Create `Header` component with navigation
4. Add theme toggle functionality

### Phase 2: Core Pages
1. Dashboard with stat cards
2. Rules list with rule cards
3. Rule builder form
4. Transaction table

### Phase 3: Additional Features
1. Simulation panel
2. Settings page
3. Onboarding flow
4. Authentication pages

### Phase 4: Polish
1. Loading states
2. Empty states
3. Error handling
4. Responsive refinements
5. Accessibility audit

---

## Notes

- All components should use semantic color tokens, never raw color values
- Prefer `gap-*` over `space-*` for spacing
- Use `size-*` for square elements
- Icons inside buttons use `data-icon` attribute
- Forms use `FieldGroup` + `Field` pattern
- Always include loading and error states
- Test on mobile viewports during development
