import * as i0 from "@angular/core";
export declare class DsTopBarComponent {
    private readonly defaultOptions;
    title: import("@angular/core").InputSignal<string | null>;
    subtitle: import("@angular/core").InputSignal<string | null>;
    iconName: import("@angular/core").InputSignal<string | null>;
    declineBtn: import("@angular/core").InputSignal<string | null>;
    confirmBtn: import("@angular/core").InputSignal<string | null>;
    decline: import("@angular/core").OutputEmitterRef<void>;
    confirm: import("@angular/core").OutputEmitterRef<void>;
    onDecline(): void;
    onConfirm(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsTopBarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsTopBarComponent, "ds-top-bar, [ds-top-bar], [dsTopBar]", never, { "title": { "alias": "title"; "required": false; "isSignal": true; }; "subtitle": { "alias": "subtitle"; "required": false; "isSignal": true; }; "iconName": { "alias": "iconName"; "required": false; "isSignal": true; }; "declineBtn": { "alias": "declineBtn"; "required": false; "isSignal": true; }; "confirmBtn": { "alias": "confirmBtn"; "required": false; "isSignal": true; }; }, { "decline": "decline"; "confirm": "confirm"; }, never, ["*"], true, never>;
}
