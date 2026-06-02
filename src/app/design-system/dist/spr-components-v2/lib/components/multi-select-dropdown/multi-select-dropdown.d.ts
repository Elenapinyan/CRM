import { FormControl } from '@angular/forms';
import { ControlAddon, DropdownOption, IconAddon, TextAddon } from '../../shared';
import { SelectedOption } from '../../shared/interfaces/selected-option.interface';
import { BaseDropdownControl } from '../../shared/models/base-dropdown-control';
import { SelectionTemplateDirective } from '../selection';
import * as i0 from "@angular/core";
export declare class DsMultiSelectDropdownComponent extends BaseDropdownControl<DropdownOption[], SelectedOption[], DropdownOption[]> {
    private readonly notSelectedOption;
    protected readonly customTemplates: import("@angular/core").Signal<readonly SelectionTemplateDirective<import("../selection").SelectionTemplateType>[]>;
    protected readonly collapsedItems: import("@angular/core").WritableSignal<DropdownOption[]>;
    protected readonly collapsedItemsNames: import("@angular/core").Signal<string>;
    isSelectedAllOption: import("@angular/core").InputSignal<boolean>;
    inputPlaceholder: import("@angular/core").InputSignal<string>;
    searchPlaceholder: import("@angular/core").InputSignal<string>;
    addonStart: import("@angular/core").InputSignal<ControlAddon | null>;
    addonEnd: import("@angular/core").InputSignal<ControlAddon | null>;
    /**
     * Translations
     * @Default DEFAULT_SELECTION_TRANSLATIONS
     **/
    translations: import("@angular/core").InputSignal<import("../selection").SelectionTranslations>;
    addCollapsedItems(items: DropdownOption[]): void;
    remove(option: DropdownOption): void;
    iconAddonTypeGuard(addon: ControlAddon): addon is IconAddon;
    textAddonTypeGuard(addon: ControlAddon): addon is TextAddon;
    resetValue(event: MouseEvent): void;
    protected updateSelectedOptionsOnValueChange(options: DropdownOption[], value: SelectedOption[]): void;
    protected updateSelectedOptionOnOptionsChange(options: DropdownOption[], value: SelectedOption[]): void;
    protected initControlListener(): void;
    protected initControl(): FormControl<DropdownOption[]>;
    private updatedSelectedOptions;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsMultiSelectDropdownComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsMultiSelectDropdownComponent, "ds-multi-select-dropdown", never, { "isSelectedAllOption": { "alias": "isSelectedAllOption"; "required": false; "isSignal": true; }; "inputPlaceholder": { "alias": "inputPlaceholder"; "required": false; "isSignal": true; }; "searchPlaceholder": { "alias": "searchPlaceholder"; "required": false; "isSignal": true; }; "addonStart": { "alias": "addonStart"; "required": false; "isSignal": true; }; "addonEnd": { "alias": "addonEnd"; "required": false; "isSignal": true; }; "translations": { "alias": "translations"; "required": false; "isSignal": true; }; }, {}, ["customTemplates"], never, true, never>;
}
