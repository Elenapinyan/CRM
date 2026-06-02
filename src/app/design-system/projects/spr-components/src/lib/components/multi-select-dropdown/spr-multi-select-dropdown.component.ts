import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SPR_LABEL, SprLabelContainerDirective } from '../../directives/spr-label';
import { NOT_SELECTED_FILTER, NOT_SELECTED_FILTER_TOKEN } from '../../shared/constants/dropdown-option.constant';
import { SprControlSizeDirective } from '../../shared/directives/spr-control-size.directive';
import { DropdownOption } from '../../shared/interfaces/dropdown-option.interface';
import { SelectedOption } from '../../shared/interfaces/selected-option.interface';
import { BaseDropdownControl } from '../../shared/models/base-dropdown-control';
import { FilterOptionsPipe } from '../../shared/pipes/filter-options.pipe';
import { GetControlErrorMessagePipe } from '../../shared/pipes/get-control-error-message/get-control-error-message.pipe';
import { SprCheckboxComponent } from '../checkbox/spr-checkbox.component';
import { SprErrorComponent } from '../error/spr-error.component';
import { SprFieldDescriptionComponent } from '../field-description/spr-field-description.component';
import { SprInputComponent } from '../input/spr-input.component';
import { SprSpinnerComponent } from '../spinner/spr-spinner.component';
import { GetMultiSelectDisplayValuePipe } from './pipes/get-multi-select-display-value.pipe';
import { IsSelectedOptionPipe } from './pipes/is-selected-option.pipe';
import { ControlAddon, IconAddon, TextAddon } from '../../shared';

@Component({
  selector: 'spr-multi-select-dropdown',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    GetControlErrorMessagePipe,
    NgbTooltipModule,
    FilterOptionsPipe,
    GetMultiSelectDisplayValuePipe,
    IsSelectedOptionPipe,
    ScrollingModule,
    NgbDropdownModule,
    SprControlSizeDirective,
    SprCheckboxComponent,
    SprErrorComponent,
    SprSpinnerComponent,
    SprLabelContainerDirective,
    SprFieldDescriptionComponent,
    SprInputComponent,
  ],
  templateUrl: './spr-multi-select-dropdown.component.html',
  styleUrls: ['./spr-multi-select-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [SPR_LABEL],
})
export class SprMultiSelectDropdownComponent extends BaseDropdownControl<DropdownOption[], SelectedOption[], DropdownOption[]> {
  @Input() isSelectedAllOption = true;
  @Input() inputPlaceholder = '';
  @Input() addonStart: ControlAddon | null = null;
  @Input() addonEnd: ControlAddon | null = null;

  private readonly notSelectedOption = inject(NOT_SELECTED_FILTER_TOKEN, { optional: true });

  select(option: DropdownOption): void {
    if (!option.value) {
      if (this.control.value.length === 1 && !this.control.value[0].value) {
        this.control.setValue(this.options.filter(({ isDisabled, value }) => isDisabled && value));
        return;
      }

      this.control.setValue([option]);
      return;
    } else if (this.control.value.length === 1 && !this.control.value[0].value) {
      this.control.setValue(this.options.filter((o) => o !== option && Boolean(o.value)));
      return;
    }

    if (this.control.value.some((o) => o.value === option.value)) {
      this.control.setValue(this.control.value.filter((o) => o.value !== option.value));
    } else {
      const newOptions = [...this.control.value, option].filter((o) => Boolean(o.value));

      if (newOptions.length === this.options.filter((o) => Boolean(o.value)).length && this.isSelectedAllOption) {
        this.control.setValue([this.notSelectedOption || NOT_SELECTED_FILTER]);
      } else {
        this.control.setValue(newOptions);
      }
    }
  }

  iconAddonTypeGuard(addon: ControlAddon): addon is IconAddon {
    return (addon as IconAddon).icon !== undefined && 'icon' in addon;
  }

  textAddonTypeGuard(addon: ControlAddon): addon is TextAddon {
    return (addon as TextAddon).text !== undefined && 'text' in addon;
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
      const mappedOptions = (options || []).map((option) => option.value);
      this.cvaOnChange(mappedOptions);
    });
  }

  protected override initControl(): FormControl<DropdownOption[]> {
    return this.formBuilder.nonNullable.control<DropdownOption[]>([]);
  }

  private updatedSelectedOptions(options: DropdownOption[], value: SelectedOption[], isWriteValue: boolean): void {
    if (!value || !value.length) {
      this.control.setValue([], { emitEvent: false });
    } else if (this.filterStrategy === 'api' && !isWriteValue && this.control.value.length === value.length) {
      return;
    } else {
      const filteredOptions = options.filter((opt) => value.includes(opt.value));
      if (filteredOptions.length) {
        this.control.setValue(filteredOptions, { emitEvent: false });
      }
    }
  }
}
