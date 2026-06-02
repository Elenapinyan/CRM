import { DropdownOption } from '../../../shared/interfaces/dropdown-option.interface';
export interface PageSizeSelectorConfig {
    mapToOptions(sizes: number[]): DropdownOption[];
}
