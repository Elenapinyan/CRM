import { booleanAttribute, contentChild, Directive, ElementRef, inject, input } from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

/**
 * Show tooltip if an element's text content is overflowing its container
 * (i.e. the text is truncated with ellipsis via CSS `text-overflow`, `-webkit-line-clamp`, etc.).
 * This directive is a dependency of ngbTooltip directive and cannot be used independently.
 */
@Directive({
  selector: '[dsTooltipIfTruncated][ngbTooltip]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
  },
})
export class TooltipIfTruncatedDirective {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly tooltip = inject(NgbTooltip);
  private readonly itemLabelElement = contentChild.required<ElementRef<HTMLElement>>('itemLabelElement');

  readonly dsTooltipIfTruncated = input(true, { transform: booleanAttribute });

  protected onMouseEnter(): void {
    const isDirectiveDisabled = !this.dsTooltipIfTruncated();
    const itemLabelElement = this.itemLabelElement().nativeElement;

    if (isDirectiveDisabled) {
      if (this.tooltip.disableTooltip) {
        this.tooltip.disableTooltip = false;
      }
      return;
    }

    const element = itemLabelElement ?? this.elementRef.nativeElement;
    const isTruncated = element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;

    if (isTruncated) {
      this.tooltip.disableTooltip = false;
    } else {
      this.tooltip.disableTooltip = true;
      this.tooltip.close();
    }
  }
}
