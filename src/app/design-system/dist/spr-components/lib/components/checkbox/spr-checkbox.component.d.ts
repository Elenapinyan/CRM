import { FormControl } from '@angular/forms';
import { BaseControl } from '../../shared/models/base-control/base-control';
import { Placement } from './interfaces/spr-checkbox.interface';
import * as i0 from "@angular/core";
export declare class SprCheckboxComponent extends BaseControl<FormControl<boolean | null>> {
    isPartiallyChecked: boolean;
    isLabelReverse: boolean;
    isDecorated: boolean;
    isInline: boolean;
    rightIcon?: string;
    leftIcon?: string;
    shouldStopLabelClickEventPropagation?: boolean;
    tooltipClass: string;
    checkboxTooltip: string;
    tooltipPlacement: Placement;
    protected initControl(): FormControl<boolean | null>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprCheckboxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SprCheckboxComponent, "spr-checkbox", never, { "isPartiallyChecked": { "alias": "isPartiallyChecked"; "required": false; }; "isLabelReverse": { "alias": "isLabelReverse"; "required": false; }; "isDecorated": { "alias": "isDecorated"; "required": false; }; "isInline": { "alias": "isInline"; "required": false; }; "rightIcon": { "alias": "rightIcon"; "required": false; }; "leftIcon": { "alias": "leftIcon"; "required": false; }; "shouldStopLabelClickEventPropagation": { "alias": "shouldStopLabelClickEventPropagation"; "required": false; }; "tooltipClass": { "alias": "tooltipClass"; "required": false; }; "checkboxTooltip": { "alias": "checkboxTooltip"; "required": false; }; "tooltipPlacement": { "alias": "tooltipPlacement"; "required": false; }; }, {}, never, ["*"], true, never>;
}
