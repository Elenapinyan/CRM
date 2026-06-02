import { AfterViewInit } from '@angular/core';
import { DynamicPosition, DynamicProjection } from '../dynamic-template/interfaces';
import * as i0 from "@angular/core";
export declare class LabelContainerDirective implements AfterViewInit {
    set dsLabelPosition(value: DynamicPosition);
    set dsLabelProjection(value: DynamicProjection);
    set dsLabelDefaultClass(value: string);
    private readonly elementRef;
    private readonly cdRef;
    private readonly dsLabelDirective;
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LabelContainerDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<LabelContainerDirective, "[dsLabelContainer]", never, { "dsLabelPosition": { "alias": "dsLabelPosition"; "required": false; }; "dsLabelProjection": { "alias": "dsLabelProjection"; "required": false; }; "dsLabelDefaultClass": { "alias": "dsLabelDefaultClass"; "required": false; }; }, {}, never, never, true, never>;
}
