import { AfterViewInit, OnDestroy } from '@angular/core';
import { MenuCloseTrigger, MenuPosition } from './menu.util';
import * as i0 from "@angular/core";
/**
 * Our custom component which replaces ngbDropdown functionality.
 * CdkOverlay + CdkPortal are used.
 **/
export declare class MenuDirective implements AfterViewInit, OnDestroy {
    private readonly destroyRef;
    private readonly elementRef;
    private readonly templateRef;
    private readonly viewContainerRef;
    private readonly overlay;
    private readonly destroy$;
    private readonly portal;
    private readonly selectedPositions;
    private readonly resizeObserver;
    private positionStrategy;
    private overlayRef;
    readonly isOpened: import("@angular/core").WritableSignal<boolean>;
    /**
     * This property lets you set custom element as a host.
     * It means this menu will be connected to this element.
     * If not specified, the parent element will be used.
     **/
    host: import("@angular/core").InputSignal<HTMLElement | undefined>;
    /**
     * Custom placement of the menu.
     * @Default 'bottom'
     **/
    position: import("@angular/core").InputSignal<MenuPosition>;
    /**
     * Toggles backdrop
     * @Default false
     **/
    backdrop: import("@angular/core").InputSignal<boolean>;
    /**
     * You can specify whether the menu should be closed on a trigger.
     * @Default 'outside'
     **/
    closeTrigger: import("@angular/core").InputSignal<MenuCloseTrigger>;
    readonly menuToggleChange: import("@angular/core").OutputEmitterRef<boolean>;
    constructor();
    private get element();
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    open(): void;
    close(): void;
    private init;
    private getOverlayConfig;
    private getPositionStrategy;
    private getPortal;
    private addCloseTriggerHandler;
    private addBackdropHandler;
    private addOutsideClickHandler;
    private getResizeObserver;
    private observeParentElement;
    static ɵfac: i0.ɵɵFactoryDeclaration<MenuDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MenuDirective, "[sprMenu]", ["sprMenu"], { "host": { "alias": "host"; "required": false; "isSignal": true; }; "position": { "alias": "position"; "required": false; "isSignal": true; }; "backdrop": { "alias": "backdrop"; "required": false; "isSignal": true; }; "closeTrigger": { "alias": "closeTrigger"; "required": false; "isSignal": true; }; }, { "menuToggleChange": "menuToggleChange"; }, never, never, true, never>;
}
