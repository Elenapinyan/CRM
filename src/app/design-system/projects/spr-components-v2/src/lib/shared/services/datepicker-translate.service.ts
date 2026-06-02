import { inject, Injectable } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DATEPICKER_TRANSLATE_ACTIVE_LANGUAGE } from '../constants';

type DataPresentation = 'long' | 'short' | 'narrow' | 'numeric' | '2-digit' | undefined;

enum DataPresentationValues {
  Long = 'long',
  Short = 'short',
  Narrow = 'narrow',
}

@Injectable()
export class DatepickerTranslateService extends NgbDatepickerI18n {
  private readonly activateLanguageFactory = inject(DATEPICKER_TRANSLATE_ACTIVE_LANGUAGE);

  get activeLang(): string {
    return this.activateLanguageFactory?.getActiveLanguage();
  }

  getWeekdayLabel(weekday: number): string {
    return this.getWeekdayNames(this.activeLang)[weekday - 1];
  }

  getMonthShortName(month: number): string {
    return this.getMonthNames(this.activeLang)[month - 1];
  }

  getMonthFullName(month: number): string {
    return this.getMonthNames(this.activeLang, DataPresentationValues.Long)[month - 1];
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }

  private getWeekdayNames(locale = navigator.language): string[] {
    const formatter = new Intl.DateTimeFormat(locale, { weekday: DataPresentationValues.Narrow });
    const weekdays = [];

    for (let day = 0; day < 7; day++) {
      const date = new Date(Date.UTC(2021, 0, 4 + day)); // 4th Jan 2021 is a Monday
      weekdays.push(formatter.format(date));
    }

    return weekdays;
  }

  private getMonthNames(locale = navigator.language, type: DataPresentation = DataPresentationValues.Short): string[] {
    const formatter = new Intl.DateTimeFormat(locale, { month: type });
    const months = [];
    const currentYear = new Date().getFullYear();

    for (let month = 0; month < 12; month++) {
      const date = new Date(currentYear, month, 1); // 1st of each month
      months.push(formatter.format(date));
    }

    return months;
  }
}
