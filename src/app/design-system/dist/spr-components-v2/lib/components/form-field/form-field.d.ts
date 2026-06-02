import { AbstractControl } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class DsFormField {
    label: import("@angular/core").InputSignal<string>;
    description: import("@angular/core").InputSignal<string>;
    tooltip: import("@angular/core").InputSignal<string | null>;
    tooltipClassForLabel: import("@angular/core").InputSignal<string | null>;
    inputId: import("@angular/core").InputSignal<string>;
    errorMessages: import("@angular/core").InputSignal<Partial<Record<string, import("../../shared").ErrorMessageValue>>>;
    control: import("@angular/core").InputSignal<AbstractControl<any, any> | null | undefined>;
    isInvalid: import("@angular/core").InputSignal<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsFormField, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsFormField, "ds-form-field", never, { "label": { "alias": "label"; "required": false; "isSignal": true; }; "description": { "alias": "description"; "required": false; "isSignal": true; }; "tooltip": { "alias": "tooltip"; "required": false; "isSignal": true; }; "tooltipClassForLabel": { "alias": "tooltipClassForLabel"; "required": false; "isSignal": true; }; "inputId": { "alias": "inputId"; "required": false; "isSignal": true; }; "errorMessages": { "alias": "errorMessages"; "required": false; "isSignal": true; }; "control": { "alias": "control"; "required": false; "isSignal": true; }; "isInvalid": { "alias": "isInvalid"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}
