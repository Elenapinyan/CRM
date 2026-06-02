import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConditionFilterType, ConditionPlaceholderKeys, DEFAULT_CONDITIONS_FILTER_TRANSLATIONS } from '../conditions.util';
import { DsDatepicker, SprDatetimeAdapter, SprDefaultDatetimeAdapter } from '../../../datepicker';
import { DsNumericInputComponent } from '../../../numeric-input';
import { DsInputComponent } from '../../../input';
import { BaseControlValueAccessor } from '../../../../shared/utils';

@Component({
  selector: 'ds-conditions-filter-equals',
  templateUrl: './condition-equals.html',
  styleUrl: './condition-equals.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DsDatepicker, DsNumericInputComponent, DsInputComponent, FormsModule],
  providers: [
    {
      provide: SprDatetimeAdapter,
      useClass: SprDefaultDatetimeAdapter,
    },
  ],
})
export class DsConditionEquals extends BaseControlValueAccessor {
  protected readonly types = ConditionFilterType;
  protected readonly placeholderKeys = ConditionPlaceholderKeys;

  translations = input(DEFAULT_CONDITIONS_FILTER_TRANSLATIONS);
  type = input<ConditionFilterType>(ConditionFilterType.TEXT);
}
