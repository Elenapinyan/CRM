## ThemeFacadeService

The `ThemeFacadeService` is an Angular service that manages theme switching (dark, light, or system) for your application. It provides a simple API to set and persist the user's theme preference, updates the document's theme attribute, and synchronizes the browser's theme color meta tag.

## Features

- Detects system theme preference (dark or light)
- Allows switching between 'dark', 'light', and 'system' themes
- Persists user theme preference using `ThemeStorage`
- Updates the `app-theme` attribute on the document body
- Updates the `<meta name="theme-color">` tag for browser UI theming

## Usage

### Provide AppInitializer function to set attributes as soon as possible

#### Example with standalone application. In app.config.ts add THEME_INITIALIZER to providers list

```typescript
import { THEME_INITIALIZER } from '@platform-workspace/design-system-v2';

export const appConfig: ApplicationConfig = {
  providers: [THEME_INITIALIZER],
};
```

#### Example with NgModule-based application. In main app.module.ts add THEME_INITIALIZER to providers list

```typescript
import { THEME_INITIALIZER } from '@platform-workspace/design-system-v2';

@NgModule({
  ...
  providers: [APP_INITIALIZER_THEME],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### Set Theme. Use ThemeFacadeService to get or update current theme. Example:

```typescript
import { ThemeFacadeService } from '@platform-workspace/design-system-v2';

...
export class ExampleComponent {
  private themeFacade = inject(ThemeFacadeService);

  // signal with current theme
  get currentTheme = this.themeFacade.currentTheme;

  updateTheme(theme: typehere): void {
    this.themeFacade.setTheme(theme);
  }
}
```

### Optional step

#### Add this script to the index.html file if you need a different theme when loading the application. Do not forget to update the localStorage key and themeColorsPropertyKeys if you have changed the default values.

```html
<script>
  let themeColorsPropertyKeys = { dark: '--theme-color-dark', light: '--theme-color-light' };
  let theme = localStorage.getItem('spr-theme') || 'system';

  if (theme === 'system') {
    theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.body.setAttribute('app-theme', theme);

  let themeColor = getComputedStyle(document.documentElement).getPropertyValue(themeColorsPropertyKeys[theme]);
  let metaThemeColor = document.querySelector('meta[name=theme-color]');

  if (!metaThemeColor) {
    metaThemeColor = document.createElement('meta');
    metaThemeColor.name = 'theme-color';
    document.getElementsByTagName('head')[0].appendChild(metaThemeColor);
  }

  metaThemeColor.content = themeColor;
</script>
```

### Public Signals

- `currentTheme`: Signal holding the current theme (AppThemeType: 'dark' | 'light' | 'system')
- `systemTheme`: Signal for the system theme preference (BaseThemeType: 'dark' | 'light')

## How It Works

- When the theme changes, the service updates the `app-theme` attribute on the `<body>` element.
- The service also updates the browser's theme color meta tag to match the selected theme.
- The user's preference is saved and restored in localStorage.

## Theme Constants and Injection Tokens

- **ThemeTypes**: Object wich contains theme types.
- **THEME_STORAGE_KEY**: Injection token for the key used to store the theme in storage (default: `'spr-theme'`).
- **SYSTEM_THEME**: Injection token contain a signal that tracks the system's color scheme preference (`'dark'` or `'light'`). Automatically updates when the system theme changes.
- **THEME_COLORS_PROPERTY_KEYS**: Injection token for the CSS custom property keys used to determine the browser's theme color on mobile devices.
- **THEME_COLORS**: Injection token for an object containing the actual theme color values (from CSS variables) for dark and light themes, works together with THEME_COLORS_PROPERTY_KEYS. Used to update the browser's `<meta name="theme-color">` tag. Use 'null' value for type to disable updating the theme color for a specific theme.
- **THEME_STORAGE**: Injection token for the storage mechanism (defaults to `localStorage`, with a mock fallback for SSR and better testability).

These tokens are used internally by `ThemeFacadeService` and related services, but can also be injected directly if you need to customize or extend theme behavior in your application.
