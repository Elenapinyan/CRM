import { PipeTransform } from '@angular/core';
import { ButtonSizeType, ButtonVariant } from './button.options';
import * as i0 from "@angular/core";
export declare class ButtonClassesPipe implements PipeTransform {
    transform(variant: ButtonVariant, size: ButtonSizeType, isIcon?: boolean, isRadius?: boolean): string[];
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonClassesPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<ButtonClassesPipe, "sprButtonClasses", true>;
}
