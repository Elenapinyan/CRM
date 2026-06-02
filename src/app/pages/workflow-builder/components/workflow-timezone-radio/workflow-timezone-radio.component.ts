import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  DestroyRef,
  ViewChild,
  ViewContainerRef,
  computed,
  inject,
  input,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { DsRadioButtonComponent } from '@platform-workspace/design-system-v2';

import type { WorkflowTimezoneOption } from '../../data/workflow-settings.constants';
import type { WorkflowTimezoneMode } from '../../workflow-builder.model';

@Component({
  selector: 'app-workflow-timezone-radio',
  templateUrl: './workflow-timezone-radio.component.html',
  styleUrl: './workflow-timezone-radio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowTimezoneRadioComponent implements AfterViewInit {
  @ViewChild('radioHost', { read: ViewContainerRef }) private radioHost?: ViewContainerRef;

  readonly option = input.required<WorkflowTimezoneOption>();
  readonly groupControl = input.required<FormControl<WorkflowTimezoneMode>>();

  protected get inputId(): string {
    return `workflow-timezone-${this.option().id}`;
  }

  protected readonly isSelected = computed(
    () => this.groupControl().value === this.option().id,
  );

  private readonly destroyRef = inject(DestroyRef);
  private radioRef?: ComponentRef<DsRadioButtonComponent>;

  ngAfterViewInit(): void {
    const host = this.radioHost;
    if (!host) {
      return;
    }

    const option = this.option();
    const groupControl = this.groupControl();

    const radio = host.createComponent(DsRadioButtonComponent);
    this.radioRef = radio;

    radio.setInput('name', 'workflow-timezone-mode');
    radio.setInput('value', option.id);
    radio.setInput('inputId', this.inputId);
    radio.setInput('isDecorated', false);
    radio.setInput('isLabelReverse', false);
    radio.setInput('isBottomMargin', false);
    radio.setInput('label', '');

    radio.instance.writeValue(groupControl.value);

    radio.instance.registerOnChange((value) => {
      if (value === option.id) {
        groupControl.setValue(option.id, { emitEvent: true });
      }
    });
    radio.instance.registerOnTouched(() => groupControl.markAsTouched());

    groupControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      this.radioRef?.instance.writeValue(value);
    });

    radio.changeDetectorRef.detectChanges();
  }
}
