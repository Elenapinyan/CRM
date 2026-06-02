import { NgClass } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'ds-segmented-control, [ds-segmented-control]',
  imports: [NgClass],
  templateUrl: './segmented-control.html',
  styleUrl: './segmented-control.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    '[tabindex]': 'tabindex()',
  },
})
export class DsSegmentedControl {
  readonly iconStart = input<string>();
  readonly iconEnd = input<string>();
  readonly text = input<string>();
  readonly active = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });

  protected readonly classes = computed(() => [this.disabled() && 'disabled', this.active() && 'active'].filter(Boolean).join(' '));

  protected readonly tabindex = computed(() => (this.disabled() || this.active() ? -1 : 0));
}
