import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sprFilterArray',
})
export class FilterArrayPipe<T extends { [prop: string]: unknown }> implements PipeTransform {
  transform(arr: T[], searchTerm: string, filterKey: string): T[] {
    if (!arr?.length || !searchTerm || !filterKey) {
      return arr ?? [];
    }

    return arr.filter((item) => {
      if (typeof item?.[filterKey] !== 'string') {
        return true;
      }

      return item[filterKey].toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
    });
  }
}
