import { DsLabelComponent } from '../../components/label/label.component';
import { DsDynamicComponentDirective } from '../dynamic-template';
import { DynamicPosition, DynamicProjection } from '../dynamic-template/interfaces';
import * as i0 from "@angular/core";
export declare class DsLabelDirective extends DsDynamicComponentDirective<DsLabelComponent> {
    set shouldStopLabelClickEventPropagation(value: boolean | undefined);
    set dsLabel(value: string | null);
    set dsLabelPosition(value: DynamicPosition);
    set dsLabelProjection(value: DynamicProjection);
    set dsLabelClass(value: string);
    set dsLabelIsInline(value: boolean);
    set dsLabelLeftIcon(value: string | undefined);
    set dsLabelRightIcon(value: string | undefined);
    set tooltip(value: string | null);
    set tooltipClassForLabel(value: string);
    set inputId(value: string | undefined);
    private label?;
    private labelClass?;
    private labelIconTooltip?;
    private labelIconTooltipClass;
    private labelInputId?;
    private leftIcon?;
    private rightIcon?;
    private isInline?;
    private updateSprLabelComponentValues;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsLabelDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DsLabelDirective, "[dsLabel]", never, { "shouldStopLabelClickEventPropagation": { "alias": "shouldStopLabelClickEventPropagation"; "required": false; }; "dsLabel": { "alias": "dsLabel"; "required": false; }; "dsLabelPosition": { "alias": "dsLabelPosition"; "required": false; }; "dsLabelProjection": { "alias": "dsLabelProjection"; "required": false; }; "dsLabelClass": { "alias": "dsLabelClass"; "required": false; }; "dsLabelIsInline": { "alias": "dsLabelIsInline"; "required": false; }; "dsLabelLeftIcon": { "alias": "dsLabelLeftIcon"; "required": false; }; "dsLabelRightIcon": { "alias": "dsLabelRightIcon"; "required": false; }; "tooltip": { "alias": "tooltip"; "required": false; }; "tooltipClassForLabel": { "alias": "tooltipClassForLabel"; "required": false; }; "inputId": { "alias": "inputId"; "required": false; }; }, {}, never, never, true, never>;
}
