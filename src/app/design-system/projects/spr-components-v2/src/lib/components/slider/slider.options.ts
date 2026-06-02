import { InjectionToken } from '@angular/core';
import { SliderInputDirective } from './slider-input';

export const THUMB_POSITION = {
  START: 1,
  END: 0,
} as const;

export type ThumbPosition = (typeof THUMB_POSITION)[keyof typeof THUMB_POSITION];

export const TICK_MARK_STATUS = {
  INACTIVE: 0,
  ACTIVE: 1,
} as const;

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

export const SLIDER_DEFAULT_OPTIONS = new InjectionToken<SliderDefaultOptions>('Slider default options', {
  factory: (): SliderDefaultOptions => ({
    min: 0,
    max: 100,
    step: 1,
    showTickMarks: false,
    showMinMaxLabels: false,
    thumbTextTransformer: (v: string): string => v,
  }),
});
