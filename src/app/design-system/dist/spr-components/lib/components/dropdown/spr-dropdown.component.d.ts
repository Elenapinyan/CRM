import { OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DropdownOption } from '../../shared/interfaces/dropdown-option.interface';
import { SelectedOption } from '../../shared/interfaces/selected-option.interface';
import { BaseDropdownControl } from '../../shared/models/base-dropdown-control';
import { DropdownAddon, IconAddon, TextAddon } from './interfaces/spr-dropdown.interface';
import * as i0 from "@angular/core";
export declare class SprDropdownComponent extends BaseDropdownControl<DropdownOption | null, SelectedOption, DropdownOption[]> implements OnChanges, OnInit {
    placeholder: string;
    inputPlaceholder: string;
    addonStart: DropdownAddon | null;
    addonEnd: DropdownAddon | null;
    select(option: DropdownOption): void;
    iconAddonTypeGuard(addon: DropdownAddon): addon is IconAddon;
    textAddonTypeGuard(addon: DropdownAddon): addon is TextAddon;
    protected updateSelectedOptionsOnValueChange(options: DropdownOption[], value: SelectedOption): void;
    protected updateSelectedOptionOnOptionsChange(options: DropdownOption[], value: SelectedOption): void;
    protected initControl(): FormControl<DropdownOption | null>;
    protected initControlListener(): void;
    private updateSelectedOptions;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprDropdownComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SprDropdownComponent, "spr-dropdown", never, { "placeholder": { "alias": "placeholder"; "required": false; }; "inputPlaceholder": { "alias": "inputPlaceholder"; "required": false; }; "addonStart": { "alias": "addonStart"; "required": false; }; "addonEnd": { "alias": "addonEnd"; "required": false; }; }, {}, never, never, true, never>;
}
