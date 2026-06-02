import { ComponentRef, DestroyRef, QueryList, Renderer2, ViewContainerRef } from '@angular/core';
import { DsOpenMenuComponent } from '../../open-menu.component';
import { DsOpenMenuItemDirective } from '../open-menu-item';
import * as i0 from "@angular/core";
export declare abstract class DsOpenMenuExtensionDirective {
    items: QueryList<DsOpenMenuItemDirective>;
    componentRef?: ComponentRef<DsOpenMenuComponent> | null;
    protected readonly viewRef: ViewContainerRef;
    protected readonly renderer: Renderer2;
    protected readonly destroyRef: DestroyRef;
    dismiss(): void;
    protected abstract setOpenMenuComponentInputParams(componentRef: ComponentRef<DsOpenMenuComponent>): void;
    protected subscribeToDropdownClose(component: DsOpenMenuComponent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsOpenMenuExtensionDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DsOpenMenuExtensionDirective, never, never, {}, {}, ["items"], never, true, never>;
}
