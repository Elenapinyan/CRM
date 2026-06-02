import { PipeTransform } from '@angular/core';
import { DropdownOption } from '../interfaces/dropdown-option.interface';
import * as i0 from "@angular/core";
export declare class FilterOptionsPipe implements PipeTransform {
    transform(options: DropdownOption[], searchValue: string | null): DropdownOption[];
    static ɵfac: i0.ɵɵFactoryDeclaration<FilterOptionsPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<FilterOptionsPipe, "filterOptions", true>;
}
