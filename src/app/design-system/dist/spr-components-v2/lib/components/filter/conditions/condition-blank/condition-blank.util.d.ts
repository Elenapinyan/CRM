import { BlankConditionValue, ConditionFilterType, ConditionsFilterTranslations } from '../conditions.util';
import { DropdownOption, FormControlRecord } from '../../../../shared';
export type BlankConditionForm = FormControlRecord<BlankConditionValue>;
export declare const getOptionsByType: (type: ConditionFilterType, i18n: ConditionsFilterTranslations) => DropdownOption[];
