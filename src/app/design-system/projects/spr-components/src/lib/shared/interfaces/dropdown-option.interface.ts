import { EnumType } from './enum-type.interface';

export interface DropdownOption {
  text: string;
  value: DropdownOptionValue | DropdownOptionValue[];
  isDisabled?: boolean;
  icon?: string;
  class?: string;
}

export type DropdownOptionValue = string | boolean | number | null;

export type DropdownsVariants<Keys extends EnumType> = Partial<{
  [key in Keys]: DropdownOption[];
}>;
