import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DEFAULT_SELECTION_TRANSLATIONS, DsSelection, SELECTION_TRANSLATIONS } from '../../selection';
import { DropdownOption, DropdownOptionValue } from '../../../shared';
import {
  BaseControlValueAccessor,
  FilterValueAccessor,
  provideFilterValueAccessor,
  SPR_FILTER_CUSTOM_FOOTER_IMPLEMENTATION,
} from '../../../shared/utils';
import { DsButton } from '../../button';
import { DsFilter } from '../filter';
import { FilterTranslationsKeys } from '../filter.util';

@Component({
  selector: 'ds-selection-filter',
  templateUrl: './selection-filter.html',
  styleUrl: './selection-filter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DsSelection, DsButton, FormsModule],
  providers: [{ provide: SPR_FILTER_CUSTOM_FOOTER_IMPLEMENTATION, useValue: true }, provideFilterValueAccessor(DsSelectionFilter)],
})
export class DsSelectionFilter
  extends BaseControlValueAccessor<DropdownOptionValue | DropdownOptionValue[] | null>
  implements FilterValueAccessor
{
  protected readonly filter = inject(DsFilter, { optional: true });

  protected readonly translationKeys = FilterTranslationsKeys;

  protected readonly selectedOptions = signal<DropdownOption[]>([]);
  protected readonly appliedOptions = signal<DropdownOption[]>([]);

  private autoApplyDisabled = true;

  /**
   * FillerValueAccessor implementation
   **/
  filterValue = computed(() => {
    const appliedValue = this.appliedOptions();

    if (!appliedValue) {
      return null;
    }

    return appliedValue.map((opt) => opt.text);
  });

  /**
   * Translations
   * @Default DEFAULT_SELECTION_TRANSLATIONS
   **/
  translations = input(inject(SELECTION_TRANSLATIONS, { optional: true }) ?? DEFAULT_SELECTION_TRANSLATIONS);

  /**
   * Switch between single select and multi select
   * @Default false
   **/
  multiselect = input<boolean>(false);

  /**
   * This value will be returned to control when all items selected
   * @Default not specified. It means that all options will be returned.
   **/
  widthByContent = input<boolean>(false);

  /**
   * Footer toggle. Setting this to false will enable auto apply.
   * @Default true
   **/
  withSearch = input<boolean>(true);

  /**
   * Options list
   * @Default []
   **/
  options = input<DropdownOption[]>([]);

  /**
   * FillerValueAccessor implementation
   **/
  resetValue(): void {
    this.value.set(this.multiselect() ? [] : null);

    this.appliedOptions.set([]);

    this.onChange(this.value());

    this.filter?.closeMenu();
  }

  /**
   * FillerValueAccessor implementation
   **/
  apply(): void {
    this.appliedOptions.set(this.selectedOptions());

    this.onChange(this.value());

    this.filter?.closeMenu();
  }

  /**
   * FillerValueAccessor implementation
   **/
  disableAutoApply(value: boolean): void {
    this.autoApplyDisabled = value;
  }

  protected updateSelectedValue(value: DropdownOptionValue | DropdownOptionValue[]): void {
    this.value.set(value);

    if (this.autoApplyDisabled) {
      return;
    }

    this.apply();
  }
}
