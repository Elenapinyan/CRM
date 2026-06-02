import { OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectedOption } from '../../shared/interfaces/selected-option.interface';
import { BaseDropdownControl } from '../../shared/models/base-dropdown-control';
import { ControlAddon, DropdownOption, IconAddon, TextAddon } from '../../shared';
import { SelectionTemplateDirective } from '../selection';
import * as i0 from "@angular/core";
export declare class DsDropdownComponent extends BaseDropdownControl<DropdownOption | null, SelectedOption, DropdownOption[]> implements OnChanges, OnInit {
    protected readonly customTemplates: import("@angular/core").Signal<readonly SelectionTemplateDirective<import("../selection").SelectionTemplateType>[]>;
    placeholder: import("@angular/core").InputSignal<string>;
    inputPlaceholder: import("@angular/core").InputSignal<string>;
    addonStart: import("@angular/core").InputSignal<ControlAddon | null>;
    addonEnd: import("@angular/core").InputSignal<ControlAddon | null>;
    /**
     * Translations
     * @Default DEFAULT_SELECTION_TRANSLATIONS
     **/
    translations: import("@angular/core").InputSignal<import("../selection").SelectionTranslations>;
    iconAddonTypeGuard(addon: ControlAddon): addon is IconAddon;
    textAddonTypeGuard(addon: ControlAddon): addon is TextAddon;
    protected updateSelectedOptionsOnValueChange(options: DropdownOption[], value: SelectedOption): void;
    protected updateSelectedOptionOnOptionsChange(options: DropdownOption[], value: SelectedOption): void;
    protected initControl(): FormControl<DropdownOption | null>;
    protected initControlListener(): void;
    private updateSelectedOptions;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsDropdownComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsDropdownComponent, "ds-dropdown", never, { "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "inputPlaceholder": { "alias": "inputPlaceholder"; "required": false; "isSignal": true; }; "addonStart": { "alias": "addonStart"; "required": false; "isSignal": true; }; "addonEnd": { "alias": "addonEnd"; "required": false; "isSignal": true; }; "translations": { "alias": "translations"; "required": false; "isSignal": true; }; }, {}, ["customTemplates"], ["[addonPrefix]", "[appendSuffix]"], true, never>;
}
