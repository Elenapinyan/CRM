import { Pipe, PipeTransform } from '@angular/core';
import { DropdownOption } from '../../../shared/interfaces/dropdown-option.interface';

@Pipe({
  name: 'getMultiSelectDisplayValue',
  standalone: true,
  pure: false,
})
export class GetMultiSelectDisplayValuePipe implements PipeTransform {
  transform(value: DropdownOption[] | null): string {
    if (!value || !value.length) {
      return '';
    }

    return value.map((o) => o.text).join(', ');
  }
}
