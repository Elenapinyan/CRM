import { Pipe, PipeTransform } from '@angular/core';
import { PaginationParams } from '../interfaces/pagination-bar-config.interface';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '../../../shared/constants/table.constant';

@Pipe({
  name: 'collectionSize',
  standalone: true,
})
export class CollectionSizePipe implements PipeTransform {
  // To keep next button enabled when hasNext is true
  readonly nextStepModifier: number = 2;

  transform(
    collectionSize?: number,
    paginationParams?: PaginationParams,
    page: number = DEFAULT_PAGE_NUMBER,
    size: number = DEFAULT_PAGE_SIZE,
  ): number {
    if (!paginationParams) {
      return collectionSize ?? 0;
    }

    if (!paginationParams && !collectionSize) {
      return 0;
    }

    return paginationParams.hasNext ? size * (page + this.nextStepModifier) : size * (page + 1);
  }
}
