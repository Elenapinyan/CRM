import { FormControl } from '@angular/forms';
import { DropdownOption } from '../../shared/interfaces/dropdown-option.interface';
import { SelectedOption } from '../../shared/interfaces/selected-option.interface';
import { BaseDropdownControl } from '../../shared/models/base-dropdown-control';
import { IconAddon, MultiSelectDropdownAddon, TextAddon } from './interfaces/spr-multi-select-dropdown.interface';
import * as i0 from "@angular/core";
import * as i1 from "../../directives/spr-label/spr-label.directive";
export declare class SprMultiSelectDropdownComponent extends BaseDropdownControl<DropdownOption[], SelectedOption[], DropdownOption[]> {
    isSelectedAllOption: boolean;
    inputPlaceholder: string;
    addonStart: MultiSelectDropdownAddon | null;
    addonEnd: MultiSelectDropdownAddon | null;
    private readonly notSelectedOption;
    select(option: DropdownOption): void;
    iconAddonTypeGuard(addon: MultiSelectDropdownAddon): addon is IconAddon;
    textAddonTypeGuard(addon: MultiSelectDropdownAddon): addon is TextAddon;
    protected updateSelectedOptionsOnValueChange(options: DropdownOption[], value: SelectedOption[]): void;
    protected updateSelectedOptionOnOptionsChange(options: DropdownOption[], value: SelectedOption[]): void;
    protected initControlListener(): void;
    protected initControl(): FormControl<DropdownOption[]>;
    private updatedSelectedOptions;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprMultiSelectDropdownComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SprMultiSelectDropdownComponent, "spr-multi-select-dropdown", never, { "isSelectedAllOption": { "alias": "isSelectedAllOption"; "required": false; }; "inputPlaceholder": { "alias": "inputPlaceholder"; "required": false; }; "addonStart": { "alias": "addonStart"; "required": false; }; "addonEnd": { "alias": "addonEnd"; "required": false; }; }, {}, never, never, true, [{ directive: typeof i1.SprLabelDirective; inputs: { "inputId": "inputId"; "tooltip": "tooltip"; "sprLabel": "label"; "sprLabelIsInline": "labelIsInline"; "sprLabelClass": "labelClass"; "sprLabelPosition": "labelPosition"; "sprLabelLeftIcon": "labelLeftIcon"; "sprLabelRightIcon": "labelRightIcon"; }; outputs: {}; }]>;
}
