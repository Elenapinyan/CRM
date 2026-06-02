import { FormControl } from '@angular/forms';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { PeriodVariants } from '../enums/period-selector-variants.enum';
import { TemplateRef } from '@angular/core';
export type PeriodSelectorVariantType = (typeof PeriodVariants)[keyof typeof PeriodVariants];
export interface PeriodSelectorFormGroup {
    dateFrom: FormControl<NgbDate | null>;
    dateTo: FormControl<NgbDate | null>;
}
export interface PeriodSelectorFormValue {
    dateFrom: NgbDate | null;
    dateTo: NgbDate | null;
}
export interface DateRange {
    dateFrom?: string;
    dateTo?: string;
}
export interface PeriodSelectorFooterSettings {
    showFooter?: boolean;
    submitDateOnApply?: boolean;
    position?: 'left' | 'right';
    cancelButtonText?: string;
    applyButtonText?: string;
    templateRef?: TemplateRef<any> | null;
}
