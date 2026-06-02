import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  DestroyRef,
  effect,
  inject,
  input,
  output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import {
  DsDatepickerRange,
  type DatetimeRange,
  type PeriodVariantType,
} from '@platform-workspace/design-system-v2';

import {
  DASHBOARD_DEFAULT_PERIOD,
  DASHBOARD_PERIOD_SELECT_OPTIONS,
} from '../../data/dashboard-period-options';

@Component({
  selector: 'app-dashboard-period-datepicker',
  template: `<ng-container #pickerHost />`,
  styleUrl: './dashboard-period-datepicker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPeriodDatepickerComponent implements AfterViewInit {
  @ViewChild('pickerHost', { read: ViewContainerRef }) private pickerHost?: ViewContainerRef;

  readonly dateRangeControl = input.required<FormControl<DatetimeRange<NgbDateStruct> | null>>();
  readonly selectedPeriod = input<PeriodVariantType | null>(DASHBOARD_DEFAULT_PERIOD);

  readonly selectedPeriodChange = output<PeriodVariantType | null>();
  readonly rangeConfirmed = output<DatetimeRange | null>();

  private readonly destroyRef = inject(DestroyRef);
  private pickerRef?: ComponentRef<DsDatepickerRange<DatetimeRange<NgbDateStruct>>>;

  constructor() {
    effect(() => {
      const period = this.selectedPeriod();
      this.pickerRef?.setInput('selectedRange', period);
    });
  }

  ngAfterViewInit(): void {
    const host = this.pickerHost;
    if (!host) {
      return;
    }

    const control = this.dateRangeControl();
    const picker = host.createComponent(DsDatepickerRange);
    this.pickerRef = picker as ComponentRef<DsDatepickerRange<DatetimeRange<NgbDateStruct>>>;

    picker.setInput('controlSize', 'sm');
    picker.setInput('isColored', true);
    picker.setInput('selectOptions', DASHBOARD_PERIOD_SELECT_OPTIONS);
    picker.setInput('selectedRange', this.selectedPeriod());

    picker.instance.registerOnChange((value) => {
      const period = picker.instance.selectedRange();
      control.setValue(value as DatetimeRange<NgbDateStruct> | null, { emitEvent: false });
      this.selectedPeriodChange.emit(period);
    });
    picker.instance.registerOnTouched(() => {
      control.markAsTouched();
    });

    if (control.value) {
      picker.instance.writeValue(control.value);
      picker.setInput('selectedRange', this.selectedPeriod());
    }

    control.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      if (!this.pickerRef) {
        return;
      }

      this.pickerRef.instance.writeValue(value);
      this.pickerRef.setInput('selectedRange', this.selectedPeriod());
    });

    picker.instance.rangeConfirmed.subscribe((range) => {
      this.rangeConfirmed.emit(range as DatetimeRange | null);
    });

    picker.location.nativeElement.classList.add('dashboard-page__datepicker');
    picker.changeDetectorRef.detectChanges();
  }
}
