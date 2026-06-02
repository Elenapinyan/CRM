import { QueryList } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';
import { DsStep } from './step';
import { DsStepperHeader } from './stepper-header';
import * as i0 from "@angular/core";
export declare class DsStepperDirective extends CdkStepper {
    get selectedIndex(): number;
    selectedStepIndex: import("@angular/core").WritableSignal<number>;
    selectedStep: import("@angular/core").Signal<DsStep | undefined>;
    readonly steps: QueryList<DsStep>;
    set selectedIndex(index: number);
    static ɵfac: i0.ɵɵFactoryDeclaration<DsStepperDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DsStepperDirective, "[dsStepper]", ["dsStepper"], { "selectedIndex": { "alias": "selectedIndex"; "required": false; }; }, {}, never, never, true, never>;
    static ngAcceptInputType_selectedIndex: unknown;
}
export declare class DsStepper extends DsStepperDirective {
    customHeader?: DsStepperHeader;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsStepper, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsStepper, "ds-stepper", never, {}, {}, ["customHeader"], ["[sprStepperActions]"], true, never>;
}
