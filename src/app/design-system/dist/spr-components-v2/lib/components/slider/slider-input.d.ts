import * as i0 from "@angular/core";
export declare class SliderInputDirective {
    readonly rangeValue: import("@angular/core").ModelSignal<number>;
    readonly min: import("@angular/core").InputSignalWithTransform<number, unknown>;
    readonly max: import("@angular/core").InputSignalWithTransform<number, unknown>;
    /** The host native HTML input element. */
    private readonly hostElement;
    protected onInput(): void;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<SliderInputDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SliderInputDirective, "input[sprSliderThumb]", never, { "rangeValue": { "alias": "rangeValue"; "required": true; "isSignal": true; }; "min": { "alias": "min"; "required": false; "isSignal": true; }; "max": { "alias": "max"; "required": false; "isSignal": true; }; }, { "rangeValue": "rangeValueChange"; }, never, never, true, never>;
}
