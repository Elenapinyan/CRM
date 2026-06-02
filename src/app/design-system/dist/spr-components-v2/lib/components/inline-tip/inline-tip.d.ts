import * as i0 from "@angular/core";
export declare class DsInlineTip {
    readonly type: import("@angular/core").InputSignal<"success" | "warning" | "danger" | "primary">;
    readonly variant: import("@angular/core").InputSignal<"filled" | "plain">;
    protected readonly classes: import("@angular/core").Signal<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsInlineTip, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsInlineTip, "ds-inline-tip, [ds-inline-tip]", never, { "type": { "alias": "type"; "required": false; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}
