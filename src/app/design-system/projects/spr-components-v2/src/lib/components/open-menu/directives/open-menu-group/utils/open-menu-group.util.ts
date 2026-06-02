import { DsOpenMenuItemDirective } from '../../open-menu-item';

export const getItemClassList = (item: DsOpenMenuItemDirective): string[] => {
  const classesList: string[] = ['open-menu-component__item', 'open-menu-component__item--group'];

  if (item.hasBottomSplitter()) {
    classesList.push('open-menu-component__item--bottom-splitter');
  }

  if (item.hasTopSplitter()) {
    classesList.push('open-menu-component__item--top-splitter');
  }

  if (item.isDisabled()) {
    classesList.push('disabled');
  }

  const extraClasses = item.extraClasses();

  if (!extraClasses) {
    return classesList;
  }

  if (typeof extraClasses === 'string') {
    classesList.push(extraClasses);
  } else if (Array.isArray(extraClasses) || extraClasses instanceof Set) {
    classesList.push(...extraClasses);
  } else {
    for (const [className, value] of Object.entries(extraClasses)) {
      if (value) {
        classesList.push(className);
      }
    }
  }

  return classesList;
};
