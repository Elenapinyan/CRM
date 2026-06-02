import { PipeTransform } from '@angular/core';
import { DropdownOption } from '../../../shared/interfaces/dropdown-option.interface';
import * as i0 from "@angular/core";
export declare class GetMultiSelectDisplayValuePipe implements PipeTransform {
    transform(value: DropdownOption[] | null): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<GetMultiSelectDisplayValuePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<GetMultiSelectDisplayValuePipe, "getMultiSelectDisplayValue", true>;
}
