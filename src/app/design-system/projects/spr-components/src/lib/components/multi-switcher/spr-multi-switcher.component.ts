import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MultiSwitcherOption } from './interfaces/multi-switcher.interface';
import { DropdownOptionValue } from '../../shared/interfaces/dropdown-option.interface';

@Component({
  selector: 'spr-multi-switcher',
  templateUrl: 'spr-multi-switcher.component.html',
  styleUrls: ['spr-multi-switcher.component.scss'],
  imports: [NgForOf],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SprMultiSwitcherComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SprMultiSwitcherComponent implements ControlValueAccessor {
  @Input() options: MultiSwitcherOption<DropdownOptionValue>[] | undefined = [];
  @Input() switcherId = '';

  currentSelectedValue: DropdownOptionValue = '';
  isDisabled = false;
  isError = false;

  constructor(private readonly cdRef: ChangeDetectorRef) {}

  onChange: (value: DropdownOptionValue) => void = () => {};
  onTouched: () => void = () => {};

  onSwitcherChange(value: DropdownOptionValue): void {
    if (this.currentSelectedValue === value) {
      return;
    }

    this.currentSelectedValue = value;
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: DropdownOptionValue): void {
    this.currentSelectedValue = value ?? '';
    this.cdRef.markForCheck();
  }

  registerOnChange(fn: (_: DropdownOptionValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.cdRef.markForCheck();
  }
}
