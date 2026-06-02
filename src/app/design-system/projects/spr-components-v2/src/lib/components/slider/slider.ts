import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  NgZone,
  numberAttribute,
  OnDestroy,
  Renderer2,
  signal,
  untracked,
  viewChild,
  viewChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SliderInputDirective } from './slider-input';
import { SliderVisualThumb } from './slider-virtual-thumb';
import { SLIDER_DEFAULT_OPTIONS, TICK_MARK_STATUS, TickMarkStatus } from './slider.options';

type SliderControlType = number | [number, number] | null;

@Component({
  selector: 'ds-slider',
  templateUrl: './slider.html',
  styleUrl: './slider.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DsSlider,
    },
  ],
  host: {
    '[class.disabled]': 'disabled()',
    '[class.slider--tick-marks]': 'showTickMarks',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SliderVisualThumb, SliderInputDirective],
})
export class DsSlider implements ControlValueAccessor, AfterViewInit, OnDestroy {
  private readonly ngZone = inject(NgZone);
  private readonly renderer = inject(Renderer2);
  private readonly hostElement: HTMLElement = inject(ElementRef).nativeElement;
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly sliderDefaultOptions = inject(SLIDER_DEFAULT_OPTIONS);

  protected readonly startInput = viewChild<ElementRef<HTMLInputElement>>('startInput');
  protected readonly sliderWrapper = viewChild<ElementRef<HTMLElement>>('slider');
  protected readonly inputs = viewChildren<ElementRef<HTMLInputElement>>('input');

  readonly isRange = input(false, { transform: booleanAttribute });
  readonly showTickMarks = input(this.sliderDefaultOptions.showTickMarks, { transform: booleanAttribute });
  readonly showMinMaxLabels = input(this.sliderDefaultOptions.showMinMaxLabels, { transform: booleanAttribute });
  readonly min = input(this.sliderDefaultOptions.min, { transform: numberAttribute });
  readonly max = input(this.sliderDefaultOptions.max, { transform: numberAttribute });
  readonly step = input(this.sliderDefaultOptions.step, { transform: numberAttribute });
  readonly thumbTextTransformer = input<(v: string) => string>(this.sliderDefaultOptions.thumbTextTransformer);

  readonly disabled = signal(false);

  protected endMin = computed(() => {
    if (!this.isRange()) {
      return this.min();
    } else {
      return this.startValue();
    }
  });

  protected mouseOverPart = signal<'start' | 'end' | null>(null);

  /** Used to keep track of & render the active & inactive tick marks on the slider track. */
  protected tickMarks = computed<TickMarkStatus[]>(() => {
    const showTickMarks = this.showTickMarks();

    if (!showTickMarks) {
      return [];
    }

    const endValue = this.endValue();
    const startValue = this.isRange() ? this.startValue() : 0;
    const min = this.min();
    const max = this.max();
    const step = this.step();

    const numInactiveBeforeStartThumb = Math.max(Math.round((startValue - min) / step), 0);
    const numActive = Math.max(Math.round((endValue - startValue) / step) + 1, 0);
    const numInactiveAfterEndThumb = Math.max(Math.round((max - endValue) / step), 0);
    return Array(numInactiveBeforeStartThumb)
      .fill(TICK_MARK_STATUS.INACTIVE)
      .concat(Array(numActive).fill(TICK_MARK_STATUS.ACTIVE), Array(numInactiveAfterEndThumb).fill(TICK_MARK_STATUS.INACTIVE));
  });

  protected endValue = signal(this.min());

  protected startValue = signal(this.min());

  protected activeTrackStyles = computed(() => {
    const widht = ((this.endValue() - this.min()) * 100) / (this.max() - this.min());

    if (this.isRange()) {
      const left = ((this.startValue() - this.min()) * 100) / (this.max() - this.min());
      return `left: ${left}%; width: ${widht - left}%`;
    } else {
      return `width: ${widht}%`;
    }
  });

  protected endThumbStyles = computed(() => {
    const percent = ((this.endValue() - this.min()) * 100) / (this.max() - this.min());
    return `left: ${percent}%`;
  });

  protected startThumbStyles = computed(() => {
    const percent = ((this.startValue() - this.min()) * 100) / (this.max() - this.min());
    return `left: ${percent}%`;
  });

  protected startValueIndicatorText = computed(() => {
    return this.thumbTextTransformer()(this.startValue().toString());
  });

  protected endValueIndicatorText = computed(() => {
    return this.thumbTextTransformer()(this.endValue().toString());
  });

  protected configurationError = signal<string | null>(null);

  // cleanup array for dom events
  private listenerCleanups: (() => void)[] = [];

  constructor() {
    // update parent form control
    let initialRun: boolean | null = true;
    effect(() => {
      const isRange = untracked(() => this.isRange());
      const endValue = this.endValue();
      const startValue = this.startValue();

      if (initialRun) {
        initialRun = null;
        return;
      }

      if (isRange) {
        this.onChange([startValue, endValue]);
      } else {
        this.onChange(endValue);
      }

      // need to fix ExpressionChangedAfterItHasBeenCheckedError
      this.changeDetectorRef.markForCheck();
    });

    // Check min/max/step inputs validity
    effect(() => {
      const max = this.max();
      const min = this.min();
      const step = this.step();
      let errorTitle: string | null = null;

      if (min >= max) {
        errorTitle = 'Range error: min must be less than or equal to max. Please update imputs values.';
      } else if (max - min < step) {
        errorTitle = 'Step error: step must be less than the difference between max and min values. Please update imputs values.';
      } else if (step <= 0) {
        errorTitle = 'Step error: step must be greater than zero. Please update imputs values.';
      }

      this.configurationError.set(errorTitle);
      if (errorTitle) {
        console.error(errorTitle);
      }
    });
  }

  ngAfterViewInit(): void {
    // These listeners don't update any data bindings so we bind them outside
    // of the NgZone to prevent Angular from needlessly running change detection.
    this.ngZone.runOutsideAngular(() => {
      const element = this.sliderWrapper()?.nativeElement;

      if (element) {
        this.listenerCleanups = [
          this.renderer.listen(element, 'pointerleave', this.onMouseLeave.bind(this)),
          this.renderer.listen(element, 'pointermove', this.onPointerMove.bind(this)),
        ];
      }
    });
  }

  ngOnDestroy(): void {
    this.listenerCleanups.forEach((cleanup) => cleanup());
    this.listenerCleanups = undefined as never;
  }

  // Controll value accessor logic
  onChange = (value: SliderControlType): void => {};

  onTouched = (): void => {};

  writeValue(value: SliderControlType): void {
    const max = this.max();
    const min = this.min();

    if (!value) {
      this.endValue.set(min);
      this.startValue.set(min);
      return;
    }

    if (typeof value === 'number') {
      this.endValue.set(this.validateValue(value, max, min));
    } else {
      const startValue = this.validateValue(value[0], value[1], min);
      this.startValue.set(startValue);
      this.endValue.set(this.validateValue(value[1], max, startValue));
    }
  }

  registerOnChange(onChange: (value: SliderControlType) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled.set(disabled);
  }
  // End controll value accessor logic

  protected readonly onMouseLeave = (): void => {
    this.mouseOverPart.set(null);
  };

  protected readonly onPointerMove = (event: PointerEvent): void => {
    if (!this.isRange()) {
      this.mouseOverPart.set('end');
      return;
    }

    const fullWidth = this.startInput()?.nativeElement?.clientWidth || this.hostElement.clientWidth;
    const hostWidth = this.hostElement.clientWidth;
    const widthDiff = (fullWidth - hostWidth) / 2;

    const center = (this.endValue() - this.startValue()) / 2 + this.startValue() - this.min();

    const centerPercent = (center * 100) / (this.max() - this.min());
    const mousePercent = ((event.offsetX - widthDiff) * 100) / hostWidth;

    this.mouseOverPart.set(mousePercent < centerPercent ? 'start' : 'end');
  };

  private validateValue(value: number, max: number, min: number): number {
    if (value > max) {
      return max;
    }

    if (value < min) {
      return min;
    }

    return value;
  }
}
