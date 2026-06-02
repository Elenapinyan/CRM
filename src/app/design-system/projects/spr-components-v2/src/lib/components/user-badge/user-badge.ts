import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'ds-user-badge, [ds-user-badge], [dsUserBadge]',
  templateUrl: './user-badge.html',
  styleUrl: './user-badge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'user-badge',
    '[class.badge-rounded]': 'true',
    '[attr.tabindex]': '0',
  },
})
export class SprUserBadge {
  /**
   * Use this property to provide a content.
   * @required
   **/
  content = input.required<string>();

  /**
   * Use this property to provide an image url. In case if url isn't specified, initials are displayed.
   * @optional
   **/
  imageSrc = input<string>();

  protected readonly initials = computed(() => {
    const content = this.content();

    if (!content) {
      return '';
    }

    const words = content.toLocaleUpperCase().trim().split(' ');
    const start = 0;
    const end = words.length > 2 ? 2 : words.length;

    return words.slice(start, end).reduce((pv, cv) => (pv += cv[0]), '');
  });
}
