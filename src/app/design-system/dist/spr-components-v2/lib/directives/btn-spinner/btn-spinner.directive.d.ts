import { ElementRef, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export declare class DsBtnSpinnerDirective implements OnChanges {
    private readonly elRef;
    private readonly renderer;
    dsBtnSpinner: boolean;
    constructor(elRef: ElementRef, renderer: Renderer2);
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsBtnSpinnerDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DsBtnSpinnerDirective, "[dsBtnSpinner]", never, { "dsBtnSpinner": { "alias": "dsBtnSpinner"; "required": false; }; }, {}, never, never, true, never>;
}
