import { AppThemeType, BaseThemeType } from './theme.options';
import * as i0 from "@angular/core";
declare class ThemeFacadeService {
    private readonly document;
    private readonly meta;
    private readonly themeColors;
    private readonly themeStorage;
    /**
     * Signal current system theme preference
     * @returns { WritableSignal<BaseThemeType> }
     */
    systemTheme: import("@angular/core").WritableSignal<BaseThemeType>;
    /**
     * Signal to hold the current theme
     * @returns { WritableSignal<AppThemeType> }
     */
    currentTheme: import("@angular/core").Signal<AppThemeType>;
    /**
     * Change document data when theme changes
     * @param {AppThemeType} theme - theme to be set (null to use system preference)
     */
    private readonly changeThemeEffect;
    /**
     * Sets the theme and saves it to storage
     * @param {AppThemeType} theme - theme to be set (null to use system preference)
     */
    setTheme(theme: AppThemeType): void;
    /**
     * Update document data attribute and meta tag on theme change
     * @param {BaseThemeType} theme
     */
    protected updateDocumentData(theme: BaseThemeType): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ThemeFacadeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ThemeFacadeService>;
}
declare const THEME_INITIALIZER: import("@angular/core").EnvironmentProviders;
export { THEME_INITIALIZER, ThemeFacadeService };
