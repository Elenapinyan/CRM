import { NgClass, NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  DestroyRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NavigationCancel, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { NgbNav, NgbNavContent, NgbNavItem, NgbNavLink, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';
import { DsTabContentDirective } from './directives/tab-content.directive';
import { DsTabHeaderDirective } from './directives/tab-header.directive';
import { DsTabHeaderComponent } from './components/tab-header/tab-header.component';
import { DefaultTabConfiguration, RoutingTabConfiguration, TabConfigGuard, TabsOrientation, TabType, TabVariant } from './interfaces';
import { GetTypedContextPipe, TabContentByTabKeyPipe, TabHeaderByTabKeyPipe } from './pipes';

@Component({
  selector: 'ds-tabs',
  templateUrl: 'tabs.component.html',
  styleUrls: ['tabs.component.scss'],
  imports: [
    // Components
    DsTabHeaderComponent,
    RouterOutlet,
    // Directives
    NgTemplateOutlet,
    NgbNavContent,
    NgbNavOutlet,
    NgbNavLink,
    NgbNavItem,
    NgForOf,
    NgClass,
    NgbNav,
    NgIf,
    // Pipes
    TabContentByTabKeyPipe,
    TabHeaderByTabKeyPipe,
    GetTypedContextPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsTabsComponent<Type extends TabType, Config extends TabConfigGuard<Type>> implements OnChanges, OnInit {
  @Input() orientation: TabsOrientation = 'horizontal';
  @Input() variant: TabVariant = 'tabs--level-first';
  @Input() type: Type = 'default' as Type;
  @Input() isTransparentBg = false;
  @Input() destroyOnHide = false;
  @Input() animation = true;
  @Input() isSticky = false;
  @Input() activeId?: any;
  @Input() tabsConfig: Config[] = [];

  @ContentChildren(DsTabHeaderDirective) readonly tabHeaderTemplates?: QueryList<DsTabHeaderDirective<Type, Config>>;
  @ContentChildren(DsTabContentDirective) readonly tabContentTemplates?: QueryList<DsTabContentDirective<Type, Config>>;

  @Output() private readonly setSelectedTab = new EventEmitter<any>();

  @ViewChild(NgbNav, { static: true }) private readonly ngbNav: NgbNav | undefined;

  constructor(
    private readonly router: Router,
    private readonly destroyRef: DestroyRef,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['activeId'] && this.ngbNav) {
      this.select(changes['activeId'].currentValue);
    }

    if (changes && changes['tabsConfig']?.currentValue?.length && !this.activeId && this.type === 'default') {
      // To select first item if no activeId was provided, because first tab not each time selecting automatically by nbgNav
      this.activeId = this.tabsConfig?.[0].tabKey;
    }
  }

  ngOnInit(): void {
    if (this.type === 'withRouting') {
      requestAnimationFrame(() => {
        this.setSelectedTabByUrl();
      });
    }

    this.subscribeToRouterEvents();
  }

  onSetSelectedTab(event: unknown): void {
    if (this.activeId === event) {
      return;
    }

    this.activeId = event;

    this.setSelectedTab.emit(event);
  }

  select(id: any): void {
    this.ngbNav?.select(id);
  }

  private isRoutingTabConfiguration(config: DefaultTabConfiguration | RoutingTabConfiguration): config is RoutingTabConfiguration {
    return 'routerSettings' in config;
  }

  private setSelectedTabByUrl(): void {
    this.tabsConfig.forEach((config) => {
      if (!this.isRoutingTabConfiguration(config)) {
        return;
      }

      const { routerSettings } = config;

      if (!routerSettings.routerLink || !this.ngbNav || this.activeId === config.tabKey) {
        return;
      }

      if (typeof routerSettings.routerLink === 'string' && this.router.url.includes(routerSettings.routerLink)) {
        this.ngbNav.select(config.tabKey);
      } else if (Array.isArray(routerSettings.routerLink) && this.router.url.includes(routerSettings.routerLink[0])) {
        this.ngbNav.select(config.tabKey);
      }
    });
  }

  private subscribeToRouterEvents(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd || event instanceof NavigationCancel),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.setSelectedTabByUrl());
  }
}
