import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';
import { AppThemeType, THEME_STORAGE, THEME_STORAGE_KEY } from './theme.options';

@Injectable({
  providedIn: 'root',
})
class ThemeStorage {
  /**
   * Get Storage form tocken for ssr and better testability
   */
  private readonly storage = inject(THEME_STORAGE);

  /**
   * Storage key to save theme
   */
  private readonly storageKey = inject(THEME_STORAGE_KEY);

  /**
   * Get Document form tocken for ssr and better testability
   */
  private readonly document = inject(DOCUMENT);

  /**
   * Signal to hold the current theme (null if not set)
   */
  private readonly theme = signal<AppThemeType>(this.getTheme());

  /**
   * Readonly signal of the stored theme (null if not set)
   */
  storedTheme = this.theme.asReadonly();

  constructor() {
    this.subscribeToStorageChange();
  }

  /**
   * Saves the selected theme to storage (null to remove and use system preference)
   * @param { AppThemeType } theme theme to be saved
   */
  saveTheme(theme: AppThemeType): void {
    if (theme) {
      this.storage.setItem(this.storageKey, theme);
    } else {
      this.storage.removeItem(this.storageKey);
    }

    this.theme.set(this.getTheme());
  }

  /**
   * Syncs theme changes across multiple tabs
   */
  protected subscribeToStorageChange(): void {
    this.document.defaultView?.addEventListener('storage', (event) => {
      if (event.key === this.storageKey && event.newValue !== this.theme()) {
        this.theme.set(this.getTheme());
      }
    });
  }

  /**
   * Retrieves the current theme from storage
   * @returns { AppThemeType } current theme from storage
   */
  private getTheme(): AppThemeType {
    return (this.storage.getItem(this.storageKey) || 'system') as AppThemeType;
  }
}

export { ThemeStorage };
