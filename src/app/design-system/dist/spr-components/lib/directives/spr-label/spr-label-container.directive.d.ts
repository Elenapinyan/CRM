import { AfterViewInit } from '@angular/core';
import { DynamicPosition } from '../dynamic-template/interfaces';
import * as i0 from "@angular/core";
export declare class SprLabelContainerDirective implements AfterViewInit {
    set sprLabelDefaultPosition(value: DynamicPosition);
    set sprLabelDefaultClass(value: string);
    private readonly elementRef;
    private readonly cdRef;
    private readonly sprLabelDirective;
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprLabelContainerDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SprLabelContainerDirective, "[sprLabelContainer]", never, { "sprLabelDefaultPosition": { "alias": "sprLabelDefaultPosition"; "required": false; }; "sprLabelDefaultClass": { "alias": "sprLabelDefaultClass"; "required": false; }; }, {}, never, never, true, never>;
}
