import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  input,
  output,
  ViewChild,
} from '@angular/core';
import { NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { debounceTime, filter, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuPlacement, SubMenuPlacement } from './interfaces/open-menu.interface';
import { DsOpenMenuItemDirective } from './directives/open-menu-item';
import { DsButton } from '../button';
import { DsOpenMenuFooterDirective } from './directives/open-menu-footer';
import { DsOpenMenuTitleDirective } from './directives/open-menu-title';
import { DsOpenMenuDirective } from './directives/open-menu';
import { DsInputComponent } from '../input';
import { NgClassDirectiveAllowedTypes } from '../../shared/interfaces/ng-class.interface';

@Component({
  selector: 'ds-open-menu',
  templateUrl: 'open-menu.component.html',
  styleUrl: 'open-menu.component.scss',
  imports: [
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgbDropdownItem,
    NgbDropdown,
    NgTemplateOutlet,
    NgClass,
    DsButton,
    ReactiveFormsModule,
    DsInputComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsOpenMenuComponent implements AfterViewInit {
  @ViewChild('listItem') listItemElement?: ElementRef<HTMLUListElement>;
  @ViewChild(NgbDropdown) ngbDropdown!: NgbDropdown;

  // Common inputs
  type = input<'default' | 'sub-menu'>('default');
  items = input<DsOpenMenuItemDirective[]>();
  autoClose = input<boolean | 'inside' | 'outside'>('outside');
  placement = input<MenuPlacement[] | SubMenuPlacement>();
  menuContainer = input<'body' | null>('body');
  footer = input<DsOpenMenuFooterDirective>();
  menu = input<DsOpenMenuDirective>();
  size = input<'md' | 'auto'>('auto');

  // Default menu inputs
  closeOnClick = input<boolean>(true);
  title = input<DsOpenMenuTitleDirective>();

  // Sub menu inputs
  withSubMenu = input<boolean>(false);
  closeParentOnClick = input<boolean>(true);
  menuExtraClasses = input<NgClassDirectiveAllowedTypes>();

  // Common outputs
  closeDropdown = output();

  // Sub menu outputs
  closeParentMenuDropdown = output();
  scrollEventNotification = output();

  // Search inputs
  withSearch = input(false);
  searchPlaceholder = input('Search...');

  constructor(
    private readonly cdRef: ChangeDetectorRef,
    private readonly destroyRef: DestroyRef,
  ) {}

  ngAfterViewInit(): void {
    this.ngbDropdown.open();
    this.subscribeToDropdownClose();
    this.subscribeToScroll();
    this.cdRef.detectChanges();
  }

  onSelect(event: MouseEvent, item: DsOpenMenuItemDirective): void {
    item.clicked.emit();

    if (this.type() === 'sub-menu' && this.closeParentOnClick()) {
      this.closeParentMenuDropdown.emit();
      return;
    }

    if (item.hasSubMenu() || !this.closeOnClick()) {
      event.stopImmediatePropagation();
    } else {
      // there's listener in spr-open-menu.directive that listens to click events, thus clicking on menu item will
      // recreate menu, so wait till directive's listener is called first
      requestAnimationFrame(() => {
        this.ngbDropdown.close();
      });
    }
  }

  subMenuPlacementTypeGuard(placement: MenuPlacement[] | SubMenuPlacement): placement is SubMenuPlacement {
    return !Array.isArray(placement);
  }

  onCancelClick(): void {
    this.footer()?.canceled.emit();
  }

  onSubmitClick(): void {
    this.footer()?.submitted.emit();
  }

  private subscribeToScroll(): void {
    if (this.listItemElement?.nativeElement) {
      fromEvent(this.listItemElement.nativeElement, 'scroll')
        .pipe(debounceTime(20), takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.scrollEventNotification.emit());
    }
  }

  private subscribeToDropdownClose(): void {
    this.ngbDropdown.openChange
      .pipe(
        filter((isOpened) => !isOpened),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.closeDropdown.emit());
  }
}
