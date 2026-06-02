import { SprLabelComponent } from '../../components/label/spr-label.component';
import { SprDynamicComponentDirective } from '../dynamic-template';
import { DynamicPosition } from '../dynamic-template/interfaces';
import * as i0 from "@angular/core";
export declare class SprLabelDirective extends SprDynamicComponentDirective<SprLabelComponent> {
    set shouldStopLabelClickEventPropagation(value: boolean | undefined);
    set sprLabel(value: string | null);
    set sprLabelPosition(value: DynamicPosition);
    set sprLabelClass(value: string);
    set sprLabelIsInline(value: boolean);
    set sprLabelLeftIcon(value: string | undefined);
    set sprLabelRightIcon(value: string | undefined);
    set tooltip(value: string | null);
    set inputId(value: string | undefined);
    private label?;
    private labelClass?;
    private labelIconTooltip?;
    private labelInputId?;
    private leftIcon?;
    private rightIcon?;
    private isInline?;
    private updateSprLabelComponentValues;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprLabelDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SprLabelDirective, "[sprLabel]", never, { "shouldStopLabelClickEventPropagation": { "alias": "shouldStopLabelClickEventPropagation"; "required": false; }; "sprLabel": { "alias": "sprLabel"; "required": false; }; "sprLabelPosition": { "alias": "sprLabelPosition"; "required": false; }; "sprLabelClass": { "alias": "sprLabelClass"; "required": false; }; "sprLabelIsInline": { "alias": "sprLabelIsInline"; "required": false; }; "sprLabelLeftIcon": { "alias": "sprLabelLeftIcon"; "required": false; }; "sprLabelRightIcon": { "alias": "sprLabelRightIcon"; "required": false; }; "tooltip": { "alias": "tooltip"; "required": false; }; "inputId": { "alias": "inputId"; "required": false; }; }, {}, never, never, true, never>;
}
