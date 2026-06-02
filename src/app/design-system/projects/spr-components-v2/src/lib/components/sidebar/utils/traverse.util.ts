import { Router } from '@angular/router';
import { SidebarNavItem, SidebarParentItem } from '../interfaces/sidebar.interface';

function normalizeUrl(url: string): string {
  return url.replace(/^\//, '').toLowerCase();
}

export function isRouteActive(link: string, router: Router, paths: 'subset' | 'exact' = 'subset'): boolean {
  return router.isActive(link, { paths, queryParams: 'ignored', fragment: 'ignored', matrixParams: 'ignored' });
}

export function isSameLink(link: string, route: string, paths: 'subset' | 'exact' = 'subset'): boolean {
  if (paths === 'subset') {
    return normalizeUrl(route).includes(normalizeUrl(link));
  } else {
    return normalizeUrl(route) === normalizeUrl(link);
  }
}

export function traverseActiveNavItem(items: SidebarNavItem[] | undefined, router: Router): SidebarNavItem | undefined;
export function traverseActiveNavItem(items: SidebarNavItem[] | undefined, currentUrl: string): SidebarNavItem | undefined;
export function traverseActiveNavItem(items: SidebarNavItem[] | undefined, route: string | Router): SidebarNavItem | undefined {
  if (!items) {
    return undefined;
  }

  const isLinkActive = (link: string, paths: 'subset' | 'exact' = 'subset'): boolean =>
    typeof route === 'string' ? isSameLink(link, route, paths) : isRouteActive(link, route, paths);

  for (const item of items) {
    const isActive = 'link' in item ? isLinkActive(item.link, item.paths) : false;
    const found = isActive ? item : undefined;
    let foundInChild: SidebarNavItem | undefined;

    if ('subNavs' in item && item.subNavs?.length) {
      foundInChild = traverseActiveNavItem(item.subNavs, route as Router);
    }

    if (foundInChild || found) {
      return foundInChild || found;
    }
  }
  return undefined;
}

export const findParentNavItem = (items: SidebarParentItem[], router: Router): SidebarParentItem | undefined => {
  return items.find((item) => {
    return (item.link && isSameLink(item.link, router.url, 'subset')) || traverseActiveNavItem(item.subNavs, router);
  });
};

export function getFirstLinkSubItem({
  item,
  currentUrl,
}: {
  item: SidebarNavItem | SidebarParentItem;
  currentUrl: string;
}): undefined | string {
  const linkChildren = getLinkSidebarItems(item).filter((sub) => 'link' in sub);
  const isSubItemSelected = linkChildren.find((sub) => isSameLink(sub.link, currentUrl, sub.paths));
  const firstChildLink = linkChildren[0];

  if (!isSubItemSelected && firstChildLink && firstChildLink.link) {
    return firstChildLink.link;
  }

  return;
}

function getLinkSidebarItems(item: SidebarNavItem | SidebarParentItem): SidebarNavItem[] {
  let output: SidebarNavItem[] = [];

  if ('subNavs' in item && item.subNavs?.length) {
    output = item.subNavs.reduce((acc, el) => {
      if (el.type === 'group') {
        acc = acc.concat(getLinkSidebarItems(el));
      } else if (el.link) {
        acc.push(el);
      }
      return acc;
    }, output);
  }

  return output;
}
