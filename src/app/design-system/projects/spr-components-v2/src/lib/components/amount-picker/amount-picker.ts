import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  forwardRef,
  inject,
  input,
  numberAttribute,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { DsCurrencyInputComponent } from '../currency-input';
import { DsSlider } from '../slider';
import { AmountPickerValue, DEFAULT_MAX, DEFAULT_MIN, DEFAULT_PRECISION, DEFAULT_STEP } from './amount-picker.options';
import { debounceTime, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ds-amount-picker',
  templateUrl: 'amount-picker.html',
  styleUrl: 'amount-picker.scss',
  imports: [DsCurrencyInputComponent, FormsModule, DsSlider],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AmountPicker),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmountPicker implements ControlValueAccessor {
  private readonly destroyRef = inject(DestroyRef);

  readonly min = input(DEFAULT_MIN, { transform: numberAttribute });
  readonly max = input(DEFAULT_MAX, { transform: numberAttribute });
  readonly step = input(DEFAULT_STEP, { transform: numberAttribute });
  readonly precision = input(DEFAULT_PRECISION, { transform: numberAttribute });
  readonly currencyPrefix = input('');
  readonly currencySuffix = input('');

  protected readonly startInputModel = viewChild<NgModel>('startInputModel');
  protected readonly endInputModel = viewChild<NgModel>('endInputModel');

  protected readonly startValue = signal<number>(DEFAULT_MIN);
  protected readonly endValue = signal<number>(DEFAULT_MAX);
  protected readonly isDisabled = signal(false);

  protected readonly sliderValue = computed(() => [this.startValue(), this.endValue()]);

  private readonly startInput$ = new Subject<string | null>();
  private readonly endInput$ = new Subject<string | null>();

  constructor() {
    this.startInput$.pipe(debounceTime(800), takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      this.processStartInput(value);
    });

    this.endInput$.pipe(debounceTime(800), takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      this.processEndInput(value);
    });
  }

  onChange = (value: AmountPickerValue): void => {};
  onTouched = (): void => {};

  writeValue(value: AmountPickerValue): void {
    if (Array.isArray(value)) {
      const [startValue, endValue] = value;
      this.startValue.set(startValue);
      this.endValue.set(endValue);
    } else {
      this.startValue.set(this.min());
      this.endValue.set(this.max());
    }
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  protected onStartInputChange(rawValue: string | null): void {
    this.startInput$.next(rawValue);
  }

  protected onEndInputChange(rawValue: string | null): void {
    this.endInput$.next(rawValue);
  }

  protected onSliderChange(value: AmountPickerValue): void {
    if (!Array.isArray(value)) {
      return;
    }

    const [startValue, endValue] = value;

    this.startValue.set(startValue);
    this.endValue.set(endValue);

    this.emitValues();
  }

  /**
   * Final validation: enforces min/max limits and ensures start <= end.
   */
  protected onBlur(): void {
    const currentStart = this.normalizeValueFromStringToNumber(this.startInputModel()?.control.value);
    const currentEnd = this.normalizeValueFromStringToNumber(this.endInputModel()?.control.value);

    const safeStart = Math.min(Math.max(currentStart, this.min()), this.endValue());
    const safeEnd = Math.max(Math.min(currentEnd, this.max()), safeStart);

    this.startValue.set(safeStart);
    this.endValue.set(safeEnd);

    this.startInputModel()?.control.setValue(safeStart, { emitEvent: false });
    this.endInputModel()?.control.setValue(safeEnd, { emitEvent: false });

    this.emitValues();
    this.onTouched();
  }

  private emitValues(): void {
    this.onChange([this.startValue(), this.endValue()]);
  }

  private normalizeValueFromStringToNumber(value: string | null): number {
    if (!value) {
      return 0;
    }

    const parsed = Number(value);

    return isNaN(parsed) ? 0 : parsed;
  }

  /**
   * Checks for incomplete inputs like "1." or "1,".
   * Used to pause validation while typing.
   */
  private isIntermediateInputState(value: string | null): boolean {
    if (!value) {
      return false;
    }

    const str = value.toString();

    return str.endsWith('.') || str.endsWith(',');
  }

  /**
   * Updates the UI input only if the validation logic changed the value (clamped).
   * Avoids unnecessary updates that could disrupt typing.
   */
  private syncInputView(model: NgModel | undefined, userInput: number, clampedValue: number): void {
    if (userInput !== clampedValue) {
      model?.control.setValue(clampedValue, { emitEvent: false });
    }
  }

  private processStartInput(rawValue: string | null): void {
    if (this.isIntermediateInputState(rawValue)) {
      return;
    }

    const value = this.normalizeValueFromStringToNumber(rawValue);

    const newValue = Math.min(Math.max(value, this.min()), this.endValue());

    this.startValue.set(newValue);

    this.syncInputView(this.startInputModel(), value, newValue);

    this.emitValues();
  }

  private processEndInput(rawValue: string | null): void {
    if (this.isIntermediateInputState(rawValue)) {
      return;
    }

    const value = this.normalizeValueFromStringToNumber(rawValue);

    const newValue = Math.min(value, this.max());

    this.endValue.set(newValue);

    this.syncInputView(this.endInputModel(), value, newValue);

    this.emitValues();
  }
}
