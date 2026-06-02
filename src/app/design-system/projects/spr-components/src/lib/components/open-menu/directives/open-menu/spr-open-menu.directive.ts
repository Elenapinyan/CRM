import { ComponentRef, ContentChild, Directive, HostListener, input } from '@angular/core';
import { MenuPlacement } from '../../interfaces/open-menu.interface';
import { SprOpenMenuComponent } from '../../spr-open-menu.component';
import { SprOpenMenuExtensionDirective } from '../open-menu-extension';
import { SprOpenMenuTitleDirective } from '../open-menu-title';

@Directive({
  selector: '[sprOpenMenu]',
})
export class SprOpenMenuDirective extends SprOpenMenuExtensionDirective {
  @ContentChild(SprOpenMenuTitleDirective) title?: SprOpenMenuTitleDirective;

  placement = input<MenuPlacement[]>(['bottom-start', 'bottom-end', 'top-start', 'top-end']);
  autoClose = input<boolean | 'inside' | 'outside'>('outside');
  withSubMenu = input<boolean>(false);
  closeOnClick = input<boolean>(true);
  menuContainer = input<'body' | null>('body');

  @HostListener('click') clickListener(): void {
    if (this.componentRef) {
      this.dismiss();
      return;
    }

    this.componentRef = this.viewRef.createComponent(SprOpenMenuComponent);
    this.renderer.appendChild(this.viewRef.element.nativeElement, this.componentRef.location.nativeElement);
    this.subscribeToDropdownClose(this.componentRef.instance);
    this.setOpenMenuComponentInputParams(this.componentRef);
  }

  setOpenMenuComponentInputParams(componentRef: ComponentRef<SprOpenMenuComponent>): void {
    componentRef.setInput('closeOnClick', this.closeOnClick());
    componentRef.setInput('withSubMenu', this.withSubMenu());
    componentRef.setInput('placement', this.placement());
    componentRef.setInput('autoClose', this.autoClose());
    componentRef.setInput('menuContainer', this.menuContainer());
    componentRef.setInput('items', this.items);
    componentRef.setInput('title', this.title);
  }
}
