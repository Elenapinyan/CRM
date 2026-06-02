import { Directive, input } from '@angular/core';
import { BadgeRadius, BadgeRadiusVariant, BadgeSchemeVariant, BadgeSize, BadgeSizeVariant, BadgeVariant } from './badge.options';

@Directive({
  host: {
    class: 'badge',
    '[class]': '["badge--" + radius(), "badge--" + size(), "badge--" + variant()]',
    '[attr.tabindex]': '0',
  },
})
export class BaseBadge {
  /**
   * Border radius.
   * @default 'squared'
   **/
  radius = input<BadgeRadius>(BadgeRadiusVariant.SQUARED);

  /**
   * Badge size.
   * @default 'sm'
   **/
  size = input<BadgeSize>(BadgeSizeVariant.SM);

  /**
   * Badge variant.
   * @default 'neutral'
   **/
  variant = input<BadgeVariant>(BadgeSchemeVariant.NEUTRAL);
}
