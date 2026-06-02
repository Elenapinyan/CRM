import * as i0 from "@angular/core";
export declare class DsLabelComponent {
    label?: string;
    inputId?: string | null;
    tooltip?: string | null;
    tooltipClassForLabel: string;
    leftIcon?: string | null;
    rightIcon?: string | null;
    className: string | null;
    isLabelReverse: boolean | null;
    shouldStopLabelClickEventPropagation?: boolean;
    isInline: boolean;
    onLabelClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsLabelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsLabelComponent, "ds-label", never, { "label": { "alias": "label"; "required": false; }; "inputId": { "alias": "inputId"; "required": false; }; "tooltip": { "alias": "tooltip"; "required": false; }; "tooltipClassForLabel": { "alias": "tooltipClassForLabel"; "required": false; }; "leftIcon": { "alias": "leftIcon"; "required": false; }; "rightIcon": { "alias": "rightIcon"; "required": false; }; "className": { "alias": "className"; "required": false; }; "isLabelReverse": { "alias": "isLabelReverse"; "required": false; }; "shouldStopLabelClickEventPropagation": { "alias": "shouldStopLabelClickEventPropagation"; "required": false; }; "isInline": { "alias": "isInline"; "required": false; }; }, {}, never, never, true, never>;
}
