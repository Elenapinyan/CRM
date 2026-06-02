import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChipsSize, ChipsStyle, ChipsVariant } from './interfaces/chips.interface';

@Component({
  selector: 'ds-chips',
  templateUrl: 'chips.component.html',
  styleUrls: ['chips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
})
export class DsChipsComponent {
  @Input() variant: ChipsVariant = 'gray';
  @Input() size: ChipsSize = 'md';
  @Input() chipsStyle: ChipsStyle = 'filled';
  @Input() isInteractive = false;
  @Input() isDisabled = false;
  @Input() isSelected = false;
}
