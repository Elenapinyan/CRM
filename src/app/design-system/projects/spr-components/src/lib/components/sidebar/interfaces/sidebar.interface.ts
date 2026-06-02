export interface SidebarNavItem {
  label: string;
  routerLink: string;
  iconName?: string;
  subNavs?: SidebarNavItem[];
}
