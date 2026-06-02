import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';
import { NgbOffcanvasOptions } from '@ng-bootstrap/ng-bootstrap';
import { type OffCanvas } from '@platform-workspace/design-system-v2';

import type { CreateWorkflowResult } from './create-workflow.model';

@Component({
  selector: 'app-create-workflow-off-canvas',
  imports: [],
  templateUrl: './create-workflow-off-canvas.component.html',
  styleUrl: './create-workflow-off-canvas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateWorkflowOffCanvasComponent implements OffCanvas<CreateWorkflowResult | undefined> {
  @Input({ required: true }) closeAction!: (action?: CreateWorkflowResult) => void;

  @Input() canvasOptions?: NgbOffcanvasOptions;

  protected readonly name = signal('');
  protected readonly description = signal('');

  protected readonly canCreate = computed(() => {
    return this.name().trim().length > 0 && this.description().trim().length > 0;
  });

  protected onNameInput(event: Event): void {
    this.name.set((event.target as HTMLInputElement).value);
  }

  protected onDescriptionInput(event: Event): void {
    this.description.set((event.target as HTMLTextAreaElement).value);
  }

  protected onCancel(): void {
    this.closeAction();
  }

  protected onCreate(): void {
    if (!this.canCreate()) {
      return;
    }

    this.closeAction({
      name: this.name().trim(),
      description: this.description().trim(),
    });
  }
}
