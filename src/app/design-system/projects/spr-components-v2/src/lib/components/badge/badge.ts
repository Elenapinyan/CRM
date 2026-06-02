import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BaseBadge } from './base-badge';

@Component({
  selector: 'ds-badge,[ds-badge],[dsBadge]',
  templateUrl: './badge.html',
  styleUrl: './badge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsBadge extends BaseBadge {
  /**
   * Content as a property. You can also use content projection.
   * @optional
   **/
  content = input<string>();

  /**
   * Start icon as a property. Provide a ds-icon class.
   * @example
   * <ds-badge [icon]="ds-icon-..." />
   * @optional
   **/
  icon = input<string>();

  /**
   * End icon as a property. Provide a ds-icon class.
   * @example
   * <ds-badge [iconEnd]="ds-icon-..." />
   * @optional
   **/
  iconEnd = input<string>();
}
