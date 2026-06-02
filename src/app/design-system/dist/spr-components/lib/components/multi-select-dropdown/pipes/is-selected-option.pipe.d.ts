import { PipeTransform } from '@angular/core';
import { DropdownOption } from '../../../shared/interfaces/dropdown-option.interface';
import * as i0 from "@angular/core";
export declare class IsSelectedOptionPipe implements PipeTransform {
    transform(options: DropdownOption[], currentOption: DropdownOption): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<IsSelectedOptionPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<IsSelectedOptionPipe, "isSelectedOption", true>;
}
