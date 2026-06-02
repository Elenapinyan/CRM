import { DropdownOption } from '../../shared';
export declare const getMappedDataToDropdown: <T extends {
    [key: string]: any;
}, D extends keyof T>({ inputArray, valueKey, textKey, }: {
    inputArray: T[];
    textKey: D;
    valueKey: D;
}) => DropdownOption[];
