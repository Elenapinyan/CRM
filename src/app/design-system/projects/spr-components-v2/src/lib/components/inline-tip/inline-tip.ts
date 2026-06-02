import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'ds-inline-tip, [ds-inline-tip]',
  templateUrl: './inline-tip.html',
  styleUrl: './inline-tip.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
  },
})
export class DsInlineTip {
  readonly type = input<'primary' | 'warning' | 'danger' | 'success'>('primary');
  readonly variant = input<'plain' | 'filled'>('filled');

  protected readonly classes = computed(() => [this.type(), this.variant()].join(' '));
}
