import { DsLabelDirective } from '../label.directive';

export const SPR_LABEL = {
  directive: DsLabelDirective,
  inputs: [
    'inputId',
    'tooltip',
    'tooltipClassForLabel',
    'dsLabel: label',
    'dsLabelIsInline: labelIsInline',
    'dsLabelClass: labelClass',
    'dsLabelPosition: labelPosition',
    'dsLabelLeftIcon: labelLeftIcon',
    'dsLabelRightIcon: labelRightIcon',
  ],
};
