import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChipsSize, ChipsStyle, ChipsVariant } from './interfaces/chips.interface';

@Component({
  selector: 'spr-chips',
  templateUrl: 'spr-chips.component.html',
  styleUrls: ['spr-chips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgClass, NgTemplateOutlet],
})
export class SprChipsComponent {
  @Input() variant: ChipsVariant = 'gray';
  @Input() size: ChipsSize = 'md';
  @Input() chipsStyle: ChipsStyle = 'filled';
  @Input() isInteractive = false;
  @Input() isDisabled = false;
  @Input() isSelected = false;
}
