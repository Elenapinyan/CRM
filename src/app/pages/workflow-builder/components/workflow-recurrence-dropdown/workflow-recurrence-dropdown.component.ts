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
import { DsDropdownComponent } from '@platform-workspace/design-system-v2';

import { WORKFLOW_RECURRENCE_OPTIONS } from '../../data/workflow-settings.constants';
import type { WorkflowRecurrence } from '../../workflow-builder.model';

@Component({
  selector: 'app-workflow-recurrence-dropdown',
  template: `<ng-container #dropdownHost />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowRecurrenceDropdownComponent implements AfterViewInit {
  @ViewChild('dropdownHost', { read: ViewContainerRef }) private dropdownHost?: ViewContainerRef;

  readonly control = input.required<FormControl<WorkflowRecurrence>>();
  readonly valueChange = output<WorkflowRecurrence>();

  ngAfterViewInit(): void {
    const host = this.dropdownHost;
    if (!host) {
      return;
    }

    const control = this.control();
    const dropdown = host.createComponent(DsDropdownComponent);

    dropdown.setInput('label', 'Recurrence');
    dropdown.setInput('controlSize', 'sm');
    dropdown.setInput('withSearch', false);
    dropdown.setInput('options', [...WORKFLOW_RECURRENCE_OPTIONS]);
    dropdown.setInput('dropdownPlaceholder', 'One time');

    dropdown.instance.registerOnChange((value) => {
      if (value === null || value === undefined) {
        return;
      }
      const next = value as WorkflowRecurrence;
      control.setValue(next, { emitEvent: false });
      this.valueChange.emit(next);
    });
    dropdown.instance.registerOnTouched(() => control.markAsTouched());

    dropdown.instance.writeValue(control.value);
    dropdown.changeDetectorRef.detectChanges();
  }
}
