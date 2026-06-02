import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

/**
 * Chip-styled inline editor for numeric filter values (amount, count, interval).
 * Visually matches `.segments-filter-preview__chip` in the preview row.
 */
@Component({
  selector: 'app-segment-filter-inline-value-chip',
  standalone: true,
  templateUrl: './segment-filter-inline-value-chip.component.html',
  styleUrl: './segment-filter-inline-value-chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentFilterInlineValueChipComponent {
  readonly value = input.required<string>();

  readonly active = input(false);

  readonly activate = output<MouseEvent>();

  readonly confirm = output<string>();

  readonly cancel = output<void>();

  protected readonly draft = signal('');

  private escaping = false;

  private readonly inputRef = viewChild<ElementRef<HTMLInputElement>>('input');

  constructor() {
    effect(() => {
      if (!this.active()) {
        return;
      }
      this.draft.set(this.value());
      queueMicrotask(() => {
        const el = this.inputRef()?.nativeElement;
        if (!el) {
          return;
        }
        el.focus();
        el.select();
      });
    });
  }

  protected displayValue(): string {
    const v = this.value().trim();
    return v && v !== '…' ? v : '0';
  }

  protected inputSize(): number {
    return Math.max(this.draft().length || this.displayValue().length, 2);
  }

  protected startEdit(event: MouseEvent): void {
    event.stopPropagation();
    this.draft.set(this.displayValue());
    this.activate.emit(event);
  }

  protected onInput(event: Event): void {
    const raw = (event.target as HTMLInputElement).value;
    this.draft.set(sanitizeNumericInput(raw));
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.commit();
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      this.escaping = true;
      this.cancel.emit();
    }
  }

  protected commit(): void {
    if (!this.active() || this.escaping) {
      this.escaping = false;
      return;
    }
    const raw = this.draft().trim();
    this.confirm.emit(raw || '0');
  }
}

function sanitizeNumericInput(raw: string): string {
  let next = raw.replace(/[^\d.,-]/g, '');
  const firstMinus = next.indexOf('-');
  if (firstMinus > 0) {
    next = next.replace(/-/g, '');
  } else if (firstMinus === 0) {
    next = `-${next.slice(1).replace(/-/g, '')}`;
  }
  const dot = next.indexOf('.');
  if (dot !== -1) {
    const before = next.slice(0, dot + 1);
    const after = next.slice(dot + 1).replace(/\./g, '').replace(/,/g, '');
    next = before + after;
  } else {
    next = next.replace(/,/g, '');
  }
  return next;
}
