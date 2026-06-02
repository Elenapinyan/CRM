import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarNavItem } from '../../interfaces/sidebar.interface';

@Component({
  selector: 'spr-sidebar-item',
  imports: [RouterLinkActive, RouterLink, NgClass],
  templateUrl: 'spr-sidebar-item.component.html',
  styleUrl: 'spr-sidebar-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SprSidebarItemComponent {
  readonly item = input.required<SidebarNavItem>();
  readonly isOpen = input<boolean>(false);

  readonly toggled = output<void>();

  protected onToggle(): void {
    if (this.item().subNavs?.length) {
      this.toggled.emit();
    }
  }
}
