import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { COMPONENT_THEME_HOST_DIRECTIVE, ComponentThemeType } from '../../directives/component-theme';
import { DsStatusBadgeComponent } from '../status-badge';

@Component({
  selector: 'ds-component-theme-example, [ds-component-theme-example]',
  imports: [DsStatusBadgeComponent],
  templateUrl: './component-theme-example.html',
  styleUrl: './component-theme-example.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [COMPONENT_THEME_HOST_DIRECTIVE],
})
export class ComponentThemeExampleComponent {
  themeType = input<ComponentThemeType>(null);
}
