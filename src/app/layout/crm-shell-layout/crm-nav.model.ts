export interface CrmNavSubLink {
  label: string;
  /** Route path after leading slash, e.g. `analytics/cohorts`. */
  slug: string;
  activeMatch?: 'exact' | 'subset';
}

export interface CrmNavLink {
  kind: 'link';
  label: string;
  slug: string;
  iconClass: string;
  activeMatch?: 'exact' | 'subset';
}

export interface CrmNavGroup {
  kind: 'group';
  id: string;
  label: string;
  iconClass: string;
  children: CrmNavSubLink[];
}

export type CrmNavItem = CrmNavLink | CrmNavGroup;

export function isNavGroup(item: CrmNavItem): item is CrmNavGroup {
  return item.kind === 'group';
}

/** RouterLink / navigate commands for a slash-separated app path. */
export function crmNavPath(slug: string): string[] {
  return ['/', ...slug.split('/').filter(Boolean)];
}
