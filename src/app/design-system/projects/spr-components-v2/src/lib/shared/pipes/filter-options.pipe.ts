import { Pipe, PipeTransform } from '@angular/core';
import { DropdownOption } from '../interfaces/dropdown-option.interface';

@Pipe({
  name: 'filterOptions',
  standalone: true,
})
export class FilterOptionsPipe implements PipeTransform {
  transform(options: DropdownOption[], searchValue: string | null): DropdownOption[] {
    return options.filter((option) => option.text.toLocaleLowerCase().includes(searchValue?.toLocaleLowerCase() || ''));
  }
}
