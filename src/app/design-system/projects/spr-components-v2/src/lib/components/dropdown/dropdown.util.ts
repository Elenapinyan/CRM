import { DropdownOption } from '../../shared';

export const getMappedDataToDropdown = <T extends { [key: string]: any }, D extends keyof T>({
  inputArray,
  valueKey,
  textKey,
}: {
  inputArray: T[];
  textKey: D;
  valueKey: D;
}): DropdownOption[] => {
  return inputArray.map((item) => ({ text: String(item[textKey]), value: item[valueKey] }));
};
