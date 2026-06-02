import { AfterViewInit, Directive, effect, ElementRef, inject, Renderer2 } from '@angular/core';
import { SprLimiterContainerDirective } from './limiter-container';

@Directive({ selector: '[sprLimiterCounter]' })
export class SprLimiterCounterDirective<ItemsType> implements AfterViewInit {
  private readonly renderer = inject(Renderer2);
  private readonly limiterContainer = inject(SprLimiterContainerDirective);

  readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  private readonly collapsedItemsEffect = effect(() => {
    const items = this.limiterContainer.limitedItems();

    if (items.length) {
      this.showElement();
    } else {
      this.hideElement();
    }
  });

  get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    this.hideElement();
  }

  private hideElement(): void {
    this.renderer.setStyle(this.element, 'opacity', '0');
    this.renderer.setStyle(this.element, 'position', 'absolute');
    this.renderer.setStyle(this.element, 'pointer-events', 'none');
  }

  private showElement(): void {
    this.renderer.setStyle(this.element, 'opacity', '1');
    this.renderer.setStyle(this.element, 'position', 'unset');
    this.renderer.setStyle(this.element, 'pointer-events', 'unset');
  }
}
