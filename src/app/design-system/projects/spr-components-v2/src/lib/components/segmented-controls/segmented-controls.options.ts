export type SegmentedControlId = string | number;

export interface SegmentedControlModel {
  text: string;
  iconStart?: string;
  iconEnd?: string;
  divider?: boolean;
  disabled?: boolean;
  id: SegmentedControlId;
}
