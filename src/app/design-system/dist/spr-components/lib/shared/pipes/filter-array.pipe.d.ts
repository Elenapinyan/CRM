import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class FilterArrayPipe<T extends {
    [prop: string]: unknown;
}> implements PipeTransform {
    transform(arr: T[], searchTerm: string, filterKey: string): T[];
    static ɵfac: i0.ɵɵFactoryDeclaration<FilterArrayPipe<any>, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<FilterArrayPipe<any>, "sprFilterArray", true>;
}
