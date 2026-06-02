import * as i0 from "@angular/core";
export declare class SprLabelComponent {
    label?: string;
    inputId?: string | null;
    tooltip?: string | null;
    leftIcon?: string | null;
    rightIcon?: string | null;
    className: string | null;
    isLabelReverse: boolean | null;
    shouldStopLabelClickEventPropagation?: boolean;
    isInline: boolean;
    onLabelClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprLabelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SprLabelComponent, "spr-label", never, { "label": { "alias": "label"; "required": false; }; "inputId": { "alias": "inputId"; "required": false; }; "tooltip": { "alias": "tooltip"; "required": false; }; "leftIcon": { "alias": "leftIcon"; "required": false; }; "rightIcon": { "alias": "rightIcon"; "required": false; }; "className": { "alias": "className"; "required": false; }; "isLabelReverse": { "alias": "isLabelReverse"; "required": false; }; "shouldStopLabelClickEventPropagation": { "alias": "shouldStopLabelClickEventPropagation"; "required": false; }; "isInline": { "alias": "isInline"; "required": false; }; }, {}, never, never, true, never>;
}
