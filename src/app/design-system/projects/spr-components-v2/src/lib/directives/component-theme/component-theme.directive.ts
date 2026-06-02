import { Directive, inject, input } from '@angular/core';
import { DEFAULT_COMPONENT_THEME, ComponentThemeType } from './component-theme.options';

@Directive({
  host: {
    '[attr.app-theme]': 'themeType()',
  },
})
export class ComponentThemeDirective {
  /**
   * Input which sets [app-theme] attribute for component
   *
   * @type {ComponentThemeType}
   * 'light' - set light theme for component
   * 'dark'  - set dark theme for component
   * 'alt'   - set alt theme for component, if root theme is dark then alt will be light and vice versa
   * 'root'  - set root theme for component, means that component will use the same theme as root application (like rem)
   *  null   - set nothing, means that component will inheit theme from parent (like em)
   *
   * @default null
   */
  themeType = input<ComponentThemeType>(inject(DEFAULT_COMPONENT_THEME));
}

export const COMPONENT_THEME_HOST_DIRECTIVE = {
  directive: ComponentThemeDirective,
  inputs: ['themeType'],
};
