import { InjectionToken } from '@angular/core';
import { SliderInputDirective } from './slider-input';
export declare const THUMB_POSITION: {
    readonly START: 1;
    readonly END: 0;
};
export type ThumbPosition = (typeof THUMB_POSITION)[keyof typeof THUMB_POSITION];
export declare const TICK_MARK_STATUS: {
    readonly INACTIVE: 0;
    readonly ACTIVE: 1;
};
export type TickMarkStatus = (typeof TICK_MARK_STATUS)[keyof typeof TICK_MARK_STATUS];
export interface SliderDragEvent {
    source: SliderInputDirective;
    value: number;
}
export interface SliderDefaultOptions {
    showTickMarks: boolean;
    showMinMaxLabels: boolean;
    min: number;
    max: number;
    step: number;
    thumbTextTransformer: (v: string) => string;
}
export declare const SLIDER_DEFAULT_OPTIONS: InjectionToken<SliderDefaultOptions>;
