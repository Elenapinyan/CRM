import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input, model, output, signal, TemplateRef } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { filter, fromEvent, map, tap, throttleTime } from 'rxjs';
import { isTemplateRef } from '../../shared/utils/guards.util';
import { DsOpenMenuDirective, DsOpenMenuItemDirective } from '../open-menu';
import { DsSidebarItemComponent } from './components/sidebar-item/sidebar-item.component';
import { DsSidebarMenuOption } from './components/sidebar-menu-option/sidebar-menu-option';
import { SidebarFooterLink, SidebarNewsBlock, SidebarParentDropdownOption, SidebarParentItem } from './interfaces/sidebar.interface';
import { findParentNavItem, getFirstLinkSubItem } from './utils/traverse.util';

@Component({
  selector: 'ds-sidebar',
  standalone: true,
  imports: [
    RouterModule,
    DsSidebarItemComponent,
    NgTemplateOutlet,
    ReactiveFormsModule,
    DsOpenMenuDirective,
    DsOpenMenuItemDirective,
    DsSidebarMenuOption,
    NgbTooltipModule,
  ],
  templateUrl: 'sidebar.component.html',
  styleUrl: 'sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.menu-mode]': 'isMenuMode()',
  },
})
export class DsSidebarComponent {
  private readonly router = inject(Router);

  readonly isMenuMode = input<boolean>(false);
  readonly isMenuModeCollapsed = input<boolean>(false);

  readonly items = input<SidebarParentItem[]>([]);
  readonly newsBlock = input<SidebarNewsBlock | TemplateRef<unknown>>();
  readonly footerLinks = input<SidebarFooterLink[]>([]);
  readonly collapseBreakpoint = input<number>(0);
  readonly isMinified = model<boolean>(false);

  readonly parentChange = output<SidebarParentDropdownOption>();
  // Emmit event on press collapse on mobile view
  readonly pressMinified = output<void>();

  protected readonly selectedParentControl = new FormControl<string>('');

  protected readonly documentWidth = toSignal(
    fromEvent(window, 'resize').pipe(
      throttleTime(500, undefined, { leading: true, trailing: true }),
      map(() => window.innerWidth),
    ),
    { initialValue: window.innerWidth },
  );

  protected readonly topItems = computed(() => {
    return this.items().filter((el) => !el.isBottom);
  });

  protected readonly bottomItems = computed(() => {
    return this.items().filter((el) => el.isBottom);
  });

  protected readonly isMobileView = computed(() => {
    return this.documentWidth() <= this.collapseBreakpoint();
  });

  protected readonly isCollapsed = computed(() => {
    return this.isMinified() && !this.isMobileView();
  });

  protected readonly isNewsShown = signal(true);

  // to skip animation on the first load
  protected readonly hasToggled = signal(false);

  protected readonly isTemplateRef = isTemplateRef;

  protected readonly parentDropdownOptions = computed<SidebarParentDropdownOption[]>(() =>
    this.items().map(({ label, ...item }) => ({
      text: label,
      ...item,
    })),
  );

  readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => (event as NavigationEnd).urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  readonly selectedParentItem = toSignal(
    this.selectedParentControl.valueChanges.pipe(
      map((value) => this.getSelectedParentItem(value ?? '')),
      tap((parent) => {
        if (parent) {
          this.parentChange.emit({
            text: parent.label,
            ...parent,
          });
        }
      }),
    ),
  );

  constructor() {
    effect(() => {
      this.currentUrl();
      this.preselectParent();
    });

    effect(() => {
      if (!this.isMobileView()) {
        this.isMinified.set(localStorage.getItem('spr-sidebar-collapsed') === 'true');
      } else {
        this.isMinified.set(false);
      }
    });
  }

  protected preselectParent(): void {
    const parentValue = findParentNavItem(this.items(), this.router);

    if (parentValue && this.selectedParentControl.value !== parentValue.value) {
      this.selectedParentControl.setValue(parentValue.value);
    }
  }

  protected selectParent(parent: SidebarParentItem): void {
    if (parent.target && parent.target !== '_self') {
      return;
    }

    const value = parent.value;

    if (value === this.selectedParentControl.value || !parent) {
      return;
    }

    this.selectedParentControl.setValue(value);
    const link = getFirstLinkSubItem({ item: parent, currentUrl: this.currentUrl() });

    if (link) {
      this.router.navigateByUrl(link);
    }
  }

  protected toggleCollapse(next = !this.isCollapsed()): void {
    this.isMinified.set(next);

    if (!this.isMobileView()) {
      this.hasToggled.set(true);
      localStorage.setItem('spr-sidebar-collapsed', String(next));
    } else {
      this.pressMinified.emit();
    }
  }

  private getSelectedParentItem(value: string): SidebarParentItem | undefined {
    return this.items().find((parent) => parent.value === value);
  }
}
