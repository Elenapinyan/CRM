import { FormControl } from '@angular/forms';
import { BaseControl } from '../../shared/models/base-control/base-control';
import * as i0 from "@angular/core";
import * as i1 from "../../directives/spr-label/spr-label.directive";
export declare class SprSwitcherComponent extends BaseControl<FormControl<boolean | null>> {
    isDecorated: boolean;
    isLabelReverse: boolean;
    isInline: boolean;
    secondLabel: string | null;
    protected initControl(): FormControl<boolean | null>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprSwitcherComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SprSwitcherComponent, "spr-switcher", never, { "isDecorated": { "alias": "isDecorated"; "required": false; }; "isLabelReverse": { "alias": "isLabelReverse"; "required": false; }; "isInline": { "alias": "isInline"; "required": false; }; "secondLabel": { "alias": "secondLabel"; "required": false; }; }, {}, never, never, true, [{ directive: typeof i1.SprLabelDirective; inputs: { "inputId": "inputId"; "tooltip": "tooltip"; "sprLabel": "label"; "sprLabelIsInline": "labelIsInline"; "sprLabelClass": "labelClass"; "sprLabelPosition": "labelPosition"; "sprLabelLeftIcon": "labelLeftIcon"; "sprLabelRightIcon": "labelRightIcon"; }; outputs: {}; }]>;
}
