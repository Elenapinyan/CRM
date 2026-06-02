import { ChangeDetectionStrategy, Component, computed, effect, input, signal } from '@angular/core';
import { DsInputComponent } from '../../input';
import { BaseControlValueAccessor } from '../../../shared/utils';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { fixNgbTimePads, timeEquals } from '../datepicker.util';
import { MaskitoOptions } from '@maskito/core';

@Component({
  selector: 'ds-datepicker-time',
  templateUrl: './datepicker-time.html',
  styleUrl: './datepicker-time.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DsInputComponent, FormsModule],
})
export class DsDatepickerTime extends BaseControlValueAccessor<NgbTimeStruct | null> {
  label = input<string | null>(null);
  timeMask = input<MaskitoOptions | null>(null);
  timePlaceholder = input<string>('00:00');

  protected readonly timeValue = signal<string | null>(null);

  protected readonly ngbTime = computed<NgbTimeStruct | null>(() => {
    const v = this.timeValue();

    if (!v) {
      return null;
    }

    const parsedValue = v.split(':').map((v) => parseInt(v));

    return { hour: parsedValue[0] ?? 0, minute: parsedValue[1] ?? 0, second: parsedValue?.[2] ?? 0 };
  });

  constructor() {
    super();

    effect(() => {
      const value = this.ngbTime();
      const prevValue = this.value();

      if (prevValue && value && timeEquals(value, prevValue)) {
        return;
      }

      this.onChange(value);
      this.value.set(value);
    });
  }

  override writeValue(value: NgbTimeStruct | null): void {
    super.writeValue(value);

    if (!value) {
      this.timeValue.set(null);
    } else {
      const { hour, minutes, seconds } = fixNgbTimePads(value);

      this.timeValue.set(`${hour}:${minutes}:${seconds}`);
    }
  }
}
