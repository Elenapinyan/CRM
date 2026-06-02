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
import { DsCheckboxComponent } from '@platform-workspace/design-system-v2';

@Component({
  selector: 'app-workflow-starts-immediately-checkbox',
  template: `<ng-container #checkboxHost />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowStartsImmediatelyCheckboxComponent implements AfterViewInit {
  @ViewChild('checkboxHost', { read: ViewContainerRef }) private checkboxHost?: ViewContainerRef;

  readonly control = input.required<FormControl<boolean>>();
  readonly valueChange = output<boolean>();

  ngAfterViewInit(): void {
    const host = this.checkboxHost;
    if (!host) {
      return;
    }

    const control = this.control();
    const checkbox = host.createComponent(DsCheckboxComponent);
    const checkboxRef = checkbox as ComponentRef<DsCheckboxComponent>;

    checkbox.setInput('label', 'Starts immediately when turned on');
    checkbox.setInput('isBottomMargin', false);

    checkbox.instance.registerOnChange((value) => {
      const next = Boolean(value);
      control.setValue(next, { emitEvent: false });
      this.valueChange.emit(next);
    });
    checkbox.instance.registerOnTouched(() => control.markAsTouched());

    checkbox.instance.writeValue(control.value);
    checkbox.changeDetectorRef.detectChanges();
  }
}
