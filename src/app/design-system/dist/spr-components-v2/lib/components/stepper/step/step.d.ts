import { CdkStep } from '@angular/cdk/stepper';
import { SprStepHeaderCustomDirective } from './step-header-custom';
import * as i0 from "@angular/core";
export declare class DsStep extends CdkStep {
    get hasError(): boolean;
    description: string | null;
    stepHeaderCustom?: SprStepHeaderCustomDirective;
    readonly invalid: import("@angular/core").WritableSignal<boolean>;
    disabled: import("@angular/core").InputSignal<boolean>;
    set hasError(value: boolean);
    static ɵfac: i0.ɵɵFactoryDeclaration<DsStep, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsStep, "ds-step", never, { "hasError": { "alias": "hasError"; "required": false; }; "description": { "alias": "description"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; }, {}, ["stepHeaderCustom"], ["*"], true, never>;
    static ngAcceptInputType_hasError: unknown;
}
