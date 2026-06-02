import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  computed,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DsButton, date2NgbDate, datetime2DMYString, type ModalWithData } from '@platform-workspace/design-system-v2';

import { WorkflowDatetimePickerComponent } from '../workflow-datetime-picker/workflow-datetime-picker.component';
import { WorkflowInlineTipComponent } from '../workflow-inline-tip/workflow-inline-tip.component';
import { WorkflowRecurrenceDropdownComponent } from '../workflow-recurrence-dropdown/workflow-recurrence-dropdown.component';
import { WorkflowStartsImmediatelyCheckboxComponent } from '../workflow-starts-immediately-checkbox/workflow-starts-immediately-checkbox.component';
import { WorkflowTimezoneRadioComponent } from '../workflow-timezone-radio/workflow-timezone-radio.component';

import {
  WORKFLOW_RECURRENCE_OPTIONS,
  WORKFLOW_TIMEZONE_OPTIONS,
} from '../../data/workflow-settings.constants';
import {
  DEFAULT_WORKFLOW_SETTINGS,
  WORKFLOW_SETTINGS_TABS,
  type WorkflowRecurrence,
  type WorkflowSettings,
  type WorkflowSettingsTabId,
  type WorkflowTimezoneMode,
} from '../../workflow-builder.model';

const TIMEZONE_MODE_CONTROL_DEFAULT = 'current' satisfies WorkflowTimezoneMode;

export interface WorkflowSettingsModalData {
  initialTab: WorkflowSettingsTabId;
  settings: WorkflowSettings;
  workflowName: string;
  workflowId: string;
}

@Component({
  selector: 'app-workflow-settings-modal',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    WorkflowDatetimePickerComponent,
    WorkflowInlineTipComponent,
    WorkflowRecurrenceDropdownComponent,
    WorkflowTimezoneRadioComponent,
    WorkflowStartsImmediatelyCheckboxComponent,
    DsButton,
  ],
  templateUrl: './workflow-settings-modal.component.html',
  styleUrl: './workflow-settings-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowSettingsModalComponent
  implements ModalWithData<WorkflowSettingsModalData, WorkflowSettingsModalData>, OnInit
{
  private readonly destroyRef = inject(DestroyRef);

  @Input({ required: true }) modalData!: WorkflowSettingsModalData;
  @Input() modalSettings?: NgbModalOptions;
  @Input() closeAction!: (action?: WorkflowSettingsModalData) => void;

  protected readonly tabs = WORKFLOW_SETTINGS_TABS;
  protected readonly timezoneOptions = WORKFLOW_TIMEZONE_OPTIONS;
  protected readonly recurrenceOptions = [...WORKFLOW_RECURRENCE_OPTIONS];
  protected readonly activeTab = signal<WorkflowSettingsTabId>('scheduler');
  protected readonly draft = signal<WorkflowSettings>(DEFAULT_WORKFLOW_SETTINGS);

  protected readonly startDateTimeControl = new FormControl<Date | null>(null);
  protected readonly endDateTimeControl = new FormControl<Date | null>(null);
  protected readonly recurrenceControl = new FormControl<WorkflowRecurrence>('once', {
    nonNullable: true,
  });
  protected readonly startsImmediatelyControl = new FormControl(false, { nonNullable: true });
  protected readonly timezoneModeControl = new FormControl<WorkflowTimezoneMode>(
    TIMEZONE_MODE_CONTROL_DEFAULT,
    { nonNullable: true },
  );

  protected readonly schedulerInfoText = computed(() => {
    const { recurrence, startDateTime, timezoneMode } = this.draft().scheduler;
    const recurrenceLabel =
      WORKFLOW_RECURRENCE_OPTIONS.find((o) => o.value === recurrence)?.text ?? 'One time';

    if (recurrence === 'once' && startDateTime) {
      const { date, time } = date2NgbDate(startDateTime);
      const formatted = datetime2DMYString(date, time);
      const tz =
        timezoneMode === 'current'
          ? 'GMT +2'
          : timezoneMode === 'player'
            ? "the player's time zone"
            : 'the optimal engagement window';
      return `How it works: Once turned on, this workflow will execute exactly once on ${formatted} (${tz})`;
    }

    return `How it works: This workflow is set to run ${recurrenceLabel.toLowerCase()} based on your scheduler settings.`;
  });

  ngOnInit(): void {
    this.activeTab.set(this.modalData.initialTab);
    const settings = structuredClone(this.modalData.settings);
    this.draft.set(settings);

    this.startDateTimeControl.setValue(settings.scheduler.startDateTime);
    this.endDateTimeControl.setValue(settings.scheduler.endDateTime);
    this.recurrenceControl.setValue(settings.scheduler.recurrence);
    this.startsImmediatelyControl.setValue(settings.scheduler.startsImmediately);
    this.timezoneModeControl.setValue(settings.scheduler.timezoneMode);

    this.timezoneModeControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.patchScheduler({ timezoneMode: value }));

  }

  protected selectTab(tab: WorkflowSettingsTabId): void {
    this.activeTab.set(tab);
  }

  protected onStartDateTimeChange(value: Date | null): void {
    this.patchScheduler({ startDateTime: value });
  }

  protected onEndDateTimeChange(value: Date | null): void {
    this.patchScheduler({ endDateTime: value });
  }

  protected onRecurrenceChange(value: WorkflowRecurrence): void {
    this.patchScheduler({ recurrence: value });
  }

  protected onStartsImmediatelyChange(value: boolean): void {
    this.patchScheduler({ startsImmediately: value });
  }

  protected onFrequencyPattern(value: WorkflowRecurrence): void {
    this.draft.update((s) => ({
      ...s,
      frequency: { ...s.frequency, pattern: value },
    }));
  }

  protected onGoalField(field: keyof WorkflowSettings['goal'], value: string | number): void {
    this.draft.update((s) => ({
      ...s,
      goal: { ...s.goal, [field]: value },
    }));
  }

  protected onLimitsField(field: keyof WorkflowSettings['limits'], value: number): void {
    this.draft.update((s) => ({
      ...s,
      limits: { ...s.limits, [field]: value },
    }));
  }

  protected onCancel(): void {
    this.closeAction();
  }

  protected onSave(): void {
    const settings = this.draft();
    this.closeAction({
      initialTab: this.activeTab(),
      settings: {
        ...settings,
        frequency: { ...settings.frequency, pattern: settings.scheduler.recurrence },
      },
      workflowName: this.modalData.workflowName,
      workflowId: this.modalData.workflowId,
    });
  }

  private patchScheduler(patch: Partial<WorkflowSettings['scheduler']>): void {
    this.draft.update((s) => ({
      ...s,
      scheduler: { ...s.scheduler, ...patch },
    }));
  }
}
