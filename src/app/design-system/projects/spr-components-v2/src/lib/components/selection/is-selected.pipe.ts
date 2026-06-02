import { Pipe, PipeTransform } from '@angular/core';
import { DropdownOption } from '../../shared';

@Pipe({
  name: 'isSelected',
})
export class IsSelectedPipe implements PipeTransform {
  transform(option: DropdownOption, options: DropdownOption[]): boolean {
    return options.some((opt) => opt.value === option.value);
  }
}
