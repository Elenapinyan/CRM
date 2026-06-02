import { SprLabelDirective } from '../spr-label.directive';

export const SPR_LABEL = {
  directive: SprLabelDirective,
  inputs: [
    'inputId',
    'tooltip',
    'tooltipClassForLabel',
    'sprLabel: label',
    'sprLabelIsInline: labelIsInline',
    'sprLabelClass: labelClass',
    'sprLabelPosition: labelPosition',
    'sprLabelLeftIcon: labelLeftIcon',
    'sprLabelRightIcon: labelRightIcon',
  ],
};
