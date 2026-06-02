import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { COMPONENT_THEME_HOST_DIRECTIVE } from '../../directives/component-theme';

type MonochromeBadgeShape = 'square' | 'circle';

@Component({
  selector: 'ds-monochrome-badge, [ds-monochrome-badge]',
  templateUrl: './monochrome-badge.html',
  styleUrl: './monochrome-badge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.monochrome-badge--fixed]': `isFixedSize()`,
    '[attr.class]': `'monochrome-badge--' + badgeShape()`,
  },
  hostDirectives: [COMPONENT_THEME_HOST_DIRECTIVE],
})
class DsMonochromeBadgeComponent {
  /**
   * Badge content. If provided without projected content, it will be displayed inside the badge.
   */
  badgeContent = input<string>();

  /**
   * Is square badge. If true, the badge will be square (fixed height and width)
   *
   * @default false
   */
  isFixedSize = input<boolean>(false);

  /**
   * Input which sets shape class for component
   *
   * @type {MonochromeBadgeShape}
   * 'square' - set square shape for component
   * 'circle'  - set circle shape for component
   *
   * @default 'square'
   */
  badgeShape = input<MonochromeBadgeShape>('square');
}

export { DsMonochromeBadgeComponent };
