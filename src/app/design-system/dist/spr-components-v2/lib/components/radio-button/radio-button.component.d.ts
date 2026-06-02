import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseControl } from '../../shared';
import * as i0 from "@angular/core";
import * as i1 from "../../directives/component-theme/component-theme.directive";
export declare class DsRadioButtonComponent extends BaseControl<FormControl<unknown>> implements OnInit {
    value: unknown;
    isDecorated: boolean;
    isBottomMargin: boolean;
    isLabelReverse: boolean;
    isInline: boolean;
    leftIcon?: string;
    rightIcon?: string;
    name?: string;
    ngOnInit(): void;
    protected initControl(): FormControl<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsRadioButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsRadioButtonComponent, "ds-radio-button", never, { "value": { "alias": "value"; "required": false; }; "isDecorated": { "alias": "isDecorated"; "required": false; }; "isBottomMargin": { "alias": "isBottomMargin"; "required": false; }; "isLabelReverse": { "alias": "isLabelReverse"; "required": false; }; "isInline": { "alias": "isInline"; "required": false; }; "leftIcon": { "alias": "leftIcon"; "required": false; }; "rightIcon": { "alias": "rightIcon"; "required": false; }; "name": { "alias": "name"; "required": false; }; }, {}, never, ["*"], true, [{ directive: typeof i1.ComponentThemeDirective; inputs: { "themeType": "themeType"; }; outputs: {}; }]>;
}
