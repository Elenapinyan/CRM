import { DropdownOptionValue } from '../../../shared/interfaces/dropdown-option.interface';
export interface MultiSwitcherOption<T extends DropdownOptionValue = string> {
    text: string;
    value: T;
}
