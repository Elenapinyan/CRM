import { InjectionToken, OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export interface LongPressDefaults {
    longPressDebounce: number;
    longPressInterval: number;
}
/**
 * Injection token for the default configuration of the long press directive.
 * Provides default values for `longPressDebounce` and `longPressInterval`.
 */
export declare const LONG_PRESS_DEFAULTS: InjectionToken<LongPressDefaults>;
/**
 * Directive to handle long press events on an element.
 * Emits a `sprLongPress` event when the element is pressed and held for a specified duration.
 */
export declare class DsLongPressDirective implements OnInit {
    private readonly destroyRef;
    private readonly elementRef;
    private readonly longPressDefaults;
    readonly sprLongPress: import("@angular/core").OutputEmitterRef<MouseEvent>;
    /**
     * The debounce time in milliseconds before the long press event is emitted.
     * @default 800
     */
    readonly longPressDebounce: import("@angular/core").InputSignal<number>;
    /**
     * The interval in milliseconds at which the long press event is emitted while the mouse button is held down.
     * @default 100
     */
    readonly longPressInterval: import("@angular/core").InputSignal<number>;
    ngOnInit(): void;
    /**
     * Adds event listeners to the host element to detect long press events.
     */
    private addEventListener;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsLongPressDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DsLongPressDirective, "[sprLongPress]", never, { "longPressDebounce": { "alias": "longPressDebounce"; "required": false; "isSignal": true; }; "longPressInterval": { "alias": "longPressInterval"; "required": false; "isSignal": true; }; }, { "sprLongPress": "sprLongPress"; }, never, never, true, never>;
}
