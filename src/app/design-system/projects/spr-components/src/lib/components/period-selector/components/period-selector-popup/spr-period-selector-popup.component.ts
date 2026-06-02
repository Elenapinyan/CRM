import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDate, NgbDatepickerI18n, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerTranslateService } from '../../../../shared';
import { IsDisabledDatePipe } from '../../pipes/is-disabled-date.pipe';
import { IsHoveredPipe } from '../../pipes/is-hovered.pipe';
import { IsInsidePipe } from '../../pipes/is-inside.pipe';
import { IsRangePipe } from '../../pipes/is-range.pipe';
import { SprButtonComponent } from '../../../button/spr-button.component';
import { SprBasePeriodSelector } from '../../spr-base-period-selector.directive';

@Component({
  selector: 'spr-period-selector-popup',
  templateUrl: 'spr-period-selector-popup.component.html',
  styleUrls: ['spr-period-selector-popup.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbInputDatepicker,
    IsDisabledDatePipe,
    IsHoveredPipe,
    IsInsidePipe,
    IsRangePipe,
    SprButtonComponent,
  ],
  providers: [{ provide: NgbDatepickerI18n, useClass: DatepickerTranslateService }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class SprPeriodSelectorPopupComponent extends SprBasePeriodSelector implements AfterViewInit {
  @Output() calendarOpened = new EventEmitter<void>();
  @Output() calendarClosed = new EventEmitter<void>();

  @ViewChild('datepicker', { static: true }) datepicker!: NgbInputDatepicker;

  ngAfterViewInit(): void {
    requestAnimationFrame(() => {
      this.datepicker.open();
      this.calendarOpened.emit();
    });

    this.datepicker.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.calendarClosed.emit();
    });
  }

  setHoveredDate(date: NgbDate | null): void {
    this.hoveredDate = date;
  }
}
