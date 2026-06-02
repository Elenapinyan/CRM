import * as i0 from "@angular/core";
/**
 * Show tooltip if an element's text content is overflowing its container
 * (i.e. the text is truncated with ellipsis via CSS `text-overflow`, `-webkit-line-clamp`, etc.).
 * This directive is a dependency of ngbTooltip directive and cannot be used independently.
 */
export declare class TooltipIfTruncatedDirective {
    private readonly elementRef;
    private readonly tooltip;
    private readonly itemLabelElement;
    readonly dsTooltipIfTruncated: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    protected onMouseEnter(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TooltipIfTruncatedDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TooltipIfTruncatedDirective, "[dsTooltipIfTruncated][ngbTooltip]", never, { "dsTooltipIfTruncated": { "alias": "dsTooltipIfTruncated"; "required": false; "isSignal": true; }; }, {}, ["itemLabelElement"], never, true, never>;
}
