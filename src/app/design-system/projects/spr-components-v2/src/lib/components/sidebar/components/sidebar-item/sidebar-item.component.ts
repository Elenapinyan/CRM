import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, input, output, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { TooltipIfTruncatedDirective } from '../../../../shared';
import { DsOpenMenuDirective, DsOpenMenuItemDirective, DsOpenMenuTitleDirective } from '../../../open-menu';
import { SidebarNavItem } from '../../interfaces/sidebar.interface';
import { GroupUnreadCountPipe } from '../../pipes/group-unread-count.pipe';
import { IsGroupActivePipe } from '../../pipes/is-group-active.pipe';
import { getFirstLinkSubItem, isRouteActive, traverseActiveNavItem } from '../../utils/traverse.util';

@Component({
  selector: 'ds-sidebar-item',
  imports: [
    RouterLinkActive,
    RouterLink,
    NgClass,
    GroupUnreadCountPipe,
    NgbTooltip,
    IsGroupActivePipe,
    DsOpenMenuTitleDirective,
    DsOpenMenuItemDirective,
    DsOpenMenuDirective,
    TooltipIfTruncatedDirective,
  ],
  templateUrl: 'sidebar-item.component.html',
  styleUrl: 'sidebar-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsSidebarItemComponent {
  readonly item = input.required<SidebarNavItem>();
  readonly isCollapsed = input(false);
  readonly nestingLevel = input(0);
  readonly currentUrl = input.required<string>();

  readonly toggled = output();

  readonly router = inject(Router);

  readonly isOpen = signal(false);

  constructor() {
    effect(() => {
      this.currentUrl();

      if (!this.isCollapsed()) {
        this.openParentGroups();
      }
    });
  }

  protected onToggle(): void {
    const item = this.item();
    const shouldSkipCollapse = item.isDisabled || item.type !== 'group' || this.isCollapsed();
    if (shouldSkipCollapse) {
      return;
    }

    this.toggled.emit();
    this.isOpen.update((prev) => !prev);

    if (!this.isCollapsed()) {
      const link = getFirstLinkSubItem({ item, currentUrl: this.currentUrl() });
      if (link) {
        this.router.navigateByUrl(link);
      }
    }
  }

  protected isRouteActive(item: SidebarNavItem): boolean {
    if ('link' in item) {
      return isRouteActive(item.link, this.router, item.paths);
    }

    return false;
  }

  private openParentGroups(): void {
    if (this.item().type !== 'group') {
      return;
    }

    const activeItem = traverseActiveNavItem([this.item()], this.currentUrl());
    this.isOpen.set(!!activeItem);
  }
}
