import { DOCUMENT } from '@angular/common';
import { inject, InjectionToken, signal, untracked, WritableSignal } from '@angular/core';

/**
 * Base theme types.
 */
export type BaseThemeType = 'dark' | 'light';

/**
 * Application theme types, including system preference.
 */
export type AppThemeType = BaseThemeType | 'system';

/**
 * Enum-like object for supported theme types.
 * - DARK: 'dark' theme
 * - LIGHT: 'light' theme
 * - SYSTEM: 'system' (follows OS preference)
 */
export const ThemeTypes: { [key in Uppercase<AppThemeType>]: Lowercase<key> } = {
  DARK: 'dark',
  LIGHT: 'light',
  SYSTEM: 'system',
};

/**
 * Injection token for the key used to store the theme in storage.
 * @type {InjectionToken<string>}
 * @default 'spr-theme'
 */
export const THEME_STORAGE_KEY = new InjectionToken<string>('theme storage key', {
  factory: (): string => 'spr-theme',
});

/**
 * Injection token for a signal that tracks the system's color scheme preference ('dark' or 'light').
 * The signal updates automatically when the OS theme changes.
 * @type {InjectionToken<WritableSignal<BaseThemeType>>}
 */
export const SYSTEM_THEME = new InjectionToken<WritableSignal<BaseThemeType>>('default theme type', {
  factory: (): WritableSignal<BaseThemeType> =>
    untracked(() => {
      const mm = inject(DOCUMENT).defaultView?.matchMedia('(prefers-color-scheme: dark)');
      if (!mm) {
        return signal('light');
      }

      const systemTheme = signal(mm.matches ? ThemeTypes.DARK : ThemeTypes.LIGHT);

      mm.addEventListener('change', (e) => {
        systemTheme.set(e.matches ? ThemeTypes.DARK : ThemeTypes.LIGHT);
      });

      return systemTheme;
    }),
});

/**
 * Injection token for the CSS custom property keys used to determine the browser's theme color on mobile devices.
 * @type {InjectionToken<Record<BaseThemeType, string>>}
 * @default { dark: '--theme-color-dark', light: '--theme-color-light' }
 */
export const THEME_COLORS_PROPERTY_KEYS = new InjectionToken<Record<BaseThemeType, string>>('browser’s theme color on mobile devices', {
  factory: (): Record<BaseThemeType, string> => ({ dark: '--theme-color-dark', light: '--theme-color-light' }),
});

/**
 * Injection token for the CSS custom property keys used to determine the browser's theme color on mobile devices.
 * Use 'null' value for type to disable updating the theme color for a specific theme.
 * @type {InjectionToken<Record<BaseThemeType, string | null>>}
 * @default { dark: '--theme-color-dark', light: '--theme-color-light' }
 */
export const THEME_COLORS = new InjectionToken<Record<BaseThemeType, string | null>>('browser’s theme color on mobile devices', {
  factory: (): Record<BaseThemeType, string | null> =>
    untracked(() => {
      const document = inject(DOCUMENT);
      const themeColorsPropertyKeys = inject(THEME_COLORS_PROPERTY_KEYS);

      const computedStyle = getComputedStyle(document.documentElement);

      return {
        dark: computedStyle.getPropertyValue(themeColorsPropertyKeys.dark),
        light: computedStyle.getPropertyValue(themeColorsPropertyKeys.light),
      };
    }),
});

/**
 * Mock object for Storage type (used for SSR and testability).
 * Should implement the Storage interface.
 * @type {Storage}
 */
const mockStorage: Storage = {
  length: 0,
  clear: () => {},
  getItem: (_key: string) => null,
  key: (_index: number) => null,
  removeItem: (_key: string) => {},
  setItem: (_key: string, _value: string) => {},
};

/**
 * Injection token for the storage mechanism used to persist the theme (defaults to localStorage, with a mock fallback for SSR).
 * @type {InjectionToken<Storage>}
 */
export const THEME_STORAGE = new InjectionToken<Storage>('theme storage', {
  factory: (): Storage => localStorage || mockStorage,
});
