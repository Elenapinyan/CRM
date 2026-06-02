import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-segment-filter-custom-value-popover',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="segment-filter-custom-value-popover" (click)="$event.stopPropagation()">
      <label class="segment-filter-custom-value-popover__label" for="custom-value-input">Value</label>
      <input
        id="custom-value-input"
        [type]="inputMode() === 'text' ? 'text' : 'number'"
        [min]="inputMode() === 'number' ? 1 : null"
        class="segment-filter-custom-value-popover__input"
        [ngModel]="draft()"
        (ngModelChange)="draft.set($event)"
        (keydown.enter)="submit()"
      />
      <button type="button" class="segment-filter-custom-value-popover__apply" (click)="submit()">Apply</button>
    </div>
  `,
  styleUrl: './segment-filter-custom-value-popover.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentFilterCustomValuePopoverComponent {
  readonly value = input.required<string>();

  /** When `text`, uses a plain text input (string filters). */
  readonly inputMode = input<'number' | 'text'>('number');

  readonly confirm = output<string>();

  protected readonly draft = signal('1');

  constructor() {
    effect(() => {
      this.draft.set(this.value());
    });
  }

  protected submit(): void {
    const raw = String(this.draft()).trim();
    if (this.inputMode() === 'text') {
      this.confirm.emit(raw);
      return;
    }
    const next = raw && Number(raw) > 0 ? raw : '1';
    this.confirm.emit(next);
  }
}
