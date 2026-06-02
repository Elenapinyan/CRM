export interface SidebarNavItem {
    label: string;
    iconName?: string;
    routerLink: string;
    subNavs?: SidebarNavItem[];
    activeSub?: boolean;
}
