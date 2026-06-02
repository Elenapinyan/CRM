import { SegmentedControlModel } from './segmented-controls.options';

export const SegmentedControlsMocks: SegmentedControlModel[] = [
  {
    id: 1,
    text: 'Control 1',
  },
  {
    id: 2,
    text: 'Control 2',
    iconStart: 'ds-icon-general-card',
  },
  {
    id: 3,
    text: 'Control 3',
    divider: true,
    iconEnd: 'ds-icon-general-card',
  },
  {
    id: 4,
    text: 'Control 4',
    iconEnd: 'ds-icon-general-card',
    iconStart: 'ds-icon-general-card',
  },
  {
    id: 5,
    text: 'Control 5',
    disabled: true,
  },
];
