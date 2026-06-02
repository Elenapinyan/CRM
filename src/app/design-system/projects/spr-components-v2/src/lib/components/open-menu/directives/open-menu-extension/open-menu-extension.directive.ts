import { ComponentRef, ContentChildren, DestroyRef, Directive, inject, QueryList, Renderer2, ViewContainerRef } from '@angular/core';
import { DsOpenMenuComponent } from '../../open-menu.component';
import { DsOpenMenuItemDirective } from '../open-menu-item';

@Directive()
export abstract class DsOpenMenuExtensionDirective {
  @ContentChildren(DsOpenMenuItemDirective) items!: QueryList<DsOpenMenuItemDirective>;

  componentRef?: ComponentRef<DsOpenMenuComponent> | null = null;
  protected readonly viewRef = inject(ViewContainerRef);
  protected readonly renderer = inject(Renderer2);
  protected readonly destroyRef = inject(DestroyRef);

  public dismiss(): void {
    this.componentRef?.destroy();
    this.componentRef = null;
  }

  protected abstract setOpenMenuComponentInputParams(componentRef: ComponentRef<DsOpenMenuComponent>): void;

  protected subscribeToDropdownClose(component: DsOpenMenuComponent): void {
    component.closeDropdown.subscribe(() => this.dismiss());
  }
}
