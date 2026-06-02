import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownOptionValue } from '../../shared/interfaces/dropdown-option.interface';
import { MultiSwitcherOption, MultiSwitcherSize } from './multi-switcher.options';

@Component({
  selector: 'ds-multi-switcher',
  templateUrl: 'multi-switcher.html',
  styleUrls: ['multi-switcher.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsMultiSwitcherComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsMultiSwitcherComponent implements ControlValueAccessor {
  readonly options = input<MultiSwitcherOption<DropdownOptionValue>[]>([]);
  readonly switcherId = input('');
  readonly size = input<MultiSwitcherSize>('md');

  protected readonly currentSelectedValue = signal<DropdownOptionValue>('');
  protected readonly isDisabled = signal(false);

  onChange: (value: DropdownOptionValue) => void = () => {};
  onTouched: () => void = () => {};

  onSwitcherChange(value: DropdownOptionValue): void {
    if (this.currentSelectedValue() === value) {
      return;
    }

    this.currentSelectedValue.set(value);
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: DropdownOptionValue): void {
    this.currentSelectedValue.set(value ?? '');
  }

  registerOnChange(fn: (_: DropdownOptionValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }
}
