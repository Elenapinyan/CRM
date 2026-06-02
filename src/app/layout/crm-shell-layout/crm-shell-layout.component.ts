import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  IsActiveMatchOptions,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { filter, timer } from 'rxjs';

import type { CrmNavGroup, CrmNavItem, CrmNavLink, CrmNavSubLink } from './crm-nav.model';
import { crmNavPath, isNavGroup } from './crm-nav.model';

@Component({
  selector: 'app-crm-shell-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './crm-shell-layout.component.html',
  styleUrl: './crm-shell-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrmShellLayoutComponent {
  private readonly location = inject(Location);
  private readonly router = inject(Router);

  private readonly timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  /** Topbar art from `public/` — `img` + base-aware URL avoids CSS `url()` / sanitizer issues. */
  protected readonly chromeBgSrc = this.location.prepareExternalUrl('/header-background-T7B2ROJM.svg');

  /** Expanded sidebar watermark (Figma `contest-bg`). */
  protected readonly sidebarBgSrc = this.location.prepareExternalUrl('/contest-bg.svg');

  readonly sidebarCollapsed = signal(false);

  /** Analytics subsection expanded (stays open on analytics routes). */
  readonly analyticsExpanded = signal(true);

  private readonly initialClock = this.formatNow();

  readonly nowLabel = signal(this.initialClock.label);
  readonly nowIso = signal(this.initialClock.iso);

  constructor() {
    timer(0, 60_000)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        const { label, iso } = this.formatNow();
        this.nowLabel.set(label);
        this.nowIso.set(iso);
      });

    this.syncAnalyticsExpanded();

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.syncAnalyticsExpanded());
  }

  readonly navItems: CrmNavItem[] = [
    { kind: 'link', label: 'Dashboard', slug: 'dashboard', iconClass: 'ds-icon-general-layout' },
    {
      kind: 'group',
      id: 'analytics',
      label: 'Analytics',
      iconClass: 'ds-icon-general-chart',
      children: [
        { label: 'Cohort', slug: 'analytics/cohorts', activeMatch: 'subset' },
        { label: 'Lifecycle', slug: 'analytics/lifecycle' },
      ],
    },
    { kind: 'link', label: 'Segments', slug: 'segments', iconClass: 'ds-icon-general-target', activeMatch: 'subset' },
    { kind: 'link', label: 'Workflows', slug: 'workflows', iconClass: 'ds-icon-general-flowchart' },
    { kind: 'link', label: 'Communication Hub', slug: 'communication', iconClass: 'ds-icon-general-messages' },
    { kind: 'link', label: 'Player 360', slug: 'player-360', iconClass: 'ds-icon-general-user-rectangle' },
    { kind: 'link', label: 'User History', slug: 'user-history', iconClass: 'ds-icon-general-file' },
  ];

  readonly navActiveExact: IsActiveMatchOptions = {
    paths: 'exact',
    queryParams: 'ignored',
    matrixParams: 'ignored',
    fragment: 'ignored',
  };

  readonly navActiveSubset: IsActiveMatchOptions = {
    paths: 'subset',
    queryParams: 'ignored',
    matrixParams: 'ignored',
    fragment: 'ignored',
  };

  protected readonly isNavGroup = isNavGroup;
  protected readonly navPath = crmNavPath;

  toggleSidebar(): void {
    this.sidebarCollapsed.update((v) => !v);
  }

  activeOptions(link: CrmNavLink): IsActiveMatchOptions {
    return link.activeMatch === 'subset' ? this.navActiveSubset : this.navActiveExact;
  }

  childActiveOptions(child: CrmNavSubLink): IsActiveMatchOptions {
    return child.activeMatch === 'subset' ? this.navActiveSubset : this.navActiveExact;
  }

  trackNavItem(item: CrmNavItem): string {
    return isNavGroup(item) ? item.id : item.slug;
  }

  isGroupActive(group: CrmNavGroup): boolean {
    return group.children.some((child) => this.isSubLinkActive(child));
  }

  isSubLinkActive(child: CrmNavSubLink): boolean {
    const path = `/${child.slug}`;
    const url = this.router.url.split('?')[0];

    if (child.activeMatch === 'subset') {
      return url === path || url.startsWith(`${path}/`);
    }

    return url === path;
  }

  onAnalyticsGroupClick(group: CrmNavGroup): void {
    if (this.sidebarCollapsed()) {
      void this.router.navigate(crmNavPath(group.children[0]?.slug ?? 'analytics/cohorts'));
      return;
    }

    this.analyticsExpanded.update((open) => !open);
  }

  private syncAnalyticsExpanded(): void {
    if (this.router.url.startsWith('/analytics')) {
      this.analyticsExpanded.set(true);
    }
  }

  private formatNow(): { label: string; iso: string } {
    const now = new Date();
    return {
      label: this.timeFormatter.format(now),
      iso: now.toISOString(),
    };
  }
}
