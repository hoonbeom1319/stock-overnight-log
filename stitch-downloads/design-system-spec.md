# Design System Specification: "A11y-First Semantic UI"

## Project Overview
A web-based design system optimized for React + Tailwind + Radix UI, prioritizing accessibility, developer ergonomics, and semantic structure.

## 1. Design Foundations
### Color Roles
- **Primary:** Action-oriented, brand identity (e.g., Indigo/Blue).
- **Secondary:** Supportive actions, neutral balance.
- **Success:** Affirmative actions, completion states (Green).
- **Warning:** Cautionary states, non-blocking alerts (Amber).
- **Danger:** Critical errors, destructive actions (Red).
- **Info:** Informational cues (Cyan/Sky).
- **Neutrals:** Text, borders, backgrounds (Grays).

### Typography Scale
- **Font:** Inter (or similar highly readable sans-serif).
- **Scale:** 12px (XS), 14px (SM - Base), 16px (MD), 18px (LG), 20px (XL), 24px (2XL), 30px (3XL).

### Spacing & Surface
- **Spacing:** 4px (1), 8px (2), 12px (3), 16px (4), 24px (6), 32px (8).
- **Radius:** 4px (sm), 6px (md), 8px (lg), 12px (xl), Full (pill).
- **Shadows:** Subtle elevation (sm, md, lg) for surfaces and overlays.

---

## 2. Component Inventory & Proposal

| Category | Component | Anatomy | Variants | States |
| :--- | :--- | :--- | :--- | :--- |
| **Input** | Button | Label, Icon (L/R) | Primary, Secondary, Ghost, Danger | Default, Hover, Focus, Active, Disabled, Loading |
| **Input** | Text Input | Label, Hint, Icon, Input field | Outline, Filled | Default, Hover, Focus, Error, Disabled |
| **Navigation**| Tabs | Trigger List, Content Area | Underline, Pill | Active, Inactive, Hover, Focus |
| **Overlay** | Dialog | Overlay, Content, Title, Close | Standard, Full-screen | Open, Closed |
| **Surface** | Card | Header, Body, Footer | Default, Interactive | Default, Hover, Focus (if interactive) |
| **Surface** | Table | Header, Row, Cell, Pagination| Simple, Data-grid | Default, Hover (row), Selected |

---

## 3. Variant Matrix (Core Samples)
| Component | Sizes | Variants | Key Features |
| :--- | :--- | :--- | :--- |
| **Button** | SM, MD, LG | Solid, Outline, Ghost | ARIA-label support, keyboard-ready |
| **Input** | SM, MD, LG | Bordered, Error | Semantic <label> association |
| **Select** | MD | Trigger, Value, Content | Radix Select implementation |

---

## 4. Accessibility & State Checklist
- [ ] **Contrast:** WCAG 2.1 AA (4.5:1 for text, 3:1 for UI components).
- [ ] **Keyboard:** Visible focus ring (2px outline offset).
- [ ] **Semantics:** Proper use of roles (button, dialog, tablist, etc.).
- [ ] **States:** Clear visual distinction for `hover` vs `focus-visible`.

---

## 5. Implementation Rationale
- **Radix UI:** Used for complex interaction patterns (Dialog, Popover, Select) to ensure perfect keyboard navigation and ARIA management.
- **Tailwind CSS:** For token-driven styling, ensuring the "primitive layer" remains clean and the "category layer" is visually consistent.
