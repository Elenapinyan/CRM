import { ChangeDetectionStrategy, Component, computed, inject, input, linkedSignal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { SprSidebarItemComponent } from './components/sidebar-item/spr-sidebar-item.component';
import { SidebarNavItem } from './interfaces/sidebar.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

@Component({
  selector: 'spr-sidebar',
  imports: [RouterModule, SprSidebarItemComponent],
  templateUrl: 'spr-sidebar.component.html',
  styleUrl: 'spr-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SprSidebarComponent {
  private readonly router = inject(Router);

  readonly title = input<string>();
  readonly items = input<SidebarNavItem[]>([]);

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => (event as NavigationEnd).urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  private readonly activeItemFromRoute = computed(() => {
    const url = this.currentUrl();
    const items = this.items();

    if (!url || !items.length) {
      return null;
    }

    return (
      items.find(
        (item) =>
          item.subNavs?.length && (url.includes(item.routerLink) || item.subNavs.some((subNavItem) => url.includes(subNavItem.routerLink))),
      ) || null
    );
  });

  protected readonly expandedLabel = linkedSignal({
    source: this.activeItemFromRoute,
    computation: (activeItem) => (activeItem ? activeItem.label : null),
  });

  protected toggleItem(item: SidebarNavItem): void {
    if (!item.subNavs?.length) {
      return;
    }

    this.expandedLabel.update((current) => (current === item.label ? null : item.label));
  }
}
