import { EmbeddedViewRef, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { AbstractDynamicElement, DynamicElementModel } from './interfaces';
import { BaseDynamicElement } from './models';
import * as i0 from "@angular/core";
export declare abstract class SprDynamicBaseDirective<T = unknown> {
    private dynamicElementsItems;
    protected readonly viewContainerRef: ViewContainerRef;
    protected readonly templateRef: TemplateRef<T> | null;
    protected readonly renderer: Renderer2;
    protected viewRef?: EmbeddedViewRef<T> | null;
    protected get dynamicElements(): AbstractDynamicElement<HTMLElement>[];
    clear(): void;
    protected addDynamicElement(element: DynamicElementModel<HTMLElement>): BaseDynamicElement;
    protected removeDynamicElement(element: BaseDynamicElement<HTMLElement>): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprDynamicBaseDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SprDynamicBaseDirective<any>, never, never, {}, {}, never, never, true, never>;
}
