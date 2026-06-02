import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  TemplateRef,
  untracked,
} from '@angular/core';
import { CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { DropdownOption } from '../../shared';
import { DsSearchInputComponent } from '../search-input';
import { IsSelectedPipe } from './is-selected.pipe';
import { DsCheckboxComponent } from '../checkbox';
import { DsRadioButtonComponent } from '../radio-button';
import { FilterValueAccessor, provideFilterValueAccessor } from '../../shared/utils';
import { DEFAULT_SELECTION_TRANSLATIONS, SELECTION_TRANSLATIONS, SelectionTemplateType, SelectionTranslationKeys } from './selection.util';
import { BaseSelection } from './base-selection';
import { DynamicVirtualScrollWidthDirective } from './dynamic-vs-width.directive';
import { SelectionTemplateDirective } from './selection-template.directive';

@Component({
  selector: 'ds-selection',
  templateUrl: './selection.html',
  styleUrl: './selection.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CdkVirtualForOf,
    CdkVirtualScrollViewport,
    NgTemplateOutlet,
    DsSearchInputComponent,
    ReactiveFormsModule,
    IsSelectedPipe,
    DsCheckboxComponent,
    DsRadioButtonComponent,
    FormsModule,
    CdkFixedSizeVirtualScroll,
    DynamicVirtualScrollWidthDirective,
  ],
  providers: [provideFilterValueAccessor(DsSelection)],
})
export class DsSelection extends BaseSelection implements FilterValueAccessor {
  private readonly customTemplates = contentChildren(SelectionTemplateDirective, { descendants: true });

  protected readonly templatesMap = computed(() => this.createTemplatesMap(this.templates() ?? this.customTemplates()));

  protected readonly isShowSelectAllOption = computed(
    () => !this.searchTerm() && !this.disableSelectAllOption() && this.multiselect() && this.options().length > this.maxDisplayedItems(),
  );

  protected readonly isAllOptionsSelected = computed(() => {
    const allEnabledOptions = this.options().filter((option) => !option.isDisabled);

    if (!allEnabledOptions.length) {
      return false;
    }

    const selectedEnabledOptions = this.selectedOptions().filter((option) => !option.isDisabled);

    return selectedEnabledOptions.length === allEnabledOptions.length;
  });

  protected readonly isPartiallyChecked = computed(() => {
    return this.selectedOptions().length > 0 && !this.isAllOptionsSelected();
  });

  protected readonly bufferSizePx = computed(
    () => this.itemSizePx() * (this.isShowSelectAllOption() ? this.maxItems() + 1 : this.maxItems()),
  );

  protected readonly viewportMinHeightPx = computed(() => {
    const optionsLength = this.isShowSelectAllOption() ? this.filteredOptions().length + 1 : this.filteredOptions().length;

    return Math.min(optionsLength * this.itemSizePx(), this.bufferSizePx());
  });

  protected readonly selectedOptions = signal<DropdownOption[]>([]);

  protected readonly translationKeys = SelectionTranslationKeys;

  /**
   * To manage disableAutoApply from FillerValueAccessor
   * @Default false
   **/
  protected readonly autoApplyDisabled = signal(false);

  /**
   * FillerValueAccessor implementation
   **/
  readonly filterValue = computed<string[]>(() => {
    const appliedValue = this.value();

    if (!appliedValue) {
      return [];
    }

    return untracked(this.selectedOptions).map((opt) => opt.text);
  });

  /**
   * Translations
   * @Default DEFAULT_SELECTION_TRANSLATIONS
   **/
  translations = input(inject(SELECTION_TRANSLATIONS, { optional: true }) ?? DEFAULT_SELECTION_TRANSLATIONS);

  /**
   * The size of the item is needed for the virtual scroll
   * @Default 32
   **/
  itemSizePx = input(32);

  /**
   * Specifies search strategy.
   * 'api' disables local filtering.
   * Use searchTermChange + scrolledToBottom events additionally to 'api' strategy.
   * @Default local
   **/
  searchStrategy = input<'local' | 'api'>('local');

  /**
   * Disables marker before option text (radio for single select)
   * @Default false
   **/
  disableItemMarker = model<boolean>(false);

  /**
   * Switch between single select and multi select
   * @Default false
   **/
  multiselect = input<boolean>(false);

  /**
   * Disables built-in "select all" option.
   * Otherwise, option will appear when `multiselect` is `true` and `options.length` > `maxDisplayedItems`
   * @Default false
   **/
  disableSelectAllOption = model<boolean>(false);

  /**
   * This value will be returned to control when all items selected
   * @Default not specified. It means that all options will be returned.
   **/
  widthByContent = input<boolean>(false);

  /**
   * You can set custom templates via input property.
   * Useful for cases when custom templates needed but this component is as a part of another.
   * @Default undefined
   **/
  templates = input<readonly SelectionTemplateDirective[]>();

  readonly scrolledToBottom = output<void>();
  readonly optionsSelected = output<DropdownOption[]>();
  readonly valueChanged = output<void>();

  constructor() {
    super();

    effect(() => {
      const options = this.options();

      if (!options.length) {
        return;
      }

      const value = untracked(this.value);

      if (!value) {
        return;
      }

      this.updateSelectedOptions(value);
    });
  }

  /**
   * FilterValueAccessor implementation
   **/
  apply(): void {
    const valueKey = this.valueKey();
    const values = this.selectedOptions().map((option) => (valueKey ? (option?.[valueKey] ?? option) : option));

    this.value.set(this.multiselect() ? values : (values?.[0] ?? null));

    this.onChange(this.value());

    this.valueChanged.emit();
  }

  /**
   * FilterValueAccessor implementation
   **/
  resetValue(): void {
    this.selectedOptions.set([]);

    this.optionsSelected.emit(this.selectedOptions());

    this.value.set(this.multiselect() ? [] : null);

    this.onChange(this.value());

    this.valueChanged.emit();
  }

  /**
   * FilterValueAccessor implementation
   **/
  disableAutoApply(value: boolean): void {
    this.autoApplyDisabled.set(value);
  }

  override writeValue(value: unknown | unknown[] | null): void {
    this.updateSelectedOptions(value);
  }

  protected selectAll(): void {
    const disabledSelectedOptions = this.selectedOptions().filter((option) => option.isDisabled);

    if (this.isAllOptionsSelected()) {
      this.selectedOptions.set([...disabledSelectedOptions]);
    } else {
      const allEnabledOptions = this.options().filter((option) => !option.isDisabled);
      this.selectedOptions.set([...disabledSelectedOptions, ...allEnabledOptions]);
    }

    this.optionsSelected.emit(this.selectedOptions());

    !this.autoApplyDisabled() && this.apply();
  }

  protected select(option: DropdownOption): void {
    if (option.isDisabled) {
      return;
    }

    this.selectedOptions.update((values) => {
      if (!this.multiselect()) {
        return [option];
      }

      if (values.includes(option)) {
        return values.filter((opt) => opt !== option);
      }

      return [...values, option];
    });

    if (this.searchTerm()) {
      this.searchTerm.set('');
    }

    this.optionsSelected.emit(this.selectedOptions());

    !this.autoApplyDisabled() && this.apply();
  }

  // Emits event when the scroll bottom was reached. For the 'api' search strategy.
  protected onScrolledIndexChange(index: number): void {
    if (index === this.options().length - this.maxItems() - 1) {
      this.scrolledToBottom.emit();
    }
  }

  private updateSelectedOptions(value: unknown | unknown[] | null): void {
    const options = this.options();

    if (value === undefined || (Array.isArray(value) && !value?.length)) {
      this.selectedOptions.set([]);

      return;
    }

    const valueKey = this.valueKey();

    const values = Array.isArray(value) ? value : [value];

    const normalizedValues = values.map((v) => (!valueKey && !!v ? v.value : v));

    const selectedOptions = options.filter((option) => normalizedValues.includes(valueKey ? option[valueKey] : option.value));

    this.selectedOptions.set(selectedOptions);
  }

  private createTemplatesMap(templates: readonly SelectionTemplateDirective[]): Map<SelectionTemplateType, TemplateRef<unknown>> {
    const map: Map<SelectionTemplateType, TemplateRef<unknown>> = new Map();

    for (const template of templates) {
      const type = template.type();

      if (!type) {
        continue;
      }

      map.set(type, template.templateRef);
    }

    return map;
  }
}
