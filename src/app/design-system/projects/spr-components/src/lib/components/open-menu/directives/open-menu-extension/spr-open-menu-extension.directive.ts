import { ComponentRef, ContentChildren, DestroyRef, Directive, inject, QueryList, Renderer2, ViewContainerRef } from '@angular/core';
import { SprOpenMenuComponent } from '../../spr-open-menu.component';
import { SprOpenMenuItemDirective } from '../open-menu-item';

@Directive()
export abstract class SprOpenMenuExtensionDirective {
  @ContentChildren(SprOpenMenuItemDirective) protected items!: QueryList<SprOpenMenuItemDirective>;

  protected componentRef?: ComponentRef<SprOpenMenuComponent> | null = null;
  protected readonly viewRef = inject(ViewContainerRef);
  protected readonly renderer = inject(Renderer2);
  protected readonly destroyRef = inject(DestroyRef);

  public dismiss(): void {
    this.componentRef?.destroy();
    this.componentRef = null;
  }

  protected abstract setOpenMenuComponentInputParams(componentRef: ComponentRef<SprOpenMenuComponent>): void;

  protected subscribeToDropdownClose(component: SprOpenMenuComponent): void {
    component.closeDropdown.subscribe(() => this.dismiss());
  }
}
