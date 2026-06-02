import { TemplateRef } from '@angular/core';
import { DsStep } from './step';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/stepper";
export declare class DsStepHeader {
    step: import("@angular/core").InputSignal<DsStep>;
    index: import("@angular/core").InputSignal<number>;
    customTemplate: import("@angular/core").InputSignal<TemplateRef<unknown> | undefined>;
    isActive: import("@angular/core").InputSignal<boolean>;
    isInvalid: import("@angular/core").InputSignal<boolean>;
    isCompleted: import("@angular/core").InputSignal<boolean>;
    isDisabled: import("@angular/core").InputSignal<boolean>;
    isLastStep: import("@angular/core").InputSignal<boolean>;
    active: import("@angular/core").OutputEmitterRef<DsStep>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsStepHeader, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsStepHeader, "ds-step-header, [dsStepHeader]", never, { "step": { "alias": "step"; "required": true; "isSignal": true; }; "index": { "alias": "index"; "required": false; "isSignal": true; }; "customTemplate": { "alias": "customTemplate"; "required": false; "isSignal": true; }; "isActive": { "alias": "isActive"; "required": false; "isSignal": true; }; "isInvalid": { "alias": "isInvalid"; "required": false; "isSignal": true; }; "isCompleted": { "alias": "isCompleted"; "required": false; "isSignal": true; }; "isDisabled": { "alias": "isDisabled"; "required": false; "isSignal": true; }; "isLastStep": { "alias": "isLastStep"; "required": false; "isSignal": true; }; }, { "active": "active"; }, never, never, true, [{ directive: typeof i1.CdkStepHeader; inputs: {}; outputs: {}; }]>;
}
