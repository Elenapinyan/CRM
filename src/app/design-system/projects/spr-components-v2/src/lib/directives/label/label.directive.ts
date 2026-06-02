import { Directive, Input } from '@angular/core';
import { DsLabelComponent } from '../../components/label/label.component';
import { DsDynamicComponentDirective } from '../dynamic-template';
import { DynamicPosition, DynamicProjection } from '../dynamic-template/interfaces';

@Directive({
  selector: '[dsLabel]',
})
export class DsLabelDirective extends DsDynamicComponentDirective<DsLabelComponent> {
  @Input() set shouldStopLabelClickEventPropagation(value: boolean | undefined) {
    if (this.componentRef) {
      this.componentRef.setInput('shouldStopLabelClickEventPropagation', Boolean(value));
    }
  }

  @Input() set dsLabel(value: string | null) {
    this.label = value;

    if (!value) {
      this.destroy();

      return;
    }

    if (this.dynamicElement && this.componentRef) {
      this.componentRef.setInput('label', this.label);

      return;
    }

    if (this.labelClass) {
      this.dsDynamicComponentClass = this.labelClass;
    }

    this.dsDynamicComponent = DsLabelComponent;

    this.updateSprLabelComponentValues();
  }

  @Input() set dsLabelPosition(value: DynamicPosition) {
    this.dsDynamicComponentPosition = value;
  }

  @Input() set dsLabelProjection(value: DynamicProjection) {
    this.dsDynamicComponentProjection = value;
  }

  @Input() set dsLabelClass(value: string) {
    this.labelClass = value;

    this.dsDynamicComponentClass = this.labelClass;
  }

  @Input() set dsLabelIsInline(value: boolean) {
    this.isInline = value;

    if (!this.dynamicElement || !this.componentRef) {
      return;
    }

    this.componentRef.setInput('isInline', this.isInline);
  }

  @Input() set dsLabelLeftIcon(value: string | undefined) {
    this.leftIcon = value;

    if (!this.componentRef) {
      return;
    }

    this.componentRef.setInput('leftIcon', this.leftIcon);
  }

  @Input() set dsLabelRightIcon(value: string | undefined) {
    this.rightIcon = value;

    if (!this.componentRef) {
      return;
    }

    this.componentRef.setInput('rightIcon', this.rightIcon);
  }

  @Input() set tooltip(value: string | null) {
    if (this.labelIconTooltip === value || !this.componentRef) {
      return;
    }

    this.labelIconTooltip = value;

    this.componentRef.setInput('tooltip', this.labelIconTooltip);
  }

  @Input() set tooltipClassForLabel(value: string) {
    if (this.labelIconTooltipClass === value || !this.componentRef) {
      return;
    }

    this.labelIconTooltipClass = value;

    this.componentRef.setInput('tooltipClassForLabel', this.labelIconTooltipClass);
  }

  @Input() set inputId(value: string | undefined) {
    this.labelInputId = value;

    if (!this.dynamicElement || !this.componentRef) {
      return;
    }

    this.componentRef.setInput('inputId', this.labelInputId);
  }

  private label?: string | null;
  private labelClass?: string | null;
  private labelIconTooltip?: string | null;
  private labelIconTooltipClass: string = '';
  private labelInputId?: string;
  private leftIcon?: string;
  private rightIcon?: string;
  private isInline?: boolean;

  private updateSprLabelComponentValues(): void {
    if (!this.componentRef) {
      return;
    }

    this.componentRef.setInput('label', this.label ?? '');
    this.componentRef.setInput('leftIcon', this.leftIcon);
    this.componentRef.setInput('rightIcon', this.rightIcon);
    this.componentRef.setInput('isInline', this.isInline || false);
    this.componentRef.setInput('inputId', this.labelInputId);
    this.componentRef.setInput('tooltip', this.labelIconTooltip);
    this.componentRef.setInput('tooltipClassForLabel', this.labelIconTooltipClass);
  }
}
