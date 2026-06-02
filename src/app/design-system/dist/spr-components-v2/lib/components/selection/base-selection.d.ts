import { DropdownOption } from '../../shared';
import { BaseControlValueAccessor } from '../../shared/utils';
import * as i0 from "@angular/core";
export declare abstract class BaseSelection extends BaseControlValueAccessor<unknown | unknown[] | null> {
    protected readonly filteredOptions: import("@angular/core").Signal<DropdownOption[]>;
    protected readonly maxItems: import("@angular/core").Signal<number>;
    /**
     * Maximum number of displayed options in dropdown without scrolling
     * @Default 10
     **/
    maxDisplayedItems: import("@angular/core").InputSignal<number>;
    /**
     * Options list
     * @Default []
     **/
    options: import("@angular/core").InputSignal<DropdownOption[]>;
    /**
     * Enables/disables items filtering
     * @Default false
     **/
    withSearch: import("@angular/core").InputSignal<boolean>;
    /**
     * Set placeholder for the search input
     * @Default empty string
     **/
    searchPlaceholder: import("@angular/core").InputSignal<string>;
    /**
     * Emits when search value is changed
     **/
    searchTerm: import("@angular/core").ModelSignal<string>;
    /**
     * This property let you specify option property key be used as a value
     **/
    valueKey: import("@angular/core").InputSignal<false | keyof DropdownOption>;
    protected abstract select(option: DropdownOption): void;
    private filterOptions;
    static ɵfac: i0.ɵɵFactoryDeclaration<BaseSelection, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BaseSelection, never, never, { "maxDisplayedItems": { "alias": "maxDisplayedItems"; "required": false; "isSignal": true; }; "options": { "alias": "options"; "required": false; "isSignal": true; }; "withSearch": { "alias": "withSearch"; "required": false; "isSignal": true; }; "searchPlaceholder": { "alias": "searchPlaceholder"; "required": false; "isSignal": true; }; "searchTerm": { "alias": "searchTerm"; "required": false; "isSignal": true; }; "valueKey": { "alias": "valueKey"; "required": false; "isSignal": true; }; }, { "searchTerm": "searchTermChange"; }, never, never, true, never>;
}
