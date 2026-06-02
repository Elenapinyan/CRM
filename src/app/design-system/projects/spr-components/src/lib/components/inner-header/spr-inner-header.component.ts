import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InnerHeaderVariant } from './interfaces/spr-inner-header.interface';

// @ts-ignore
@Component({
  selector: 'spr-inner-header',
  templateUrl: 'spr-inner-header.component.html',
  styleUrls: ['spr-inner-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.inner-header--background]': 'variant === "background"',
    '[class.inner-header--small]': 'variant === "small"',
    '[class.inner-header--large]': 'variant === "large"',
    '[class.inner-header--no-padding-inline]': 'variant === "no-padding-inline"',
    '[class.inner-header--no-border]': 'withoutBorder',
  },
})
export class SprInnerHeaderComponent {
  @Input() variant: InnerHeaderVariant = 'default';
  @Input() title = '';
  @Input() withStartContent = false;
  @Input() withoutBorder = false;
}
