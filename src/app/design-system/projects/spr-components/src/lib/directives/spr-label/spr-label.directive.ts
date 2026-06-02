import { Directive, Input } from '@angular/core';
import { SprLabelComponent } from '../../components/label/spr-label.component';
import { SprDynamicComponentDirective } from '../dynamic-template';
import { DynamicPosition } from '../dynamic-template/interfaces';

@Directive({
  selector: '[sprLabel]',
  standalone: true,
})
export class SprLabelDirective extends SprDynamicComponentDirective<SprLabelComponent> {
  @Input() set shouldStopLabelClickEventPropagation(value: boolean | undefined) {
    if (this.componentRef) {
      this.componentRef.setInput('shouldStopLabelClickEventPropagation', Boolean(value));
    }
  }

  @Input() set sprLabel(value: string | null) {
    this.label = value;

    if (!value) {
      this.destroy();

      return;
    }

    if (this.dynamicElement && this.componentRef) {
      this.componentRef.setInput('label', this.label);

      return;
    }

    this.createOneComponent({
      type: SprLabelComponent,
    });

    if (this.dynamicElement) {
      this.dynamicElement.resolvePosition();
    }

    if (this.labelClass) {
      this.sprDynamicComponentClass = this.labelClass;
    }

    this.updateSprLabelComponentValues();
  }

  @Input() set sprLabelPosition(value: DynamicPosition) {
    this.sprDynamicComponentPosition = value;
  }

  @Input() set sprLabelClass(value: string) {
    this.labelClass = value;

    this.sprDynamicComponentClass = this.labelClass;
  }

  @Input() set sprLabelIsInline(value: boolean) {
    this.isInline = value;

    if (!this.dynamicElement || !this.componentRef) {
      return;
    }

    this.componentRef.setInput('isInline', this.isInline);
  }

  @Input() set sprLabelLeftIcon(value: string | undefined) {
    this.leftIcon = value;

    if (!this.componentRef) {
      return;
    }

    this.componentRef.setInput('leftIcon', this.leftIcon);
  }

  @Input() set sprLabelRightIcon(value: string | undefined) {
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
