import { PipeTransform } from '@angular/core';
import { ButtonSizeType, ButtonVariant } from '../interfaces/spr-button.interface';
import * as i0 from "@angular/core";
export declare class SprButtonClassesPipe implements PipeTransform {
    transform(variant: ButtonVariant, size: ButtonSizeType, isIcon?: boolean, isRadius?: boolean): string[];
    static ɵfac: i0.ɵɵFactoryDeclaration<SprButtonClassesPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<SprButtonClassesPipe, "sprButtonClasses", true>;
}
