import { FormControl } from '@angular/forms';
import { BaseControl } from '../../shared/models/base-control';
import * as i0 from "@angular/core";
import * as i1 from "../../directives/label/label.directive";
import * as i2 from "../../directives/component-theme/component-theme.directive";
export declare class DsSwitcherComponent extends BaseControl<FormControl<boolean | null>> {
    isDecorated: boolean;
    isLabelReverse: boolean;
    isInline: boolean;
    protected initControl(): FormControl<boolean | null>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsSwitcherComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsSwitcherComponent, "ds-switcher", never, { "isDecorated": { "alias": "isDecorated"; "required": false; }; "isLabelReverse": { "alias": "isLabelReverse"; "required": false; }; "isInline": { "alias": "isInline"; "required": false; }; }, {}, never, never, true, [{ directive: typeof i1.DsLabelDirective; inputs: { "inputId": "inputId"; "tooltip": "tooltip"; "tooltipClassForLabel": "tooltipClassForLabel"; "dsLabel": "label"; "dsLabelIsInline": "labelIsInline"; "dsLabelClass": "labelClass"; "dsLabelPosition": "labelPosition"; "dsLabelLeftIcon": "labelLeftIcon"; "dsLabelRightIcon": "labelRightIcon"; }; outputs: {}; }, { directive: typeof i2.ComponentThemeDirective; inputs: { "themeType": "themeType"; }; outputs: {}; }]>;
}
