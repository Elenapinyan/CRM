import { Directive, EmbeddedViewRef, inject, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { AbstractDynamicElement, DynamicElementModel, DynamicPositions } from './interfaces';
import { BaseDynamicElement } from './models';

@Directive()
export abstract class DsDynamicBaseDirective<T = unknown> {
  private dynamicElementsItems: AbstractDynamicElement<HTMLElement>[] = [];

  protected readonly viewContainerRef: ViewContainerRef = inject(ViewContainerRef);
  protected readonly templateRef: TemplateRef<T> | null = inject(TemplateRef, { optional: true });
  protected readonly renderer: Renderer2 = inject(Renderer2);

  protected viewRef?: EmbeddedViewRef<T> | null;

  protected get dynamicElements(): AbstractDynamicElement<HTMLElement>[] {
    return this.dynamicElementsItems;
  }

  clear(): void {
    this.viewContainerRef.clear();
  }

  protected addDynamicElement(element: DynamicElementModel<HTMLElement>): BaseDynamicElement {
    const newDynamicElement = new BaseDynamicElement({
      ...element,
      position: element.position ?? DynamicPositions.START,
      container: element.container ?? (this.viewContainerRef.element.nativeElement as HTMLElement),
      renderer: this.renderer,
    });

    this.dynamicElementsItems.push(newDynamicElement);

    return newDynamicElement;
  }

  protected removeDynamicElement(element: BaseDynamicElement<HTMLElement>): void {
    element.destroy();

    const idx = this.dynamicElementsItems.findIndex((dEl) => dEl === element);

    this.dynamicElementsItems.splice(idx, 1);

    this.dynamicElementsItems = [...this.dynamicElementsItems];
  }
}
