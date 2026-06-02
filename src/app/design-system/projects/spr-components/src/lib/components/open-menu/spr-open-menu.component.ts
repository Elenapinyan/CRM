import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  input,
  output,
  QueryList,
  ViewChild,
} from '@angular/core';
import { NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MenuPlacement, SubMenuPlacement } from './interfaces/open-menu.interface';
import { SprOpenMenuTitleDirective } from './directives/open-menu-title';
import { SprOpenMenuItemDirective } from './directives/open-menu-item';

@Component({
  selector: 'spr-open-menu',
  templateUrl: 'spr-open-menu.component.html',
  styleUrl: 'spr-open-menu.component.scss',
  imports: [NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem, NgbDropdown, NgTemplateOutlet, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SprOpenMenuComponent implements AfterViewInit {
  @ViewChild(NgbDropdown) ngbDropdown!: NgbDropdown;

  // Common inputs
  type = input<'default' | 'sub-menu'>('default');
  items = input<QueryList<SprOpenMenuItemDirective>>();
  autoClose = input<boolean | 'inside' | 'outside'>('outside');
  placement = input<MenuPlacement[] | SubMenuPlacement>();
  menuContainer = input<'body' | null>('body');

  // Default menu inputs
  closeOnClick = input<boolean>(true);
  title = input<SprOpenMenuTitleDirective>();

  // Sub menu inputs
  withSubMenu = input<boolean>(false);
  closeParentOnClick = input<boolean>(true);

  // Common outputs
  closeDropdown = output();

  // Sub menu outputs
  closeParentMenuDropdown = output();

  constructor(
    private readonly cdRef: ChangeDetectorRef,
    private readonly destroyRef: DestroyRef,
  ) {}

  ngAfterViewInit(): void {
    this.ngbDropdown.open();
    this.subscribeToDropdownClose();
    this.cdRef.detectChanges();
  }

  onSelect(event: MouseEvent, hasSubMenu: boolean): void {
    if (this.type() === 'sub-menu' && this.closeParentOnClick()) {
      this.closeParentMenuDropdown.emit();
      return;
    }

    if (hasSubMenu || !this.closeOnClick()) {
      event.stopImmediatePropagation();
    } else {
      this.ngbDropdown.close();
    }
  }

  subMenuPlacementTypeGuard(placement: MenuPlacement[] | SubMenuPlacement): placement is SubMenuPlacement {
    return !Array.isArray(placement);
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
