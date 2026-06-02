import { Directive, forwardRef, inject, Provider, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

export const provideControlValueAccessor = <Type>(component: Type): Provider => ({
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => component),
  multi: true,
});

@Directive()
export class BaseControlValueAccessor<Type = unknown> implements ControlValueAccessor {
  protected readonly ngControl = inject(NgControl, { self: true, optional: true });

  protected readonly value = signal<Type | null>(null);
  protected readonly disabled = signal<boolean>(false);

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  protected get isInvalidControl(): boolean {
    return this.isInvalidNgControl && this.isTouchedNgControl;
  }

  protected get isTouchedNgControl(): boolean {
    return this.ngControl?.control?.touched || false;
  }

  protected get isInvalidNgControl(): boolean {
    return this.ngControl?.control?.invalid || false;
  }

  writeValue(value: Type): void {
    this.value.set(value);
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  registerOnChange(fn: (value: Type) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (value?: Type) => void): void {
    this.onTouched = fn;
  }

  protected onChange = (value: Type): void => {};
  protected onTouched = (value?: Type): void => {};
}
