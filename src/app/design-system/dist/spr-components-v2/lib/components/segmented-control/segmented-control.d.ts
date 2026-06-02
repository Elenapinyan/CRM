import * as i0 from "@angular/core";
export declare class DsSegmentedControl {
    readonly iconStart: import("@angular/core").InputSignal<string | undefined>;
    readonly iconEnd: import("@angular/core").InputSignal<string | undefined>;
    readonly text: import("@angular/core").InputSignal<string | undefined>;
    readonly active: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly disabled: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    protected readonly classes: import("@angular/core").Signal<string>;
    protected readonly tabindex: import("@angular/core").Signal<0 | -1>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsSegmentedControl, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsSegmentedControl, "ds-segmented-control, [ds-segmented-control]", never, { "iconStart": { "alias": "iconStart"; "required": false; "isSignal": true; }; "iconEnd": { "alias": "iconEnd"; "required": false; "isSignal": true; }; "text": { "alias": "text"; "required": false; "isSignal": true; }; "active": { "alias": "active"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}
