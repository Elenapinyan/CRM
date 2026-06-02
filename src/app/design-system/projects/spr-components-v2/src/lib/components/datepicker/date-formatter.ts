import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { computed, Directive, Injectable, input, InputSignal, signal, Signal } from '@angular/core';
import {
  date2NgbDate,
  DateMasks,
  DateMaskType,
  DatePlaceholder,
  datetime2DMYString,
  datetime2YMDString,
  DateTypes,
  DEFAULT_DATE_SEPARATOR,
  fixDMYDatePads,
  fixTimePads,
  fixYMDDatePads,
  ngbDateToDate,
  stringDMY2datetime,
  stringYMD2datetime,
  TimeMasks,
  TimeMaskType,
  TimePlaceholder,
  TimeTypes,
} from './datepicker.util';
import { MaskitoOptions } from '@maskito/core';
import { ElementState } from '@maskito/core/src/lib/types';

export const dateRangeTimeMask = (dateFormat: DateMaskType, dateSeparator: string, timeFormat?: TimeMaskType): MaskitoOptions => ({
  mask: [
    ...DateMasks[dateFormat].map((v) => (v === DEFAULT_DATE_SEPARATOR ? dateSeparator : v)),
    ...(timeFormat ? [' ', ...TimeMasks[timeFormat]] : []),
    ' ',
    '-',
    ' ',
    ...DateMasks[dateFormat].map((v) => (v === DEFAULT_DATE_SEPARATOR ? dateSeparator : v)),
    ...(timeFormat ? [' ', ...TimeMasks[timeFormat]] : []),
  ],
  preprocessors: [
    ({ elementState, data }): { elementState: ElementState; data: string } => {
      const value = elementState.value;

      const [dateFrom, dateTo] = value.split(' - ');

      if (data === null || data === undefined) {
        return {
          elementState,
          data: '',
        };
      }

      let fixedValue = value;

      switch (dateFormat) {
        case DateTypes.DMY: {
          const fixedDateFrom = fixDMYDatePads(dateFrom, dateSeparator);
          const fixedDateTo = dateTo ? fixDMYDatePads(dateTo, dateSeparator) : '';

          fixedValue = [fixedDateFrom, fixedDateTo].join(' - ');

          break;
        }
        case DateTypes.YMD: {
          const fixedDateFrom = fixYMDDatePads(dateFrom, dateSeparator);
          const fixedDateTo = dateTo ? fixYMDDatePads(dateTo, dateSeparator) : '';

          fixedValue = [fixedDateFrom, fixedDateTo].join(' - ');
          break;
        }
      }

      return { elementState: { ...elementState, value: fixedValue }, data };
    },
  ],
});

export const dateTimeMask = (dateFormat: DateMaskType, dateSeparator: string, timeFormat?: TimeMaskType): MaskitoOptions => ({
  mask: [
    ...DateMasks[dateFormat].map((v) => (v === DEFAULT_DATE_SEPARATOR ? dateSeparator : v)),
    ...(timeFormat ? [' ', ...TimeMasks[timeFormat]] : []),
  ],
  preprocessors: [
    ({ elementState, data }): { elementState: ElementState; data: string } => {
      const value = elementState.value;

      if (data === null || data === undefined) {
        return {
          elementState,
          data: '',
        };
      }

      let fixedValue = value;

      switch (dateFormat) {
        case DateTypes.DMY:
          fixedValue = fixDMYDatePads(value);
          break;
        case DateTypes.YMD:
          fixedValue = fixYMDDatePads(value);
          break;
      }

      return { elementState: { ...elementState, value: fixedValue }, data };
    },
  ],
});

export const getTimeMask = (timeFormat: TimeMaskType): MaskitoOptions => ({
  mask: [...TimeMasks[timeFormat]],
  preprocessors: [
    ({ elementState, data }): { elementState: ElementState; data: string } => {
      const value = elementState.value;

      if (data === null || data === undefined) {
        return {
          elementState,
          data: '',
        };
      }

      return { elementState: { ...elementState, value: fixTimePads(value) }, data };
    },
  ],
});

export type DateMaskConfig = {
  mask: (withTime: boolean) => MaskitoOptions;
  rangeMask: (withTime: boolean) => MaskitoOptions;
  placeholder: string;
  datePlaceholder: string;
  timeMask?: MaskitoOptions | null;
  timePlaceholder?: string | null;
  fixPadsFn: (v: string) => string | null;
};

const getInputMaskDefaultConfig = <DMType extends DateMaskType, TMType extends TimeMaskType>(
  date: DMType,
  separator: string = DEFAULT_DATE_SEPARATOR,
  time?: TMType,
): DateMaskConfig => {
  const datePlaceholder = DatePlaceholder[date].replaceAll(DEFAULT_DATE_SEPARATOR, separator);
  const timePlaceholder = time ? TimePlaceholder[time] : null;

  const config: DateMaskConfig = {
    mask: (withTime) => dateTimeMask(date, separator, withTime ? time : undefined),
    rangeMask: (withTime) => dateRangeTimeMask(date, separator, withTime ? time : undefined),
    timeMask: time ? getTimeMask(time) : null,
    datePlaceholder,
    timePlaceholder,
    placeholder: timePlaceholder ? [datePlaceholder, timePlaceholder].join(' ') : datePlaceholder,
    fixPadsFn: (v: string) => '',
  };

  switch (date) {
    case DateTypes.DMY:
      config.fixPadsFn = (v: string): string => fixDMYDatePads(v, separator);
      return config;
    case DateTypes.YMD:
      config.fixPadsFn = (v: string): string => fixYMDDatePads(v, separator);
      return config;
    default:
      return config;
  }
};

export abstract class SprDateParserFormatter<DateMask = DateMaskType, TimeMask = TimeMaskType> {
  protected abstract dateMask: InputSignal<DateMask> | Signal<DateMask>;
  protected abstract timeMask: InputSignal<TimeMask | undefined> | Signal<TimeMask | undefined>;
  protected dateSeparator: InputSignal<string> | Signal<string> = signal('-');

  readonly inputMaskConfig = computed<DateMaskConfig>(() => {
    const dateType = this.dateMask?.();
    const timeMask = this.timeMask?.();

    return this.getInputMaskConfig(dateType, timeMask);
  });

  abstract parse(value: string): { date: NgbDateStruct | null; time: NgbTimeStruct | null } | null;
  abstract format(date: NgbDateStruct | null, time?: NgbTimeStruct | null): string;
  abstract getInputMaskConfig(date: DateMask, time: TimeMask | undefined): DateMaskConfig;
}

@Injectable()
export class SprYMDFormatter extends SprDateParserFormatter {
  protected dateMask = signal<DateMaskType>(DateTypes.YMD);
  protected timeMask = signal<TimeMaskType>(TimeTypes.HM);

  override parse(value: string): { date: NgbDateStruct | null; time: NgbTimeStruct | null } | null {
    return stringYMD2datetime(value);
  }

  override format(date: NgbDateStruct | null, time?: NgbTimeStruct | null): string {
    return datetime2YMDString(date, time, this.timeMask());
  }

  getInputMaskConfig(date: DateMaskType, time: TimeMaskType | undefined): DateMaskConfig {
    return getInputMaskDefaultConfig(date, this.dateSeparator(), time);
  }
}

@Injectable()
export class SprDMYFormatter extends SprDateParserFormatter {
  protected dateMask = signal<DateMaskType>(DateTypes.DMY);
  protected timeMask = signal<TimeMaskType>(TimeTypes.HM);

  override parse(value: string): { date: NgbDateStruct | null; time: NgbTimeStruct | null } | null {
    return stringDMY2datetime(value);
  }

  override format(date: NgbDateStruct | null, time?: NgbTimeStruct | null): string {
    return datetime2DMYString(date, time, this.timeMask());
  }

  getInputMaskConfig(date: DateMaskType, time: TimeMaskType | undefined): DateMaskConfig {
    return getInputMaskDefaultConfig(date, this.dateSeparator(), time);
  }
}

@Directive({
  selector: '[sprDynamicDateFormatter]',
  providers: [
    {
      provide: SprDateParserFormatter,
      useExisting: SprDynamicFormatterDirective,
    },
  ],
})
export class SprDynamicFormatterDirective extends SprDateParserFormatter {
  dateMask = input<DateMaskType>(DateTypes.DMY);
  timeMask = input<TimeMaskType | undefined>(undefined);

  override dateSeparator = input<string>('-');

  override readonly inputMaskConfig = computed(() => {
    const dateType = this.dateMask();
    const timeMask = this.timeMask();

    return this.getInputMaskConfig(dateType, timeMask);
  });

  override parse(value: string): { date: NgbDateStruct | null; time: NgbTimeStruct | null } | null {
    if (!value) {
      return null;
    }

    switch (this.dateMask()) {
      case DateTypes.YMD:
        return stringYMD2datetime(value, this.dateSeparator());
      case DateTypes.DMY:
        return stringDMY2datetime(value, this.dateSeparator());
      default: {
        const dateObj = new Date(value);

        return date2NgbDate(dateObj);
      }
    }
  }

  override format(date: NgbDateStruct | null, time?: NgbTimeStruct | null): string {
    switch (this.dateMask()) {
      case DateTypes.YMD:
        return datetime2YMDString(date, time, this.timeMask(), this.dateSeparator());
      case DateTypes.DMY:
        return datetime2DMYString(date, time, this.timeMask(), this.dateSeparator());
      default:
        return ngbDateToDate(date, time)?.toISOString() ?? '';
    }
  }

  getInputMaskConfig(date: DateMaskType, time: TimeMaskType | undefined): DateMaskConfig {
    return getInputMaskDefaultConfig(date, this.dateSeparator(), time);
  }
}
