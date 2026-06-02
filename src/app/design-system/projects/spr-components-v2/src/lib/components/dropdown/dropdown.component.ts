import { ScrollingModule } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, contentChildren, inject, input, OnChanges, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectedOption } from '../../shared/interfaces/selected-option.interface';
import { BaseDropdownControl } from '../../shared/models/base-dropdown-control';
import { DsSpinnerComponent } from '../spinner';
import {
  ControlAddon,
  DropdownOption,
  DropdownOptionValue,
  IconAddon,
  MenuDirective,
  DsControlSizeDirective,
  TextAddon,
} from '../../shared';
import { DEFAULT_SELECTION_TRANSLATIONS, DsSelection, SELECTION_TRANSLATIONS, SelectionTemplateDirective } from '../selection';
import { DsFormField } from '../form-field';

@Component({
  selector: 'ds-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  imports: [
    DsSpinnerComponent,
    ReactiveFormsModule,
    DsControlSizeDirective,
    NgbDropdownModule,
    ScrollingModule,
    DsSelection,
    MenuDirective,
    DsFormField,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsDropdownComponent
  extends BaseDropdownControl<DropdownOption | null, SelectedOption, DropdownOption[]>
  implements OnChanges, OnInit
{
  protected readonly customTemplates = contentChildren(SelectionTemplateDirective, { descendants: true });

  placeholder = input('Search...');
  inputPlaceholder = input('');
  addonStart = input<ControlAddon | null>(null);
  addonEnd = input<ControlAddon | null>(null);

  /**
   * Translations
   * @Default DEFAULT_SELECTION_TRANSLATIONS
   **/
  translations = input(inject(SELECTION_TRANSLATIONS, { optional: true }) ?? DEFAULT_SELECTION_TRANSLATIONS);

  iconAddonTypeGuard(addon: ControlAddon): addon is IconAddon {
    return (addon as IconAddon).icon !== undefined && 'icon' in addon;
  }

  textAddonTypeGuard(addon: ControlAddon): addon is TextAddon {
    return (addon as TextAddon).text !== undefined && 'text' in addon;
  }

  protected override updateSelectedOptionsOnValueChange(options: DropdownOption[], value: SelectedOption): void {
    this.updateSelectedOptions(options, value);
    this.cdRef.markForCheck();
  }

  protected override updateSelectedOptionOnOptionsChange(options: DropdownOption[], value: SelectedOption): void {
    this.updateSelectedOptions(options, value);
    this.cdRef.markForCheck();
  }

  protected override initControl(): FormControl<DropdownOption | null> {
    return this.formBuilder.nonNullable.control<DropdownOption | null>(null);
  }

  protected override initControlListener(): void {
    this.control.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((option) => {
      this.cvaOnChange(option?.value as DropdownOptionValue);
    });
  }

  private updateSelectedOptions(options: DropdownOption[], value: SelectedOption): void {
    const option = options.find((opt) => opt.value === value);
    if (option) {
      this.control.setValue(option, { emitEvent: false });
    } else {
      const newOption =
        this.control.value && this.control.value.value === value
          ? this.control.value
          : {
              text: '',
              value,
            };

      this.control.setValue(newOption, { emitEvent: false });
    }
  }
}
