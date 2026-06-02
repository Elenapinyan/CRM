import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, contentChildren, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NOT_SELECTED_FILTER, NOT_SELECTED_FILTER_TOKEN } from '../../shared/constants/dropdown-option.constant';
import {
  ControlAddon,
  DropdownOption,
  DsControlSizeDirective,
  IconAddon,
  MenuDirective,
  SprLimiterContainerDirective,
  SprLimiterCounterDirective,
  SprLimiterItemDirective,
  TextAddon,
} from '../../shared';
import { SelectedOption } from '../../shared/interfaces/selected-option.interface';
import { BaseDropdownControl } from '../../shared/models/base-dropdown-control';
import { DsButton } from '../button';
import { DsChipsComponent } from '../chips/chips.component';
import { DEFAULT_SELECTION_TRANSLATIONS, DsSelection, SELECTION_TRANSLATIONS, SelectionTemplateDirective } from '../selection';
import { DsFormField } from '../form-field';
import { DsSpinnerComponent } from '../spinner';

@Component({
  selector: 'ds-multi-select-dropdown',
  templateUrl: 'multi-select-dropdown.html',
  styleUrl: 'multi-select-dropdown.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbTooltipModule,
    ScrollingModule,
    NgbDropdownModule,
    DsControlSizeDirective,
    SprLimiterContainerDirective,
    SprLimiterItemDirective,
    DsButton,
    DsChipsComponent,
    SprLimiterCounterDirective,
    MenuDirective,
    DsSelection,
    DsFormField,
    DsSpinnerComponent,
  ],
})
export class DsMultiSelectDropdownComponent extends BaseDropdownControl<DropdownOption[], SelectedOption[], DropdownOption[]> {
  private readonly notSelectedOption = inject(NOT_SELECTED_FILTER_TOKEN, { optional: true });

  private readonly MAX_CHIPS_TO_RENDER = 20;

  protected readonly customTemplates = contentChildren(SelectionTemplateDirective, { descendants: true });

  protected readonly collapsedItems = signal<DropdownOption[]>([]);
  protected readonly collapsedItemsNames = computed(() =>
    this.collapsedItems()
      .map((item) => item.text)
      .join(', '),
  );

  protected readonly selectedOptionsSignal = signal<DropdownOption[]>([]);

  protected readonly chipsToRender = computed(() => this.selectedOptionsSignal().slice(0, this.MAX_CHIPS_TO_RENDER));

  protected readonly hiddenChipsCount = computed(() => {
    const totalSelected = this.selectedOptionsSignal().length;

    if (!totalSelected) {
      return 0;
    }

    const renderedCount = this.chipsToRender().length;
    const collapsedCount = this.collapsedItems().length;

    return totalSelected - renderedCount + collapsedCount;
  });

  isSelectedAllOption = input(true);
  inputPlaceholder = input('');
  searchPlaceholder = input('Search');
  addonStart = input<ControlAddon | null>(null);
  addonEnd = input<ControlAddon | null>(null);

  /**
   * Translations
   * @Default DEFAULT_SELECTION_TRANSLATIONS
   **/
  translations = input(inject(SELECTION_TRANSLATIONS, { optional: true }) ?? DEFAULT_SELECTION_TRANSLATIONS);

  addCollapsedItems(items: DropdownOption[]): void {
    this.collapsedItems.set(items);
  }

  remove(option: DropdownOption): void {
    this.control.setValue(this.control.value.filter((o) => o.value !== option.value));
  }

  iconAddonTypeGuard(addon: ControlAddon): addon is IconAddon {
    return (addon as IconAddon).icon !== undefined && 'icon' in addon;
  }

  textAddonTypeGuard(addon: ControlAddon): addon is TextAddon {
    return (addon as TextAddon).text !== undefined && 'text' in addon;
  }

  resetValue(event: MouseEvent): void {
    event.stopPropagation();

    this.control.setValue([]);
  }

  protected override updateSelectedOptionsOnValueChange(options: DropdownOption[], value: SelectedOption[]): void {
    this.updatedSelectedOptions(options, value, true);
    this.cdRef.markForCheck();
  }

  protected override updateSelectedOptionOnOptionsChange(options: DropdownOption[], value: SelectedOption[]): void {
    this.updatedSelectedOptions(options, value, false);
    this.cdRef.markForCheck();
  }

  protected override initControlListener(): void {
    this.control.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((options) => {
      this.selectedOptionsSignal.set(options);

      const allPossibleOptionsToSelect = this.options().filter((opt) => !opt.isDisabled && opt.value);

      if (options.length === allPossibleOptionsToSelect.length && this.isSelectedAllOption()) {
        this.cvaOnChange([this.notSelectedOption?.value || NOT_SELECTED_FILTER.value]);
        return;
      }

      const mappedOptions = (options || []).map((option) => option.value);

      this.cvaOnChange(mappedOptions);
    });
  }

  protected override initControl(): FormControl<DropdownOption[]> {
    return this.formBuilder.nonNullable.control<DropdownOption[]>([]);
  }

  private updatedSelectedOptions(options: DropdownOption[], value: SelectedOption[], isWriteValue: boolean): void {
    const customSelectAllOption = this.notSelectedOption || NOT_SELECTED_FILTER;

    if (this.isSelectedAllOption() && (value === customSelectAllOption.value || value?.[0] === customSelectAllOption.value)) {
      const allPossibleOptionsToSelect = this.options().filter((opt) => !opt.isDisabled && opt.value);

      this.control.setValue(allPossibleOptionsToSelect, { emitEvent: false });
    } else if (!value || !value.length) {
      this.control.setValue([], { emitEvent: false });
    } else if (this.filterStrategy() === 'api' && !isWriteValue && this.control.value.length === value.length) {
      return;
    } else {
      const filteredOptions = options.filter((opt) => value.includes(opt.value));

      if (filteredOptions.length) {
        this.control.setValue(filteredOptions, { emitEvent: false });
      }
    }

    this.selectedOptionsSignal.set(this.control.value);
  }
}
