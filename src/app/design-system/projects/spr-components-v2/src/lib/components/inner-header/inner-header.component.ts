import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { InnerHeaderVariant } from './interfaces/inner-header.interface';

@Component({
  selector: 'ds-inner-header',
  templateUrl: 'inner-header.component.html',
  styleUrls: ['inner-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, NgIf],
})
export class DsInnerHeaderComponent {
  @Input() variant: InnerHeaderVariant = 'default';
  @Input() title = '';
  @Input() withStartContent = false;
  @Input() withoutBorder = false;
}
