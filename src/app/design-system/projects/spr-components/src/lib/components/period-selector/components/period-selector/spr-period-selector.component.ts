import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  input,
  Input,
  OnChanges,
  output,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgbDate,
  NgbDatepickerI18n,
  NgbDateStruct,
  NgbDropdown,
  NgbDropdownItem,
  NgbDropdownMenu,
  NgbDropdownToggle,
  NgbInputDatepicker,
  NgbTooltip,
} from '@ng-bootstrap/ng-bootstrap';
import { DatepickerTranslateService, DropdownOption, GetControlErrorMessagePipe, SprControlSizeDirective } from '../../../../shared';
import { IsRangePipe } from '../../pipes/is-range.pipe';
import { IsHoveredPipe } from '../../pipes/is-hovered.pipe';
import { DateRange, PeriodSelectorVariantType } from '../../interfaces/period-selector.interface';
import { IsInsidePipe } from '../../pipes/is-inside.pipe';
import { IsDisabledDatePipe } from '../../pipes/is-disabled-date.pipe';
import { GetDisplayedDatePipe } from '../../pipes/get-displayed-value.pipe';
import { DateRangeService, DefaultDateRangeService } from '../../services/date-range.service';
import { SprFieldDescriptionComponent } from '../../../field-description/spr-field-description.component';
import { SprBasePeriodSelector } from '../../spr-base-period-selector.directive';
import { SprButtonComponent } from '../../../button/spr-button.component';
import { SprErrorComponent } from '../../../error/spr-error.component';
import { SprLabelComponent } from '../../../label/spr-label.component';
import { PeriodVariants } from '../../enums/period-selector-variants.enum';
import { DEFAULT_DROPDOWN_NOT_SELECTED_TEXT, DEFAULT_INPUT_NOT_SELECTED_PLAYSHOLDER } from '../../constants/period-selector.constant';

@Component({
  selector: 'spr-period-selector',
  templateUrl: 'spr-period-selector.component.html',
  styleUrls: ['spr-period-selector.component.scss'],
  imports: [
    CommonModule,
    NgbInputDatepicker,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgbDropdownItem,
    NgbTooltip,
    ReactiveFormsModule,
    GetControlErrorMessagePipe,
    IsRangePipe,
    IsHoveredPipe,
    IsInsidePipe,
    IsDisabledDatePipe,
    GetDisplayedDatePipe,
    SprControlSizeDirective,
    SprFieldDescriptionComponent,
    SprErrorComponent,
    SprButtonComponent,
    SprLabelComponent,
  ],
  providers: [{ provide: NgbDatepickerI18n, useClass: DatepickerTranslateService }, DefaultDateRangeService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SprPeriodSelectorComponent extends SprBasePeriodSelector implements OnChanges {
  @Input() set selectOptions(list: DropdownOption[]) {
    if (list) {
      this.selectOptionList = list.reduce((options, item) => {
        if (item.value) {
          options.push(item);
          if (item.value === this.selectedRange) {
            this.selectedDateRange = item;
          }
        }
        return options;
      }, [] as DropdownOption[]);
      this.optionWithLongestText = this.selectOptionList.reduce((longest, item) => {
        return item.text.length > longest.text.length ? item : longest;
      }, this.selectOptionList[0]);
    }
  }

  @Input() selectedRange: PeriodSelectorVariantType | null = null;

  @Output() selectedRangeChange = new EventEmitter<PeriodSelectorVariantType | null>();
  dateDeselected = output();
  dateSelected = output<NgbDate>();

  isDeselectAllowed = input(false);
  dropdownNotSelectedText = input(DEFAULT_DROPDOWN_NOT_SELECTED_TEXT);
  inputPlaceholder = input(DEFAULT_INPUT_NOT_SELECTED_PLAYSHOLDER);
  markDisabledFn = input<(date: NgbDate) => boolean>(() => false);
  protected readonly PeriodVariants = PeriodVariants;

  protected readonly Boolean = Boolean;
  private readonly emptyDateRange: DropdownOption = { text: 'Select', value: '' };
  private readonly customDateRange: DropdownOption = { text: 'Custom', value: 'custom' };

  selectOptionList: DropdownOption[] = [];
  selectedDateRange: DropdownOption = this.emptyDateRange;
  optionWithLongestText: DropdownOption = this.emptyDateRange;

  private readonly dateRangeService = inject(DateRangeService, { optional: true }) ?? inject(DefaultDateRangeService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['selectedRange']?.currentValue && this.selectOptionList.length) {
      // to prevent re-writing manually(programmatically) set 'Not selected' from outer component
      if (changes['selectedRange'].currentValue === PeriodVariants.NotSelected) {
        this.deselectDate();
        return;
      }

      const option = this.selectOptionList.find((o) => o.value === this.selectedRange);
      this.selectedDateRange = option || this.customDateRange;
    }
  }

  override onDateSelection(date: NgbDate, custom = false): void {
    if (custom) {
      this.updateDateRange(this.customDateRange);
      this.dateSelected.emit(date);
    }

    super.onDateSelection(date, custom);
  }

  override writeValue(value: DateRange | null): void {
    let shouldResetLabel = true;

    // Skip the check if the current range is 'Custom' or if dates are missing.
    if (this.selectedRange && this.selectedRange !== PeriodVariants.Custom && value?.dateFrom && value?.dateTo) {
      const currentDates = this.dateRangeService.getDateRange(this.selectedRange);

      // Helper function to safely compare NgbDate with incoming form string value.
      const isSameDate = (base: NgbDate | null | undefined, target: string | NgbDateStruct | null | undefined): boolean => {
        if (!base || !target) {
          return false;
        }

        if (typeof target === 'string') {
          // Strip the time part (e.g., 'T23:59:59.000Z') from the ISO string to prevent timezone shift issues.
          const dateOnlyString = target.split('T')[0];

          const [y, m, d] = dateOnlyString.split('-').map(Number);
          return base.year === y && base.month === m && base.day === d;
        }

        return base.equals(target);
      };

      // If the incoming dates exactly match the currently selected preset (e.g., 'Today'), preserve the current label.
      if (isSameDate(currentDates?.dateFrom, value.dateFrom) && isSameDate(currentDates?.dateTo, value.dateTo)) {
        shouldResetLabel = false;
      }
    }

    // If dates don't match the preset, fallback to the default label (e.g., 'Select').
    if (shouldResetLabel && value?.dateFrom && value?.dateTo) {
      this.updateDateRange(this.emptyDateRange);
    }

    super.writeValue(value);
  }

  deselectDate(): void {
    this.updateDateRange({ value: PeriodVariants.NotSelected, text: this.dropdownNotSelectedText() });
    this.control.setValue({ dateFrom: null, dateTo: null });
    this.cvaOnChange(null);
    this.onApply(true);
    this.dateDeselected.emit();
  }

  selectOption(option: DropdownOption): void {
    this.dateSelectedFromSelectOption = true;

    this.updateDateRange(option);
    const parsedDateRange = this.dateRangeService.getDateRange(option.value as PeriodSelectorVariantType);
    if (!parsedDateRange) {
      this.control.patchValue(
        {
          dateFrom: null,
          dateTo: null,
        },
        { emitEvent: false },
      );

      this.cvaOnChange(null);
      return;
    }

    this.control.patchValue(parsedDateRange);
  }

  private updateDateRange(option: DropdownOption): void {
    this.selectedDateRange = option;
    this.selectedRangeChange.emit(option.value as PeriodSelectorVariantType);
  }
}
