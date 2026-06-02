import { ChangeDetectorRef, DestroyRef, Directive, DoCheck, inject, input, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, ControlValueAccessor, FormBuilder, NgControl } from '@angular/forms';
import { v7 } from 'uuid';
import { ControlSize } from '../../interfaces/controls-size.interface';
import { ErrorMessages } from '../../interfaces/error-messages.interface';
import { injectDefaultErrorMessageConfig } from './constants/base-control.constant';

@Directive()
export abstract class BaseControl<Control extends AbstractControl<any>, OutputType = any> implements ControlValueAccessor, OnInit, DoCheck {
  /* isDisabled is used only for Storybook.
   * Please, avoid usages of this input parameter
   *  in the real application.
   * */
  @Input() set isDisabled(isDisabled: boolean) {
    this.setDisabledState(isDisabled);
  }

  @Input() set errorMessages(config: ErrorMessages) {
    if (config) {
      this.errorMessagesConfig = config;
    }
  }

  @Input() label: string = '';
  @Input() tooltip: string | null = null;
  @Input() tooltipClassForLabel: string = 'ds-component';
  @Input() description: string | null = null;
  @Input() inputClass: Object | null = null;
  @Input() isColored = false;
  @Input() controlSize: ControlSize = 'md';
  inputId = input<string>(v7());

  errorMessagesConfig = injectDefaultErrorMessageConfig();

  protected readonly ngControl = inject(NgControl, { optional: true });
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly cdRef = inject(ChangeDetectorRef);

  protected control: Control = this.initControl();

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

  ngOnInit(): void {
    this.initControlListener();
  }

  ngDoCheck(): void {
    this.handleNgControlTouched();
  }

  registerOnChange(fn: (value?: OutputType | null) => void): void {
    this.cvaOnChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.cvaOnTouched = fn;
  }

  writeValue(value: OutputType | null): void {
    this.control.setValue(value, { emitEvent: false });
    this.cdRef.markForCheck();
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable({ emitEvent: false });
    } else {
      this.control.enable({ emitEvent: false });
    }

    this.cdRef.markForCheck();
  }

  protected initControlListener(): void {
    this.control.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((v) => {
      this.cvaOnChange(v);
    });
  }

  protected cvaOnChange: (value?: OutputType | null) => void = () => {};
  protected cvaOnTouched: () => void = () => {};

  protected abstract initControl(): Control;

  private handleNgControlTouched(): void {
    if (this.ngControl?.errors !== this.control.errors || this.ngControl.touched !== this.control.touched) {
      this.control.setErrors(this.ngControl?.errors || null);
      this.cdRef.markForCheck();
    }
  }
}
