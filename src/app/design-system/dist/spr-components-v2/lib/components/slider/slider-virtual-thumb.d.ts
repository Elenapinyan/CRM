import { AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import * as i0 from "@angular/core";
/** add some extra logic/styles for thumb */
export declare class SliderVisualThumb implements AfterViewInit, OnDestroy {
    private readonly ngZone;
    private readonly renderer;
    readonly valueIndicatorText: import("@angular/core").InputSignal<string | undefined>;
    /** Indicates which slider thumb this input corresponds to. */
    readonly sliderInputs: import("@angular/core").InputSignal<readonly ElementRef<HTMLElement>[] | undefined>;
    readonly isHovered: import("@angular/core").InputSignal<boolean>;
    protected readonly isActive: import("@angular/core").WritableSignal<boolean>;
    protected readonly isFocused: import("@angular/core").WritableSignal<boolean>;
    private listenerCleanups;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private readonly onFocus;
    private readonly onBlur;
    private readonly onDragStart;
    private readonly onDragEnd;
    static ɵfac: i0.ɵɵFactoryDeclaration<SliderVisualThumb, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SliderVisualThumb, "ds-visual-thumb", never, { "valueIndicatorText": { "alias": "valueIndicatorText"; "required": false; "isSignal": true; }; "sliderInputs": { "alias": "sliderInputs"; "required": true; "isSignal": true; }; "isHovered": { "alias": "isHovered"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
