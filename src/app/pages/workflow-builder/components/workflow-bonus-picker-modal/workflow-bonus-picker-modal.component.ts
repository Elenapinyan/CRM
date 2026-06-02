import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { type ModalWithData } from '@platform-workspace/design-system-v2';

import { WORKFLOW_BONUS_OPTIONS } from '../../workflow-builder.mock';
import type { WorkflowBonusOption } from '../../workflow-builder.model';

export interface WorkflowBonusPickerModalData {
  nodeId: string;
}

export interface WorkflowBonusPickerResult {
  nodeId: string;
  bonus: WorkflowBonusOption;
}

@Component({
  selector: 'app-workflow-bonus-picker-modal',
  imports: [],
  templateUrl: './workflow-bonus-picker-modal.component.html',
  styleUrl: './workflow-bonus-picker-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowBonusPickerModalComponent
  implements ModalWithData<WorkflowBonusPickerModalData, WorkflowBonusPickerResult>
{
  @Input({ required: true }) modalData!: WorkflowBonusPickerModalData;
  @Input() modalSettings?: NgbModalOptions;
  @Input() closeAction!: (action?: WorkflowBonusPickerResult) => void;

  protected readonly search = signal('');
  protected readonly options = WORKFLOW_BONUS_OPTIONS;

  protected readonly filteredOptions = computed(() => {
    const q = this.search().trim().toLowerCase();
    if (!q) {
      return this.options;
    }
    return this.options.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.type.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q),
    );
  });

  protected onSearchInput(event: Event): void {
    this.search.set((event.target as HTMLInputElement).value);
  }

  protected selectBonus(bonus: WorkflowBonusOption): void {
    this.closeAction({
      nodeId: this.modalData.nodeId,
      bonus,
    });
  }

  protected onCancel(): void {
    this.closeAction();
  }
}
