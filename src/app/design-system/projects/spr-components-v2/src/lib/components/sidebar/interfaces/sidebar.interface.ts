import { DropdownOption } from '../../../shared';

type BaseSidebarNavItem = {
  label: string;
  iconClass?: string;
  isDisabled?: boolean;
};

type LinkTarget = '_blank' | '_self' | '_parent' | '_top';

export type GroupSidebarNavItem = BaseSidebarNavItem & {
  type: 'group';
  subNavs: SidebarNavItem[];
};

export type LinkSidebarNavItem = BaseSidebarNavItem & {
  type: 'link';
  link: string;
  target?: LinkTarget;
  // Defines the strategy for comparing the UrlSegments of the UrlTree
  paths?: 'subset' | 'exact';
  /** Optional counter; shows number when expanded and a dot when collapsed */
  unreadCount?: number;
  /** Force a dot instead of number even in expanded mode */
  showDotOnly?: boolean;
};

export type SidebarNavItem = GroupSidebarNavItem | LinkSidebarNavItem;

export interface SidebarParentItem extends BaseSidebarNavItem {
  iconClass: string;
  iconBg?: string;
  value: string;
  subNavs?: SidebarNavItem[];
  isLoading?: boolean;
  background?: string;
  link?: string;
  target?: LinkTarget;
  isBottom?: boolean;
}

export interface SidebarNewsBlock {
  imageUrl: string;
  title: string;
  description?: string;
  link?: string;
}

export interface SidebarFooterLink {
  tooltip: string;
  link?: string;
  onClick?: () => void;
  iconClass: string;
}

export type SidebarParentDropdownOption = DropdownOption & Omit<SidebarParentItem, 'label'>;
