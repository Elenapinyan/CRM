import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, Input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { NgbDate, NgbDatepickerI18n, NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { filter, map, Subscription } from 'rxjs';
import { SprControlSizeDirective } from '../../shared/directives/spr-control-size.directive';
import { ValidatorsKeys } from '../../shared/enums/validators.enum';
import { BaseControl } from '../../shared/models/base-control/base-control';
import { GetControlErrorMessagePipe } from '../../shared/pipes/get-control-error-message/get-control-error-message.pipe';
import { DatepickerTranslateService } from '../../shared/services/datepicker-translate.service';
import { SprErrorComponent } from '../error/spr-error.component';
import { SprLabelComponent } from '../label/spr-label.component';
import { SPR_DATE_TIMEPICKER_ADAPTER_TOKEN } from './constants/spr-date-timepicker.constant';
import { DateTimepickerDateType, DateTimePickerFormGroup, DateTimepickerTimeType } from './interfaces/spr-date-timepicker.interface';
import { getNgbDate } from './utils/spr-date-timepicker.util';
import { SprFieldDescriptionComponent } from '../field-description/spr-field-description.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'spr-date-timepicker',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    GetControlErrorMessagePipe,
    SprControlSizeDirective,
    SprLabelComponent,
    SprErrorComponent,
    SprFieldDescriptionComponent,
  ],
  templateUrl: 'spr-date-timepicker.component.html',
  styleUrl: 'spr-date-timepicker.component.scss',
  providers: [{ provide: NgbDatepickerI18n, useClass: DatepickerTranslateService }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SprDateTimepickerComponent extends BaseControl<FormGroup<DateTimePickerFormGroup>, string | null> {
  @Input() set minDate(minDate: NgbDate | string | null | undefined) {
    if (!minDate) {
      return;
    }

    if (minDate instanceof NgbDate) {
      this.mappedMinDate = minDate;
      return;
    }

    this.mappedMinDate = getNgbDate(minDate);
  }

  @Input() set maxDate(maxDate: NgbDate | string | null | undefined) {
    if (!maxDate) {
      return;
    }

    if (maxDate instanceof NgbDate) {
      this.mappedMaxDate = maxDate;
      return;
    }

    this.mappedMaxDate = getNgbDate(maxDate);
  }

  placeholder = input('');
  isDeselectAllowed = input(false);

  dateDeselected = output();
  dateChanged = output<DateTimepickerDateType>();

  mappedMinDate!: NgbDate;
  mappedMaxDate!: NgbDate;

  private readonly dateTimepickerAdapter = inject(SPR_DATE_TIMEPICKER_ADAPTER_TOKEN);

  validate(): ValidationErrors | null {
    return this.control.valid ? null : { [ValidatorsKeys.Required]: { valid: false } };
  }

  deselectDate(): void {
    this.control.setValue({ date: null, time: null });
    this.dateDeselected.emit();
  }

  onDateSelected(date: NgbDate): void {
    const stringDate = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;

    this.control.setValue(
      {
        ...this.control.getRawValue(),
        date: stringDate,
      },
      { emitEvent: false },
    );

    this.dateChanged.emit(stringDate);
  }

  override writeValue(value: string | null): void {
    if (!value) {
      this.control.patchValue(
        {
          date: null,
          time: null,
        },
        { emitEvent: false },
      );
      return;
    }

    const settingDate = this.dateTimepickerAdapter.toModel(value);
    this.control.patchValue(settingDate, { emitEvent: false });
  }

  protected override initControl(): FormGroup<DateTimePickerFormGroup> {
    return this.formBuilder.nonNullable.group({
      date: [null as DateTimepickerDateType, Validators.required],
      time: [null as DateTimepickerTimeType, Validators.required],
    });
  }

  protected override initControlListener(): Subscription {
    return this.control.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((v) => this.isDeselectAllowed() || Boolean(v.date)),
        map((v) => this.dateTimepickerAdapter.fromModel(v)),
      )
      .subscribe((value) => {
        this.cvaOnChange(value);
        this.cvaOnTouched();
      });
  }
}
