import * as i0 from "@angular/core";
export declare class DsFilterInnerHeader {
    private readonly filter;
    protected readonly filterValueCount: import("@angular/core").Signal<number>;
    protected readonly counterValue: import("@angular/core").Signal<string>;
    text: import("@angular/core").InputSignal<string | null>;
    counter: import("@angular/core").InputSignal<string | number | null | undefined>;
    clear(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsFilterInnerHeader, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsFilterInnerHeader, "ds-filter-inner-header", never, { "text": { "alias": "text"; "required": false; "isSignal": true; }; "counter": { "alias": "counter"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
