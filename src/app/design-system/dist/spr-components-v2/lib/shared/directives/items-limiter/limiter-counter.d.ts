import { AfterViewInit, ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class SprLimiterCounterDirective<ItemsType> implements AfterViewInit {
    private readonly renderer;
    private readonly limiterContainer;
    readonly elementRef: ElementRef<HTMLElement>;
    private readonly collapsedItemsEffect;
    get element(): HTMLElement;
    ngAfterViewInit(): void;
    private hideElement;
    private showElement;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprLimiterCounterDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SprLimiterCounterDirective<any>, "[sprLimiterCounter]", never, {}, {}, never, never, true, never>;
}
