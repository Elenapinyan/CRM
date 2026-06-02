import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
  input,
  output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  DsDatepicker,
  SprDatetimeAdapter,
  SprDefaultDatetimeAdapter,
} from '@platform-workspace/design-system-v2';

@Component({
  selector: 'app-workflow-datetime-picker',
  template: `<ng-container #pickerHost />`,
  styleUrl: './workflow-datetime-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: SprDatetimeAdapter, useClass: SprDefaultDatetimeAdapter }],
})
export class WorkflowDatetimePickerComponent implements AfterViewInit {
  @ViewChild('pickerHost', { read: ViewContainerRef }) private pickerHost?: ViewContainerRef;

  readonly label = input('Date time');
  readonly isColored = input(false);
  readonly isDeselectAllowed = input(false);
  readonly placeholder = input('');
  readonly control = input.required<FormControl<Date | null>>();

  /** Emitted when the user confirms a date/time in the picker (avoids valueChanges ↔ writeValue loops). */
  readonly valueChange = output<Date | null>();

  private pickerRef?: ComponentRef<DsDatepicker<Date>>;

  ngAfterViewInit(): void {
    const host = this.pickerHost;
    if (!host) {
      return;
    }

    const control = this.control();
    const picker = host.createComponent(DsDatepicker);
    this.pickerRef = picker as ComponentRef<DsDatepicker<Date>>;

    picker.setInput('label', this.label());
    picker.setInput('controlSize', 'sm');
    picker.setInput('timepicker', true);
    picker.setInput('isColored', this.isColored());
    picker.setInput('isDeselectAllowed', this.isDeselectAllowed());
    if (this.placeholder()) {
      picker.setInput('placeholder', this.placeholder());
    }

    // With isDeselectAllowed, DS auto-applies on every form.valueChanges and can freeze the UI.
    // Values are committed on popup close via apply() instead.
    picker.instance.disableAutoApply(true);

    picker.instance.registerOnChange((value) => {
      const next = value as Date | null;
      control.setValue(next, { emitEvent: false });
      this.valueChange.emit(next);
    });
    picker.instance.registerOnTouched(() => control.markAsTouched());

    if (control.value) {
      picker.instance.writeValue(control.value);
    }

    picker.location.nativeElement.classList.add('wf-settings-modal__datepicker-host');
    picker.changeDetectorRef.detectChanges();
  }
}
