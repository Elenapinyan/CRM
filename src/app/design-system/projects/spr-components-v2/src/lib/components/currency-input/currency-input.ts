import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs';
import { BaseControl, GetControlErrorMessagePipe, DsControlSizeDirective } from '../../shared';
import { COMMA_REGEX, NUMBER_REGEX, POINT_REGEX, RESTRICTED_NUMBER_INPUT_REGEX } from '../../shared/constants/patterns.constant';
import { DsErrorComponent } from '../error/error.component';
import { DsFieldDescriptionComponent } from '../field-description/field-description.component';
import { CURRENCY_INPUT_DEFAULT_OPTIONS } from './currency-input.options';
import { DsLabelDirective } from '../../directives/label';

@Component({
  selector: 'ds-currency-input',
  imports: [
    ReactiveFormsModule,
    DsFieldDescriptionComponent,
    GetControlErrorMessagePipe,
    DsErrorComponent,
    NgClass,
    DsControlSizeDirective,
    DsLabelDirective,
  ],
  templateUrl: './currency-input.html',
  styleUrl: './currency-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsCurrencyInputComponent extends BaseControl<FormControl<string>, string> implements OnChanges {
  private readonly renderer2 = inject(Renderer2);

  /**
   * Default options for the currency input component
   */
  private readonly currencyInputDefaultOptions = inject(CURRENCY_INPUT_DEFAULT_OPTIONS);

  /**
   * String content to be displayed as a prefix inside the input field
   */
  readonly currencyPrefix = input<string>(this.currencyInputDefaultOptions.prefix);

  /**
   * String content to be displayed as a suffix inside the input field
   */
  readonly currencySuffix = input<string>(this.currencyInputDefaultOptions.suffix);

  /**
   * The text to display as the placeholder for the input
   */
  readonly placeholder = input<string>(this.currencyInputDefaultOptions.placeholder);

  /**
   * Determine whether negative numbers are allowed as valid numeric input
   */
  readonly isNegativeNumbersAcceptable = input<boolean>(this.currencyInputDefaultOptions.isNegativeNumbersAcceptable);

  /**
   * Limit of characters to enter
   */
  readonly maxLength = input<number | null>(this.currencyInputDefaultOptions.maxLength);

  /**
   * Option to make input readonly
   */
  readonly readOnly = input<boolean>(this.currencyInputDefaultOptions.readOnly);

  /**
   * Control the number of decimal places for numeric inputs. 0 - for integer number
   */
  readonly precision = input<number>(this.currencyInputDefaultOptions.precision);

  private readonly inputElement = viewChild<ElementRef<HTMLInputElement>>('inputElement');

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['precision'] !== null) {
      this.control.updateValueAndValidity();
    }
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
