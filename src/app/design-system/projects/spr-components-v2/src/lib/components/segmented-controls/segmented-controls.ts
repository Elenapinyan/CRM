import { ChangeDetectionStrategy, Component, input, model, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DsSegmentedControl } from '../segmented-control/segmented-control';
import { SegmentedControlId, SegmentedControlModel } from './segmented-controls.options';

@Component({
  selector: 'ds-segmented-controls',
  imports: [DsSegmentedControl],
  templateUrl: './segmented-controls.html',
  styleUrl: './segmented-controls.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DsSegmentedControls,
    },
  ],
})
export class DsSegmentedControls implements ControlValueAccessor {
  readonly items = input<SegmentedControlModel[]>();
  readonly activeItemId = model<SegmentedControlId>();

  readonly touched = signal(false);
  readonly disabled = signal(false);

  onChange = (value: SegmentedControlId): void => {};

  onTouched = (): void => {};

  writeValue(id: SegmentedControlId): void {
    this.activeItemId.set(id);
  }

  registerOnChange(fn: (value?: SegmentedControlId) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled.set(disabled);
  }

  protected setActiveItem(item: SegmentedControlModel, e?: any): void {
    if (item.disabled || item.id === this.activeItemId()) {
      return;
    }
    this.markAsTouched();
    this.activeItemId.set(item.id);
    this.onChange(item.id);
  }

  private markAsTouched(): void {
    if (!this.touched()) {
      this.onTouched();
      this.touched.set(true);
    }
  }
}
