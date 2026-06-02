import { PeriodSelectorFooterSettings } from '../interfaces/period-selector.interface';

export const DEFAULT_FOOTER_SETTINGS: Required<PeriodSelectorFooterSettings> = {
  showFooter: false,
  submitDateOnApply: false,
  position: 'right',
  cancelButtonText: 'Cancel',
  applyButtonText: 'Apply',
  templateRef: null,
};

export const DEFAULT_DROPDOWN_NOT_SELECTED_TEXT = 'Not selected';
export const DEFAULT_INPUT_NOT_SELECTED_PLAYSHOLDER = 'Not selected';
