import { OnInit } from '@angular/core';
import { SprLimiterItemDirective } from './limiter-item';
import { SprLimiterCounterDirective } from './limiter-counter';
import * as i0 from "@angular/core";
export declare class SprLimiterContainerDirective<ItemType = unknown> implements OnInit {
    private readonly elementRef;
    private readonly renderer;
    private readonly destroyRef;
    readonly collapsedItems: import("@angular/core").OutputEmitterRef<ItemType[]>;
    direction: import("@angular/core").InputSignal<"ltr" | "rtl">;
    sprLimiterContainer: import("@angular/core").InputSignal<ItemType[] | undefined>;
    protected items: import("@angular/core").Signal<readonly SprLimiterItemDirective<ItemType>[]>;
    protected counter: import("@angular/core").Signal<SprLimiterCounterDirective<any> | undefined>;
    protected counterWidth: import("@angular/core").Signal<number>;
    readonly limitedItems: import("@angular/core").Signal<SprLimiterItemDirective<ItemType>[]>;
    private readonly visibleItems;
    constructor();
    get container(): HTMLElement;
    ngOnInit(): void;
    private init;
    private getSizes;
    private limitItems;
    private returnLimitedItems;
    private checkItemsFitContainer;
    private fromResizeObserver;
    private subscribeToResize;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprLimiterContainerDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SprLimiterContainerDirective<any>, "[sprLimiterContainer]", never, { "direction": { "alias": "direction"; "required": false; "isSignal": true; }; "sprLimiterContainer": { "alias": "sprLimiterContainer"; "required": false; "isSignal": true; }; }, { "collapsedItems": "collapsedItems"; }, ["items", "counter"], never, true, never>;
}
