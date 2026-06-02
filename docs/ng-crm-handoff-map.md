# Prototype → ng-crm frontend handoff map

This document ties the **redesign prototype** to the **production CRM** so the frontend team can port features without rediscovering structure. **Visual alignment from the prototype is approved for now**—treat layout, spacing, and chrome styling as reference-only until a dedicated polish pass; prefer mapping logic and structure into `ng-crm` first.

**Repositories**

| Role | Path |
| --- | --- |
| Prototype (DS v2, vibe-coded UI) | `/Users/avasyliev/Prototypes/CRM` |
| Production (DS v1, product app) | `/Users/avasyliev/Gitlab/ng-crm` |

---

## 1. URL & route mapping

Production CRM is mounted under **`/crm`**. Section screens (sidebar + main) live under **`/crm/sections/...`**. The prototype uses **top-level** paths and a single shell component for simplicity.

| Prototype URL | Production target (typical) | Notes |
| --- | --- | --- |
| `/` (redirect) | `/crm/sections/dashboard` | Prod default home is dashboard (`/Users/avasyliev/Gitlab/ng-crm/src/app/app-routing.module.ts`). |
| `/dashboard` | `/crm/sections/dashboard` | Prototype: placeholder shell page. Prod: `permissionGuard('dashboard.read')`. |
| `/segments` | `/crm/sections/segments` | Prototype: segments **list** (`SegmentsListPageComponent`). Prod: `SegmentsComponent` + grid. |
| `/segments/build` | `/crm/segment-editor/:id` (with real id) or new-segment flow | Prototype uses **query** `?id=` on a single “build” page (`SegmentsPageComponent`). Prod editor is **`segment-editor/:id`** with `EntityEditorService` + `canDeactivateEditorGuard`. “Create” should align with prod modal/route (`NewSegmentModalComponent` from segments feature). |
| `/analytics` | *No direct match* | Add under `sections` or separate product decision. |
| `/workflows` | `/crm/sections/workflows` | Prototype: placeholder. Prod: `WorkflowsComponent`. |
| `/communication` | `/crm/sections/communication-hub` | Slug differs (`communication` vs `communication-hub`). |
| `/player-360` | *No direct match in `app-routing.module.ts`* | Product/backlog decision. |
| `/demo` | *Prototype only* | `DashboardComponent` demo entry in prototype `app.routes.ts`; not a prod route. |

**Auth / guards:** every prod `sections/*` child uses **`IsAuthenticatedGuard`** on `crm` + **`permissionGuard(...)`** per route. The prototype omits these by design; wire the same guards (or stricter) when merging.

---

## 2. Shell & navigation

| Concern | Prototype | Production |
| --- | --- | --- |
| App chrome (header + sidebar host) | `src/app/layout/crm-shell-layout/` — `CrmShellLayoutComponent` (`app-crm-shell-layout`) | `src/app/crm-root/` — `CrmRootComponent` (`crm-crm-root`) wraps `HeaderComponent` + outlet; `src/app/sections/` — `SectionsComponent` hosts `NavigationBarComponent` + section `router-outlet`. |
| Header / top bar | `crm-shell-layout.component.*` (inline logo SVG, topbar asset) | `src/app/header/header.component.*` (DS v1 `SprButtonComponent`, permissions, feature flags). |
| Sidebar nav links | `crm-shell-layout.component.ts` → `navLinks` + `crm-nav.model.ts` | `navigation-bar` + routing driven by prod nav config / permissions (inspect `ng-crm` nav module). |
| Component prefix | `app-*` (Angular default in prototype `angular.json`) | `crm-*` (prod `angular.json` `prefix: "crm"`). Prefer **`crm-*`** for new components merged into `ng-crm`. |

---

## 3. Feature folder ↔ file mapping

### Segments (highest overlap)

| Prototype | Production |
| --- | --- |
| `src/app/pages/segments-list/segments-list-page.component.*` | `src/app/segments/segments.component.*` (page shell) + `src/app/segments/segments-table/grid-table.component.*` (grid) |
| `src/app/pages/segments-list/segments-list.mock.ts`, `segments-list.model.ts`, `segments-list-columns.ts` | Replace mocks with **`SegmentsTableService`** (`src/app/segments/segments-services/segments-table.service.ts`) + API types; keep column-def patterns alongside **`ag-grid-*-settings.ts`** style configs (see workflows for examples). |
| `src/app/pages/segments-list/segments-list-page.component.ts` (infinite scroll batches) | Implement against real pagination/infinite scroll contract; preserve UX intent (e.g. page size 20) as per API. |
| `src/app/ag-grid/rm-grid.theme.ts` | Centralise with existing prod AG Grid theme/settings pattern (`ModuleRegistry` already in `ng-crm` `main.ts`). |
| `src/app/pages/segments/segments-page.component.*` (“build” / editor-lite) | `src/app/segment-editor/segment-editor.component.*` + related editor modules |

### Dashboard & shared UI

| Prototype | Production |
| --- | --- |
| `src/app/pages/dashboard/dashboard.component.ts` | `src/app/dashboard/dashboard.component.*` |
| `src/app/shared/data-grid/data-grid.component.ts` | Use or extend prod grid wrappers (e.g. segments/workflow table components), not a second generic grid unless agreed. |
| `src/app/shared/chart-panel/chart-panel.component.ts` | Place next to consuming feature or shared if prod introduces ECharts the same way. |

### Placeholders

| Prototype | Production |
| --- | --- |
| `src/app/pages/crm-placeholder/crm-placeholder-page.component.ts` | No single equivalent—each area is a real feature route under `sections/`. |

---

## 4. Stack & build differences (merge checklist)

| Topic | Prototype | Production |
| --- | --- | --- |
| Angular bootstrap | `app.config.ts` + `application` builder | `main.ts` `bootstrapApplication` + **`@angular-builders/custom-webpack`** (`angular.json`) |
| Design system | `@platform-workspace/design-system-v2` (local `file:` dist) + `stylePreprocessorOptions` | `@platform-workspace/design-system` (v1) + `src/scss/styles.scss` |
| i18n | Hard-coded strings | **Transloco** (`@jsverse/transloco`) |
| State / infra | Minimal | **NgRx**, **Sentry**, **@ngneat/cashew**, interceptors, environments |
| AG Grid | `ag-grid-community` + `ag-grid-angular` | Same family; align module registration with prod `main.ts` |

---

## 5. Suggested merge order for FE

1. **Theme / tokens:** agree DS v2 consumption in `ng-crm` (package names, global styles)—avoid duplicating v1 + v2 long term.  
2. **Shell:** port approved chrome (header/sidebar **look** only if product signs off) into `CrmRootComponent` / `SectionsComponent` / `NavigationBarComponent` without breaking permission-driven nav.  
3. **Segments list:** land column defs, grid options, and infinite-scroll behaviour behind `SegmentsTableService` + API.  
4. **Deep links:** map `/segments/build?id=` to prod **`/crm/segment-editor/:id`** (and create-segment modal flow).  
5. **Remaining nav items:** replace placeholders with real routes or hide until PM scope exists.

---

## 6. Quick reference — entry files

| | Path |
| --- | --- |
| Prototype routes | `/Users/avasyliev/Prototypes/CRM/src/app/app.routes.ts` |
| Prod routes | `/Users/avasyliev/Gitlab/ng-crm/src/app/app-routing.module.ts` |
| Prod bootstrap | `/Users/avasyliev/Gitlab/ng-crm/src/main.ts` |
| Prod CRM shell | `/Users/avasyliev/Gitlab/ng-crm/src/app/crm-root/crm-root.component.ts` |
| Prod segments entry | `/Users/avasyliev/Gitlab/ng-crm/src/app/segments/segments.component.ts` |

Update this file when routes or folder names change on either side.
