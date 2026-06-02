import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule } from '@angular/forms';
import { provideControlValueAccessor } from '../../shared/utils';
import { DsButton } from '../button';
import { DsInputComponent } from '../input/input.component';
import { DEFAULT_MAX, DEFAULT_MIN, DEFAULT_STEP, DEFAULT_UNIT } from './zoom.options';

@Component({
  selector: 'ds-zoom, [ds-zoom], [dsZoom]',
  templateUrl: 'zoom.html',
  styleUrl: 'zoom.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DsButton, DsInputComponent, FormsModule],
  providers: [provideControlValueAccessor(Zoom)],
  host: {
    class: 'spr-zoom',
  },
})
export class Zoom implements ControlValueAccessor {
  /**
   * Property to specify the step.
   * @default `1`
   **/
  step = input<number>(DEFAULT_STEP);

  /**
   * Property to specify the minimal possible value.
   * @default `0`
   **/
  min = input<number>(DEFAULT_MIN);

  /**
   * Property to specify the maximal possible value.
   * @default `100`
   **/
  max = input<number>(DEFAULT_MAX);

  /**
   * Property to specify the unit near to value.
   * @default '%'
   **/
  unit = input<string>(DEFAULT_UNIT);

  protected readonly value = signal<number>(this.min());
  protected readonly inputValue = signal<number | null>(null);
  protected readonly disabled = signal<boolean>(false);

  inputValueChanged(value: number): void {
    this.inputValue.set(value);
  }

  updateValue(): void {
    const inputValue = this.inputValue();
    const min = this.min();
    const max = this.max();

    if (inputValue === null || this.disabled()) {
      return;
    }

    if (inputValue >= max) {
      this.value.set(max);
    } else if (inputValue <= min) {
      this.value.set(min);
    } else {
      this.value.set(inputValue ?? min);
    }

    this.inputValue.set(null);

    this.onChange(this.value());
    this.onTouched(this.value());
  }

  increase(): void {
    const value = this.value();
    const max = this.max();
    const step = this.step();

    if (value >= max || this.disabled()) {
      return;
    }

    const increasedValue = value + step;

    if (max && increasedValue > max) {
      this.value.set(max);
    } else {
      this.value.set(increasedValue);
    }

    this.onChange(this.value());
  }

  decrease(): void {
    const value = this.value();
    const min = this.min();
    const step = this.step();

    if (value <= min || this.disabled()) {
      return;
    }

    const decreasedValue = value - step;

    if (min && decreasedValue < min) {
      this.value.set(min);
    } else {
      this.value.set(decreasedValue);
    }

    this.onChange(this.value());
  }

  writeValue(value: number): void {
    this.value.set(value);
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  protected onChange = (value: number): void => {};
  protected onTouched = (value: number): void => {};
}
