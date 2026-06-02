import { ChangeDetectionStrategy, Component, Input, afterNextRender, computed, signal } from '@angular/core';
import { NgbOffcanvasOptions } from '@ng-bootstrap/ng-bootstrap';
import { type OffCanvas } from '@platform-workspace/design-system-v2';

import {
  CREATE_TEMPLATE_CHANNELS,
  CREATE_TEMPLATE_CHANNEL_META,
  type CreateTemplateChannel,
  type CreateTemplateResult,
} from './create-template.model';

@Component({
  selector: 'app-create-template-off-canvas',
  imports: [],
  templateUrl: './create-template-off-canvas.component.html',
  styleUrl: './create-template-off-canvas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTemplateOffCanvasComponent implements OffCanvas<CreateTemplateResult | undefined> {
  @Input({ required: true }) closeAction!: (action?: CreateTemplateResult) => void;

  @Input() canvasOptions?: NgbOffcanvasOptions;

  constructor() {
    afterNextRender(() => this.bindFieldListeners());
  }

  protected readonly channels = CREATE_TEMPLATE_CHANNELS;
  protected readonly channelMeta = CREATE_TEMPLATE_CHANNEL_META;

  protected readonly selectedChannel = signal<CreateTemplateChannel | null>(null);
  protected readonly name = signal('');
  protected readonly description = signal('');

  protected readonly canCreate = computed(() => this.evaluateCanCreate(this.name(), this.description()));

  /** Evaluated each change-detection cycle so the button tracks the native input value. */
  protected isCreateDisabled(): boolean {
    return !this.evaluateCanCreate(this.readNameFromDom(), this.readDescriptionFromDom());
  }

  private evaluateCanCreate(name: string, description: string): boolean {
    const channel = this.selectedChannel();
    if (!channel || name.trim().length === 0) {
      return false;
    }

    if (channel === 'sms') {
      return true;
    }

    return description.trim().length > 0;
  }

  private readNameFromDom(): string {
    const el = document.getElementById('create-template-name') as HTMLInputElement | null;
    return el?.value ?? this.name();
  }

  private readDescriptionFromDom(): string {
    const el = document.getElementById('create-template-description') as HTMLTextAreaElement | null;
    return el?.value ?? this.description();
  }

  protected selectChannel(channel: CreateTemplateChannel): void {
    this.selectedChannel.set(channel);
  }

  protected onNameInput(event: Event): void {
    this.name.set(this.readFieldValue(event));
  }

  protected onDescriptionInput(event: Event): void {
    this.description.set(this.readFieldValue(event));
  }

  private readFieldValue(event: Event): string {
    const el = event.target as HTMLInputElement | HTMLTextAreaElement;
    return el.value;
  }

  protected onCancel(): void {
    this.closeAction();
  }

  protected onCreate(): void {
    const channel = this.selectedChannel();
    this.syncFieldsFromDom();

    if (!channel || !this.canCreate()) {
      return;
    }

    this.closeAction({
      channel,
      name: this.name().trim(),
      description: this.description().trim(),
    });
  }

  /** Keeps signals aligned with the native inputs (avoids [value] fighting keystrokes). */
  private syncFieldsFromDom(): void {
    const nameEl = document.getElementById('create-template-name') as HTMLInputElement | null;
    const descriptionEl = document.getElementById('create-template-description') as HTMLTextAreaElement | null;

    if (nameEl) {
      this.name.set(nameEl.value);
    }
    if (descriptionEl) {
      this.description.set(descriptionEl.value);
    }
  }

  private bindFieldListeners(): void {
    const nameEl = document.getElementById('create-template-name') as HTMLInputElement | null;
    const descriptionEl = document.getElementById('create-template-description') as HTMLTextAreaElement | null;

    const syncName = (): void => {
      if (nameEl) {
        this.name.set(nameEl.value);
      }
    };
    const syncDescription = (): void => {
      if (descriptionEl) {
        this.description.set(descriptionEl.value);
      }
    };

    nameEl?.addEventListener('input', syncName);
    nameEl?.addEventListener('change', syncName);
    descriptionEl?.addEventListener('input', syncDescription);
    descriptionEl?.addEventListener('change', syncDescription);
  }
}
