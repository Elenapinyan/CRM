import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { StatusBadgePointColor } from './status-badge.options';
import { COMPONENT_THEME_HOST_DIRECTIVE } from '../../directives/component-theme';

@Component({
  selector: 'ds-status-badge, [ds-status-badge], [dsStatusBadge]',
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [COMPONENT_THEME_HOST_DIRECTIVE],
})
class DsStatusBadgeComponent {
  pointColor = input<StatusBadgePointColor>('grey');
}

export { DsStatusBadgeComponent };
