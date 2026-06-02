import { TemplateRef } from '@angular/core';
import { DsStepperDirective } from './stepper';
import { SprStepHeaderCustomDirective } from './step';
import * as i0 from "@angular/core";
export declare class DsStepperHeader {
    templateRef: TemplateRef<unknown>;
    stepHeaderCustom?: SprStepHeaderCustomDirective;
    protected readonly stepper: DsStepperDirective;
    activateStep(index: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsStepperHeader, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsStepperHeader, "ds-stepper-header, [sprStepperHeader]", never, {}, {}, ["stepHeaderCustom"], never, true, never>;
}
