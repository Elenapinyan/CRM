import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseControl } from '../../shared';
import { DsLabelComponent } from '../label/label.component';
import { TwoOptionSwitcherValue } from './two-options-switcher.interface';

@Component({
  selector: 'ds-two-options-switcher',
  templateUrl: 'two-options-switcher.component.html',
  styleUrls: ['two-options-switcher.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, NgbTooltipModule, DsLabelComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsTwoOptionsSwitcherComponent extends BaseControl<FormControl<boolean>, TwoOptionSwitcherValue> {
  labelStart = input<string>('');
  labelEnd = input<string>('');
  tooltipStart = input<string>('');
  tooltipEnd = input<string>('');
  startValue = input<TwoOptionSwitcherValue>(false);
  endValue = input<TwoOptionSwitcherValue>(true);

  controlToggle(value: boolean): void {
    if (this.control.disabled) {
      return;
    }

    this.control.patchValue(value);
  }

  override writeValue(value: TwoOptionSwitcherValue): void {
    const map = new Map([
      [this.startValue(), false],
      [this.endValue(), true],
    ]);

    this.control.setValue(map.get(value) ?? false, { emitEvent: false });
    this.cdRef.markForCheck();
  }

  protected override initControlListener(): void {
    const map = new Map([
      [false, this.startValue()],
      [true, this.endValue()],
    ]);

    this.control.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((v) => {
      this.cvaOnChange(map.get(v) ?? this.startValue());
    });
  }

  protected override initControl(): FormControl<boolean> {
    return this.formBuilder.nonNullable.control<boolean>(false);
  }
}
