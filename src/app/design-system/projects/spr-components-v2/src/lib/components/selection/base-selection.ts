import { computed, Directive, input, model } from '@angular/core';
import { DropdownOption } from '../../shared';
import { BaseControlValueAccessor } from '../../shared/utils';

@Directive()
export abstract class BaseSelection extends BaseControlValueAccessor<unknown | unknown[] | null> {
  protected readonly filteredOptions = computed(() => this.filterOptions(this.options(), this.searchTerm()));

  protected readonly maxItems = computed(() => {
    const options = this.options();
    const maxDisplayedItems = this.maxDisplayedItems();

    return options.length && options.length < maxDisplayedItems ? options.length : maxDisplayedItems;
  });

  /**
   * Maximum number of displayed options in dropdown without scrolling
   * @Default 10
   **/
  maxDisplayedItems = input(10);

  /**
   * Options list
   * @Default []
   **/
  options = input<DropdownOption[]>([]);

  /**
   * Enables/disables items filtering
   * @Default false
   **/
  withSearch = input<boolean>(false);

  /**
   * Set placeholder for the search input
   * @Default empty string
   **/
  searchPlaceholder = input<string>('Search...');

  /**
   * Emits when search value is changed
   **/
  searchTerm = model<string>('');

  /**
   * This property let you specify option property key be used as a value
   **/
  valueKey = input<keyof DropdownOption | false>('value');

  protected abstract select(option: DropdownOption): void;

  private filterOptions(options: DropdownOption[], searchValue: string | null): DropdownOption[] {
    return options.filter((option) => option.text.toLocaleLowerCase().includes(searchValue?.toLocaleLowerCase() || ''));
  }
}
