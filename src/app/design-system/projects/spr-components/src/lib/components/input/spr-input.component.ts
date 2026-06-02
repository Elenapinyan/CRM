import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgClass, NgIf } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import Big from 'big.js';
import { filter, fromEvent, map, switchMap, take, takeUntil, tap } from 'rxjs';
import { BaseControl, ControlAddon, GetControlErrorMessagePipe, IconAddon, SprControlSizeDirective, TextAddon } from '../../shared';
import { COMMA_REGEX, NUMBER_REGEX, POINT_REGEX, RESTRICTED_NUMBER_INPUT_REGEX } from '../../shared/constants/patterns.constant';
import { SprErrorComponent } from '../error/spr-error.component';
import { SprFieldDescriptionComponent } from '../field-description/spr-field-description.component';
import { InputType } from './interfaces/spr-input-type.interface';
import { SprLabelDirective } from '../../directives/spr-label';

@Component({
  selector: 'spr-input',
  templateUrl: 'spr-input.component.html',
  styleUrls: ['spr-input.component.scss'],
  imports: [
    NgIf,
    NgClass,
    ReactiveFormsModule,
    GetControlErrorMessagePipe,
    ClipboardModule,
    SprControlSizeDirective,
    SprErrorComponent,
    SprFieldDescriptionComponent,
    SprLabelDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SprInputComponent extends BaseControl<FormControl<string>> implements AfterViewInit, OnChanges {
  @Input() precision: number | null = null;
  @Input() type: InputType = 'text';
  @Input() placeholder: string = '';
  @Input() isNegativeNumbersAcceptable = false;
  @Input() onlyInteger = false;
  @Input() isSubmitStrategy = false;

  @Input() addonStart: ControlAddon | null = null;
  @Input() addonEnd: ControlAddon | null = null;
  @Input() prepend = false;
  @Input() append = false;
  @Input() rounded = false;
  @Input() maxLength?: number;
  @Input() readOnly = false;
  @Input() isRevealedInput = false;

  @Output() inputTypeChange = new EventEmitter<void>();
  @Output() blurEvent = new EventEmitter<FocusEvent>();

  @ViewChild('inputElement', { read: ElementRef }) inputElement!: ElementRef<HTMLInputElement>;

  isPasswordVisible = false;

  private isSubmit = false;

  constructor(private readonly renderer2: Renderer2) {
    super();
  }

  get displayedInputType(): 'password' | 'text' {
    if (this.type !== 'password') {
      return 'text';
    }

    return this.isPasswordVisible ? 'text' : 'password';
  }

  ngAfterViewInit(): void {
    if (this.isSubmitStrategy) {
      this.initSubmitStrategyListener();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['precision'] !== null) {
      this.control.updateValueAndValidity();
    }
  }

  togglePasswordVisibility(): void {
    if (this.isRevealedInput) {
      this.inputTypeChange.emit();
      return;
    }

    this.isPasswordVisible = !this.isPasswordVisible;
  }

  focus(): void {
    this.inputElement.nativeElement.focus();
  }

  override writeValue(value: number | string | null): void {
    super.writeValue(value === null ? '' : String(value));
  }

  submitValue(): void {
    const convertedValue = this.convertValue(this.control.getRawValue(), this.type);
    this.cvaOnChange(convertedValue);
    this.isSubmit = true;
    this.inputElement.nativeElement.blur();
  }

  iconAddonTypeGuard(addon: ControlAddon): addon is IconAddon {
    return (addon as IconAddon).icon !== undefined && 'icon' in addon;
  }

  textAddonTypeGuard(addon: ControlAddon): addon is TextAddon {
    return (addon as TextAddon).text !== undefined && 'text' in addon;
  }

  onBlur(event: FocusEvent): void {
    this.cvaOnTouched();

    this.blurEvent.emit(event);
  }

  protected override initControlListener(): void {
    this.control.valueChanges
      .pipe(
        map((value) => {
          if (this.type === 'text' || this.type === 'password' || !value) {
            return value;
          }

          const formattedValue = this.formatValue(value, this.precision, this.isNegativeNumbersAcceptable, this.onlyInteger);
          this.renderer2.setProperty(this.inputElement.nativeElement, 'value', formattedValue);
          return formattedValue;
        }),
        map((value) => this.convertValue(value, this.type)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value) => {
        if (!this.isSubmitStrategy) {
          this.cvaOnChange(value);
        }
      });
  }

  protected override initControl(): FormControl<string> {
    return this.formBuilder.nonNullable.control<string>('');
  }

  private formatValue(value: string, precision: number | null, isNegativeNumbersAcceptable: boolean, onlyInteger: boolean): string {
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

    if (onlyInteger) {
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

  private convertValue(value: string | null, type: InputType): number | string | null {
    const num = type === 'number' && value ? (value === '-' ? 0 : value) : value;

    if (!num) {
      return value;
    }

    if (type === 'bigNumber' && !isNaN(parseFloat(num))) {
      return new Big(num).toFixed();
    }

    if (type === 'number') {
      return +num;
    }

    return num;
  }

  private initSubmitStrategyListener(): void {
    if (this.inputElement) {
      let lastValue = this.control.getRawValue();

      fromEvent(this.inputElement.nativeElement, 'focus')
        .pipe(
          tap(() => {
            lastValue = this.control.getRawValue();
            this.isSubmit = false;
          }),
          switchMap(() =>
            fromEvent(this.inputElement.nativeElement, 'keydown').pipe(
              filter((event) => (event as KeyboardEvent).code === 'Enter'),
              take(1),
              tap(() => (this.isSubmit = true)),

              takeUntil(
                fromEvent(this.inputElement.nativeElement, 'blur').pipe(
                  tap(() => {
                    if (!this.isSubmit) {
                      this.control.setValue(lastValue, { emitEvent: false });
                    }
                  }),
                ),
              ),
            ),
          ),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe(() => this.submitValue());
    }
  }
}
