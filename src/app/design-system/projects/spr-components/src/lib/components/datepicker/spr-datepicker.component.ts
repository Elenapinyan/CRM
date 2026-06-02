import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, input, Input, Optional } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDatepickerI18n, NgbDatepickerModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { BaseControl } from '../../shared';
import { SprControlSizeDirective } from '../../shared/directives/spr-control-size.directive';
import { GetControlErrorMessagePipe } from '../../shared/pipes/get-control-error-message/get-control-error-message.pipe';
import { DatepickerTranslateService } from '../../shared/services/datepicker-translate.service';
import { getNgbDate } from '../date-timepicker/utils/spr-date-timepicker.util';
import { SprErrorComponent } from '../error/spr-error.component';
import { SprFieldDescriptionComponent } from '../field-description/spr-field-description.component';
import { SprLabelComponent } from '../label/spr-label.component';
import { SPR_DATEPICKER_VALUE_FORMATTER } from './constants/spr-datepicker.constant';
import { SprDatepickerValueFormatter } from './interfaces/spr-datepicker.interface';

@Component({
  selector: 'spr-datepicker',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    GetControlErrorMessagePipe,
    NgbDatepickerModule,
    SprControlSizeDirective,
    SprFieldDescriptionComponent,
    SprErrorComponent,
    SprLabelComponent,
  ],
  templateUrl: './spr-datepicker.component.html',
  styleUrls: ['./spr-datepicker.component.scss'],
  providers: [{ provide: NgbDatepickerI18n, useClass: DatepickerTranslateService }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SprDatepickerComponent extends BaseControl<FormControl<string | null>> {
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
  deselect = input(false);

  mappedMinDate: NgbDate = new NgbDate(1950, 1, 1);
  mappedMaxDate: NgbDate = this.ngbCalendar.getToday();

  constructor(
    private readonly ngbCalendar: NgbCalendar,
    @Inject(SPR_DATEPICKER_VALUE_FORMATTER) @Optional() private readonly datepickerValueFormatter: SprDatepickerValueFormatter,
  ) {
    super();
  }

  deselectDate(): void {
    this.control.patchValue(null);
  }

  protected override initControlListener(): Subscription {
    return this.control.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      if (this.datepickerValueFormatter) {
        this.cvaOnChange(this.datepickerValueFormatter.format(value));
        return;
      }

      this.cvaOnChange(value);
    });
  }

  protected override initControl(): FormControl<string | null> {
    return this.formBuilder.control<string | null>(null);
  }
}
