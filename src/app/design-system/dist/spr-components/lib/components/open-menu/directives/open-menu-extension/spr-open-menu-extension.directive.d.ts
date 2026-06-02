import { ComponentRef, DestroyRef, QueryList, Renderer2, ViewContainerRef } from '@angular/core';
import { SprOpenMenuComponent } from '../../spr-open-menu.component';
import { SprOpenMenuItemDirective } from '../open-menu-item';
import * as i0 from "@angular/core";
export declare abstract class SprOpenMenuExtensionDirective {
    protected items: QueryList<SprOpenMenuItemDirective>;
    protected componentRef?: ComponentRef<SprOpenMenuComponent> | null;
    protected readonly viewRef: ViewContainerRef;
    protected readonly renderer: Renderer2;
    protected readonly destroyRef: DestroyRef;
    dismiss(): void;
    protected abstract setOpenMenuComponentInputParams(componentRef: ComponentRef<SprOpenMenuComponent>): void;
    protected subscribeToDropdownClose(component: SprOpenMenuComponent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprOpenMenuExtensionDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SprOpenMenuExtensionDirective, never, never, {}, {}, ["items"], never, true, never>;
}
