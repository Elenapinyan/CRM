import { CdkStepLabel } from '@angular/cdk/stepper';
import { DsStep } from './step';
import * as i0 from "@angular/core";
export declare class SprStepHeaderCustomDirective<T = DsStep> extends CdkStepLabel {
    static ngTemplateContextGuard<T>(dir: SprStepHeaderCustomDirective<T>, ctx: unknown): ctx is {
        $implicit: T;
        index: number;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<SprStepHeaderCustomDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SprStepHeaderCustomDirective<any>, "[sprStepHeaderCustom]", never, {}, {}, never, never, true, never>;
}
