import { InjectionToken } from '@angular/core';

interface TopBarDefaultOptions {
  iconName?: string;
  declineBtn?: string | null;
  confirmBtn?: string | null;
  title?: string;
  subtitle?: string;
}

export const TOP_BAR_DEFAULT_OPTIONS = new InjectionToken<TopBarDefaultOptions>('top bar default config', {
  factory: (): {} => ({}),
});
