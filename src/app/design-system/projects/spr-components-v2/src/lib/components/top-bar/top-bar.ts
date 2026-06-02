import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { DsButton } from '../button';
import { TOP_BAR_DEFAULT_OPTIONS } from './top-bar.options';

@Component({
  selector: 'ds-top-bar, [ds-top-bar], [dsTopBar]',
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.scss',
  imports: [DsButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsTopBarComponent {
  private readonly defaultOptions = inject(TOP_BAR_DEFAULT_OPTIONS);

  // titles
  title = input<string | null>(this.defaultOptions.title || null);
  subtitle = input<string | null>(this.defaultOptions.subtitle || null);

  // icon
  iconName = input<string | null>(this.defaultOptions.iconName || null);

  // btns
  declineBtn = input<string | null>(this.defaultOptions.declineBtn || null);
  confirmBtn = input<string | null>(this.defaultOptions.confirmBtn || null);

  // outputs
  decline = output<void>();
  confirm = output<void>();

  onDecline(): void {
    this.decline.emit();
  }

  onConfirm(): void {
    this.confirm.emit();
  }
}
