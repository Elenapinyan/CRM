import { AfterViewInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class DynamicVirtualScrollWidthDirective implements AfterViewInit {
    private readonly elementRef;
    private readonly renderer2;
    private readonly destroyRef;
    private readonly viewport;
    private readonly destroy$;
    /**
     * Toggle dynamic width calculation.
     * @Default false
     **/
    dynamicWidthEnabled: import("@angular/core").InputSignal<boolean>;
    ngAfterViewInit(): void;
    private initResizeObserver;
    private initResizeListener;
    private initViewportScrollListener;
    private updateMinWidth;
    private getWidthByContent;
    static ɵfac: i0.ɵɵFactoryDeclaration<DynamicVirtualScrollWidthDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DynamicVirtualScrollWidthDirective, "[sprDynamicWidth]", never, { "dynamicWidthEnabled": { "alias": "dynamicWidthEnabled"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
