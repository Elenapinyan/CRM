import { ControlValueAccessor } from '@angular/forms';
import { SegmentedControlId, SegmentedControlModel } from './segmented-controls.options';
import * as i0 from "@angular/core";
export declare class DsSegmentedControls implements ControlValueAccessor {
    readonly items: import("@angular/core").InputSignal<SegmentedControlModel[] | undefined>;
    readonly activeItemId: import("@angular/core").ModelSignal<SegmentedControlId | undefined>;
    readonly touched: import("@angular/core").WritableSignal<boolean>;
    readonly disabled: import("@angular/core").WritableSignal<boolean>;
    onChange: (value: SegmentedControlId) => void;
    onTouched: () => void;
    writeValue(id: SegmentedControlId): void;
    registerOnChange(fn: (value?: SegmentedControlId) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(disabled: boolean): void;
    protected setActiveItem(item: SegmentedControlModel, e?: any): void;
    private markAsTouched;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsSegmentedControls, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsSegmentedControls, "ds-segmented-controls", never, { "items": { "alias": "items"; "required": false; "isSignal": true; }; "activeItemId": { "alias": "activeItemId"; "required": false; "isSignal": true; }; }, { "activeItemId": "activeItemIdChange"; }, never, never, true, never>;
}
