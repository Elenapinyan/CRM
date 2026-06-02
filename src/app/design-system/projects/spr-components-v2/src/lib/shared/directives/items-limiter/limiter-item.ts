import { Directive, effect, ElementRef, EmbeddedViewRef, inject, input, signal, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[sprLimiterItem]' })
export class SprLimiterItemDirective<ItemType> {
  readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly templateRef = inject<TemplateRef<unknown>>(TemplateRef);
  readonly viewContainerRef = inject(ViewContainerRef);

  readonly item = input.required<ItemType>({ alias: 'sprLimiterItem' });

  readonly hidden = signal<boolean>(false);

  private savedElementWidth: number = 0;

  private viewRef?: EmbeddedViewRef<unknown>;

  constructor() {
    effect(() => {
      const isHidden = this.hidden();

      if (isHidden) {
        this.updateWidth();
        this.viewContainerRef.clear();
      } else {
        this.viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef);

        requestAnimationFrame(() => {
          if (!this.savedElementWidth) {
            this.updateWidth();
          }
        });
      }
    });
  }

  get element(): HTMLElement | null {
    return this.viewRef?.rootNodes.find((n) => n instanceof HTMLElement) as HTMLElement;
  }

  get elementWidth(): number {
    return this.savedElementWidth;
  }

  updateWidth(): void {
    this.savedElementWidth = this.getCurrentElementWidth();
  }

  private getCurrentElementWidth(): number {
    const rect = this.element?.getBoundingClientRect();

    return rect?.width ?? 0;
  }
}
