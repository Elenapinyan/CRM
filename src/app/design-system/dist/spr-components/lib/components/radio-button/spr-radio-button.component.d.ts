import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseControl } from '../../shared/models/base-control/base-control';
import * as i0 from "@angular/core";
export declare class SprRadioButtonComponent extends BaseControl<FormControl<unknown>> implements OnInit {
    value: unknown;
    isDecorated: boolean;
    isBottomMargin: boolean;
    isLabelReverse: boolean;
    isInline: boolean;
    leftIcon?: string;
    rightIcon?: string;
    ngOnInit(): void;
    protected initControl(): FormControl<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprRadioButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SprRadioButtonComponent, "spr-radio-button", never, { "value": { "alias": "value"; "required": false; }; "isDecorated": { "alias": "isDecorated"; "required": false; }; "isBottomMargin": { "alias": "isBottomMargin"; "required": false; }; "isLabelReverse": { "alias": "isLabelReverse"; "required": false; }; "isInline": { "alias": "isInline"; "required": false; }; "leftIcon": { "alias": "leftIcon"; "required": false; }; "rightIcon": { "alias": "rightIcon"; "required": false; }; }, {}, never, ["*", "[alternative]"], true, never>;
}
