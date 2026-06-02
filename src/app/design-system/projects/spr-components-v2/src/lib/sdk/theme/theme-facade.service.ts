import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable, provideAppInitializer } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ThemeStorage } from './theme-storage';
import { AppThemeType, BaseThemeType, SYSTEM_THEME, THEME_COLORS } from './theme.options';

@Injectable({
  providedIn: 'root',
})
class ThemeFacadeService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly themeColors = inject(THEME_COLORS);
  private readonly themeStorage = inject(ThemeStorage);

  /**
   * Signal current system theme preference
   * @returns { WritableSignal<BaseThemeType> }
   */
  systemTheme = inject(SYSTEM_THEME);

  /**
   * Signal to hold the current theme
   * @returns { WritableSignal<AppThemeType> }
   */
  currentTheme = this.themeStorage.storedTheme;

  /**
   * Change document data when theme changes
   * @param {AppThemeType} theme - theme to be set (null to use system preference)
   */
  private readonly changeThemeEffect = effect(() => {
    const theme = this.currentTheme();
    this.updateDocumentData(theme === 'system' ? this.systemTheme() : theme);
  });

  /**
   * Sets the theme and saves it to storage
   * @param {AppThemeType} theme - theme to be set (null to use system preference)
   */
  setTheme(theme: AppThemeType): void {
    this.themeStorage.saveTheme(theme);
  }

  /**
   * Update document data attribute and meta tag on theme change
   * @param {BaseThemeType} theme
   */
  protected updateDocumentData(theme: BaseThemeType): void {
    this.document.body.setAttribute('app-theme', theme);

    const themeColor = this.themeColors[theme];

    if (themeColor) {
      this.meta.updateTag({ name: 'theme-color', content: themeColor });
    }
  }
}

// App initializer to ensure the service is instantiated on app start
const THEME_INITIALIZER = provideAppInitializer(() => {
  inject(ThemeFacadeService);
});

export { THEME_INITIALIZER, ThemeFacadeService };
