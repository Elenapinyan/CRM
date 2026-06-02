import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SprControlSizeDirective } from '../../shared/directives/spr-control-size.directive';
import { DropdownOption, DropdownOptionValue } from '../../shared/interfaces/dropdown-option.interface';
import { SelectedOption } from '../../shared/interfaces/selected-option.interface';
import { BaseDropdownControl } from '../../shared/models/base-dropdown-control';
import { FilterOptionsPipe } from '../../shared/pipes/filter-options.pipe';
import { GetControlErrorMessagePipe } from '../../shared/pipes/get-control-error-message/get-control-error-message.pipe';
import { SprErrorComponent } from '../error/spr-error.component';
import { SprLabelComponent } from '../label/spr-label.component';
import { SprSpinnerComponent } from '../spinner/spr-spinner.component';
import { SprFieldDescriptionComponent } from '../field-description/spr-field-description.component';
import { SprInputComponent } from '../input/spr-input.component';
import { ControlAddon, IconAddon, TextAddon } from '../../shared';

@Component({
  selector: 'spr-dropdown',
  templateUrl: './spr-dropdown.component.html',
  styleUrls: ['./spr-dropdown.component.scss'],
  imports: [
    CommonModule,
    SprSpinnerComponent,
    ReactiveFormsModule,
    FilterOptionsPipe,
    GetControlErrorMessagePipe,
    SprControlSizeDirective,
    NgbDropdownModule,
    SprLabelComponent,
    ScrollingModule,
    SprErrorComponent,
    SprFieldDescriptionComponent,
    SprInputComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SprDropdownComponent
  extends BaseDropdownControl<DropdownOption | null, SelectedOption, DropdownOption[]>
  implements OnChanges, OnInit
{
  @Input() placeholder = 'Search...';
  @Input() inputPlaceholder = '';
  @Input() addonStart: ControlAddon | null = null;
  @Input() addonEnd: ControlAddon | null = null;

  select(option: DropdownOption): void {
    this.control.setValue(option);

    if (this.withSearch) {
      this.clearSearchControl();
    }
  }

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
