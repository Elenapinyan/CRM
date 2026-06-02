import { AppThemeType } from './theme.options';
import * as i0 from "@angular/core";
declare class ThemeStorage {
    /**
     * Get Storage form tocken for ssr and better testability
     */
    private readonly storage;
    /**
     * Storage key to save theme
     */
    private readonly storageKey;
    /**
     * Get Document form tocken for ssr and better testability
     */
    private readonly document;
    /**
     * Signal to hold the current theme (null if not set)
     */
    private readonly theme;
    /**
     * Readonly signal of the stored theme (null if not set)
     */
    storedTheme: import("@angular/core").Signal<AppThemeType>;
    constructor();
    /**
     * Saves the selected theme to storage (null to remove and use system preference)
     * @param { AppThemeType } theme theme to be saved
     */
    saveTheme(theme: AppThemeType): void;
    /**
     * Syncs theme changes across multiple tabs
     */
    protected subscribeToStorageChange(): void;
    /**
     * Retrieves the current theme from storage
     * @returns { AppThemeType } current theme from storage
     */
    private getTheme;
    static ɵfac: i0.ɵɵFactoryDeclaration<ThemeStorage, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ThemeStorage>;
}
export { ThemeStorage };
