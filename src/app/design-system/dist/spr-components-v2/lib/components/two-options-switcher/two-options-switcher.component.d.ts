import { FormControl } from '@angular/forms';
import { BaseControl } from '../../shared';
import { TwoOptionSwitcherValue } from './two-options-switcher.interface';
import * as i0 from "@angular/core";
export declare class DsTwoOptionsSwitcherComponent extends BaseControl<FormControl<boolean>, TwoOptionSwitcherValue> {
    labelStart: import("@angular/core").InputSignal<string>;
    labelEnd: import("@angular/core").InputSignal<string>;
    tooltipStart: import("@angular/core").InputSignal<string>;
    tooltipEnd: import("@angular/core").InputSignal<string>;
    startValue: import("@angular/core").InputSignal<TwoOptionSwitcherValue>;
    endValue: import("@angular/core").InputSignal<TwoOptionSwitcherValue>;
    controlToggle(value: boolean): void;
    writeValue(value: TwoOptionSwitcherValue): void;
    protected initControlListener(): void;
    protected initControl(): FormControl<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsTwoOptionsSwitcherComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsTwoOptionsSwitcherComponent, "ds-two-options-switcher", never, { "labelStart": { "alias": "labelStart"; "required": false; "isSignal": true; }; "labelEnd": { "alias": "labelEnd"; "required": false; "isSignal": true; }; "tooltipStart": { "alias": "tooltipStart"; "required": false; "isSignal": true; }; "tooltipEnd": { "alias": "tooltipEnd"; "required": false; "isSignal": true; }; "startValue": { "alias": "startValue"; "required": false; "isSignal": true; }; "endValue": { "alias": "endValue"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
