import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidebarParentItem } from '../../interfaces/sidebar.interface';
import { GroupUnreadCountPipe } from '../../pipes/group-unread-count.pipe';

@Component({
  selector: 'ds-sidebar-menu-option',
  templateUrl: 'sidebar-menu-option.html',
  styleUrl: 'sidebar-menu-option.scss',
  imports: [GroupUnreadCountPipe, NgTemplateOutlet, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsSidebarMenuOption {
  readonly item = input.required<SidebarParentItem>();

  protected isExternal(url: string): boolean {
    return url.startsWith('http') || url.startsWith('//');
  }
}
