import { InjectionToken, WritableSignal } from '@angular/core';
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
export declare const ThemeTypes: {
    [key in Uppercase<AppThemeType>]: Lowercase<key>;
};
/**
 * Injection token for the key used to store the theme in storage.
 * @type {InjectionToken<string>}
 * @default 'spr-theme'
 */
export declare const THEME_STORAGE_KEY: InjectionToken<string>;
/**
 * Injection token for a signal that tracks the system's color scheme preference ('dark' or 'light').
 * The signal updates automatically when the OS theme changes.
 * @type {InjectionToken<WritableSignal<BaseThemeType>>}
 */
export declare const SYSTEM_THEME: InjectionToken<WritableSignal<BaseThemeType>>;
/**
 * Injection token for the CSS custom property keys used to determine the browser's theme color on mobile devices.
 * @type {InjectionToken<Record<BaseThemeType, string>>}
 * @default { dark: '--theme-color-dark', light: '--theme-color-light' }
 */
export declare const THEME_COLORS_PROPERTY_KEYS: InjectionToken<Record<BaseThemeType, string>>;
/**
 * Injection token for the CSS custom property keys used to determine the browser's theme color on mobile devices.
 * Use 'null' value for type to disable updating the theme color for a specific theme.
 * @type {InjectionToken<Record<BaseThemeType, string | null>>}
 * @default { dark: '--theme-color-dark', light: '--theme-color-light' }
 */
export declare const THEME_COLORS: InjectionToken<Record<BaseThemeType, string | null>>;
/**
 * Injection token for the storage mechanism used to persist the theme (defaults to localStorage, with a mock fallback for SSR).
 * @type {InjectionToken<Storage>}
 */
export declare const THEME_STORAGE: InjectionToken<Storage>;
