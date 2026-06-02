import { PipeTransform } from '@angular/core';
import { DropdownOption } from '../../shared';
import * as i0 from "@angular/core";
export declare class IsSelectedPipe implements PipeTransform {
    transform(option: DropdownOption, options: DropdownOption[]): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<IsSelectedPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<IsSelectedPipe, "isSelected", true>;
}
