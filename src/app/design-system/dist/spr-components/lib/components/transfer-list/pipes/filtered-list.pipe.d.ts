import { PipeTransform } from '@angular/core';
import { TransferListItem } from '../interfaces/transfer-list.interface';
import * as i0 from "@angular/core";
export declare class FilteredListPipe implements PipeTransform {
    transform(items: TransferListItem[], searchPredicate: string): TransferListItem[];
    private sortAlphabetically;
    static ɵfac: i0.ɵɵFactoryDeclaration<FilteredListPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<FilteredListPipe, "filteredList", true>;
}
