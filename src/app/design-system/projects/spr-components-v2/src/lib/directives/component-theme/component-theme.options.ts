import { InjectionToken } from '@angular/core';

/**
 * 'light' - set light theme for component
 * 'dark'  - set dark theme for component
 * 'alt'   - set alt theme for component, if root theme is dark then alt will be light and vice versa
 * 'root'  - set root theme for component, means that component will use the same theme as root application (like rem)
 *  null   - set nothing, means that component will inheit theme from parent (like em)
 */
export type ComponentThemeType = 'light' | 'dark' | 'alt' | 'root' | null;

/**
 * Token to change default value for ComponentThemeDirective
 */
export const DEFAULT_COMPONENT_THEME = new InjectionToken<ComponentThemeType>('Default component theme', {
  factory: (): null => null,
});
