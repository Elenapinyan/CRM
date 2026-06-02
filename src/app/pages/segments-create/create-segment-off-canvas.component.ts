import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';
import { NgbOffcanvasOptions } from '@ng-bootstrap/ng-bootstrap';
import { type OffCanvas } from '@platform-workspace/design-system-v2';

import {
  CREATE_SEGMENT_TYPE_INFO,
  CREATE_SEGMENT_TYPE_LABELS,
  CREATE_SEGMENT_TYPES,
  type CreateSegmentResult,
  type CreateSegmentType,
} from './create-segment.model';

@Component({
  selector: 'app-create-segment-off-canvas',
  imports: [],
  templateUrl: './create-segment-off-canvas.component.html',
  styleUrl: './create-segment-off-canvas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateSegmentOffCanvasComponent implements OffCanvas<CreateSegmentResult | undefined> {
  @Input({ required: true }) closeAction!: (action?: CreateSegmentResult) => void;

  @Input() canvasOptions?: NgbOffcanvasOptions;

  protected readonly segmentTypes = CREATE_SEGMENT_TYPES;
  protected readonly typeLabels = CREATE_SEGMENT_TYPE_LABELS;
  protected readonly typeInfo = CREATE_SEGMENT_TYPE_INFO;

  protected readonly selectedType = signal<CreateSegmentType>('dynamic');
  protected readonly name = signal('');
  protected readonly description = signal('');

  protected readonly canCreate = computed(() => this.name().trim().length > 0);

  protected selectType(type: CreateSegmentType): void {
    this.selectedType.set(type);
  }

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
      type: this.selectedType(),
      name: this.name().trim(),
      description: this.description().trim(),
    });
  }
}
