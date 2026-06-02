import { PipeTransform } from '@angular/core';
import { PaginationParams } from '../interfaces/pagination-bar-config.interface';
import * as i0 from "@angular/core";
export declare class CollectionSizePipe implements PipeTransform {
    readonly nextStepModifier: number;
    transform(collectionSize?: number, paginationParams?: PaginationParams, page?: number, size?: number): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<CollectionSizePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<CollectionSizePipe, "collectionSize", true>;
}
