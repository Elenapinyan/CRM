import { DsOpenMenuItemDirective } from '../directives/open-menu-item';

export function recursiveFilterItems(items: DsOpenMenuItemDirective[], searchValue: string): DsOpenMenuItemDirective[] {
  return items.filter((item) => {
    const textContent = `${item?.searchValue() ?? ''}`?.toLowerCase().trim();

    const subItems = item.subMenu?.items || item.groupMenu?.items;
    if (item.hasSubMenu() && subItems) {
      const filteredSubItems = recursiveFilterItems(subItems.toArray(), searchValue);
      const isPresent = filteredSubItems.length > 0;
      if (!isPresent) {
        item.subMenu?.dismiss();
      }

      return isPresent;
    }

    return textContent.includes(searchValue);
  });
}
