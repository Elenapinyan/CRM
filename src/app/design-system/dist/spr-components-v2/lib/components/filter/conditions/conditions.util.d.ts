import { InjectionToken } from '@angular/core';
import { DropdownOption, FormControlRecord } from '../../../shared';
import { ValueOf } from '../../../shared/utils';
export declare enum ConditionFilterType {
    TEXT = "text",
    NUMERIC = "numeric",
    DATE = "date"
}
export declare const ConditionTypes: {
    readonly EQUALS: "equals";
    readonly CONTAINS: "contains";
    readonly BETWEEN: "between";
};
export type ConditionType = ValueOf<typeof ConditionTypes>;
export declare const ConditionExtendedTypes: {
    readonly BLANK: "blank";
    readonly EQUALS: "equals";
    readonly CONTAINS: "contains";
    readonly BETWEEN: "between";
};
export type ConditionExtendedType = ValueOf<typeof ConditionExtendedTypes>;
export declare const BetweenConditionPlaceholders: {
    readonly FROM: "from";
    readonly TO: "to";
};
export type BetweenConditionValue = {
    from: number | null;
    to: number | null;
};
export declare const BlankConditionOperator: {
    readonly OR: "or";
    readonly AND: "and";
};
export type BlankConditionOperatorType = ValueOf<typeof BlankConditionOperator>;
export type BlankConditionValue = {
    operator: BlankConditionOperatorType;
    condition: ConditionType;
    conditionValue: string | number | BetweenConditionValue | null;
};
export type ConditionValue = string | number | BlankConditionValue | BetweenConditionValue | null;
export type ConditionsFilterValue = {
    condition: ConditionExtendedType;
    conditionValue: ConditionValue;
};
export type ConditionsForm = FormControlRecord<ConditionsFilterValue>;
export declare const ConditionPlaceholderKeys: {
    readonly FILTER: "filter";
};
export declare const isBlankCondition: (v: ConditionValue) => v is BlankConditionValue;
export declare const isBetweenCondition: (v: ConditionValue) => v is BetweenConditionValue;
export declare const getOptionsByType: (type: ConditionFilterType, i18n: ConditionsFilterTranslations) => DropdownOption[];
export declare const ConditionsFilterTranslationsKeys: {
    readonly FILTER: "filter";
    readonly OR: "or";
    readonly AND: "and";
    readonly FROM: "from";
    readonly TO: "to";
    readonly BLANK: "blank";
    readonly EQUALS: "equals";
    readonly CONTAINS: "contains";
    readonly BETWEEN: "between";
};
type TranslationsKeysType = ValueOf<typeof ConditionsFilterTranslationsKeys>;
export type ConditionsFilterTranslations = {
    [K in TranslationsKeysType]: string;
};
export declare const DEFAULT_CONDITIONS_FILTER_TRANSLATIONS: ConditionsFilterTranslations;
export declare const CONDITIONS_FILTER_TRANSLATIONS: InjectionToken<ConditionsFilterTranslations>;
export {};
