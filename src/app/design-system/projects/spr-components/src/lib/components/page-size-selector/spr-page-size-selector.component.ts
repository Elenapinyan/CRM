import { ChangeDetectionStrategy, Component, forwardRef, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { DropdownOption } from '../../shared/interfaces/dropdown-option.interface';
import { SprDropdownComponent } from '../dropdown/spr-dropdown.component';
import { DEFAULT_PAGE_SIZE_SELECTOR_SIZES, PAGE_SIZE_SELECTOR_CONFIG_TOKEN } from './constants/page-size-selector.constant';
import { PageSizeSelectorConfig } from './interfaces/page-size-selector-config.interface';

@Component({
  selector: 'spr-page-size-selector',
  imports: [FormsModule, SprDropdownComponent, ReactiveFormsModule],
  templateUrl: './spr-page-size-selector.component.html',
  styleUrls: ['./spr-page-size-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SprPageSizeSelectorComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SprPageSizeSelectorComponent implements OnChanges, ControlValueAccessor {
  @Input() sizes = DEFAULT_PAGE_SIZE_SELECTOR_SIZES;
  @Input() disabled = false;

  sizesOptions: DropdownOption[] = this.pageSizeSelectorConfig.mapToOptions(this.sizes);
  value: number = 0;

  constructor(@Inject(PAGE_SIZE_SELECTOR_CONFIG_TOKEN) private readonly pageSizeSelectorConfig: PageSizeSelectorConfig) {}

  onChange: (value?: number) => void = () => {};

  onTouched: () => void = () => {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['sizes']) {
      this.sizesOptions = this.pageSizeSelectorConfig.mapToOptions(this.sizes);
    }
  }

  onModelChange(value: number): void {
    this.value = value;
    this.onChange(value);
  }

  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: (value?: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
