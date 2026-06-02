# CRM prototype — new list module with same shell + AG Grid layout

Copy this entire file into a Cursor chat when building a new CRM module that should match the existing **Segments list** layout.

## Goal

Add a new CRM module page that matches the existing **Segments list** layout:

- **App shell** (dark top header + collapsible sidebar) — already built, do NOT duplicate
- **Page header** (H1 + primary action button)
- **Toolbar** (search + column-visibility control)
- **AG Grid** table (shared `rmTheme`, row/header heights, footer strip)
- Wire the module into routing and sidebar nav

## Stack (already in repo)

- Angular 19 standalone components, OnPush, signals where appropriate
- `@platform-workspace/design-system-v2` (`DsButton`, DS icons: `ds-icon ds-icon-…`)
- `ag-grid-angular` + `ag-grid-community` v34.2.0
- Global styles: `src/styles.scss` imports DS + `@platform-workspace/grid/styles/ag-grid.scss`
- AG Grid modules registered in `src/main.ts` via `ModuleRegistry.registerModules([AllCommunityModule])`

## DO NOT recreate (reuse as-is)

| Piece | Path |
|-------|------|
| Shell (header 52px, sidebar 236px/64px collapsed, dark host) | `src/app/layout/crm-shell-layout/` |
| AG Grid theme (`rmTheme`) | `src/app/ag-grid/rm-grid.theme.ts` |
| Optional thin grid wrapper | `src/app/shared/data-grid/data-grid.component.ts` |
| Public assets | `public/header-background-T7B2ROJM.svg`, `public/contest-bg.svg` |
| Reference list page (copy patterns from) | `src/app/pages/segments-list/` |

## Module to build (fill in)

- **Route slug:** `[MODULE_SLUG]` (e.g. `workflows` → `/workflows`)
- **Page title:** `[MODULE_TITLE]` (e.g. `Workflows`)
- **Primary CTA:** `[PRIMARY_BUTTON_LABEL]` (e.g. `Create workflow`)
- **Search placeholder:** `[SEARCH_PLACEHOLDER]`
- **Nav icon** (DS icon class): `[NAV_ICON_CLASS]` (e.g. `ds-icon-general-flowchart`)

### Quick customization examples

| Placeholder | Example (Workflows) |
|-------------|---------------------|
| `[MODULE_SLUG]` | `workflows` |
| `[MODULE_TITLE]` | `Workflows` |
| `[PRIMARY_BUTTON_LABEL]` | `Create workflow` |
| `[SEARCH_PLACEHOLDER]` | `Search by name or ID` |
| `[NAV_ICON_CLASS]` | `ds-icon-general-flowchart` |

## Architecture

```
CrmShellLayoutComponent          ← parent route; provides header + sidebar + <router-outlet>
  └── [Module]ListPageComponent  ← your page; fills white main panel only
        ├── page header (title + ds-button)
        ├── toolbar (search + columns panel)
        ├── ag-grid-angular
        └── footer strip
```

Shell layout contract:

- Routed page `:host` must be `display: flex; flex-direction: column; flex: 1; min-height: 0` so the grid can grow inside `crm-shell-main`.
- Page root uses padding `19px 24px 16px` (see segments-list SCSS).

## What is already provided vs. what you build

| Layer | Owner | Notes |
|-------|--------|--------|
| Top chrome (Broadway logo, time, user) | `CrmShellLayoutComponent` | 52px height, SVG bg from `public/` |
| Sidebar (CRM app switcher, nav, collapse) | Same | 236px → 64px collapsed |
| Main white panel | Shell + your page | Rounded top-right 16px |
| Table chrome | Your page + `rmTheme` | Segments list is the visual spec |

If you only need a **placeholder** inside the shell (no grid yet), point the route at `CrmPlaceholderPageComponent` like Dashboard/Analytics — this prompt is for the full **list + AG Grid** pattern.

## 1. Routing (`src/app/app.routes.ts`)

Add a route sibling to `segments`:

```ts
{
  path: '[MODULE_SLUG]',
  component: CrmShellLayoutComponent,
  children: [{ path: '', component: [Module]ListPageComponent }],
},
```

Remove or replace the placeholder entry for this slug if one exists (`shellPlaceholder`).

## 2. Sidebar nav (`crm-shell-layout.component.ts`)

Ensure `navLinks` contains an entry with matching `slug`, `label`, and `iconClass`. Use `activeMatch: 'subset'` only if the module has child routes (like `/segments/build`).

## 3. Create page files

Under `src/app/pages/[module-slug]-list/`:

### `[module]-list.model.ts`

Row interface for grid typing.

### `[module]-list-columns.ts`

Mirror `segments-list-columns.ts`:

- `ColumnPanelItem[]` with `colId`, `label`, `locked`
- `DEFAULT_COLUMN_VISIBILITY: Record<string, boolean>`
- Locked columns cannot be hidden (ID, name, etc.)

### `[module]-list.mock.ts`

`buildRowsList()` returning ~20–50 mock rows for the prototype.

### `[module]-list-page.component.ts`

Follow `segments-list-page.component.ts` patterns.

**Imports:** `AgGridAngular`, `DsButton`, `rmTheme`, `ColDef`, `GridApi`, `GridOptions`, `GridReadyEvent`.

**Grid options (must match reference):**

```ts
protected readonly gridOptions: GridOptions<Row> = {
  theme: rmTheme,
  suppressCellFocus: true,
  rowHeight: 48,
  headerHeight: 44,
  defaultColDef: { sortable: true, filter: true, resizable: true },
  getRowId: (p) => String(p.data?.id ?? ''),
};
```

**Column defs:** use `colId` aligned with column panel; mix `width`, `flex`, `minWidth`; `type: 'rightAligned'` for numbers; custom `cellRenderer` only when design needs chips/links/status dots.

**Search:** on input → `gridApi.setGridOption('quickFilterText', value)`.

**Column panel:** copy toggle/open/close, draft visibility, `applyColumnState`, document click-outside, “Revert to default” from segments list.

### HTML structure (BEM block: `[module-slug]-list`)

Same regions as `segments-list-page.component.html`:

1. `__[module]-list__header` — `<h1 class="…__title">` + `<ds-button variant="main" size="lg">`
2. `__[module]-list__toolbar` — search (368px wide) + column anchor button
3. `__[module]-list__grid-wrap ag-grid-component__content ag-grid-size-md` — `<ag-grid-angular (gridReady)="onGridReady($event)" … />`
4. `__[module]-list__footer` — “Last updated on …” left; optional stat chips right

Search markup:

- Wrapper: flex, height 36px, border `#efeff0`, bg `#fafafa`, radius 6px
- Leading icon: `ds-icon ds-icon-control-search` in `__search-addon`
- Column button: 36×36, icon `ds-icon-control-align-vertically`, popover top-right

### SCSS

Copy structure from `segments-list-page.component.scss` and rename BEM prefix to `[module-slug]-list`.

Keep these exact layout values:

- Title: 24px / 600 / `#18181b`
- Toolbar gap: 12px; grid wrap `flex: 1; min-height: 360px`
- Footer: height 52px, bg `#fafafa`, negative horizontal margin to bleed (`margin: 12px -24px -16px`), padding `0 32px`
- `::ng-deep` only for cell renderers / footer chips inside grid

## 4. AG Grid theme (do not fork)

Import and use only:

```ts
import { rmTheme } from '../../ag-grid/rm-grid.theme';
```

Theme params (for reference): header bg `#FAFAFA`, header 14px, row borders `#E4E4E7`, header column borders 24px tall, `suppressCellFocus: true`.

Grid wrapper classes from design-system grid package:

- Always wrap grid in: `ag-grid-component__content ag-grid-size-md`

## 5. Design tokens (prefer CSS variables with hex fallbacks)

- Text primary: `var(--brd-neutral-1000-0, #18181b)`
- Borders: `var(--brd-neutral-200-700, #e4e4e7)`
- Surfaces: `var(--brd-neutral-050-900, #fafafa)`, `var(--brd-neutral-0-1000, #fff)`
- Link accent: `var(--brd-accent-blue-600-300, #2563eb)`

## 6. Constraints

- Do NOT edit shell layout files unless adding nav link only.
- Do NOT import full `ag-grid styles/index` in component SCSS (breaks light headers — see comment in `styles.scss`).
- Standalone components only; `ChangeDetectionStrategy.OnPush`.
- Match Segments list visually pixel-close; module-specific columns/data only.
- Use mock data; no backend required for prototype.

## 7. Acceptance checklist

- [ ] `/[MODULE_SLUG]` shows inside shell (dark top bar, light sidebar, white content)
- [ ] Sidebar item highlights when active; collapse/expand works
- [ ] Page header + primary button aligned like Segments
- [ ] Search filters grid via quick filter
- [ ] Column panel shows/hides columns; locked columns disabled
- [ ] Grid header row 44px, body rows 48px, `#FAFAFA` header strip
- [ ] Footer strip pinned at bottom of page content
- [ ] `ng build` passes

## Reference files to read first (in order)

1. `src/app/pages/segments-list/segments-list-page.component.html`
2. `src/app/pages/segments-list/segments-list-page.component.scss`
3. `src/app/pages/segments-list/segments-list-page.component.ts`
4. `src/app/layout/crm-shell-layout/crm-shell-layout.component.html`
5. `src/app/ag-grid/rm-grid.theme.ts`
6. `src/app/app.routes.ts`
