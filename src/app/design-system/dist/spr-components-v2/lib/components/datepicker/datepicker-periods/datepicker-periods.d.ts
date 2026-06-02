import { DropdownOption } from '../../../shared';
import { PeriodVariantType } from '../datepicker.util';
import * as i0 from "@angular/core";
export declare class DsDatepickerPeriods {
    list: import("@angular/core").InputSignal<DropdownOption[]>;
    selectedPeriod: import("@angular/core").InputSignal<PeriodVariantType | null>;
    readonly selected: import("@angular/core").OutputEmitterRef<DropdownOption>;
    protected select(option: DropdownOption): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsDatepickerPeriods, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsDatepickerPeriods, "ds-datepicker-periods", never, { "list": { "alias": "list"; "required": true; "isSignal": true; }; "selectedPeriod": { "alias": "selectedPeriod"; "required": false; "isSignal": true; }; }, { "selected": "selected"; }, never, never, true, never>;
}
