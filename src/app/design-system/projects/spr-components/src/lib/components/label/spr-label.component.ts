import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'spr-label',
  templateUrl: './spr-label.component.html',
  styleUrls: ['./spr-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgbTooltip, NgClass],
})
export class SprLabelComponent {
  @Input() label?: string;
  @Input() inputId?: string | null = null;
  @Input() tooltip?: string | null = null;
  @Input() tooltipClassForLabel = 'tooltip-container__body tooltip-white';
  @Input() leftIcon?: string | null = null;
  @Input() rightIcon?: string | null = null;
  @Input() className: string | null = null;
  @Input() isLabelReverse: boolean | null = null;
  @Input() tooltipContainer: 'body' | 'container' = 'body';
  @Input() shouldStopLabelClickEventPropagation?: boolean = false;

  @HostBinding('class.label--inline')
  @Input()
  isInline = false;

  onLabelClick(event: MouseEvent): void {
    if (this.shouldStopLabelClickEventPropagation) {
      event.stopPropagation();
    }
  }
}
