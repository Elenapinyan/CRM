import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as i0 from "@angular/core";
export declare class DatepickerTranslateService extends NgbDatepickerI18n {
    private readonly activateLanguageFactory;
    get activeLang(): string;
    getWeekdayLabel(weekday: number): string;
    getMonthShortName(month: number): string;
    getMonthFullName(month: number): string;
    getDayAriaLabel(date: NgbDateStruct): string;
    private getWeekdayNames;
    private getMonthNames;
    static ɵfac: i0.ɵɵFactoryDeclaration<DatepickerTranslateService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DatepickerTranslateService>;
}
