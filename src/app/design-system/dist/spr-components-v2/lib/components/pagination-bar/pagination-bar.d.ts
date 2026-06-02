import { Pagination, PaginationParams } from './pagination-bar.options';
import * as i0 from "@angular/core";
export declare class PaginationBar {
    readonly page: import("@angular/core").ModelSignal<number>;
    readonly size: import("@angular/core").ModelSignal<number>;
    readonly sizes: import("@angular/core").ModelSignal<number[]>;
    readonly total: import("@angular/core").InputSignal<number>;
    readonly paginationParams: import("@angular/core").InputSignal<PaginationParams | undefined>;
    readonly disabled: import("@angular/core").InputSignal<boolean>;
    readonly translationsConfig: import("@angular/core").InputSignal<import("./pagination-bar.options").PaginationTranslationsConfig>;
    readonly paginationChanges: import("@angular/core").OutputEmitterRef<Pagination>;
    readonly searchValue: import("@angular/core").OutputEmitterRef<string>;
    protected readonly pages: import("@angular/core").Signal<number[]>;
    protected readonly pagesSectionTranslation: import("@angular/core").Signal<string>;
    protected readonly rowsPerPageTranslation: import("@angular/core").Signal<string>;
    protected readonly showingTranslation: import("@angular/core").Signal<string>;
    changePage(page: number): void;
    changeSize(size: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PaginationBar, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PaginationBar, "ds-pagination-bar", never, { "page": { "alias": "page"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "sizes": { "alias": "sizes"; "required": false; "isSignal": true; }; "total": { "alias": "total"; "required": false; "isSignal": true; }; "paginationParams": { "alias": "paginationParams"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "translationsConfig": { "alias": "translationsConfig"; "required": false; "isSignal": true; }; }, { "page": "pageChange"; "size": "sizeChange"; "sizes": "sizesChange"; "paginationChanges": "paginationChanges"; "searchValue": "searchValue"; }, never, never, true, never>;
}
