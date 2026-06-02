import { ElementRef, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export declare class SprBtnSpinnerDirective implements OnChanges {
    private readonly elRef;
    private readonly renderer;
    sprBtnSpinner: boolean;
    constructor(elRef: ElementRef, renderer: Renderer2);
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprBtnSpinnerDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SprBtnSpinnerDirective, "[sprBtnSpinner]", never, { "sprBtnSpinner": { "alias": "sprBtnSpinner"; "required": false; }; }, {}, never, never, true, never>;
}
