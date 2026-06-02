import { NgbDate, NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormControlRecord } from '../../shared';
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  getDate,
  getHours,
  getMinutes,
  getMonth,
  getSeconds,
  getYear,
  isValid,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  sub,
} from 'date-fns';
import { InjectionToken } from '@angular/core';

export const DEFAULT_INPUT_NOT_SELECTED_PLACEHOLDER = 'Not selected';
export const DEFAULT_DATE_SEPARATOR = '-';

export const DateTypes = {
  YMD: 'YMD',
  DMY: 'DMY',
} as const;

export const TimeTypes = {
  H: 'H',
  HM: 'HM',
  HMS: 'HMS',
} as const;

export const DateMasks = {
  [DateTypes.YMD]: [/\d/, /\d/, /\d/, /\d/, DEFAULT_DATE_SEPARATOR, /\d/, /\d/, DEFAULT_DATE_SEPARATOR, /\d/, /\d/],
  [DateTypes.DMY]: [/\d/, /\d/, DEFAULT_DATE_SEPARATOR, /\d/, /\d/, DEFAULT_DATE_SEPARATOR, /\d/, /\d/, /\d/, /\d/],
} as const;

export const TimeMasks = {
  [TimeTypes.H]: [/\d/, /\d/],
  [TimeTypes.HM]: [/\d/, /\d/, ':', /\d/, /\d/],
  [TimeTypes.HMS]: [/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/],
} as const;

export const DatePlaceholder = {
  [DateTypes.YMD]: 'YYYY-MM-DD',
  [DateTypes.DMY]: 'DD-MM-YYYY',
};

export const TimePlaceholder = {
  [TimeTypes.H]: 'HH',
  [TimeTypes.HM]: 'HH:MM',
  [TimeTypes.HMS]: 'HH:MM:SS',
} as const;

export type DateMaskType = (typeof DateTypes)[keyof typeof DateTypes];
export type TimeMaskType = (typeof TimeTypes)[keyof typeof TimeTypes];

const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

export enum PeriodVariants {
  Today = 'today',
  Yesterday = 'yesterday',
  Week = 'week',
  LastSevenDays = 'last_7_days',
  LastWeek = 'last_week',
  ThisMonth = 'this_month',
  LastMonth = 'last_month',
  LastThirtyDays = 'last_30_days',
  LastThreeMonth = 'last_three_month',
  LastYear = 'last_year',
  Lifetime = 'lifetime',
  All = 'all',
  Custom = 'custom',
  NotSelected = 'notSelected',
}

export type PeriodVariantType = (typeof PeriodVariants)[keyof typeof PeriodVariants];

export type DateRange<D = unknown> = {
  dateFrom: D | null;
  dateTo: D | null;
};

export type TimeRange = {
  timeFrom: NgbTimeStruct | null;
  timeTo: NgbTimeStruct | null;
};

export type DatetimeRange<D = unknown> = DateTime<DateRange<D>, TimeRange>;

export type DateTime<DateType, TimeType> = {
  date: DateType;
  time?: TimeType;
};

export type TimeRangeFormGroup = FormControlRecord<TimeRange>;
export type DateTimeFormGroup<DateType, TimeType> = FormControlRecord<Required<DateTime<DateType, TimeType>>>;

export type DatepickerRangeTranslation = {
  cancel: string;
  apply: string;
  startTime: string;
  endTime: string;
};

export const DATEPICKER_RANGE_TRANSLATIONS = new InjectionToken<DatepickerRangeTranslation>('DATEPICKER_RANGE_TRANSLATIONS', {
  factory: (): DatepickerRangeTranslation => ({
    cancel: 'Cancel',
    apply: 'Apply',
    startTime: 'Starting',
    endTime: 'Ending',
  }),
});

const pad = (v: string): string => (v && v.length === 1 ? '0' + v : v);

const clamp = (value: string, max: number): string => {
  let n = parseInt(value);

  if (isNaN(n)) {
    return value;
  }

  if (n > max) {
    return String(max);
  }

  return value;
};

export const fixYMDDatePads = (v: string, dateSeparator: string = DEFAULT_DATE_SEPARATOR): string => {
  const dateSplit = v.split(' ');
  const date = dateSplit[0];
  const time = dateSplit[1];

  const dateArr = date.split(dateSeparator);

  const [y, m, d] = dateArr;

  if (!m || !d || d === '0' || m === '0') {
    return v;
  }

  const month = parseInt(m[0]) > 1 ? pad(m[0]) : clamp(m, 12);
  const day = parseInt(d[0]) > 3 ? pad(d[0]) : clamp(d, 31);

  const newDate = [y, month, day].filter(Boolean).join(dateSeparator);
  const datetime = time ? [newDate, fixTimePads(time)].join(' ') : newDate;

  if (datetime !== v) {
    return datetime;
  }

  return v;
};

export const fixDMYDatePads = (v: string, dateSeparator: string = DEFAULT_DATE_SEPARATOR): string => {
  const dateSplit = v.split(' ');
  const date = dateSplit[0];
  const time = dateSplit[1];

  const dateArr = date.split(dateSeparator);

  const [d, m, y] = dateArr;

  if (!d || (d && !m) || d === '0' || m === '0') {
    return v;
  }

  const day = parseInt(d[0]) > 3 ? pad(d[0]) : clamp(d, 31);
  const month = parseInt(m[0]) > 1 ? pad(m[0]) : clamp(m, 12);

  const newDate = [day, month, y].filter(Boolean).join(dateSeparator);
  const datetime = time ? [newDate, fixTimePads(time)].join(' ') : newDate;

  if (datetime !== v) {
    return datetime;
  }

  return v;
};

export const fixTimePads = (time: string): string => {
  const [hh, mm, ss] = time.split(':');

  if (!hh || hh === '0' || mm === '0') {
    return time;
  }

  const hour = parseInt(hh[0]) > 2 ? pad(hh[0]) : clamp(hh, 23);
  const minutes = mm ? (parseInt(mm[0]) > 5 ? pad(mm[0]) : mm) : null;
  const seconds = ss ? (parseInt(ss[0]) > 5 ? pad(ss[0]) : ss) : null;

  return [hour, minutes, seconds].filter(Boolean).join(':');
};

export const timeEquals = (prev: NgbTimeStruct, curr: NgbTimeStruct): boolean => {
  return prev.hour === curr.hour && prev.minute === curr.minute && prev.second === curr.second;
};

export const getDiffInDays = (startDate: NgbDateStruct, endDate: NgbDateStruct): number => {
  const startDateTimestamp = Date.UTC(startDate.year, startDate.month - 1, startDate.day);
  const endDateTimestamp = Date.UTC(endDate.year, endDate.month - 1, endDate.day);

  return Math.floor(Math.abs(startDateTimestamp - endDateTimestamp) / DAY_IN_MILLISECONDS) + 1;
};

export const getMaxNgbDate = (date: NgbDate, dateFrom: NgbDateStruct, maxRangeInDays: number | null): NgbDate | null => {
  const maxRange = maxRangeInDays ? maxRangeInDays - 1 : null;

  const daysDiff = getDiffInDays(date, dateFrom ?? date);

  if (maxRange && daysDiff > maxRange) {
    const maxRangeInMilliseconds = maxRange * DAY_IN_MILLISECONDS;
    const timestamp = Date.UTC(dateFrom.year, dateFrom.month - 1, dateFrom.day);
    const addedDate = new Date(timestamp + maxRangeInMilliseconds);

    return new NgbDate(addedDate.getUTCFullYear(), addedDate.getUTCMonth() + 1, addedDate.getUTCDate());
  }

  return date;
};

export const getMinNgbDate = (date: NgbDate, dateFrom: NgbDateStruct, maxRangeInDays: number | null): NgbDate | null => {
  const maxRange = maxRangeInDays ? maxRangeInDays - 1 : null;

  const daysDiff = getDiffInDays(date, dateFrom ?? date);

  if (maxRange && daysDiff < maxRange) {
    const maxRangeInMilliseconds = maxRange * DAY_IN_MILLISECONDS;
    const timestamp = Date.UTC(dateFrom.year, dateFrom.month - 1, dateFrom.day);
    const addedDate = new Date(timestamp - maxRangeInMilliseconds);

    return new NgbDate(addedDate.getUTCFullYear(), addedDate.getUTCMonth() + 1, addedDate.getUTCDate());
  }

  return date;
};

export const date2NgbDate = (date: Date | null): { date: NgbDate | null; time: NgbTimeStruct | null } => {
  const isDateValid = date && isValid(date);

  return {
    date: isDateValid ? new NgbDate(getYear(date), getMonth(date) + 1, getDate(date)) : null,
    time: isDateValid ? { hour: getHours(date), minute: getMinutes(date), second: getSeconds(date) } : null,
  };
};

export const string2NgbDate = (value: string | null): { date: NgbDate | null; time: NgbTimeStruct | null } | null => {
  if (!value || isValid(value)) {
    return null;
  }

  const date = new Date(value);

  return {
    date: new NgbDate(getYear(date), getMonth(date) + 1, getDate(date)),
    time: { hour: getHours(date), minute: getMinutes(date), second: getSeconds(date) },
  };
};

export const unknown2NgbDate = (value: Date | NgbDateStruct | string | null): NgbDate | null => {
  if (value instanceof NgbDate) {
    const month = value.month > 12 ? 12 : value.month < 1 ? 1 : value.month;
    const day = value.day > 31 ? 31 : value.day < 1 ? 1 : value.day;

    return NgbDate.from({ year: value.year, month, day });
  }

  if (value instanceof Date) {
    return date2NgbDate(value)?.date ?? null;
  }

  if (typeof value === 'string') {
    return string2NgbDate(value)?.date ?? null;
  }

  return NgbDate.from(value);
};

export const ngbDateToDate = (date: NgbDateStruct | null, time?: NgbTimeStruct | null): Date | null => {
  if (!date) {
    return null;
  }

  const { day, month, year } = date;

  const newDate = new Date(`${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`);

  if (time) {
    newDate.setHours(time.hour);
    newDate.setMinutes(time.minute);
    newDate.setSeconds(time.second);
  }

  return newDate;
};

export const stringDMY2datetime = (
  value: string,
  dateSeparator: string = DEFAULT_DATE_SEPARATOR,
): { date: NgbDateStruct | null; time: NgbTimeStruct | null } | null => {
  const datetime = value?.split(' ');

  const today = new Date();
  const [d = today.getUTCDate(), m = today.getUTCMonth() + 1, y = today.getUTCFullYear()] = datetime[0].split(dateSeparator);
  const [hh = 0, mm = 0, ss = 0] = datetime?.[1] ? datetime[1].split(':') : [0, 0, 0];

  return {
    date: { year: +y, month: +m, day: +d },
    time: { hour: +hh, minute: +mm, second: +ss },
  };
};

export const stringYMD2datetime = (
  value: string,
  dateSeparator: string = DEFAULT_DATE_SEPARATOR,
): { date: NgbDateStruct | null; time: NgbTimeStruct | null } | null => {
  const datetime = value?.split(' ');

  const today = new Date();
  const [y = today.getUTCFullYear(), m = today.getUTCMonth() + 1, d = today.getUTCDate()] = datetime[0].split(dateSeparator);
  const [hh = 0, mm = 0, ss = 0] = datetime?.[1] ? datetime[1].split(':') : [0, 0, 0];

  return {
    date: { year: +y, month: +m, day: +d },
    time: { hour: +hh, minute: +mm, second: +ss },
  };
};

export const datetime2DMYString = (
  date: NgbDateStruct | null,
  time?: NgbTimeStruct | null,
  timeType: TimeMaskType = TimeTypes.HM,
  dateSeparator: string = DEFAULT_DATE_SEPARATOR,
): string => {
  const fixedTime = time ? fixNgbTimePads(time) : time;

  const timeParsed = time ? `${fixedTime?.hour}:${fixedTime?.minutes}:${fixedTime?.seconds}` : null;
  const slicedTime = timeParsed?.split(':').slice(0, timeType.length).join(':') ?? null;

  const fixedDate = date ? fixNgbDatePads(date) : date;

  return `${[fixedDate?.day, fixedDate?.month, fixedDate?.year].join(dateSeparator)}${slicedTime ? ' ' + slicedTime : ''}`;
};

export const datetime2YMDString = (
  date: NgbDateStruct | null,
  time?: NgbTimeStruct | null,
  timeType: TimeMaskType = TimeTypes.HM,
  dateSeparator: string = DEFAULT_DATE_SEPARATOR,
): string => {
  const fixedTime = time ? fixNgbTimePads(time) : time;

  const timeParsed = time ? `${fixedTime?.hour}:${fixedTime?.minutes}:${fixedTime?.seconds}` : null;
  const slicedTime = timeParsed?.split(':').slice(0, timeType.length).join(':') ?? null;

  const fixedDate = date ? fixNgbDatePads(date) : date;

  return `${[fixedDate?.year, fixedDate?.month, fixedDate?.day].join(dateSeparator)}${slicedTime ? ' ' + slicedTime : ''}`;
};

export const fixNgbTimePads = (
  time: NgbTimeStruct,
): {
  hour: string;
  minutes: string;
  seconds: string;
} => {
  const h = String(time?.hour ?? 0).padStart(2, '0');
  const m = String(time?.minute ?? 0).padStart(2, '0');
  const s = String(time?.second ?? 0).padStart(2, '0');

  return {
    hour: h,
    minutes: m,
    seconds: s,
  };
};

const fixNgbDatePads = (date: NgbDateStruct): { day: string; month: string; year: string } => {
  const d = String(date?.day ?? 0).padStart(2, '0');
  const m = String(date?.month ?? 0).padStart(2, '0');
  const y = String(date?.year ?? 0).padStart(4, '0');

  return {
    day: d,
    month: m,
    year: y,
  };
};

export const getDateRangeUtil = (period: PeriodVariantType): { dateFrom: Date; dateTo: Date } => {
  const now = new Date();
  let start: Date;
  let end: Date;

  switch (period) {
    case PeriodVariants.All:
      start = new Date('2020-01-01');
      end = now;
      break;
    case PeriodVariants.Today:
      start = startOfDay(now);
      end = endOfDay(now);
      break;
    case PeriodVariants.LastWeek: {
      const lastWeek = sub(now, { weeks: 1 });
      start = startOfWeek(lastWeek, { weekStartsOn: 1 });
      end = endOfWeek(lastWeek, { weekStartsOn: 1 });
      break;
    }
    case PeriodVariants.LastMonth: {
      const lastMonth = sub(now, { months: 1 });
      start = startOfMonth(lastMonth);
      end = endOfMonth(lastMonth);
      break;
    }
    case PeriodVariants.LastThreeMonth: {
      const lastMonth = sub(now, { months: 1 });
      const thirdMonth = sub(now, { months: 3 });
      start = startOfMonth(thirdMonth);
      end = endOfMonth(lastMonth);
      break;
    }
    case PeriodVariants.Yesterday: {
      const yesterday = sub(now, { days: 1 });
      start = startOfDay(yesterday);
      end = endOfDay(yesterday);
      break;
    }
    case PeriodVariants.LastSevenDays:
      start = sub(now, { days: 7 });
      end = now;
      break;
    case PeriodVariants.LastThirtyDays:
      start = sub(now, { days: 30 });
      end = now;
      break;
    case PeriodVariants.ThisMonth:
      start = startOfMonth(now);
      end = now;
      break;
    case PeriodVariants.Week:
      start = startOfWeek(now, { weekStartsOn: 1 });
      end = now;
      break;
    case PeriodVariants.LastYear: {
      const lastYear = sub(now, { years: 1 });
      start = startOfYear(lastYear);
      end = endOfYear(lastYear);
      break;
    }
    default:
      throw new Error(`Unknown period: ${period}`);
  }

  return {
    dateFrom: start,
    dateTo: end,
  };
};

export const getDateRangeInModel = (period: PeriodVariantType): DatetimeRange<string> => {
  const { dateFrom, dateTo } = getDateRangeUtil(period);

  return {
    date: {
      dateFrom: dateFrom.toISOString(),
      dateTo: dateTo.toISOString(),
    },
    time: {
      timeFrom: { hour: getHours(dateFrom), minute: getMinutes(dateFrom), second: getSeconds(dateFrom) },
      timeTo: { hour: getHours(dateTo), minute: getMinutes(dateTo), second: getSeconds(dateTo) },
    },
  };
};
