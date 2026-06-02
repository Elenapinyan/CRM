import { InjectionToken } from '@angular/core';
import { DropdownOption, FormControlRecord } from '../../../shared';
import { ValueOf } from '../../../shared/utils';

export enum ConditionFilterType {
  TEXT = 'text',
  NUMERIC = 'numeric',
  DATE = 'date',
}

export const ConditionTypes = {
  EQUALS: 'equals',
  CONTAINS: 'contains',
  BETWEEN: 'between',
} as const;
export type ConditionType = ValueOf<typeof ConditionTypes>;

export const ConditionExtendedTypes = {
  ...ConditionTypes,
  BLANK: 'blank',
} as const;
export type ConditionExtendedType = ValueOf<typeof ConditionExtendedTypes>;

export const BetweenConditionPlaceholders = {
  FROM: 'from',
  TO: 'to',
} as const;

export type BetweenConditionValue = {
  from: number | null;
  to: number | null;
};

export const BlankConditionOperator = {
  OR: 'or',
  AND: 'and',
} as const;

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

export const ConditionPlaceholderKeys = {
  FILTER: 'filter',
} as const;

export const isBlankCondition = (v: ConditionValue): v is BlankConditionValue => {
  return !!v && typeof v === 'object' && Object.hasOwn(v, 'operator');
};

export const isBetweenCondition = (v: ConditionValue): v is BetweenConditionValue => {
  return !!v && typeof v === 'object' && Object.hasOwn(v, 'from') && Object.hasOwn(v, 'to');
};

const getTextOptions = (i18n: ConditionsFilterTranslations): DropdownOption[] => [
  { text: i18n[ConditionExtendedTypes.EQUALS], value: ConditionExtendedTypes.EQUALS },
  { text: i18n[ConditionExtendedTypes.CONTAINS], value: ConditionExtendedTypes.CONTAINS },
  { text: i18n[ConditionExtendedTypes.BLANK], value: ConditionExtendedTypes.BLANK },
];

const getNumberOptions = (i18n: ConditionsFilterTranslations): DropdownOption[] => [
  { text: i18n[ConditionExtendedTypes.EQUALS], value: ConditionExtendedTypes.EQUALS },
  { text: i18n[ConditionExtendedTypes.BETWEEN], value: ConditionExtendedTypes.BETWEEN },
  { text: i18n[ConditionExtendedTypes.BLANK], value: ConditionExtendedTypes.BLANK },
];

const getDateOptions = (i18n: ConditionsFilterTranslations): DropdownOption[] => [
  { text: i18n[ConditionExtendedTypes.EQUALS], value: ConditionExtendedTypes.EQUALS },
];

export const getOptionsByType = (type: ConditionFilterType, i18n: ConditionsFilterTranslations): DropdownOption[] => {
  switch (type) {
    case ConditionFilterType.TEXT:
      return getTextOptions(i18n);
    case ConditionFilterType.NUMERIC:
      return getNumberOptions(i18n);
    case ConditionFilterType.DATE:
      return getDateOptions(i18n);
  }
};

export const ConditionsFilterTranslationsKeys = {
  ...ConditionExtendedTypes,
  ...BetweenConditionPlaceholders,
  ...BlankConditionOperator,
  ...ConditionPlaceholderKeys,
} as const;

type TranslationsKeysType = ValueOf<typeof ConditionsFilterTranslationsKeys>;

export type ConditionsFilterTranslations = {
  [K in TranslationsKeysType]: string;
};

export const DEFAULT_CONDITIONS_FILTER_TRANSLATIONS: ConditionsFilterTranslations = {
  [ConditionsFilterTranslationsKeys.BETWEEN]: 'Between',
  [ConditionsFilterTranslationsKeys.EQUALS]: 'Equals',
  [ConditionsFilterTranslationsKeys.CONTAINS]: 'Contains',
  [ConditionsFilterTranslationsKeys.BLANK]: 'Blank',
  [ConditionsFilterTranslationsKeys.OR]: 'OR',
  [ConditionsFilterTranslationsKeys.AND]: 'AND',
  [ConditionsFilterTranslationsKeys.FROM]: 'From',
  [ConditionsFilterTranslationsKeys.TO]: 'To',
  [ConditionsFilterTranslationsKeys.FILTER]: 'Filter...',
} as const;

export const CONDITIONS_FILTER_TRANSLATIONS = new InjectionToken<ConditionsFilterTranslations>('CONDITIONS_FILTER_TRANSLATIONS');
