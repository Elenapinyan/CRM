import { DropdownOptionValue } from '../../shared/interfaces/dropdown-option.interface';
export type MultiSwitcherSize = 'sm' | 'md';
export interface MultiSwitcherOption<T extends DropdownOptionValue = string> {
    text?: string;
    value: T;
    icon?: string;
}
