import { BlankConditionValue, ConditionFilterType, ConditionsFilterTranslations, ConditionTypes } from '../conditions.util';
import { DropdownOption, FormControlRecord } from '../../../../shared';

export type BlankConditionForm = FormControlRecord<BlankConditionValue>;

const getTextOptions = (i18n: ConditionsFilterTranslations): DropdownOption[] => [
  { text: i18n[ConditionTypes.EQUALS], value: ConditionTypes.EQUALS },
  { text: i18n[ConditionTypes.CONTAINS], value: ConditionTypes.CONTAINS },
];

const getNumberOptions = (i18n: ConditionsFilterTranslations): DropdownOption[] => [
  { text: i18n[ConditionTypes.EQUALS], value: ConditionTypes.EQUALS },
  { text: i18n[ConditionTypes.BETWEEN], value: ConditionTypes.BETWEEN },
];

const getDateOptions = (i18n: ConditionsFilterTranslations): DropdownOption[] => [
  { text: i18n[ConditionTypes.EQUALS], value: ConditionTypes.EQUALS },
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
