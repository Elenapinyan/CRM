import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  OnChanges,
  output,
  Renderer2,
  SimpleChanges,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DsLabelDirective } from '../../directives/label';
import { map } from 'rxjs';

import { DsFieldDescriptionComponent } from '../field-description/field-description.component';
import { NUMERIC_INPUT_DEFAULT_OPTIONS } from './numeric-input.options';
import { BaseControl, GetControlErrorMessagePipe, DsControlSizeDirective, DsLongPressDirective } from '../../shared';
import { COMMA_REGEX, NUMBER_REGEX, POINT_REGEX, RESTRICTED_NUMBER_INPUT_REGEX } from '../../shared/constants/patterns.constant';
import { DsErrorComponent } from '../error/error.component';

@Component({
  selector: 'ds-numeric-input',
  imports: [
    ReactiveFormsModule,
    DsFieldDescriptionComponent,
    GetControlErrorMessagePipe,
    DsErrorComponent,
    NgClass,
    DsControlSizeDirective,
    DsLongPressDirective,
    DsLabelDirective,
  ],
  templateUrl: './numeric-input.html',
  styleUrl: './numeric-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsNumericInputComponent extends BaseControl<FormControl<string>, string> implements OnChanges {
  private readonly renderer2 = inject(Renderer2);

  /**
   * Default options for the numeric input component
   */
  private readonly numericInputDefaultOptions = inject(NUMERIC_INPUT_DEFAULT_OPTIONS);

  /**
   * String content to be displayed as a prefix inside the input field
   */
  readonly numericPrefix = input<string>(this.numericInputDefaultOptions.prefix);

  /**
   * The text to display as the placeholder for the input
   */
  readonly placeholder = input<string>(this.numericInputDefaultOptions.placeholder);

  /**
   * The amount to increment or decrement the input value when using step controls
   */
  readonly step = input<number>(this.numericInputDefaultOptions.step);

  /**
   * Determine whether negative numbers are allowed as valid numeric input
   */
  readonly isNegativeNumbersAcceptable = input<boolean>(this.numericInputDefaultOptions.isNegativeNumbersAcceptable);

  /**
   * Limit of characters to enter
   */
  readonly maxLength = input<number | null>(this.numericInputDefaultOptions.maxLength);

  /**
   * Option to make input readonly
   */
  readonly readOnly = input<boolean>(this.numericInputDefaultOptions.readOnly);

  /**
   * Control the number of decimal places for numeric inputs. 0 - for integer number
   */
  readonly precision = input<number>(this.numericInputDefaultOptions.precision);

  readonly blurEvent = output<FocusEvent>();

  private readonly inputElement = viewChild<ElementRef<HTMLInputElement>>('inputElement');

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['precision'] !== null) {
      this.control.updateValueAndValidity();
    }
  }

  onBlur(event: FocusEvent): void {
    this.cvaOnTouched();

    this.blurEvent.emit(event);
  }

  override writeValue(value: number | string | null): void {
    super.writeValue(value === null ? '' : String(value));
  }

  protected override initControl(): FormControl<string> {
    return this.formBuilder.nonNullable.control<string>('');
  }

  /**
   * Initialize control listener to format input value and emit changes
   */
  protected override initControlListener(): void {
    this.control.valueChanges
      .pipe(
        map((value) => {
          const formattedValue = this.formatValue(value.toString(), this.precision(), this.isNegativeNumbersAcceptable());
          if (formattedValue !== value) {
            this.renderer2.setProperty(this.inputElement()?.nativeElement, 'value', formattedValue);
          }
          return formattedValue;
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value) => {
        this.cvaOnChange(value);
      });
  }

  /**
   * Change the input value by a specified step amount.
   * @param {number} step - the amount to change the input value by (positive or negative)
   */
  protected changeStep(step: number): void {
    const currentValue = parseFloat(this.control.value) || 0;
    let newValue = currentValue + step;
    if (this.isNegativeNumbersAcceptable() === false && newValue < 0) {
      newValue = 0;
    }

    this.control.setValue(newValue.toString());
    this.ngControl?.control?.markAsTouched();
  }

  /**
   * Format the input value based on the specified precision and negative number acceptance.
   * @param {string} value - input value
   * @param {number} precision - number of decimal places (0 - for integer number)
   * @param {boolean} isNegativeNumbersAcceptable - whether negative numbers are allowed
   * @returns {string}
   */
  private formatValue(value: string, precision: number, isNegativeNumbersAcceptable: boolean): string {
    let isNegativeNumber = false;
    if (isNegativeNumbersAcceptable && value[0] === '-') {
      isNegativeNumber = true;
      value = value.slice(1);
    }

    if (!value.match(NUMBER_REGEX)) {
      value = value.replace(RESTRICTED_NUMBER_INPUT_REGEX, '');
    }

    if (value.match(COMMA_REGEX)) {
      value = value.replace(COMMA_REGEX, '.');
    }

    if (!precision) {
      value = value.split('.')[0];
    } else {
      if (value.length === 1 && value[0] === '.') {
        value = '0.';
      }

      const isMoreThanOnePoint = value.match(POINT_REGEX);

      if (isMoreThanOnePoint && isMoreThanOnePoint.length > 1) {
        const [integerPart, ...restPart] = value.split('.');
        value = [integerPart, restPart.join('')].join('.');
      }

      if (precision) {
        const number = value.split(/[\,\.]/);

        if (number[1] && number[1].length > precision) {
          value = `${number[0]}.${number[1].slice(0, precision)}`;
        }
      }
    }

    return `${isNegativeNumber ? '-' : ''}${value}`;
  }
}
