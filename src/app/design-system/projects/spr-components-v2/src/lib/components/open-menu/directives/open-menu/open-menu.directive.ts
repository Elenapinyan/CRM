import {
  booleanAttribute,
  ComponentRef,
  ContentChild,
  ContentChildren,
  Directive,
  HostListener,
  inject,
  input,
  QueryList,
} from '@angular/core';
import { MenuPlacement, SubMenuPlacement } from '../../interfaces/open-menu.interface';
import { DsOpenMenuComponent } from '../../open-menu.component';
import { DsOpenMenuExtensionDirective } from '../open-menu-extension';
import { DsOpenMenuTitleDirective } from '../open-menu-title';
import { DsOpenMenuFooterDirective } from '../open-menu-footer';
import { DsOpenSubMenuDirective } from '../open-sub-menu';
import { recursiveFilterItems } from '../../utils/filter.util';
import { FormControl } from '@angular/forms';
import { debounceTime, map, shareReplay } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NgClassDirectiveAllowedTypes } from '../../../../shared/interfaces/ng-class.interface';

@Directive({
  selector: '[dsOpenMenu]',
})
export class DsOpenMenuDirective extends DsOpenMenuExtensionDirective {
  @ContentChild(DsOpenMenuTitleDirective) title?: DsOpenMenuTitleDirective;
  @ContentChildren(DsOpenSubMenuDirective) subMenusComponents?: QueryList<DsOpenSubMenuDirective>;

  menuPlacement = input<MenuPlacement[] | SubMenuPlacement>(['bottom-start', 'bottom-end', 'top-start', 'top-end']);
  autoClose = input<boolean | 'inside' | 'outside'>('outside');
  withSubMenu = input<boolean>(false);
  closeOnClick = input<boolean>(true);
  menuContainer = input<'body' | null>('body');
  withSearch = input(false);
  searchPlaceholder = input('Search...');
  resetSearchOnClose = input(true);
  isEnabled = input(true, { alias: 'dsOpenMenu', transform: booleanAttribute });
  menuExtraClasses = input<NgClassDirectiveAllowedTypes>();
  menuSize = input<'md' | 'auto'>('auto');

  footer = inject(DsOpenMenuFooterDirective, { optional: true, self: true });

  searchControl = new FormControl('', { nonNullable: true });

  readonly searchValue$ = this.searchControl.valueChanges.pipe(
    debounceTime(200),
    map((v) => (v ?? '').toLowerCase().trim()),
    shareReplay({ bufferSize: 1, refCount: true }),
    takeUntilDestroyed(this.destroyRef),
  );

  searchValue = toSignal(this.searchValue$);

  override dismiss(): void {
    if (this.resetSearchOnClose()) {
      this.searchControl.setValue('');
    }
    super.dismiss();
  }

  @HostListener('click') clickListener(): void {
    if (this.componentRef || !this.isEnabled()) {
      this.dismiss();
      return;
    }

    this.componentRef = this.viewRef.createComponent(DsOpenMenuComponent);
    this.renderer.appendChild(this.viewRef.element.nativeElement, this.componentRef.location.nativeElement);
    this.subscribeToDropdownClose(this.componentRef.instance);
    // 'subscribeToScroll' - This event handler has been added in order to close all submenus when user is scrolling the main menu list.
    this.subscribeToScroll(this.componentRef.instance);
    this.setOpenMenuComponentInputParams(this.componentRef);
    this.searchValue$.subscribe((v) => {
      this.componentRef?.setInput('items', recursiveFilterItems(this.items.toArray(), v));
    });
  }

  setOpenMenuComponentInputParams(componentRef: ComponentRef<DsOpenMenuComponent>): void {
    componentRef.setInput('closeOnClick', this.closeOnClick());
    componentRef.setInput('withSubMenu', this.withSubMenu());
    componentRef.setInput('placement', this.menuPlacement());
    componentRef.setInput('autoClose', this.autoClose());
    componentRef.setInput('menuContainer', this.menuContainer());
    componentRef.setInput('items', this.items.toArray());
    componentRef.setInput('menu', this);
    componentRef.setInput('title', this.title);
    componentRef.setInput('footer', this.footer);
    componentRef.setInput('withSearch', this.withSearch());
    componentRef.setInput('searchPlaceholder', this.searchPlaceholder());
    componentRef.setInput('menuExtraClasses', this.menuExtraClasses());
    componentRef.setInput('size', this.menuSize());
  }

  private subscribeToScroll(component: DsOpenMenuComponent): void {
    component.scrollEventNotification.subscribe(() => {
      this.subMenusComponents?.forEach((subMenu) => subMenu.dismiss());
    });
  }
}
