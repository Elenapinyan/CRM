import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[sprBtnSpinner]',
  standalone: true,
})
export class SprBtnSpinnerDirective implements OnChanges {
  @Input() sprBtnSpinner!: boolean;

  constructor(
    private readonly elRef: ElementRef,
    private readonly renderer: Renderer2,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sprBtnSpinner'].currentValue) {
      this.renderer.addClass(this.elRef.nativeElement, 'button--loading');
    } else {
      this.renderer.removeClass(this.elRef.nativeElement, 'button--loading');
    }
  }
}
