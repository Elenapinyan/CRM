import { ChangeDetectionStrategy, Component } from '@angular/core';
import { COMPONENT_THEME_HOST_DIRECTIVE } from '../../directives/component-theme';

@Component({
  selector: 'ds-bottom-bar, [ds-bottom-bar], [dsBottomBar]',
  templateUrl: './bottom-bar.html',
  styleUrl: './bottom-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [COMPONENT_THEME_HOST_DIRECTIVE],
})
export class DsBottomBarComponent {}
