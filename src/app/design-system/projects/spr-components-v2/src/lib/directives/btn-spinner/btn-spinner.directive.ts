import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[dsBtnSpinner]',
  standalone: true,
})
export class DsBtnSpinnerDirective implements OnChanges {
  @Input() dsBtnSpinner!: boolean;

  constructor(
    private readonly elRef: ElementRef,
    private readonly renderer: Renderer2,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dsBtnSpinner'].currentValue) {
      this.renderer.addClass(this.elRef.nativeElement, 'button--loading');
    } else {
      this.renderer.removeClass(this.elRef.nativeElement, 'button--loading');
    }
  }
}
