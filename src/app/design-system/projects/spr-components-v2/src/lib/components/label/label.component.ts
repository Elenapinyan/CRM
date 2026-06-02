import { NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ds-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgbTooltip, NgClass],
})
export class DsLabelComponent {
  @Input() label?: string;
  @Input() inputId?: string | null = null;
  @Input() tooltip?: string | null = null;
  @Input() tooltipClassForLabel: string = 'ds-component';
  @Input() leftIcon?: string | null = null;
  @Input() rightIcon?: string | null = null;
  @Input() className: string | null = null;
  @Input() isLabelReverse: boolean | null = null;
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
