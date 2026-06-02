import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ModalService } from '@platform-workspace/design-system-v2';

import { WorkflowBuilderStateService } from '../../services/workflow-builder-state.service';
import type { WorkflowSettingsTabId } from '../../workflow-builder.model';
import {
  WorkflowSettingsModalComponent,
  type WorkflowSettingsModalData,
} from '../workflow-settings-modal/workflow-settings-modal.component';

@Component({
  selector: 'app-workflow-settings-widget',
  imports: [],
  templateUrl: './workflow-settings-widget.component.html',
  styleUrl: './workflow-settings-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowSettingsWidgetComponent {
  private readonly state = inject(WorkflowBuilderStateService);
  private readonly modalService = inject(ModalService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly collapsed = this.state.settingsWidgetCollapsed;

  protected toggleCollapsed(event: MouseEvent): void {
    event.stopPropagation();
    this.state.toggleSettingsWidget();
  }

  protected openSettings(tab: WorkflowSettingsTabId, event: MouseEvent): void {
    event.stopPropagation();
    this.modalService
      .open<WorkflowSettingsModalData, WorkflowSettingsModalData | undefined>(
        WorkflowSettingsModalComponent,
        {
          modalData: {
            initialTab: tab,
            settings: this.state.settings(),
            workflowName: this.state.draft()?.name ?? 'Workflow',
            workflowId: this.state.workflowInstanceId() || '—',
          },
          settings: {
            keyboard: true,
            backdrop: true,
            centered: true,
            scrollable: true,
            size: 'lg',
            windowClass: 'workflow-settings-modal ds-component',
            backdropClass: 'ds-component',
          },
        },
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result?.settings) {
          this.state.updateSettings(result.settings);
        }
      });
  }
}
