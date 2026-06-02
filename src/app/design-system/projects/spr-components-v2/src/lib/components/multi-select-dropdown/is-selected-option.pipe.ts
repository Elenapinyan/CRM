import { Pipe, PipeTransform } from '@angular/core';
import { DropdownOption } from '../../shared/interfaces/dropdown-option.interface';

@Pipe({
  name: 'isSelectedOption',
})
export class IsSelectedOptionPipe implements PipeTransform {
  transform(options: DropdownOption[], currentOption: DropdownOption): boolean {
    if (options.length === 1 && !options[0].value) {
      return true;
    }

    return options.some((o) => o.value === currentOption.value);
  }
}
