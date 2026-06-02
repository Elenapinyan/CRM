import { ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class SprLimiterItemDirective<ItemType> {
    readonly elementRef: ElementRef<HTMLElement>;
    readonly templateRef: TemplateRef<unknown>;
    readonly viewContainerRef: ViewContainerRef;
    readonly item: import("@angular/core").InputSignal<ItemType>;
    readonly hidden: import("@angular/core").WritableSignal<boolean>;
    private savedElementWidth;
    private viewRef?;
    constructor();
    get element(): HTMLElement | null;
    get elementWidth(): number;
    updateWidth(): void;
    private getCurrentElementWidth;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprLimiterItemDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SprLimiterItemDirective<any>, "[sprLimiterItem]", never, { "item": { "alias": "sprLimiterItem"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}
