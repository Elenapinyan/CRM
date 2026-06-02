import * as i1$2 from '@angular/common';
import { NgClass, NgSwitch, NgSwitchCase, NgIf, CommonModule, NgTemplateOutlet, NgForOf, NgFor, AsyncPipe } from '@angular/common';
import * as i0 from '@angular/core';
import { Input, ViewEncapsulation, ChangeDetectionStrategy, Component, Pipe, Directive, InjectionToken, inject, input, DestroyRef, ChangeDetectorRef, HostBinding, ViewContainerRef, TemplateRef, Renderer2, NgModuleRef, ElementRef, Injectable, output, Inject, Optional, EventEmitter, RendererFactory2, Output, ViewChild, forwardRef, ContentChildren, HostListener, ContentChild, signal, Host } from '@angular/core';
import * as i1$1 from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionModule, NgbAlert, NgbTooltip, NgbDatepickerI18n, NgbDate, NgbDatepickerModule, NgbTimepickerModule, NgbTooltipModule, NgbDropdownModule, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem, NgbDropdown, NgbPagination, NgbPaginationNext, NgbPaginationPrevious, NgbPaginationFirst, NgbPaginationLast, NgbPaginationPages, NgbInputDatepicker, NgbNavContent, NgbNavOutlet, NgbNavLink, NgbNavItem, NgbNav, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import * as i1 from '@angular/forms';
import { NgControl, FormBuilder, ReactiveFormsModule, Validators, FormsModule, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { v7 } from 'uuid';
import { filter, map, debounceTime, fromEvent, tap, switchMap, take, takeUntil, distinctUntilChanged, Subject, BehaviorSubject } from 'rxjs';
import * as i4 from '@angular/cdk/scrolling';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ClipboardModule } from '@angular/cdk/clipboard';
import Big from 'big.js';
import { isValid, getYear, getMonth, getDate, sub, startOfYear, endOfYear, startOfWeek, startOfMonth, startOfDay, endOfDay, endOfMonth, endOfWeek } from 'date-fns';
import * as i1$3 from '@angular/router';
import { RouterLinkActive, RouterLink, RouterModule, NavigationEnd, NavigationCancel, RouterOutlet } from '@angular/router';
import * as i1$4 from '@angular/platform-browser';

var AccordionType;
(function (AccordionType) {
    AccordionType["Default"] = "default";
    AccordionType["Nested"] = "nested";
    AccordionType["Flexible"] = "flexible";
    AccordionType["Custom"] = "custom";
})(AccordionType || (AccordionType = {}));

class SprAccordionComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprAccordionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: SprAccordionComponent, isStandalone: true, selector: "spr-accordion", inputs: { accordionType: "accordionType" }, ngImport: i0, template: "<div\n  class=\"wrapper\"\n  [ngClass]=\"accordionType\">\n  <ng-content></ng-content>\n</div>\n", styles: [":host{display:block}.wrapper .accordion{--brd-accordion-border-color: var(--brd-custom-accordion-border-color, var(--brd-border-divider-300));--brd-accordion-border-radius: var(--brd-custom-accordion-border-radius, var(--spr-border-radius-l));margin:0;padding:0;list-style-type:none}.wrapper .accordion-item{overflow:hidden}.wrapper .accordion-header{display:grid}.wrapper .accordion-body{padding:var(--brd-default-accordion-body-padding-top, 20px) var(--brd-default-accordion-body-padding-right, 20px) var(--brd-default-accordion-body-padding-bottom, 20px) var(--brd-default-accordion-body-padding-left, 20px);background-color:rgb(var(--spr-grey-30))}.wrapper .toggle-button{padding:var(--brd-toogle-button-custom-padding, 12px);border:none;border-radius:var(--spr-border-radius-pill);background-color:transparent;outline:none;color:var(--brd-toogle-button-custom-color, var(--brd-icon-default-800));transition:background var(--spr-transition-time) ease,opacity var(--spr-transition-time) ease}.wrapper .toggle-button:hover{background-color:rgb(var(--brd-white));opacity:.4}.wrapper .toggle-button:not(.collapsed) .caret-icon{transform:rotate(-180deg)}.wrapper .toggle-button .caret-icon{display:flex;align-items:center;justify-content:center;width:var(--brd-toogle-button-custom-icon-size, 24px);height:var(--brd-toogle-button-custom-icon-size, 24px);font-size:var(--brd-toogle-button-custom-font-size, var(--spr-font-size-20));transition:transform var(--spr-transition-time) ease}.wrapper .toggle-button:disabled{visibility:hidden;pointer-events:none}.wrapper.default .accordion-item{border:1px solid var(--brd-accordion-border-color)}.wrapper.default .accordion-item:first-of-type{border-top-left-radius:var(--brd-accordion-border-radius);border-top-right-radius:var(--brd-accordion-border-radius)}.wrapper.default .accordion-item:not(:first-of-type){border-top:0}.wrapper.default .accordion-item:last-of-type{border-bottom-right-radius:var(--brd-accordion-border-radius);border-bottom-left-radius:var(--brd-accordion-border-radius)}.wrapper.default .accordion-item:last-of-type>.accordion-collapse{border-bottom-right-radius:var(--brd-accordion-border-radius);border-bottom-left-radius:var(--brd-accordion-border-radius)}.wrapper.default .accordion-header{grid-template-columns:var(--brd-default-accordion-header-grid-template-columns, 1fr 48px);grid-gap:var(--brd-default-accordion-header-grid-gap, 0 18px);background:var(--brd-default-accordion-header-background, rgb(var(--spr-grey-30)));padding:var(--brd-default-accordion-header-padding-block, 8px) var(--brd-default-accordion-header-padding-inline, 20px);color:var(--brd-default-accordion-header-color, rgb(var(--spr-grey-850)));place-items:var(--brd-default-accordion-header-place-items, center flex-start)}.wrapper.default .accordion-body{border-top:1px solid var(--brd-accordion-border-color)}.wrapper.nested .accordion{position:relative}.wrapper.nested .accordion:after{position:absolute;content:\"\";top:55px;left:0;bottom:28px;width:16px;border-radius:var(--spr-border-radius-xs) 0 0 var(--spr-border-radius-xs);border-style:solid;border-width:1px;border-color:var(--brd-accordion-border-color);border-right:none;display:none}.wrapper.nested .accordion:has(.show .accordion):after{display:block}.wrapper.nested .accordion:has(.show) .accordion:before{display:block}.wrapper.nested .accordion:before{position:absolute;content:\"\";left:-40px;top:24px;width:16px;height:4px;display:none;border-radius:0 0 0 var(--spr-border-radius-xs);border-style:solid;border-width:1px;border-color:var(--brd-accordion-border-color);border-right:none;border-top:none}.wrapper.nested .accordion-header{position:relative;grid-template-columns:var(--brd-nested-accordion-header-grid-template-columns, 1fr 20px 40px 40px);grid-gap:var(--brd-nested-accordion-header-grid-gap, 28px);place-items:var(--brd-nested-accordion-header-place-items, center flex-start);min-height:var(--brd-nested-accordion-header-min-height, 56px);padding:var(--brd-nested-accordion-header-padding-top, 4px) var(--brd-nested-accordion-header-padding-right, 2px) var(--brd-nested-accordion-header-padding-bottom, 4px) var(--brd-nested-accordion-header-padding-left, 16px);background:var(--brd-nested-accordion-header-background, transparent);color:var(--brd-nested-accordion-header-color, rgb(var(--spr-grey-850)))}.wrapper.nested .accordion-header.collapsed:after{border-radius:0;border-width:1px 0 0}.wrapper.nested .accordion-header:after{content:\"\";position:absolute;right:0;bottom:-3px;left:0;height:4px;border-radius:var(--spr-border-radius-xs) 0 0;border-style:solid;border-width:1px 0 0 1px;border-color:var(--brd-accordion-border-color)}.wrapper.nested .accordion-body{--brd-default-accordion-body-padding-top: 0;--brd-default-accordion-body-padding-right: 0;--brd-default-accordion-body-padding-bottom: 0;--brd-default-accordion-body-padding-left: 40px;background-color:transparent}.wrapper.flexible .accordion-header{background:var(--brd-default-accordion-header-background, rgb(var(--spr-grey-30)));padding:var(--brd-default-accordion-header-padding-block, 16px) var(--brd-default-accordion-header-padding-inline, 20px);color:var(--brd-default-accordion-header-color, rgb(var(--spr-grey-850)))}.wrapper.flexible .accordion-body{border-top:var(--brd-default-accordion-body-border-top, 1px solid rgb(var(--spr-grey-150)))}\n"], dependencies: [{ kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "ngmodule", type: NgbAccordionModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprAccordionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-accordion', imports: [NgClass, NgbAccordionModule], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div\n  class=\"wrapper\"\n  [ngClass]=\"accordionType\">\n  <ng-content></ng-content>\n</div>\n", styles: [":host{display:block}.wrapper .accordion{--brd-accordion-border-color: var(--brd-custom-accordion-border-color, var(--brd-border-divider-300));--brd-accordion-border-radius: var(--brd-custom-accordion-border-radius, var(--spr-border-radius-l));margin:0;padding:0;list-style-type:none}.wrapper .accordion-item{overflow:hidden}.wrapper .accordion-header{display:grid}.wrapper .accordion-body{padding:var(--brd-default-accordion-body-padding-top, 20px) var(--brd-default-accordion-body-padding-right, 20px) var(--brd-default-accordion-body-padding-bottom, 20px) var(--brd-default-accordion-body-padding-left, 20px);background-color:rgb(var(--spr-grey-30))}.wrapper .toggle-button{padding:var(--brd-toogle-button-custom-padding, 12px);border:none;border-radius:var(--spr-border-radius-pill);background-color:transparent;outline:none;color:var(--brd-toogle-button-custom-color, var(--brd-icon-default-800));transition:background var(--spr-transition-time) ease,opacity var(--spr-transition-time) ease}.wrapper .toggle-button:hover{background-color:rgb(var(--brd-white));opacity:.4}.wrapper .toggle-button:not(.collapsed) .caret-icon{transform:rotate(-180deg)}.wrapper .toggle-button .caret-icon{display:flex;align-items:center;justify-content:center;width:var(--brd-toogle-button-custom-icon-size, 24px);height:var(--brd-toogle-button-custom-icon-size, 24px);font-size:var(--brd-toogle-button-custom-font-size, var(--spr-font-size-20));transition:transform var(--spr-transition-time) ease}.wrapper .toggle-button:disabled{visibility:hidden;pointer-events:none}.wrapper.default .accordion-item{border:1px solid var(--brd-accordion-border-color)}.wrapper.default .accordion-item:first-of-type{border-top-left-radius:var(--brd-accordion-border-radius);border-top-right-radius:var(--brd-accordion-border-radius)}.wrapper.default .accordion-item:not(:first-of-type){border-top:0}.wrapper.default .accordion-item:last-of-type{border-bottom-right-radius:var(--brd-accordion-border-radius);border-bottom-left-radius:var(--brd-accordion-border-radius)}.wrapper.default .accordion-item:last-of-type>.accordion-collapse{border-bottom-right-radius:var(--brd-accordion-border-radius);border-bottom-left-radius:var(--brd-accordion-border-radius)}.wrapper.default .accordion-header{grid-template-columns:var(--brd-default-accordion-header-grid-template-columns, 1fr 48px);grid-gap:var(--brd-default-accordion-header-grid-gap, 0 18px);background:var(--brd-default-accordion-header-background, rgb(var(--spr-grey-30)));padding:var(--brd-default-accordion-header-padding-block, 8px) var(--brd-default-accordion-header-padding-inline, 20px);color:var(--brd-default-accordion-header-color, rgb(var(--spr-grey-850)));place-items:var(--brd-default-accordion-header-place-items, center flex-start)}.wrapper.default .accordion-body{border-top:1px solid var(--brd-accordion-border-color)}.wrapper.nested .accordion{position:relative}.wrapper.nested .accordion:after{position:absolute;content:\"\";top:55px;left:0;bottom:28px;width:16px;border-radius:var(--spr-border-radius-xs) 0 0 var(--spr-border-radius-xs);border-style:solid;border-width:1px;border-color:var(--brd-accordion-border-color);border-right:none;display:none}.wrapper.nested .accordion:has(.show .accordion):after{display:block}.wrapper.nested .accordion:has(.show) .accordion:before{display:block}.wrapper.nested .accordion:before{position:absolute;content:\"\";left:-40px;top:24px;width:16px;height:4px;display:none;border-radius:0 0 0 var(--spr-border-radius-xs);border-style:solid;border-width:1px;border-color:var(--brd-accordion-border-color);border-right:none;border-top:none}.wrapper.nested .accordion-header{position:relative;grid-template-columns:var(--brd-nested-accordion-header-grid-template-columns, 1fr 20px 40px 40px);grid-gap:var(--brd-nested-accordion-header-grid-gap, 28px);place-items:var(--brd-nested-accordion-header-place-items, center flex-start);min-height:var(--brd-nested-accordion-header-min-height, 56px);padding:var(--brd-nested-accordion-header-padding-top, 4px) var(--brd-nested-accordion-header-padding-right, 2px) var(--brd-nested-accordion-header-padding-bottom, 4px) var(--brd-nested-accordion-header-padding-left, 16px);background:var(--brd-nested-accordion-header-background, transparent);color:var(--brd-nested-accordion-header-color, rgb(var(--spr-grey-850)))}.wrapper.nested .accordion-header.collapsed:after{border-radius:0;border-width:1px 0 0}.wrapper.nested .accordion-header:after{content:\"\";position:absolute;right:0;bottom:-3px;left:0;height:4px;border-radius:var(--spr-border-radius-xs) 0 0;border-style:solid;border-width:1px 0 0 1px;border-color:var(--brd-accordion-border-color)}.wrapper.nested .accordion-body{--brd-default-accordion-body-padding-top: 0;--brd-default-accordion-body-padding-right: 0;--brd-default-accordion-body-padding-bottom: 0;--brd-default-accordion-body-padding-left: 40px;background-color:transparent}.wrapper.flexible .accordion-header{background:var(--brd-default-accordion-header-background, rgb(var(--spr-grey-30)));padding:var(--brd-default-accordion-header-padding-block, 16px) var(--brd-default-accordion-header-padding-inline, 20px);color:var(--brd-default-accordion-header-color, rgb(var(--spr-grey-850)))}.wrapper.flexible .accordion-body{border-top:var(--brd-default-accordion-body-border-top, 1px solid rgb(var(--spr-grey-150)))}\n"] }]
        }], propDecorators: { accordionType: [{
                type: Input,
                args: [{ required: true }]
            }] } });

class SprAlertComponent {
    constructor() {
        this.type = 'info';
        this.dismissible = true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprAlertComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: SprAlertComponent, isStandalone: true, selector: "spr-alert", inputs: { type: "type", message: "message", dismissible: "dismissible", icon: "icon" }, ngImport: i0, template: "<ng-container [ngSwitch]=\"type\">\n  <ngb-alert\n    *ngSwitchCase=\"'info'\"\n    type=\"info\"\n    [dismissible]=\"dismissible\">\n    <i\n      class=\"bo-icon\"\n      [ngClass]=\"icon ? icon : 'bo-icon-general-info'\"></i>\n    <span [innerHTML]=\"message\"></span>\n  </ngb-alert>\n  <ngb-alert\n    *ngSwitchCase=\"'danger'\"\n    type=\"danger\"\n    [dismissible]=\"dismissible\">\n    <i\n      class=\"bo-icon\"\n      [ngClass]=\"icon ? icon : 'bo-icon-general-blocked'\"></i>\n    <span [innerHTML]=\"message\"></span>\n  </ngb-alert>\n  <ngb-alert\n    *ngSwitchCase=\"'warning'\"\n    type=\"warning\"\n    [dismissible]=\"dismissible\">\n    <i\n      class=\"bo-icon\"\n      [ngClass]=\"icon ? icon : 'bo-icon-general-warning'\"></i>\n    <span [innerHTML]=\"message\"></span>\n  </ngb-alert>\n  <ngb-alert\n    *ngSwitchCase=\"'success'\"\n    type=\"success\"\n    [dismissible]=\"dismissible\">\n    <i\n      class=\"bo-icon\"\n      [ngClass]=\"icon ? icon : 'bo-icon-control-check-circle'\"></i>\n    <span [innerHTML]=\"message\"></span>\n  </ngb-alert>\n</ng-container>\n", styles: [".text-body-xxxl{font-size:var(--spr-font-size-32);line-height:var(--spr-line-height-40)}.text-body-xxl{font-size:var(--spr-font-size-24);line-height:var(--spr-line-height-32)}.text-body-xl{font-size:var(--spr-font-size-20);line-height:var(--spr-line-height-24)}.text-body-l{font-size:var(--spr-font-size-16);line-height:var(--spr-line-height-20)}.text-body-m{font-size:var(--spr-font-size-15);line-height:var(--spr-line-height-20)}.text-body-s{font-size:var(--spr-font-size-14);line-height:var(--spr-line-height-20)}.text-body-xs{font-size:var(--spr-font-size-12);line-height:var(--spr-line-height-16)}.text-body-xs-uppercase{font-size:var(--spr-font-size-13);line-height:var(--spr-line-height-20);text-transform:uppercase}:host{display:flex;flex-direction:column;gap:16px}:host ::ng-deep .alert-dismissible{--brd-btn-close-bg: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414'/%3e%3c/svg%3e\")}:host ::ng-deep .alert-dismissible .btn-close{position:absolute;top:0;right:0;z-index:2;width:38px;height:46px;padding:16px 12px;background:transparent var(--brd-btn-close-bg) center/14px auto no-repeat;color:rgb(var(--brd-black));opacity:.5}:host ::ng-deep .alert-dismissible .btn-close:hover{opacity:.75}:host ::ng-deep .alert-dismissible .btn-close:focus{opacity:1}:host ::ng-deep .alert-dismissible .btn-close:disabled,:host ::ng-deep .alert-dismissible .btn-close.disabled{pointer-events:none;-webkit-user-select:none;user-select:none;opacity:.25}:host .alert{--brd-alert-bg: transparent;--brd-alert-color: inherit;--brd-info-bg-subtle: var(--brd-fill-info-0);--brd-info-text-emphasis: var(--brd-text-primary-800);--brd-info-border-subtle: var(--brd-border-info-250);--brd-danger-bg-subtle: var(--brd-fill-destructive-100);--brd-danger-text-emphasis: var(--brd-text-destructive-900);--brd-danger-border-subtle: transparent;--brd-warning-bg-subtle: rgb(var(--brd-orange-100));--brd-warning-text-emphasis: rgb(var(--brd-orange-900));--brd-warning-border-subtle: transparent;--brd-success-bg-subtle: rgb(var(--brd-green-100));--brd-success-text-emphasis: rgb(var(--brd-green-900));--brd-success-border-subtle: transparent;font-size:var(--spr-font-size-14);line-height:var(--spr-line-height-20);position:relative;display:flex;align-items:start;gap:10px;padding:13px 12px;border:1px solid var(--brd-alert-border-color);border-radius:var(--spr-border-radius-m);background-color:var(--brd-alert-bg);color:var(--brd-alert-color)}:host .alert .icon,:host .alert .bo-icon{margin-top:2px;font-size:var(--spr-font-size-16)}:host .alert-info{--brd-alert-color: var(--brd-info-text-emphasis);--brd-alert-bg: var(--brd-info-bg-subtle);--brd-alert-border-color: var(--brd-info-border-subtle)}:host .alert-success{--brd-alert-color: var(--brd-success-text-emphasis);--brd-alert-bg: var(--brd-success-bg-subtle);--brd-alert-border-color: var(--brd-success-border-subtle)}:host .alert-warning{--brd-alert-color: var(--brd-warning-text-emphasis);--brd-alert-bg: var(--brd-warning-bg-subtle);--brd-alert-border-color: var(--brd-warning-border-subtle)}:host .alert-danger{--brd-alert-color: var(--brd-danger-text-emphasis);--brd-alert-bg: var(--brd-danger-bg-subtle);--brd-alert-border-color: var(--brd-danger-border-subtle)}:host .alert-dismissible{padding-right:42px}\n"], dependencies: [{ kind: "directive", type: NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "component", type: NgbAlert, selector: "ngb-alert", inputs: ["animation", "dismissible", "type"], outputs: ["closed"], exportAs: ["ngbAlert"] }, { kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprAlertComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-alert', imports: [NgSwitch, NgSwitchCase, NgbAlert, NgClass], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container [ngSwitch]=\"type\">\n  <ngb-alert\n    *ngSwitchCase=\"'info'\"\n    type=\"info\"\n    [dismissible]=\"dismissible\">\n    <i\n      class=\"bo-icon\"\n      [ngClass]=\"icon ? icon : 'bo-icon-general-info'\"></i>\n    <span [innerHTML]=\"message\"></span>\n  </ngb-alert>\n  <ngb-alert\n    *ngSwitchCase=\"'danger'\"\n    type=\"danger\"\n    [dismissible]=\"dismissible\">\n    <i\n      class=\"bo-icon\"\n      [ngClass]=\"icon ? icon : 'bo-icon-general-blocked'\"></i>\n    <span [innerHTML]=\"message\"></span>\n  </ngb-alert>\n  <ngb-alert\n    *ngSwitchCase=\"'warning'\"\n    type=\"warning\"\n    [dismissible]=\"dismissible\">\n    <i\n      class=\"bo-icon\"\n      [ngClass]=\"icon ? icon : 'bo-icon-general-warning'\"></i>\n    <span [innerHTML]=\"message\"></span>\n  </ngb-alert>\n  <ngb-alert\n    *ngSwitchCase=\"'success'\"\n    type=\"success\"\n    [dismissible]=\"dismissible\">\n    <i\n      class=\"bo-icon\"\n      [ngClass]=\"icon ? icon : 'bo-icon-control-check-circle'\"></i>\n    <span [innerHTML]=\"message\"></span>\n  </ngb-alert>\n</ng-container>\n", styles: [".text-body-xxxl{font-size:var(--spr-font-size-32);line-height:var(--spr-line-height-40)}.text-body-xxl{font-size:var(--spr-font-size-24);line-height:var(--spr-line-height-32)}.text-body-xl{font-size:var(--spr-font-size-20);line-height:var(--spr-line-height-24)}.text-body-l{font-size:var(--spr-font-size-16);line-height:var(--spr-line-height-20)}.text-body-m{font-size:var(--spr-font-size-15);line-height:var(--spr-line-height-20)}.text-body-s{font-size:var(--spr-font-size-14);line-height:var(--spr-line-height-20)}.text-body-xs{font-size:var(--spr-font-size-12);line-height:var(--spr-line-height-16)}.text-body-xs-uppercase{font-size:var(--spr-font-size-13);line-height:var(--spr-line-height-20);text-transform:uppercase}:host{display:flex;flex-direction:column;gap:16px}:host ::ng-deep .alert-dismissible{--brd-btn-close-bg: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414'/%3e%3c/svg%3e\")}:host ::ng-deep .alert-dismissible .btn-close{position:absolute;top:0;right:0;z-index:2;width:38px;height:46px;padding:16px 12px;background:transparent var(--brd-btn-close-bg) center/14px auto no-repeat;color:rgb(var(--brd-black));opacity:.5}:host ::ng-deep .alert-dismissible .btn-close:hover{opacity:.75}:host ::ng-deep .alert-dismissible .btn-close:focus{opacity:1}:host ::ng-deep .alert-dismissible .btn-close:disabled,:host ::ng-deep .alert-dismissible .btn-close.disabled{pointer-events:none;-webkit-user-select:none;user-select:none;opacity:.25}:host .alert{--brd-alert-bg: transparent;--brd-alert-color: inherit;--brd-info-bg-subtle: var(--brd-fill-info-0);--brd-info-text-emphasis: var(--brd-text-primary-800);--brd-info-border-subtle: var(--brd-border-info-250);--brd-danger-bg-subtle: var(--brd-fill-destructive-100);--brd-danger-text-emphasis: var(--brd-text-destructive-900);--brd-danger-border-subtle: transparent;--brd-warning-bg-subtle: rgb(var(--brd-orange-100));--brd-warning-text-emphasis: rgb(var(--brd-orange-900));--brd-warning-border-subtle: transparent;--brd-success-bg-subtle: rgb(var(--brd-green-100));--brd-success-text-emphasis: rgb(var(--brd-green-900));--brd-success-border-subtle: transparent;font-size:var(--spr-font-size-14);line-height:var(--spr-line-height-20);position:relative;display:flex;align-items:start;gap:10px;padding:13px 12px;border:1px solid var(--brd-alert-border-color);border-radius:var(--spr-border-radius-m);background-color:var(--brd-alert-bg);color:var(--brd-alert-color)}:host .alert .icon,:host .alert .bo-icon{margin-top:2px;font-size:var(--spr-font-size-16)}:host .alert-info{--brd-alert-color: var(--brd-info-text-emphasis);--brd-alert-bg: var(--brd-info-bg-subtle);--brd-alert-border-color: var(--brd-info-border-subtle)}:host .alert-success{--brd-alert-color: var(--brd-success-text-emphasis);--brd-alert-bg: var(--brd-success-bg-subtle);--brd-alert-border-color: var(--brd-success-border-subtle)}:host .alert-warning{--brd-alert-color: var(--brd-warning-text-emphasis);--brd-alert-bg: var(--brd-warning-bg-subtle);--brd-alert-border-color: var(--brd-warning-border-subtle)}:host .alert-danger{--brd-alert-color: var(--brd-danger-text-emphasis);--brd-alert-bg: var(--brd-danger-bg-subtle);--brd-alert-border-color: var(--brd-danger-border-subtle)}:host .alert-dismissible{padding-right:42px}\n"] }]
        }], propDecorators: { type: [{
                type: Input
            }], message: [{
                type: Input,
                args: [{ required: true }]
            }], dismissible: [{
                type: Input
            }], icon: [{
                type: Input
            }] } });

class SprButtonClassesPipe {
    transform(variant, size, isIcon, isRadius) {
        let classes = ['button', 'button--' + variant];
        if (isIcon) {
            classes.push('button--icon', 'button--icon-' + size);
        }
        else {
            classes.push('button--' + size);
        }
        if (isRadius) {
            classes.push('button--rounded');
        }
        return classes;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprButtonClassesPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.14", ngImport: i0, type: SprButtonClassesPipe, isStandalone: true, name: "sprButtonClasses" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprButtonClassesPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'sprButtonClasses',
                    standalone: true,
                }]
        }] });

class SprBtnSpinnerDirective {
    constructor(elRef, renderer) {
        this.elRef = elRef;
        this.renderer = renderer;
    }
    ngOnChanges(changes) {
        if (changes['sprBtnSpinner'].currentValue) {
            this.renderer.addClass(this.elRef.nativeElement, 'button--loading');
        }
        else {
            this.renderer.removeClass(this.elRef.nativeElement, 'button--loading');
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprBtnSpinnerDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: SprBtnSpinnerDirective, isStandalone: true, selector: "[sprBtnSpinner]", inputs: { sprBtnSpinner: "sprBtnSpinner" }, usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprBtnSpinnerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[sprBtnSpinner]',
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { sprBtnSpinner: [{
                type: Input
            }] } });

class SprButtonComponent {
    constructor() {
        this.variant = 'primary';
        this.type = 'button';
        this.size = 'md';
        this.isBtnSpinner = false;
        this.isRadius = false;
        this.disabled = false;
        this.isIcon = false;
        this.buttonId = '';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: SprButtonComponent, isStandalone: true, selector: "spr-button", inputs: { variant: "variant", type: "type", size: "size", isBtnSpinner: "isBtnSpinner", isRadius: "isRadius", disabled: "disabled", isIcon: "isIcon", buttonId: "buttonId" }, host: { properties: { "class.disabled": "disabled" } }, ngImport: i0, template: "<button\n  [id]=\"buttonId\"\n  [disabled]=\"disabled\"\n  [type]=\"type\"\n  [ngClass]=\"variant | sprButtonClasses: size : isIcon : isRadius\"\n  [sprBtnSpinner]=\"isBtnSpinner\">\n  <ng-content select=\"[start]\"></ng-content>\n  <ng-content></ng-content>\n  <ng-content select=\"[end]\"></ng-content>\n</button>\n", styles: [":host{display:inline-flex;line-height:1}:host::ng-deep .bo-icon:before{font-size:var(--spr-button-icon-font-size, inherit)}:host.disabled{pointer-events:none}.button{--spr-button-icon-font-size: var(--spr-font-size-20);--spr-button-min-width: 80px;position:relative;display:inline-grid;grid-auto-flow:column;align-items:center;justify-content:center;gap:8px;padding:var(--spr-button-padding-block, 11px) var(--spr-button-padding-inline, 16px);border-radius:var(--spr-button-border-radius, 8px);font-size:var(--spr-button-font-size);line-height:var(--spr-button-line-height, 20px);font-weight:var(--spr-button-font-weight, 500);min-width:var(--spr-button-custom-min-width, var(--spr-button-min-width));min-height:var(--spr-button-min-height, auto);border:1px solid var(--spr-button-border-color, transparent);color:var(--spr-button-color, rgb(var(--brd-black)));background:var(--spr-button-background, transparent);box-shadow:var(--spr-button-box-shadow, none);transition:background var(--spr-transition-time) ease,border-color var(--spr-transition-time) ease,color var(--spr-transition-time) ease}.button:hover{background:var(--spr-button-background-hover);box-shadow:var(--spr-button-box-shadow-hover, none);border-color:var(--spr-button-border-color-hover, transparent);text-decoration:none}.button:focus-visible{box-shadow:var(--spr-button-box-shadow-focus, none);background:var(--spr-button-background-focus);border-color:var(--spr-button-border-color-focus);outline:none}.button:active{background:var(--spr-button-background-active);color:var(--spr-button-color-active);border-color:var(--spr-button-border-color-active, transparent);box-shadow:none}.button:disabled:not(.button--loading){border-color:var(--spr-button-border-color-disabled);background:var(--spr-button-background-disabled);color:var(--spr-button-color-disabled);box-shadow:none}.button--lg{--spr-button-padding-block: 15px;--spr-button-padding-inline: 24px;--spr-button-font-size: var(--spr-font-size-16);--spr-button-line-height: var(--spr-line-height-20);--spr-button-min-width: 108px;--spr-button-spinner-width: 24px;--spr-button-spinner-height: 24px}.button--md{--spr-button-padding-block: 11px;--spr-button-padding-inline: 16px;--spr-button-font-size: var(--spr-font-size-15);--spr-button-line-height: var(--spr-line-height-20);--spr-button-min-width: 90px;--spr-button-spinner-width: 20px;--spr-button-spinner-height: 20px}.button--sm{--spr-button-padding-block: 7px;--spr-button-padding-inline: 12px;--spr-button-font-size: var(--spr-font-size-14);--spr-button-line-height: var(--spr-line-height-20);--spr-button-font-weight: var(--spr-font-weight-regular);--spr-button-min-width: 80px;--spr-button-icon-font-size: var(--spr-font-size-16);--spr-button-spinner-width: 20px;--spr-button-spinner-height: 20px}.button--icon-lg{--spr-button-padding-block: 15px;--spr-button-padding-inline: 15px;--spr-button-spinner-width: 20px;--spr-button-spinner-height: 20px;--spr-button-min-width: 52px;--spr-button-min-height: 52px}.button--icon-md{--spr-button-padding-block: 11px;--spr-button-padding-inline: 11px;--spr-button-spinner-width: 20px;--spr-button-spinner-height: 20px;--spr-button-min-width: 44px;--spr-button-min-height: 44px}.button--icon-sm{--spr-button-padding-block: 8px;--spr-button-padding-inline: 8px;--spr-button-icon-font-size: var(--spr-font-size-16);--spr-button-spinner-width: 16px;--spr-button-spinner-height: 16px;--spr-button-min-width: 36px;--spr-button-min-height: 36px}.button--rounded{--spr-button-border-radius: var(--spr-border-radius-pill)}.button--primary{--spr-button-background: rgb(var(--brd-primary-800));--spr-button-background-hover: rgb(var(--brd-primary-700));--spr-button-background-focus: rgb(var(--brd-primary-800));--spr-button-background-active: rgb(var(--brd-primary-800));--spr-button-background-disabled: rgb(var(--brd-gray-500));--spr-button-border-color: rgb(var(--brd-primary-900));--spr-button-border-color-hover: var(--spr-button-border-color);--spr-button-border-color-active: var(--spr-button-border-color);--spr-button-border-color-focus: rgb(var(--brd-white));--spr-button-border-color-disabled: transparent;--spr-button-color: rgb(var(--brd-white));--spr-button-color-active: rgb(var(--brd-white) / .6);--spr-button-color-disabled: rgb(var(--brd-white));--spr-button-box-shadow: 0 2px 4px 0 rgb(var(--brd-primary-700) / .32);--spr-button-box-shadow-hover: 0 2px 4px 0 rgb(var(--brd-primary-700) / .32);--spr-button-box-shadow-focus: 0 0 0 4px rgb(var(--brd-primary-300))}.button--accent{--spr-button-background: var(--brd-fill-accent-default-base);--spr-button-background-hover: var(--brd-fill-accent-default-light);--spr-button-background-focus: var(--brd-fill-accent-default-base);--spr-button-background-active: var(--brd-fill-accent-default-base);--spr-button-background-disabled: var(--brd-fill-disabled-500);--spr-button-border-color: var(--brd-border-accent-default-dark);--spr-button-border-color-hover: var(--brd-border-accent-hover-dark);--spr-button-border-color-active: var(--brd-border-accent-active-dark);--spr-button-border-color-focus: var(--brd-border-hover-0);--spr-button-border-color-disabled: transparent;--spr-button-color: var(--brd-text-default-0);--spr-button-color-active: rgb(var(--brd-white) / .6);--spr-button-color-disabled: var(--brd-text-disabled-0);--spr-button-box-shadow: 0 2px 4px 0 rgb(var(--brd-primary-700) / .32);--spr-button-box-shadow-hover: 0 2px 4px 0 rgb(var(--brd-primary-700) / .2);--spr-button-box-shadow-focus: 0 0 0 4px var(--brd-border-accent-focus)}.button--secondary{--spr-button-background: var(--brd-fill-default-0);--spr-button-background-hover: var(--brd-fill-hover-50);--spr-button-background-focus: var(--brd-fill-default-0);--spr-button-background-active: var(--brd-fill-hover-50);--spr-button-background-disabled: var(--brd-fill-disabled-100);--spr-button-border-color: var(--brd-border-default-0);--spr-button-border-color-hover: var(--brd-fill-hover-50);--spr-button-border-color-active: var(--spr-button-border-color-hover);--spr-button-border-color-focus: var(--brd-border-default-0);--spr-button-border-color-disabled: var(--brd-border-disabled-0);--spr-button-color: var(--brd-text-default-900);--spr-button-color-active: var(--brd-text-active-700);--spr-button-color-disabled: var(--brd-text-disabled-500);--spr-button-box-shadow: 0 2px 4px 0 rgb(var(--brd-gray-900) / .08);--spr-button-box-shadow-hover: 0 2px 4px 0 rgb(var(--brd-gray-900) / .04);--spr-button-box-shadow-focus: 0 0 0 4px rgb(var(--brd-gray-800) / .1)}.button--secondary.button--loading{--spr-button-background: var(--spr-button-background-hover);--spr-button-border-color: var(--spr-button-border-color-hover)}.button--outline{--spr-button-background: var(--brd-fill-default-0);--spr-button-background-hover: var(--brd-fill-hover-0);--spr-button-background-focus: var(--brd-fill-default-0);--spr-button-background-active: var(--brd-fill-pressed-100);--spr-button-background-disabled: transparent;--spr-button-border-color: var(--brd-border-default-400);--spr-button-border-color-hover: var(--brd-border-hover-500);--spr-button-border-color-active: var(--spr-button-border-color);--spr-button-border-color-focus: var(--spr-button-border-color);--spr-button-border-color-disabled: var(--brd-border-disabled-300);--spr-button-color: var(--brd-text-default-800);--spr-button-color-active: var(--brd-text-active-700);--spr-button-color-disabled: var(--brd-text-disabled-500);--spr-button-box-shadow-focus: 0 0 0 4px rgb(var(--brd-gray-800) / .1)}.button--outline.button--loading{--spr-button-background: var(--spr-button-background-active)}.button--link{--spr-button-background: transparent;--spr-button-background-hover: var(--brd-fill-hover-100);--spr-button-background-focus: var(--brd-fill-default-0);--spr-button-background-active: var(--spr-button-background-hover);--spr-button-background-disabled: var(--spr-button-background);--spr-button-border-color: transparent;--spr-button-border-color-hover: transparent;--spr-button-border-color-focus: var(--brd-border-default-0);--spr-button-border-color-active: var(--spr-button-border-color-hover);--spr-button-border-color-disabled: transparent;--spr-button-color: var(--brd-text-default-800);--spr-button-color-active: var(--brd-text-active-700);--spr-button-color-disabled: var(--brd-text-disabled-500);--spr-button-box-shadow-focus: 0 0 0 4px var(--brd-fill-focus-100)}.button--link.button--loading{--spr-button-background: var(--spr-button-background-hover);--spr-button-border-color: var(--spr-button-border-color-hover)}.button--link-accent{--spr-button-background: transparent;--spr-button-background-hover: var(--brd-fill-accent-hover);--spr-button-background-focus: var(--brd-fill-default-0);--spr-button-background-active: var(--brd-fill-accent-hover);--spr-button-background-disabled: transparent;--spr-button-border-color: transparent;--spr-button-border-color-hover: transparent;--spr-button-border-color-focus: var(--brd-border-default-0);--spr-button-border-color-active: transparent;--spr-button-border-color-disabled: var(--spr-button-border-color);--spr-button-color: var(--brd-text-accent-default-base);--spr-button-color-active: var(--brd-text-accent-pressed);--spr-button-color-disabled: var(--brd-text-disabled-500);--spr-button-box-shadow-focus: 0 0 0 4px var(--brd-border-accent-focus)}.button--severity{--spr-button-background: var(--brd-fill-destructive-700);--spr-button-background-hover: var(--brd-fill-destructive-600);--spr-button-background-focus: var(--brd-fill-destructive-700);--spr-button-background-active: var(--brd-fill-destructive-700);--spr-button-background-disabled: var(--brd-fill-disabled-500);--spr-button-border-color: var(--brd-border-destructive-900);--spr-button-border-color-hover: var(--brd-border-destructive-900);--spr-button-border-color-focus: var(--brd-border-destructive-900);--spr-button-border-color-active: var(--brd-border-destructive-900);--spr-button-border-color-disabled: transparent;--spr-button-color: var(--brd-text-default-0);--spr-button-color-active: var(--spr-button-color);--spr-button-color-disabled: var(--spr-button-color);--spr-button-box-shadow-focus: 0 0 0 4px rgb(var(--brd-red-300) / .3)}.button--authorization-secondary{--spr-button-background: transparent;--spr-button-background-hover: transparent;--spr-button-background-focus: transparent;--spr-button-background-active: transparent;--spr-button-background-disabled: transparent;--spr-button-border-color: rgb(var(--brd-white) / .6);--spr-button-border-color-hover: var(--brd-border-hover-0);--spr-button-border-color-focus: rgb(var(--brd-white) / .4);--spr-button-border-color-active: rgb(var(--brd-white) / .4);--spr-button-border-color-disabled: rgb(var(--brd-white) / .2);--spr-button-color: var(--brd-text-default-0);--spr-button-color-active: rgb(var(--brd-white) / .6);--spr-button-color-disabled: rgb(var(--brd-white) / .6);--spr-button-box-shadow-focus: 0 0 0 4px rgb(var(--brd-white) / .3)}.button--loading{box-shadow:none;cursor:default;color:transparent;pointer-events:none;text-shadow:none}.button--loading:before{content:\"\";position:absolute;inset-block-start:50%;inset-inline-start:50%;margin-block-start:calc(var(--spr-button-spinner-width) / 2 * -1);margin-inline-start:calc(var(--spr-button-spinner-height) / 2 * -1);width:var(--spr-button-spinner-width, 20px);height:var(--spr-button-spinner-height, 20px);border-width:3px;border-radius:var(--spr-border-radius-pill);border-style:solid;border-color:var(--spr-button-color) var(--spr-button-color) var(--spr-button-color) transparent;animation:.75s linear infinite button-loader}.button--form-button{--spr-button-color: rgb(var(--brd-primary-800));--spr-button-border-color: transparent;--spr-button-background: rgb(var(--brd-white));--spr-button-min-height: 26px;--spr-button-icon-font-size: var(--spr-font-size-16);width:var(--spr-button-form-width, 26px);height:var(--spr-button-form-height, 26px);min-width:26px;padding:4px;color:var(--spr-button-form-color, var(--spr-button-color));background:var(--spr-button-form-background, var(--spr-button-background))}.button--form-button:hover{--spr-button-background-hover: rgb(var(--brd-gray-100))}.button--form-button:active,.button--form-button:focus-visible{--spr-button-color-active: rgb(var(--brd-gray-700));--spr-button-background-active: rgb(var(--brd-gray-200));--spr-button-border-color-focus: transparent}.button--form-button:disabled{--spr-button-color-disabled: rgb(var(--brd-gray-500));--spr-button-background-disabled: rgb(var(--brd-gray-100));--spr-button-border-color-disabled: transparent}.button--icon-button{--spr-button-icon-color: var(--brd-icon-default-700);--spr-button-icon-color-hover: var(--brd-icon-hover-800);--spr-button-icon-color-active: var(--brd-icon-accent-default-base);--spr-button-icon-color-focus: var(--spr-button-icon-color-hover);--spr-button-icon-color-disabled: var(--brd-icon-disabled-500);--spr-button-icon-background: transparent;--spr-button-icon-background-hover: var(--brd-fill-default-50);--spr-button-icon-background-focus: var(--spr-button-icon-background-hover);--spr-button-icon-box-shadow-focus: 0 0 0 2px var(--brd-fill-accent-selected);--spr-button-icon-font-size: var(--spr-font-size-20);width:var(--spr-button-custom-width, 24px);min-width:var(--spr-button-custom-width, 24px);height:var(--spr-button-custom-height, 24px);padding:2px;margin:0;border:none;color:var(--spr-button-icon-color);background:var(--spr-button-icon-background);border-radius:var(--spr-border-radius-m);box-shadow:var(--spr-button-icon-box-shadow, none)}.button--icon-button:hover:not(.button--icon-button-active){--spr-button-icon-color: var(--spr-button-icon-color-hover);--spr-button-icon-background: var(--spr-button-icon-background-hover)}.button--icon-button-active{--spr-button-icon-color: var(--spr-button-icon-color-active);cursor:default!important}.button--icon-button:focus-visible{outline:none}.button--icon-button:focus-visible:not(.button--icon-button-active){--spr-button-icon-color: var(--spr-button-icon-color-focus);--spr-button-icon-background: var(--spr-button-icon-background-focus);--spr-button-icon-box-shadow: var(--spr-button-icon-box-shadow-focus)}.button--icon-button:disabled:not(.button--loading){color:var(--spr-button-icon-color-disabled)}@keyframes button-loader{to{transform:rotate(360deg)}}\n"], dependencies: [{ kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "pipe", type: SprButtonClassesPipe, name: "sprButtonClasses" }, { kind: "directive", type: SprBtnSpinnerDirective, selector: "[sprBtnSpinner]", inputs: ["sprBtnSpinner"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-button', changeDetection: ChangeDetectionStrategy.OnPush, imports: [NgClass, SprButtonClassesPipe, SprBtnSpinnerDirective], host: { '[class.disabled]': 'disabled' }, template: "<button\n  [id]=\"buttonId\"\n  [disabled]=\"disabled\"\n  [type]=\"type\"\n  [ngClass]=\"variant | sprButtonClasses: size : isIcon : isRadius\"\n  [sprBtnSpinner]=\"isBtnSpinner\">\n  <ng-content select=\"[start]\"></ng-content>\n  <ng-content></ng-content>\n  <ng-content select=\"[end]\"></ng-content>\n</button>\n", styles: [":host{display:inline-flex;line-height:1}:host::ng-deep .bo-icon:before{font-size:var(--spr-button-icon-font-size, inherit)}:host.disabled{pointer-events:none}.button{--spr-button-icon-font-size: var(--spr-font-size-20);--spr-button-min-width: 80px;position:relative;display:inline-grid;grid-auto-flow:column;align-items:center;justify-content:center;gap:8px;padding:var(--spr-button-padding-block, 11px) var(--spr-button-padding-inline, 16px);border-radius:var(--spr-button-border-radius, 8px);font-size:var(--spr-button-font-size);line-height:var(--spr-button-line-height, 20px);font-weight:var(--spr-button-font-weight, 500);min-width:var(--spr-button-custom-min-width, var(--spr-button-min-width));min-height:var(--spr-button-min-height, auto);border:1px solid var(--spr-button-border-color, transparent);color:var(--spr-button-color, rgb(var(--brd-black)));background:var(--spr-button-background, transparent);box-shadow:var(--spr-button-box-shadow, none);transition:background var(--spr-transition-time) ease,border-color var(--spr-transition-time) ease,color var(--spr-transition-time) ease}.button:hover{background:var(--spr-button-background-hover);box-shadow:var(--spr-button-box-shadow-hover, none);border-color:var(--spr-button-border-color-hover, transparent);text-decoration:none}.button:focus-visible{box-shadow:var(--spr-button-box-shadow-focus, none);background:var(--spr-button-background-focus);border-color:var(--spr-button-border-color-focus);outline:none}.button:active{background:var(--spr-button-background-active);color:var(--spr-button-color-active);border-color:var(--spr-button-border-color-active, transparent);box-shadow:none}.button:disabled:not(.button--loading){border-color:var(--spr-button-border-color-disabled);background:var(--spr-button-background-disabled);color:var(--spr-button-color-disabled);box-shadow:none}.button--lg{--spr-button-padding-block: 15px;--spr-button-padding-inline: 24px;--spr-button-font-size: var(--spr-font-size-16);--spr-button-line-height: var(--spr-line-height-20);--spr-button-min-width: 108px;--spr-button-spinner-width: 24px;--spr-button-spinner-height: 24px}.button--md{--spr-button-padding-block: 11px;--spr-button-padding-inline: 16px;--spr-button-font-size: var(--spr-font-size-15);--spr-button-line-height: var(--spr-line-height-20);--spr-button-min-width: 90px;--spr-button-spinner-width: 20px;--spr-button-spinner-height: 20px}.button--sm{--spr-button-padding-block: 7px;--spr-button-padding-inline: 12px;--spr-button-font-size: var(--spr-font-size-14);--spr-button-line-height: var(--spr-line-height-20);--spr-button-font-weight: var(--spr-font-weight-regular);--spr-button-min-width: 80px;--spr-button-icon-font-size: var(--spr-font-size-16);--spr-button-spinner-width: 20px;--spr-button-spinner-height: 20px}.button--icon-lg{--spr-button-padding-block: 15px;--spr-button-padding-inline: 15px;--spr-button-spinner-width: 20px;--spr-button-spinner-height: 20px;--spr-button-min-width: 52px;--spr-button-min-height: 52px}.button--icon-md{--spr-button-padding-block: 11px;--spr-button-padding-inline: 11px;--spr-button-spinner-width: 20px;--spr-button-spinner-height: 20px;--spr-button-min-width: 44px;--spr-button-min-height: 44px}.button--icon-sm{--spr-button-padding-block: 8px;--spr-button-padding-inline: 8px;--spr-button-icon-font-size: var(--spr-font-size-16);--spr-button-spinner-width: 16px;--spr-button-spinner-height: 16px;--spr-button-min-width: 36px;--spr-button-min-height: 36px}.button--rounded{--spr-button-border-radius: var(--spr-border-radius-pill)}.button--primary{--spr-button-background: rgb(var(--brd-primary-800));--spr-button-background-hover: rgb(var(--brd-primary-700));--spr-button-background-focus: rgb(var(--brd-primary-800));--spr-button-background-active: rgb(var(--brd-primary-800));--spr-button-background-disabled: rgb(var(--brd-gray-500));--spr-button-border-color: rgb(var(--brd-primary-900));--spr-button-border-color-hover: var(--spr-button-border-color);--spr-button-border-color-active: var(--spr-button-border-color);--spr-button-border-color-focus: rgb(var(--brd-white));--spr-button-border-color-disabled: transparent;--spr-button-color: rgb(var(--brd-white));--spr-button-color-active: rgb(var(--brd-white) / .6);--spr-button-color-disabled: rgb(var(--brd-white));--spr-button-box-shadow: 0 2px 4px 0 rgb(var(--brd-primary-700) / .32);--spr-button-box-shadow-hover: 0 2px 4px 0 rgb(var(--brd-primary-700) / .32);--spr-button-box-shadow-focus: 0 0 0 4px rgb(var(--brd-primary-300))}.button--accent{--spr-button-background: var(--brd-fill-accent-default-base);--spr-button-background-hover: var(--brd-fill-accent-default-light);--spr-button-background-focus: var(--brd-fill-accent-default-base);--spr-button-background-active: var(--brd-fill-accent-default-base);--spr-button-background-disabled: var(--brd-fill-disabled-500);--spr-button-border-color: var(--brd-border-accent-default-dark);--spr-button-border-color-hover: var(--brd-border-accent-hover-dark);--spr-button-border-color-active: var(--brd-border-accent-active-dark);--spr-button-border-color-focus: var(--brd-border-hover-0);--spr-button-border-color-disabled: transparent;--spr-button-color: var(--brd-text-default-0);--spr-button-color-active: rgb(var(--brd-white) / .6);--spr-button-color-disabled: var(--brd-text-disabled-0);--spr-button-box-shadow: 0 2px 4px 0 rgb(var(--brd-primary-700) / .32);--spr-button-box-shadow-hover: 0 2px 4px 0 rgb(var(--brd-primary-700) / .2);--spr-button-box-shadow-focus: 0 0 0 4px var(--brd-border-accent-focus)}.button--secondary{--spr-button-background: var(--brd-fill-default-0);--spr-button-background-hover: var(--brd-fill-hover-50);--spr-button-background-focus: var(--brd-fill-default-0);--spr-button-background-active: var(--brd-fill-hover-50);--spr-button-background-disabled: var(--brd-fill-disabled-100);--spr-button-border-color: var(--brd-border-default-0);--spr-button-border-color-hover: var(--brd-fill-hover-50);--spr-button-border-color-active: var(--spr-button-border-color-hover);--spr-button-border-color-focus: var(--brd-border-default-0);--spr-button-border-color-disabled: var(--brd-border-disabled-0);--spr-button-color: var(--brd-text-default-900);--spr-button-color-active: var(--brd-text-active-700);--spr-button-color-disabled: var(--brd-text-disabled-500);--spr-button-box-shadow: 0 2px 4px 0 rgb(var(--brd-gray-900) / .08);--spr-button-box-shadow-hover: 0 2px 4px 0 rgb(var(--brd-gray-900) / .04);--spr-button-box-shadow-focus: 0 0 0 4px rgb(var(--brd-gray-800) / .1)}.button--secondary.button--loading{--spr-button-background: var(--spr-button-background-hover);--spr-button-border-color: var(--spr-button-border-color-hover)}.button--outline{--spr-button-background: var(--brd-fill-default-0);--spr-button-background-hover: var(--brd-fill-hover-0);--spr-button-background-focus: var(--brd-fill-default-0);--spr-button-background-active: var(--brd-fill-pressed-100);--spr-button-background-disabled: transparent;--spr-button-border-color: var(--brd-border-default-400);--spr-button-border-color-hover: var(--brd-border-hover-500);--spr-button-border-color-active: var(--spr-button-border-color);--spr-button-border-color-focus: var(--spr-button-border-color);--spr-button-border-color-disabled: var(--brd-border-disabled-300);--spr-button-color: var(--brd-text-default-800);--spr-button-color-active: var(--brd-text-active-700);--spr-button-color-disabled: var(--brd-text-disabled-500);--spr-button-box-shadow-focus: 0 0 0 4px rgb(var(--brd-gray-800) / .1)}.button--outline.button--loading{--spr-button-background: var(--spr-button-background-active)}.button--link{--spr-button-background: transparent;--spr-button-background-hover: var(--brd-fill-hover-100);--spr-button-background-focus: var(--brd-fill-default-0);--spr-button-background-active: var(--spr-button-background-hover);--spr-button-background-disabled: var(--spr-button-background);--spr-button-border-color: transparent;--spr-button-border-color-hover: transparent;--spr-button-border-color-focus: var(--brd-border-default-0);--spr-button-border-color-active: var(--spr-button-border-color-hover);--spr-button-border-color-disabled: transparent;--spr-button-color: var(--brd-text-default-800);--spr-button-color-active: var(--brd-text-active-700);--spr-button-color-disabled: var(--brd-text-disabled-500);--spr-button-box-shadow-focus: 0 0 0 4px var(--brd-fill-focus-100)}.button--link.button--loading{--spr-button-background: var(--spr-button-background-hover);--spr-button-border-color: var(--spr-button-border-color-hover)}.button--link-accent{--spr-button-background: transparent;--spr-button-background-hover: var(--brd-fill-accent-hover);--spr-button-background-focus: var(--brd-fill-default-0);--spr-button-background-active: var(--brd-fill-accent-hover);--spr-button-background-disabled: transparent;--spr-button-border-color: transparent;--spr-button-border-color-hover: transparent;--spr-button-border-color-focus: var(--brd-border-default-0);--spr-button-border-color-active: transparent;--spr-button-border-color-disabled: var(--spr-button-border-color);--spr-button-color: var(--brd-text-accent-default-base);--spr-button-color-active: var(--brd-text-accent-pressed);--spr-button-color-disabled: var(--brd-text-disabled-500);--spr-button-box-shadow-focus: 0 0 0 4px var(--brd-border-accent-focus)}.button--severity{--spr-button-background: var(--brd-fill-destructive-700);--spr-button-background-hover: var(--brd-fill-destructive-600);--spr-button-background-focus: var(--brd-fill-destructive-700);--spr-button-background-active: var(--brd-fill-destructive-700);--spr-button-background-disabled: var(--brd-fill-disabled-500);--spr-button-border-color: var(--brd-border-destructive-900);--spr-button-border-color-hover: var(--brd-border-destructive-900);--spr-button-border-color-focus: var(--brd-border-destructive-900);--spr-button-border-color-active: var(--brd-border-destructive-900);--spr-button-border-color-disabled: transparent;--spr-button-color: var(--brd-text-default-0);--spr-button-color-active: var(--spr-button-color);--spr-button-color-disabled: var(--spr-button-color);--spr-button-box-shadow-focus: 0 0 0 4px rgb(var(--brd-red-300) / .3)}.button--authorization-secondary{--spr-button-background: transparent;--spr-button-background-hover: transparent;--spr-button-background-focus: transparent;--spr-button-background-active: transparent;--spr-button-background-disabled: transparent;--spr-button-border-color: rgb(var(--brd-white) / .6);--spr-button-border-color-hover: var(--brd-border-hover-0);--spr-button-border-color-focus: rgb(var(--brd-white) / .4);--spr-button-border-color-active: rgb(var(--brd-white) / .4);--spr-button-border-color-disabled: rgb(var(--brd-white) / .2);--spr-button-color: var(--brd-text-default-0);--spr-button-color-active: rgb(var(--brd-white) / .6);--spr-button-color-disabled: rgb(var(--brd-white) / .6);--spr-button-box-shadow-focus: 0 0 0 4px rgb(var(--brd-white) / .3)}.button--loading{box-shadow:none;cursor:default;color:transparent;pointer-events:none;text-shadow:none}.button--loading:before{content:\"\";position:absolute;inset-block-start:50%;inset-inline-start:50%;margin-block-start:calc(var(--spr-button-spinner-width) / 2 * -1);margin-inline-start:calc(var(--spr-button-spinner-height) / 2 * -1);width:var(--spr-button-spinner-width, 20px);height:var(--spr-button-spinner-height, 20px);border-width:3px;border-radius:var(--spr-border-radius-pill);border-style:solid;border-color:var(--spr-button-color) var(--spr-button-color) var(--spr-button-color) transparent;animation:.75s linear infinite button-loader}.button--form-button{--spr-button-color: rgb(var(--brd-primary-800));--spr-button-border-color: transparent;--spr-button-background: rgb(var(--brd-white));--spr-button-min-height: 26px;--spr-button-icon-font-size: var(--spr-font-size-16);width:var(--spr-button-form-width, 26px);height:var(--spr-button-form-height, 26px);min-width:26px;padding:4px;color:var(--spr-button-form-color, var(--spr-button-color));background:var(--spr-button-form-background, var(--spr-button-background))}.button--form-button:hover{--spr-button-background-hover: rgb(var(--brd-gray-100))}.button--form-button:active,.button--form-button:focus-visible{--spr-button-color-active: rgb(var(--brd-gray-700));--spr-button-background-active: rgb(var(--brd-gray-200));--spr-button-border-color-focus: transparent}.button--form-button:disabled{--spr-button-color-disabled: rgb(var(--brd-gray-500));--spr-button-background-disabled: rgb(var(--brd-gray-100));--spr-button-border-color-disabled: transparent}.button--icon-button{--spr-button-icon-color: var(--brd-icon-default-700);--spr-button-icon-color-hover: var(--brd-icon-hover-800);--spr-button-icon-color-active: var(--brd-icon-accent-default-base);--spr-button-icon-color-focus: var(--spr-button-icon-color-hover);--spr-button-icon-color-disabled: var(--brd-icon-disabled-500);--spr-button-icon-background: transparent;--spr-button-icon-background-hover: var(--brd-fill-default-50);--spr-button-icon-background-focus: var(--spr-button-icon-background-hover);--spr-button-icon-box-shadow-focus: 0 0 0 2px var(--brd-fill-accent-selected);--spr-button-icon-font-size: var(--spr-font-size-20);width:var(--spr-button-custom-width, 24px);min-width:var(--spr-button-custom-width, 24px);height:var(--spr-button-custom-height, 24px);padding:2px;margin:0;border:none;color:var(--spr-button-icon-color);background:var(--spr-button-icon-background);border-radius:var(--spr-border-radius-m);box-shadow:var(--spr-button-icon-box-shadow, none)}.button--icon-button:hover:not(.button--icon-button-active){--spr-button-icon-color: var(--spr-button-icon-color-hover);--spr-button-icon-background: var(--spr-button-icon-background-hover)}.button--icon-button-active{--spr-button-icon-color: var(--spr-button-icon-color-active);cursor:default!important}.button--icon-button:focus-visible{outline:none}.button--icon-button:focus-visible:not(.button--icon-button-active){--spr-button-icon-color: var(--spr-button-icon-color-focus);--spr-button-icon-background: var(--spr-button-icon-background-focus);--spr-button-icon-box-shadow: var(--spr-button-icon-box-shadow-focus)}.button--icon-button:disabled:not(.button--loading){color:var(--spr-button-icon-color-disabled)}@keyframes button-loader{to{transform:rotate(360deg)}}\n"] }]
        }], propDecorators: { variant: [{
                type: Input
            }], type: [{
                type: Input
            }], size: [{
                type: Input
            }], isBtnSpinner: [{
                type: Input
            }], isRadius: [{
                type: Input
            }], disabled: [{
                type: Input
            }], isIcon: [{
                type: Input
            }], buttonId: [{
                type: Input
            }] } });

const COMMON_TRANSLATION_PREFIX = 'common.';
const ERRORS_TRANSLATION_PREFIX = 'errors.';
const TITLES_TRANSLATION_PREFIX = 'titles.';
const KYC_TRANSLATION_PREFIXES = 'kyc.';
const DROPDOWNS_TRANSLATION_PREFIXES = 'dropdowns.';
const LABELS_TRANSLATION_PREFIXES = 'labels.';
const TOASTS_TRANSLATION_PREFIXES = 'toasts.';
const STATUSES_TRANSLATION_PREFIXES = 'statuses.';
const BONUSES_TRANSLATION_PREFIXES = 'bonuses.';
const TRANSACTION_TYPES_TRANSLATION_PREFIXES = 'transactions-types.';
const MESSAGES_TRANSLATION_PREFIXES = 'messages.';
const PLAYER_TRANSLATION_PREFIXES = 'player.';
const DASHBOARD_TRANSLATION_PREFIXES = 'dashboard.';
const BLOCK_MANAGEMENT_TRANSLATION_PREFIXES = 'block-management.';
const ASYNC_TRANSLATION_PREFIXES = 'async.';
const HEADERS_TRANSLATION_PREFIXES = 'header.';
const CHAT_MODERATION_TRANSLATION_PREFIXES = 'chat-moderation.';
const MANAGE_USERS_PREFIXES = 'manage-users.';
const IMAGE_LIBRARY_PREFIXES = 'image-library.';
const EDITOR_TRANSLATION_PREFIX = 'Editor.';

var ValidatorsKeys;
(function (ValidatorsKeys) {
    ValidatorsKeys["Required"] = "required";
    ValidatorsKeys["Email"] = "email";
    ValidatorsKeys["Minlength"] = "minlength";
    ValidatorsKeys["Maxlength"] = "maxlength";
    ValidatorsKeys["Password"] = "password";
    ValidatorsKeys["PasswordMismatch"] = "password mismatch";
    ValidatorsKeys["Max"] = "max";
    ValidatorsKeys["Min"] = "min";
    ValidatorsKeys["NotEquivalent"] = "notEquivalent";
    ValidatorsKeys["Integer"] = "integer";
    ValidatorsKeys["Pattern"] = "pattern";
    ValidatorsKeys["ForbiddenSymbols"] = "forbiddenSymbols";
    ValidatorsKeys["LessThanNumber"] = "lessThanNumber";
    ValidatorsKeys["PhoneNumber"] = "phoneNumber";
    ValidatorsKeys["ExistingUserName"] = "existingUserName";
    ValidatorsKeys["BadWords"] = "badWords";
    ValidatorsKeys["WithoutSpace"] = "withoutSpace";
    ValidatorsKeys["AtLeastOneNumber"] = "atLeastOneNumber";
    ValidatorsKeys["AtLeastOneUpperCaseAndOneLowerCaseLetter"] = "atLeastOneUpperCaseAndOneLowerCaseLetter";
    ValidatorsKeys["UniqueStaticPageUrl"] = "uniqueStaticPageUrl";
    ValidatorsKeys["LatinLettersNumbersHyphen"] = "latinLettersNumbersHyphen";
    ValidatorsKeys["NumbersDotsHyphen"] = "NumbersDotsHyphen";
    ValidatorsKeys["CompareFromWithTo"] = "compareFromWithTo";
    ValidatorsKeys["CompareToWithFrom"] = "compareToWithFrom";
    ValidatorsKeys["LessThanMax24H"] = "lessThanMax24h";
    ValidatorsKeys["CompareDateToWithFrom"] = "compareDateToWithFrom";
    ValidatorsKeys["CompareDateFromWithTo"] = "compareDateFromWithTo";
    ValidatorsKeys["PasswordDoesNotMatchRequirements"] = "Password does not match requirements";
    ValidatorsKeys["MaxDaysLimitExceeded"] = "maxDaysLimitExceeded";
    ValidatorsKeys["InvalidRange"] = "invalidRange";
})(ValidatorsKeys || (ValidatorsKeys = {}));
const VALIDATION_MESSAGES = {
    [ValidatorsKeys.Required]: ERRORS_TRANSLATION_PREFIX + 'This field is required',
    [ValidatorsKeys.Email]: ERRORS_TRANSLATION_PREFIX + 'Incorrect Email',
    [ValidatorsKeys.Password]: ERRORS_TRANSLATION_PREFIX + 'Password should contain',
    [ValidatorsKeys.Minlength]: ERRORS_TRANSLATION_PREFIX + 'Should be minimum symbols',
    [ValidatorsKeys.Maxlength]: ERRORS_TRANSLATION_PREFIX + 'Should be maximum symbols',
    [ValidatorsKeys.PasswordMismatch]: ERRORS_TRANSLATION_PREFIX + 'Passwords not equal',
    [ValidatorsKeys.Max]: ERRORS_TRANSLATION_PREFIX + 'Max Validator',
    [ValidatorsKeys.Min]: ERRORS_TRANSLATION_PREFIX + 'Min Validator',
    [ValidatorsKeys.NotEquivalent]: ERRORS_TRANSLATION_PREFIX + 'Passwords must match',
    [ValidatorsKeys.Integer]: ERRORS_TRANSLATION_PREFIX + 'Only integers are allowed',
    [ValidatorsKeys.Pattern]: ERRORS_TRANSLATION_PREFIX + 'Invalid pattern',
    [ValidatorsKeys.ForbiddenSymbols]: ERRORS_TRANSLATION_PREFIX + 'Special characters and spaces are not allowed',
    [ValidatorsKeys.LessThanNumber]: 'Min > Max',
    [ValidatorsKeys.ExistingUserName]: ERRORS_TRANSLATION_PREFIX + 'existingUserName',
    [ValidatorsKeys.BadWords]: ERRORS_TRANSLATION_PREFIX + 'badWords',
    [ValidatorsKeys.PhoneNumber]: ERRORS_TRANSLATION_PREFIX + 'IncorrectPhoneNumber',
    [ValidatorsKeys.WithoutSpace]: ERRORS_TRANSLATION_PREFIX + 'WithoutSpace',
    [ValidatorsKeys.AtLeastOneNumber]: ERRORS_TRANSLATION_PREFIX + 'AtLeastOneNumber',
    [ValidatorsKeys.AtLeastOneUpperCaseAndOneLowerCaseLetter]: ERRORS_TRANSLATION_PREFIX + 'AtLeastOneUpperCaseAndOneLowerCaseLetter',
    [ValidatorsKeys.UniqueStaticPageUrl]: ERRORS_TRANSLATION_PREFIX + 'URL must be unique',
    [ValidatorsKeys.LatinLettersNumbersHyphen]: ERRORS_TRANSLATION_PREFIX + 'OnlyLatinLettersNumbersDashesAvailable',
    [ValidatorsKeys.NumbersDotsHyphen]: ERRORS_TRANSLATION_PREFIX + 'Only numbers, dots and hyphens are allowed',
    [ValidatorsKeys.LessThanMax24H]: ERRORS_TRANSLATION_PREFIX + 'Min > Max(24h)',
    [ValidatorsKeys.CompareFromWithTo]: ERRORS_TRANSLATION_PREFIX + 'CompareFromWithTo',
    [ValidatorsKeys.CompareToWithFrom]: ERRORS_TRANSLATION_PREFIX + 'CompareToWithFrom',
    [ValidatorsKeys.CompareDateFromWithTo]: ERRORS_TRANSLATION_PREFIX + 'compareDateFromWithTo',
    [ValidatorsKeys.CompareDateToWithFrom]: ERRORS_TRANSLATION_PREFIX + 'compareDateToWithFrom',
    [ValidatorsKeys.PasswordDoesNotMatchRequirements]: ERRORS_TRANSLATION_PREFIX + 'Password does not match requirements',
    [ValidatorsKeys.MaxDaysLimitExceeded]: ERRORS_TRANSLATION_PREFIX + 'MaxDaysLimitExceeded',
    [ValidatorsKeys.InvalidRange]: ERRORS_TRANSLATION_PREFIX + 'Invalid range',
};

const DEFAULT_ERROR_MESSAGE_CONFIG = new InjectionToken('DEFAULT_ERROR_MESSAGE_CONFIG');
const injectDefaultErrorMessageConfig = () => {
    const defaultErrorMessages = inject(DEFAULT_ERROR_MESSAGE_CONFIG, { optional: true });
    return defaultErrorMessages || VALIDATION_MESSAGES;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class BaseControl {
    /* isDisabled is used only for Storybook.
     * Please, avoid usages of this input parameter
     *  in the real application.
     * */
    set isDisabled(isDisabled) {
        this.setDisabledState(isDisabled);
    }
    set errorMessages(config) {
        if (config) {
            this.errorMessagesConfig = config;
        }
    }
    constructor() {
        this.label = '';
        this.tooltip = null;
        this.description = null;
        this.inputClass = null;
        this.isColored = false;
        this.controlSize = 'md';
        this.inputId = input(v7());
        this.errorMessagesConfig = injectDefaultErrorMessageConfig();
        this.ngControl = inject(NgControl, { optional: true });
        this.destroyRef = inject(DestroyRef);
        this.formBuilder = inject(FormBuilder);
        this.cdRef = inject(ChangeDetectorRef);
        this.control = this.initControl();
        this.cvaOnChange = () => { };
        this.cvaOnTouched = () => { };
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }
    get isInvalidControl() {
        return this.isInvalidNgControl && this.isTouchedNgControl;
    }
    get isTouchedNgControl() {
        return this.ngControl?.control?.touched || false;
    }
    get isInvalidNgControl() {
        return this.ngControl?.control?.invalid || false;
    }
    ngOnInit() {
        this.initControlListener();
    }
    ngDoCheck() {
        this.handleNgControlTouched();
    }
    registerOnChange(fn) {
        this.cvaOnChange = fn;
    }
    registerOnTouched(fn) {
        this.cvaOnTouched = fn;
    }
    writeValue(value) {
        this.control.setValue(value, { emitEvent: false });
        this.cdRef.markForCheck();
    }
    setDisabledState(isDisabled) {
        if (isDisabled) {
            this.control.disable({ emitEvent: false });
        }
        else {
            this.control.enable({ emitEvent: false });
        }
        this.cdRef.markForCheck();
    }
    initControlListener() {
        this.control.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((v) => {
            this.cvaOnChange(v);
        });
    }
    handleNgControlTouched() {
        if (this.ngControl?.errors !== this.control.errors || this.ngControl.touched !== this.control.touched) {
            this.control.setErrors(this.ngControl?.errors || null);
            this.cdRef.markForCheck();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: BaseControl, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "19.2.14", type: BaseControl, isStandalone: true, inputs: { isDisabled: { classPropertyName: "isDisabled", publicName: "isDisabled", isSignal: false, isRequired: false, transformFunction: null }, errorMessages: { classPropertyName: "errorMessages", publicName: "errorMessages", isSignal: false, isRequired: false, transformFunction: null }, label: { classPropertyName: "label", publicName: "label", isSignal: false, isRequired: false, transformFunction: null }, tooltip: { classPropertyName: "tooltip", publicName: "tooltip", isSignal: false, isRequired: false, transformFunction: null }, description: { classPropertyName: "description", publicName: "description", isSignal: false, isRequired: false, transformFunction: null }, inputClass: { classPropertyName: "inputClass", publicName: "inputClass", isSignal: false, isRequired: false, transformFunction: null }, isColored: { classPropertyName: "isColored", publicName: "isColored", isSignal: false, isRequired: false, transformFunction: null }, controlSize: { classPropertyName: "controlSize", publicName: "controlSize", isSignal: false, isRequired: false, transformFunction: null }, inputId: { classPropertyName: "inputId", publicName: "inputId", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: BaseControl, decorators: [{
            type: Directive
        }], ctorParameters: () => [], propDecorators: { isDisabled: [{
                type: Input
            }], errorMessages: [{
                type: Input
            }], label: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], description: [{
                type: Input
            }], inputClass: [{
                type: Input
            }], isColored: [{
                type: Input
            }], controlSize: [{
                type: Input
            }] } });

class SprLabelComponent {
    constructor() {
        this.inputId = null;
        this.tooltip = null;
        this.leftIcon = null;
        this.rightIcon = null;
        this.className = null;
        this.isLabelReverse = null;
        this.shouldStopLabelClickEventPropagation = false;
        this.isInline = false;
    }
    onLabelClick(event) {
        if (this.shouldStopLabelClickEventPropagation) {
            event.stopPropagation();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprLabelComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: SprLabelComponent, isStandalone: true, selector: "spr-label", inputs: { label: "label", inputId: "inputId", tooltip: "tooltip", leftIcon: "leftIcon", rightIcon: "rightIcon", className: "className", isLabelReverse: "isLabelReverse", shouldStopLabelClickEventPropagation: "shouldStopLabelClickEventPropagation", isInline: "isInline" }, host: { properties: { "class.label--inline": "this.isInline" } }, ngImport: i0, template: "<div\n  class=\"label-form-row\"\n  [class.label-form-row--reverse]=\"isLabelReverse\"\n  [ngClass]=\"className\">\n  <label\n    [attr.for]=\"inputId\"\n    class=\"label-container\"\n    (click)=\"onLabelClick($event)\">\n    <i\n      *ngIf=\"leftIcon\"\n      [class]=\"leftIcon\"></i>\n\n    <span\n      *ngIf=\"label\"\n      class=\"label-form\">\n      {{ label }}\n    </span>\n\n    <i\n      *ngIf=\"rightIcon\"\n      [class]=\"rightIcon\"></i>\n  </label>\n\n  <small\n    *ngIf=\"tooltip\"\n    [ngbTooltip]=\"tooltip\"\n    class=\"tooltip-container\"\n    container=\"body\"\n    [placement]=\"['auto']\"\n    tooltipClass=\"tooltip-container__body tooltip-white\">\n    <i class=\"bo-icon-general-info info-icon\"></i>\n  </small>\n</div>\n", styles: [".text-body-xxxl{font-size:var(--spr-font-size-32);line-height:var(--spr-line-height-40)}.text-body-xxl{font-size:var(--spr-font-size-24);line-height:var(--spr-line-height-32)}.text-body-xl{font-size:var(--spr-font-size-20);line-height:var(--spr-line-height-24)}.text-body-l{font-size:var(--spr-font-size-16);line-height:var(--spr-line-height-20)}.text-body-m{font-size:var(--spr-font-size-15);line-height:var(--spr-line-height-20)}.text-body-s{font-size:var(--spr-font-size-14);line-height:var(--spr-line-height-20)}.text-body-xs{font-size:var(--spr-font-size-12);line-height:var(--spr-line-height-16)}.text-body-xs-uppercase{font-size:var(--spr-font-size-13);line-height:var(--spr-line-height-20);text-transform:uppercase}:host:not(.label--inline){display:flex}:host.label--inline{display:inline-flex}:host.label-active .label-form{color:var(--brd-fill-accent-default-light)}.label-container{display:flex;align-items:center;gap:10px;flex:1;cursor:var(--spr-custom-label-cursor, default);pointer-events:var(--spr-custom-label-pointer-events, auto)}.label-form{font-size:var(--spr-font-size-14);line-height:var(--spr-line-height-20);font-weight:var(--spr-font-weight-regular);color:var(--spr-custom-label-color, rgb(var(--brd-gray-800)))}.label-form-row{display:flex;align-items:center;gap:10px;width:100%}.label-form-row:has(.label-form){margin-bottom:4px}.label-form-row--reverse,.label-form-row--reverse .label-container{flex-direction:row-reverse}:host-context(.radio-button-control,.checkbox-control,.switcher-control,.two-options-switcher-control) .label-form-row{margin:0}:host-context(.radio-button-control,.checkbox-control,.switcher-control,.two-options-switcher-control) .label-form{padding-right:0}.info-icon{font-size:var(--spr-font-size-16)}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgbTooltip, selector: "[ngbTooltip]", inputs: ["animation", "autoClose", "placement", "popperOptions", "triggers", "positionTarget", "container", "disableTooltip", "tooltipClass", "tooltipContext", "openDelay", "closeDelay", "ngbTooltip"], outputs: ["shown", "hidden"], exportAs: ["ngbTooltip"] }, { kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprLabelComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-label', changeDetection: ChangeDetectionStrategy.OnPush, imports: [NgIf, NgbTooltip, NgClass], template: "<div\n  class=\"label-form-row\"\n  [class.label-form-row--reverse]=\"isLabelReverse\"\n  [ngClass]=\"className\">\n  <label\n    [attr.for]=\"inputId\"\n    class=\"label-container\"\n    (click)=\"onLabelClick($event)\">\n    <i\n      *ngIf=\"leftIcon\"\n      [class]=\"leftIcon\"></i>\n\n    <span\n      *ngIf=\"label\"\n      class=\"label-form\">\n      {{ label }}\n    </span>\n\n    <i\n      *ngIf=\"rightIcon\"\n      [class]=\"rightIcon\"></i>\n  </label>\n\n  <small\n    *ngIf=\"tooltip\"\n    [ngbTooltip]=\"tooltip\"\n    class=\"tooltip-container\"\n    container=\"body\"\n    [placement]=\"['auto']\"\n    tooltipClass=\"tooltip-container__body tooltip-white\">\n    <i class=\"bo-icon-general-info info-icon\"></i>\n  </small>\n</div>\n", styles: [".text-body-xxxl{font-size:var(--spr-font-size-32);line-height:var(--spr-line-height-40)}.text-body-xxl{font-size:var(--spr-font-size-24);line-height:var(--spr-line-height-32)}.text-body-xl{font-size:var(--spr-font-size-20);line-height:var(--spr-line-height-24)}.text-body-l{font-size:var(--spr-font-size-16);line-height:var(--spr-line-height-20)}.text-body-m{font-size:var(--spr-font-size-15);line-height:var(--spr-line-height-20)}.text-body-s{font-size:var(--spr-font-size-14);line-height:var(--spr-line-height-20)}.text-body-xs{font-size:var(--spr-font-size-12);line-height:var(--spr-line-height-16)}.text-body-xs-uppercase{font-size:var(--spr-font-size-13);line-height:var(--spr-line-height-20);text-transform:uppercase}:host:not(.label--inline){display:flex}:host.label--inline{display:inline-flex}:host.label-active .label-form{color:var(--brd-fill-accent-default-light)}.label-container{display:flex;align-items:center;gap:10px;flex:1;cursor:var(--spr-custom-label-cursor, default);pointer-events:var(--spr-custom-label-pointer-events, auto)}.label-form{font-size:var(--spr-font-size-14);line-height:var(--spr-line-height-20);font-weight:var(--spr-font-weight-regular);color:var(--spr-custom-label-color, rgb(var(--brd-gray-800)))}.label-form-row{display:flex;align-items:center;gap:10px;width:100%}.label-form-row:has(.label-form){margin-bottom:4px}.label-form-row--reverse,.label-form-row--reverse .label-container{flex-direction:row-reverse}:host-context(.radio-button-control,.checkbox-control,.switcher-control,.two-options-switcher-control) .label-form-row{margin:0}:host-context(.radio-button-control,.checkbox-control,.switcher-control,.two-options-switcher-control) .label-form{padding-right:0}.info-icon{font-size:var(--spr-font-size-16)}\n"] }]
        }], propDecorators: { label: [{
                type: Input
            }], inputId: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], leftIcon: [{
                type: Input
            }], rightIcon: [{
                type: Input
            }], className: [{
                type: Input
            }], isLabelReverse: [{
                type: Input
            }], shouldStopLabelClickEventPropagation: [{
                type: Input
            }], isInline: [{
                type: HostBinding,
                args: ['class.label--inline']
            }, {
                type: Input
            }] } });

const DynamicPositions = {
    START: 'start',
    END: 'end',
    INSIDE_START: 'inside-start',
    INSIDE_END: 'inside-end',
};
class AbstractDynamicElement {
}

// This nodeType of comment element in html
const NODE_TYPE_COMMENT = 8;

class BaseDynamicElement extends AbstractDynamicElement {
    constructor(config) {
        super();
        this.elementClassName = config.className;
        this.elementPosition = config.position ?? DynamicPositions.START;
        this.elementContainer = config.container;
        this.defaultContainer = config.container;
        this.element = config.element;
        this.renderer = config.renderer;
    }
    get container() {
        return this.elementContainer;
    }
    get className() {
        return this.elementClassName;
    }
    get position() {
        return this.elementPosition;
    }
    set container(element) {
        if (this.elementContainer === element && this.elementPosition === this.elementResolvedPosition) {
            return;
        }
        if (!element && this.elementContainer === this.defaultContainer && this.elementPosition === this.elementResolvedPosition) {
            return;
        }
        this.elementContainer = element ?? this.defaultContainer;
        this.resolvePosition();
    }
    set dynamicClass(value) {
        const prevClass = this.className;
        this.elementClassName = value;
        if (!this.renderer || !this.element) {
            return;
        }
        if (prevClass) {
            this.removeClass(prevClass);
        }
        if (this.className) {
            this.addClass(this.className);
        }
    }
    updatePosition(position, container = this.container) {
        if (this.elementPosition === position) {
            return;
        }
        this.elementPosition = position;
        this.resolvePosition(container);
    }
    resolvePosition(container = this.container) {
        if (!container || !this.element) {
            return;
        }
        if (container?.nodeType === NODE_TYPE_COMMENT) {
            return;
        }
        this.insertToPosition(this.element, container, this.position);
        this.elementResolvedPosition = this.position;
    }
    updateClass() {
        if (!this.className) {
            return;
        }
        this.addClass(this.className);
    }
    destroy() {
        const parentElement = this.renderer.parentNode(this.element);
        this.renderer.removeChild(parentElement, this.element);
    }
    addClass(className) {
        if (!className || !this.element) {
            return;
        }
        this.renderer.addClass(this.element, className);
    }
    removeClass(className) {
        if (!className || !this.element) {
            return;
        }
        this.renderer.removeClass(this.element, className);
    }
    insertToPosition(element, container, position) {
        switch (position) {
            case DynamicPositions.START: {
                const parentElement = this.renderer.parentNode(container);
                this.renderer.insertBefore(parentElement, element, container);
                break;
            }
            case DynamicPositions.END: {
                const parentElement = this.renderer.parentNode(container);
                if (container.nextSibling) {
                    this.renderer.insertBefore(parentElement, element, container.nextSibling);
                }
                else {
                    this.renderer.appendChild(parentElement, element);
                }
                break;
            }
            case DynamicPositions.INSIDE_START: {
                this.renderer.insertBefore(container, element, container.firstChild);
                break;
            }
            case DynamicPositions.INSIDE_END: {
                this.renderer.appendChild(container, element);
                break;
            }
        }
    }
}

class SprDynamicBaseDirective {
    constructor() {
        this.dynamicElementsItems = [];
        this.viewContainerRef = inject(ViewContainerRef);
        this.templateRef = inject(TemplateRef, { optional: true });
        this.renderer = inject(Renderer2);
    }
    get dynamicElements() {
        return this.dynamicElementsItems;
    }
    clear() {
        this.viewContainerRef.clear();
    }
    addDynamicElement(element) {
        const newDynamicElement = new BaseDynamicElement({
            ...element,
            position: element.position ?? DynamicPositions.START,
            container: element.container ?? this.viewContainerRef.element.nativeElement,
            renderer: this.renderer,
        });
        this.dynamicElementsItems.push(newDynamicElement);
        return newDynamicElement;
    }
    removeDynamicElement(element) {
        element.destroy();
        const idx = this.dynamicElementsItems.findIndex((dEl) => dEl === element);
        this.dynamicElementsItems.splice(idx, 1);
        this.dynamicElementsItems = [...this.dynamicElementsItems];
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprDynamicBaseDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: SprDynamicBaseDirective, isStandalone: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprDynamicBaseDirective, decorators: [{
            type: Directive
        }] });

class SprDynamicComponentDirective extends SprDynamicBaseDirective {
    constructor() {
        super(...arguments);
        this.dynamicComponentInjector = this.viewContainerRef.injector;
        this.cdRef = inject(ChangeDetectorRef);
        this.ngModuleRef = inject(NgModuleRef);
    }
    set sprDynamicComponentPosition(value) {
        if (this.componentPosition === value) {
            return;
        }
        this.componentPosition = value;
        this.dElement?.updatePosition(value);
    }
    set sprDynamicComponentCustomContainer(value) {
        if (!this.dElement) {
            return;
        }
        const element = value instanceof ElementRef ? value.nativeElement : value;
        if (this.dElement.container === element) {
            return;
        }
        this.componentContainer = element;
        this.dElement.container = element;
    }
    set sprDynamicComponentClass(value) {
        if (!this.dElement) {
            return;
        }
        if (value) {
            this.dElement.dynamicClass = value;
        }
    }
    set sprDynamicComponent(value) {
        this.dComponentType = value;
        if (!this.dComponentType) {
            return;
        }
        this.createOneComponent();
        // For case when we use this directive as StructuralDirective we need to create embedded view
        // But in attribute directive we don't have templateRef
        this.viewRef = this.templateRef ? this.viewContainerRef.createEmbeddedView(this.templateRef) : null;
        // Insert our new component to selected position
        this.dElement?.resolvePosition();
        // Add custom class for our component
        if (this.dElement && this.sprDynamicComponentClass) {
            this.dElement.dynamicClass = this.sprDynamicComponentClass;
        }
        this.cdRef.markForCheck();
    }
    get componentType() {
        return this.dComponentType;
    }
    get dynamicElement() {
        return this.dElement;
    }
    get componentRef() {
        return this.ref;
    }
    get sprDynamicComponentClass() {
        return this.dElement?.dynamicClass;
    }
    destroy() {
        if (this.componentRef) {
            this.componentRef.destroy();
        }
        if (this.dynamicElement) {
            this.removeDynamicElement(this.dynamicElement);
        }
        this.ref = undefined;
    }
    createComponent(config) {
        const componentType = config?.type ?? this.componentType;
        if (!componentType) {
            console.error('Dynamic component type is not set.');
            return null;
        }
        const componentRef = this.viewContainerRef.createComponent(componentType, {
            injector: config?.injector ?? this.dynamicComponentInjector,
            ngModuleRef: this.ngModuleRef,
        });
        const dynamicElement = this.addDynamicElement({
            element: componentRef?.location.nativeElement,
            position: config?.position ?? this.componentPosition,
            className: config?.className ?? this.componentClass,
            container: config?.container ?? this.componentContainer,
        });
        // Add _ng-content-* attribute to make it visible for styles
        this.addNgContentAttribute(dynamicElement.element);
        const destroy = () => this.removeDynamicElement(dynamicElement);
        return { componentRef, dynamicElement, destroy };
    }
    createOneComponent(config) {
        const result = this.createComponent(config);
        if (config) {
            this.configureManually(config);
        }
        if (result) {
            this.ref = result.componentRef;
            this.dElement = result.dynamicElement;
        }
    }
    configureManually(config) {
        const { type, position, className, container } = config;
        this.dComponentType = type;
        if (position) {
            this.componentPosition = position;
        }
        if (className) {
            this.componentClass = className;
        }
        if (container) {
            this.componentContainer = container;
        }
        this.cdRef.markForCheck();
    }
    addNgContentAttribute(element) {
        /*
         * according to issue https://github.com/angular/angular/issues/12215
         * We need this code to add _ngcontent-***-c*** to dynamically created component,
         * otherwise it won't work with incapsulated css.
         */
        const div = this.renderer.createElement('div');
        const contentAttr = div.attributes?.[0]?.name;
        if (!contentAttr) {
            return;
        }
        this.renderer.setAttribute(element, contentAttr, '');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprDynamicComponentDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: SprDynamicComponentDirective, isStandalone: true, selector: "[sprDynamicComponent]", inputs: { sprDynamicComponentPosition: "sprDynamicComponentPosition", sprDynamicComponentCustomContainer: "sprDynamicComponentCustomContainer", sprDynamicComponentClass: "sprDynamicComponentClass", sprDynamicComponent: "sprDynamicComponent", dynamicComponentInjector: "dynamicComponentInjector" }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprDynamicComponentDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[sprDynamicComponent]',
                    standalone: true,
                }]
        }], propDecorators: { sprDynamicComponentPosition: [{
                type: Input
            }], sprDynamicComponentCustomContainer: [{
                type: Input
            }], sprDynamicComponentClass: [{
                type: Input
            }], sprDynamicComponent: [{
                type: Input
            }], dynamicComponentInjector: [{
                type: Input
            }] } });

class SprDynamicElementDirective extends SprDynamicBaseDirective {
    constructor() {
        super(...arguments);
        this.dElementPosition = DynamicPositions.START;
    }
    set sprDynamicElementId(value) {
        this.dElementId = value;
        if (this.dElement && !this.dElementId) {
            this.removeId(this.dElement.element);
            return;
        }
        if (this.dElement && this.dElementId) {
            this.setId(this.dElement.element, this.dElementId);
        }
    }
    set sprDynamicElementPosition(value) {
        if (this.dElementPosition === value) {
            return;
        }
        this.dElementPosition = value;
        this.dElement?.updatePosition(value);
    }
    set sprDynamicElementClass(value) {
        if (!this.dElement) {
            return;
        }
        if (value) {
            this.dElement.dynamicClass = value;
        }
    }
    set sprDynamicElementName(value) {
        if (this.dElementName === value && this.dElement) {
            return;
        }
        this.dElementName = value;
        this.createElement();
        // Resolve element position according to set position
        this.dElement.resolvePosition();
        if (this.dElement && this.dElementContent) {
            this.setContent(this.dElement.element, this.dElementContent);
        }
    }
    set sprDynamicElementContent(value) {
        if (!this.dElement || this.dElement.element?.textContent === value) {
            return;
        }
        this.dElementContent = value;
        this.setContent(this.dElement.element, this.dElementContent);
    }
    set sprDynamicElementCustomContainer(value) {
        if (!this.dElement) {
            return;
        }
        const element = value instanceof ElementRef ? value.nativeElement : value;
        if (this.dElement.container === element) {
            return;
        }
        this.dElementContainer = element;
        this.dElement.container = element;
    }
    get sprDynamicElementName() {
        return this.dElementName;
    }
    get dynamicElement() {
        return this.dElement;
    }
    get position() {
        return this.dElementPosition;
    }
    configureManually(config) {
        const { id, elementName, position, content, className, container } = config;
        if (!elementName) {
            console.error('Dynamic element name is required');
            return;
        }
        this.dElementName = elementName;
        if (id) {
            this.dElementId = id;
        }
        if (position) {
            this.dElementPosition = position;
        }
        if (content) {
            this.dElementContent = content;
        }
        if (container) {
            this.dElementContainer = container;
        }
        if (className) {
            this.sprDynamicElementClass = className;
        }
    }
    setContent(el, value) {
        if (value && typeof value === 'string') {
            this.setTextContent(el, value);
        }
        if (value && value instanceof TemplateRef) {
            this.setTempateContent(el, value);
        }
    }
    setId(el, value) {
        this.renderer.setAttribute(el, 'id', value);
    }
    removeId(el) {
        this.renderer.removeAttribute(el, 'id');
    }
    setFor(el, value) {
        this.renderer.setAttribute(el, 'for', value);
    }
    setTextContent(el, value) {
        this.renderer.setProperty(el, 'textContent', value);
    }
    setTempateContent(el, value) {
        const template = this.viewContainerRef.createEmbeddedView(value);
        for (const node of template.rootNodes) {
            this.renderer.appendChild(el, node);
        }
    }
    createElement() {
        const temporaryElement = this.renderer.createElement(this.dElementName);
        if (this.dElementId) {
            this.setId(temporaryElement, this.dElementId);
        }
        if (this.dElementContent) {
            this.setContent(temporaryElement, this.dElementContent);
        }
        this.dElement = this.addDynamicElement({
            element: temporaryElement,
            position: this.dElementPosition,
            container: this.dElementContainer,
        });
        return this.dElement.element;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprDynamicElementDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: SprDynamicElementDirective, isStandalone: true, selector: "[sprDynamicElement]", inputs: { sprDynamicElementId: "sprDynamicElementId", sprDynamicElementPosition: "sprDynamicElementPosition", sprDynamicElementClass: "sprDynamicElementClass", sprDynamicElementName: "sprDynamicElementName", sprDynamicElementContent: "sprDynamicElementContent", sprDynamicElementCustomContainer: "sprDynamicElementCustomContainer", inputId: "inputId" }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprDynamicElementDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[sprDynamicElement]',
                    standalone: true,
                }]
        }], propDecorators: { sprDynamicElementId: [{
                type: Input
            }], sprDynamicElementPosition: [{
                type: Input
            }], sprDynamicElementClass: [{
                type: Input
            }], sprDynamicElementName: [{
                type: Input
            }], sprDynamicElementContent: [{
                type: Input
            }], sprDynamicElementCustomContainer: [{
                type: Input
            }], inputId: [{
                type: Input
            }] } });

class SprLabelDirective extends SprDynamicComponentDirective {
    set shouldStopLabelClickEventPropagation(value) {
        if (this.componentRef) {
            this.componentRef.setInput('shouldStopLabelClickEventPropagation', Boolean(value));
        }
    }
    set sprLabel(value) {
        this.label = value;
        if (!value) {
            this.destroy();
            return;
        }
        if (this.dynamicElement && this.componentRef) {
            this.componentRef.setInput('label', this.label);
            return;
        }
        this.createOneComponent({
            type: SprLabelComponent,
        });
        if (this.dynamicElement) {
            this.dynamicElement.resolvePosition();
        }
        if (this.labelClass) {
            this.sprDynamicComponentClass = this.labelClass;
        }
        this.updateSprLabelComponentValues();
    }
    set sprLabelPosition(value) {
        this.sprDynamicComponentPosition = value;
    }
    set sprLabelClass(value) {
        this.labelClass = value;
        this.sprDynamicComponentClass = this.labelClass;
    }
    set sprLabelIsInline(value) {
        this.isInline = value;
        if (!this.dynamicElement || !this.componentRef) {
            return;
        }
        this.componentRef.setInput('isInline', this.isInline);
    }
    set sprLabelLeftIcon(value) {
        this.leftIcon = value;
        if (!this.componentRef) {
            return;
        }
        this.componentRef.setInput('leftIcon', this.leftIcon);
    }
    set sprLabelRightIcon(value) {
        this.rightIcon = value;
        if (!this.componentRef) {
            return;
        }
        this.componentRef.setInput('rightIcon', this.rightIcon);
    }
    set tooltip(value) {
        if (this.labelIconTooltip === value || !this.componentRef) {
            return;
        }
        this.labelIconTooltip = value;
        this.componentRef.setInput('tooltip', this.labelIconTooltip);
    }
    set inputId(value) {
        this.labelInputId = value;
        if (!this.dynamicElement || !this.componentRef) {
            return;
        }
        this.componentRef.setInput('inputId', this.labelInputId);
    }
    updateSprLabelComponentValues() {
        if (!this.componentRef) {
            return;
        }
        this.componentRef.setInput('label', this.label ?? '');
        this.componentRef.setInput('leftIcon', this.leftIcon);
        this.componentRef.setInput('rightIcon', this.rightIcon);
        this.componentRef.setInput('isInline', this.isInline || false);
        this.componentRef.setInput('inputId', this.labelInputId);
        this.componentRef.setInput('tooltip', this.labelIconTooltip);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprLabelDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: SprLabelDirective, isStandalone: true, selector: "[sprLabel]", inputs: { shouldStopLabelClickEventPropagation: "shouldStopLabelClickEventPropagation", sprLabel: "sprLabel", sprLabelPosition: "sprLabelPosition", sprLabelClass: "sprLabelClass", sprLabelIsInline: "sprLabelIsInline", sprLabelLeftIcon: "sprLabelLeftIcon", sprLabelRightIcon: "sprLabelRightIcon", tooltip: "tooltip", inputId: "inputId" }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprLabelDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[sprLabel]',
                    standalone: true,
                }]
        }], propDecorators: { shouldStopLabelClickEventPropagation: [{
                type: Input
            }], sprLabel: [{
                type: Input
            }], sprLabelPosition: [{
                type: Input
            }], sprLabelClass: [{
                type: Input
            }], sprLabelIsInline: [{
                type: Input
            }], sprLabelLeftIcon: [{
                type: Input
            }], sprLabelRightIcon: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], inputId: [{
                type: Input
            }] } });

class SprLabelContainerDirective {
    constructor() {
        this.elementRef = inject(ElementRef);
        this.cdRef = inject(ChangeDetectorRef);
        this.sprLabelDirective = inject(SprLabelDirective, { optional: true, skipSelf: true });
    }
    set sprLabelDefaultPosition(value) {
        if (!this.sprLabelDirective) {
            return;
        }
        this.sprLabelDirective.sprLabelPosition = value;
        this.sprLabelDirective.dynamicElement?.resolvePosition();
        this.cdRef.markForCheck();
    }
    set sprLabelDefaultClass(value) {
        if (!this.sprLabelDirective) {
            return;
        }
        this.sprLabelDirective.sprLabelClass = value;
        this.cdRef.markForCheck();
    }
    ngAfterViewInit() {
        if (!this.sprLabelDirective) {
            return;
        }
        this.sprLabelDirective.sprDynamicComponentCustomContainer = this.elementRef.nativeElement;
        this.sprLabelDirective.dynamicElement?.resolvePosition();
        this.sprLabelDirective.dynamicElement?.updateClass();
        this.cdRef.markForCheck();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprLabelContainerDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: SprLabelContainerDirective, isStandalone: true, selector: "[sprLabelContainer]", inputs: { sprLabelDefaultPosition: "sprLabelDefaultPosition", sprLabelDefaultClass: "sprLabelDefaultClass" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprLabelContainerDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[sprLabelContainer]', standalone: true }]
        }], propDecorators: { sprLabelDefaultPosition: [{
                type: Input
            }], sprLabelDefaultClass: [{
                type: Input
            }] } });

const SPR_LABEL = {
    directive: SprLabelDirective,
    inputs: [
        'inputId',
        'tooltip',
        'sprLabel: label',
        'sprLabelIsInline: labelIsInline',
        'sprLabelClass: labelClass',
        'sprLabelPosition: labelPosition',
        'sprLabelLeftIcon: labelLeftIcon',
        'sprLabelRightIcon: labelRightIcon',
    ],
};

class SprCheckboxComponent extends BaseControl {
    constructor() {
        super(...arguments);
        this.isPartiallyChecked = false;
        this.isLabelReverse = false;
        this.isDecorated = false;
        this.isInline = false;
        this.shouldStopLabelClickEventPropagation = false;
        // Inputs for checkbox tooltip
        this.tooltipClass = '';
        this.checkboxTooltip = '';
        this.tooltipPlacement = 'auto';
    }
    initControl() {
        return this.formBuilder.nonNullable.control(false);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprCheckboxComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: SprCheckboxComponent, isStandalone: true, selector: "spr-checkbox", inputs: { isPartiallyChecked: "isPartiallyChecked", isLabelReverse: "isLabelReverse", isDecorated: "isDecorated", isInline: "isInline", rightIcon: "rightIcon", leftIcon: "leftIcon", shouldStopLabelClickEventPropagation: "shouldStopLabelClickEventPropagation", tooltipClass: "tooltipClass", checkboxTooltip: "checkboxTooltip", tooltipPlacement: "tooltipPlacement" }, usesInheritance: true, ngImport: i0, template: "<div\n  class=\"checkbox-control\"\n  [class.disabled]=\"control.disabled\"\n  [class.checkbox-control--decorated]=\"isDecorated\">\n  <div class=\"checkbox-control__holder\">\n    <input\n      class=\"form-checkbox\"\n      type=\"checkbox\"\n      [class.partially-checked]=\"isPartiallyChecked\"\n      [formControl]=\"control\"\n      (blur)=\"cvaOnTouched()\"\n      ngDefaultControl\n      [attr.name]=\"inputId()\"\n      [attr.id]=\"inputId()\"\n      [sprLabel]=\"label\"\n      [sprLabelPosition]=\"isLabelReverse ? 'start' : 'end'\"\n      [sprLabelLeftIcon]=\"leftIcon\"\n      [sprLabelRightIcon]=\"rightIcon\"\n      [sprLabelIsInline]=\"isInline\"\n      [inputId]=\"inputId()\"\n      [tooltip]=\"tooltip\"\n      [shouldStopLabelClickEventPropagation]=\"shouldStopLabelClickEventPropagation\"\n      container=\"body\"\n      [tooltipClass]=\"tooltipClass\"\n      [placement]=\"tooltipPlacement\"\n      [ngbTooltip]=\"checkboxTooltip\"\n      sprLabelClass=\"checkbox-control__label\" />\n    <ng-content></ng-content>\n  </div>\n</div>\n", styles: [":host{display:block;line-height:1}.checkbox-control{--spr-checkbox-control-decorated-background: var(--brd-fill-default-200);--spr-checkbox-control-decorated-border-color: var(--brd-border-default-300);--spr-custom-label-cursor: pointer;border:1px solid var(--spr-checkbox-control-border-color, none);background:var(--spr-checkbox-control-background, transparent)}.checkbox-control.disabled{--spr-custom-lable-cursor: default;--spr-custom-label-pointer-events: none}.checkbox-control--decorated{--spr-checkbox-control-background: var(--spr-checkbox-control-decorated-background);--spr-checkbox-control-border-color: var(--spr-checkbox-control-decorated-border-color);border-radius:var(--spr-border-radius-m);padding:11px}.form-checkbox{--spr-checkbox-background: var(--brd-fill-default-0);--spr-checkbox-background-disabled: var(--brd-fill-disabled-200);--spr-checkbox-background-checked: var(--brd-fill-accent-default-light);--spr-checkbox-background-checked-hover: var(--brd-fill-accent-hover-base);--spr-checkbox-background-checked-disabled: var(--brd-fill-accent-disabled);--spr-checkbox-box-shadow: 0 1px 2px 0 rgb(var(--brd-black) / .05);--spr-checkbox-box-shadow-focus: 0 0 0 4px var(--brd-fill-accent-focus);--spr-checkbox-box-shadow-disabled: none;--spr-checkbox-border-color: var(--brd-border-default-500);--spr-checkbox-border-color-hover: var(--brd-fill-accent-hover-base);--spr-checkbox-border-color-checked: transparent;--spr-checkbox-border-color-disabled: var(--brd-border-disabled-500);--spr-checkbox-icon-color: var(--brd-fill-default-0);--spr-checkbox-icon-color-hover: var(--brd-fill-hover-100);position:relative;width:20px;height:20px;border-radius:var(--spr-border-radius-xs);cursor:pointer;appearance:none}.form-checkbox:hover:not(:checked){--spr-checkbox-border-color: var(--spr-checkbox-border-color-hover)}.form-checkbox:hover:not(:checked):before{--spr-checkbox-icon-color: var(--spr-checkbox-icon-color-hover)}.form-checkbox:active:after{--spr-checkbox-background: var(--spr-checkbox-background-checked);--spr-checkbox-border-color: var(--spr-checkbox-border-color-checked)}.form-checkbox:focus-visible{box-shadow:none;outline:none}.form-checkbox:focus-visible:after{box-shadow:var(--spr-checkbox-box-shadow-focus)}.form-checkbox.partially-checked:checked:before{top:50%;transform:translateY(-50%);height:2px;border:none;background:var(--spr-checkbox-icon-color)}.form-checkbox:checked:after{--spr-checkbox-background: var(--spr-checkbox-background-checked);--spr-checkbox-border-color: var(--spr-checkbox-border-color-checked)}.form-checkbox:checked:hover:after{--spr-checkbox-background: var(--spr-checkbox-background-checked-hover)}.form-checkbox.disabled:after,.form-checkbox:disabled:after{--spr-checkbox-background: var(--spr-checkbox-background-disabled);--spr-checkbox-box-shadow: var(--spr-checkbox-box-shadow-disabled);--spr-checkbox-border-color: var(--spr-checkbox-border-color-disabled)}.form-checkbox.disabled:checked:after,.form-checkbox:disabled:checked:after{--spr-checkbox-background: var(--spr-checkbox-background-checked-disabled)}.form-checkbox.disabled:not(:checked):before,.form-checkbox:disabled:not(:checked):before{display:none}.form-checkbox:after{position:absolute;inset:0;z-index:1;content:\"\";border:1px solid var(--spr-checkbox-border-color);border-radius:var(--spr-border-radius-xs);background:var(--spr-checkbox-background);box-shadow:var(--spr-checkbox-box-shadow);transition:background var(--spr-transition-time),border-color var(--spr-transition-time)}.form-checkbox:before{position:absolute;top:6px;left:5px;z-index:2;content:\"\";width:10px;height:6px;border-width:0 0 2px 2px;border-style:solid;border-color:var(--spr-checkbox-icon-color);transform:rotate(-45deg);transition:border-color var(--spr-transition-time)}.checkbox-control__holder{display:flex;align-items:center;width:100%}.checkbox-control__holder:has(.checkbox-control__label){gap:8px}.checkbox-control__holder:has(.checkbox-control__label):not(:has(.label--inline)) .checkbox-control__label{flex:1}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: SprLabelDirective, selector: "[sprLabel]", inputs: ["shouldStopLabelClickEventPropagation", "sprLabel", "sprLabelPosition", "sprLabelClass", "sprLabelIsInline", "sprLabelLeftIcon", "sprLabelRightIcon", "tooltip", "inputId"] }, { kind: "directive", type: NgbTooltip, selector: "[ngbTooltip]", inputs: ["animation", "autoClose", "placement", "popperOptions", "triggers", "positionTarget", "container", "disableTooltip", "tooltipClass", "tooltipContext", "openDelay", "closeDelay", "ngbTooltip"], outputs: ["shown", "hidden"], exportAs: ["ngbTooltip"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprCheckboxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-checkbox', imports: [CommonModule, ReactiveFormsModule, SprLabelDirective, NgbTooltip], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"checkbox-control\"\n  [class.disabled]=\"control.disabled\"\n  [class.checkbox-control--decorated]=\"isDecorated\">\n  <div class=\"checkbox-control__holder\">\n    <input\n      class=\"form-checkbox\"\n      type=\"checkbox\"\n      [class.partially-checked]=\"isPartiallyChecked\"\n      [formControl]=\"control\"\n      (blur)=\"cvaOnTouched()\"\n      ngDefaultControl\n      [attr.name]=\"inputId()\"\n      [attr.id]=\"inputId()\"\n      [sprLabel]=\"label\"\n      [sprLabelPosition]=\"isLabelReverse ? 'start' : 'end'\"\n      [sprLabelLeftIcon]=\"leftIcon\"\n      [sprLabelRightIcon]=\"rightIcon\"\n      [sprLabelIsInline]=\"isInline\"\n      [inputId]=\"inputId()\"\n      [tooltip]=\"tooltip\"\n      [shouldStopLabelClickEventPropagation]=\"shouldStopLabelClickEventPropagation\"\n      container=\"body\"\n      [tooltipClass]=\"tooltipClass\"\n      [placement]=\"tooltipPlacement\"\n      [ngbTooltip]=\"checkboxTooltip\"\n      sprLabelClass=\"checkbox-control__label\" />\n    <ng-content></ng-content>\n  </div>\n</div>\n", styles: [":host{display:block;line-height:1}.checkbox-control{--spr-checkbox-control-decorated-background: var(--brd-fill-default-200);--spr-checkbox-control-decorated-border-color: var(--brd-border-default-300);--spr-custom-label-cursor: pointer;border:1px solid var(--spr-checkbox-control-border-color, none);background:var(--spr-checkbox-control-background, transparent)}.checkbox-control.disabled{--spr-custom-lable-cursor: default;--spr-custom-label-pointer-events: none}.checkbox-control--decorated{--spr-checkbox-control-background: var(--spr-checkbox-control-decorated-background);--spr-checkbox-control-border-color: var(--spr-checkbox-control-decorated-border-color);border-radius:var(--spr-border-radius-m);padding:11px}.form-checkbox{--spr-checkbox-background: var(--brd-fill-default-0);--spr-checkbox-background-disabled: var(--brd-fill-disabled-200);--spr-checkbox-background-checked: var(--brd-fill-accent-default-light);--spr-checkbox-background-checked-hover: var(--brd-fill-accent-hover-base);--spr-checkbox-background-checked-disabled: var(--brd-fill-accent-disabled);--spr-checkbox-box-shadow: 0 1px 2px 0 rgb(var(--brd-black) / .05);--spr-checkbox-box-shadow-focus: 0 0 0 4px var(--brd-fill-accent-focus);--spr-checkbox-box-shadow-disabled: none;--spr-checkbox-border-color: var(--brd-border-default-500);--spr-checkbox-border-color-hover: var(--brd-fill-accent-hover-base);--spr-checkbox-border-color-checked: transparent;--spr-checkbox-border-color-disabled: var(--brd-border-disabled-500);--spr-checkbox-icon-color: var(--brd-fill-default-0);--spr-checkbox-icon-color-hover: var(--brd-fill-hover-100);position:relative;width:20px;height:20px;border-radius:var(--spr-border-radius-xs);cursor:pointer;appearance:none}.form-checkbox:hover:not(:checked){--spr-checkbox-border-color: var(--spr-checkbox-border-color-hover)}.form-checkbox:hover:not(:checked):before{--spr-checkbox-icon-color: var(--spr-checkbox-icon-color-hover)}.form-checkbox:active:after{--spr-checkbox-background: var(--spr-checkbox-background-checked);--spr-checkbox-border-color: var(--spr-checkbox-border-color-checked)}.form-checkbox:focus-visible{box-shadow:none;outline:none}.form-checkbox:focus-visible:after{box-shadow:var(--spr-checkbox-box-shadow-focus)}.form-checkbox.partially-checked:checked:before{top:50%;transform:translateY(-50%);height:2px;border:none;background:var(--spr-checkbox-icon-color)}.form-checkbox:checked:after{--spr-checkbox-background: var(--spr-checkbox-background-checked);--spr-checkbox-border-color: var(--spr-checkbox-border-color-checked)}.form-checkbox:checked:hover:after{--spr-checkbox-background: var(--spr-checkbox-background-checked-hover)}.form-checkbox.disabled:after,.form-checkbox:disabled:after{--spr-checkbox-background: var(--spr-checkbox-background-disabled);--spr-checkbox-box-shadow: var(--spr-checkbox-box-shadow-disabled);--spr-checkbox-border-color: var(--spr-checkbox-border-color-disabled)}.form-checkbox.disabled:checked:after,.form-checkbox:disabled:checked:after{--spr-checkbox-background: var(--spr-checkbox-background-checked-disabled)}.form-checkbox.disabled:not(:checked):before,.form-checkbox:disabled:not(:checked):before{display:none}.form-checkbox:after{position:absolute;inset:0;z-index:1;content:\"\";border:1px solid var(--spr-checkbox-border-color);border-radius:var(--spr-border-radius-xs);background:var(--spr-checkbox-background);box-shadow:var(--spr-checkbox-box-shadow);transition:background var(--spr-transition-time),border-color var(--spr-transition-time)}.form-checkbox:before{position:absolute;top:6px;left:5px;z-index:2;content:\"\";width:10px;height:6px;border-width:0 0 2px 2px;border-style:solid;border-color:var(--spr-checkbox-icon-color);transform:rotate(-45deg);transition:border-color var(--spr-transition-time)}.checkbox-control__holder{display:flex;align-items:center;width:100%}.checkbox-control__holder:has(.checkbox-control__label){gap:8px}.checkbox-control__holder:has(.checkbox-control__label):not(:has(.label--inline)) .checkbox-control__label{flex:1}\n"] }]
        }], propDecorators: { isPartiallyChecked: [{
                type: Input
            }], isLabelReverse: [{
                type: Input
            }], isDecorated: [{
                type: Input
            }], isInline: [{
                type: Input
            }], rightIcon: [{
                type: Input
            }], leftIcon: [{
                type: Input
            }], shouldStopLabelClickEventPropagation: [{
                type: Input
            }], tooltipClass: [{
                type: Input
            }], checkboxTooltip: [{
                type: Input
            }], tooltipPlacement: [{
                type: Input
            }] } });

class SprChipsComponent {
    constructor() {
        this.variant = 'gray';
        this.size = 'md';
        this.chipsStyle = 'filled';
        this.isInteractive = false;
        this.isDisabled = false;
        this.isSelected = false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprChipsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: SprChipsComponent, isStandalone: true, selector: "spr-chips", inputs: { variant: "variant", size: "size", chipsStyle: "chipsStyle", isInteractive: "isInteractive", isDisabled: "isDisabled", isSelected: "isSelected" }, ngImport: i0, template: "<button\n  *ngIf=\"isInteractive\"\n  class=\"chips\"\n  [disabled]=\"isDisabled\"\n  [ngClass]=\"'chips--' + variant + ' ' + 'chips--' + size + ' ' + 'chips--' + chipsStyle\"\n  [class.chips--selected]=\"isSelected\">\n  <ng-container *ngTemplateOutlet=\"ngContainerTemplate\"></ng-container>\n</button>\n\n<span\n  *ngIf=\"!isInteractive\"\n  class=\"chips\"\n  [class]=\"'chips--' + variant + ' ' + 'chips--' + size + ' ' + 'chips--' + chipsStyle\"\n  [class.chips--selected]=\"isSelected\">\n  <ng-container *ngTemplateOutlet=\"ngContainerTemplate\"></ng-container>\n</span>\n\n<ng-template #ngContainerTemplate>\n  <ng-content></ng-content>\n</ng-template>\n", styles: [":host{display:block}.chips{display:inline-flex;align-items:center;justify-content:center;gap:4px;padding:var(--spr-chips-padding-block, 5px) var(--spr-chips-padding-inline, 7px);width:fit-content;min-width:var(--brd-chips-custom-width, 60px);max-height:var(--spr-chips-max-height, 32px);font-size:var(--spr-chips-font-size, 14px);line-height:var(--spr-chips-line-height, 20px);font-weight:400;color:var(--spr-chips-color, inherit);background:var(--spr-chips-background, transparent);border:1px solid var(--spr-chips-border-color, transparent);border-radius:var(--spr-border-radius-pill);box-shadow:var(--spr-chips-box-shadow, none);white-space:nowrap;transition:background var(--spr-transition-time) ease,border-color var(--spr-transition-time) ease}.chips:focus-visible{--spr-chips-box-shadow: 0 0 0 2px rgb(var(--brd-black) / .08);outline:none}.chips:disabled{--spr-chips-color: var(--spr-chips-color-disabled, var(--spr-chips-color));--spr-chips-border-color: var(--spr-chips-border-color-disabled, transparent);pointer-events:none}.chips--selected{--spr-chips-background: var(--spr-chips-background-selected, transparent);--spr-chips-border-color: var(--spr-chips-border-color-selected, transparent);--spr-chips-box-shadow: 0 0 0 2px rgb(var(--brd-black) / .14)}.chips ::ng-deep .icon{width:var(--spr-chips-icon-width, 16px)}.chips ::ng-deep .icon svg{width:var(--spr-chips-icon-width, 16px)}.chips--sm{--spr-chips-padding-block: 3px;--spr-chips-padding-inline: 7px;--spr-chips-font-size: 12px;--spr-chips-line-height: 16px;--spr-chips-max-height: 24px;--spr-chips-icon-width: 12px}.chips--md{--spr-chips-padding-block: 5px;--spr-chips-padding-inline: 7px;--spr-chips-font-size: 14px;--spr-chips-line-height: 20px;--spr-chips-max-height: 32px;--spr-chips-icon-width: 16px}.chips--filled{--spr-chips-border-color: var(--spr-chips-filled-border-color);--spr-chips-background: var(--spr-chips-filled-background)}.chips--outline{--spr-chips-border-color: var(--spr-chips-outline-border-color);--spr-chips-background: var(--spr-chips-outline-background)}button.chips.chips--filled:hover{--spr-chips-background: var(--spr-chips-filled-background-hover)}button.chips.chips--filled:active,button.chips.chips--filled:focus-visible{--spr-chips-background: var(--spr-chips-filled-background-active)}button.chips.chips--filled:disabled{--spr-chips-color: var(--spr-chips-color-disabled);--spr-chips-background: var(--spr-chips-filled-background-disabled)}button.chips.chips--filled.chips--selected{--spr-chips-background: var(--spr-chips-filled-background-selected);--spr-chips-border-color: var(--spr-chips-filled-border-color-selected)}button.chips.chips--outline:hover{--spr-chips-background: var(--spr-chips-outline-background-hover)}button.chips.chips--outline:active,button.chips.chips--outline:focus-visible{--spr-chips-background: var(--spr-chips-outline-background-active)}button.chips.chips--outline:disabled{--spr-chips-color: var(--spr-chips-color-disabled);--spr-chips-border-color: var(--spr-chips-outline-border-color-disabled)}button.chips.chips--outline.chips--selected{--spr-chips-background: var(--spr-chips-outline-background-selected);--spr-chips-border-color: var(--spr-chips-outline-border-color-selected)}.chips--gray{--spr-chips-color: rgb(var(--brd-gray-700));--spr-chips-color-disabled: rgb(var(--brd-gray-400));--spr-chips-filled-border-color: transparent;--spr-chips-filled-border-color-selected: rgb(var(--brd-gray-600));--spr-chips-filled-background: rgb(var(--brd-gray-200));--spr-chips-filled-background-hover: rgb(var(--brd-gray-250));--spr-chips-filled-background-active: rgb(var(--brd-gray-250));--spr-chips-filled-background-disabled: rgb(var(--brd-gray-50));--spr-chips-filled-background-selected: rgb(var(--brd-gray-250));--spr-chips-outline-border-color: rgb(var(--brd-gray-500));--spr-chips-outline-border-color-disabled: rgb(var(--brd-gray-200));--spr-chips-outline-border-color-selected: rgb(var(--brd-gray-600));--spr-chips-outline-background: transparent;--spr-chips-outline-background-hover: rgb(var(--brd-gray-100));--spr-chips-outline-background-active: rgb(var(--brd-gray-100));--spr-chips-outline-background-selected: rgb(var(--brd-gray-100))}.chips--olive{--spr-chips-color: rgb(var(--brd-olive-900));--spr-chips-color-disabled: rgb(var(--brd-olive-400));--spr-chips-filled-border-color: transparent;--spr-chips-filled-border-color-selected: rgb(var(--brd-olive-700));--spr-chips-filled-background: rgb(var(--brd-olive-100));--spr-chips-filled-background-hover: rgb(var(--brd-olive-200));--spr-chips-filled-background-active: rgb(var(--brd-olive-200));--spr-chips-filled-background-disabled: rgb(var(--brd-olive-50));--spr-chips-filled-background-selected: rgb(var(--brd-olive-200));--spr-chips-outline-border-color: rgb(var(--brd-olive-700));--spr-chips-outline-border-color-disabled: rgb(var(--brd-olive-100));--spr-chips-outline-border-color-selected: rgb(var(--brd-olive-700));--spr-chips-outline-background: transparent;--spr-chips-outline-background-hover: rgb(var(--brd-olive-50));--spr-chips-outline-background-active: rgb(var(--brd-olive-50));--spr-chips-outline-background-selected: rgb(var(--brd-olive-50))}.chips--green{--spr-chips-color: rgb(var(--brd-green-900));--spr-chips-color-disabled: rgb(var(--brd-green-200));--spr-chips-filled-border-color: transparent;--spr-chips-filled-border-color-selected: rgb(var(--brd-green-900));--spr-chips-filled-background: rgb(var(--brd-green-100));--spr-chips-filled-background-hover: rgb(var(--brd-green-200));--spr-chips-filled-background-active: rgb(var(--brd-green-200));--spr-chips-filled-background-disabled: rgb(var(--brd-green-50));--spr-chips-filled-background-selected: rgb(var(--brd-green-200));--spr-chips-outline-border-color: rgb(var(--brd-green-700));--spr-chips-outline-border-color-disabled: rgb(var(--brd-green-200));--spr-chips-outline-border-color-selected: rgb(var(--brd-green-900));--spr-chips-outline-background: transparent;--spr-chips-outline-background-hover: rgb(var(--brd-green-50));--spr-chips-outline-background-active: rgb(var(--brd-green-50));--spr-chips-outline-background-selected: rgb(var(--brd-green-50))}.chips--purple{--spr-chips-color: rgb(var(--brd-purple-900));--spr-chips-color-disabled: rgb(var(--brd-purple-200));--spr-chips-filled-border-color: transparent;--spr-chips-filled-border-color-selected: rgb(var(--brd-purple-900));--spr-chips-filled-background: rgb(var(--brd-purple-100));--spr-chips-filled-background-hover: rgb(var(--brd-purple-200));--spr-chips-filled-background-active: rgb(var(--brd-purple-200));--spr-chips-filled-background-disabled: rgb(var(--brd-purple-50));--spr-chips-filled-background-selected: rgb(var(--brd-purple-200));--spr-chips-outline-border-color: rgb(var(--brd-purple-700));--spr-chips-outline-border-color-disabled: rgb(var(--brd-purple-200));--spr-chips-outline-border-color-selected: rgb(var(--brd-purple-900));--spr-chips-outline-background: transparent;--spr-chips-outline-background-hover: rgb(var(--brd-purple-50));--spr-chips-outline-background-active: rgb(var(--brd-purple-50));--spr-chips-outline-background-selected: rgb(var(--brd-purple-50))}.chips--blue{--spr-chips-color: rgb(var(--brd-blue-900));--spr-chips-color-disabled: rgb(var(--brd-blue-200));--spr-chips-filled-border-color: transparent;--spr-chips-filled-border-color-selected: rgb(var(--brd-blue-900));--spr-chips-filled-background: rgb(var(--brd-blue-100));--spr-chips-filled-background-hover: rgb(var(--brd-blue-200));--spr-chips-filled-background-active: rgb(var(--brd-blue-200));--spr-chips-filled-background-disabled: rgb(var(--brd-blue-50));--spr-chips-filled-background-selected: rgb(var(--brd-blue-200));--spr-chips-outline-border-color: rgb(var(--brd-blue-700));--spr-chips-outline-border-color-disabled: rgb(var(--brd-blue-100));--spr-chips-outline-border-color-selected: rgb(var(--brd-blue-900));--spr-chips-outline-background: transparent;--spr-chips-outline-background-hover: rgb(var(--brd-blue-50));--spr-chips-outline-background-active: rgb(var(--brd-blue-50));--spr-chips-outline-background-selected: rgb(var(--brd-blue-50))}.chips--primary{--spr-chips-color: rgb(var(--brd-primary-900));--spr-chips-color-disabled: rgb(var(--brd-primary-400));--spr-chips-filled-border-color: transparent;--spr-chips-filled-border-color-selected: rgb(var(--brd-primary-900));--spr-chips-filled-background: rgb(var(--brd-primary-100));--spr-chips-filled-background-hover: rgb(var(--brd-primary-200));--spr-chips-filled-background-active: rgb(var(--brd-primary-200));--spr-chips-filled-background-disabled: rgb(var(--brd-primary-50));--spr-chips-filled-background-selected: rgb(var(--brd-primary-200));--spr-chips-outline-border-color: rgb(var(--brd-primary-700));--spr-chips-outline-border-color-disabled: rgb(var(--brd-primary-400));--spr-chips-outline-border-color-selected: rgb(var(--brd-primary-900));--spr-chips-outline-background: transparent;--spr-chips-outline-background-hover: rgb(var(--brd-primary-100));--spr-chips-outline-background-active: rgb(var(--brd-primary-100));--spr-chips-outline-background-selected: rgb(var(--brd-primary-100))}.chips--gold{--spr-chips-color: rgb(var(--brd-gold-900));--spr-chips-color-disabled: rgb(var(--brd-gold-400));--spr-chips-filled-border-color: transparent;--spr-chips-filled-border-color-selected: rgb(var(--brd-gold-900));--spr-chips-filled-background: rgb(var(--brd-gold-100));--spr-chips-filled-background-hover: rgb(var(--brd-gold-200));--spr-chips-filled-background-active: rgb(var(--brd-gold-200));--spr-chips-filled-background-disabled: rgb(var(--brd-gold-50));--spr-chips-filled-background-selected: rgb(var(--brd-gold-200));--spr-chips-outline-border-color: rgb(var(--brd-gold-700));--spr-chips-outline-border-color-disabled: rgb(var(--brd-gold-100));--spr-chips-outline-border-color-selected: rgb(var(--brd-gold-900));--spr-chips-outline-background: transparent;--spr-chips-outline-background-hover: rgb(var(--brd-gold-50));--spr-chips-outline-background-active: rgb(var(--brd-gold-50));--spr-chips-outline-background-selected: rgb(var(--brd-gold-50))}.chips--red{--spr-chips-color: rgb(var(--brd-red-900));--spr-chips-color-disabled: rgb(var(--brd-red-200));--spr-chips-filled-border-color: transparent;--spr-chips-filled-border-color-selected: rgb(var(--brd-red-900));--spr-chips-filled-background: rgb(var(--brd-red-100));--spr-chips-filled-background-hover: rgb(var(--brd-red-200));--spr-chips-filled-background-active: rgb(var(--brd-red-200));--spr-chips-filled-background-disabled: rgb(var(--brd-red-50));--spr-chips-filled-background-selected: rgb(var(--brd-red-200));--spr-chips-outline-border-color: rgb(var(--brd-red-700));--spr-chips-outline-border-color-disabled: rgb(var(--brd-red-100));--spr-chips-outline-border-color-selected: rgb(var(--brd-red-900));--spr-chips-outline-background: transparent;--spr-chips-outline-background-hover: rgb(var(--brd-red-50));--spr-chips-outline-background-active: rgb(var(--brd-red-50));--spr-chips-outline-background-selected: rgb(var(--brd-red-50))}.chips--cyan{--spr-chips-color: rgb(var(--brd-cyan-900));--spr-chips-color-disabled: rgb(var(--brd-cyan-400));--spr-chips-filled-border-color: transparent;--spr-chips-filled-border-color-selected: rgb(var(--brd-cyan-900));--spr-chips-filled-background: rgb(var(--brd-cyan-100));--spr-chips-filled-background-hover: rgb(var(--brd-cyan-200));--spr-chips-filled-background-active: rgb(var(--brd-cyan-200));--spr-chips-filled-background-disabled: rgb(var(--brd-cyan-50));--spr-chips-filled-background-selected: rgb(var(--brd-cyan-200));--spr-chips-outline-border-color: rgb(var(--brd-cyan-700));--spr-chips-outline-border-color-disabled: rgb(var(--brd-cyan-100));--spr-chips-outline-border-color-selected: rgb(var(--brd-cyan-900));--spr-chips-outline-background: transparent;--spr-chips-outline-background-hover: rgb(var(--brd-cyan-50));--spr-chips-outline-background-active: rgb(var(--brd-cyan-50));--spr-chips-outline-background-selected: rgb(var(--brd-cyan-50))}.chips--orange{--spr-chips-color: rgb(var(--brd-orange-900));--spr-chips-color-disabled: rgb(var(--brd-orange-400));--spr-chips-filled-border-color: transparent;--spr-chips-filled-border-color-selected: rgb(var(--brd-orange-900));--spr-chips-filled-background: rgb(var(--brd-orange-100));--spr-chips-filled-background-hover: rgb(var(--brd-orange-200));--spr-chips-filled-background-active: rgb(var(--brd-orange-200));--spr-chips-filled-background-disabled: rgb(var(--brd-orange-50));--spr-chips-filled-background-selected: rgb(var(--brd-orange-200));--spr-chips-outline-border-color: rgb(var(--brd-orange-700));--spr-chips-outline-border-color-disabled: rgb(var(--brd-orange-100));--spr-chips-outline-border-color-selected: rgb(var(--brd-orange-900));--spr-chips-outline-background: transparent;--spr-chips-outline-background-hover: rgb(var(--brd-orange-50));--spr-chips-outline-background-active: rgb(var(--brd-orange-50));--spr-chips-outline-background-selected: rgb(var(--brd-orange-50))}.chips--magenta{--spr-chips-color: rgb(var(--brd-magenta-900));--spr-chips-color-disabled: rgb(var(--brd-magenta-400));--spr-chips-filled-border-color: transparent;--spr-chips-filled-border-color-selected: rgb(var(--brd-magenta-900));--spr-chips-filled-background: rgb(var(--brd-magenta-100));--spr-chips-filled-background-hover: rgb(var(--brd-magenta-200));--spr-chips-filled-background-active: rgb(var(--brd-magenta-200));--spr-chips-filled-background-disabled: rgb(var(--brd-magenta-50));--spr-chips-filled-background-selected: rgb(var(--brd-magenta-200));--spr-chips-outline-border-color: rgb(var(--brd-orange-700));--spr-chips-outline-border-color-disabled: rgb(var(--brd-magenta-100));--spr-chips-outline-border-color-selected: rgb(var(--brd-magenta-900));--spr-chips-outline-background: transparent;--spr-chips-outline-background-hover: rgb(var(--brd-magenta-50));--spr-chips-outline-background-active: rgb(var(--brd-magenta-50));--spr-chips-outline-background-selected: rgb(var(--brd-magenta-50))}.chips--yellow{--spr-chips-color: rgb(var(--brd-yellow-900));--spr-chips-color-disabled: rgb(var(--brd-yellow-400));--spr-chips-filled-border-color: transparent;--spr-chips-filled-border-color-selected: rgb(var(--brd-yellow-900));--spr-chips-filled-background: rgb(var(--brd-yellow-100));--spr-chips-filled-background-hover: rgb(var(--brd-yellow-200));--spr-chips-filled-background-active: rgb(var(--brd-yellow-200));--spr-chips-filled-background-disabled: rgb(var(--brd-yellow-50));--spr-chips-filled-background-selected: rgb(var(--brd-yellow-200));--spr-chips-outline-border-color: rgb(var(--brd-yellow-700));--spr-chips-outline-border-color-disabled: rgb(var(--brd-yellow-100));--spr-chips-outline-border-color-selected: rgb(var(--brd-yellow-900));--spr-chips-outline-background: transparent;--spr-chips-outline-background-hover: rgb(var(--brd-yellow-50));--spr-chips-outline-background-active: rgb(var(--brd-yellow-50));--spr-chips-outline-background-selected: rgb(var(--brd-yellow-50))}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprChipsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-chips', changeDetection: ChangeDetectionStrategy.OnPush, imports: [NgIf, NgClass, NgTemplateOutlet], template: "<button\n  *ngIf=\"isInteractive\"\n  class=\"chips\"\n  [disabled]=\"isDisabled\"\n  [ngClass]=\"'chips--' + variant + ' ' + 'chips--' + size + ' ' + 'chips--' + chipsStyle\"\n  [class.chips--selected]=\"isSelected\">\n  <ng-container *ngTemplateOutlet=\"ngContainerTemplate\"></ng-container>\n</button>\n\n<span\n  *ngIf=\"!isInteractive\"\n  class=\"chips\"\n  [class]=\"'chips--' + variant + ' ' + 'chips--' + size + ' ' + 'chips--' + chipsStyle\"\n  [class.chips--selected]=\"isSelected\">\n  <ng-container *ngTemplateOutlet=\"ngContainerTemplate\"></ng-container>\n</span>\n\n<ng-template #ngContainerTemplate>\n  <ng-content></ng-content>\n</ng-template>\n", styles: [":host{display:block}.chips{display:inline-flex;align-items:center;justify-content:center;gap:4px;padding:var(--spr-chips-padding-block, 5px) var(--spr-chips-padding-inline, 7px);width:fit-content;min-width:var(--brd-chips-custom-width, 60px);max-height:var(--spr-chips-max-height, 32px);font-size:var(--spr-chips-font-size, 14px);line-height:var(--spr-chips-line-height, 20px);font-weight:400;color:var(--spr-chips-color, inherit);background:var(--spr-chips-background, transparent);border:1px solid var(--spr-chips-border-color, transparent);border-radius:var(--spr-border-radius-pill);box-shadow:var(--spr-chips-box-shadow, none);white-space:nowrap;transition:background var(--spr-transition-time) ease,border-color var(--spr-transition-time) ease}.chips:focus-visible{--spr-chips-box-shadow: 0 0 0 2px rgb(var(--brd-black) / .08);outline:none}.chips:disabled{--spr-chips-color: var(--spr-chips-color-disabled, var(--spr-chips-color));--spr-chips-border-color: var(--spr-chips-border-color-disabled, transparent);pointer-events:none}.chips--selected{--spr-chips-background: var(--spr-chips-background-selected, transparent);--spr-chips-border-color: var(--spr-chips-border-color-selected, transparent);--spr-chips-box-shadow: 0 0 0 2px rgb(var(--brd-black) / .14)}.chips ::ng-deep .icon{width:var(--spr-chips-icon-width, 16px)}.chips ::ng-deep .icon svg{width:var(--spr-chips-icon-width, 16px)}.chips--sm{--spr-chips-padding-block: 3px;--spr-chips-padding-inline: 7px;--spr-chips-font-size: 12px;--spr-chips-line-height: 16px;--spr-chips-max-height: 24px;--spr-chips-icon-width: 12px}.chips--md{--spr-chips-padding-block: 5px;--spr-chips-padding-inline: 7px;--spr-chips-font-size: 14px;--spr-chips-line-height: 20px;--spr-chips-max-height: 32px;--spr-chips-icon-width: 16px}.chips--filled{--spr-chips-border-color: var(--spr-chips-filled-border-color);--spr-chips-background: var(--spr-chips-filled-background)}.chips--outline{--spr-chips-border-color: var(--spr-chips-outline-border-color);--spr-chips-background: var(--spr-chips-outline-background)}button.chips.chips--filled:hover{--spr-chips-background: var(--spr-chips-filled-background-hover)}button.chips.chips--filled:active,button.chips.chips--filled:focus-visible{--spr-chips-background: var(--spr-chips-filled-background-active)}button.chips.chips--filled:disabled{--spr-chips-color: var(--spr-chips-color-disabled);--spr-chips-background: var(--spr-chips-filled-background-disabled)}button.chips.chips--filled.chips--selected{--spr-chips-background: var(--spr-chips-filled-background-selected);--spr-chips-border-color: var(--spr-chips-filled-border-color-selected)}button.chips.chips--outline:hover{--spr-chips-background: var(--spr-chips-outline-background-hover)}button.chips.chips--outline:active,button.chips.chips--outline:focus-visible{--spr-chips-background: var(--spr-chips-outline-background-active)}button.chips.chips--outline:disabled{--spr-chips-color: var(--spr-chips-color-disabled);--spr-chips-border-color: var(--spr-chips-outline-border-color-disabled)}button.chips.chips--outline.chips--selected{--spr-chips-background: var(--spr-chips-outline-background-selected);--spr-chips-border-color: var(--spr-chips-outline-border-color-selected)}.chips--gray{--spr-chips-color: rgb(var(--brd-gray-700));--spr-chips-color-disabled: rgb(var(--brd-gray-400));--spr-chips-filled-border-color: transparent;--spr-chips-filled-border-color-selected: rgb(var(--brd-gray-600));--spr-chips-filled-background: rgb(var(--brd-gray-200));--spr-chips-filled-background-hover: rgb(var(--brd-gray-250));--spr-chips-filled-background-active: rgb(var(--brd-gray-250));--spr-chips-filled-background-disabled: rgb(var(--brd-gray-50));--spr-chips-filled-background-selected: rgb(var(--brd-gray-250));--spr-chips-outline-border-color: rgb(var(--brd-gray-500));--spr-chips-outline-border-color-disabled: rgb(var(--brd-gray-200));--spr-chips-outline-border-color-selected: rgb(var(--brd-gray-600));--spr-chips-outline-background: transparent;--spr-chips-outline-background-hover: rgb(var(--brd-gray-100));--spr-chips-outline-background-active: rgb(var(--brd-gray-100));--spr-chips-outline-background-selected: rgb(var(--brd-gray-100))}.chips--olive{--spr-chips-color: rgb(var(--brd-olive-900));--spr-chips-color-disabled: rgb(var(--brd-olive-400));--spr-chips-filled-border-color: transparent;--spr-chips-filled-border-color-selected: rgb(var(--brd-olive-700));--spr-chips-filled-background: rgb(var(--brd-olive-100));--spr-chips-filled-background-hover: rgb(var(--brd-olive-200));--spr-chips-filled-background-active: rgb(var(--brd-olive-200));--spr-chips-filled-background-disabled: rgb(var(--brd-olive-50));--spr-chips-filled-background-selected: rgb(var(--brd-olive-200));--spr-chips-outline-border-color: rgb(var(--brd-olive-700));--spr-chips-outline-border-color-disabled: rgb(var(--brd-olive-100));--spr-chips-outline-border-color-selected: rgb(var(--brd-olive-700));--spr-chips-outline-background: transparent;--spr-chips-outline-background-hover: rgb(var(--brd-olive-50));--spr-chips-outline-background-active: rgb(var(--brd-olive-50));--spr-chips-outline-background-selected: rgb(var(--brd-olive-50))}.chips--green{--spr-chips-color: rgb(var(--brd-green-900));--spr-chips-color-disabled: rgb(var(--brd-green-200));--spr-chips-filled-border-color: transparent;--spr-chips-filled-border-color-selected: rgb(var(--brd-green-900));--spr-chips-filled-background: rgb(var(--brd-green-100));--spr-chips-filled-background-hover: rgb(var(--brd-green-200));--spr-chips-filled-background-active: rgb(var(--brd-green-200));--spr-chips-filled-background-disabled: rgb(var(--brd-green-50));--spr-chips-filled-background-selected: rgb(var(--brd-green-200));--spr-chips-outline-border-color: rgb(var(--brd-green-700));--spr-chips-outline-border-color-disabled: rgb(var(--brd-green-200));--spr-chips-outline-border-color-selected: rgb(var(--brd-green-900));--spr-chips-outline-background: transparent;--spr-chips-outline-background-hover: rgb(var(--brd-green-50));--spr-chips-outline-background-active: rgb(var(--brd-green-50));--spr-chips-outline-background-selected: rgb(var(--brd-green-50))}.chips--purple{--spr-chips-color: rgb(var(--brd-purple-900));--spr-chips-color-disabled: rgb(var(--brd-purple-200));--spr-chips-filled-border-color: transparent;--spr-chips-filled-border-color-selected: rgb(var(--brd-purple-900));--spr-chips-filled-background: rgb(var(--brd-purple-100));--spr-chips-filled-background-hover: rgb(var(--brd-purple-200));--spr-chips-filled-background-active: rgb(var(--brd-purple-200));--spr-chips-filled-background-disabled: rgb(var(--brd-purple-50));--spr-chips-filled-background-selected: rgb(var(--brd-purple-200));--spr-chips-outline-border-color: rgb(var(--brd-purple-700));--spr-chips-outline-border-color-disabled: rgb(var(--brd-purple-200));--spr-chips-outline-border-color-selected: rgb(var(--brd-purple-900));--spr-chips-outline-background: transparent;--spr-chips-outline-background-hover: rgb(var(--brd-purple-50));--spr-chips-outline-background-active: rgb(var(--brd-purple-50));--spr-chips-outline-background-selected: rgb(var(--brd-purple-50))}.chips--blue{--spr-chips-color: rgb(var(--brd-blue-900));--spr-chips-color-disabled: rgb(var(--brd-blue-200));--spr-chips-filled-border-color: transparent;--spr-chips-filled-border-color-selected: rgb(var(--brd-blue-900));--spr-chips-filled-background: rgb(var(--brd-blue-100));--spr-chips-filled-background-hover: rgb(var(--brd-blue-200));--spr-chips-filled-background-active: rgb(var(--brd-blue-200));--spr-chips-filled-background-disabled: rgb(var(--brd-blue-50));--spr-chips-filled-background-selected: rgb(var(--brd-blue-200));--spr-chips-outline-border-color: rgb(var(--brd-blue-700));--spr-chips-outline-border-color-disabled: rgb(var(--brd-blue-100));--spr-chips-outline-border-color-selected: rgb(var(--brd-blue-900));--spr-chips-outline-background: transparent;--spr-chips-outline-background-hover: rgb(var(--brd-blue-50));--spr-chips-outline-background-active: rgb(var(--brd-blue-50));--spr-chips-outline-background-selected: rgb(var(--brd-blue-50))}.chips--primary{--spr-chips-color: rgb(var(--brd-primary-900));--spr-chips-color-disabled: rgb(var(--brd-primary-400));--spr-chips-filled-border-color: transparent;--spr-chips-filled-border-color-selected: rgb(var(--brd-primary-900));--spr-chips-filled-background: rgb(var(--brd-primary-100));--spr-chips-filled-background-hover: rgb(var(--brd-primary-200));--spr-chips-filled-background-active: rgb(var(--brd-primary-200));--spr-chips-filled-background-disabled: rgb(var(--brd-primary-50));--spr-chips-filled-background-selected: rgb(var(--brd-primary-200));--spr-chips-outline-border-color: rgb(var(--brd-primary-700));--spr-chips-outline-border-color-disabled: rgb(var(--brd-primary-400));--spr-chips-outline-border-color-selected: rgb(var(--brd-primary-900));--spr-chips-outline-background: transparent;--spr-chips-outline-background-hover: rgb(var(--brd-primary-100));--spr-chips-outline-background-active: rgb(var(--brd-primary-100));--spr-chips-outline-background-selected: rgb(var(--brd-primary-100))}.chips--gold{--spr-chips-color: rgb(var(--brd-gold-900));--spr-chips-color-disabled: rgb(var(--brd-gold-400));--spr-chips-filled-border-color: transparent;--spr-chips-filled-border-color-selected: rgb(var(--brd-gold-900));--spr-chips-filled-background: rgb(var(--brd-gold-100));--spr-chips-filled-background-hover: rgb(var(--brd-gold-200));--spr-chips-filled-background-active: rgb(var(--brd-gold-200));--spr-chips-filled-background-disabled: rgb(var(--brd-gold-50));--spr-chips-filled-background-selected: rgb(var(--brd-gold-200));--spr-chips-outline-border-color: rgb(var(--brd-gold-700));--spr-chips-outline-border-color-disabled: rgb(var(--brd-gold-100));--spr-chips-outline-border-color-selected: rgb(var(--brd-gold-900));--spr-chips-outline-background: transparent;--spr-chips-outline-background-hover: rgb(var(--brd-gold-50));--spr-chips-outline-background-active: rgb(var(--brd-gold-50));--spr-chips-outline-background-selected: rgb(var(--brd-gold-50))}.chips--red{--spr-chips-color: rgb(var(--brd-red-900));--spr-chips-color-disabled: rgb(var(--brd-red-200));--spr-chips-filled-border-color: transparent;--spr-chips-filled-border-color-selected: rgb(var(--brd-red-900));--spr-chips-filled-background: rgb(var(--brd-red-100));--spr-chips-filled-background-hover: rgb(var(--brd-red-200));--spr-chips-filled-background-active: rgb(var(--brd-red-200));--spr-chips-filled-background-disabled: rgb(var(--brd-red-50));--spr-chips-filled-background-selected: rgb(var(--brd-red-200));--spr-chips-outline-border-color: rgb(var(--brd-red-700));--spr-chips-outline-border-color-disabled: rgb(var(--brd-red-100));--spr-chips-outline-border-color-selected: rgb(var(--brd-red-900));--spr-chips-outline-background: transparent;--spr-chips-outline-background-hover: rgb(var(--brd-red-50));--spr-chips-outline-background-active: rgb(var(--brd-red-50));--spr-chips-outline-background-selected: rgb(var(--brd-red-50))}.chips--cyan{--spr-chips-color: rgb(var(--brd-cyan-900));--spr-chips-color-disabled: rgb(var(--brd-cyan-400));--spr-chips-filled-border-color: transparent;--spr-chips-filled-border-color-selected: rgb(var(--brd-cyan-900));--spr-chips-filled-background: rgb(var(--brd-cyan-100));--spr-chips-filled-background-hover: rgb(var(--brd-cyan-200));--spr-chips-filled-background-active: rgb(var(--brd-cyan-200));--spr-chips-filled-background-disabled: rgb(var(--brd-cyan-50));--spr-chips-filled-background-selected: rgb(var(--brd-cyan-200));--spr-chips-outline-border-color: rgb(var(--brd-cyan-700));--spr-chips-outline-border-color-disabled: rgb(var(--brd-cyan-100));--spr-chips-outline-border-color-selected: rgb(var(--brd-cyan-900));--spr-chips-outline-background: transparent;--spr-chips-outline-background-hover: rgb(var(--brd-cyan-50));--spr-chips-outline-background-active: rgb(var(--brd-cyan-50));--spr-chips-outline-background-selected: rgb(var(--brd-cyan-50))}.chips--orange{--spr-chips-color: rgb(var(--brd-orange-900));--spr-chips-color-disabled: rgb(var(--brd-orange-400));--spr-chips-filled-border-color: transparent;--spr-chips-filled-border-color-selected: rgb(var(--brd-orange-900));--spr-chips-filled-background: rgb(var(--brd-orange-100));--spr-chips-filled-background-hover: rgb(var(--brd-orange-200));--spr-chips-filled-background-active: rgb(var(--brd-orange-200));--spr-chips-filled-background-disabled: rgb(var(--brd-orange-50));--spr-chips-filled-background-selected: rgb(var(--brd-orange-200));--spr-chips-outline-border-color: rgb(var(--brd-orange-700));--spr-chips-outline-border-color-disabled: rgb(var(--brd-orange-100));--spr-chips-outline-border-color-selected: rgb(var(--brd-orange-900));--spr-chips-outline-background: transparent;--spr-chips-outline-background-hover: rgb(var(--brd-orange-50));--spr-chips-outline-background-active: rgb(var(--brd-orange-50));--spr-chips-outline-background-selected: rgb(var(--brd-orange-50))}.chips--magenta{--spr-chips-color: rgb(var(--brd-magenta-900));--spr-chips-color-disabled: rgb(var(--brd-magenta-400));--spr-chips-filled-border-color: transparent;--spr-chips-filled-border-color-selected: rgb(var(--brd-magenta-900));--spr-chips-filled-background: rgb(var(--brd-magenta-100));--spr-chips-filled-background-hover: rgb(var(--brd-magenta-200));--spr-chips-filled-background-active: rgb(var(--brd-magenta-200));--spr-chips-filled-background-disabled: rgb(var(--brd-magenta-50));--spr-chips-filled-background-selected: rgb(var(--brd-magenta-200));--spr-chips-outline-border-color: rgb(var(--brd-orange-700));--spr-chips-outline-border-color-disabled: rgb(var(--brd-magenta-100));--spr-chips-outline-border-color-selected: rgb(var(--brd-magenta-900));--spr-chips-outline-background: transparent;--spr-chips-outline-background-hover: rgb(var(--brd-magenta-50));--spr-chips-outline-background-active: rgb(var(--brd-magenta-50));--spr-chips-outline-background-selected: rgb(var(--brd-magenta-50))}.chips--yellow{--spr-chips-color: rgb(var(--brd-yellow-900));--spr-chips-color-disabled: rgb(var(--brd-yellow-400));--spr-chips-filled-border-color: transparent;--spr-chips-filled-border-color-selected: rgb(var(--brd-yellow-900));--spr-chips-filled-background: rgb(var(--brd-yellow-100));--spr-chips-filled-background-hover: rgb(var(--brd-yellow-200));--spr-chips-filled-background-active: rgb(var(--brd-yellow-200));--spr-chips-filled-background-disabled: rgb(var(--brd-yellow-50));--spr-chips-filled-background-selected: rgb(var(--brd-yellow-200));--spr-chips-outline-border-color: rgb(var(--brd-yellow-700));--spr-chips-outline-border-color-disabled: rgb(var(--brd-yellow-100));--spr-chips-outline-border-color-selected: rgb(var(--brd-yellow-900));--spr-chips-outline-background: transparent;--spr-chips-outline-background-hover: rgb(var(--brd-yellow-50));--spr-chips-outline-background-active: rgb(var(--brd-yellow-50));--spr-chips-outline-background-selected: rgb(var(--brd-yellow-50))}\n"] }]
        }], propDecorators: { variant: [{
                type: Input
            }], size: [{
                type: Input
            }], chipsStyle: [{
                type: Input
            }], isInteractive: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], isSelected: [{
                type: Input
            }] } });

class ModalService {
    constructor(ngbModal, rendererFactory2) {
        this.ngbModal = ngbModal;
        this.renderer = rendererFactory2.createRenderer(null, null);
    }
    open(component, config) {
        const { modalData, settings, parentHeight, multi } = config || {};
        if (this.ngbModal.hasOpenModals() && !multi) {
            this.ngbModal.dismissAll();
        }
        const modalRef = this.ngbModal.open(component, { ...settings, keyboard: false });
        modalRef.componentInstance.closeAction = (action) => modalRef.dismiss(action);
        modalRef.componentInstance.modalData = modalData ? { ...modalData } : {};
        if (parentHeight) {
            this.setModalHeight();
        }
        return modalRef.dismissed;
    }
    dismissAll(reason) {
        this.ngbModal.dismissAll(reason);
    }
    isModalOpened() {
        return this.ngbModal.hasOpenModals();
    }
    setModalHeight() {
        const modals = document.querySelectorAll('.modal-content');
        const parent = modals[modals.length - 2];
        const current = modals[modals.length - 1];
        this.renderer.setStyle(current, 'height', `${parent.clientHeight}px`);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: ModalService, deps: [{ token: i1$1.NgbModal }, { token: i0.RendererFactory2 }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: ModalService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: ModalService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i1$1.NgbModal }, { type: i0.RendererFactory2 }] });

class SprBaseModalContentComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprBaseModalContentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: SprBaseModalContentComponent, isStandalone: true, selector: "spr-base-modal-content", ngImport: i0, template: "<header class=\"modal-header\">\n  <ng-content select=\"[header]\"></ng-content>\n</header>\n\n<main class=\"modal-body\">\n  <ng-content select=\"[body]\"></ng-content>\n</main>\n\n<footer class=\"modal-footer\">\n  <ng-content select=\"[footer]\"></ng-content>\n</footer>\n", styles: [":host{display:flex;flex-direction:column;max-height:100%;height:100%}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprBaseModalContentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-base-modal-content', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: "<header class=\"modal-header\">\n  <ng-content select=\"[header]\"></ng-content>\n</header>\n\n<main class=\"modal-body\">\n  <ng-content select=\"[body]\"></ng-content>\n</main>\n\n<footer class=\"modal-footer\">\n  <ng-content select=\"[footer]\"></ng-content>\n</footer>\n", styles: [":host{display:flex;flex-direction:column;max-height:100%;height:100%}\n"] }]
        }] });

class SprConfirmModalComponent {
    constructor() {
        this.modalData = {
            title: '',
            bodyMessage: '',
            confirmButtonText: '',
            cancelButtonText: '',
        };
        this.closeAction = () => { };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprConfirmModalComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: SprConfirmModalComponent, isStandalone: true, selector: "spr-confirm-modal", inputs: { modalData: "modalData", closeAction: "closeAction" }, ngImport: i0, template: "<spr-base-modal-content>\n  <ng-container header>\n    <h4\n      class=\"modal-header__title\"\n      id=\"modal-header__title\">\n      {{ modalData.title }}\n    </h4>\n    <button\n      type=\"button\"\n      class=\"close-modal-button\"\n      aria-describedby=\"modal-header__title\"\n      (click)=\"closeAction()\">\n      <i class=\"bo-icon bo-icon-control-cross\"></i>\n    </button>\n  </ng-container>\n\n  <ng-container body>\n    <p class=\"confirmation-message\">\n      <strong [innerHTML]=\"modalData.bodyMessage\"></strong>\n    </p>\n  </ng-container>\n  <ng-container footer>\n    <spr-button\n      variant=\"outline\"\n      size=\"sm\"\n      (click)=\"closeAction(false)\">\n      {{ modalData.cancelButtonText }}\n    </spr-button>\n\n    <spr-button\n      variant=\"accent\"\n      size=\"sm\"\n      (click)=\"closeAction(true)\">\n      {{ modalData.confirmButtonText }}\n    </spr-button>\n  </ng-container>\n</spr-base-modal-content>\n", styles: [":host{display:block}:host .modal-body{white-space:pre-line}.confirmation-message{padding:24px}.confirmation-message:only-child{margin:0}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: SprBaseModalContentComponent, selector: "spr-base-modal-content" }, { kind: "component", type: SprButtonComponent, selector: "spr-button", inputs: ["variant", "type", "size", "isBtnSpinner", "isRadius", "disabled", "isIcon", "buttonId"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprConfirmModalComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-confirm-modal', imports: [CommonModule, SprBaseModalContentComponent, SprButtonComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<spr-base-modal-content>\n  <ng-container header>\n    <h4\n      class=\"modal-header__title\"\n      id=\"modal-header__title\">\n      {{ modalData.title }}\n    </h4>\n    <button\n      type=\"button\"\n      class=\"close-modal-button\"\n      aria-describedby=\"modal-header__title\"\n      (click)=\"closeAction()\">\n      <i class=\"bo-icon bo-icon-control-cross\"></i>\n    </button>\n  </ng-container>\n\n  <ng-container body>\n    <p class=\"confirmation-message\">\n      <strong [innerHTML]=\"modalData.bodyMessage\"></strong>\n    </p>\n  </ng-container>\n  <ng-container footer>\n    <spr-button\n      variant=\"outline\"\n      size=\"sm\"\n      (click)=\"closeAction(false)\">\n      {{ modalData.cancelButtonText }}\n    </spr-button>\n\n    <spr-button\n      variant=\"accent\"\n      size=\"sm\"\n      (click)=\"closeAction(true)\">\n      {{ modalData.confirmButtonText }}\n    </spr-button>\n  </ng-container>\n</spr-base-modal-content>\n", styles: [":host{display:block}:host .modal-body{white-space:pre-line}.confirmation-message{padding:24px}.confirmation-message:only-child{margin:0}\n"] }]
        }], propDecorators: { modalData: [{
                type: Input
            }], closeAction: [{
                type: Input
            }] } });

const SPR_DATE_TIMEPICKER_ADAPTER_TOKEN = new InjectionToken('SPR_DATE_TIMEPICKER_ADAPTER_TOKEN');

class SprDefaultDateTimepickerAdapter {
    toModel(date) {
        const dateObj = date.split(/[ T]/);
        return {
            date: dateObj[0],
            time: dateObj?.[1]?.split('.')?.[0]?.replace('Z', '') || null,
        };
    }
    fromModel(model) {
        if (!model.time) {
            return model.date || '';
        }
        return `${model.date}T${model.time}.000Z`;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprDefaultDateTimepickerAdapter, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprDefaultDateTimepickerAdapter }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprDefaultDateTimepickerAdapter, decorators: [{
            type: Injectable
        }] });

class SprControlSizeDirective {
    get isSm() {
        return this.sprControlSize === 'sm';
    }
    get isMd() {
        return this.sprControlSize === 'md';
    }
    get isLg() {
        return this.sprControlSize === 'lg';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprControlSizeDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: SprControlSizeDirective, isStandalone: true, selector: "[sprControlSize]", inputs: { sprControlSize: "sprControlSize" }, host: { properties: { "class.control-form--small": "this.isSm", "class.control-form--middle": "this.isMd", "class.control-form--large": "this.isLg" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprControlSizeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[sprControlSize]',
                    standalone: true,
                }]
        }], propDecorators: { isSm: [{
                type: HostBinding,
                args: ['class.control-form--small']
            }], isMd: [{
                type: HostBinding,
                args: ['class.control-form--middle']
            }], isLg: [{
                type: HostBinding,
                args: ['class.control-form--large']
            }], sprControlSize: [{
                type: Input
            }] } });

const UNKNOWN_ERROR = 'Unknown error';

class GetControlErrorMessagePipe {
    transform(controlErrors, errorMessages) {
        if (!controlErrors) {
            return null;
        }
        const errorKey = Object.keys(controlErrors).find((errorProperty) => errorProperty in errorMessages);
        const error = errorMessages[errorKey];
        if (!error) {
            return UNKNOWN_ERROR;
        }
        if (typeof error === 'string') {
            return error;
        }
        return error(controlErrors[errorKey]);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: GetControlErrorMessagePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.14", ngImport: i0, type: GetControlErrorMessagePipe, isStandalone: true, name: "getControlErrorMessage" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: GetControlErrorMessagePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'getControlErrorMessage',
                    standalone: true,
                }]
        }] });

const DATEPICKER_TRANSLATE_ACTIVE_LANGUAGE = new InjectionToken('DATEPICKER_TRANSLATE_ACTIVE_LANGUAGE', {
    factory: () => ({
        getActiveLanguage() {
            return navigator.language;
        },
    }),
});

var DataPresentationValues;
(function (DataPresentationValues) {
    DataPresentationValues["Long"] = "long";
    DataPresentationValues["Short"] = "short";
})(DataPresentationValues || (DataPresentationValues = {}));
class DatepickerTranslateService extends NgbDatepickerI18n {
    constructor() {
        super(...arguments);
        this.activateLanguageFactory = inject(DATEPICKER_TRANSLATE_ACTIVE_LANGUAGE);
    }
    get activeLang() {
        return this.activateLanguageFactory?.getActiveLanguage();
    }
    getWeekdayLabel(weekday) {
        return this.getWeekdayNames(this.activeLang)[weekday - 1];
    }
    getMonthShortName(month) {
        return this.getMonthNames(this.activeLang)[month - 1];
    }
    getMonthFullName(month) {
        return this.getMonthNames(this.activeLang, DataPresentationValues.Long)[month - 1];
    }
    getDayAriaLabel(date) {
        return `${date.day}-${date.month}-${date.year}`;
    }
    getWeekdayNames(locale = navigator.language) {
        const formatter = new Intl.DateTimeFormat(locale, { weekday: DataPresentationValues.Short });
        const weekdays = [];
        for (let day = 0; day < 7; day++) {
            const date = new Date(Date.UTC(2021, 0, 4 + day)); // 4th Jan 2021 is a Monday
            weekdays.push(formatter.format(date));
        }
        return weekdays;
    }
    getMonthNames(locale = navigator.language, type = DataPresentationValues.Short) {
        const formatter = new Intl.DateTimeFormat(locale, { month: type });
        const months = [];
        for (let month = 0; month < 12; month++) {
            const date = new Date(Date.UTC(2021, month, 1)); // 1st of each month
            months.push(formatter.format(date));
        }
        return months;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: DatepickerTranslateService, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: DatepickerTranslateService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: DatepickerTranslateService, decorators: [{
            type: Injectable
        }] });

class SprErrorComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprErrorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: SprErrorComponent, isStandalone: true, selector: "spr-error", ngImport: i0, template: "<div class=\"error-message\">\n  <ng-content></ng-content>\n</div>\n", styles: [".text-body-xxxl{font-size:var(--spr-font-size-32);line-height:var(--spr-line-height-40)}.text-body-xxl{font-size:var(--spr-font-size-24);line-height:var(--spr-line-height-32)}.text-body-xl{font-size:var(--spr-font-size-20);line-height:var(--spr-line-height-24)}.text-body-l{font-size:var(--spr-font-size-16);line-height:var(--spr-line-height-20)}.text-body-m{font-size:var(--spr-font-size-15);line-height:var(--spr-line-height-20)}.text-body-s{font-size:var(--spr-font-size-14);line-height:var(--spr-line-height-20)}.text-body-xs{font-size:var(--spr-font-size-12);line-height:var(--spr-line-height-16)}.text-body-xs-uppercase{font-size:var(--spr-font-size-13);line-height:var(--spr-line-height-20);text-transform:uppercase}:host{display:block}.error-message{font-size:var(--spr-font-size-12);line-height:var(--spr-line-height-16);display:block;width:fit-content;padding:4px 8px;border-radius:var(--spr-border-radius-xs);background-color:var(--brd-text-destructive-600);color:var(--brd-text-default-0)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprErrorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-error', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"error-message\">\n  <ng-content></ng-content>\n</div>\n", styles: [".text-body-xxxl{font-size:var(--spr-font-size-32);line-height:var(--spr-line-height-40)}.text-body-xxl{font-size:var(--spr-font-size-24);line-height:var(--spr-line-height-32)}.text-body-xl{font-size:var(--spr-font-size-20);line-height:var(--spr-line-height-24)}.text-body-l{font-size:var(--spr-font-size-16);line-height:var(--spr-line-height-20)}.text-body-m{font-size:var(--spr-font-size-15);line-height:var(--spr-line-height-20)}.text-body-s{font-size:var(--spr-font-size-14);line-height:var(--spr-line-height-20)}.text-body-xs{font-size:var(--spr-font-size-12);line-height:var(--spr-line-height-16)}.text-body-xs-uppercase{font-size:var(--spr-font-size-13);line-height:var(--spr-line-height-20);text-transform:uppercase}:host{display:block}.error-message{font-size:var(--spr-font-size-12);line-height:var(--spr-line-height-16);display:block;width:fit-content;padding:4px 8px;border-radius:var(--spr-border-radius-xs);background-color:var(--brd-text-destructive-600);color:var(--brd-text-default-0)}\n"] }]
        }] });

const getNgbDate = (dateAsStings) => {
    const date = new Date(dateAsStings);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return new NgbDate(year, month, day);
};

class SprFieldDescriptionComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprFieldDescriptionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: SprFieldDescriptionComponent, isStandalone: true, selector: "spr-field-description", ngImport: i0, template: "<div class=\"form-input-description\">\n  <ng-content></ng-content>\n</div>\n", styles: [".text-body-xxxl{font-size:var(--spr-font-size-32);line-height:var(--spr-line-height-40)}.text-body-xxl{font-size:var(--spr-font-size-24);line-height:var(--spr-line-height-32)}.text-body-xl{font-size:var(--spr-font-size-20);line-height:var(--spr-line-height-24)}.text-body-l{font-size:var(--spr-font-size-16);line-height:var(--spr-line-height-20)}.text-body-m{font-size:var(--spr-font-size-15);line-height:var(--spr-line-height-20)}.text-body-s{font-size:var(--spr-font-size-14);line-height:var(--spr-line-height-20)}.text-body-xs{font-size:var(--spr-font-size-12);line-height:var(--spr-line-height-16)}.text-body-xs-uppercase{font-size:var(--spr-font-size-13);line-height:var(--spr-line-height-20);text-transform:uppercase}:host{display:block;width:100%}.form-input-description{font-size:var(--spr-font-size-12);line-height:var(--spr-line-height-16);color:var(--brd-input-description-custom-color, var(--brd-text-secondary-500))}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprFieldDescriptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-field-description', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"form-input-description\">\n  <ng-content></ng-content>\n</div>\n", styles: [".text-body-xxxl{font-size:var(--spr-font-size-32);line-height:var(--spr-line-height-40)}.text-body-xxl{font-size:var(--spr-font-size-24);line-height:var(--spr-line-height-32)}.text-body-xl{font-size:var(--spr-font-size-20);line-height:var(--spr-line-height-24)}.text-body-l{font-size:var(--spr-font-size-16);line-height:var(--spr-line-height-20)}.text-body-m{font-size:var(--spr-font-size-15);line-height:var(--spr-line-height-20)}.text-body-s{font-size:var(--spr-font-size-14);line-height:var(--spr-line-height-20)}.text-body-xs{font-size:var(--spr-font-size-12);line-height:var(--spr-line-height-16)}.text-body-xs-uppercase{font-size:var(--spr-font-size-13);line-height:var(--spr-line-height-20);text-transform:uppercase}:host{display:block;width:100%}.form-input-description{font-size:var(--spr-font-size-12);line-height:var(--spr-line-height-16);color:var(--brd-input-description-custom-color, var(--brd-text-secondary-500))}\n"] }]
        }] });

class SprDateTimepickerComponent extends BaseControl {
    constructor() {
        super(...arguments);
        this.placeholder = input('');
        this.isDeselectAllowed = input(false);
        this.dateDeselected = output();
        this.dateChanged = output();
        this.dateTimepickerAdapter = inject(SPR_DATE_TIMEPICKER_ADAPTER_TOKEN);
    }
    set minDate(minDate) {
        if (!minDate) {
            return;
        }
        if (minDate instanceof NgbDate) {
            this.mappedMinDate = minDate;
            return;
        }
        this.mappedMinDate = getNgbDate(minDate);
    }
    set maxDate(maxDate) {
        if (!maxDate) {
            return;
        }
        if (maxDate instanceof NgbDate) {
            this.mappedMaxDate = maxDate;
            return;
        }
        this.mappedMaxDate = getNgbDate(maxDate);
    }
    validate() {
        return this.control.valid ? null : { [ValidatorsKeys.Required]: { valid: false } };
    }
    deselectDate() {
        this.control.setValue({ date: null, time: null });
        this.dateDeselected.emit();
    }
    onDateSelected(date) {
        const stringDate = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
        this.control.setValue({
            ...this.control.getRawValue(),
            date: stringDate,
        }, { emitEvent: false });
        this.dateChanged.emit(stringDate);
    }
    writeValue(value) {
        if (!value) {
            this.control.patchValue({
                date: null,
                time: null,
            }, { emitEvent: false });
            return;
        }
        const settingDate = this.dateTimepickerAdapter.toModel(value);
        this.control.patchValue(settingDate, { emitEvent: false });
    }
    initControl() {
        return this.formBuilder.nonNullable.group({
            date: [null, Validators.required],
            time: [null, Validators.required],
        });
    }
    initControlListener() {
        return this.control.valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef), filter((v) => this.isDeselectAllowed() || Boolean(v.date)), map((v) => this.dateTimepickerAdapter.fromModel(v)))
            .subscribe((value) => {
            this.cvaOnChange(value);
            this.cvaOnTouched();
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprDateTimepickerComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: SprDateTimepickerComponent, isStandalone: true, selector: "spr-date-timepicker", inputs: { minDate: { classPropertyName: "minDate", publicName: "minDate", isSignal: false, isRequired: false, transformFunction: null }, maxDate: { classPropertyName: "maxDate", publicName: "maxDate", isSignal: false, isRequired: false, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: true, isRequired: false, transformFunction: null }, isDeselectAllowed: { classPropertyName: "isDeselectAllowed", publicName: "isDeselectAllowed", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { dateDeselected: "dateDeselected", dateChanged: "dateChanged" }, providers: [{ provide: NgbDatepickerI18n, useClass: DatepickerTranslateService }], usesInheritance: true, ngImport: i0, template: "<ng-container [formGroup]=\"control\">\n  <div\n    [class.is-open]=\"date.isOpen()\"\n    class=\"date-timepicker\">\n    <div class=\"date-timepicker__item\">\n      <spr-label\n        [label]=\"label\"\n        [inputId]=\"inputId()\"\n        [tooltip]=\"tooltip\"></spr-label>\n\n      <div class=\"input-container\">\n        <input\n          #date=\"ngbDatepicker\"\n          (click)=\"date.toggle()\"\n          (closed)=\"cvaOnTouched()\"\n          [class.is-invalid]=\"isInvalidControl\"\n          [id]=\"inputId()\"\n          [name]=\"inputId()\"\n          [sprControlSize]=\"controlSize\"\n          [minDate]=\"mappedMinDate\"\n          [maxDate]=\"mappedMaxDate\"\n          [placeholder]=\"placeholder()\"\n          (dateSelect)=\"onDateSelected($event)\"\n          aria-label=\"Value\"\n          class=\"form-datepicker-control\"\n          formControlName=\"date\"\n          ngbDatepicker\n          readonly\n          type=\"text\" />\n\n        @if (isDeselectAllowed() && control.value?.date) {\n          <button\n            (click)=\"deselectDate()\"\n            [disabled]=\"control.disabled\"\n            class=\"btn btn-deselect\"\n            type=\"button\">\n            <i\n              class=\"bo-icon-control-cross\"\n              style=\"font-size: 20px\"></i>\n          </button>\n        } @else {\n          <button\n            (click)=\"date.toggle()\"\n            [disabled]=\"control.disabled\"\n            class=\"btn btn-calendar\"\n            type=\"button\">\n            <i\n              class=\"bo-icon-control-calendar\"\n              style=\"font-size: 20px\"></i>\n          </button>\n        }\n      </div>\n    </div>\n    <div class=\"date-timepicker__item\">\n      <ngb-timepicker\n        [class.invalid-timepicker]=\"isInvalidControl\"\n        [spinners]=\"false\"\n        (focusout)=\"cvaOnTouched()\"\n        formControlName=\"time\"></ngb-timepicker>\n    </div>\n  </div>\n</ng-container>\n\n@if (description || isInvalidControl) {\n  <div class=\"form-field-description\">\n    @if (description && !isInvalidControl) {\n      <spr-field-description>\n        {{ description }}\n      </spr-field-description>\n    }\n\n    @if (isInvalidControl) {\n      <spr-error>\n        {{ ngControl?.control?.errors | getControlErrorMessage: errorMessagesConfig }}\n      </spr-error>\n    }\n  </div>\n}\n", styles: [":host{display:block}:host .is-invalid{background-image:none}:host .date-timepicker{display:grid;grid-gap:24px;place-items:flex-end stretch;grid-template-columns:1fr 120px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "ngmodule", type: NgbDatepickerModule }, { kind: "directive", type: i1$1.NgbInputDatepicker, selector: "input[ngbDatepicker]", inputs: ["autoClose", "contentTemplate", "datepickerClass", "dayTemplate", "dayTemplateData", "displayMonths", "firstDayOfWeek", "footerTemplate", "markDisabled", "minDate", "maxDate", "navigation", "outsideDays", "placement", "popperOptions", "restoreFocus", "showWeekNumbers", "startDate", "container", "positionTarget", "weekdays", "disabled"], outputs: ["dateSelect", "navigate", "closed"], exportAs: ["ngbDatepicker"] }, { kind: "ngmodule", type: NgbTimepickerModule }, { kind: "component", type: i1$1.NgbTimepicker, selector: "ngb-timepicker", inputs: ["meridian", "spinners", "seconds", "hourStep", "minuteStep", "secondStep", "readonlyInputs", "size"], exportAs: ["ngbTimepicker"] }, { kind: "pipe", type: GetControlErrorMessagePipe, name: "getControlErrorMessage" }, { kind: "directive", type: SprControlSizeDirective, selector: "[sprControlSize]", inputs: ["sprControlSize"] }, { kind: "component", type: SprLabelComponent, selector: "spr-label", inputs: ["label", "inputId", "tooltip", "leftIcon", "rightIcon", "className", "isLabelReverse", "shouldStopLabelClickEventPropagation", "isInline"] }, { kind: "component", type: SprErrorComponent, selector: "spr-error" }, { kind: "component", type: SprFieldDescriptionComponent, selector: "spr-field-description" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprDateTimepickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-date-timepicker', imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        NgbDatepickerModule,
                        NgbTimepickerModule,
                        GetControlErrorMessagePipe,
                        SprControlSizeDirective,
                        SprLabelComponent,
                        SprErrorComponent,
                        SprFieldDescriptionComponent,
                    ], providers: [{ provide: NgbDatepickerI18n, useClass: DatepickerTranslateService }], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container [formGroup]=\"control\">\n  <div\n    [class.is-open]=\"date.isOpen()\"\n    class=\"date-timepicker\">\n    <div class=\"date-timepicker__item\">\n      <spr-label\n        [label]=\"label\"\n        [inputId]=\"inputId()\"\n        [tooltip]=\"tooltip\"></spr-label>\n\n      <div class=\"input-container\">\n        <input\n          #date=\"ngbDatepicker\"\n          (click)=\"date.toggle()\"\n          (closed)=\"cvaOnTouched()\"\n          [class.is-invalid]=\"isInvalidControl\"\n          [id]=\"inputId()\"\n          [name]=\"inputId()\"\n          [sprControlSize]=\"controlSize\"\n          [minDate]=\"mappedMinDate\"\n          [maxDate]=\"mappedMaxDate\"\n          [placeholder]=\"placeholder()\"\n          (dateSelect)=\"onDateSelected($event)\"\n          aria-label=\"Value\"\n          class=\"form-datepicker-control\"\n          formControlName=\"date\"\n          ngbDatepicker\n          readonly\n          type=\"text\" />\n\n        @if (isDeselectAllowed() && control.value?.date) {\n          <button\n            (click)=\"deselectDate()\"\n            [disabled]=\"control.disabled\"\n            class=\"btn btn-deselect\"\n            type=\"button\">\n            <i\n              class=\"bo-icon-control-cross\"\n              style=\"font-size: 20px\"></i>\n          </button>\n        } @else {\n          <button\n            (click)=\"date.toggle()\"\n            [disabled]=\"control.disabled\"\n            class=\"btn btn-calendar\"\n            type=\"button\">\n            <i\n              class=\"bo-icon-control-calendar\"\n              style=\"font-size: 20px\"></i>\n          </button>\n        }\n      </div>\n    </div>\n    <div class=\"date-timepicker__item\">\n      <ngb-timepicker\n        [class.invalid-timepicker]=\"isInvalidControl\"\n        [spinners]=\"false\"\n        (focusout)=\"cvaOnTouched()\"\n        formControlName=\"time\"></ngb-timepicker>\n    </div>\n  </div>\n</ng-container>\n\n@if (description || isInvalidControl) {\n  <div class=\"form-field-description\">\n    @if (description && !isInvalidControl) {\n      <spr-field-description>\n        {{ description }}\n      </spr-field-description>\n    }\n\n    @if (isInvalidControl) {\n      <spr-error>\n        {{ ngControl?.control?.errors | getControlErrorMessage: errorMessagesConfig }}\n      </spr-error>\n    }\n  </div>\n}\n", styles: [":host{display:block}:host .is-invalid{background-image:none}:host .date-timepicker{display:grid;grid-gap:24px;place-items:flex-end stretch;grid-template-columns:1fr 120px}\n"] }]
        }], propDecorators: { minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }] } });

const SPR_DATEPICKER_VALUE_FORMATTER = new InjectionToken('SPR_DATEPICKER_VALUE_FORMATTER');

const NOT_SELECTED_ITEM = {
    text: COMMON_TRANSLATION_PREFIX + 'Not Selected',
    value: '',
};
const NOT_SELECTED_FILTER = {
    text: COMMON_TRANSLATION_PREFIX + 'All',
    value: '',
};
const NOT_SELECTED_FILTER_TOKEN = new InjectionToken('NOT_SELECTED_FILTER_TOKEN');

var SortType;
(function (SortType) {
    SortType[SortType["Asc"] = 0] = "Asc";
    SortType[SortType["Desc"] = 1] = "Desc";
})(SortType || (SortType = {}));

class FilterOptionsPipe {
    transform(options, searchValue) {
        return options.filter((option) => option.text.toLocaleLowerCase().includes(searchValue?.toLocaleLowerCase() || ''));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: FilterOptionsPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.14", ngImport: i0, type: FilterOptionsPipe, isStandalone: true, name: "filterOptions" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: FilterOptionsPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'filterOptions',
                    standalone: true,
                }]
        }] });

class FilterArrayPipe {
    transform(arr, searchTerm, filterKey) {
        if (!arr?.length || !searchTerm || !filterKey) {
            return arr ?? [];
        }
        return arr.filter((item) => {
            if (typeof item?.[filterKey] !== 'string') {
                return true;
            }
            return item[filterKey].toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: FilterArrayPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.14", ngImport: i0, type: FilterArrayPipe, isStandalone: true, name: "sprFilterArray" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: FilterArrayPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'sprFilterArray',
                }]
        }] });

class SprDatepickerComponent extends BaseControl {
    set minDate(minDate) {
        if (!minDate) {
            return;
        }
        if (minDate instanceof NgbDate) {
            this.mappedMinDate = minDate;
            return;
        }
        this.mappedMinDate = getNgbDate(minDate);
    }
    set maxDate(maxDate) {
        if (!maxDate) {
            return;
        }
        if (maxDate instanceof NgbDate) {
            this.mappedMaxDate = maxDate;
            return;
        }
        this.mappedMaxDate = getNgbDate(maxDate);
    }
    constructor(ngbCalendar, datepickerValueFormatter) {
        super();
        this.ngbCalendar = ngbCalendar;
        this.datepickerValueFormatter = datepickerValueFormatter;
        this.placeholder = input('');
        this.deselect = input(false);
        this.mappedMinDate = new NgbDate(1950, 1, 1);
        this.mappedMaxDate = this.ngbCalendar.getToday();
    }
    deselectDate() {
        this.control.patchValue(null);
    }
    initControlListener() {
        return this.control.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
            if (this.datepickerValueFormatter) {
                this.cvaOnChange(this.datepickerValueFormatter.format(value));
                return;
            }
            this.cvaOnChange(value);
        });
    }
    initControl() {
        return this.formBuilder.control(null);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprDatepickerComponent, deps: [{ token: i1$1.NgbCalendar }, { token: SPR_DATEPICKER_VALUE_FORMATTER, optional: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: SprDatepickerComponent, isStandalone: true, selector: "spr-datepicker", inputs: { minDate: { classPropertyName: "minDate", publicName: "minDate", isSignal: false, isRequired: false, transformFunction: null }, maxDate: { classPropertyName: "maxDate", publicName: "maxDate", isSignal: false, isRequired: false, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: true, isRequired: false, transformFunction: null }, deselect: { classPropertyName: "deselect", publicName: "deselect", isSignal: true, isRequired: false, transformFunction: null } }, providers: [{ provide: NgbDatepickerI18n, useClass: DatepickerTranslateService }], usesInheritance: true, ngImport: i0, template: "<div\n  [class.is-open]=\"d.isOpen()\"\n  class=\"form-dropdown\">\n  <spr-label\n    [label]=\"label\"\n    [inputId]=\"inputId()\"\n    [tooltip]=\"tooltip\"></spr-label>\n\n  <div class=\"input-container\">\n    <input\n      #d=\"ngbDatepicker\"\n      (closed)=\"cvaOnTouched()\"\n      (click)=\"d.toggle()\"\n      [class.is-invalid]=\"isInvalidControl\"\n      [formControl]=\"control\"\n      [id]=\"inputId()\"\n      [value]=\"control.value || ''\"\n      [maxDate]=\"mappedMaxDate\"\n      [minDate]=\"mappedMinDate\"\n      [name]=\"inputId()\"\n      [sprControlSize]=\"controlSize\"\n      [placeholder]=\"placeholder()\"\n      class=\"form-datepicker-control\"\n      ngDefaultControl\n      ngbDatepicker\n      readonly />\n\n    @if (deselect() && control.value) {\n      <button\n        (click)=\"deselectDate()\"\n        [disabled]=\"control.disabled\"\n        class=\"btn btn-deselect\"\n        type=\"button\">\n        <i\n          class=\"bo-icon-control-cross\"\n          style=\"font-size: 20px\"></i>\n      </button>\n    } @else {\n      <button\n        (click)=\"d.toggle()\"\n        [disabled]=\"control.disabled\"\n        class=\"btn btn-calendar\"\n        type=\"button\">\n        <i\n          class=\"bo-icon-control-calendar\"\n          style=\"font-size: 20px\"></i>\n      </button>\n    }\n  </div>\n\n  <ng-template #alternative>\n    <ng-content select=\"[alternative]\"></ng-content>\n  </ng-template>\n\n  @if (description || isInvalidControl) {\n    <div class=\"form-field-description\">\n      @if (description && !isInvalidControl) {\n        <spr-field-description>\n          {{ description }}\n        </spr-field-description>\n      }\n\n      @if (isInvalidControl) {\n        <spr-error>\n          {{ ngControl?.control?.errors | getControlErrorMessage: errorMessagesConfig }}\n        </spr-error>\n      }\n    </div>\n  }\n</div>\n", styles: [":host{display:block}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: NgbTooltipModule }, { kind: "pipe", type: GetControlErrorMessagePipe, name: "getControlErrorMessage" }, { kind: "ngmodule", type: NgbDatepickerModule }, { kind: "directive", type: i1$1.NgbInputDatepicker, selector: "input[ngbDatepicker]", inputs: ["autoClose", "contentTemplate", "datepickerClass", "dayTemplate", "dayTemplateData", "displayMonths", "firstDayOfWeek", "footerTemplate", "markDisabled", "minDate", "maxDate", "navigation", "outsideDays", "placement", "popperOptions", "restoreFocus", "showWeekNumbers", "startDate", "container", "positionTarget", "weekdays", "disabled"], outputs: ["dateSelect", "navigate", "closed"], exportAs: ["ngbDatepicker"] }, { kind: "directive", type: SprControlSizeDirective, selector: "[sprControlSize]", inputs: ["sprControlSize"] }, { kind: "component", type: SprFieldDescriptionComponent, selector: "spr-field-description" }, { kind: "component", type: SprErrorComponent, selector: "spr-error" }, { kind: "component", type: SprLabelComponent, selector: "spr-label", inputs: ["label", "inputId", "tooltip", "leftIcon", "rightIcon", "className", "isLabelReverse", "shouldStopLabelClickEventPropagation", "isInline"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprDatepickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-datepicker', imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        NgbTooltipModule,
                        GetControlErrorMessagePipe,
                        NgbDatepickerModule,
                        SprControlSizeDirective,
                        SprFieldDescriptionComponent,
                        SprErrorComponent,
                        SprLabelComponent,
                    ], providers: [{ provide: NgbDatepickerI18n, useClass: DatepickerTranslateService }], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  [class.is-open]=\"d.isOpen()\"\n  class=\"form-dropdown\">\n  <spr-label\n    [label]=\"label\"\n    [inputId]=\"inputId()\"\n    [tooltip]=\"tooltip\"></spr-label>\n\n  <div class=\"input-container\">\n    <input\n      #d=\"ngbDatepicker\"\n      (closed)=\"cvaOnTouched()\"\n      (click)=\"d.toggle()\"\n      [class.is-invalid]=\"isInvalidControl\"\n      [formControl]=\"control\"\n      [id]=\"inputId()\"\n      [value]=\"control.value || ''\"\n      [maxDate]=\"mappedMaxDate\"\n      [minDate]=\"mappedMinDate\"\n      [name]=\"inputId()\"\n      [sprControlSize]=\"controlSize\"\n      [placeholder]=\"placeholder()\"\n      class=\"form-datepicker-control\"\n      ngDefaultControl\n      ngbDatepicker\n      readonly />\n\n    @if (deselect() && control.value) {\n      <button\n        (click)=\"deselectDate()\"\n        [disabled]=\"control.disabled\"\n        class=\"btn btn-deselect\"\n        type=\"button\">\n        <i\n          class=\"bo-icon-control-cross\"\n          style=\"font-size: 20px\"></i>\n      </button>\n    } @else {\n      <button\n        (click)=\"d.toggle()\"\n        [disabled]=\"control.disabled\"\n        class=\"btn btn-calendar\"\n        type=\"button\">\n        <i\n          class=\"bo-icon-control-calendar\"\n          style=\"font-size: 20px\"></i>\n      </button>\n    }\n  </div>\n\n  <ng-template #alternative>\n    <ng-content select=\"[alternative]\"></ng-content>\n  </ng-template>\n\n  @if (description || isInvalidControl) {\n    <div class=\"form-field-description\">\n      @if (description && !isInvalidControl) {\n        <spr-field-description>\n          {{ description }}\n        </spr-field-description>\n      }\n\n      @if (isInvalidControl) {\n        <spr-error>\n          {{ ngControl?.control?.errors | getControlErrorMessage: errorMessagesConfig }}\n        </spr-error>\n      }\n    </div>\n  }\n</div>\n", styles: [":host{display:block}\n"] }]
        }], ctorParameters: () => [{ type: i1$1.NgbCalendar }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [SPR_DATEPICKER_VALUE_FORMATTER]
                }, {
                    type: Optional
                }] }], propDecorators: { minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }] } });

const getMappedDataToDropdown = ({ inputArray, valueKey, textKey, }) => {
    return inputArray.map((item) => ({ text: String(item[textKey]), value: item[valueKey] }));
};

const SLEEPY_OPTIONS = {
    onlySelf: true,
    emitEvent: false,
};

const DEFAULT_PAGE_NUMBER = 0;
const DEFAULT_PAGE_SIZE = 25;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class BaseDropdownControl extends BaseControl {
    constructor() {
        super();
        this.options = [];
        this.withSearch = true;
        this.container = null;
        this.dropdownPlaceholder = '';
        /**
         * The height of the dropdown option in pixels is intended to calculate the minimum buffer size for virtual scroll
         */
        this.dropdownItemHeight = 36;
        /**
         * Maximum number of displayed options in dropdown without scrolling
         */
        this.maxDisplayedItems = 4;
        this.filterStrategy = 'local';
        this.page = DEFAULT_PAGE_NUMBER;
        this.size = DEFAULT_PAGE_SIZE;
        this.isLoading = false;
        this.pageChange = new EventEmitter();
        this.searchChange = new EventEmitter();
        this.blurred = new EventEmitter();
        this.inputDebounceTime = input(200);
        this.minWidth = 0;
        this.bufferPxSize = this.dropdownItemHeight * this.maxDisplayedItems;
        this.isOpen = false;
        this.maxItems = this.maxDisplayedItems;
        this.elementRef = inject((ElementRef));
        this.rendererFactory2 = inject(RendererFactory2);
        this.renderer2 = this.rendererFactory2.createRenderer(null, null);
    }
    ngOnChanges(changes) {
        if (changes['maxDisplayedItems']?.currentValue) {
            this.maxItems = this.maxDisplayedItems;
        }
        if (changes['options']?.currentValue) {
            this.updateSelectedOptionOnOptionsChange(this.options, this.ngControl?.value);
            if (this.options.length && this.options.length < this.maxDisplayedItems) {
                this.maxItems = this.options.length;
            }
            else {
                this.maxItems = this.maxDisplayedItems;
            }
            this.bufferPxSize = this.dropdownItemHeight * this.maxItems;
        }
        if (changes['dropdownItemHeight'] || changes['maxDisplayedItems']) {
            this.bufferPxSize = this.dropdownItemHeight * this.maxItems;
        }
    }
    ngOnInit() {
        super.ngOnInit();
        this.initSearchControl();
        this.initResizeListener();
    }
    clearSearchControl() {
        this.searchControl?.setValue('', SLEEPY_OPTIONS);
        this.cdRef.markForCheck();
    }
    onScrolledIndexChange(index) {
        if (this.filterStrategy === 'local') {
            return;
        }
        const isBottom = index === this.options.length - this.maxItems - 1;
        if (isBottom && this.options.length !== this.totalCount && !this.isLoading) {
            this.page = this.page + 1;
            this.pageChange.emit({
                page: this.page,
                size: this.size,
                name: this.withSearch ? this.searchControl.value : '',
            });
        }
    }
    onOpenChange(isOpen) {
        this.isOpen = isOpen;
        if (isOpen) {
            this.initResizeListener();
        }
        else {
            this.stopResizeListener();
            if (this.withSearch) {
                this.clearSearchControl();
            }
            this.cvaOnTouched();
        }
        this.blurred.emit();
    }
    writeValue(value) {
        this.updateSelectedOptionsOnValueChange(this.options, value);
    }
    initControl() {
        return this.formBuilder.nonNullable.control(null);
    }
    stopResizeListener() {
        if (this.resizeListener) {
            this.resizeListener();
        }
    }
    initSearchControl() {
        if (this.withSearch) {
            this.searchControl = this.formBuilder.nonNullable.control('');
            if (this.filterStrategy === 'api') {
                this.searchControl.valueChanges
                    .pipe(debounceTime(this.inputDebounceTime()), takeUntilDestroyed(this.destroyRef))
                    .subscribe((name) => {
                    this.page = 0;
                    this.searchChange.emit({
                        name,
                        page: this.page,
                        size: this.size,
                    });
                });
            }
        }
    }
    initResizeListener() {
        this.minWidth = this.elementRef.nativeElement.clientWidth;
        this.resizeListener = this.renderer2.listen(window, 'resize', () => {
            this.minWidth = this.elementRef.nativeElement.clientWidth;
            this.cdRef.markForCheck();
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: BaseDropdownControl, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "19.2.14", type: BaseDropdownControl, isStandalone: true, inputs: { options: { classPropertyName: "options", publicName: "options", isSignal: false, isRequired: false, transformFunction: null }, withSearch: { classPropertyName: "withSearch", publicName: "withSearch", isSignal: false, isRequired: false, transformFunction: null }, container: { classPropertyName: "container", publicName: "container", isSignal: false, isRequired: false, transformFunction: null }, dropdownPlaceholder: { classPropertyName: "dropdownPlaceholder", publicName: "dropdownPlaceholder", isSignal: false, isRequired: false, transformFunction: null }, dropdownItemHeight: { classPropertyName: "dropdownItemHeight", publicName: "dropdownItemHeight", isSignal: false, isRequired: false, transformFunction: null }, maxDisplayedItems: { classPropertyName: "maxDisplayedItems", publicName: "maxDisplayedItems", isSignal: false, isRequired: false, transformFunction: null }, filterStrategy: { classPropertyName: "filterStrategy", publicName: "filterStrategy", isSignal: false, isRequired: false, transformFunction: null }, page: { classPropertyName: "page", publicName: "page", isSignal: false, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: false, isRequired: false, transformFunction: null }, totalCount: { classPropertyName: "totalCount", publicName: "totalCount", isSignal: false, isRequired: false, transformFunction: null }, isLoading: { classPropertyName: "isLoading", publicName: "isLoading", isSignal: false, isRequired: false, transformFunction: null }, inputDebounceTime: { classPropertyName: "inputDebounceTime", publicName: "inputDebounceTime", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { pageChange: "pageChange", searchChange: "searchChange", blurred: "blurred" }, usesInheritance: true, usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: BaseDropdownControl, decorators: [{
            type: Directive
        }], ctorParameters: () => [], propDecorators: { options: [{
                type: Input
            }], withSearch: [{
                type: Input
            }], container: [{
                type: Input
            }], dropdownPlaceholder: [{
                type: Input
            }], dropdownItemHeight: [{
                type: Input
            }], maxDisplayedItems: [{
                type: Input
            }], filterStrategy: [{
                type: Input
            }], page: [{
                type: Input
            }], size: [{
                type: Input
            }], totalCount: [{
                type: Input
            }], isLoading: [{
                type: Input
            }], pageChange: [{
                type: Output
            }], searchChange: [{
                type: Output
            }], blurred: [{
                type: Output
            }] } });

class SprSpinnerComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprSpinnerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: SprSpinnerComponent, isStandalone: true, selector: "spr-spinner", ngImport: i0, template: "<div class=\"spinner\">\n  <div class=\"spinner-border\"></div>\n</div>\n", styles: [":host{position:absolute;z-index:10000;top:0;right:0;width:100%;height:100%;background-color:rgb(var(--spr-grey-250)/.2)}.spinner{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.spinner .spinner-border{border-width:2px}.spinner-border{--brd-spinner-animation-speed: .75s;display:inline-block;width:32px;height:32px;vertical-align:-2px;border:2px solid currentcolor;border-radius:50%;border-right-color:transparent;animation:var(--brd-spinner-animation-speed) linear infinite spinner-border}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprSpinnerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-spinner', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"spinner\">\n  <div class=\"spinner-border\"></div>\n</div>\n", styles: [":host{position:absolute;z-index:10000;top:0;right:0;width:100%;height:100%;background-color:rgb(var(--spr-grey-250)/.2)}.spinner{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.spinner .spinner-border{border-width:2px}.spinner-border{--brd-spinner-animation-speed: .75s;display:inline-block;width:32px;height:32px;vertical-align:-2px;border:2px solid currentcolor;border-radius:50%;border-right-color:transparent;animation:var(--brd-spinner-animation-speed) linear infinite spinner-border}\n"] }]
        }] });

const NO_SPACES_REGEX = /^[\S]*$/;
const DEFAULT_NAME = /^[.a-zA-Z0-9_-]+$/;
const NUMBER_REGEX = /^[0-9\.,]+$/;
const RESTRICTED_NUMBER_INPUT_REGEX = /[^\.,0-9]/g;
const COMMA_REGEX = /,/g;
const POINT_REGEX = /\./g;
const VALID_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ONLY_NUMBERS_DOTS_HYPHENS = /^[0-9.-]*$/;
const FORBIDDEN_SYMBOLS_WITH_NO_SPACES_REGEX = /[-=±/!@#$%^&*()_+{}\[\]:;<>,.?~\\|'"`]/;
const FORBIDDEN_SYMBOLS_WITH_SPACES_REGEX = /[-=±/!@#$%^&*()_+{}\[\]:;<>,.?~\\|'"` ]/;
const FORBIDDEN_SYMBOLS_WITH_NO_NUMBERS_REGEX = /[-=±/!@#$%^&*()_+{}\[\]:;<>,.?~\\|'"`0-9]/;

class SprInputComponent extends BaseControl {
    constructor(renderer2) {
        super();
        this.renderer2 = renderer2;
        this.precision = null;
        this.type = 'text';
        this.placeholder = '';
        this.isNegativeNumbersAcceptable = false;
        this.onlyInteger = false;
        this.isSubmitStrategy = false;
        this.addonStart = null;
        this.addonEnd = null;
        this.prepend = false;
        this.append = false;
        this.rounded = false;
        this.readOnly = false;
        this.isRevealedInput = false;
        this.inputTypeChange = new EventEmitter();
        this.isPasswordVisible = false;
        this.isSubmit = false;
    }
    get displayedInputType() {
        if (this.type !== 'password') {
            return 'text';
        }
        return this.isPasswordVisible ? 'text' : 'password';
    }
    ngAfterViewInit() {
        if (this.isSubmitStrategy) {
            this.initSubmitStrategyListener();
        }
    }
    ngOnChanges(changes) {
        if (changes['precision'] !== null) {
            this.control.updateValueAndValidity();
        }
    }
    togglePasswordVisibility() {
        if (this.isRevealedInput) {
            this.inputTypeChange.emit();
            return;
        }
        this.isPasswordVisible = !this.isPasswordVisible;
    }
    focus() {
        this.inputElement.nativeElement.focus();
    }
    writeValue(value) {
        super.writeValue(value === null ? '' : String(value));
    }
    submitValue() {
        const convertedValue = this.convertValue(this.control.getRawValue(), this.type);
        this.cvaOnChange(convertedValue);
        this.isSubmit = true;
        this.inputElement.nativeElement.blur();
    }
    iconAddonTypeGuard(addon) {
        return addon.icon !== undefined && 'icon' in addon;
    }
    textAddonTypeGuard(addon) {
        return addon.text !== undefined && 'text' in addon;
    }
    initControlListener() {
        this.control.valueChanges
            .pipe(map((value) => {
            if (this.type === 'text' || this.type === 'password' || !value) {
                return value;
            }
            const formattedValue = this.formatValue(value, this.precision, this.isNegativeNumbersAcceptable, this.onlyInteger);
            this.renderer2.setProperty(this.inputElement.nativeElement, 'value', formattedValue);
            return formattedValue;
        }), map((value) => this.convertValue(value, this.type)), takeUntilDestroyed(this.destroyRef))
            .subscribe((value) => {
            if (!this.isSubmitStrategy) {
                this.cvaOnChange(value);
            }
        });
    }
    initControl() {
        return this.formBuilder.nonNullable.control('');
    }
    formatValue(value, precision, isNegativeNumbersAcceptable, onlyInteger) {
        let isNegativeNumber = false;
        if (isNegativeNumbersAcceptable && value[0] === '-') {
            isNegativeNumber = true;
            value = value.slice(1);
        }
        if (!value.match(NUMBER_REGEX)) {
            value = value.replace(RESTRICTED_NUMBER_INPUT_REGEX, '');
        }
        if (value.match(COMMA_REGEX)) {
            value = value.replace(COMMA_REGEX, '.');
        }
        if (onlyInteger) {
            value = value.split('.')[0];
        }
        else {
            if (value.length === 1 && value[0] === '.') {
                value = '0.';
            }
            const isMoreThanOnePoint = value.match(POINT_REGEX);
            if (isMoreThanOnePoint && isMoreThanOnePoint.length > 1) {
                const [integerPart, ...restPart] = value.split('.');
                value = [integerPart, restPart.join('')].join('.');
            }
            if (precision) {
                const number = value.split(/[\,\.]/);
                if (number[1] && number[1].length > precision) {
                    value = `${number[0]}.${number[1].slice(0, precision)}`;
                }
            }
        }
        return `${isNegativeNumber ? '-' : ''}${value}`;
    }
    convertValue(value, type) {
        const num = type === 'number' && value ? (value === '-' ? 0 : value) : value;
        if (!num) {
            return null;
        }
        if (type === 'bigNumber' && !isNaN(parseFloat(num))) {
            return new Big(num).toFixed();
        }
        if (type === 'number') {
            return +num;
        }
        return num;
    }
    initSubmitStrategyListener() {
        if (this.inputElement) {
            let lastValue = this.control.getRawValue();
            fromEvent(this.inputElement.nativeElement, 'focus')
                .pipe(tap(() => {
                lastValue = this.control.getRawValue();
                this.isSubmit = false;
            }), switchMap(() => fromEvent(this.inputElement.nativeElement, 'keydown').pipe(filter((event) => event.code === 'Enter'), take(1), tap(() => (this.isSubmit = true)), takeUntil(fromEvent(this.inputElement.nativeElement, 'blur').pipe(tap(() => {
                if (!this.isSubmit) {
                    this.control.setValue(lastValue, { emitEvent: false });
                }
            }))))), takeUntilDestroyed(this.destroyRef))
                .subscribe(() => this.submitValue());
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprInputComponent, deps: [{ token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: SprInputComponent, isStandalone: true, selector: "spr-input", inputs: { precision: "precision", type: "type", placeholder: "placeholder", isNegativeNumbersAcceptable: "isNegativeNumbersAcceptable", onlyInteger: "onlyInteger", isSubmitStrategy: "isSubmitStrategy", addonStart: "addonStart", addonEnd: "addonEnd", prepend: "prepend", append: "append", rounded: "rounded", maxLength: "maxLength", readOnly: "readOnly", isRevealedInput: "isRevealedInput" }, outputs: { inputTypeChange: "inputTypeChange" }, viewQueries: [{ propertyName: "inputElement", first: true, predicate: ["inputElement"], descendants: true, read: ElementRef }], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<div\n  class=\"form-field\"\n  [sprControlSize]=\"controlSize\"\n  [class.form-field--disabled]=\"ngControl?.disabled\"\n  [class.form-field--rounded]=\"rounded\"\n  [sprLabel]=\"label\"\n  sprLabelPosition=\"start\"\n  [tooltip]=\"tooltip\"\n  [inputId]=\"inputId()\">\n  <div\n    *ngIf=\"addonStart\"\n    class=\"form-field__addon\">\n    <i\n      *ngIf=\"iconAddonTypeGuard(addonStart)\"\n      [class]=\"addonStart.icon\"\n      style=\"font-size: 20px\"></i>\n    <span\n      *ngIf=\"textAddonTypeGuard(addonStart)\"\n      class=\"addon-text\"\n      >{{ addonStart.text }}</span\n    >\n  </div>\n\n  <div\n    class=\"form-field__inner\"\n    [class.form-field__inner-invalid]=\"isInvalidControl\"\n    [class.form-field__inner--addon-start]=\"addonStart\"\n    [class.form-field__inner--addon-end]=\"addonEnd\">\n    <span\n      *ngIf=\"prepend\"\n      class=\"form-field__prepend\"\n      [class.form-field__prepend--disabled]=\"ngControl?.disabled\">\n      <ng-content select=\"[prependContent]\"></ng-content>\n    </span>\n\n    <input\n      #inputElement\n      [class.control-form--colored]=\"isColored\"\n      [class.addon-start]=\"addonStart\"\n      [class.addon-end]=\"addonEnd\"\n      [class.prepend]=\"prepend\"\n      [class.append]=\"append\"\n      [formControl]=\"control\"\n      [id]=\"inputId()\"\n      [name]=\"inputId()\"\n      [ngClass]=\"inputClass\"\n      [placeholder]=\"placeholder\"\n      [type]=\"displayedInputType\"\n      [maxlength]=\"maxLength || null\"\n      (blur)=\"cvaOnTouched()\"\n      autocomplete=\"off\"\n      class=\"form-field__input\"\n      [readOnly]=\"readOnly\"\n      ngDefaultControl />\n\n    <span\n      *ngIf=\"append && type !== 'password' && !isSubmitStrategy\"\n      class=\"form-field__append\"\n      [class.form-field__append--disabled]=\"ngControl?.disabled\">\n      <ng-content select=\"[appendContent]\"></ng-content>\n    </span>\n\n    <button\n      *ngIf=\"type === 'password'\"\n      class=\"form-field__password-button\"\n      type=\"button\"\n      [disabled]=\"!!ngControl?.disabled\"\n      (click)=\"togglePasswordVisibility()\">\n      <i\n        [class]=\"isPasswordVisible ? 'bo-icon-control-eye-on' : 'bo-icon-control-eye-off'\"\n        style=\"font-size: 20px\"></i>\n    </button>\n\n    <button\n      *ngIf=\"isSubmitStrategy\"\n      class=\"form-field__submit-button\"\n      [disabled]=\"!!ngControl?.disabled\"\n      (mousedown)=\"submitValue()\">\n      <i\n        class=\"bo-icon-arrows-corner-down-left\"\n        style=\"font-size: 20px\"></i>\n    </button>\n  </div>\n\n  <div\n    *ngIf=\"addonEnd\"\n    class=\"form-field__addon\">\n    <i\n      *ngIf=\"iconAddonTypeGuard(addonEnd)\"\n      [class]=\"addonEnd.icon\"\n      style=\"font-size: 20px\"></i>\n    <span\n      *ngIf=\"textAddonTypeGuard(addonEnd)\"\n      class=\"addon-text\"\n      >{{ addonEnd.text }}</span\n    >\n  </div>\n</div>\n\n@if (description || isInvalidControl) {\n  <div class=\"form-field-description\">\n    @if (description && !isInvalidControl) {\n      <spr-field-description class=\"input-description\">\n        {{ description }}\n      </spr-field-description>\n    }\n\n    @if (isInvalidControl) {\n      <spr-error>\n        {{ ngControl?.control?.errors | getControlErrorMessage: errorMessagesConfig }}\n      </spr-error>\n    }\n  </div>\n}\n", styles: [":host{display:block}.form-field{--spr-form-field-radius: var(--spr-custom-form-field-radius, var(--spr-control-radius));--spr-form-field-bg: var(--spr-custom-form-field-bg, var(--brd-fill-default-0));--spr-form-field-bg-disabled: var(--spr-custom-form-field-bg-disabled, var(--brd-fill-disabled-250));--spr-form-field-border-color: var(--spr-custom-form-field-border-color, var(--brd-border-default-400));--spr-form-field-border-color-invalid: var(--spr-custom-form-field-border-color-invalid, var(--brd-border-destructive-600));--spr-form-field-border-color-hover: var(--spr-custom-form-field-border-color-hover, var(--brd-fill-accent-hover-base));--spr-form-field-border-color-focus: var(--spr-custom-form-field-border-color-focus, var(--brd-border-accent-hover-base));--spr-form-field-color: var(--spr-custom-form-field-color, var(--brd-text-primary-800));--spr-form-field-color-disabled: var(--spr-custom-form-field-color-disabled, var(--brd-text-default-800));--spr-form-field-placeholder-color: var(--spr-custom-form-field-placeholder-color, var(--brd-text-secondary-500));--spr-form-field-addon-bg: var(-spr-custom-form-field-addon-bg, var(--brd-fill-default-100));--spr-form-field-addon-border-color: var(--spr-custom-form-field-addon-border-color, var(--spr-form-field-border-color));--spr-form-field-addon-border-color-disabled: var(--spr-custom-form-field-addon-border-color-disabled, var(--brd-border-default-400));--spr-form-field-addon-color: var(--spr-custom-form-field-addon-color, var(--brd-icon-default-500));--spr-form-field-appends-color: var(--spr-custom-form-field-appends-color, var(--brd-icon-default-500));--spr-form-field-submit-button-color: var(--spr-custom-form-field-submit-button-color, var(--brd-icon-default-700));--spr-form-field-password-button-color: var(--spr-custom-form-field-password-button-color, var(--brd-icon-default-500));display:flex}.form-field.control-form--middle .form-field__input{padding:var(--spr-control-padding-y-md) var(--spr-control-padding-x-md);padding-left:0;font-size:var(--spr-control-font-size-md)}.form-field.control-form--middle .form-field__input:first-child{padding-inline:var(--spr-control-padding-x-md)}.form-field.control-form--middle .form-field__addon{padding-inline:var(--spr-control-padding-x-md);font-size:var(--spr-control-font-size-md)}.form-field.control-form--middle .form-field__prepend,.form-field.control-form--middle .form-field__append{width:32px;font-size:var(--spr-font-size-16)}.form-field.control-form--large .form-field__input{padding:var(--spr-control-padding-y-lg) var(--spr-control-padding-x-lg);padding-left:0;font-size:var(--spr-control-font-size-lg)}.form-field.control-form--large .form-field__input:first-child{padding-inline:var(--spr-control-padding-x-lg)}.form-field.control-form--large .form-field__addon{padding-inline:11px;font-size:var(--spr-control-font-size-lg)}.form-field.control-form--large .form-field__prepend,.form-field.control-form--large .form-field__append{width:36px;font-size:var(--spr-font-size-20)}.form-field.form-field--disabled{--spr-form-field-color: var(--spr-form-field-color-disabled)}.form-field.form-field--disabled .form-field__inner{background-color:var(--spr-form-field-bg-disabled)}.form-field.form-field--rounded{--spr-form-field-radius: 24px}.form-field__addon{border:var(--spr-control-border-width) solid var(--spr-form-field-addon-border-color);border-radius:var(--spr-form-field-radius);display:flex;align-items:center;background:var(--spr-form-field-addon-bg);color:var(--spr-form-field-addon-color);flex-shrink:0;cursor:default}.form-field__addon:first-child{border-top-right-radius:0;border-bottom-right-radius:0;border-right:0}.form-field__addon:last-child{border-top-left-radius:0;border-bottom-left-radius:0;border-left:0}.form-field__inner{flex-grow:1;display:flex;background-color:var(--spr-form-field-bg);border:var(--spr-control-border-width) solid var(--spr-form-field-border-color);border-radius:var(--spr-form-field-radius);transition:border var(--spr-transition-time) ease}.form-field__inner.form-field__inner--addon-start{border-top-left-radius:0;border-bottom-left-radius:0}.form-field__inner.form-field__inner--addon-end{border-top-right-radius:0;border-bottom-right-radius:0}.form-field__inner:hover:not(.form-field__inner-invalid,.form-field--disabled .form-field__inner:hover){border-color:var(--spr-form-field-border-color-hover)}.form-field__inner:has(.form-field__input:focus){border-color:var(--spr-form-field-border-color-focus);box-shadow:inset 0 0 0 1px var(--spr-form-field-border-color-focus)}.form-field__inner:has(.form-field__input:focus).form-field__inner-invalid{border-color:var(--spr-form-field-border-color-invalid);box-shadow:inset 0 0 0 1px var(--spr-form-field-border-color-invalid)}.form-field__inner:has(.form-field__input:focus) .form-field__submit-button{display:block;opacity:1;visibility:visible}.form-field__inner.form-field__inner-invalid{border-color:var(--spr-form-field-border-color-invalid)}.form-field__input{flex-grow:1;background-color:transparent;border:0;appearance:none;outline:none;z-index:0;color:var(--spr-form-field-color);line-height:var(--spr-control-line-height);width:100%}.form-field__input::placeholder{color:var(--spr-form-field-placeholder-color)}.form-field__prepend,.form-field__append{display:flex;justify-content:center;align-items:center;flex-shrink:0;color:var(--spr-custom-form-field-appends-color, var(--spr-form-field-appends-color))}.form-field__prepend--disabled,.form-field__append--disabled{pointer-events:none}.form-field__submit-button{display:none;width:36px;height:34px;border:none;color:var(--spr-form-field-submit-button-color);background:transparent;opacity:0;visibility:hidden;transition:opacity var(--spr-transition-time) ease}.form-field__password-button{width:44px;background-color:transparent;outline:none;border:none;padding:0;display:flex;justify-content:center;align-items:center;color:var(--spr-custom-form-field-password-button-color, var(--spr-form-field-password-button-color))}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { kind: "directive", type: i1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "pipe", type: GetControlErrorMessagePipe, name: "getControlErrorMessage" }, { kind: "ngmodule", type: ClipboardModule }, { kind: "directive", type: SprControlSizeDirective, selector: "[sprControlSize]", inputs: ["sprControlSize"] }, { kind: "component", type: SprErrorComponent, selector: "spr-error" }, { kind: "component", type: SprFieldDescriptionComponent, selector: "spr-field-description" }, { kind: "directive", type: SprLabelDirective, selector: "[sprLabel]", inputs: ["shouldStopLabelClickEventPropagation", "sprLabel", "sprLabelPosition", "sprLabelClass", "sprLabelIsInline", "sprLabelLeftIcon", "sprLabelRightIcon", "tooltip", "inputId"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-input', imports: [
                        NgIf,
                        NgClass,
                        ReactiveFormsModule,
                        GetControlErrorMessagePipe,
                        ClipboardModule,
                        SprControlSizeDirective,
                        SprErrorComponent,
                        SprFieldDescriptionComponent,
                        SprLabelDirective,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"form-field\"\n  [sprControlSize]=\"controlSize\"\n  [class.form-field--disabled]=\"ngControl?.disabled\"\n  [class.form-field--rounded]=\"rounded\"\n  [sprLabel]=\"label\"\n  sprLabelPosition=\"start\"\n  [tooltip]=\"tooltip\"\n  [inputId]=\"inputId()\">\n  <div\n    *ngIf=\"addonStart\"\n    class=\"form-field__addon\">\n    <i\n      *ngIf=\"iconAddonTypeGuard(addonStart)\"\n      [class]=\"addonStart.icon\"\n      style=\"font-size: 20px\"></i>\n    <span\n      *ngIf=\"textAddonTypeGuard(addonStart)\"\n      class=\"addon-text\"\n      >{{ addonStart.text }}</span\n    >\n  </div>\n\n  <div\n    class=\"form-field__inner\"\n    [class.form-field__inner-invalid]=\"isInvalidControl\"\n    [class.form-field__inner--addon-start]=\"addonStart\"\n    [class.form-field__inner--addon-end]=\"addonEnd\">\n    <span\n      *ngIf=\"prepend\"\n      class=\"form-field__prepend\"\n      [class.form-field__prepend--disabled]=\"ngControl?.disabled\">\n      <ng-content select=\"[prependContent]\"></ng-content>\n    </span>\n\n    <input\n      #inputElement\n      [class.control-form--colored]=\"isColored\"\n      [class.addon-start]=\"addonStart\"\n      [class.addon-end]=\"addonEnd\"\n      [class.prepend]=\"prepend\"\n      [class.append]=\"append\"\n      [formControl]=\"control\"\n      [id]=\"inputId()\"\n      [name]=\"inputId()\"\n      [ngClass]=\"inputClass\"\n      [placeholder]=\"placeholder\"\n      [type]=\"displayedInputType\"\n      [maxlength]=\"maxLength || null\"\n      (blur)=\"cvaOnTouched()\"\n      autocomplete=\"off\"\n      class=\"form-field__input\"\n      [readOnly]=\"readOnly\"\n      ngDefaultControl />\n\n    <span\n      *ngIf=\"append && type !== 'password' && !isSubmitStrategy\"\n      class=\"form-field__append\"\n      [class.form-field__append--disabled]=\"ngControl?.disabled\">\n      <ng-content select=\"[appendContent]\"></ng-content>\n    </span>\n\n    <button\n      *ngIf=\"type === 'password'\"\n      class=\"form-field__password-button\"\n      type=\"button\"\n      [disabled]=\"!!ngControl?.disabled\"\n      (click)=\"togglePasswordVisibility()\">\n      <i\n        [class]=\"isPasswordVisible ? 'bo-icon-control-eye-on' : 'bo-icon-control-eye-off'\"\n        style=\"font-size: 20px\"></i>\n    </button>\n\n    <button\n      *ngIf=\"isSubmitStrategy\"\n      class=\"form-field__submit-button\"\n      [disabled]=\"!!ngControl?.disabled\"\n      (mousedown)=\"submitValue()\">\n      <i\n        class=\"bo-icon-arrows-corner-down-left\"\n        style=\"font-size: 20px\"></i>\n    </button>\n  </div>\n\n  <div\n    *ngIf=\"addonEnd\"\n    class=\"form-field__addon\">\n    <i\n      *ngIf=\"iconAddonTypeGuard(addonEnd)\"\n      [class]=\"addonEnd.icon\"\n      style=\"font-size: 20px\"></i>\n    <span\n      *ngIf=\"textAddonTypeGuard(addonEnd)\"\n      class=\"addon-text\"\n      >{{ addonEnd.text }}</span\n    >\n  </div>\n</div>\n\n@if (description || isInvalidControl) {\n  <div class=\"form-field-description\">\n    @if (description && !isInvalidControl) {\n      <spr-field-description class=\"input-description\">\n        {{ description }}\n      </spr-field-description>\n    }\n\n    @if (isInvalidControl) {\n      <spr-error>\n        {{ ngControl?.control?.errors | getControlErrorMessage: errorMessagesConfig }}\n      </spr-error>\n    }\n  </div>\n}\n", styles: [":host{display:block}.form-field{--spr-form-field-radius: var(--spr-custom-form-field-radius, var(--spr-control-radius));--spr-form-field-bg: var(--spr-custom-form-field-bg, var(--brd-fill-default-0));--spr-form-field-bg-disabled: var(--spr-custom-form-field-bg-disabled, var(--brd-fill-disabled-250));--spr-form-field-border-color: var(--spr-custom-form-field-border-color, var(--brd-border-default-400));--spr-form-field-border-color-invalid: var(--spr-custom-form-field-border-color-invalid, var(--brd-border-destructive-600));--spr-form-field-border-color-hover: var(--spr-custom-form-field-border-color-hover, var(--brd-fill-accent-hover-base));--spr-form-field-border-color-focus: var(--spr-custom-form-field-border-color-focus, var(--brd-border-accent-hover-base));--spr-form-field-color: var(--spr-custom-form-field-color, var(--brd-text-primary-800));--spr-form-field-color-disabled: var(--spr-custom-form-field-color-disabled, var(--brd-text-default-800));--spr-form-field-placeholder-color: var(--spr-custom-form-field-placeholder-color, var(--brd-text-secondary-500));--spr-form-field-addon-bg: var(-spr-custom-form-field-addon-bg, var(--brd-fill-default-100));--spr-form-field-addon-border-color: var(--spr-custom-form-field-addon-border-color, var(--spr-form-field-border-color));--spr-form-field-addon-border-color-disabled: var(--spr-custom-form-field-addon-border-color-disabled, var(--brd-border-default-400));--spr-form-field-addon-color: var(--spr-custom-form-field-addon-color, var(--brd-icon-default-500));--spr-form-field-appends-color: var(--spr-custom-form-field-appends-color, var(--brd-icon-default-500));--spr-form-field-submit-button-color: var(--spr-custom-form-field-submit-button-color, var(--brd-icon-default-700));--spr-form-field-password-button-color: var(--spr-custom-form-field-password-button-color, var(--brd-icon-default-500));display:flex}.form-field.control-form--middle .form-field__input{padding:var(--spr-control-padding-y-md) var(--spr-control-padding-x-md);padding-left:0;font-size:var(--spr-control-font-size-md)}.form-field.control-form--middle .form-field__input:first-child{padding-inline:var(--spr-control-padding-x-md)}.form-field.control-form--middle .form-field__addon{padding-inline:var(--spr-control-padding-x-md);font-size:var(--spr-control-font-size-md)}.form-field.control-form--middle .form-field__prepend,.form-field.control-form--middle .form-field__append{width:32px;font-size:var(--spr-font-size-16)}.form-field.control-form--large .form-field__input{padding:var(--spr-control-padding-y-lg) var(--spr-control-padding-x-lg);padding-left:0;font-size:var(--spr-control-font-size-lg)}.form-field.control-form--large .form-field__input:first-child{padding-inline:var(--spr-control-padding-x-lg)}.form-field.control-form--large .form-field__addon{padding-inline:11px;font-size:var(--spr-control-font-size-lg)}.form-field.control-form--large .form-field__prepend,.form-field.control-form--large .form-field__append{width:36px;font-size:var(--spr-font-size-20)}.form-field.form-field--disabled{--spr-form-field-color: var(--spr-form-field-color-disabled)}.form-field.form-field--disabled .form-field__inner{background-color:var(--spr-form-field-bg-disabled)}.form-field.form-field--rounded{--spr-form-field-radius: 24px}.form-field__addon{border:var(--spr-control-border-width) solid var(--spr-form-field-addon-border-color);border-radius:var(--spr-form-field-radius);display:flex;align-items:center;background:var(--spr-form-field-addon-bg);color:var(--spr-form-field-addon-color);flex-shrink:0;cursor:default}.form-field__addon:first-child{border-top-right-radius:0;border-bottom-right-radius:0;border-right:0}.form-field__addon:last-child{border-top-left-radius:0;border-bottom-left-radius:0;border-left:0}.form-field__inner{flex-grow:1;display:flex;background-color:var(--spr-form-field-bg);border:var(--spr-control-border-width) solid var(--spr-form-field-border-color);border-radius:var(--spr-form-field-radius);transition:border var(--spr-transition-time) ease}.form-field__inner.form-field__inner--addon-start{border-top-left-radius:0;border-bottom-left-radius:0}.form-field__inner.form-field__inner--addon-end{border-top-right-radius:0;border-bottom-right-radius:0}.form-field__inner:hover:not(.form-field__inner-invalid,.form-field--disabled .form-field__inner:hover){border-color:var(--spr-form-field-border-color-hover)}.form-field__inner:has(.form-field__input:focus){border-color:var(--spr-form-field-border-color-focus);box-shadow:inset 0 0 0 1px var(--spr-form-field-border-color-focus)}.form-field__inner:has(.form-field__input:focus).form-field__inner-invalid{border-color:var(--spr-form-field-border-color-invalid);box-shadow:inset 0 0 0 1px var(--spr-form-field-border-color-invalid)}.form-field__inner:has(.form-field__input:focus) .form-field__submit-button{display:block;opacity:1;visibility:visible}.form-field__inner.form-field__inner-invalid{border-color:var(--spr-form-field-border-color-invalid)}.form-field__input{flex-grow:1;background-color:transparent;border:0;appearance:none;outline:none;z-index:0;color:var(--spr-form-field-color);line-height:var(--spr-control-line-height);width:100%}.form-field__input::placeholder{color:var(--spr-form-field-placeholder-color)}.form-field__prepend,.form-field__append{display:flex;justify-content:center;align-items:center;flex-shrink:0;color:var(--spr-custom-form-field-appends-color, var(--spr-form-field-appends-color))}.form-field__prepend--disabled,.form-field__append--disabled{pointer-events:none}.form-field__submit-button{display:none;width:36px;height:34px;border:none;color:var(--spr-form-field-submit-button-color);background:transparent;opacity:0;visibility:hidden;transition:opacity var(--spr-transition-time) ease}.form-field__password-button{width:44px;background-color:transparent;outline:none;border:none;padding:0;display:flex;justify-content:center;align-items:center;color:var(--spr-custom-form-field-password-button-color, var(--spr-form-field-password-button-color))}\n"] }]
        }], ctorParameters: () => [{ type: i0.Renderer2 }], propDecorators: { precision: [{
                type: Input
            }], type: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], isNegativeNumbersAcceptable: [{
                type: Input
            }], onlyInteger: [{
                type: Input
            }], isSubmitStrategy: [{
                type: Input
            }], addonStart: [{
                type: Input
            }], addonEnd: [{
                type: Input
            }], prepend: [{
                type: Input
            }], append: [{
                type: Input
            }], rounded: [{
                type: Input
            }], maxLength: [{
                type: Input
            }], readOnly: [{
                type: Input
            }], isRevealedInput: [{
                type: Input
            }], inputTypeChange: [{
                type: Output
            }], inputElement: [{
                type: ViewChild,
                args: ['inputElement', { read: ElementRef }]
            }] } });

class SprDropdownComponent extends BaseDropdownControl {
    constructor() {
        super(...arguments);
        this.placeholder = 'Search...';
        this.inputPlaceholder = '';
        this.addonStart = null;
        this.addonEnd = null;
    }
    select(option) {
        this.control.setValue(option);
        if (this.withSearch) {
            this.clearSearchControl();
        }
    }
    iconAddonTypeGuard(addon) {
        return addon.icon !== undefined && 'icon' in addon;
    }
    textAddonTypeGuard(addon) {
        return addon.text !== undefined && 'text' in addon;
    }
    updateSelectedOptionsOnValueChange(options, value) {
        this.updateSelectedOptions(options, value);
        this.cdRef.markForCheck();
    }
    updateSelectedOptionOnOptionsChange(options, value) {
        this.updateSelectedOptions(options, value);
        this.cdRef.markForCheck();
    }
    initControl() {
        return this.formBuilder.nonNullable.control(null);
    }
    initControlListener() {
        this.control.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((option) => {
            this.cvaOnChange(option?.value);
        });
    }
    updateSelectedOptions(options, value) {
        const option = options.find((opt) => opt.value === value);
        if (option) {
            this.control.setValue(option, { emitEvent: false });
        }
        else {
            const newOption = this.control.value && this.control.value.value === value
                ? this.control.value
                : {
                    text: '',
                    value,
                };
            this.control.setValue(newOption, { emitEvent: false });
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprDropdownComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: SprDropdownComponent, isStandalone: true, selector: "spr-dropdown", inputs: { placeholder: "placeholder", inputPlaceholder: "inputPlaceholder", addonStart: "addonStart", addonEnd: "addonEnd" }, usesInheritance: true, ngImport: i0, template: "<div\n  ngbDropdown\n  [container]=\"container\"\n  class=\"form-dropdown\"\n  (openChange)=\"onOpenChange($event)\">\n  <spr-label\n    [label]=\"label\"\n    [tooltip]=\"tooltip\"></spr-label>\n\n  <div\n    ngbDropdownToggle\n    tabindex=\"1\"\n    class=\"form-dropdown__control\"\n    [sprControlSize]=\"controlSize\"\n    [class.form-dropdown__control--disabled]=\"ngControl?.disabled\">\n    <div\n      *ngIf=\"addonStart\"\n      class=\"form-dropdown__addon\">\n      <i\n        *ngIf=\"iconAddonTypeGuard(addonStart)\"\n        [ngClass]=\"addonStart.icon\"></i>\n      <span\n        *ngIf=\"textAddonTypeGuard(addonStart)\"\n        class=\"addon-text\"\n        >{{ addonStart.text }}</span\n      >\n    </div>\n\n    <div\n      class=\"form-dropdown__inner\"\n      tabindex=\"2\"\n      [class.form-dropdown__inner--addon-start]=\"addonStart\"\n      [class.form-dropdown__inner--addon-end]=\"addonEnd\"\n      [class.form-dropdown__inner-invalid]=\"isInvalidControl\">\n      <span\n        *ngIf=\"control.value?.icon\"\n        class=\"form-dropdown__prepend\"\n        [class.form-dropdown__prepend--disabled]=\"ngControl?.disabled\">\n        <i\n          [ngClass]=\"control.value!.icon\"\n          class=\"bo-icon\"></i>\n      </span>\n\n      <div class=\"form-dropdown__input-container\">\n        <input\n          [class.addon-start]=\"addonStart\"\n          [class.addon-end]=\"addonEnd\"\n          [class.prepend]=\"control.value?.icon\"\n          [class.is-invalid]=\"isInvalidControl\"\n          [sprControlSize]=\"controlSize\"\n          [placeholder]=\"inputPlaceholder\"\n          [disabled]=\"control.disabled\"\n          [value]=\"dropdownPlaceholder && !control.value?.value ? dropdownPlaceholder : control.value?.text\"\n          [id]=\"inputId()\"\n          class=\"form-select-control\"\n          readonly\n          type=\"text\" />\n        <i class=\"bo-icon-arrows-chevron-down form-dropdown__icon form-dropdown__icon--right\"></i>\n      </div>\n\n      <div\n        class=\"dropdown-list-container\"\n        [attr.aria-labelledby]=\"inputId()\"\n        [style.min-width.px]=\"minWidth\"\n        ngbDropdownMenu>\n        <div\n          *ngIf=\"withSearch\"\n          class=\"dropdown-list-container-header\">\n          <spr-input\n            [formControl]=\"searchControl\"\n            [placeholder]=\"placeholder\" />\n        </div>\n\n        <cdk-virtual-scroll-viewport\n          *ngIf=\"isOpen\"\n          class=\"dropdown-list-container-body\"\n          [itemSize]=\"dropdownItemHeight\"\n          [maxBufferPx]=\"bufferPxSize\"\n          [minBufferPx]=\"bufferPxSize\"\n          [style.min-height.px]=\"bufferPxSize\"\n          (scrolledIndexChange)=\"onScrolledIndexChange($event)\">\n          <ng-container [ngSwitch]=\"filterStrategy\">\n            <ng-container *ngSwitchCase=\"'local'\">\n              <ng-container *cdkVirtualFor=\"let option of withSearch ? (options | filterOptions: searchControl.value) : options\">\n                <ng-container *ngTemplateOutlet=\"dropdownItem; context: { $implicit: option }\"></ng-container>\n              </ng-container>\n            </ng-container>\n\n            <ng-container *ngSwitchCase=\"'api'\">\n              <ng-container *cdkVirtualFor=\"let option of options\">\n                <ng-container *ngTemplateOutlet=\"dropdownItem; context: { $implicit: option }\"></ng-container>\n              </ng-container>\n            </ng-container>\n          </ng-container>\n        </cdk-virtual-scroll-viewport>\n\n        <spr-spinner *ngIf=\"isLoading\"></spr-spinner>\n      </div>\n    </div>\n\n    <div\n      *ngIf=\"addonEnd\"\n      class=\"form-dropdown__addon\">\n      <i\n        *ngIf=\"iconAddonTypeGuard(addonEnd)\"\n        [ngClass]=\"addonEnd.icon\"></i>\n      <span\n        *ngIf=\"addonEnd && textAddonTypeGuard(addonEnd)\"\n        class=\"addon-text\"\n        >{{ addonEnd.text }}</span\n      >\n    </div>\n  </div>\n\n  @if (description || isInvalidControl) {\n    <div class=\"form-field-description\">\n      @if (description && !isInvalidControl) {\n        <spr-field-description>\n          {{ description }}\n        </spr-field-description>\n      }\n\n      @if (isInvalidControl) {\n        <spr-error>\n          {{ ngControl?.control?.errors | getControlErrorMessage: errorMessagesConfig }}\n        </spr-error>\n      }\n    </div>\n  }\n</div>\n\n<ng-template\n  #dropdownItem\n  let-option>\n  <div\n    [class]=\"`dropdown-item ${option.class ?? ''}`\"\n    [class.disabled]=\"option?.isDisabled\"\n    [class.selected]=\"control.value === option\"\n    (click)=\"select(option)\">\n    <i\n      *ngIf=\"option.icon\"\n      [ngClass]=\"option.icon\"\n      class=\"bo-icon\"></i>\n    <span>{{ option.text }}</span>\n  </div>\n</ng-template>\n", styles: [":host{display:block;width:100%}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1$2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1$2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i1$2.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "component", type: SprSpinnerComponent, selector: "spr-spinner" }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "pipe", type: FilterOptionsPipe, name: "filterOptions" }, { kind: "pipe", type: GetControlErrorMessagePipe, name: "getControlErrorMessage" }, { kind: "directive", type: SprControlSizeDirective, selector: "[sprControlSize]", inputs: ["sprControlSize"] }, { kind: "ngmodule", type: NgbDropdownModule }, { kind: "directive", type: i1$1.NgbDropdown, selector: "[ngbDropdown]", inputs: ["autoClose", "dropdownClass", "open", "placement", "popperOptions", "container", "display"], outputs: ["openChange"], exportAs: ["ngbDropdown"] }, { kind: "directive", type: i1$1.NgbDropdownToggle, selector: "[ngbDropdownToggle]" }, { kind: "directive", type: i1$1.NgbDropdownMenu, selector: "[ngbDropdownMenu]" }, { kind: "component", type: SprLabelComponent, selector: "spr-label", inputs: ["label", "inputId", "tooltip", "leftIcon", "rightIcon", "className", "isLabelReverse", "shouldStopLabelClickEventPropagation", "isInline"] }, { kind: "ngmodule", type: ScrollingModule }, { kind: "directive", type: i4.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { kind: "directive", type: i4.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { kind: "component", type: i4.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }, { kind: "component", type: SprErrorComponent, selector: "spr-error" }, { kind: "component", type: SprFieldDescriptionComponent, selector: "spr-field-description" }, { kind: "component", type: SprInputComponent, selector: "spr-input", inputs: ["precision", "type", "placeholder", "isNegativeNumbersAcceptable", "onlyInteger", "isSubmitStrategy", "addonStart", "addonEnd", "prepend", "append", "rounded", "maxLength", "readOnly", "isRevealedInput"], outputs: ["inputTypeChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprDropdownComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-dropdown', imports: [
                        CommonModule,
                        SprSpinnerComponent,
                        ReactiveFormsModule,
                        FilterOptionsPipe,
                        GetControlErrorMessagePipe,
                        SprControlSizeDirective,
                        NgbDropdownModule,
                        SprLabelComponent,
                        ScrollingModule,
                        SprErrorComponent,
                        SprFieldDescriptionComponent,
                        SprInputComponent,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  ngbDropdown\n  [container]=\"container\"\n  class=\"form-dropdown\"\n  (openChange)=\"onOpenChange($event)\">\n  <spr-label\n    [label]=\"label\"\n    [tooltip]=\"tooltip\"></spr-label>\n\n  <div\n    ngbDropdownToggle\n    tabindex=\"1\"\n    class=\"form-dropdown__control\"\n    [sprControlSize]=\"controlSize\"\n    [class.form-dropdown__control--disabled]=\"ngControl?.disabled\">\n    <div\n      *ngIf=\"addonStart\"\n      class=\"form-dropdown__addon\">\n      <i\n        *ngIf=\"iconAddonTypeGuard(addonStart)\"\n        [ngClass]=\"addonStart.icon\"></i>\n      <span\n        *ngIf=\"textAddonTypeGuard(addonStart)\"\n        class=\"addon-text\"\n        >{{ addonStart.text }}</span\n      >\n    </div>\n\n    <div\n      class=\"form-dropdown__inner\"\n      tabindex=\"2\"\n      [class.form-dropdown__inner--addon-start]=\"addonStart\"\n      [class.form-dropdown__inner--addon-end]=\"addonEnd\"\n      [class.form-dropdown__inner-invalid]=\"isInvalidControl\">\n      <span\n        *ngIf=\"control.value?.icon\"\n        class=\"form-dropdown__prepend\"\n        [class.form-dropdown__prepend--disabled]=\"ngControl?.disabled\">\n        <i\n          [ngClass]=\"control.value!.icon\"\n          class=\"bo-icon\"></i>\n      </span>\n\n      <div class=\"form-dropdown__input-container\">\n        <input\n          [class.addon-start]=\"addonStart\"\n          [class.addon-end]=\"addonEnd\"\n          [class.prepend]=\"control.value?.icon\"\n          [class.is-invalid]=\"isInvalidControl\"\n          [sprControlSize]=\"controlSize\"\n          [placeholder]=\"inputPlaceholder\"\n          [disabled]=\"control.disabled\"\n          [value]=\"dropdownPlaceholder && !control.value?.value ? dropdownPlaceholder : control.value?.text\"\n          [id]=\"inputId()\"\n          class=\"form-select-control\"\n          readonly\n          type=\"text\" />\n        <i class=\"bo-icon-arrows-chevron-down form-dropdown__icon form-dropdown__icon--right\"></i>\n      </div>\n\n      <div\n        class=\"dropdown-list-container\"\n        [attr.aria-labelledby]=\"inputId()\"\n        [style.min-width.px]=\"minWidth\"\n        ngbDropdownMenu>\n        <div\n          *ngIf=\"withSearch\"\n          class=\"dropdown-list-container-header\">\n          <spr-input\n            [formControl]=\"searchControl\"\n            [placeholder]=\"placeholder\" />\n        </div>\n\n        <cdk-virtual-scroll-viewport\n          *ngIf=\"isOpen\"\n          class=\"dropdown-list-container-body\"\n          [itemSize]=\"dropdownItemHeight\"\n          [maxBufferPx]=\"bufferPxSize\"\n          [minBufferPx]=\"bufferPxSize\"\n          [style.min-height.px]=\"bufferPxSize\"\n          (scrolledIndexChange)=\"onScrolledIndexChange($event)\">\n          <ng-container [ngSwitch]=\"filterStrategy\">\n            <ng-container *ngSwitchCase=\"'local'\">\n              <ng-container *cdkVirtualFor=\"let option of withSearch ? (options | filterOptions: searchControl.value) : options\">\n                <ng-container *ngTemplateOutlet=\"dropdownItem; context: { $implicit: option }\"></ng-container>\n              </ng-container>\n            </ng-container>\n\n            <ng-container *ngSwitchCase=\"'api'\">\n              <ng-container *cdkVirtualFor=\"let option of options\">\n                <ng-container *ngTemplateOutlet=\"dropdownItem; context: { $implicit: option }\"></ng-container>\n              </ng-container>\n            </ng-container>\n          </ng-container>\n        </cdk-virtual-scroll-viewport>\n\n        <spr-spinner *ngIf=\"isLoading\"></spr-spinner>\n      </div>\n    </div>\n\n    <div\n      *ngIf=\"addonEnd\"\n      class=\"form-dropdown__addon\">\n      <i\n        *ngIf=\"iconAddonTypeGuard(addonEnd)\"\n        [ngClass]=\"addonEnd.icon\"></i>\n      <span\n        *ngIf=\"addonEnd && textAddonTypeGuard(addonEnd)\"\n        class=\"addon-text\"\n        >{{ addonEnd.text }}</span\n      >\n    </div>\n  </div>\n\n  @if (description || isInvalidControl) {\n    <div class=\"form-field-description\">\n      @if (description && !isInvalidControl) {\n        <spr-field-description>\n          {{ description }}\n        </spr-field-description>\n      }\n\n      @if (isInvalidControl) {\n        <spr-error>\n          {{ ngControl?.control?.errors | getControlErrorMessage: errorMessagesConfig }}\n        </spr-error>\n      }\n    </div>\n  }\n</div>\n\n<ng-template\n  #dropdownItem\n  let-option>\n  <div\n    [class]=\"`dropdown-item ${option.class ?? ''}`\"\n    [class.disabled]=\"option?.isDisabled\"\n    [class.selected]=\"control.value === option\"\n    (click)=\"select(option)\">\n    <i\n      *ngIf=\"option.icon\"\n      [ngClass]=\"option.icon\"\n      class=\"bo-icon\"></i>\n    <span>{{ option.text }}</span>\n  </div>\n</ng-template>\n", styles: [":host{display:block;width:100%}\n"] }]
        }], propDecorators: { placeholder: [{
                type: Input
            }], inputPlaceholder: [{
                type: Input
            }], addonStart: [{
                type: Input
            }], addonEnd: [{
                type: Input
            }] } });

class SprInnerHeaderComponent {
    constructor() {
        this.variant = 'default';
        this.title = '';
        this.withStartContent = false;
        this.withoutBorder = false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprInnerHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: SprInnerHeaderComponent, isStandalone: true, selector: "spr-inner-header", inputs: { variant: "variant", title: "title", withStartContent: "withStartContent", withoutBorder: "withoutBorder" }, ngImport: i0, template: "<div\n  class=\"inner-header\"\n  [ngClass]=\"[variant !== 'default' ? 'inner-header--' + variant : '', withoutBorder ? 'inner-header--no-border' : '']\">\n  <div [class.inner-header__title-container]=\"withStartContent\">\n    <h3\n      *ngIf=\"title\"\n      class=\"inner-header__title\">\n      {{ title }}\n    </h3>\n\n    <ng-content select=\"[start]\"></ng-content>\n  </div>\n\n  <ng-content select=\"[end]\"></ng-content>\n</div>\n", styles: [":host{display:block}.inner-header{display:flex;justify-content:space-between;align-items:center;padding:var(--spr-inner-header-padding-block, 8px) var(--spr-inner-header-padding-inline, 24px);background:var(--spr-inner-header-background, transparent);border-bottom:1px solid var(--brd-border-divider-300);color:var(--brd-text-primary-800);min-height:var(--spr-inner-header-min-height, 52px)}.inner-header--background{--spr-inner-header-background: var(--brd-fill-default-100);padding-left:16px;padding-right:8px;border-bottom:none;border-radius:var(--spr-border-radius-m)}.inner-header--no-padding-inline{--spr-inner-header-padding-inline: 0}.inner-header--large{--spr-inner-header-padding-block: 12px;--spr-inner-header-min-height: 68px}.inner-header--large .inner-header__title{--spr-inner-header-font-size: 20px}.inner-header--small{--spr-inner-header-padding-inline: 16px}.inner-header--no-border{border:none}.inner-header__title{margin:0;font-size:var(--spr-inner-header-font-size, 16px);line-height:var(--spr-inner-header-line-height, 24px);letter-spacing:var(--spr-inner-header-letter-spacing, 0);text-transform:var(--spr-inner-header-text-transform, none)}.inner-header__title-container{display:flex;align-items:center;gap:12px}\n"], dependencies: [{ kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprInnerHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-inner-header', changeDetection: ChangeDetectionStrategy.OnPush, imports: [NgClass, NgIf], template: "<div\n  class=\"inner-header\"\n  [ngClass]=\"[variant !== 'default' ? 'inner-header--' + variant : '', withoutBorder ? 'inner-header--no-border' : '']\">\n  <div [class.inner-header__title-container]=\"withStartContent\">\n    <h3\n      *ngIf=\"title\"\n      class=\"inner-header__title\">\n      {{ title }}\n    </h3>\n\n    <ng-content select=\"[start]\"></ng-content>\n  </div>\n\n  <ng-content select=\"[end]\"></ng-content>\n</div>\n", styles: [":host{display:block}.inner-header{display:flex;justify-content:space-between;align-items:center;padding:var(--spr-inner-header-padding-block, 8px) var(--spr-inner-header-padding-inline, 24px);background:var(--spr-inner-header-background, transparent);border-bottom:1px solid var(--brd-border-divider-300);color:var(--brd-text-primary-800);min-height:var(--spr-inner-header-min-height, 52px)}.inner-header--background{--spr-inner-header-background: var(--brd-fill-default-100);padding-left:16px;padding-right:8px;border-bottom:none;border-radius:var(--spr-border-radius-m)}.inner-header--no-padding-inline{--spr-inner-header-padding-inline: 0}.inner-header--large{--spr-inner-header-padding-block: 12px;--spr-inner-header-min-height: 68px}.inner-header--large .inner-header__title{--spr-inner-header-font-size: 20px}.inner-header--small{--spr-inner-header-padding-inline: 16px}.inner-header--no-border{border:none}.inner-header__title{margin:0;font-size:var(--spr-inner-header-font-size, 16px);line-height:var(--spr-inner-header-line-height, 24px);letter-spacing:var(--spr-inner-header-letter-spacing, 0);text-transform:var(--spr-inner-header-text-transform, none)}.inner-header__title-container{display:flex;align-items:center;gap:12px}\n"] }]
        }], propDecorators: { variant: [{
                type: Input
            }], title: [{
                type: Input
            }], withStartContent: [{
                type: Input
            }], withoutBorder: [{
                type: Input
            }] } });

class GetMultiSelectDisplayValuePipe {
    transform(value) {
        if (!value || !value.length) {
            return '';
        }
        return value.map((o) => o.text).join(', ');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: GetMultiSelectDisplayValuePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.14", ngImport: i0, type: GetMultiSelectDisplayValuePipe, isStandalone: true, name: "getMultiSelectDisplayValue", pure: false }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: GetMultiSelectDisplayValuePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'getMultiSelectDisplayValue',
                    standalone: true,
                    pure: false,
                }]
        }] });

class IsSelectedOptionPipe {
    transform(options, currentOption) {
        if (options.length === 1 && !options[0].value) {
            return true;
        }
        return options.some((o) => o.value === currentOption.value);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: IsSelectedOptionPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.14", ngImport: i0, type: IsSelectedOptionPipe, isStandalone: true, name: "isSelectedOption" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: IsSelectedOptionPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'isSelectedOption',
                    standalone: true,
                }]
        }] });

class SprMultiSelectDropdownComponent extends BaseDropdownControl {
    constructor() {
        super(...arguments);
        this.isSelectedAllOption = true;
        this.inputPlaceholder = '';
        this.addonStart = null;
        this.addonEnd = null;
        this.notSelectedOption = inject(NOT_SELECTED_FILTER_TOKEN, { optional: true });
    }
    select(option) {
        if (!option.value) {
            if (this.control.value.length === 1 && !this.control.value[0].value) {
                this.control.setValue(this.options.filter(({ isDisabled, value }) => isDisabled && value));
                return;
            }
            this.control.setValue([option]);
            return;
        }
        else if (this.control.value.length === 1 && !this.control.value[0].value) {
            this.control.setValue(this.options.filter((o) => o !== option && Boolean(o.value)));
            return;
        }
        if (this.control.value.some((o) => o.value === option.value)) {
            this.control.setValue(this.control.value.filter((o) => o.value !== option.value));
        }
        else {
            const newOptions = [...this.control.value, option].filter((o) => Boolean(o.value));
            if (newOptions.length === this.options.filter((o) => Boolean(o.value)).length && this.isSelectedAllOption) {
                this.control.setValue([this.notSelectedOption || NOT_SELECTED_FILTER]);
            }
            else {
                this.control.setValue(newOptions);
            }
        }
    }
    iconAddonTypeGuard(addon) {
        return addon.icon !== undefined && 'icon' in addon;
    }
    textAddonTypeGuard(addon) {
        return addon.text !== undefined && 'text' in addon;
    }
    updateSelectedOptionsOnValueChange(options, value) {
        this.updatedSelectedOptions(options, value, true);
        this.cdRef.markForCheck();
    }
    updateSelectedOptionOnOptionsChange(options, value) {
        this.updatedSelectedOptions(options, value, false);
        this.cdRef.markForCheck();
    }
    initControlListener() {
        this.control.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((options) => {
            const mappedOptions = (options || []).map((option) => option.value);
            this.cvaOnChange(mappedOptions);
        });
    }
    initControl() {
        return this.formBuilder.nonNullable.control([]);
    }
    updatedSelectedOptions(options, value, isWriteValue) {
        if (!value || !value.length) {
            this.control.setValue([], { emitEvent: false });
        }
        else if (this.filterStrategy === 'api' && !isWriteValue && this.control.value.length === value.length) {
            return;
        }
        else {
            const filteredOptions = options.filter((opt) => value.includes(opt.value));
            if (filteredOptions.length) {
                this.control.setValue(filteredOptions, { emitEvent: false });
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprMultiSelectDropdownComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: SprMultiSelectDropdownComponent, isStandalone: true, selector: "spr-multi-select-dropdown", inputs: { isSelectedAllOption: "isSelectedAllOption", inputPlaceholder: "inputPlaceholder", addonStart: "addonStart", addonEnd: "addonEnd" }, usesInheritance: true, hostDirectives: [{ directive: SprLabelDirective, inputs: ["inputId", "inputId", "tooltip", "tooltip", "sprLabel", "label", "sprLabelIsInline", "labelIsInline", "sprLabelClass", "labelClass", "sprLabelPosition", "labelPosition", "sprLabelLeftIcon", "labelLeftIcon", "sprLabelRightIcon", "labelRightIcon"] }], ngImport: i0, template: "<div\n  ngbDropdown\n  [container]=\"container\"\n  autoClose=\"outside\"\n  class=\"form-dropdown\"\n  (openChange)=\"onOpenChange($event)\">\n  <div\n    sprLabelContainer\n    ngbDropdownToggle\n    tabindex=\"1\"\n    class=\"form-dropdown__control\"\n    [sprControlSize]=\"controlSize\"\n    [class.form-dropdown__control--disabled]=\"control?.disabled\">\n    <div\n      *ngIf=\"addonStart\"\n      class=\"form-dropdown__addon\">\n      <i\n        *ngIf=\"iconAddonTypeGuard(addonStart)\"\n        [class]=\"addonStart.icon\"></i>\n      <span\n        *ngIf=\"textAddonTypeGuard(addonStart)\"\n        class=\"addon-text\"\n        >{{ addonStart.text }}</span\n      >\n    </div>\n\n    <div\n      tabindex=\"2\"\n      class=\"form-dropdown__inner\"\n      [class.form-dropdown__inner--addon-start]=\"addonStart\"\n      [class.form-dropdown__inner--addon-end]=\"addonEnd\"\n      [class.form-dropdown__inner-invalid]=\"isInvalidControl\">\n      <div class=\"form-dropdown__input-container\">\n        <input\n          [class.is-invalid]=\"isInvalidControl\"\n          [class.addon-start]=\"addonStart\"\n          [class.addon-end]=\"addonEnd\"\n          [sprControlSize]=\"controlSize\"\n          [placeholder]=\"inputPlaceholder\"\n          [disabled]=\"control.disabled\"\n          [value]=\"dropdownPlaceholder && !control.value.length ? dropdownPlaceholder : (control.value | getMultiSelectDisplayValue)\"\n          class=\"form-select-control\"\n          readonly\n          type=\"text\" />\n        <i class=\"dropdown-icon icon form-dropdown__icon form-dropdown__icon--right bo-icon-arrows-chevron-down\"></i>\n      </div>\n\n      <div\n        class=\"dropdown-list-container\"\n        [style.min-width.px]=\"minWidth\"\n        ngbDropdownMenu>\n        <div\n          *ngIf=\"withSearch\"\n          class=\"dropdown-list-container-header\">\n          <spr-input\n            [formControl]=\"searchControl\"\n            [placeholder]=\"'Search'\" />\n        </div>\n        <cdk-virtual-scroll-viewport\n          *ngIf=\"isOpen\"\n          class=\"dropdown-list-container-body\"\n          [itemSize]=\"dropdownItemHeight\"\n          [maxBufferPx]=\"bufferPxSize\"\n          [minBufferPx]=\"bufferPxSize\"\n          [style.min-height.px]=\"bufferPxSize\"\n          (scrolledIndexChange)=\"onScrolledIndexChange($event)\">\n          <ng-container [ngSwitch]=\"filterStrategy\">\n            <ng-container *ngSwitchCase=\"'local'\">\n              <ng-container *cdkVirtualFor=\"let option of withSearch ? (options | filterOptions: searchControl.value) : options\">\n                <ng-container *ngTemplateOutlet=\"dropdownItem; context: { $implicit: option }\"></ng-container>\n              </ng-container>\n            </ng-container>\n\n            <ng-container *ngSwitchCase=\"'api'\">\n              <ng-container *cdkVirtualFor=\"let option of options\">\n                <ng-container *ngTemplateOutlet=\"dropdownItem; context: { $implicit: option }\"></ng-container>\n              </ng-container>\n            </ng-container>\n          </ng-container>\n        </cdk-virtual-scroll-viewport>\n\n        <spr-spinner *ngIf=\"isLoading\"></spr-spinner>\n      </div>\n    </div>\n\n    <div\n      *ngIf=\"addonEnd\"\n      class=\"form-dropdown__addon\">\n      <i\n        *ngIf=\"iconAddonTypeGuard(addonEnd)\"\n        [class]=\"addonEnd.icon\"></i>\n      <span\n        *ngIf=\"textAddonTypeGuard(addonEnd)\"\n        class=\"addon-text\"\n        >{{ addonEnd.text }}</span\n      >\n    </div>\n  </div>\n\n  @if (description || isInvalidControl) {\n    <div class=\"form-field-description\">\n      @if (description && !isInvalidControl) {\n        <spr-field-description class=\"form-input-description\">\n          {{ description }}\n        </spr-field-description>\n      }\n\n      @if (isInvalidControl) {\n        <spr-error>\n          {{ ngControl?.control?.errors | getControlErrorMessage: errorMessagesConfig }}\n        </spr-error>\n      }\n    </div>\n  }\n</div>\n\n<ng-template\n  #dropdownItem\n  let-option>\n  <div\n    [class.selected]=\"control.value | isSelectedOption: option\"\n    [class.disabled]=\"option.isDisabled\"\n    class=\"dropdown-item\"\n    (click)=\"select(option)\">\n    <spr-checkbox\n      [ngModel]=\"control.value | isSelectedOption: option\"\n      [shouldStopLabelClickEventPropagation]=\"true\"\n      [disabled]=\"option.isDisabled\"\n      [isColored]=\"true\"\n      [label]=\"option.text\"\n      [leftIcon]=\"option.icon\"></spr-checkbox>\n  </div>\n</ng-template>\n", styles: [":host{display:block}:host .trigger{cursor:pointer}.form-dropdown .dropdown-menu{border-radius:var(--spr-border-radius-m);border:1px solid var(--brd-border-default-300);background:var(--brd-fill-default-0);padding:12px 12px 8px;overflow:hidden;box-shadow:0 1px 80px rgb(var(--brd-black)/.08);margin:6px 0!important}.form-dropdown .dropdown-menu .dropdown-item{padding:8px}.form-dropdown .dropdown-menu .dropdown-item.disabled{pointer-events:none}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1$2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i1$2.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "pipe", type: GetControlErrorMessagePipe, name: "getControlErrorMessage" }, { kind: "ngmodule", type: NgbTooltipModule }, { kind: "pipe", type: FilterOptionsPipe, name: "filterOptions" }, { kind: "pipe", type: GetMultiSelectDisplayValuePipe, name: "getMultiSelectDisplayValue" }, { kind: "pipe", type: IsSelectedOptionPipe, name: "isSelectedOption" }, { kind: "ngmodule", type: ScrollingModule }, { kind: "directive", type: i4.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { kind: "directive", type: i4.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { kind: "component", type: i4.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }, { kind: "ngmodule", type: NgbDropdownModule }, { kind: "directive", type: i1$1.NgbDropdown, selector: "[ngbDropdown]", inputs: ["autoClose", "dropdownClass", "open", "placement", "popperOptions", "container", "display"], outputs: ["openChange"], exportAs: ["ngbDropdown"] }, { kind: "directive", type: i1$1.NgbDropdownToggle, selector: "[ngbDropdownToggle]" }, { kind: "directive", type: i1$1.NgbDropdownMenu, selector: "[ngbDropdownMenu]" }, { kind: "directive", type: SprControlSizeDirective, selector: "[sprControlSize]", inputs: ["sprControlSize"] }, { kind: "component", type: SprCheckboxComponent, selector: "spr-checkbox", inputs: ["isPartiallyChecked", "isLabelReverse", "isDecorated", "isInline", "rightIcon", "leftIcon", "shouldStopLabelClickEventPropagation", "tooltipClass", "checkboxTooltip", "tooltipPlacement"] }, { kind: "component", type: SprErrorComponent, selector: "spr-error" }, { kind: "component", type: SprSpinnerComponent, selector: "spr-spinner" }, { kind: "directive", type: SprLabelContainerDirective, selector: "[sprLabelContainer]", inputs: ["sprLabelDefaultPosition", "sprLabelDefaultClass"] }, { kind: "component", type: SprFieldDescriptionComponent, selector: "spr-field-description" }, { kind: "component", type: SprInputComponent, selector: "spr-input", inputs: ["precision", "type", "placeholder", "isNegativeNumbersAcceptable", "onlyInteger", "isSubmitStrategy", "addonStart", "addonEnd", "prepend", "append", "rounded", "maxLength", "readOnly", "isRevealedInput"], outputs: ["inputTypeChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprMultiSelectDropdownComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-multi-select-dropdown', imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        FormsModule,
                        GetControlErrorMessagePipe,
                        NgbTooltipModule,
                        FilterOptionsPipe,
                        GetMultiSelectDisplayValuePipe,
                        IsSelectedOptionPipe,
                        ScrollingModule,
                        NgbDropdownModule,
                        SprControlSizeDirective,
                        SprCheckboxComponent,
                        SprErrorComponent,
                        SprSpinnerComponent,
                        SprLabelContainerDirective,
                        SprFieldDescriptionComponent,
                        SprInputComponent,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, hostDirectives: [SPR_LABEL], template: "<div\n  ngbDropdown\n  [container]=\"container\"\n  autoClose=\"outside\"\n  class=\"form-dropdown\"\n  (openChange)=\"onOpenChange($event)\">\n  <div\n    sprLabelContainer\n    ngbDropdownToggle\n    tabindex=\"1\"\n    class=\"form-dropdown__control\"\n    [sprControlSize]=\"controlSize\"\n    [class.form-dropdown__control--disabled]=\"control?.disabled\">\n    <div\n      *ngIf=\"addonStart\"\n      class=\"form-dropdown__addon\">\n      <i\n        *ngIf=\"iconAddonTypeGuard(addonStart)\"\n        [class]=\"addonStart.icon\"></i>\n      <span\n        *ngIf=\"textAddonTypeGuard(addonStart)\"\n        class=\"addon-text\"\n        >{{ addonStart.text }}</span\n      >\n    </div>\n\n    <div\n      tabindex=\"2\"\n      class=\"form-dropdown__inner\"\n      [class.form-dropdown__inner--addon-start]=\"addonStart\"\n      [class.form-dropdown__inner--addon-end]=\"addonEnd\"\n      [class.form-dropdown__inner-invalid]=\"isInvalidControl\">\n      <div class=\"form-dropdown__input-container\">\n        <input\n          [class.is-invalid]=\"isInvalidControl\"\n          [class.addon-start]=\"addonStart\"\n          [class.addon-end]=\"addonEnd\"\n          [sprControlSize]=\"controlSize\"\n          [placeholder]=\"inputPlaceholder\"\n          [disabled]=\"control.disabled\"\n          [value]=\"dropdownPlaceholder && !control.value.length ? dropdownPlaceholder : (control.value | getMultiSelectDisplayValue)\"\n          class=\"form-select-control\"\n          readonly\n          type=\"text\" />\n        <i class=\"dropdown-icon icon form-dropdown__icon form-dropdown__icon--right bo-icon-arrows-chevron-down\"></i>\n      </div>\n\n      <div\n        class=\"dropdown-list-container\"\n        [style.min-width.px]=\"minWidth\"\n        ngbDropdownMenu>\n        <div\n          *ngIf=\"withSearch\"\n          class=\"dropdown-list-container-header\">\n          <spr-input\n            [formControl]=\"searchControl\"\n            [placeholder]=\"'Search'\" />\n        </div>\n        <cdk-virtual-scroll-viewport\n          *ngIf=\"isOpen\"\n          class=\"dropdown-list-container-body\"\n          [itemSize]=\"dropdownItemHeight\"\n          [maxBufferPx]=\"bufferPxSize\"\n          [minBufferPx]=\"bufferPxSize\"\n          [style.min-height.px]=\"bufferPxSize\"\n          (scrolledIndexChange)=\"onScrolledIndexChange($event)\">\n          <ng-container [ngSwitch]=\"filterStrategy\">\n            <ng-container *ngSwitchCase=\"'local'\">\n              <ng-container *cdkVirtualFor=\"let option of withSearch ? (options | filterOptions: searchControl.value) : options\">\n                <ng-container *ngTemplateOutlet=\"dropdownItem; context: { $implicit: option }\"></ng-container>\n              </ng-container>\n            </ng-container>\n\n            <ng-container *ngSwitchCase=\"'api'\">\n              <ng-container *cdkVirtualFor=\"let option of options\">\n                <ng-container *ngTemplateOutlet=\"dropdownItem; context: { $implicit: option }\"></ng-container>\n              </ng-container>\n            </ng-container>\n          </ng-container>\n        </cdk-virtual-scroll-viewport>\n\n        <spr-spinner *ngIf=\"isLoading\"></spr-spinner>\n      </div>\n    </div>\n\n    <div\n      *ngIf=\"addonEnd\"\n      class=\"form-dropdown__addon\">\n      <i\n        *ngIf=\"iconAddonTypeGuard(addonEnd)\"\n        [class]=\"addonEnd.icon\"></i>\n      <span\n        *ngIf=\"textAddonTypeGuard(addonEnd)\"\n        class=\"addon-text\"\n        >{{ addonEnd.text }}</span\n      >\n    </div>\n  </div>\n\n  @if (description || isInvalidControl) {\n    <div class=\"form-field-description\">\n      @if (description && !isInvalidControl) {\n        <spr-field-description class=\"form-input-description\">\n          {{ description }}\n        </spr-field-description>\n      }\n\n      @if (isInvalidControl) {\n        <spr-error>\n          {{ ngControl?.control?.errors | getControlErrorMessage: errorMessagesConfig }}\n        </spr-error>\n      }\n    </div>\n  }\n</div>\n\n<ng-template\n  #dropdownItem\n  let-option>\n  <div\n    [class.selected]=\"control.value | isSelectedOption: option\"\n    [class.disabled]=\"option.isDisabled\"\n    class=\"dropdown-item\"\n    (click)=\"select(option)\">\n    <spr-checkbox\n      [ngModel]=\"control.value | isSelectedOption: option\"\n      [shouldStopLabelClickEventPropagation]=\"true\"\n      [disabled]=\"option.isDisabled\"\n      [isColored]=\"true\"\n      [label]=\"option.text\"\n      [leftIcon]=\"option.icon\"></spr-checkbox>\n  </div>\n</ng-template>\n", styles: [":host{display:block}:host .trigger{cursor:pointer}.form-dropdown .dropdown-menu{border-radius:var(--spr-border-radius-m);border:1px solid var(--brd-border-default-300);background:var(--brd-fill-default-0);padding:12px 12px 8px;overflow:hidden;box-shadow:0 1px 80px rgb(var(--brd-black)/.08);margin:6px 0!important}.form-dropdown .dropdown-menu .dropdown-item{padding:8px}.form-dropdown .dropdown-menu .dropdown-item.disabled{pointer-events:none}\n"] }]
        }], propDecorators: { isSelectedAllOption: [{
                type: Input
            }], inputPlaceholder: [{
                type: Input
            }], addonStart: [{
                type: Input
            }], addonEnd: [{
                type: Input
            }] } });

class SprMultiSwitcherComponent {
    constructor(cdRef) {
        this.cdRef = cdRef;
        this.options = [];
        this.switcherId = '';
        this.currentSelectedValue = '';
        this.isDisabled = false;
        this.isError = false;
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    onSwitcherChange(value) {
        if (this.currentSelectedValue === value) {
            return;
        }
        this.currentSelectedValue = value;
        this.onChange(value);
        this.onTouched();
    }
    writeValue(value) {
        this.currentSelectedValue = value ?? '';
        this.cdRef.markForCheck();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.isDisabled = isDisabled;
        this.cdRef.markForCheck();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprMultiSwitcherComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: SprMultiSwitcherComponent, isStandalone: true, selector: "spr-multi-switcher", inputs: { options: "options", switcherId: "switcherId" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => SprMultiSwitcherComponent),
                multi: true,
            },
        ], ngImport: i0, template: "<ul\n  [id]=\"switcherId\"\n  class=\"tab-level-3-list\">\n  <li\n    *ngFor=\"let option of options\"\n    [class.tab-level-3-list__item--active]=\"currentSelectedValue === option.value\"\n    [class.tab-level-3-list__item--error]=\"isError\"\n    [class.tab-level-3-list__item--disabled]=\"isDisabled\"\n    class=\"tab-level-3-list__item\"\n    (click)=\"onSwitcherChange(option.value)\">\n    {{ option.text }}\n  </li>\n</ul>\n", styles: [".tab-content>.tab-pane{display:none}.tab-content>.active{display:block}:host{--brd-tab-level-3-list-bg: rgb(var(--brd-gray-100));--brd-tab-level-3-list-border-color: rgb(var(--brd-gray-300));--brd-tab-level-3-list-border-radius: var(--spr-border-radius-pill);--brd-tab-level-3-item-color: rgb(var(--brd-gray-700));--brd-tab-level-3-item-font-weight: 400;--brd-tab-level-3-item-border-radius: 18px;--brd-tab-level-3-item-hover-bg: rgb(var(--brd-gray-200));--brd-tab-level-3-item-hover-color: rgb(var(--brd-gray-800));--brd-tab-level-3-item-focus-color: rgb(var(--brd-gray-600));--brd-tab-level-3-item-active-color: rgb(var(--brd-gray-800));--brd-tab-level-3-item-active-bg: rgb(var(--brd-white));--brd-tab-level-3-item-error-color: rgb(var(--brd-red-600));--brd-tab-level-3-item-error-bg: rgb(var(--brd-white));--brd-tab-level-3-item-disabled-color: rgb(var(--brd-gray-500));display:var(--brd-tab-level-3-list-display, flex)}:host .tab-level-3-list{display:flex;margin:0;padding:0;background-color:var(--brd-tab-level-3-list-bg);border:1px solid var(--brd-tab-level-3-list-border-color);border-radius:var(--brd-tab-level-3-list-border-radius)}:host .tab-level-3-list__item{min-width:60px;padding:4px 12px;text-align:center;list-style:none;color:var(--brd-tab-level-3-item-color);font-weight:var(--brd-tab-level-3-item-font-weight);border-radius:var(--brd-tab-level-3-item-border-radius);cursor:pointer}:host .tab-level-3-list__item:hover{color:var(--brd-tab-level-3-item-hover-color);background:var(--brd-tab-level-3-item-hover-bg)}:host .tab-level-3-list__item:focus{color:var(--brd-tab-level-3-item-focus-color)}:host .tab-level-3-list__item.tab-level-3-list__item--active{color:var(--brd-tab-level-3-item-active-color);background-color:var(--brd-tab-level-3-item-active-bg)}:host .tab-level-3-list__item.tab-level-3-list__item--error{color:var(--brd-tab-level-3-item-error-color);background-color:var(--brd-tab-level-3-item-error-bg)}:host .tab-level-3-list__item[disabled],:host .tab-level-3-list__item.tab-level-3-list__item--disabled{color:var(--brd-tab-level-3-item-disabled-color);cursor:default;pointer-events:none}\n"], dependencies: [{ kind: "directive", type: NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprMultiSwitcherComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-multi-switcher', imports: [NgForOf], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => SprMultiSwitcherComponent),
                            multi: true,
                        },
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ul\n  [id]=\"switcherId\"\n  class=\"tab-level-3-list\">\n  <li\n    *ngFor=\"let option of options\"\n    [class.tab-level-3-list__item--active]=\"currentSelectedValue === option.value\"\n    [class.tab-level-3-list__item--error]=\"isError\"\n    [class.tab-level-3-list__item--disabled]=\"isDisabled\"\n    class=\"tab-level-3-list__item\"\n    (click)=\"onSwitcherChange(option.value)\">\n    {{ option.text }}\n  </li>\n</ul>\n", styles: [".tab-content>.tab-pane{display:none}.tab-content>.active{display:block}:host{--brd-tab-level-3-list-bg: rgb(var(--brd-gray-100));--brd-tab-level-3-list-border-color: rgb(var(--brd-gray-300));--brd-tab-level-3-list-border-radius: var(--spr-border-radius-pill);--brd-tab-level-3-item-color: rgb(var(--brd-gray-700));--brd-tab-level-3-item-font-weight: 400;--brd-tab-level-3-item-border-radius: 18px;--brd-tab-level-3-item-hover-bg: rgb(var(--brd-gray-200));--brd-tab-level-3-item-hover-color: rgb(var(--brd-gray-800));--brd-tab-level-3-item-focus-color: rgb(var(--brd-gray-600));--brd-tab-level-3-item-active-color: rgb(var(--brd-gray-800));--brd-tab-level-3-item-active-bg: rgb(var(--brd-white));--brd-tab-level-3-item-error-color: rgb(var(--brd-red-600));--brd-tab-level-3-item-error-bg: rgb(var(--brd-white));--brd-tab-level-3-item-disabled-color: rgb(var(--brd-gray-500));display:var(--brd-tab-level-3-list-display, flex)}:host .tab-level-3-list{display:flex;margin:0;padding:0;background-color:var(--brd-tab-level-3-list-bg);border:1px solid var(--brd-tab-level-3-list-border-color);border-radius:var(--brd-tab-level-3-list-border-radius)}:host .tab-level-3-list__item{min-width:60px;padding:4px 12px;text-align:center;list-style:none;color:var(--brd-tab-level-3-item-color);font-weight:var(--brd-tab-level-3-item-font-weight);border-radius:var(--brd-tab-level-3-item-border-radius);cursor:pointer}:host .tab-level-3-list__item:hover{color:var(--brd-tab-level-3-item-hover-color);background:var(--brd-tab-level-3-item-hover-bg)}:host .tab-level-3-list__item:focus{color:var(--brd-tab-level-3-item-focus-color)}:host .tab-level-3-list__item.tab-level-3-list__item--active{color:var(--brd-tab-level-3-item-active-color);background-color:var(--brd-tab-level-3-item-active-bg)}:host .tab-level-3-list__item.tab-level-3-list__item--error{color:var(--brd-tab-level-3-item-error-color);background-color:var(--brd-tab-level-3-item-error-bg)}:host .tab-level-3-list__item[disabled],:host .tab-level-3-list__item.tab-level-3-list__item--disabled{color:var(--brd-tab-level-3-item-disabled-color);cursor:default;pointer-events:none}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }], propDecorators: { options: [{
                type: Input
            }], switcherId: [{
                type: Input
            }] } });

class OffCanvasService {
    constructor(ngbOffCanvas) {
        this.ngbOffCanvas = ngbOffCanvas;
    }
    open(component, config) {
        const { data, settings } = config || {};
        const position = settings?.position || 'end';
        const ref = this.ngbOffCanvas.open(component, { ...settings, keyboard: false, position });
        ref.componentInstance.closeAction = (action) => ref.dismiss(action);
        ref.componentInstance.data = data;
        return ref.dismissed;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: OffCanvasService, deps: [{ token: i1$1.NgbOffcanvas }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: OffCanvasService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: OffCanvasService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i1$1.NgbOffcanvas }] });

class SprBaseOffCanvasContentComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprBaseOffCanvasContentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: SprBaseOffCanvasContentComponent, isStandalone: true, selector: "spr-base-off-canvas-content", ngImport: i0, template: "<header class=\"canvas-header\">\n  <ng-content select=\"[header]\"></ng-content>\n</header>\n\n<div class=\"canvas-body\">\n  <div class=\"block-body__main-area\">\n    <div class=\"block-body__main-area-content\">\n      <ng-content select=\"[body]\"></ng-content>\n    </div>\n  </div>\n</div>\n\n<footer class=\"block-footer\">\n  <ng-content select=\"[footer]\"></ng-content>\n</footer>\n\n<div class=\"backdrop-area\">\n  <ng-content select=\"[backdrop]\"></ng-content>\n</div>\n", styles: [":host{display:flex;flex-direction:column;max-height:100%;height:100%}.canvas-header{display:flex;align-items:center;justify-content:space-between;padding:4px 16px;background:var(--brd-fill-default-200)}.backdrop-area{position:fixed;inset:0;padding:52px;width:50%;color:rgb(var(--brd-white))}.canvas-body{-webkit-overflow-scrolling:touch!important;scrollbar-width:thin!important;scrollbar-color:rgb(var(--spr-grey-250)) transparent!important;scrollbar-gutter:unset;max-height:calc(100% - 56px);overflow-y:auto;min-height:152px;height:100%}.canvas-body::-webkit-scrollbar{width:18px!important;background-color:transparent!important;border-radius:var(--spr-border-radius-l)!important}.canvas-body::-webkit-scrollbar-thumb{border:6px solid rgb(var(--brd-white))!important;background-color:rgb(var(--spr-grey-130))!important;border-radius:var(--spr-border-radius-l)!important}.canvas-body:hover{scrollbar-color:rgba(26,26,30,.7) transparent!important}.canvas-body:hover::-webkit-scrollbar-thumb{background-color:rgb(var(--spr-grey-250))!important}.block-body__main-area{display:flex;flex-direction:column;justify-content:space-between;height:100%}.block-body__main-area-header{display:flex;justify-content:flex-end;margin:0 0 20px}.block-body__main-area-content:not(:only-child){margin-bottom:16px}.block-footer{display:flex;justify-content:flex-end;gap:12px;margin:0 -16px -24px;padding:16px 20px;background:var(--offcanvas-footer-bg-custom, var(--brd-fill-default-200));border-top:1px solid rgb(var(--spr-grey-130))}.block-body__main-area-content{min-height:100%}.block-footer{margin:0}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprBaseOffCanvasContentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-base-off-canvas-content', imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "<header class=\"canvas-header\">\n  <ng-content select=\"[header]\"></ng-content>\n</header>\n\n<div class=\"canvas-body\">\n  <div class=\"block-body__main-area\">\n    <div class=\"block-body__main-area-content\">\n      <ng-content select=\"[body]\"></ng-content>\n    </div>\n  </div>\n</div>\n\n<footer class=\"block-footer\">\n  <ng-content select=\"[footer]\"></ng-content>\n</footer>\n\n<div class=\"backdrop-area\">\n  <ng-content select=\"[backdrop]\"></ng-content>\n</div>\n", styles: [":host{display:flex;flex-direction:column;max-height:100%;height:100%}.canvas-header{display:flex;align-items:center;justify-content:space-between;padding:4px 16px;background:var(--brd-fill-default-200)}.backdrop-area{position:fixed;inset:0;padding:52px;width:50%;color:rgb(var(--brd-white))}.canvas-body{-webkit-overflow-scrolling:touch!important;scrollbar-width:thin!important;scrollbar-color:rgb(var(--spr-grey-250)) transparent!important;scrollbar-gutter:unset;max-height:calc(100% - 56px);overflow-y:auto;min-height:152px;height:100%}.canvas-body::-webkit-scrollbar{width:18px!important;background-color:transparent!important;border-radius:var(--spr-border-radius-l)!important}.canvas-body::-webkit-scrollbar-thumb{border:6px solid rgb(var(--brd-white))!important;background-color:rgb(var(--spr-grey-130))!important;border-radius:var(--spr-border-radius-l)!important}.canvas-body:hover{scrollbar-color:rgba(26,26,30,.7) transparent!important}.canvas-body:hover::-webkit-scrollbar-thumb{background-color:rgb(var(--spr-grey-250))!important}.block-body__main-area{display:flex;flex-direction:column;justify-content:space-between;height:100%}.block-body__main-area-header{display:flex;justify-content:flex-end;margin:0 0 20px}.block-body__main-area-content:not(:only-child){margin-bottom:16px}.block-footer{display:flex;justify-content:flex-end;gap:12px;margin:0 -16px -24px;padding:16px 20px;background:var(--offcanvas-footer-bg-custom, var(--brd-fill-default-200));border-top:1px solid rgb(var(--spr-grey-130))}.block-body__main-area-content{min-height:100%}.block-footer{margin:0}\n"] }]
        }] });

class SprOpenMenuComponent {
    constructor(cdRef, destroyRef) {
        this.cdRef = cdRef;
        this.destroyRef = destroyRef;
        // Common inputs
        this.type = input('default');
        this.items = input();
        this.autoClose = input('outside');
        this.placement = input();
        this.menuContainer = input('body');
        // Default menu inputs
        this.closeOnClick = input(true);
        this.title = input();
        // Sub menu inputs
        this.withSubMenu = input(false);
        this.closeParentOnClick = input(true);
        // Common outputs
        this.closeDropdown = output();
        // Sub menu outputs
        this.closeParentMenuDropdown = output();
    }
    ngAfterViewInit() {
        this.ngbDropdown.open();
        this.subscribeToDropdownClose();
        this.cdRef.detectChanges();
    }
    onSelect(event, hasSubMenu) {
        if (this.type() === 'sub-menu' && this.closeParentOnClick()) {
            this.closeParentMenuDropdown.emit();
            return;
        }
        if (hasSubMenu || !this.closeOnClick()) {
            event.stopImmediatePropagation();
        }
        else {
            this.ngbDropdown.close();
        }
    }
    subMenuPlacementTypeGuard(placement) {
        return !Array.isArray(placement);
    }
    subscribeToDropdownClose() {
        this.ngbDropdown.openChange
            .pipe(filter((isOpened) => !isOpened), takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.closeDropdown.emit());
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprOpenMenuComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.DestroyRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: SprOpenMenuComponent, isStandalone: true, selector: "spr-open-menu", inputs: { type: { classPropertyName: "type", publicName: "type", isSignal: true, isRequired: false, transformFunction: null }, items: { classPropertyName: "items", publicName: "items", isSignal: true, isRequired: false, transformFunction: null }, autoClose: { classPropertyName: "autoClose", publicName: "autoClose", isSignal: true, isRequired: false, transformFunction: null }, placement: { classPropertyName: "placement", publicName: "placement", isSignal: true, isRequired: false, transformFunction: null }, menuContainer: { classPropertyName: "menuContainer", publicName: "menuContainer", isSignal: true, isRequired: false, transformFunction: null }, closeOnClick: { classPropertyName: "closeOnClick", publicName: "closeOnClick", isSignal: true, isRequired: false, transformFunction: null }, title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null }, withSubMenu: { classPropertyName: "withSubMenu", publicName: "withSubMenu", isSignal: true, isRequired: false, transformFunction: null }, closeParentOnClick: { classPropertyName: "closeParentOnClick", publicName: "closeParentOnClick", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { closeDropdown: "closeDropdown", closeParentMenuDropdown: "closeParentMenuDropdown" }, viewQueries: [{ propertyName: "ngbDropdown", first: true, predicate: NgbDropdown, descendants: true }], ngImport: i0, template: "<div\n  [ngClass]=\"{\n    'sub-menu': type() === 'sub-menu',\n    'sub-menu--top': type() === 'sub-menu' && subMenuPlacementTypeGuard(placement()!) && placement() === 'top',\n    'sub-menu--right': type() === 'sub-menu' && subMenuPlacementTypeGuard(placement()!) && placement() === 'right',\n    'sub-menu--left': type() === 'sub-menu' && subMenuPlacementTypeGuard(placement()!) && placement() === 'left',\n  }\"\n  [placement]=\"placement()!\"\n  [autoClose]=\"autoClose()\"\n  [container]=\"menuContainer()\"\n  ngbDropdown>\n  <div ngbDropdownToggle></div>\n\n  <div\n    class=\"open-menu-component\"\n    [class.with-sub-menu]=\"withSubMenu()\"\n    ngbDropdownMenu>\n    @if (title()) {\n      <h3 class=\"open-menu-component__title\">\n        <ng-container [ngTemplateOutlet]=\"title()!.templateRef\"></ng-container>\n      </h3>\n    }\n\n    <ul class=\"open-menu-component__list\">\n      @for (item of items(); track item) {\n        <li\n          ngbDropdownItem\n          [class.with-sub-menu]=\"item.hasSubMenu()\"\n          [class.open-menu-component__item--top-splitter]=\"item.hasTopSplitter()\"\n          [class.open-menu-component__item--bottom-splitter]=\"item.hasBottomSplitter()\"\n          [class.disabled]=\"item.isDisabled()\"\n          [ngClass]=\"item.extraClasses()\"\n          class=\"open-menu-component__item\"\n          (click)=\"onSelect($event, item.hasSubMenu())\">\n          <ng-container [ngTemplateOutlet]=\"item.templateRef\"></ng-container>\n        </li>\n      }\n    </ul>\n  </div>\n</div>\n", styles: [".text-body-xxxl{font-size:var(--spr-font-size-32);line-height:var(--spr-line-height-40)}.text-body-xxl{font-size:var(--spr-font-size-24);line-height:var(--spr-line-height-32)}.text-body-xl{font-size:var(--spr-font-size-20);line-height:var(--spr-line-height-24)}.text-body-l{font-size:var(--spr-font-size-16);line-height:var(--spr-line-height-20)}.text-body-m{font-size:var(--spr-font-size-15);line-height:var(--spr-line-height-20)}.text-body-s{font-size:var(--spr-font-size-14);line-height:var(--spr-line-height-20)}.text-body-xs{font-size:var(--spr-font-size-12);line-height:var(--spr-line-height-16)}.text-body-xs-uppercase{font-size:var(--spr-font-size-13);line-height:var(--spr-line-height-20);text-transform:uppercase}.text-heading-xl{font-size:var(--spr-font-size-32);line-height:var(--spr-line-height-40);font-weight:var(--spr-font-weight-semi-bold)}.text-heading-l{font-size:var(--spr-font-size-28);line-height:var(--spr-line-height-36);font-weight:var(--spr-font-weight-semi-bold)}.text-heading-m{font-size:var(--spr-font-size-24);line-height:var(--spr-line-height-32);font-weight:var(--spr-font-weight-semi-bold)}.text-heading-s{font-size:var(--spr-font-size-20);line-height:var(--spr-line-height-24);font-weight:var(--spr-font-weight-semi-bold)}.text-heading-xs{font-size:var(--spr-font-size-16);line-height:var(--spr-line-height-24);font-weight:var(--spr-font-weight-semi-bold)}.text-heading-xxs{font-size:var(--spr-font-size-13);line-height:var(--spr-line-height-16);font-weight:var(--spr-font-weight-semi-bold);text-transform:uppercase}.text-heading-xxxs{font-size:var(--spr-font-size-12);line-height:var(--spr-line-height-16);font-weight:var(--spr-font-weight-semi-bold);text-transform:uppercase}:host{display:block}.open-menu-component{--brd-open-menu-component-gap: 8px;--brd-open-menu-component-item-bg: var(--brd-fill-default-0);--brd-open-menu-component-item-color: var(--brd-text-primary-800);padding:0;overflow:auto;min-width:200px;max-width:400px;max-height:500px}.open-menu-component.with-sub-menu{overflow:unset;max-height:unset}.open-menu-component__title{font-size:var(--spr-font-size-13);line-height:var(--spr-line-height-16);font-weight:var(--spr-font-weight-semi-bold);text-transform:uppercase;margin:0;padding:var(--brd-open-menu-component-gap) 12px 4px;color:rgb(var(--brd-text-secondary-600))}.open-menu-component__list{margin:0;padding:var(--brd-open-menu-component-gap) 0;list-style:none}.open-menu-component__item{font-size:var(--spr-font-size-14);line-height:var(--spr-line-height-20);position:relative;padding:var(--brd-open-menu-component-gap);background-color:var(--brd-open-menu-component-item-bg);color:var(--brd-open-menu-component-item-color);white-space:wrap}.open-menu-component__item:hover,.open-menu-component__item:focus{--brd-open-menu-component-item-bg: var(--brd-fill-hover-200);cursor:pointer}.open-menu-component__item.active,.open-menu-component__item:active{--brd-open-menu-component-item-bg: var(--brd-fill-accent-selected)}.open-menu-component__item.disabled,.open-menu-component__item:disabled{--brd-open-menu-component-item-bg: var(--brd-fill-disabled-0);--brd-open-menu-component-item-color: var(--brd-text-disabled-500);pointer-events:none}.open-menu-component__item.with-sub-menu{padding:0}.open-menu-component__item--top-splitter,.open-menu-component__item--bottom-splitter{position:relative}.open-menu-component__item--top-splitter:before,.open-menu-component__item--top-splitter:after,.open-menu-component__item--bottom-splitter:before,.open-menu-component__item--bottom-splitter:after{content:\"\";position:absolute;right:0;left:0;width:100%;pointer-events:none}.open-menu-component__item--top-splitter{margin-top:calc(2 * var(--brd-open-menu-component-gap))}.open-menu-component__item--top-splitter:before{top:calc(var(--brd-open-menu-component-gap) * -1);border-top:1px solid var(--brd-border-default-300)}.open-menu-component__item--bottom-splitter{margin-bottom:calc(2 * var(--brd-open-menu-component-gap))}.open-menu-component__item--bottom-splitter:after{bottom:calc(var(--brd-open-menu-component-gap) * -1);border-top:1px solid var(--brd-border-default-300)}.open-menu-component__item--destructive:not(.disabled){--brd-open-menu-component-item-color: var(--brd-text-destructive-600)}::ng-deep .open-menu-component__action{display:flex;align-items:center;gap:8px;width:100%}::ng-deep .open-menu-component__action:before{content:\"\";position:absolute;inset:0}::ng-deep .open-menu-component__action span{display:block;flex:1}.sub-menu{position:absolute}.sub-menu--top{top:0}.sub-menu--right{right:0}.sub-menu--left{left:0}::ng-deep .spr-sub-menu-list-item-padding-class{padding:var(--brd-open-menu-component-gap)}\n"], dependencies: [{ kind: "directive", type: NgbDropdownToggle, selector: "[ngbDropdownToggle]" }, { kind: "directive", type: NgbDropdownMenu, selector: "[ngbDropdownMenu]" }, { kind: "directive", type: NgbDropdownItem, selector: "[ngbDropdownItem]", inputs: ["tabindex", "disabled"] }, { kind: "directive", type: NgbDropdown, selector: "[ngbDropdown]", inputs: ["autoClose", "dropdownClass", "open", "placement", "popperOptions", "container", "display"], outputs: ["openChange"], exportAs: ["ngbDropdown"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprOpenMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-open-menu', imports: [NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem, NgbDropdown, NgTemplateOutlet, NgClass], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  [ngClass]=\"{\n    'sub-menu': type() === 'sub-menu',\n    'sub-menu--top': type() === 'sub-menu' && subMenuPlacementTypeGuard(placement()!) && placement() === 'top',\n    'sub-menu--right': type() === 'sub-menu' && subMenuPlacementTypeGuard(placement()!) && placement() === 'right',\n    'sub-menu--left': type() === 'sub-menu' && subMenuPlacementTypeGuard(placement()!) && placement() === 'left',\n  }\"\n  [placement]=\"placement()!\"\n  [autoClose]=\"autoClose()\"\n  [container]=\"menuContainer()\"\n  ngbDropdown>\n  <div ngbDropdownToggle></div>\n\n  <div\n    class=\"open-menu-component\"\n    [class.with-sub-menu]=\"withSubMenu()\"\n    ngbDropdownMenu>\n    @if (title()) {\n      <h3 class=\"open-menu-component__title\">\n        <ng-container [ngTemplateOutlet]=\"title()!.templateRef\"></ng-container>\n      </h3>\n    }\n\n    <ul class=\"open-menu-component__list\">\n      @for (item of items(); track item) {\n        <li\n          ngbDropdownItem\n          [class.with-sub-menu]=\"item.hasSubMenu()\"\n          [class.open-menu-component__item--top-splitter]=\"item.hasTopSplitter()\"\n          [class.open-menu-component__item--bottom-splitter]=\"item.hasBottomSplitter()\"\n          [class.disabled]=\"item.isDisabled()\"\n          [ngClass]=\"item.extraClasses()\"\n          class=\"open-menu-component__item\"\n          (click)=\"onSelect($event, item.hasSubMenu())\">\n          <ng-container [ngTemplateOutlet]=\"item.templateRef\"></ng-container>\n        </li>\n      }\n    </ul>\n  </div>\n</div>\n", styles: [".text-body-xxxl{font-size:var(--spr-font-size-32);line-height:var(--spr-line-height-40)}.text-body-xxl{font-size:var(--spr-font-size-24);line-height:var(--spr-line-height-32)}.text-body-xl{font-size:var(--spr-font-size-20);line-height:var(--spr-line-height-24)}.text-body-l{font-size:var(--spr-font-size-16);line-height:var(--spr-line-height-20)}.text-body-m{font-size:var(--spr-font-size-15);line-height:var(--spr-line-height-20)}.text-body-s{font-size:var(--spr-font-size-14);line-height:var(--spr-line-height-20)}.text-body-xs{font-size:var(--spr-font-size-12);line-height:var(--spr-line-height-16)}.text-body-xs-uppercase{font-size:var(--spr-font-size-13);line-height:var(--spr-line-height-20);text-transform:uppercase}.text-heading-xl{font-size:var(--spr-font-size-32);line-height:var(--spr-line-height-40);font-weight:var(--spr-font-weight-semi-bold)}.text-heading-l{font-size:var(--spr-font-size-28);line-height:var(--spr-line-height-36);font-weight:var(--spr-font-weight-semi-bold)}.text-heading-m{font-size:var(--spr-font-size-24);line-height:var(--spr-line-height-32);font-weight:var(--spr-font-weight-semi-bold)}.text-heading-s{font-size:var(--spr-font-size-20);line-height:var(--spr-line-height-24);font-weight:var(--spr-font-weight-semi-bold)}.text-heading-xs{font-size:var(--spr-font-size-16);line-height:var(--spr-line-height-24);font-weight:var(--spr-font-weight-semi-bold)}.text-heading-xxs{font-size:var(--spr-font-size-13);line-height:var(--spr-line-height-16);font-weight:var(--spr-font-weight-semi-bold);text-transform:uppercase}.text-heading-xxxs{font-size:var(--spr-font-size-12);line-height:var(--spr-line-height-16);font-weight:var(--spr-font-weight-semi-bold);text-transform:uppercase}:host{display:block}.open-menu-component{--brd-open-menu-component-gap: 8px;--brd-open-menu-component-item-bg: var(--brd-fill-default-0);--brd-open-menu-component-item-color: var(--brd-text-primary-800);padding:0;overflow:auto;min-width:200px;max-width:400px;max-height:500px}.open-menu-component.with-sub-menu{overflow:unset;max-height:unset}.open-menu-component__title{font-size:var(--spr-font-size-13);line-height:var(--spr-line-height-16);font-weight:var(--spr-font-weight-semi-bold);text-transform:uppercase;margin:0;padding:var(--brd-open-menu-component-gap) 12px 4px;color:rgb(var(--brd-text-secondary-600))}.open-menu-component__list{margin:0;padding:var(--brd-open-menu-component-gap) 0;list-style:none}.open-menu-component__item{font-size:var(--spr-font-size-14);line-height:var(--spr-line-height-20);position:relative;padding:var(--brd-open-menu-component-gap);background-color:var(--brd-open-menu-component-item-bg);color:var(--brd-open-menu-component-item-color);white-space:wrap}.open-menu-component__item:hover,.open-menu-component__item:focus{--brd-open-menu-component-item-bg: var(--brd-fill-hover-200);cursor:pointer}.open-menu-component__item.active,.open-menu-component__item:active{--brd-open-menu-component-item-bg: var(--brd-fill-accent-selected)}.open-menu-component__item.disabled,.open-menu-component__item:disabled{--brd-open-menu-component-item-bg: var(--brd-fill-disabled-0);--brd-open-menu-component-item-color: var(--brd-text-disabled-500);pointer-events:none}.open-menu-component__item.with-sub-menu{padding:0}.open-menu-component__item--top-splitter,.open-menu-component__item--bottom-splitter{position:relative}.open-menu-component__item--top-splitter:before,.open-menu-component__item--top-splitter:after,.open-menu-component__item--bottom-splitter:before,.open-menu-component__item--bottom-splitter:after{content:\"\";position:absolute;right:0;left:0;width:100%;pointer-events:none}.open-menu-component__item--top-splitter{margin-top:calc(2 * var(--brd-open-menu-component-gap))}.open-menu-component__item--top-splitter:before{top:calc(var(--brd-open-menu-component-gap) * -1);border-top:1px solid var(--brd-border-default-300)}.open-menu-component__item--bottom-splitter{margin-bottom:calc(2 * var(--brd-open-menu-component-gap))}.open-menu-component__item--bottom-splitter:after{bottom:calc(var(--brd-open-menu-component-gap) * -1);border-top:1px solid var(--brd-border-default-300)}.open-menu-component__item--destructive:not(.disabled){--brd-open-menu-component-item-color: var(--brd-text-destructive-600)}::ng-deep .open-menu-component__action{display:flex;align-items:center;gap:8px;width:100%}::ng-deep .open-menu-component__action:before{content:\"\";position:absolute;inset:0}::ng-deep .open-menu-component__action span{display:block;flex:1}.sub-menu{position:absolute}.sub-menu--top{top:0}.sub-menu--right{right:0}.sub-menu--left{left:0}::ng-deep .spr-sub-menu-list-item-padding-class{padding:var(--brd-open-menu-component-gap)}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: i0.DestroyRef }], propDecorators: { ngbDropdown: [{
                type: ViewChild,
                args: [NgbDropdown]
            }] } });

class SprOpenMenuItemDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
        this.isDisabled = input(false);
        this.hasSubMenu = input(false);
        this.hasTopSplitter = input(false);
        this.hasBottomSplitter = input(false);
        this.extraClasses = input();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprOpenMenuItemDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "19.2.14", type: SprOpenMenuItemDirective, isStandalone: true, selector: "ng-template[sprOpenMenuItem]", inputs: { isDisabled: { classPropertyName: "isDisabled", publicName: "isDisabled", isSignal: true, isRequired: false, transformFunction: null }, hasSubMenu: { classPropertyName: "hasSubMenu", publicName: "hasSubMenu", isSignal: true, isRequired: false, transformFunction: null }, hasTopSplitter: { classPropertyName: "hasTopSplitter", publicName: "hasTopSplitter", isSignal: true, isRequired: false, transformFunction: null }, hasBottomSplitter: { classPropertyName: "hasBottomSplitter", publicName: "hasBottomSplitter", isSignal: true, isRequired: false, transformFunction: null }, extraClasses: { classPropertyName: "extraClasses", publicName: "extraClasses", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprOpenMenuItemDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[sprOpenMenuItem]',
                }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }] });

class SprOpenMenuExtensionDirective {
    constructor() {
        this.componentRef = null;
        this.viewRef = inject(ViewContainerRef);
        this.renderer = inject(Renderer2);
        this.destroyRef = inject(DestroyRef);
    }
    dismiss() {
        this.componentRef?.destroy();
        this.componentRef = null;
    }
    subscribeToDropdownClose(component) {
        component.closeDropdown.subscribe(() => this.dismiss());
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprOpenMenuExtensionDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: SprOpenMenuExtensionDirective, isStandalone: true, queries: [{ propertyName: "items", predicate: SprOpenMenuItemDirective }], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprOpenMenuExtensionDirective, decorators: [{
            type: Directive
        }], propDecorators: { items: [{
                type: ContentChildren,
                args: [SprOpenMenuItemDirective]
            }] } });

class SprOpenMenuTitleDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprOpenMenuTitleDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: SprOpenMenuTitleDirective, isStandalone: true, selector: "ng-template[sprOpenMenuTitle]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprOpenMenuTitleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[sprOpenMenuTitle]',
                }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }] });

class SprOpenMenuDirective extends SprOpenMenuExtensionDirective {
    constructor() {
        super(...arguments);
        this.placement = input(['bottom-start', 'bottom-end', 'top-start', 'top-end']);
        this.autoClose = input('outside');
        this.withSubMenu = input(false);
        this.closeOnClick = input(true);
        this.menuContainer = input('body');
    }
    clickListener() {
        if (this.componentRef) {
            this.dismiss();
            return;
        }
        this.componentRef = this.viewRef.createComponent(SprOpenMenuComponent);
        this.renderer.appendChild(this.viewRef.element.nativeElement, this.componentRef.location.nativeElement);
        this.subscribeToDropdownClose(this.componentRef.instance);
        this.setOpenMenuComponentInputParams(this.componentRef);
    }
    setOpenMenuComponentInputParams(componentRef) {
        componentRef.setInput('closeOnClick', this.closeOnClick());
        componentRef.setInput('withSubMenu', this.withSubMenu());
        componentRef.setInput('placement', this.placement());
        componentRef.setInput('autoClose', this.autoClose());
        componentRef.setInput('menuContainer', this.menuContainer());
        componentRef.setInput('items', this.items);
        componentRef.setInput('title', this.title);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprOpenMenuDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "19.2.14", type: SprOpenMenuDirective, isStandalone: true, selector: "[sprOpenMenu]", inputs: { placement: { classPropertyName: "placement", publicName: "placement", isSignal: true, isRequired: false, transformFunction: null }, autoClose: { classPropertyName: "autoClose", publicName: "autoClose", isSignal: true, isRequired: false, transformFunction: null }, withSubMenu: { classPropertyName: "withSubMenu", publicName: "withSubMenu", isSignal: true, isRequired: false, transformFunction: null }, closeOnClick: { classPropertyName: "closeOnClick", publicName: "closeOnClick", isSignal: true, isRequired: false, transformFunction: null }, menuContainer: { classPropertyName: "menuContainer", publicName: "menuContainer", isSignal: true, isRequired: false, transformFunction: null } }, host: { listeners: { "click": "clickListener()" } }, queries: [{ propertyName: "title", first: true, predicate: SprOpenMenuTitleDirective, descendants: true }], usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprOpenMenuDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[sprOpenMenu]',
                }]
        }], propDecorators: { title: [{
                type: ContentChild,
                args: [SprOpenMenuTitleDirective]
            }], clickListener: [{
                type: HostListener,
                args: ['click']
            }] } });

class SprOpenSubMenuDirective extends SprOpenMenuExtensionDirective {
    constructor(openMenuDirective, hostElement, renderer2) {
        super();
        this.openMenuDirective = openMenuDirective;
        this.hostElement = hostElement;
        this.renderer2 = renderer2;
        this.closeParentOnClick = input(true);
        this.placement = input('right');
        this.customPlacement = signal('right');
    }
    ngAfterViewInit() {
        this.addSpecialClasses(['spr-sub-menu-list-item-padding-class']);
    }
    mouseEnterListener() {
        if (this.componentRef) {
            this.dismiss();
            return;
        }
        this.customPlacement.set(this.placement());
        this.componentRef = this.viewRef.createComponent(SprOpenMenuComponent);
        const { innerWidth } = window;
        const { width: rectWidth, x: rectX, right: rectRight } = this.hostElement.nativeElement.getBoundingClientRect();
        const BUFFER = 10;
        // Check right side overflow
        if (rectRight + rectWidth > innerWidth) {
            // Check if there's enough space on the left side
            if (rectX - rectWidth - BUFFER >= 0) {
                this.customPlacement.set('left');
            }
        }
        else if (rectX <= rectWidth + BUFFER) {
            this.customPlacement.set('right');
        }
        this.subscribeToMouseLeaveEvent(this.componentRef.location.nativeElement);
        this.subscribeToCloseParentMenuDropdown(this.componentRef.instance);
        this.subscribeToDropdownClose(this.componentRef.instance);
        this.setOpenMenuComponentInputParams(this.componentRef);
    }
    setOpenMenuComponentInputParams(componentRef) {
        componentRef.setInput('placement', this.customPlacement());
        componentRef.setInput('type', 'sub-menu');
        componentRef.setInput('items', this.items);
        componentRef.setInput('closeParentOnClick', this.closeParentOnClick());
    }
    addSpecialClasses(classes) {
        classes.forEach((additionalClass) => {
            this.renderer2.addClass(this.hostElement.nativeElement, additionalClass);
        });
    }
    subscribeToCloseParentMenuDropdown(component) {
        component.closeParentMenuDropdown.subscribe(() => this.openMenuDirective?.dismiss());
    }
    subscribeToMouseLeaveEvent(htmlElement) {
        fromEvent(htmlElement, 'mouseleave')
            .pipe(take(1), takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.dismiss());
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprOpenSubMenuDirective, deps: [{ token: SprOpenMenuDirective, host: true, optional: true }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "19.2.14", type: SprOpenSubMenuDirective, isStandalone: true, selector: "[sprOpenSubMenu]", inputs: { closeParentOnClick: { classPropertyName: "closeParentOnClick", publicName: "closeParentOnClick", isSignal: true, isRequired: false, transformFunction: null }, placement: { classPropertyName: "placement", publicName: "placement", isSignal: true, isRequired: false, transformFunction: null } }, host: { listeners: { "click": "mouseEnterListener()" } }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprOpenSubMenuDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[sprOpenSubMenu]',
                }]
        }], ctorParameters: () => [{ type: SprOpenMenuDirective, decorators: [{
                    type: Host
                }, {
                    type: Optional
                }] }, { type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { mouseEnterListener: [{
                type: HostListener,
                args: ['click']
            }] } });

const DEFAULT_PAGE_SIZE_SELECTOR_SIZES = [25, 50, 75, 100, 150, 200];
const PAGE_SIZE_SELECTOR_CONFIG_TOKEN = new InjectionToken('PAGE_SIZE_SELECTOR_CONFIG_TOKEN');

class SprPageSizeSelectorComponent {
    set currentPageSize(size) {
        this.value = size;
        this.onChange(this.value);
    }
    constructor(pageSizeSelectorConfig) {
        this.pageSizeSelectorConfig = pageSizeSelectorConfig;
        this.sizes = DEFAULT_PAGE_SIZE_SELECTOR_SIZES;
        this.disabled = false;
        this.sizesOptions = this.pageSizeSelectorConfig.mapToOptions(this.sizes);
        this.value = 0;
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    ngOnChanges(changes) {
        if (changes && changes['sizes']) {
            this.sizesOptions = this.pageSizeSelectorConfig.mapToOptions(this.sizes);
        }
    }
    ngOnInit() {
        this.value = this.currentPageSize;
    }
    writeValue(value) {
        this.value = value;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprPageSizeSelectorComponent, deps: [{ token: PAGE_SIZE_SELECTOR_CONFIG_TOKEN }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: SprPageSizeSelectorComponent, isStandalone: true, selector: "spr-page-size-selector", inputs: { currentPageSize: "currentPageSize", sizes: "sizes", disabled: "disabled" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => SprPageSizeSelectorComponent),
                multi: true,
            },
        ], usesOnChanges: true, ngImport: i0, template: "<spr-dropdown\n  [ngModel]=\"value\"\n  (ngModelChange)=\"onChange($event)\"\n  [disabled]=\"disabled\"\n  [options]=\"sizesOptions\"></spr-dropdown>\n", styles: [":host{display:block}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: SprDropdownComponent, selector: "spr-dropdown", inputs: ["placeholder", "inputPlaceholder", "addonStart", "addonEnd"] }, { kind: "ngmodule", type: ReactiveFormsModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprPageSizeSelectorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-page-size-selector', imports: [CommonModule, FormsModule, SprDropdownComponent, ReactiveFormsModule], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => SprPageSizeSelectorComponent),
                            multi: true,
                        },
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<spr-dropdown\n  [ngModel]=\"value\"\n  (ngModelChange)=\"onChange($event)\"\n  [disabled]=\"disabled\"\n  [options]=\"sizesOptions\"></spr-dropdown>\n", styles: [":host{display:block}\n"] }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PAGE_SIZE_SELECTOR_CONFIG_TOKEN]
                }] }], propDecorators: { currentPageSize: [{
                type: Input
            }], sizes: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });

const PAGINATION_BAR_CONFIG_TOKEN = new InjectionToken('PAGINATION_BAR_CONFIG_TOKEN');

var ExportFormats;
(function (ExportFormats) {
    ExportFormats["XLS"] = "XLS";
    ExportFormats["CSV"] = "CSV";
})(ExportFormats || (ExportFormats = {}));

class CollectionSizePipe {
    constructor() {
        // To keep next button enabled when hasNext is true
        this.nextStepModifier = 2;
    }
    transform(collectionSize, paginationParams, page = DEFAULT_PAGE_NUMBER, size = DEFAULT_PAGE_SIZE) {
        if (!paginationParams) {
            return collectionSize ?? 0;
        }
        if (!paginationParams && !collectionSize) {
            return 0;
        }
        return paginationParams.hasNext ? size * (page + this.nextStepModifier) : size * (page + 1);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CollectionSizePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.14", ngImport: i0, type: CollectionSizePipe, isStandalone: true, name: "collectionSize" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CollectionSizePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'collectionSize',
                    standalone: true,
                }]
        }] });

class SprPaginationBarComponent {
    constructor(paginationBarConfig, fb, destroyRef) {
        this.paginationBarConfig = paginationBarConfig;
        this.fb = fb;
        this.destroyRef = destroyRef;
        this.page = DEFAULT_PAGE_NUMBER;
        this.size = DEFAULT_PAGE_SIZE;
        this.maxPages = 3;
        this.paginationWithPageSize = true;
        this.isPaginationInputDisabled = false;
        this.withExportSection = false;
        this.withSearch = false;
        this.searchPlaceholder = 'Search...';
        this.searchMaxLength = 100;
        this.collectionSize = 0;
        this.isLoading = false;
        this.disabled = false;
        this.isFullField = true;
        this.withBoundaryLinks = true;
        this.updatePageSize = new EventEmitter();
        this.exportFormat = new EventEmitter();
        this.searchValue = new EventEmitter();
        this.exportFormats = ExportFormats;
        this.exportLabel = this.paginationBarConfig.exportLabel;
        this.searchControl = this.fb.nonNullable.control('', [Validators.maxLength(this.searchMaxLength)]);
    }
    ngOnInit() {
        this.subscribeToSearchValueChanges();
    }
    ngOnChanges(changes) {
        if (changes?.['searchMaxLength']) {
            this.searchControl.clearValidators();
            this.searchControl.addValidators([Validators.maxLength(this.searchMaxLength)]);
            this.searchControl.updateValueAndValidity();
        }
    }
    onPageChange(newPage) {
        const page = newPage - 1;
        if (page === this.page) {
            return;
        }
        this.updatePageSize.emit({ page, size: this.size });
    }
    onSizeChange(newSize) {
        if (newSize === this.size) {
            return;
        }
        this.updatePageSize.emit({ size: newSize, page: DEFAULT_PAGE_NUMBER });
    }
    exportAsFormat(format) {
        this.exportFormat.emit(format);
    }
    clearSearch() {
        this.searchControl.patchValue('');
    }
    subscribeToSearchValueChanges() {
        this.searchControl.valueChanges
            .pipe(debounceTime(500), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef), filter(() => this.searchControl.valid))
            .subscribe((value) => this.searchValue.emit(value));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprPaginationBarComponent, deps: [{ token: PAGINATION_BAR_CONFIG_TOKEN }, { token: i1.FormBuilder }, { token: i0.DestroyRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: SprPaginationBarComponent, isStandalone: true, selector: "spr-pagination-bar", inputs: { page: "page", size: "size", maxPages: "maxPages", paginationParams: "paginationParams", paginationWithPageSize: "paginationWithPageSize", isPaginationInputDisabled: "isPaginationInputDisabled", withExportSection: "withExportSection", withSearch: "withSearch", searchPlaceholder: "searchPlaceholder", searchMaxLength: "searchMaxLength", collectionSize: "collectionSize", isLoading: "isLoading", disabled: "disabled", isFullField: "isFullField", withBoundaryLinks: "withBoundaryLinks" }, outputs: { updatePageSize: "updatePageSize", exportFormat: "exportFormat", searchValue: "searchValue" }, usesOnChanges: true, ngImport: i0, template: "<div class=\"pagination-bar\">\n  <div class=\"pagination-bar__holder\">\n    <ngb-pagination\n      [collectionSize]=\"collectionSize | collectionSize: paginationParams : page : size\"\n      [boundaryLinks]=\"withBoundaryLinks\"\n      [disabled]=\"isLoading\"\n      [page]=\"page + 1\"\n      [pageSize]=\"size\"\n      [rotate]=\"false\"\n      [maxSize]=\"maxPages\"\n      (pageChange)=\"onPageChange($event)\">\n      <ng-template [ngIf]=\"paginationParams\">\n        <ng-template\n          let-currentPage\n          ngbPaginationPages>\n          <li class=\"ngb-custom-pages-item\">\n            <input\n              #i\n              (blur)=\"onPageChange(+i.value)\"\n              (keyup.enter)=\"onPageChange(+i.value)\"\n              [value]=\"currentPage\"\n              [disabled]=\"(!paginationParams.hasNext && !paginationParams.hasPrevious) || isPaginationInputDisabled\"\n              class=\"pagination-bar__input\"\n              id=\"paginationInput\"\n              inputmode=\"numeric\"\n              pattern=\"[0-9]*\"\n              [min]=\"1\"\n              [max]=\"paginationParams.hasNext ? currentPage + 1 : currentPage\"\n              type=\"number\" />\n          </li>\n        </ng-template>\n      </ng-template>\n      <ng-template ngbPaginationFirst>\n        <i class=\"bo-icon-arrows-chevron-double-left arrow-icon\"></i>\n      </ng-template>\n      <ng-template ngbPaginationPrevious>\n        <i class=\"bo-icon-arrows-chevron-left arrow-icon\"></i>\n      </ng-template>\n      <ng-template ngbPaginationNext>\n        <i class=\"bo-icon-arrows-chevron-right arrow-icon\"></i>\n      </ng-template>\n      <ng-template ngbPaginationLast>\n        <i class=\"bo-icon-arrows-chevron-double-right arrow-icon\"></i>\n      </ng-template>\n    </ngb-pagination>\n\n    @if (paginationWithPageSize) {\n      <spr-page-size-selector\n        [disabled]=\"isLoading\"\n        [ngModel]=\"size\"\n        (ngModelChange)=\"onSizeChange($event)\"></spr-page-size-selector>\n    }\n  </div>\n\n  @if (withExportSection) {\n    <div class=\"btn-group-holder\">\n      <span class=\"label-form\">{{ exportLabel }}</span>\n\n      <spr-button\n        [disabled]=\"(!collectionSize && !paginationParams) || isLoading || !isFullField\"\n        variant=\"outline\"\n        size=\"sm\"\n        (click)=\"exportAsFormat(exportFormats.XLS)\"\n        type=\"button\">\n        XLS\n      </spr-button>\n\n      <spr-button\n        [disabled]=\"(!collectionSize && !paginationParams) || isLoading || !isFullField\"\n        variant=\"outline\"\n        size=\"sm\"\n        (click)=\"exportAsFormat(exportFormats.CSV)\"\n        type=\"button\">\n        CSV\n      </spr-button>\n    </div>\n  }\n\n  @if (withSearch) {\n    <spr-input\n      [prepend]=\"true\"\n      [append]=\"true\"\n      [placeholder]=\"searchPlaceholder\"\n      [formControl]=\"searchControl\">\n      <i\n        prependContent\n        class=\"bo-icon-control-search\"></i>\n\n      @if (searchControl.value) {\n        <i\n          appendContent\n          class=\"bo-icon-control-cross\"\n          (click)=\"clearSearch()\"></i>\n      }\n    </spr-input>\n  }\n</div>\n", styles: [":host{--brd-pagination-gap: 4px;--brd-pagination-padding: 8px;--brd-pagination-bg: rgb(var(--brd-gray-100));--brd-pagination-border-radius: 12px;display:block}.pagination-bar{display:flex;align-items:center;justify-content:space-between;gap:var(--brd-pagination-gap);padding:var(--brd-pagination-padding);background:var(--brd-pagination-bg);border-radius:var(--brd-pagination-border-radius)}.pagination-bar__holder{gap:16px;display:flex;flex-wrap:nowrap;align-items:center;vertical-align:middle}::ng-deep .pagination{--brd-pagination-padding-y: 4px;--brd-pagination-padding-x: 4px;--brd-pagination-font-size: var(--spr-font-size-15);--brd-pagination-color: rgb(var(--brd-gray-700));--brd-pagination-bg: transparent;--brd-pagination-border-color: transparent;--brd-pagination-hover-color: var(--brd-text-hover-700);--brd-pagination-hover-bg: rgb(var(--brd-gray-200));--brd-pagination-hover-border-color: transparent;--brd-pagination-active-color: var(--brd-text-active-700);--brd-pagination-active-bg: rgb(var(--brd-gray-200));--brd-pagination-active-border-color: transparent;--brd-pagination-focus-color: rgb(var(--brd-primary-600));--brd-pagination-focus-bg: rgb(var(--brd-gray-200));--brd-pagination-focus-border-color: rgb(var(--brd-gray-400));--brd-pagination-focus-box-shadow: none;--brd-pagination-disabled-color: var(--brd-text-disabled-500);--brd-pagination-disabled-bg: transparent;--brd-pagination-disabled-border-color: var(--brd-border-disabled-300);display:flex;gap:var(--brd-pagination-gap);padding-left:0;list-style:none;margin:0;box-shadow:none}::ng-deep .pagination .page-item:not(:first-child) .page-link{margin:auto}::ng-deep .pagination .arrow-icon{font-size:var(--spr-font-size-18)}::ng-deep .pagination .page-link,::ng-deep .pagination .pagination-bar__input{display:flex;align-items:center;justify-content:center;min-width:36px;height:36px;margin:0;padding:var(--brd-pagination-padding-y) var(--brd-pagination-padding-x);border:1px solid var(--brd-pagination-border-color);border-radius:var(--spr-border-radius-m);box-shadow:var(--brd-pagination-focus-box-shadow);outline:none;background-color:var(--brd-pagination-bg);color:var(--brd-pagination-color);font-size:var(--brd-pagination-font-size);font-weight:var(--spr-font-weight-medium);text-align:center;text-decoration:none;transition:color var(--spr-transition-time) ease,background-color var(--spr-transition-time) ease,border-color var(--spr-transition-time) ease}::ng-deep .pagination .page-link:hover{--brd-pagination-color: var(--brd-pagination-hover-color);--brd-pagination-bg: var(--brd-pagination-hover-bg);--brd-pagination-border-color: var(--brd-pagination-hover-border-color)}::ng-deep .pagination .page-link:focus{--brd-pagination-color: var(--brd-pagination-focus-color);--brd-pagination-bg: var(--brd-pagination-focus-bg)}::ng-deep .pagination .page-link[aria-label=First],::ng-deep .pagination .page-link[aria-label=Previous],::ng-deep .pagination .page-link[aria-label=Next],::ng-deep .pagination .page-link[aria-label=Last]{--brd-pagination-color: var(--brd-text-default-800);--brd-pagination-bg: var(--brd-fill-default-0);--brd-pagination-border-color: var(--brd-border-default-400)}::ng-deep .pagination .page-link[aria-label=First]:hover,::ng-deep .pagination .page-link[aria-label=Previous]:hover,::ng-deep .pagination .page-link[aria-label=Next]:hover,::ng-deep .pagination .page-link[aria-label=Last]:hover{--brd-pagination-hover-color: var(--brd-text-hover-800);--brd-pagination-hover-bg: var(--brd-fill-hover-0);--brd-pagination-hover-border-color: var(--brd-border-hover-500)}::ng-deep .pagination .page-link[aria-label=First]:focus:not(:active),::ng-deep .pagination .page-link[aria-label=Previous]:focus:not(:active),::ng-deep .pagination .page-link[aria-label=Next]:focus:not(:active),::ng-deep .pagination .page-link[aria-label=Last]:focus:not(:active){--brd-pagination-focus-color: var(--brd-text-default-800);--brd-pagination-focus-bg: var(--brd-fill-default-0);--brd-pagination-focus-border-color: var(--brd-border-default-400)}::ng-deep .pagination .page-link[aria-label=First]:focus-visible,::ng-deep .pagination .page-link[aria-label=Previous]:focus-visible,::ng-deep .pagination .page-link[aria-label=Next]:focus-visible,::ng-deep .pagination .page-link[aria-label=Last]:focus-visible{--brd-pagination-focus-color: var(--brd-text-focus-800);--brd-pagination-focus-bg: var(--brd-fill-default-0);--brd-pagination-focus-border-color: var(--brd-border-default-400);--brd-pagination-focus-box-shadow: 0 0 0 4px rgb(var(--brd-gray-800) / .1)}::ng-deep .pagination .page-link[aria-label=First]:active,::ng-deep .pagination .page-link[aria-label=Previous]:active,::ng-deep .pagination .page-link[aria-label=Next]:active,::ng-deep .pagination .page-link[aria-label=Last]:active{--brd-pagination-color: var(--brd-pagination-active-color);--brd-pagination-bg: var(--brd-fill-disabled-100);--brd-pagination-border-color: var(--brd-border-default-400)}::ng-deep .pagination .active>.page-link{--brd-pagination-color: var(--brd-pagination-active-color);--brd-pagination-bg: var(--brd-pagination-active-bg);--brd-pagination-border-color: var(--brd-pagination-active-border-color)}::ng-deep .pagination .disabled>.page-link{--brd-pagination-color: var(--brd-pagination-disabled-color);--brd-pagination-bg: var(--brd-pagination-disabled-bg);--brd-pagination-border-color: var(--brd-pagination-disabled-border-color);pointer-events:none}::ng-deep .pagination .disabled>.page-link:not([aria-label=First],[aria-label=Previous],[aria-label=Next],[aria-label=Last]){--brd-pagination-disabled-bg: transparent;--brd-pagination-disabled-border-color: transparent}::ng-deep .pagination input.pagination-bar__input{--brd-pagination-color: var(--brd-text-default-800);--brd-pagination-bg: var(--brd-fill-default-0);--brd-pagination-border-color: var(--brd-border-default-400);width:36px}::ng-deep .pagination input.pagination-bar__input::-webkit-inner-spin-button,::ng-deep .pagination input.pagination-bar__input::-webkit-outer-spin-button{appearance:none;margin:0}.btn-group-holder{justify-content:flex-end;gap:8px}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: NgbPagination, selector: "ngb-pagination", inputs: ["disabled", "boundaryLinks", "directionLinks", "ellipses", "rotate", "collectionSize", "maxSize", "page", "pageSize", "size"], outputs: ["pageChange"] }, { kind: "directive", type: NgbPaginationNext, selector: "ng-template[ngbPaginationNext]" }, { kind: "directive", type: NgbPaginationPrevious, selector: "ng-template[ngbPaginationPrevious]" }, { kind: "component", type: SprPageSizeSelectorComponent, selector: "spr-page-size-selector", inputs: ["currentPageSize", "sizes", "disabled"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: NgbPaginationFirst, selector: "ng-template[ngbPaginationFirst]" }, { kind: "directive", type: NgbPaginationLast, selector: "ng-template[ngbPaginationLast]" }, { kind: "directive", type: NgbPaginationPages, selector: "ng-template[ngbPaginationPages]" }, { kind: "pipe", type: CollectionSizePipe, name: "collectionSize" }, { kind: "component", type: SprInputComponent, selector: "spr-input", inputs: ["precision", "type", "placeholder", "isNegativeNumbersAcceptable", "onlyInteger", "isSubmitStrategy", "addonStart", "addonEnd", "prepend", "append", "rounded", "maxLength", "readOnly", "isRevealedInput"], outputs: ["inputTypeChange"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: SprButtonComponent, selector: "spr-button", inputs: ["variant", "type", "size", "isBtnSpinner", "isRadius", "disabled", "isIcon", "buttonId"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprPaginationBarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-pagination-bar', changeDetection: ChangeDetectionStrategy.OnPush, imports: [
                        NgIf,
                        NgbPagination,
                        NgbPaginationNext,
                        NgbPaginationPrevious,
                        SprPageSizeSelectorComponent,
                        FormsModule,
                        NgbPaginationFirst,
                        NgbPaginationLast,
                        NgbPaginationPages,
                        CollectionSizePipe,
                        SprInputComponent,
                        ReactiveFormsModule,
                        SprButtonComponent,
                    ], template: "<div class=\"pagination-bar\">\n  <div class=\"pagination-bar__holder\">\n    <ngb-pagination\n      [collectionSize]=\"collectionSize | collectionSize: paginationParams : page : size\"\n      [boundaryLinks]=\"withBoundaryLinks\"\n      [disabled]=\"isLoading\"\n      [page]=\"page + 1\"\n      [pageSize]=\"size\"\n      [rotate]=\"false\"\n      [maxSize]=\"maxPages\"\n      (pageChange)=\"onPageChange($event)\">\n      <ng-template [ngIf]=\"paginationParams\">\n        <ng-template\n          let-currentPage\n          ngbPaginationPages>\n          <li class=\"ngb-custom-pages-item\">\n            <input\n              #i\n              (blur)=\"onPageChange(+i.value)\"\n              (keyup.enter)=\"onPageChange(+i.value)\"\n              [value]=\"currentPage\"\n              [disabled]=\"(!paginationParams.hasNext && !paginationParams.hasPrevious) || isPaginationInputDisabled\"\n              class=\"pagination-bar__input\"\n              id=\"paginationInput\"\n              inputmode=\"numeric\"\n              pattern=\"[0-9]*\"\n              [min]=\"1\"\n              [max]=\"paginationParams.hasNext ? currentPage + 1 : currentPage\"\n              type=\"number\" />\n          </li>\n        </ng-template>\n      </ng-template>\n      <ng-template ngbPaginationFirst>\n        <i class=\"bo-icon-arrows-chevron-double-left arrow-icon\"></i>\n      </ng-template>\n      <ng-template ngbPaginationPrevious>\n        <i class=\"bo-icon-arrows-chevron-left arrow-icon\"></i>\n      </ng-template>\n      <ng-template ngbPaginationNext>\n        <i class=\"bo-icon-arrows-chevron-right arrow-icon\"></i>\n      </ng-template>\n      <ng-template ngbPaginationLast>\n        <i class=\"bo-icon-arrows-chevron-double-right arrow-icon\"></i>\n      </ng-template>\n    </ngb-pagination>\n\n    @if (paginationWithPageSize) {\n      <spr-page-size-selector\n        [disabled]=\"isLoading\"\n        [ngModel]=\"size\"\n        (ngModelChange)=\"onSizeChange($event)\"></spr-page-size-selector>\n    }\n  </div>\n\n  @if (withExportSection) {\n    <div class=\"btn-group-holder\">\n      <span class=\"label-form\">{{ exportLabel }}</span>\n\n      <spr-button\n        [disabled]=\"(!collectionSize && !paginationParams) || isLoading || !isFullField\"\n        variant=\"outline\"\n        size=\"sm\"\n        (click)=\"exportAsFormat(exportFormats.XLS)\"\n        type=\"button\">\n        XLS\n      </spr-button>\n\n      <spr-button\n        [disabled]=\"(!collectionSize && !paginationParams) || isLoading || !isFullField\"\n        variant=\"outline\"\n        size=\"sm\"\n        (click)=\"exportAsFormat(exportFormats.CSV)\"\n        type=\"button\">\n        CSV\n      </spr-button>\n    </div>\n  }\n\n  @if (withSearch) {\n    <spr-input\n      [prepend]=\"true\"\n      [append]=\"true\"\n      [placeholder]=\"searchPlaceholder\"\n      [formControl]=\"searchControl\">\n      <i\n        prependContent\n        class=\"bo-icon-control-search\"></i>\n\n      @if (searchControl.value) {\n        <i\n          appendContent\n          class=\"bo-icon-control-cross\"\n          (click)=\"clearSearch()\"></i>\n      }\n    </spr-input>\n  }\n</div>\n", styles: [":host{--brd-pagination-gap: 4px;--brd-pagination-padding: 8px;--brd-pagination-bg: rgb(var(--brd-gray-100));--brd-pagination-border-radius: 12px;display:block}.pagination-bar{display:flex;align-items:center;justify-content:space-between;gap:var(--brd-pagination-gap);padding:var(--brd-pagination-padding);background:var(--brd-pagination-bg);border-radius:var(--brd-pagination-border-radius)}.pagination-bar__holder{gap:16px;display:flex;flex-wrap:nowrap;align-items:center;vertical-align:middle}::ng-deep .pagination{--brd-pagination-padding-y: 4px;--brd-pagination-padding-x: 4px;--brd-pagination-font-size: var(--spr-font-size-15);--brd-pagination-color: rgb(var(--brd-gray-700));--brd-pagination-bg: transparent;--brd-pagination-border-color: transparent;--brd-pagination-hover-color: var(--brd-text-hover-700);--brd-pagination-hover-bg: rgb(var(--brd-gray-200));--brd-pagination-hover-border-color: transparent;--brd-pagination-active-color: var(--brd-text-active-700);--brd-pagination-active-bg: rgb(var(--brd-gray-200));--brd-pagination-active-border-color: transparent;--brd-pagination-focus-color: rgb(var(--brd-primary-600));--brd-pagination-focus-bg: rgb(var(--brd-gray-200));--brd-pagination-focus-border-color: rgb(var(--brd-gray-400));--brd-pagination-focus-box-shadow: none;--brd-pagination-disabled-color: var(--brd-text-disabled-500);--brd-pagination-disabled-bg: transparent;--brd-pagination-disabled-border-color: var(--brd-border-disabled-300);display:flex;gap:var(--brd-pagination-gap);padding-left:0;list-style:none;margin:0;box-shadow:none}::ng-deep .pagination .page-item:not(:first-child) .page-link{margin:auto}::ng-deep .pagination .arrow-icon{font-size:var(--spr-font-size-18)}::ng-deep .pagination .page-link,::ng-deep .pagination .pagination-bar__input{display:flex;align-items:center;justify-content:center;min-width:36px;height:36px;margin:0;padding:var(--brd-pagination-padding-y) var(--brd-pagination-padding-x);border:1px solid var(--brd-pagination-border-color);border-radius:var(--spr-border-radius-m);box-shadow:var(--brd-pagination-focus-box-shadow);outline:none;background-color:var(--brd-pagination-bg);color:var(--brd-pagination-color);font-size:var(--brd-pagination-font-size);font-weight:var(--spr-font-weight-medium);text-align:center;text-decoration:none;transition:color var(--spr-transition-time) ease,background-color var(--spr-transition-time) ease,border-color var(--spr-transition-time) ease}::ng-deep .pagination .page-link:hover{--brd-pagination-color: var(--brd-pagination-hover-color);--brd-pagination-bg: var(--brd-pagination-hover-bg);--brd-pagination-border-color: var(--brd-pagination-hover-border-color)}::ng-deep .pagination .page-link:focus{--brd-pagination-color: var(--brd-pagination-focus-color);--brd-pagination-bg: var(--brd-pagination-focus-bg)}::ng-deep .pagination .page-link[aria-label=First],::ng-deep .pagination .page-link[aria-label=Previous],::ng-deep .pagination .page-link[aria-label=Next],::ng-deep .pagination .page-link[aria-label=Last]{--brd-pagination-color: var(--brd-text-default-800);--brd-pagination-bg: var(--brd-fill-default-0);--brd-pagination-border-color: var(--brd-border-default-400)}::ng-deep .pagination .page-link[aria-label=First]:hover,::ng-deep .pagination .page-link[aria-label=Previous]:hover,::ng-deep .pagination .page-link[aria-label=Next]:hover,::ng-deep .pagination .page-link[aria-label=Last]:hover{--brd-pagination-hover-color: var(--brd-text-hover-800);--brd-pagination-hover-bg: var(--brd-fill-hover-0);--brd-pagination-hover-border-color: var(--brd-border-hover-500)}::ng-deep .pagination .page-link[aria-label=First]:focus:not(:active),::ng-deep .pagination .page-link[aria-label=Previous]:focus:not(:active),::ng-deep .pagination .page-link[aria-label=Next]:focus:not(:active),::ng-deep .pagination .page-link[aria-label=Last]:focus:not(:active){--brd-pagination-focus-color: var(--brd-text-default-800);--brd-pagination-focus-bg: var(--brd-fill-default-0);--brd-pagination-focus-border-color: var(--brd-border-default-400)}::ng-deep .pagination .page-link[aria-label=First]:focus-visible,::ng-deep .pagination .page-link[aria-label=Previous]:focus-visible,::ng-deep .pagination .page-link[aria-label=Next]:focus-visible,::ng-deep .pagination .page-link[aria-label=Last]:focus-visible{--brd-pagination-focus-color: var(--brd-text-focus-800);--brd-pagination-focus-bg: var(--brd-fill-default-0);--brd-pagination-focus-border-color: var(--brd-border-default-400);--brd-pagination-focus-box-shadow: 0 0 0 4px rgb(var(--brd-gray-800) / .1)}::ng-deep .pagination .page-link[aria-label=First]:active,::ng-deep .pagination .page-link[aria-label=Previous]:active,::ng-deep .pagination .page-link[aria-label=Next]:active,::ng-deep .pagination .page-link[aria-label=Last]:active{--brd-pagination-color: var(--brd-pagination-active-color);--brd-pagination-bg: var(--brd-fill-disabled-100);--brd-pagination-border-color: var(--brd-border-default-400)}::ng-deep .pagination .active>.page-link{--brd-pagination-color: var(--brd-pagination-active-color);--brd-pagination-bg: var(--brd-pagination-active-bg);--brd-pagination-border-color: var(--brd-pagination-active-border-color)}::ng-deep .pagination .disabled>.page-link{--brd-pagination-color: var(--brd-pagination-disabled-color);--brd-pagination-bg: var(--brd-pagination-disabled-bg);--brd-pagination-border-color: var(--brd-pagination-disabled-border-color);pointer-events:none}::ng-deep .pagination .disabled>.page-link:not([aria-label=First],[aria-label=Previous],[aria-label=Next],[aria-label=Last]){--brd-pagination-disabled-bg: transparent;--brd-pagination-disabled-border-color: transparent}::ng-deep .pagination input.pagination-bar__input{--brd-pagination-color: var(--brd-text-default-800);--brd-pagination-bg: var(--brd-fill-default-0);--brd-pagination-border-color: var(--brd-border-default-400);width:36px}::ng-deep .pagination input.pagination-bar__input::-webkit-inner-spin-button,::ng-deep .pagination input.pagination-bar__input::-webkit-outer-spin-button{appearance:none;margin:0}.btn-group-holder{justify-content:flex-end;gap:8px}\n"] }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PAGINATION_BAR_CONFIG_TOKEN]
                }] }, { type: i1.FormBuilder }, { type: i0.DestroyRef }], propDecorators: { page: [{
                type: Input
            }], size: [{
                type: Input
            }], maxPages: [{
                type: Input
            }], paginationParams: [{
                type: Input
            }], paginationWithPageSize: [{
                type: Input
            }], isPaginationInputDisabled: [{
                type: Input
            }], withExportSection: [{
                type: Input
            }], withSearch: [{
                type: Input
            }], searchPlaceholder: [{
                type: Input
            }], searchMaxLength: [{
                type: Input
            }], collectionSize: [{
                type: Input
            }], isLoading: [{
                type: Input
            }], disabled: [{
                type: Input
            }], isFullField: [{
                type: Input
            }], withBoundaryLinks: [{
                type: Input
            }], updatePageSize: [{
                type: Output
            }], exportFormat: [{
                type: Output
            }], searchValue: [{
                type: Output
            }] } });

class IsDisabledDatePipe {
    transform(date, today) {
        return today && date.after(today);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: IsDisabledDatePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.14", ngImport: i0, type: IsDisabledDatePipe, isStandalone: true, name: "isDisabledDate" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: IsDisabledDatePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'isDisabledDate',
                    standalone: true,
                }]
        }] });

const isHovered = (date, { dateFrom, dateTo }, hoveredDate) => dateFrom && (dateTo?.equals(dateFrom) || false) && hoveredDate && date.after(dateFrom) && date.before(hoveredDate);

class IsHoveredPipe {
    transform(date, formValue, hovered) {
        return isHovered(date, formValue, hovered);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: IsHoveredPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.14", ngImport: i0, type: IsHoveredPipe, isStandalone: true, name: "isHovered" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: IsHoveredPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'isHovered',
                    standalone: true,
                }]
        }] });

const isInside = (date, { dateFrom, dateTo }) => date.after(dateFrom) && date.before(dateTo);

class IsInsidePipe {
    transform(date, formValue) {
        return isInside(date, formValue);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: IsInsidePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.14", ngImport: i0, type: IsInsidePipe, isStandalone: true, name: "isInside" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: IsInsidePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'isInside',
                    standalone: true,
                }]
        }] });

const isRange = (date, { dateFrom, dateTo }, hovered) => date.equals(dateFrom) ||
    (dateTo && date.equals(dateTo)) ||
    isInside(date, { dateFrom, dateTo }) ||
    isHovered(date, { dateFrom, dateTo }, hovered);

class IsRangePipe {
    transform(date, formValue, hovered) {
        return isRange(date, formValue, hovered);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: IsRangePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.14", ngImport: i0, type: IsRangePipe, isStandalone: true, name: "isRange" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: IsRangePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'isRange',
                    standalone: true,
                }]
        }] });

const ONE_DAY_TIME_STAMP = 86400000;

const dateParse = (value) => {
    const date = new Date(value);
    if (isValid(date)) {
        return new NgbDate(getYear(date), getMonth(date) + 1, getDate(date));
    }
    return null;
};
const fromNgbDate = ({ day, year, month }) => {
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
};

const DEFAULT_FOOTER_SETTINGS = {
    showFooter: false,
    submitDateOnApply: false,
    position: 'right',
    cancelButtonText: 'Cancel',
    applyButtonText: 'Apply',
    templateRef: null,
};
const DEFAULT_DROPDOWN_NOT_SELECTED_TEXT = 'Not selected';
const DEFAULT_INPUT_NOT_SELECTED_PLAYSHOLDER = 'Not selected';

class SprBasePeriodSelector extends BaseControl {
    constructor() {
        super(...arguments);
        this.maxRangeInDays = null;
        this.rangeConfirmed = new EventEmitter();
        this.rangeCanceled = new EventEmitter();
        this.fullFooterSettings = DEFAULT_FOOTER_SETTINGS;
        this.hoveredDate = null;
        this.alreadyAppliedDateForNgbDatePicker = { dateFrom: null, dateTo: null };
        this.alreadyAppliedDate = {};
        this.dateValueReadyToEmit = {};
        this.dateSelectedFromSelectOption = false;
    }
    set footerSettings(settings) {
        if (!settings) {
            return;
        }
        this.fullFooterSettings = {
            ...DEFAULT_FOOTER_SETTINGS,
            ...settings,
        };
    }
    ngOnInit() {
        super.ngOnInit();
        const date = new Date();
        this.maxDate = new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
        if (this.maxDate.month === 1) {
            this.startDate = new NgbDate(this.maxDate.year - 1, 12, 1);
        }
        else {
            this.startDate = new NgbDate(this.maxDate.year, this.maxDate.month - 1, 1);
        }
    }
    onDateSelection(date, custom = false) {
        this.dateSelectedFromSelectOption = false;
        const { dateFrom, dateTo } = this.control.getRawValue();
        let newFromDate = dateFrom;
        let newToDate = dateTo;
        if (!dateFrom && !dateTo) {
            newFromDate = date;
            newToDate = date;
        }
        else if (dateFrom && dateTo) {
            if (dateFrom.equals(dateTo) && date.after(dateFrom)) {
                newToDate = date;
            }
            else {
                newFromDate = date;
                newToDate = date;
            }
        }
        this.control.patchValue({
            dateFrom: newFromDate,
            dateTo: newToDate,
        });
        this.cvaOnTouched();
        this.cdRef.markForCheck();
    }
    writeValue(value) {
        if (value) {
            const dateFrom = dateParse(value.dateFrom ?? '');
            const dateTo = dateParse(value.dateTo ?? '');
            this.control.patchValue({
                dateFrom,
                dateTo,
            });
            this.onApply(false);
            this.cdRef.markForCheck();
        }
        else {
            this.control.patchValue({
                dateFrom: null,
                dateTo: null,
            });
        }
    }
    onApply(triggerOnChange = true) {
        this.alreadyAppliedDateForNgbDatePicker = this.control.getRawValue();
        this.alreadyAppliedDate = this.dateValueReadyToEmit;
        if (triggerOnChange) {
            this.cvaOnChange(this.alreadyAppliedDate);
            this.rangeConfirmed.emit(this.alreadyAppliedDate);
        }
    }
    onClose(datepicker, closeOnButton = false) {
        if (!this.fullFooterSettings.submitDateOnApply) {
            return;
        }
        this.control.patchValue(this.alreadyAppliedDateForNgbDatePicker);
        if (closeOnButton) {
            datepicker.close();
            this.rangeCanceled.emit();
        }
    }
    initControlListener() {
        this.control.valueChanges
            .pipe(map(({ dateFrom, dateTo }) => {
            if (!dateFrom && !dateTo) {
                return null;
            }
            return {
                dateFrom: dateFrom ? `${fromNgbDate(dateFrom)}T00:00:00.000Z` : undefined,
                dateTo: dateTo ? `${fromNgbDate(dateTo)}T23:59:59.000Z` : undefined,
            };
        }), takeUntilDestroyed(this.destroyRef))
            .subscribe((date) => {
            if (this.maxRangeInDays !== null && date?.dateFrom) {
                const dateFrom = new Date(date.dateFrom);
                const today = new Date();
                const maxAllowedDate = new Date(dateFrom.getTime() + ONE_DAY_TIME_STAMP * (this.maxRangeInDays - 1));
                const effectiveMaxDate = maxAllowedDate > today ? today : maxAllowedDate;
                const year = effectiveMaxDate.getFullYear();
                const month = effectiveMaxDate.getMonth() + 1;
                const day = effectiveMaxDate.getDate();
                this.maxDate = new NgbDate(year, month, day);
                if (date.dateTo && new Date(date.dateTo) > effectiveMaxDate) {
                    date.dateTo = `${fromNgbDate(this.maxDate)}T23:59:59.000Z`;
                }
            }
            this.dateValueReadyToEmit = date;
            this.cdRef.markForCheck();
            if (!this.fullFooterSettings.submitDateOnApply || this.dateSelectedFromSelectOption) {
                this.cvaOnChange(date);
            }
        });
    }
    initControl() {
        return this.formBuilder.nonNullable.group({
            dateFrom: this.formBuilder.control(null),
            dateTo: this.formBuilder.control(null),
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprBasePeriodSelector, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: SprBasePeriodSelector, isStandalone: true, inputs: { footerSettings: "footerSettings", maxRangeInDays: "maxRangeInDays" }, outputs: { rangeConfirmed: "rangeConfirmed", rangeCanceled: "rangeCanceled" }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprBasePeriodSelector, decorators: [{
            type: Directive
        }], propDecorators: { footerSettings: [{
                type: Input
            }], maxRangeInDays: [{
                type: Input
            }], rangeConfirmed: [{
                type: Output
            }], rangeCanceled: [{
                type: Output
            }] } });

class SprPeriodSelectorPopupComponent extends SprBasePeriodSelector {
    constructor() {
        super(...arguments);
        this.calendarOpened = new EventEmitter();
        this.calendarClosed = new EventEmitter();
    }
    ngAfterViewInit() {
        requestAnimationFrame(() => {
            this.datepicker.open();
            this.calendarOpened.emit();
        });
        this.datepicker.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
            this.calendarClosed.emit();
        });
    }
    setHoveredDate(date) {
        this.hoveredDate = date;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprPeriodSelectorPopupComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: SprPeriodSelectorPopupComponent, isStandalone: true, selector: "spr-period-selector-popup", outputs: { calendarOpened: "calendarOpened", calendarClosed: "calendarClosed" }, providers: [{ provide: NgbDatepickerI18n, useClass: DatepickerTranslateService }], viewQueries: [{ propertyName: "datepicker", first: true, predicate: ["datepicker"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<div [class.is-open]=\"datepicker.isOpen()\">\n  <div class=\"dp-hidden position-absolute input-group\">\n    <input\n      #datepicker=\"ngbDatepicker\"\n      [class.is-invalid]=\"isInvalidControl\"\n      [dayTemplate]=\"dayTemplate\"\n      [disabled]=\"control.disabled\"\n      [displayMonths]=\"2\"\n      [id]=\"inputId()\"\n      [maxDate]=\"maxDate\"\n      [startDate]=\"control.value.dateFrom || startDate\"\n      [footerTemplate]=\"footerTemplate\"\n      (dateSelect)=\"onDateSelection($event)\"\n      (closed)=\"onClose(datepicker)\"\n      class=\"control-form control-form--hidden-input\"\n      container=\"body\"\n      autoClose=\"outside\"\n      name=\"datepicker\"\n      ngbDatepicker\n      outsideDays=\"hidden\"\n      tabindex=\"-1\" />\n\n    <ng-template\n      #dayTemplate\n      let-date\n      let-focused=\"focused\">\n      <span\n        [class.disabled-date]=\"date | isDisabledDate: maxDate\"\n        [class.faded]=\"(date | isHovered: $any(control.value) : hoveredDate) || (date | isInside: $any(control.value))\"\n        [class.focused]=\"focused\"\n        [class.range]=\"date | isRange: $any(control.value) : hoveredDate\"\n        (mouseenter)=\"setHoveredDate(date)\"\n        (mouseleave)=\"setHoveredDate(null)\"\n        class=\"btn-light\">\n        {{ date.day }}\n      </span>\n    </ng-template>\n  </div>\n\n  <ng-template #footerTemplate>\n    <ng-container *ngIf=\"fullFooterSettings.showFooter\">\n      <div *ngIf=\"fullFooterSettings.templateRef; else defaultPeriodSelectorFooterActions\">\n        <ng-container [ngTemplateOutlet]=\"fullFooterSettings.templateRef\"></ng-container>\n      </div>\n\n      <ng-template #defaultPeriodSelectorFooterActions>\n        <div\n          [class.left-footer-position]=\"fullFooterSettings.position === 'left'\"\n          class=\"default-period-selector-footer-actions\">\n          <spr-button\n            variant=\"outline\"\n            size=\"sm\"\n            (click)=\"onClose(datepicker, true)\"\n            >{{ fullFooterSettings.cancelButtonText }}</spr-button\n          >\n\n          <spr-button\n            size=\"sm\"\n            (click)=\"onApply(); onClose(datepicker, true)\"\n            >{{ fullFooterSettings.applyButtonText }}</spr-button\n          >\n        </div>\n      </ng-template>\n    </ng-container>\n  </ng-template>\n</div>\n", styles: [":host{display:block}.input-group--with-select .form-control-datepicker,.input-group--with-select .form-datepicker-control{border-radius:var(--spr-border-radius-m) 0 0 var(--spr-border-radius-m)!important}.input-group--with-select .input-container{flex:auto}.input-group--with-select .btn{border-radius:0 var(--spr-border-radius-m) var(--spr-border-radius-m) 0!important}.dropdown-toggle{border-top-left-radius:0;border-bottom-left-radius:0}.dropdown-toggle:after{display:none}.default-period-selector-footer-actions{display:flex;justify-content:flex-end;align-items:center;gap:12px;padding:8px}.default-period-selector-footer-actions.left-footer-position{justify-content:flex-start}.control-form--hidden-input{width:0;height:0;opacity:0;pointer-events:none;position:absolute}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: NgbInputDatepicker, selector: "input[ngbDatepicker]", inputs: ["autoClose", "contentTemplate", "datepickerClass", "dayTemplate", "dayTemplateData", "displayMonths", "firstDayOfWeek", "footerTemplate", "markDisabled", "minDate", "maxDate", "navigation", "outsideDays", "placement", "popperOptions", "restoreFocus", "showWeekNumbers", "startDate", "container", "positionTarget", "weekdays", "disabled"], outputs: ["dateSelect", "navigate", "closed"], exportAs: ["ngbDatepicker"] }, { kind: "pipe", type: IsDisabledDatePipe, name: "isDisabledDate" }, { kind: "pipe", type: IsHoveredPipe, name: "isHovered" }, { kind: "pipe", type: IsInsidePipe, name: "isInside" }, { kind: "pipe", type: IsRangePipe, name: "isRange" }, { kind: "component", type: SprButtonComponent, selector: "spr-button", inputs: ["variant", "type", "size", "isBtnSpinner", "isRadius", "disabled", "isIcon", "buttonId"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprPeriodSelectorPopupComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-period-selector-popup', imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        NgbInputDatepicker,
                        IsDisabledDatePipe,
                        IsHoveredPipe,
                        IsInsidePipe,
                        IsRangePipe,
                        SprButtonComponent,
                    ], providers: [{ provide: NgbDatepickerI18n, useClass: DatepickerTranslateService }], changeDetection: ChangeDetectionStrategy.OnPush, standalone: true, template: "<div [class.is-open]=\"datepicker.isOpen()\">\n  <div class=\"dp-hidden position-absolute input-group\">\n    <input\n      #datepicker=\"ngbDatepicker\"\n      [class.is-invalid]=\"isInvalidControl\"\n      [dayTemplate]=\"dayTemplate\"\n      [disabled]=\"control.disabled\"\n      [displayMonths]=\"2\"\n      [id]=\"inputId()\"\n      [maxDate]=\"maxDate\"\n      [startDate]=\"control.value.dateFrom || startDate\"\n      [footerTemplate]=\"footerTemplate\"\n      (dateSelect)=\"onDateSelection($event)\"\n      (closed)=\"onClose(datepicker)\"\n      class=\"control-form control-form--hidden-input\"\n      container=\"body\"\n      autoClose=\"outside\"\n      name=\"datepicker\"\n      ngbDatepicker\n      outsideDays=\"hidden\"\n      tabindex=\"-1\" />\n\n    <ng-template\n      #dayTemplate\n      let-date\n      let-focused=\"focused\">\n      <span\n        [class.disabled-date]=\"date | isDisabledDate: maxDate\"\n        [class.faded]=\"(date | isHovered: $any(control.value) : hoveredDate) || (date | isInside: $any(control.value))\"\n        [class.focused]=\"focused\"\n        [class.range]=\"date | isRange: $any(control.value) : hoveredDate\"\n        (mouseenter)=\"setHoveredDate(date)\"\n        (mouseleave)=\"setHoveredDate(null)\"\n        class=\"btn-light\">\n        {{ date.day }}\n      </span>\n    </ng-template>\n  </div>\n\n  <ng-template #footerTemplate>\n    <ng-container *ngIf=\"fullFooterSettings.showFooter\">\n      <div *ngIf=\"fullFooterSettings.templateRef; else defaultPeriodSelectorFooterActions\">\n        <ng-container [ngTemplateOutlet]=\"fullFooterSettings.templateRef\"></ng-container>\n      </div>\n\n      <ng-template #defaultPeriodSelectorFooterActions>\n        <div\n          [class.left-footer-position]=\"fullFooterSettings.position === 'left'\"\n          class=\"default-period-selector-footer-actions\">\n          <spr-button\n            variant=\"outline\"\n            size=\"sm\"\n            (click)=\"onClose(datepicker, true)\"\n            >{{ fullFooterSettings.cancelButtonText }}</spr-button\n          >\n\n          <spr-button\n            size=\"sm\"\n            (click)=\"onApply(); onClose(datepicker, true)\"\n            >{{ fullFooterSettings.applyButtonText }}</spr-button\n          >\n        </div>\n      </ng-template>\n    </ng-container>\n  </ng-template>\n</div>\n", styles: [":host{display:block}.input-group--with-select .form-control-datepicker,.input-group--with-select .form-datepicker-control{border-radius:var(--spr-border-radius-m) 0 0 var(--spr-border-radius-m)!important}.input-group--with-select .input-container{flex:auto}.input-group--with-select .btn{border-radius:0 var(--spr-border-radius-m) var(--spr-border-radius-m) 0!important}.dropdown-toggle{border-top-left-radius:0;border-bottom-left-radius:0}.dropdown-toggle:after{display:none}.default-period-selector-footer-actions{display:flex;justify-content:flex-end;align-items:center;gap:12px;padding:8px}.default-period-selector-footer-actions.left-footer-position{justify-content:flex-start}.control-form--hidden-input{width:0;height:0;opacity:0;pointer-events:none;position:absolute}\n"] }]
        }], propDecorators: { calendarOpened: [{
                type: Output
            }], calendarClosed: [{
                type: Output
            }], datepicker: [{
                type: ViewChild,
                args: ['datepicker', { static: true }]
            }] } });

class SprTogglePeriodSelectorDirective {
    constructor(viewContainerRef, destroyRef) {
        this.viewContainerRef = viewContainerRef;
        this.destroyRef = destroyRef;
        this.rangeConfirmed = new EventEmitter();
        this.rangeCanceled = new EventEmitter();
        this.componentRef = null;
        this.isConfirmed = false;
    }
    onClick() {
        this.toggleSelector();
    }
    toggleSelector() {
        if (this.componentRef) {
            this.destroyComponent();
        }
        else {
            this.componentRef = this.viewContainerRef.createComponent(SprPeriodSelectorPopupComponent);
            this.componentRef.setInput('inputId', this.inputId);
            this.componentRef.setInput('isDisabled', this.isDisabled);
            this.componentRef.setInput('maxRangeInDays', this.maxRangeInDays);
            this.componentRef.setInput('footerSettings', this.footerSettings);
            this.subscribeToCalendarCloseEvent(this.componentRef.instance);
            this.subscribeToRangeConfirmEvent(this.componentRef.instance);
            this.subscribeToRangeCancelEvent(this.componentRef.instance);
        }
    }
    subscribeToCalendarCloseEvent(instance) {
        instance.calendarClosed.pipe(take(1), takeUntilDestroyed(this.destroyRef)).subscribe(() => this.destroyComponent());
    }
    subscribeToRangeConfirmEvent(instance) {
        instance.rangeConfirmed.pipe(take(1), takeUntilDestroyed(this.destroyRef)).subscribe((range) => {
            this.isConfirmed = true;
            this.rangeConfirmed.emit(range);
            this.destroyComponent();
        });
    }
    subscribeToRangeCancelEvent(instance) {
        instance.rangeCanceled.pipe(take(1), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
            if (!this.isConfirmed) {
                this.rangeCanceled.emit();
            }
            this.isConfirmed = false;
            this.destroyComponent();
        });
    }
    destroyComponent() {
        this.componentRef?.destroy();
        this.componentRef = null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprTogglePeriodSelectorDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.DestroyRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: SprTogglePeriodSelectorDirective, isStandalone: true, selector: "[sprTogglePeriodSelector]", inputs: { footerSettings: "footerSettings", maxRangeInDays: "maxRangeInDays", isDisabled: "isDisabled", inputId: "inputId" }, outputs: { rangeConfirmed: "rangeConfirmed", rangeCanceled: "rangeCanceled" }, host: { listeners: { "click": "onClick()" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprTogglePeriodSelectorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[sprTogglePeriodSelector]',
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: i0.ViewContainerRef }, { type: i0.DestroyRef }], propDecorators: { footerSettings: [{
                type: Input
            }], maxRangeInDays: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], inputId: [{
                type: Input
            }], rangeConfirmed: [{
                type: Output
            }], rangeCanceled: [{
                type: Output
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }] } });

class GetDisplayedDatePipe {
    constructor(ngbDateAdapter) {
        this.ngbDateAdapter = ngbDateAdapter;
        this.displayedValue = '';
    }
    transform({ dateFrom, dateTo }) {
        if (!dateFrom && !dateTo) {
            return ``;
        }
        if (this.lastValue && this.lastValue.dateFrom === dateFrom && this.lastValue.dateTo === dateTo) {
            return this.displayedValue;
        }
        this.lastValue = { dateFrom, dateTo };
        this.displayedValue = `${this.ngbDateAdapter.toModel(dateFrom)} - ${this.ngbDateAdapter.toModel(dateTo)}`;
        return this.displayedValue;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: GetDisplayedDatePipe, deps: [{ token: i1$1.NgbDateAdapter }], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.14", ngImport: i0, type: GetDisplayedDatePipe, isStandalone: true, name: "getDisplayedDate" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: GetDisplayedDatePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'getDisplayedDate',
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: i1$1.NgbDateAdapter }] });

var PeriodVariants;
(function (PeriodVariants) {
    PeriodVariants["Today"] = "today";
    PeriodVariants["Yesterday"] = "yesterday";
    PeriodVariants["Week"] = "week";
    PeriodVariants["LastSevenDays"] = "last_7_days";
    PeriodVariants["LastWeek"] = "last_week";
    PeriodVariants["ThisMonth"] = "this_month";
    PeriodVariants["LastMonth"] = "last_month";
    PeriodVariants["LastThirtyDays"] = "last_30_days";
    PeriodVariants["LastThreeMonth"] = "last_three_month";
    PeriodVariants["LastYear"] = "last_year";
    PeriodVariants["Lifetime"] = "lifetime";
    PeriodVariants["All"] = "all";
    PeriodVariants["Custom"] = "custom";
    PeriodVariants["NotSelected"] = "notSelected";
})(PeriodVariants || (PeriodVariants = {}));

class DateRangeService {
    static getDateRange(period) {
        if (period === PeriodVariants.Lifetime || period === PeriodVariants.NotSelected) {
            return null;
        }
        const { dateFrom, dateTo } = this.getDateRangeUtil(period);
        return {
            dateFrom: new NgbDate(getYear(dateFrom), getMonth(dateFrom) + 1, getDate(dateFrom)),
            dateTo: new NgbDate(getYear(dateTo), getMonth(dateTo) + 1, getDate(dateTo)),
        };
    }
    static getDateRangeInModel(period) {
        const { dateFrom, dateTo } = this.getDateRangeUtil(period);
        return {
            dateFrom: `${getYear(dateFrom)}-${String(getMonth(dateFrom) + 1).padStart(2, '0')}-${String(getDate(dateFrom)).padStart(2, '0')}T00:00:00.000Z`,
            dateTo: `${getYear(dateTo)}-${String(getMonth(dateTo) + 1).padStart(2, '0')}-${String(getDate(dateTo)).padStart(2, '0')}T23:59:59.000Z`,
        };
    }
    static getDateRangeUtil(period) {
        const now = new Date();
        let start;
        let end;
        switch (period) {
            case PeriodVariants.All:
                start = new Date('2020-01-01');
                end = now;
                break;
            case PeriodVariants.Today:
                start = startOfDay(now);
                end = endOfDay(now);
                break;
            case PeriodVariants.LastWeek: {
                const lastWeek = sub(now, { weeks: 1 });
                start = startOfWeek(lastWeek, { weekStartsOn: 1 });
                end = endOfWeek(lastWeek, { weekStartsOn: 1 });
                break;
            }
            case PeriodVariants.LastMonth: {
                const lastMonth = sub(now, { months: 1 });
                start = startOfMonth(lastMonth);
                end = endOfMonth(lastMonth);
                break;
            }
            case PeriodVariants.LastThreeMonth: {
                const lastMonth = sub(now, { months: 1 });
                const thirdMonth = sub(now, { months: 3 });
                start = startOfMonth(thirdMonth);
                end = endOfMonth(lastMonth);
                break;
            }
            case PeriodVariants.Yesterday: {
                const yesterday = sub(now, { days: 1 });
                start = startOfDay(yesterday);
                end = endOfDay(yesterday);
                break;
            }
            case PeriodVariants.LastSevenDays:
                start = sub(now, { days: 7 });
                end = now;
                break;
            case PeriodVariants.LastThirtyDays:
                start = sub(now, { days: 30 });
                end = now;
                break;
            case PeriodVariants.ThisMonth:
                start = startOfMonth(now);
                end = now;
                break;
            case PeriodVariants.Week:
                start = startOfWeek(now, { weekStartsOn: 1 });
                end = now;
                break;
            case PeriodVariants.LastYear: {
                const lastYear = sub(now, { years: 1 });
                start = startOfYear(lastYear);
                end = endOfYear(lastYear);
                break;
            }
            default:
                throw new Error(`Unknown period: ${period}`);
        }
        return {
            dateFrom: start,
            dateTo: end,
        };
    }
}

class SprPeriodSelectorComponent extends SprBasePeriodSelector {
    constructor() {
        super(...arguments);
        this.selectedRange = null;
        this.selectedRangeChange = new EventEmitter();
        this.dateDeselected = output();
        this.dateSelected = output();
        this.isDeselectAllowed = input(false);
        this.dropdownNotSelectedText = input(DEFAULT_DROPDOWN_NOT_SELECTED_TEXT);
        this.inputPlaceholder = input(DEFAULT_INPUT_NOT_SELECTED_PLAYSHOLDER);
        this.markDisabledFn = input(() => false);
        this.selectOptionList = [];
        this.PeriodVariants = PeriodVariants;
        this.emptyDateRange = { text: 'Select', value: '' };
        this.selectedDateRange = this.emptyDateRange;
        this.customDateRange = { text: 'Custom', value: 'custom' };
    }
    set selectOptions(list) {
        if (list) {
            this.selectOptionList = list.reduce((options, item) => {
                if (item.value) {
                    options.push(item);
                    if (item.value === this.selectedRange) {
                        this.selectedDateRange = item;
                    }
                }
                return options;
            }, []);
        }
    }
    ngOnChanges(changes) {
        if (changes && changes['selectedRange']?.currentValue && this.selectOptionList.length) {
            // to prevent re-writing manually(programmatically) set 'Not selected' from outer component
            if (changes['selectedRange'].currentValue === PeriodVariants.NotSelected) {
                this.deselectDate();
                return;
            }
            const option = this.selectOptionList.find((o) => o.value === this.selectedRange);
            this.selectedDateRange = option || this.customDateRange;
        }
    }
    onDateSelection(date, custom = false) {
        if (custom) {
            this.updateDateRange(this.customDateRange);
            this.dateSelected.emit(date);
        }
        super.onDateSelection(date, custom);
    }
    writeValue(value) {
        if (value && value.dateFrom && value.dateTo) {
            this.updateDateRange(this.emptyDateRange);
        }
        super.writeValue(value);
    }
    deselectDate() {
        this.updateDateRange({ value: PeriodVariants.NotSelected, text: this.dropdownNotSelectedText() });
        this.control.setValue({ dateFrom: null, dateTo: null });
        this.cvaOnChange(null);
        this.onApply(true);
        this.dateDeselected.emit();
    }
    selectOption(option) {
        this.dateSelectedFromSelectOption = true;
        this.updateDateRange(option);
        const parsedDateRange = DateRangeService.getDateRange(option.value);
        if (!parsedDateRange) {
            this.control.patchValue({
                dateFrom: null,
                dateTo: null,
            }, { emitEvent: false });
            this.cvaOnChange(null);
            return;
        }
        this.control.patchValue(parsedDateRange);
    }
    updateDateRange(option) {
        this.selectedDateRange = option;
        this.selectedRangeChange.emit(option.value);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprPeriodSelectorComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: SprPeriodSelectorComponent, isStandalone: true, selector: "spr-period-selector", inputs: { selectOptions: { classPropertyName: "selectOptions", publicName: "selectOptions", isSignal: false, isRequired: false, transformFunction: null }, selectedRange: { classPropertyName: "selectedRange", publicName: "selectedRange", isSignal: false, isRequired: false, transformFunction: null }, isDeselectAllowed: { classPropertyName: "isDeselectAllowed", publicName: "isDeselectAllowed", isSignal: true, isRequired: false, transformFunction: null }, dropdownNotSelectedText: { classPropertyName: "dropdownNotSelectedText", publicName: "dropdownNotSelectedText", isSignal: true, isRequired: false, transformFunction: null }, inputPlaceholder: { classPropertyName: "inputPlaceholder", publicName: "inputPlaceholder", isSignal: true, isRequired: false, transformFunction: null }, markDisabledFn: { classPropertyName: "markDisabledFn", publicName: "markDisabledFn", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { selectedRangeChange: "selectedRangeChange", dateDeselected: "dateDeselected", dateSelected: "dateSelected" }, providers: [{ provide: NgbDatepickerI18n, useClass: DatepickerTranslateService }], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<div\n  [class.is-open]=\"datepicker.isOpen()\"\n  class=\"form-dropdown\">\n  <spr-label\n    [label]=\"label\"\n    [inputId]=\"inputId()\"\n    [tooltip]=\"tooltip\"></spr-label>\n\n  <div class=\"display-hidden position-absolute\">\n    <div class=\"input-group\">\n      <input\n        #datepicker=\"ngbDatepicker\"\n        (dateSelect)=\"onDateSelection($event, true)\"\n        (closed)=\"onClose(datepicker)\"\n        [autoClose]=\"'outside'\"\n        [class.is-invalid]=\"isInvalidControl\"\n        [dayTemplate]=\"t\"\n        [disabled]=\"control.disabled\"\n        [displayMonths]=\"2\"\n        [id]=\"inputId()\"\n        [maxDate]=\"maxDate\"\n        [startDate]=\"control.value.dateFrom || startDate\"\n        [markDisabled]=\"markDisabledFn()\"\n        [footerTemplate]=\"footerTemplate\"\n        class=\"control-form control-form--hidden-input\"\n        container=\"body\"\n        name=\"datepicker\"\n        ngbDatepicker\n        outsideDays=\"hidden\"\n        tabindex=\"-1\" />\n      <ng-template\n        #t\n        let-date\n        let-focused=\"focused\">\n        <span\n          (mouseenter)=\"hoveredDate = date\"\n          (mouseleave)=\"hoveredDate = null\"\n          [class.disabled-date]=\"date | isDisabledDate: maxDate\"\n          [class.faded]=\"(date | isHovered: $any(control.value) : hoveredDate) || (date | isInside: $any(control.value))\"\n          [class.focused]=\"focused\"\n          [class.range]=\"date | isRange: $any(control.value) : hoveredDate\"\n          class=\"btn-light\">\n          {{ date.day }}\n        </span>\n      </ng-template>\n    </div>\n  </div>\n  <div class=\"input-group input-group--with-select\">\n    <div class=\"input-container\">\n      <input\n        (click)=\"datepicker.toggle()\"\n        [sprControlSize]=\"controlSize\"\n        [value]=\"$any(control.value) | getDisplayedDate\"\n        class=\"form-datepicker-control\"\n        [ngClass]=\"{ 'form-datepicker-control--full-rounded': !selectOptionList.length }\"\n        [placeholder]=\"selectedDateRange.value === PeriodVariants.NotSelected ? inputPlaceholder() : ''\"\n        readonly />\n      @if (isDeselectAllowed() && control.value.dateFrom) {\n        <button\n          (click)=\"deselectDate()\"\n          [disabled]=\"control.disabled\"\n          class=\"btn btn-deselect\"\n          type=\"button\">\n          <i\n            class=\"bo-icon-control-cross\"\n            style=\"font-size: 20px\"></i>\n        </button>\n      } @else {\n        <button\n          [disabled]=\"control.disabled\"\n          class=\"btn btn-calendar\"\n          type=\"button\">\n          <i\n            class=\"bo-icon-control-calendar\"\n            style=\"font-size: 16px\"></i>\n        </button>\n      }\n    </div>\n    @if (selectOptionList.length) {\n      <div class=\"input-group-append\">\n        <div\n          #dropdown=\"ngbDropdown\"\n          [class.is-open]=\"dropdown.isOpen()\"\n          class=\"dropdown-block\"\n          ngbDropdown\n          container=\"body\"\n          placement=\"bottom-right\">\n          <button\n            [sprControlSize]=\"controlSize\"\n            [disabled]=\"control.disabled\"\n            [ngbTooltip]=\"selectedDateRange.text\"\n            class=\"form-datepicker-period-control\"\n            ngbDropdownToggle\n            type=\"button\"\n            tooltipClass=\"form-help-text__body\">\n            {{ selectedDateRange.text }}\n            <i\n              class=\"bo-icon-arrows-chevron-down form-datepicker-period-control__icon form-datepicker-period-control__icon--right\"\n              style=\"font-size: 16px\"></i>\n          </button>\n\n          <div ngbDropdownMenu>\n            @for (option of selectOptionList; track option.value) {\n              <button\n                (click)=\"selectOption(option)\"\n                ngbDropdownItem\n                type=\"button\">\n                {{ option.text }}\n              </button>\n            }\n\n            <button\n              (click)=\"datepicker.toggle()\"\n              ngbDropdownItem\n              type=\"button\">\n              {{ 'Custom' }}\n            </button>\n\n            @if (isDeselectAllowed()) {\n              <button\n                (click)=\"deselectDate()\"\n                ngbDropdownItem\n                type=\"button\">\n                {{ dropdownNotSelectedText() }}\n              </button>\n            }\n          </div>\n        </div>\n      </div>\n    }\n  </div>\n\n  <ng-template #footerTemplate>\n    @if (fullFooterSettings.showFooter) {\n      @if (fullFooterSettings.templateRef) {\n        <ng-container [ngTemplateOutlet]=\"fullFooterSettings.templateRef\"></ng-container>\n      } @else {\n        <div\n          [class.left-footer-position]=\"fullFooterSettings.position === 'left'\"\n          class=\"default-period-selector-footer-actions\">\n          <spr-button\n            variant=\"outline\"\n            size=\"sm\"\n            (click)=\"onClose(datepicker, true)\"\n            >{{ fullFooterSettings.cancelButtonText }}</spr-button\n          >\n\n          <spr-button\n            size=\"sm\"\n            (click)=\"onApply(); onClose(datepicker, true)\"\n            >{{ fullFooterSettings.applyButtonText }}</spr-button\n          >\n        </div>\n      }\n    }\n  </ng-template>\n</div>\n\n@if (description || isInvalidControl) {\n  <div class=\"form-field-description\">\n    @if (description && !isInvalidControl) {\n      <spr-field-description>\n        {{ description }}\n      </spr-field-description>\n    }\n\n    @if (isInvalidControl) {\n      <spr-error>\n        {{ ngControl?.control?.errors | getControlErrorMessage: errorMessagesConfig }}\n      </spr-error>\n    }\n  </div>\n}\n", styles: [":host{display:block}.input-group--with-select .form-control-datepicker,.input-group--with-select .form-datepicker-control{border-radius:var(--spr-border-radius-m) 0 0 var(--spr-border-radius-m)!important}.input-group--with-select .form-control-datepicker--full-rounded,.input-group--with-select .form-datepicker-control--full-rounded{border-radius:var(--spr-border-radius-m)!important}.input-group--with-select .input-container{flex:auto}.input-group--with-select .btn{border-radius:0 var(--spr-border-radius-m) var(--spr-border-radius-m) 0!important}.dropdown-toggle{border-top-left-radius:0;border-bottom-left-radius:0}.dropdown-toggle:after{display:none}.dropdown-block.is-open .dropdown-toggle{pointer-events:none;opacity:.4}.default-period-selector-footer-actions{display:flex;justify-content:flex-end;align-items:center;gap:12px;padding:8px}.default-period-selector-footer-actions.left-footer-position{justify-content:flex-start}.display-hidden{visibility:hidden}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1$2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: NgbInputDatepicker, selector: "input[ngbDatepicker]", inputs: ["autoClose", "contentTemplate", "datepickerClass", "dayTemplate", "dayTemplateData", "displayMonths", "firstDayOfWeek", "footerTemplate", "markDisabled", "minDate", "maxDate", "navigation", "outsideDays", "placement", "popperOptions", "restoreFocus", "showWeekNumbers", "startDate", "container", "positionTarget", "weekdays", "disabled"], outputs: ["dateSelect", "navigate", "closed"], exportAs: ["ngbDatepicker"] }, { kind: "directive", type: NgbDropdown, selector: "[ngbDropdown]", inputs: ["autoClose", "dropdownClass", "open", "placement", "popperOptions", "container", "display"], outputs: ["openChange"], exportAs: ["ngbDropdown"] }, { kind: "directive", type: NgbDropdownToggle, selector: "[ngbDropdownToggle]" }, { kind: "directive", type: NgbDropdownMenu, selector: "[ngbDropdownMenu]" }, { kind: "directive", type: NgbDropdownItem, selector: "[ngbDropdownItem]", inputs: ["tabindex", "disabled"] }, { kind: "directive", type: NgbTooltip, selector: "[ngbTooltip]", inputs: ["animation", "autoClose", "placement", "popperOptions", "triggers", "positionTarget", "container", "disableTooltip", "tooltipClass", "tooltipContext", "openDelay", "closeDelay", "ngbTooltip"], outputs: ["shown", "hidden"], exportAs: ["ngbTooltip"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "pipe", type: GetControlErrorMessagePipe, name: "getControlErrorMessage" }, { kind: "pipe", type: IsRangePipe, name: "isRange" }, { kind: "pipe", type: IsHoveredPipe, name: "isHovered" }, { kind: "pipe", type: IsInsidePipe, name: "isInside" }, { kind: "pipe", type: IsDisabledDatePipe, name: "isDisabledDate" }, { kind: "pipe", type: GetDisplayedDatePipe, name: "getDisplayedDate" }, { kind: "directive", type: SprControlSizeDirective, selector: "[sprControlSize]", inputs: ["sprControlSize"] }, { kind: "component", type: SprFieldDescriptionComponent, selector: "spr-field-description" }, { kind: "component", type: SprErrorComponent, selector: "spr-error" }, { kind: "component", type: SprButtonComponent, selector: "spr-button", inputs: ["variant", "type", "size", "isBtnSpinner", "isRadius", "disabled", "isIcon", "buttonId"] }, { kind: "component", type: SprLabelComponent, selector: "spr-label", inputs: ["label", "inputId", "tooltip", "leftIcon", "rightIcon", "className", "isLabelReverse", "shouldStopLabelClickEventPropagation", "isInline"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprPeriodSelectorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-period-selector', imports: [
                        CommonModule,
                        NgbInputDatepicker,
                        NgbDropdown,
                        NgbDropdownToggle,
                        NgbDropdownMenu,
                        NgbDropdownItem,
                        NgbTooltip,
                        ReactiveFormsModule,
                        GetControlErrorMessagePipe,
                        IsRangePipe,
                        IsHoveredPipe,
                        IsInsidePipe,
                        IsDisabledDatePipe,
                        GetDisplayedDatePipe,
                        SprControlSizeDirective,
                        SprFieldDescriptionComponent,
                        SprErrorComponent,
                        SprButtonComponent,
                        SprLabelComponent,
                    ], providers: [{ provide: NgbDatepickerI18n, useClass: DatepickerTranslateService }], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  [class.is-open]=\"datepicker.isOpen()\"\n  class=\"form-dropdown\">\n  <spr-label\n    [label]=\"label\"\n    [inputId]=\"inputId()\"\n    [tooltip]=\"tooltip\"></spr-label>\n\n  <div class=\"display-hidden position-absolute\">\n    <div class=\"input-group\">\n      <input\n        #datepicker=\"ngbDatepicker\"\n        (dateSelect)=\"onDateSelection($event, true)\"\n        (closed)=\"onClose(datepicker)\"\n        [autoClose]=\"'outside'\"\n        [class.is-invalid]=\"isInvalidControl\"\n        [dayTemplate]=\"t\"\n        [disabled]=\"control.disabled\"\n        [displayMonths]=\"2\"\n        [id]=\"inputId()\"\n        [maxDate]=\"maxDate\"\n        [startDate]=\"control.value.dateFrom || startDate\"\n        [markDisabled]=\"markDisabledFn()\"\n        [footerTemplate]=\"footerTemplate\"\n        class=\"control-form control-form--hidden-input\"\n        container=\"body\"\n        name=\"datepicker\"\n        ngbDatepicker\n        outsideDays=\"hidden\"\n        tabindex=\"-1\" />\n      <ng-template\n        #t\n        let-date\n        let-focused=\"focused\">\n        <span\n          (mouseenter)=\"hoveredDate = date\"\n          (mouseleave)=\"hoveredDate = null\"\n          [class.disabled-date]=\"date | isDisabledDate: maxDate\"\n          [class.faded]=\"(date | isHovered: $any(control.value) : hoveredDate) || (date | isInside: $any(control.value))\"\n          [class.focused]=\"focused\"\n          [class.range]=\"date | isRange: $any(control.value) : hoveredDate\"\n          class=\"btn-light\">\n          {{ date.day }}\n        </span>\n      </ng-template>\n    </div>\n  </div>\n  <div class=\"input-group input-group--with-select\">\n    <div class=\"input-container\">\n      <input\n        (click)=\"datepicker.toggle()\"\n        [sprControlSize]=\"controlSize\"\n        [value]=\"$any(control.value) | getDisplayedDate\"\n        class=\"form-datepicker-control\"\n        [ngClass]=\"{ 'form-datepicker-control--full-rounded': !selectOptionList.length }\"\n        [placeholder]=\"selectedDateRange.value === PeriodVariants.NotSelected ? inputPlaceholder() : ''\"\n        readonly />\n      @if (isDeselectAllowed() && control.value.dateFrom) {\n        <button\n          (click)=\"deselectDate()\"\n          [disabled]=\"control.disabled\"\n          class=\"btn btn-deselect\"\n          type=\"button\">\n          <i\n            class=\"bo-icon-control-cross\"\n            style=\"font-size: 20px\"></i>\n        </button>\n      } @else {\n        <button\n          [disabled]=\"control.disabled\"\n          class=\"btn btn-calendar\"\n          type=\"button\">\n          <i\n            class=\"bo-icon-control-calendar\"\n            style=\"font-size: 16px\"></i>\n        </button>\n      }\n    </div>\n    @if (selectOptionList.length) {\n      <div class=\"input-group-append\">\n        <div\n          #dropdown=\"ngbDropdown\"\n          [class.is-open]=\"dropdown.isOpen()\"\n          class=\"dropdown-block\"\n          ngbDropdown\n          container=\"body\"\n          placement=\"bottom-right\">\n          <button\n            [sprControlSize]=\"controlSize\"\n            [disabled]=\"control.disabled\"\n            [ngbTooltip]=\"selectedDateRange.text\"\n            class=\"form-datepicker-period-control\"\n            ngbDropdownToggle\n            type=\"button\"\n            tooltipClass=\"form-help-text__body\">\n            {{ selectedDateRange.text }}\n            <i\n              class=\"bo-icon-arrows-chevron-down form-datepicker-period-control__icon form-datepicker-period-control__icon--right\"\n              style=\"font-size: 16px\"></i>\n          </button>\n\n          <div ngbDropdownMenu>\n            @for (option of selectOptionList; track option.value) {\n              <button\n                (click)=\"selectOption(option)\"\n                ngbDropdownItem\n                type=\"button\">\n                {{ option.text }}\n              </button>\n            }\n\n            <button\n              (click)=\"datepicker.toggle()\"\n              ngbDropdownItem\n              type=\"button\">\n              {{ 'Custom' }}\n            </button>\n\n            @if (isDeselectAllowed()) {\n              <button\n                (click)=\"deselectDate()\"\n                ngbDropdownItem\n                type=\"button\">\n                {{ dropdownNotSelectedText() }}\n              </button>\n            }\n          </div>\n        </div>\n      </div>\n    }\n  </div>\n\n  <ng-template #footerTemplate>\n    @if (fullFooterSettings.showFooter) {\n      @if (fullFooterSettings.templateRef) {\n        <ng-container [ngTemplateOutlet]=\"fullFooterSettings.templateRef\"></ng-container>\n      } @else {\n        <div\n          [class.left-footer-position]=\"fullFooterSettings.position === 'left'\"\n          class=\"default-period-selector-footer-actions\">\n          <spr-button\n            variant=\"outline\"\n            size=\"sm\"\n            (click)=\"onClose(datepicker, true)\"\n            >{{ fullFooterSettings.cancelButtonText }}</spr-button\n          >\n\n          <spr-button\n            size=\"sm\"\n            (click)=\"onApply(); onClose(datepicker, true)\"\n            >{{ fullFooterSettings.applyButtonText }}</spr-button\n          >\n        </div>\n      }\n    }\n  </ng-template>\n</div>\n\n@if (description || isInvalidControl) {\n  <div class=\"form-field-description\">\n    @if (description && !isInvalidControl) {\n      <spr-field-description>\n        {{ description }}\n      </spr-field-description>\n    }\n\n    @if (isInvalidControl) {\n      <spr-error>\n        {{ ngControl?.control?.errors | getControlErrorMessage: errorMessagesConfig }}\n      </spr-error>\n    }\n  </div>\n}\n", styles: [":host{display:block}.input-group--with-select .form-control-datepicker,.input-group--with-select .form-datepicker-control{border-radius:var(--spr-border-radius-m) 0 0 var(--spr-border-radius-m)!important}.input-group--with-select .form-control-datepicker--full-rounded,.input-group--with-select .form-datepicker-control--full-rounded{border-radius:var(--spr-border-radius-m)!important}.input-group--with-select .input-container{flex:auto}.input-group--with-select .btn{border-radius:0 var(--spr-border-radius-m) var(--spr-border-radius-m) 0!important}.dropdown-toggle{border-top-left-radius:0;border-bottom-left-radius:0}.dropdown-toggle:after{display:none}.dropdown-block.is-open .dropdown-toggle{pointer-events:none;opacity:.4}.default-period-selector-footer-actions{display:flex;justify-content:flex-end;align-items:center;gap:12px;padding:8px}.default-period-selector-footer-actions.left-footer-position{justify-content:flex-start}.display-hidden{visibility:hidden}\n"] }]
        }], propDecorators: { selectOptions: [{
                type: Input
            }], selectedRange: [{
                type: Input
            }], selectedRangeChange: [{
                type: Output
            }] } });

class SprRadioButtonComponent extends BaseControl {
    constructor() {
        super(...arguments);
        this.isDecorated = false;
        this.isBottomMargin = true;
        this.isLabelReverse = false;
        this.isInline = false;
    }
    ngOnInit() {
        super.ngOnInit();
        this.ngControl?.control?.valueChanges
            .pipe(filter((v) => v !== this.value), takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
            this.control.setValue(null, { emitEvent: false });
        });
    }
    initControl() {
        return this.formBuilder.nonNullable.control(null);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprRadioButtonComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: SprRadioButtonComponent, isStandalone: true, selector: "spr-radio-button", inputs: { value: "value", isDecorated: "isDecorated", isBottomMargin: "isBottomMargin", isLabelReverse: "isLabelReverse", isInline: "isInline", leftIcon: "leftIcon", rightIcon: "rightIcon" }, usesInheritance: true, ngImport: i0, template: "<div\n  class=\"radio-button-control\"\n  [class.radio-button-control--decorated]=\"isDecorated\"\n  [class.radio-button-control--bottom-margin]=\"isBottomMargin\">\n  <div class=\"radio-check-holder\">\n    <input\n      (blur)=\"cvaOnTouched()\"\n      [formControl]=\"control\"\n      [id]=\"inputId()\"\n      [name]=\"inputId() ?? ''\"\n      [value]=\"value\"\n      class=\"custom-radio-button\"\n      type=\"radio\"\n      [sprLabel]=\"label\"\n      [sprLabelPosition]=\"isLabelReverse ? 'start' : 'end'\"\n      [sprLabelLeftIcon]=\"leftIcon\"\n      [sprLabelRightIcon]=\"rightIcon\"\n      [sprLabelIsInline]=\"isInline\"\n      [inputId]=\"inputId()\"\n      [tooltip]=\"tooltip\"\n      sprLabelClass=\"radio-check-holder__label\" />\n\n    <ng-content></ng-content>\n  </div>\n  <ng-template #alternative>\n    <ng-content select=\"[alternative]\"></ng-content>\n  </ng-template>\n</div>\n", styles: [":host{display:block;line-height:1}:host:not(:has(.label--inline)) .checkbox-control__label{flex:1}:host ::ng-deep .label-container{cursor:pointer}:host :has(.custom-radio-button:disabled) ::ng-deep .label-container{cursor:default;pointer-events:none}.radio-button-control{--spr-radio-button-control-decorated-background: var(--brd-fill-default-200);--spr-radio-button-control-decorated-border-color: var(--brd-border-default-300);background:var(--spr-radio-button-control-background, transparent);border:1px solid var(--spr-radio-button-control-border-color, transparent)}.radio-button-control--bottom-margin{margin-bottom:4px}.radio-button-control--decorated{--spr-radio-button-control-background: var(--spr-radio-button-control-decorated-background);--spr-radio-button-control-border-color: var(--spr-radio-button-control-decorated-border-color);padding:11px;border-radius:var(--spr-border-radius-m)}.custom-radio-button{--spr-radio-border-color: var(--brd-border-default-500);--spr-radio-border-color-hover: var(--brd-fill-accent-hover-base);--spr-radio-border-color-active: var(--brd-fill-accent-pressed-light);--spr-radio-border-color-checked: var(--brd-fill-accent-default-light);--spr-radio-border-color-checked-hover: var(--brd-fill-accent-hover-base);--spr-radio-border-color-disabled: var(--brd-fill-accent-disabled);--spr-radio-background-color: var(--brd-fill-default-0);--spr-radio-background-color-disabled: var(--brd-fill-disabled-200);--spr-radio-box-shadow-focus: 0 0 0 4px var(--brd-fill-accent-focus);width:20px;height:20px;border-radius:var(--spr-border-radius-pill);box-shadow:var(--spr-radio-box-shadow, none);position:relative;cursor:pointer;appearance:none;grid-area:radio-button}.custom-radio-button:after{position:absolute;inset:0;border:1px solid var(--spr-radio-border-color);background:var(--spr-radio-background-color);content:\"\";border-radius:var(--spr-border-radius-pill);transition:border .1s ease}.custom-radio-button:before{position:absolute;content:\"\";width:10px;height:10px;left:50%;top:50%;transform:translate(-50%,-50%);border-radius:var(--spr-border-radius-pill);background:var(--brd-fill-hover-100);z-index:2;display:none}.custom-radio-button:hover:not(:checked,:disabled):after{--spr-radio-border-color: var(--spr-radio-border-color-hover)}.custom-radio-button:hover:not(:checked,:disabled):before{display:block}.custom-radio-button:active:not(:checked,:disabled):after{border:5px solid var(--spr-radio-border-color-active)}.custom-radio-button:focus-visible{--spr-radio-box-shadow: var(--spr-radio-box-shadow-focus);outline:none}.custom-radio-button:checked:after{border:5px solid var(--spr-radio-border-color-checked)}.custom-radio-button:checked:hover:after{border:5px solid var(--spr-radio-border-color-checked-hover)}.custom-radio-button:disabled{cursor:default}.custom-radio-button:disabled:not(:checked):after{--spr-radio-background-color: var(--spr-radio-background-color-disabled)}.custom-radio-button:disabled:checked:after{border:5px solid var(--spr-radio-border-color-disabled)}.radio-check-holder{display:flex;align-items:center;width:100%}.radio-check-holder:has(.radio-check-holder__label){gap:8px}.radio-check-holder:has(.radio-check-holder__label):not(:has(.label--inline)) .radio-check-holder__label{flex:1}.radio-check-holder:has(.label-container:hover) .custom-radio-button:not(:checked,:disabled):after{--spr-radio-border-color: var(--spr-radio-border-color-hover)}.radio-check-holder:has(.label-container:hover) .custom-radio-button:not(:checked,:disabled):before{display:block}.radio-check-holder:has(.label-container:active) .custom-radio-button:not(:checked,:disabled):after{border:5px solid var(--spr-radio-border-color-active)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.RadioControlValueAccessor, selector: "input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]", inputs: ["name", "formControlName", "value"] }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: SprLabelDirective, selector: "[sprLabel]", inputs: ["shouldStopLabelClickEventPropagation", "sprLabel", "sprLabelPosition", "sprLabelClass", "sprLabelIsInline", "sprLabelLeftIcon", "sprLabelRightIcon", "tooltip", "inputId"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprRadioButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-radio-button', imports: [CommonModule, ReactiveFormsModule, SprLabelDirective], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"radio-button-control\"\n  [class.radio-button-control--decorated]=\"isDecorated\"\n  [class.radio-button-control--bottom-margin]=\"isBottomMargin\">\n  <div class=\"radio-check-holder\">\n    <input\n      (blur)=\"cvaOnTouched()\"\n      [formControl]=\"control\"\n      [id]=\"inputId()\"\n      [name]=\"inputId() ?? ''\"\n      [value]=\"value\"\n      class=\"custom-radio-button\"\n      type=\"radio\"\n      [sprLabel]=\"label\"\n      [sprLabelPosition]=\"isLabelReverse ? 'start' : 'end'\"\n      [sprLabelLeftIcon]=\"leftIcon\"\n      [sprLabelRightIcon]=\"rightIcon\"\n      [sprLabelIsInline]=\"isInline\"\n      [inputId]=\"inputId()\"\n      [tooltip]=\"tooltip\"\n      sprLabelClass=\"radio-check-holder__label\" />\n\n    <ng-content></ng-content>\n  </div>\n  <ng-template #alternative>\n    <ng-content select=\"[alternative]\"></ng-content>\n  </ng-template>\n</div>\n", styles: [":host{display:block;line-height:1}:host:not(:has(.label--inline)) .checkbox-control__label{flex:1}:host ::ng-deep .label-container{cursor:pointer}:host :has(.custom-radio-button:disabled) ::ng-deep .label-container{cursor:default;pointer-events:none}.radio-button-control{--spr-radio-button-control-decorated-background: var(--brd-fill-default-200);--spr-radio-button-control-decorated-border-color: var(--brd-border-default-300);background:var(--spr-radio-button-control-background, transparent);border:1px solid var(--spr-radio-button-control-border-color, transparent)}.radio-button-control--bottom-margin{margin-bottom:4px}.radio-button-control--decorated{--spr-radio-button-control-background: var(--spr-radio-button-control-decorated-background);--spr-radio-button-control-border-color: var(--spr-radio-button-control-decorated-border-color);padding:11px;border-radius:var(--spr-border-radius-m)}.custom-radio-button{--spr-radio-border-color: var(--brd-border-default-500);--spr-radio-border-color-hover: var(--brd-fill-accent-hover-base);--spr-radio-border-color-active: var(--brd-fill-accent-pressed-light);--spr-radio-border-color-checked: var(--brd-fill-accent-default-light);--spr-radio-border-color-checked-hover: var(--brd-fill-accent-hover-base);--spr-radio-border-color-disabled: var(--brd-fill-accent-disabled);--spr-radio-background-color: var(--brd-fill-default-0);--spr-radio-background-color-disabled: var(--brd-fill-disabled-200);--spr-radio-box-shadow-focus: 0 0 0 4px var(--brd-fill-accent-focus);width:20px;height:20px;border-radius:var(--spr-border-radius-pill);box-shadow:var(--spr-radio-box-shadow, none);position:relative;cursor:pointer;appearance:none;grid-area:radio-button}.custom-radio-button:after{position:absolute;inset:0;border:1px solid var(--spr-radio-border-color);background:var(--spr-radio-background-color);content:\"\";border-radius:var(--spr-border-radius-pill);transition:border .1s ease}.custom-radio-button:before{position:absolute;content:\"\";width:10px;height:10px;left:50%;top:50%;transform:translate(-50%,-50%);border-radius:var(--spr-border-radius-pill);background:var(--brd-fill-hover-100);z-index:2;display:none}.custom-radio-button:hover:not(:checked,:disabled):after{--spr-radio-border-color: var(--spr-radio-border-color-hover)}.custom-radio-button:hover:not(:checked,:disabled):before{display:block}.custom-radio-button:active:not(:checked,:disabled):after{border:5px solid var(--spr-radio-border-color-active)}.custom-radio-button:focus-visible{--spr-radio-box-shadow: var(--spr-radio-box-shadow-focus);outline:none}.custom-radio-button:checked:after{border:5px solid var(--spr-radio-border-color-checked)}.custom-radio-button:checked:hover:after{border:5px solid var(--spr-radio-border-color-checked-hover)}.custom-radio-button:disabled{cursor:default}.custom-radio-button:disabled:not(:checked):after{--spr-radio-background-color: var(--spr-radio-background-color-disabled)}.custom-radio-button:disabled:checked:after{border:5px solid var(--spr-radio-border-color-disabled)}.radio-check-holder{display:flex;align-items:center;width:100%}.radio-check-holder:has(.radio-check-holder__label){gap:8px}.radio-check-holder:has(.radio-check-holder__label):not(:has(.label--inline)) .radio-check-holder__label{flex:1}.radio-check-holder:has(.label-container:hover) .custom-radio-button:not(:checked,:disabled):after{--spr-radio-border-color: var(--spr-radio-border-color-hover)}.radio-check-holder:has(.label-container:hover) .custom-radio-button:not(:checked,:disabled):before{display:block}.radio-check-holder:has(.label-container:active) .custom-radio-button:not(:checked,:disabled):after{border:5px solid var(--spr-radio-border-color-active)}\n"] }]
        }], propDecorators: { value: [{
                type: Input
            }], isDecorated: [{
                type: Input
            }], isBottomMargin: [{
                type: Input
            }], isLabelReverse: [{
                type: Input
            }], isInline: [{
                type: Input
            }], leftIcon: [{
                type: Input
            }], rightIcon: [{
                type: Input
            }] } });

class SprReadonlyControlComponent {
    constructor() {
        this.controlSize = 'md';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprReadonlyControlComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: SprReadonlyControlComponent, isStandalone: true, selector: "spr-readonly-control", inputs: { controlSize: "controlSize" }, ngImport: i0, template: "<div\n  class=\"readonly-field\"\n  [sprControlSize]=\"controlSize\">\n  <div class=\"readonly-field__inner\">\n    <div class=\"readonly-field__text\">\n      <ng-content></ng-content>\n    </div>\n  </div>\n\n  <div class=\"readonly-field__icon\">\n    <ng-content select=\"[icon]\"></ng-content>\n  </div>\n</div>\n", styles: [":host{display:block}.readonly-field{display:flex;align-items:center;border:var(--spr-control-border-width) solid var(--brd-border-default-400);border-radius:var(--spr-border-radius-m);background:var(--brd-fill-disabled-250);color:var(--brd-text-default-800)}.readonly-field.control-form--middle .readonly-field__inner{padding:var(--spr-control-padding-y-md) var(--spr-control-padding-x-md);font-size:var(--spr-control-font-size-md)}.readonly-field.control-form--middle .readonly-field__icon{padding-right:var(--spr-control-padding-x-md)}.readonly-field.control-form--large .readonly-field__inner{padding:var(--spr-control-padding-y-lg) var(--spr-control-padding-x-lg);font-size:var(--spr-control-font-size-lg)}.readonly-field.control-form--large .readonly-field__icon{padding-right:var(--spr-control-padding-x-lg)}.readonly-field__inner{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex-grow:1;min-width:0}.readonly-field__text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-height:var(--spr-control-line-height);line-height:var(--spr-control-line-height)}.readonly-field__icon{flex-shrink:0}\n"], dependencies: [{ kind: "directive", type: SprControlSizeDirective, selector: "[sprControlSize]", inputs: ["sprControlSize"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprReadonlyControlComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-readonly-control', imports: [SprControlSizeDirective], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"readonly-field\"\n  [sprControlSize]=\"controlSize\">\n  <div class=\"readonly-field__inner\">\n    <div class=\"readonly-field__text\">\n      <ng-content></ng-content>\n    </div>\n  </div>\n\n  <div class=\"readonly-field__icon\">\n    <ng-content select=\"[icon]\"></ng-content>\n  </div>\n</div>\n", styles: [":host{display:block}.readonly-field{display:flex;align-items:center;border:var(--spr-control-border-width) solid var(--brd-border-default-400);border-radius:var(--spr-border-radius-m);background:var(--brd-fill-disabled-250);color:var(--brd-text-default-800)}.readonly-field.control-form--middle .readonly-field__inner{padding:var(--spr-control-padding-y-md) var(--spr-control-padding-x-md);font-size:var(--spr-control-font-size-md)}.readonly-field.control-form--middle .readonly-field__icon{padding-right:var(--spr-control-padding-x-md)}.readonly-field.control-form--large .readonly-field__inner{padding:var(--spr-control-padding-y-lg) var(--spr-control-padding-x-lg);font-size:var(--spr-control-font-size-lg)}.readonly-field.control-form--large .readonly-field__icon{padding-right:var(--spr-control-padding-x-lg)}.readonly-field__inner{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex-grow:1;min-width:0}.readonly-field__text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-height:var(--spr-control-line-height);line-height:var(--spr-control-line-height)}.readonly-field__icon{flex-shrink:0}\n"] }]
        }], propDecorators: { controlSize: [{
                type: Input
            }] } });

class SprSidebarItemComponent {
    toggleSubMenu(sidebarNavItem) {
        if (!sidebarNavItem.subNavs) {
            return;
        }
        this.item.activeSub = !this.item.activeSub;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprSidebarItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: SprSidebarItemComponent, isStandalone: true, selector: "spr-sidebar-item", inputs: { item: "item" }, ngImport: i0, template: "<a\n  [routerLink]=\"item.routerLink\"\n  [class.active-sub]=\"item.activeSub\"\n  class=\"sidebar__link\"\n  routerLinkActive=\"active\"\n  (click)=\"toggleSubMenu(item)\">\n  <i\n    *ngIf=\"item?.iconName\"\n    class=\"sidebar__item--icon\"\n    [ngClass]=\"[item.iconName]\"></i>\n  <span>{{ item.label }}</span>\n  <i\n    *ngIf=\"!!item.subNavs?.length\"\n    class=\"sidebar__item--icon btn-icon bo-icon-arrows-chevron-down\"></i>\n</a>\n<ul\n  *ngIf=\"!!item.subNavs?.length\"\n  [class.active-sub]=\"item.activeSub\"\n  class=\"sidebar__sub-nav\">\n  <li *ngFor=\"let subNav of item.subNavs\">\n    <spr-sidebar-item [item]=\"subNav\"></spr-sidebar-item>\n  </li>\n</ul>\n", styles: [".text-body-xxxl{font-size:var(--spr-font-size-32);line-height:var(--spr-line-height-40)}.text-body-xxl{font-size:var(--spr-font-size-24);line-height:var(--spr-line-height-32)}.text-body-xl{font-size:var(--spr-font-size-20);line-height:var(--spr-line-height-24)}.text-body-l{font-size:var(--spr-font-size-16);line-height:var(--spr-line-height-20)}.text-body-m{font-size:var(--spr-font-size-15);line-height:var(--spr-line-height-20)}.text-body-s{font-size:var(--spr-font-size-14);line-height:var(--spr-line-height-20)}.text-body-xs{font-size:var(--spr-font-size-12);line-height:var(--spr-line-height-16)}.text-body-xs-uppercase{font-size:var(--spr-font-size-13);line-height:var(--spr-line-height-20);text-transform:uppercase}.btn-icon{position:relative;margin-left:auto}.sidebar__item--icon{color:var(--brd-icon-default-500);font-size:var(--spr-font-size-20)}.sidebar__link{font-size:var(--spr-font-size-15);line-height:var(--spr-line-height-20);font-weight:var(--spr-font-weight-medium);position:relative;display:flex;align-items:center;gap:12px;width:100%;padding:12px 8px 12px 16px;border-radius:var(--spr-border-radius-l);color:var(--brd-text-secondary-600);text-decoration:none;letter-spacing:.15px;transition:background var(--spr-transition-time) easy,color var(--spr-transition-time) easy}.sidebar__link:hover{background:var(--brd-fill-hover-200);color:var(--brd-text-hover-800);transition:color var(--spr-transition-time) ease,background var(--spr-transition-time) ease}.sidebar__link:hover .sidebar__item--icon{color:var(--brd-icon-default-700)}.sidebar__link:active{background:var(--brd-fill-pressed-300);color:var(--brd-text-hover-800)}.sidebar__link.active,.sidebar__link.active:hover,.sidebar__link.active-sub,.sidebar__link.active-sub:hover{box-shadow:0 2px 10px rgb(var(--brd-black)/.05);background:var(--brd-fill-default-0);color:var(--brd-text-primary-800);transition:color var(--spr-transition-time) ease,background var(--spr-transition-time) ease}.sidebar__link.active .sidebar__item--icon,.sidebar__link.active:hover .sidebar__item--icon,.sidebar__link.active-sub .sidebar__item--icon,.sidebar__link.active-sub:hover .sidebar__item--icon{color:var(--brd-fill-accent-default-base);transition:color var(--spr-transition-time) ease,transform var(--spr-transition-time) ease}.sidebar__link.active-sub .btn-icon{transform:rotate(180deg)}.sidebar__link.active-sub+.sidebar__sub-nav{display:block}.sidebar__sub-nav{display:none;overflow:hidden;margin:0;padding:8px 0 1px 36px;list-style:none}.sidebar__sub-nav .sidebar__item{margin-bottom:2px}.sidebar__sub-nav .sidebar__link{padding:8px 8px 8px 16px}.sidebar__sub-nav .sidebar__link:before{content:\"\";position:absolute;bottom:50%;left:-20px;width:16px;height:44px;border:1px solid var(--brd-border-default-400);border-top:none;border-right:none;border-radius:0 0 0 var(--spr-border-radius-s)}\n"], dependencies: [{ kind: "component", type: SprSidebarItemComponent, selector: "spr-sidebar-item", inputs: ["item"] }, { kind: "directive", type: NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "directive", type: RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprSidebarItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-sidebar-item', changeDetection: ChangeDetectionStrategy.OnPush, imports: [NgForOf, NgIf, RouterLinkActive, RouterLink, NgClass], template: "<a\n  [routerLink]=\"item.routerLink\"\n  [class.active-sub]=\"item.activeSub\"\n  class=\"sidebar__link\"\n  routerLinkActive=\"active\"\n  (click)=\"toggleSubMenu(item)\">\n  <i\n    *ngIf=\"item?.iconName\"\n    class=\"sidebar__item--icon\"\n    [ngClass]=\"[item.iconName]\"></i>\n  <span>{{ item.label }}</span>\n  <i\n    *ngIf=\"!!item.subNavs?.length\"\n    class=\"sidebar__item--icon btn-icon bo-icon-arrows-chevron-down\"></i>\n</a>\n<ul\n  *ngIf=\"!!item.subNavs?.length\"\n  [class.active-sub]=\"item.activeSub\"\n  class=\"sidebar__sub-nav\">\n  <li *ngFor=\"let subNav of item.subNavs\">\n    <spr-sidebar-item [item]=\"subNav\"></spr-sidebar-item>\n  </li>\n</ul>\n", styles: [".text-body-xxxl{font-size:var(--spr-font-size-32);line-height:var(--spr-line-height-40)}.text-body-xxl{font-size:var(--spr-font-size-24);line-height:var(--spr-line-height-32)}.text-body-xl{font-size:var(--spr-font-size-20);line-height:var(--spr-line-height-24)}.text-body-l{font-size:var(--spr-font-size-16);line-height:var(--spr-line-height-20)}.text-body-m{font-size:var(--spr-font-size-15);line-height:var(--spr-line-height-20)}.text-body-s{font-size:var(--spr-font-size-14);line-height:var(--spr-line-height-20)}.text-body-xs{font-size:var(--spr-font-size-12);line-height:var(--spr-line-height-16)}.text-body-xs-uppercase{font-size:var(--spr-font-size-13);line-height:var(--spr-line-height-20);text-transform:uppercase}.btn-icon{position:relative;margin-left:auto}.sidebar__item--icon{color:var(--brd-icon-default-500);font-size:var(--spr-font-size-20)}.sidebar__link{font-size:var(--spr-font-size-15);line-height:var(--spr-line-height-20);font-weight:var(--spr-font-weight-medium);position:relative;display:flex;align-items:center;gap:12px;width:100%;padding:12px 8px 12px 16px;border-radius:var(--spr-border-radius-l);color:var(--brd-text-secondary-600);text-decoration:none;letter-spacing:.15px;transition:background var(--spr-transition-time) easy,color var(--spr-transition-time) easy}.sidebar__link:hover{background:var(--brd-fill-hover-200);color:var(--brd-text-hover-800);transition:color var(--spr-transition-time) ease,background var(--spr-transition-time) ease}.sidebar__link:hover .sidebar__item--icon{color:var(--brd-icon-default-700)}.sidebar__link:active{background:var(--brd-fill-pressed-300);color:var(--brd-text-hover-800)}.sidebar__link.active,.sidebar__link.active:hover,.sidebar__link.active-sub,.sidebar__link.active-sub:hover{box-shadow:0 2px 10px rgb(var(--brd-black)/.05);background:var(--brd-fill-default-0);color:var(--brd-text-primary-800);transition:color var(--spr-transition-time) ease,background var(--spr-transition-time) ease}.sidebar__link.active .sidebar__item--icon,.sidebar__link.active:hover .sidebar__item--icon,.sidebar__link.active-sub .sidebar__item--icon,.sidebar__link.active-sub:hover .sidebar__item--icon{color:var(--brd-fill-accent-default-base);transition:color var(--spr-transition-time) ease,transform var(--spr-transition-time) ease}.sidebar__link.active-sub .btn-icon{transform:rotate(180deg)}.sidebar__link.active-sub+.sidebar__sub-nav{display:block}.sidebar__sub-nav{display:none;overflow:hidden;margin:0;padding:8px 0 1px 36px;list-style:none}.sidebar__sub-nav .sidebar__item{margin-bottom:2px}.sidebar__sub-nav .sidebar__link{padding:8px 8px 8px 16px}.sidebar__sub-nav .sidebar__link:before{content:\"\";position:absolute;bottom:50%;left:-20px;width:16px;height:44px;border:1px solid var(--brd-border-default-400);border-top:none;border-right:none;border-radius:0 0 0 var(--spr-border-radius-s)}\n"] }]
        }], propDecorators: { item: [{
                type: Input,
                args: [{ required: true }]
            }] } });

class SprSidebarComponent {
    constructor(route) {
        this.route = route;
        this.items = [];
    }
    ngOnInit() {
        this.checkIfSubNavItemIsOpened();
    }
    closeOtherSubMenus(currentItem) {
        this.items = this.items?.map((item) => {
            if (item !== currentItem && item.subNavs && item.subNavs.length) {
                return {
                    ...item,
                    activeSub: false,
                };
            }
            return item;
        });
    }
    checkIfSubNavItemIsOpened() {
        this.items = this.items?.map((item) => {
            if (item.subNavs && item.subNavs.length) {
                return {
                    ...item,
                    activeSub: this.route.url.includes(item.routerLink),
                };
            }
            return item;
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprSidebarComponent, deps: [{ token: i1$3.Router }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: SprSidebarComponent, isStandalone: true, selector: "spr-sidebar", inputs: { title: "title", items: "items" }, ngImport: i0, template: "<aside class=\"sidebar\">\n  <div class=\"sidebar__container\">\n    <h2 class=\"sidebar__title\">{{ title }}</h2>\n    <ul class=\"sidebar__nav\">\n      <li\n        class=\"sidebar__list-item\"\n        *ngFor=\"let item of items\">\n        <spr-sidebar-item\n          class=\"sidebar__item\"\n          [item]=\"item\"\n          (click)=\"closeOtherSubMenus(item)\"></spr-sidebar-item>\n      </li>\n    </ul>\n  </div>\n</aside>\n", styles: [".text-heading-xl{font-size:var(--spr-font-size-32);line-height:var(--spr-line-height-40);font-weight:var(--spr-font-weight-semi-bold)}.text-heading-l{font-size:var(--spr-font-size-28);line-height:var(--spr-line-height-36);font-weight:var(--spr-font-weight-semi-bold)}.text-heading-m{font-size:var(--spr-font-size-24);line-height:var(--spr-line-height-32);font-weight:var(--spr-font-weight-semi-bold)}.text-heading-s{font-size:var(--spr-font-size-20);line-height:var(--spr-line-height-24);font-weight:var(--spr-font-weight-semi-bold)}.text-heading-xs{font-size:var(--spr-font-size-16);line-height:var(--spr-line-height-24);font-weight:var(--spr-font-weight-semi-bold)}.text-heading-xxs{font-size:var(--spr-font-size-13);line-height:var(--spr-line-height-16);font-weight:var(--spr-font-weight-semi-bold);text-transform:uppercase}.text-heading-xxxs{font-size:var(--spr-font-size-12);line-height:var(--spr-line-height-16);font-weight:var(--spr-font-weight-semi-bold);text-transform:uppercase}:host{-webkit-overflow-scrolling:touch!important;scrollbar-width:thin!important;scrollbar-color:rgb(var(--spr-grey-250)) transparent!important;scrollbar-gutter:unset;grid-column:sidebar;display:block;overflow:hidden auto;width:var(--spr-sidebar-width);height:100%;padding:0 8px 8px;background:var(--brd-fill-default-50)}:host::-webkit-scrollbar{width:18px!important;background-color:transparent!important;border-radius:var(--spr-border-radius-l)!important}:host::-webkit-scrollbar-thumb{border:6px solid rgb(var(--brd-white))!important;background-color:rgb(var(--spr-grey-130))!important;border-radius:var(--spr-border-radius-l)!important}:host:hover{scrollbar-color:rgba(26,26,30,.7) transparent!important}:host:hover::-webkit-scrollbar-thumb{background-color:rgb(var(--spr-grey-250))!important}.sidebar{display:block;width:100%}.sidebar__container{min-height:100%}.sidebar__title{font-size:var(--spr-font-size-13);line-height:var(--spr-line-height-16);font-weight:var(--spr-font-weight-semi-bold);text-transform:uppercase;margin:0;padding:16px;color:var(--brd-text-secondary-500);letter-spacing:1.04px}.sidebar__nav{margin:0;padding:0;list-style:none}.sidebar__item{cursor:pointer}\n"], dependencies: [{ kind: "directive", type: NgFor, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "ngmodule", type: RouterModule }, { kind: "component", type: SprSidebarItemComponent, selector: "spr-sidebar-item", inputs: ["item"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprSidebarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-sidebar', imports: [NgFor, RouterModule, SprSidebarItemComponent], template: "<aside class=\"sidebar\">\n  <div class=\"sidebar__container\">\n    <h2 class=\"sidebar__title\">{{ title }}</h2>\n    <ul class=\"sidebar__nav\">\n      <li\n        class=\"sidebar__list-item\"\n        *ngFor=\"let item of items\">\n        <spr-sidebar-item\n          class=\"sidebar__item\"\n          [item]=\"item\"\n          (click)=\"closeOtherSubMenus(item)\"></spr-sidebar-item>\n      </li>\n    </ul>\n  </div>\n</aside>\n", styles: [".text-heading-xl{font-size:var(--spr-font-size-32);line-height:var(--spr-line-height-40);font-weight:var(--spr-font-weight-semi-bold)}.text-heading-l{font-size:var(--spr-font-size-28);line-height:var(--spr-line-height-36);font-weight:var(--spr-font-weight-semi-bold)}.text-heading-m{font-size:var(--spr-font-size-24);line-height:var(--spr-line-height-32);font-weight:var(--spr-font-weight-semi-bold)}.text-heading-s{font-size:var(--spr-font-size-20);line-height:var(--spr-line-height-24);font-weight:var(--spr-font-weight-semi-bold)}.text-heading-xs{font-size:var(--spr-font-size-16);line-height:var(--spr-line-height-24);font-weight:var(--spr-font-weight-semi-bold)}.text-heading-xxs{font-size:var(--spr-font-size-13);line-height:var(--spr-line-height-16);font-weight:var(--spr-font-weight-semi-bold);text-transform:uppercase}.text-heading-xxxs{font-size:var(--spr-font-size-12);line-height:var(--spr-line-height-16);font-weight:var(--spr-font-weight-semi-bold);text-transform:uppercase}:host{-webkit-overflow-scrolling:touch!important;scrollbar-width:thin!important;scrollbar-color:rgb(var(--spr-grey-250)) transparent!important;scrollbar-gutter:unset;grid-column:sidebar;display:block;overflow:hidden auto;width:var(--spr-sidebar-width);height:100%;padding:0 8px 8px;background:var(--brd-fill-default-50)}:host::-webkit-scrollbar{width:18px!important;background-color:transparent!important;border-radius:var(--spr-border-radius-l)!important}:host::-webkit-scrollbar-thumb{border:6px solid rgb(var(--brd-white))!important;background-color:rgb(var(--spr-grey-130))!important;border-radius:var(--spr-border-radius-l)!important}:host:hover{scrollbar-color:rgba(26,26,30,.7) transparent!important}:host:hover::-webkit-scrollbar-thumb{background-color:rgb(var(--spr-grey-250))!important}.sidebar{display:block;width:100%}.sidebar__container{min-height:100%}.sidebar__title{font-size:var(--spr-font-size-13);line-height:var(--spr-line-height-16);font-weight:var(--spr-font-weight-semi-bold);text-transform:uppercase;margin:0;padding:16px;color:var(--brd-text-secondary-500);letter-spacing:1.04px}.sidebar__nav{margin:0;padding:0;list-style:none}.sidebar__item{cursor:pointer}\n"] }]
        }], ctorParameters: () => [{ type: i1$3.Router }], propDecorators: { title: [{
                type: Input
            }], items: [{
                type: Input
            }] } });

class SprSwitcherComponent extends BaseControl {
    constructor() {
        super(...arguments);
        this.isDecorated = false;
        this.isLabelReverse = false;
        this.isInline = false;
        this.secondLabel = null;
    }
    initControl() {
        return this.formBuilder.nonNullable.control(false);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprSwitcherComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: SprSwitcherComponent, isStandalone: true, selector: "spr-switcher", inputs: { isDecorated: "isDecorated", isLabelReverse: "isLabelReverse", isInline: "isInline", secondLabel: "secondLabel" }, usesInheritance: true, hostDirectives: [{ directive: SprLabelDirective, inputs: ["inputId", "inputId", "tooltip", "tooltip", "sprLabel", "label", "sprLabelIsInline", "labelIsInline", "sprLabelClass", "labelClass", "sprLabelPosition", "labelPosition", "sprLabelLeftIcon", "labelLeftIcon", "sprLabelRightIcon", "labelRightIcon"] }], ngImport: i0, template: "<div\n  class=\"switcher-control\"\n  [class.disabled]=\"control.disabled\"\n  [class.switcher-control--decorated]=\"isDecorated\">\n  <div\n    class=\"switcher-control__holder\"\n    sprLabelContainer\n    sprLabelDefaultClass=\"switcher-control__label\"\n    [sprLabelDefaultPosition]=\"isLabelReverse ? 'inside-start' : 'inside-end'\"\n    [sprLabel]=\"secondLabel\"\n    sprLabelPosition=\"end\"\n    [tooltip]=\"tooltip\"\n    [inputId]=\"inputId()\">\n    <input\n      class=\"form-switcher\"\n      type=\"checkbox\"\n      [formControl]=\"control\"\n      (blur)=\"cvaOnTouched()\"\n      ngDefaultControl\n      [attr.name]=\"inputId()\"\n      [attr.id]=\"inputId()\" />\n  </div>\n</div>\n", styles: [":host{display:block;line-height:1}.switcher-control{--spr-switcher-control-decorated-background: var(--brd-fill-default-200);--spr-switcher-control-decorated-border-color: var(--brd-border-default-300);--spr-custom-label-cursor: pointer;display:flex;justify-content:space-between;align-items:center;border:1px solid var(--spr-switcher-control-border-color, transparent);background:var(--spr-switcher-control-background, transparent)}.switcher-control:has(.switcher-control__label){gap:8px}.switcher-control.disabled{--spr-custom-lable-cursor: default;--spr-custom-label-pointer-events: none}.switcher-control--decorated{--spr-switcher-control-background: var(--spr-switcher-control-decorated-background);--spr-switcher-control-border-color: var(--spr-switcher-control-decorated-border-color);padding:9px 11px;border-radius:var(--spr-border-radius-m)}.form-switcher{--spr-switcher-background: var(--brd-fill-default-250);--spr-switcher-background-hover: var(--brd-fill-hover-300);--spr-switcher-background-focus: var(--brd-fill-accent-default-light);--spr-switcher-background-disabled: var(--brd-fill-disabled-250);--spr-switcher-background-checked: var(--brd-fill-accent-default-light);--spr-switcher-background-checked-hover: var(--brd-fill-accent-hover-base);--spr-switcher-background-checked-disabled: var(--brd-fill-accent-disabled);--spr-switcher-box-shadow-focus: 0 0 0 4px var(--brd-fill-accent-focus);--spr-switcher-thumb-border-color: var(--brd-border-default-400);--spr-switcher-thumb-border-color-hover: var(--brd-border-hover-600);--spr-switcher-thumb-border-color-focus: transparent;--spr-switcher-thumb-border-color-checked: var(--brd-fill-default-0);--spr-switcher-thumb-border-color-checked-hover: var(--spr-switcher-background-checked-hover);--spr-switcher-thumb-border-color-checked-disabled: var(--spr-switcher-thumb-background-disabled);--spr-switcher-thumb-background: var(--brd-fill-default-0);--spr-switcher-thumb-background-active: var(--brd-fill-pressed-200);--spr-switcher-thumb-background-disabled: var(--brd-fill-disabled-50);--spr-switcher-thumb-box-shadow: 0 1px 2px 0 rgb(var(--brd-black) / .05);position:relative;width:40px;height:24px;margin:0;border-radius:var(--spr-border-radius-pill);background:var(--spr-switcher-background);transition:background .15s ease-in-out;appearance:none;cursor:pointer}.form-switcher:after{position:absolute;top:50%;left:2px;z-index:1;content:\"\";width:20px;height:20px;border:1px solid var(--spr-switcher-thumb-border-color);border-radius:var(--spr-border-radius-pill);box-shadow:var(--spr-switcher-thumb-box-shadow);background:var(--spr-switcher-thumb-background);transform:translate(0) translateY(-50%);transition:transform .15s ease-in-out,border .15s ease-in-out}.form-switcher:hover:not(:disabled){--spr-switcher-background: var(--spr-switcher-background-hover);--spr-switcher-thumb-border-color: var(--spr-switcher-thumb-border-color-hover)}.form-switcher:focus-visible{--spr-switcher-background: var(--spr-switcher-background-focus);--spr-switcher-thumb-border-color: var(--spr-switcher-thumb-border-color-focus);box-shadow:var(--spr-switcher-box-shadow-focus);outline:none}.form-switcher:checked:after{transform:translate(calc(100% - 4px)) translateY(-50%)}.form-switcher:checked:not(:disabled){--spr-switcher-background: var(--spr-switcher-background-checked)}.form-switcher:checked:not(:disabled):after{--spr-switcher-thumb-border-color: var(--spr-switcher-thumb-border-color-checked)}.form-switcher:checked:hover:not(:disabled){--spr-switcher-background: var(--spr-switcher-background-checked-hover)}.form-switcher:checked:hover:not(:disabled):after{--spr-switcher-thumb-border-color: var(--spr-switcher-thumb-border-color-checked-hover)}.form-switcher:checked:active:after{--spr-switcher-thumb-background: var(--spr-switcher-thumb-background-active)}.form-switcher:checked:disabled{--spr-switcher-background: var(--spr-switcher-background-checked-disabled)}.form-switcher:checked:disabled:after{--spr-switcher-thumb-border-color: var(--spr-switcher-thumb-border-color-checked-disabled)}.form-switcher:disabled{--spr-switcher-background: var(--spr-switcher-background-disabled);pointer-events:none}.form-switcher:disabled:after{--spr-switcher-thumb-background: var(--spr-switcher-thumb-background-disabled)}.switcher-control__holder{display:flex;align-items:center;width:100%}.switcher-control__holder:has(.switcher-control__label){gap:8px}.switcher-control__holder:has(.switcher-control__label):not(:has(.label--inline)) .switcher-control__label{flex:1}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: NgbTooltipModule }, { kind: "directive", type: SprLabelContainerDirective, selector: "[sprLabelContainer]", inputs: ["sprLabelDefaultPosition", "sprLabelDefaultClass"] }, { kind: "directive", type: SprLabelDirective, selector: "[sprLabel]", inputs: ["shouldStopLabelClickEventPropagation", "sprLabel", "sprLabelPosition", "sprLabelClass", "sprLabelIsInline", "sprLabelLeftIcon", "sprLabelRightIcon", "tooltip", "inputId"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprSwitcherComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-switcher', imports: [CommonModule, ReactiveFormsModule, NgbTooltipModule, SprLabelContainerDirective, SprLabelDirective], changeDetection: ChangeDetectionStrategy.OnPush, hostDirectives: [SPR_LABEL], template: "<div\n  class=\"switcher-control\"\n  [class.disabled]=\"control.disabled\"\n  [class.switcher-control--decorated]=\"isDecorated\">\n  <div\n    class=\"switcher-control__holder\"\n    sprLabelContainer\n    sprLabelDefaultClass=\"switcher-control__label\"\n    [sprLabelDefaultPosition]=\"isLabelReverse ? 'inside-start' : 'inside-end'\"\n    [sprLabel]=\"secondLabel\"\n    sprLabelPosition=\"end\"\n    [tooltip]=\"tooltip\"\n    [inputId]=\"inputId()\">\n    <input\n      class=\"form-switcher\"\n      type=\"checkbox\"\n      [formControl]=\"control\"\n      (blur)=\"cvaOnTouched()\"\n      ngDefaultControl\n      [attr.name]=\"inputId()\"\n      [attr.id]=\"inputId()\" />\n  </div>\n</div>\n", styles: [":host{display:block;line-height:1}.switcher-control{--spr-switcher-control-decorated-background: var(--brd-fill-default-200);--spr-switcher-control-decorated-border-color: var(--brd-border-default-300);--spr-custom-label-cursor: pointer;display:flex;justify-content:space-between;align-items:center;border:1px solid var(--spr-switcher-control-border-color, transparent);background:var(--spr-switcher-control-background, transparent)}.switcher-control:has(.switcher-control__label){gap:8px}.switcher-control.disabled{--spr-custom-lable-cursor: default;--spr-custom-label-pointer-events: none}.switcher-control--decorated{--spr-switcher-control-background: var(--spr-switcher-control-decorated-background);--spr-switcher-control-border-color: var(--spr-switcher-control-decorated-border-color);padding:9px 11px;border-radius:var(--spr-border-radius-m)}.form-switcher{--spr-switcher-background: var(--brd-fill-default-250);--spr-switcher-background-hover: var(--brd-fill-hover-300);--spr-switcher-background-focus: var(--brd-fill-accent-default-light);--spr-switcher-background-disabled: var(--brd-fill-disabled-250);--spr-switcher-background-checked: var(--brd-fill-accent-default-light);--spr-switcher-background-checked-hover: var(--brd-fill-accent-hover-base);--spr-switcher-background-checked-disabled: var(--brd-fill-accent-disabled);--spr-switcher-box-shadow-focus: 0 0 0 4px var(--brd-fill-accent-focus);--spr-switcher-thumb-border-color: var(--brd-border-default-400);--spr-switcher-thumb-border-color-hover: var(--brd-border-hover-600);--spr-switcher-thumb-border-color-focus: transparent;--spr-switcher-thumb-border-color-checked: var(--brd-fill-default-0);--spr-switcher-thumb-border-color-checked-hover: var(--spr-switcher-background-checked-hover);--spr-switcher-thumb-border-color-checked-disabled: var(--spr-switcher-thumb-background-disabled);--spr-switcher-thumb-background: var(--brd-fill-default-0);--spr-switcher-thumb-background-active: var(--brd-fill-pressed-200);--spr-switcher-thumb-background-disabled: var(--brd-fill-disabled-50);--spr-switcher-thumb-box-shadow: 0 1px 2px 0 rgb(var(--brd-black) / .05);position:relative;width:40px;height:24px;margin:0;border-radius:var(--spr-border-radius-pill);background:var(--spr-switcher-background);transition:background .15s ease-in-out;appearance:none;cursor:pointer}.form-switcher:after{position:absolute;top:50%;left:2px;z-index:1;content:\"\";width:20px;height:20px;border:1px solid var(--spr-switcher-thumb-border-color);border-radius:var(--spr-border-radius-pill);box-shadow:var(--spr-switcher-thumb-box-shadow);background:var(--spr-switcher-thumb-background);transform:translate(0) translateY(-50%);transition:transform .15s ease-in-out,border .15s ease-in-out}.form-switcher:hover:not(:disabled){--spr-switcher-background: var(--spr-switcher-background-hover);--spr-switcher-thumb-border-color: var(--spr-switcher-thumb-border-color-hover)}.form-switcher:focus-visible{--spr-switcher-background: var(--spr-switcher-background-focus);--spr-switcher-thumb-border-color: var(--spr-switcher-thumb-border-color-focus);box-shadow:var(--spr-switcher-box-shadow-focus);outline:none}.form-switcher:checked:after{transform:translate(calc(100% - 4px)) translateY(-50%)}.form-switcher:checked:not(:disabled){--spr-switcher-background: var(--spr-switcher-background-checked)}.form-switcher:checked:not(:disabled):after{--spr-switcher-thumb-border-color: var(--spr-switcher-thumb-border-color-checked)}.form-switcher:checked:hover:not(:disabled){--spr-switcher-background: var(--spr-switcher-background-checked-hover)}.form-switcher:checked:hover:not(:disabled):after{--spr-switcher-thumb-border-color: var(--spr-switcher-thumb-border-color-checked-hover)}.form-switcher:checked:active:after{--spr-switcher-thumb-background: var(--spr-switcher-thumb-background-active)}.form-switcher:checked:disabled{--spr-switcher-background: var(--spr-switcher-background-checked-disabled)}.form-switcher:checked:disabled:after{--spr-switcher-thumb-border-color: var(--spr-switcher-thumb-border-color-checked-disabled)}.form-switcher:disabled{--spr-switcher-background: var(--spr-switcher-background-disabled);pointer-events:none}.form-switcher:disabled:after{--spr-switcher-thumb-background: var(--spr-switcher-thumb-background-disabled)}.switcher-control__holder{display:flex;align-items:center;width:100%}.switcher-control__holder:has(.switcher-control__label){gap:8px}.switcher-control__holder:has(.switcher-control__label):not(:has(.label--inline)) .switcher-control__label{flex:1}\n"] }]
        }], propDecorators: { isDecorated: [{
                type: Input
            }], isLabelReverse: [{
                type: Input
            }], isInline: [{
                type: Input
            }], secondLabel: [{
                type: Input
            }] } });

const DEFAULT_TABLE_SORT_CONFIGURATION = {
    sortType: null,
    selectedColumn: null,
};

const SORT_STEPS_ORDER = [null, SortType.Asc, SortType.Desc];
const getTableSortType = (selectedColumn, sortConfiguration) => {
    if (sortConfiguration.sortType === null) {
        return SortType.Asc;
    }
    if (selectedColumn.columnKey === sortConfiguration.selectedColumn) {
        const currentSortStepIndex = SORT_STEPS_ORDER.indexOf(sortConfiguration.sortType);
        const nextSortStep = SORT_STEPS_ORDER[currentSortStepIndex + 1] || SORT_STEPS_ORDER[0];
        return nextSortStep;
    }
    return null;
};
const isSelectedColumn = (column, sortConfiguration) => {
    return Boolean(sortConfiguration.selectedColumn === column.columnKey && sortConfiguration.sortType !== null);
};

class SprTableDataService {
    constructor() {
        this.displayedColumns = [];
        this.displayedRows = [];
        this.sortConfiguration = DEFAULT_TABLE_SORT_CONFIGURATION;
        this.sortSubj$ = new Subject();
        this.sort$ = this.sortSubj$.asObservable();
    }
    findColumnByColumnKey(columnKey) {
        return this.displayedColumns.find((column) => column.columnKey === columnKey);
    }
    sort(column) {
        const sortType = getTableSortType(column, this.sortConfiguration);
        this.sortConfiguration = {
            sortType,
            selectedColumn: sortType !== null ? column.columnKey : null,
        };
        this.sortSubj$.next(this.sortConfiguration);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprTableDataService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprTableDataService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprTableDataService, decorators: [{
            type: Injectable
        }] });

class SprTableRowDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
        this.columnKey = '';
    }
    static ngTemplateContextGuard(directive, context) {
        return true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprTableRowDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: SprTableRowDirective, isStandalone: true, selector: "ng-template[sprTableRow]", inputs: { sprTableRow: "sprTableRow", columnKey: "columnKey" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprTableRowDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[sprTableRow]',
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }], propDecorators: { sprTableRow: [{
                type: Input,
                args: [{ required: true }]
            }], columnKey: [{
                type: Input,
                args: [{ required: true }]
            }] } });

class SprTableDataCellDirective {
    get classes() {
        return this.currentColumn?.settings?.bodyColumnClasses;
    }
    constructor(tableDataService, tableRow, renderer2, elementRef) {
        this.tableDataService = tableDataService;
        this.tableRow = tableRow;
        this.renderer2 = renderer2;
        this.elementRef = elementRef;
    }
    get currentColumn() {
        return this.tableDataService.findColumnByColumnKey(this.tableRow.columnKey);
    }
    ngOnInit() {
        this.renderer2.addClass(this.elementRef.nativeElement, 'brd-table__td');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprTableDataCellDirective, deps: [{ token: SprTableDataService }, { token: SprTableRowDirective }, { token: i0.Renderer2 }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: SprTableDataCellDirective, isStandalone: true, selector: "td[sprTableDataCell]", host: { properties: { "class": "this.classes" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprTableDataCellDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'td[sprTableDataCell]',
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: SprTableDataService }, { type: SprTableRowDirective }, { type: i0.Renderer2 }, { type: i0.ElementRef }], propDecorators: { classes: [{
                type: HostBinding,
                args: ['class']
            }] } });

class SprTableHeaderDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
        this.columnKey = '';
    }
    static ngTemplateContextGuard(directive, context) {
        return true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprTableHeaderDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: SprTableHeaderDirective, isStandalone: true, selector: "ng-template[sprTableHeader]", inputs: { sprTableHeader: "sprTableHeader", columnKey: "columnKey" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprTableHeaderDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[sprTableHeader]',
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }], propDecorators: { sprTableHeader: [{
                type: Input,
                args: [{ required: true }]
            }], columnKey: [{
                type: Input,
                args: [{ required: true }]
            }] } });

class SprTableHeaderCellDirective {
    get classes() {
        return this.column?.settings?.headColumnClasses;
    }
    get isSortable() {
        return Boolean(this.column?.settings?.isSortable);
    }
    get isDescSort() {
        return this.isSelectedColumn && this.tableDataService.sortConfiguration.sortType === SortType.Desc;
    }
    get isAscSort() {
        return this.isSelectedColumn && this.tableDataService.sortConfiguration.sortType === SortType.Asc;
    }
    get isSorted() {
        return this.isSelectedColumn;
    }
    constructor(tableDataService, tableHeader, renderer2, elementRef) {
        this.tableDataService = tableDataService;
        this.tableHeader = tableHeader;
        this.renderer2 = renderer2;
        this.elementRef = elementRef;
    }
    get column() {
        return this.tableDataService.findColumnByColumnKey(this.tableHeader.columnKey);
    }
    get isSelectedColumn() {
        if (!this.column) {
            return false;
        }
        return isSelectedColumn(this.column, this.tableDataService.sortConfiguration);
    }
    onClick() {
        if (!this.column?.settings?.isSortable) {
            return;
        }
        this.tableDataService.sort(this.column);
    }
    ngOnInit() {
        this.renderer2.setAttribute(this.elementRef.nativeElement, 'scope', 'col');
        this.renderer2.addClass(this.elementRef.nativeElement, 'brd-table__th');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprTableHeaderCellDirective, deps: [{ token: SprTableDataService }, { token: SprTableHeaderDirective }, { token: i0.Renderer2 }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: SprTableHeaderCellDirective, isStandalone: true, selector: "th[sprTableHeaderCell]", host: { listeners: { "click": "onClick()" }, properties: { "class": "this.classes", "class.brd-table__th--sortable": "this.isSortable", "class.brd-table__th--desc": "this.isDescSort", "class.brd-table__th--asc": "this.isAscSort", "class.brd-table__th--sorted": "this.isSorted" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprTableHeaderCellDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'th[sprTableHeaderCell]',
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: SprTableDataService }, { type: SprTableHeaderDirective }, { type: i0.Renderer2 }, { type: i0.ElementRef }], propDecorators: { classes: [{
                type: HostBinding,
                args: ['class']
            }], isSortable: [{
                type: HostBinding,
                args: ['class.brd-table__th--sortable']
            }], isDescSort: [{
                type: HostBinding,
                args: ['class.brd-table__th--desc']
            }], isAscSort: [{
                type: HostBinding,
                args: ['class.brd-table__th--asc']
            }], isSorted: [{
                type: HostBinding,
                args: ['class.brd-table__th--sorted']
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }] } });

class GetHeaderTemplatePipe {
    transform(columnKey, headerTemplates) {
        return headerTemplates.find((directiveInstance) => directiveInstance.columnKey === columnKey)?.templateRef;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: GetHeaderTemplatePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.14", ngImport: i0, type: GetHeaderTemplatePipe, isStandalone: true, name: "getHeaderTemplate" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: GetHeaderTemplatePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'getHeaderTemplate',
                    standalone: true,
                }]
        }] });

class GetRowTemplatePipe {
    transform(columnKey, rowTemplates) {
        return rowTemplates.find((directiveInstance) => directiveInstance.columnKey === columnKey)?.templateRef;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: GetRowTemplatePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.14", ngImport: i0, type: GetRowTemplatePipe, isStandalone: true, name: "getRowTemplate" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: GetRowTemplatePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'getRowTemplate',
                    standalone: true,
                }]
        }] });

class SprTableComponent {
    set displayedColumns(columns) {
        this.tableDataService.displayedColumns = columns;
    }
    set displayedRows(rows) {
        this.tableDataService.displayedRows = rows;
    }
    set sortConfiguration(sortConfiguration) {
        this.tableDataService.sortConfiguration = sortConfiguration;
    }
    constructor(tableDataService, destroyRef, cdRef) {
        this.tableDataService = tableDataService;
        this.destroyRef = destroyRef;
        this.cdRef = cdRef;
        /**
         * Pagination inputs.
         **/
        this.page = DEFAULT_PAGE_NUMBER;
        this.size = DEFAULT_PAGE_SIZE;
        this.maxPages = 3;
        this.paginationWithPageSize = true;
        this.isPaginationInputDisabled = false;
        this.withExportSection = false;
        this.withBoundaryLinks = true;
        this.withPagination = false;
        this.collectionSize = 0;
        this.isLoading = false;
        this.isHovering = true;
        this.withSearch = false;
        this.searchPlaceholder = 'Search...';
        this.searchMaxLength = 100;
        /**
         * Table inputs.
         **/
        this.title = '';
        this.cellSize = 'lg';
        /**
         * Pagination and sort outputs.
         **/
        this.updatePageSize = new EventEmitter();
        this.updateSort = new EventEmitter();
        /**
         * exportFormat output.
         **/
        this.exportFormat = new EventEmitter();
        /**
         * click outputs
         */
        this.rowClicked = new EventEmitter();
        /**
         * search value outputs
         */
        this.searchChanges = new EventEmitter();
        this.exportFormats = ExportFormats;
        this.sort = SortType;
    }
    get displayedColumns() {
        return this.tableDataService.displayedColumns;
    }
    get displayedRows() {
        return this.tableDataService.displayedRows;
    }
    ngOnInit() {
        this.initSortListener();
    }
    onUpdatePageSize(pageAndSizeInfo) {
        this.updatePageSize.emit(pageAndSizeInfo);
    }
    exportAsFormat(format) {
        this.exportFormat.emit(format);
    }
    onSearch(value) {
        this.searchChanges.emit(value);
    }
    initSortListener() {
        this.tableDataService.sort$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((sortConfiguration) => {
            this.updateSort.emit({ ...sortConfiguration, page: DEFAULT_PAGE_NUMBER, size: this.size });
            this.cdRef.markForCheck();
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprTableComponent, deps: [{ token: SprTableDataService }, { token: i0.DestroyRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: SprTableComponent, isStandalone: true, selector: "spr-table", inputs: { displayedColumns: "displayedColumns", displayedRows: "displayedRows", sortConfiguration: "sortConfiguration", page: "page", size: "size", maxPages: "maxPages", paginationParams: "paginationParams", paginationWithPageSize: "paginationWithPageSize", isPaginationInputDisabled: "isPaginationInputDisabled", withExportSection: "withExportSection", withBoundaryLinks: "withBoundaryLinks", withPagination: "withPagination", collectionSize: "collectionSize", isLoading: "isLoading", isHovering: "isHovering", withSearch: "withSearch", searchPlaceholder: "searchPlaceholder", searchMaxLength: "searchMaxLength", title: "title", tableClasses: "tableClasses", cellSize: "cellSize" }, outputs: { updatePageSize: "updatePageSize", updateSort: "updateSort", exportFormat: "exportFormat", rowClicked: "rowClicked", searchChanges: "searchChanges" }, providers: [SprTableDataService], queries: [{ propertyName: "headerTemplates", predicate: SprTableHeaderDirective }, { propertyName: "rowTemplates", predicate: SprTableRowDirective }], ngImport: i0, template: "<spr-inner-header\n  *ngIf=\"title\"\n  [title]=\"title\"\n  [withoutBorder]=\"true\"\n  [variant]=\"'large'\">\n</spr-inner-header>\n\n<div class=\"brd-table-flex-container\">\n  <ng-container\n    *ngIf=\"withPagination\"\n    [ngTemplateOutlet]=\"paginationTemplate\"\n    [ngTemplateOutletContext]=\"{ withSearch }\"></ng-container>\n\n  <section class=\"brd-table-container\">\n    <table\n      class=\"brd-table\"\n      [ngClass]=\"['brd-table--' + cellSize, isHovering ? 'brd-table--with-hover' : '']\">\n      <thead>\n        <tr class=\"brd-table__tr\">\n          <ng-container *ngFor=\"let column of displayedColumns\">\n            <ng-container\n              *ngIf=\"column.columnKey | getHeaderTemplate: headerTemplates as headerTemplate; else defaultHeaderTemplate\"\n              [ngTemplateOutletContext]=\"{ $implicit: column }\"\n              [ngTemplateOutlet]=\"headerTemplate\"></ng-container>\n\n            <ng-template\n              #defaultHeaderTemplate\n              [sprTableHeader]=\"displayedRows[0]\"\n              [columnKey]=\"column.columnKey\">\n              <th sprTableHeaderCell>\n                {{ column.text }}\n              </th>\n            </ng-template>\n          </ng-container>\n        </tr>\n      </thead>\n\n      <tbody>\n        <tr\n          *ngFor=\"let row of displayedRows; let rowIndex = index\"\n          class=\"brd-table__tr\"\n          (click)=\"rowClicked.emit(row)\">\n          <ng-container *ngFor=\"let column of displayedColumns\">\n            <ng-container\n              *ngIf=\"column.columnKey | getRowTemplate: rowTemplates as rowTemplate; else defaultRowTemplate\"\n              [ngTemplateOutletContext]=\"{ $implicit: row, rowIndex }\"\n              [ngTemplateOutlet]=\"rowTemplate\"></ng-container>\n\n            <ng-template\n              #defaultRowTemplate\n              [sprTableRow]=\"displayedRows[0]\"\n              [columnKey]=\"column.columnKey\">\n              <td sprTableDataCell>\n                {{ row[column.columnKey] }}\n              </td>\n            </ng-template>\n          </ng-container>\n        </tr>\n      </tbody>\n    </table>\n  </section>\n\n  <ng-container\n    *ngIf=\"withPagination\"\n    [ngTemplateOutlet]=\"paginationTemplate\"\n    [ngTemplateOutletContext]=\"{ withSearch: false }\"></ng-container>\n</div>\n\n<spr-spinner *ngIf=\"isLoading\"></spr-spinner>\n\n<ng-template\n  #paginationTemplate\n  let-withSearch=\"withSearch\">\n  <spr-pagination-bar\n    [withExportSection]=\"withExportSection\"\n    [withBoundaryLinks]=\"withBoundaryLinks\"\n    [paginationParams]=\"paginationParams\"\n    [isPaginationInputDisabled]=\"isPaginationInputDisabled\"\n    [paginationWithPageSize]=\"paginationWithPageSize\"\n    [withSearch]=\"withSearch\"\n    [searchPlaceholder]=\"searchPlaceholder\"\n    [searchMaxLength]=\"searchMaxLength\"\n    [collectionSize]=\"collectionSize\"\n    [isLoading]=\"isLoading\"\n    [page]=\"page\"\n    [size]=\"size\"\n    [maxPages]=\"maxPages\"\n    (updatePageSize)=\"onUpdatePageSize($event)\"\n    (exportFormat)=\"exportAsFormat($event)\"\n    (searchValue)=\"onSearch($event)\">\n  </spr-pagination-bar>\n</ng-template>\n", styles: [":host{--brd-table-wrapper-padding: 16px;--brd-table-bg: rgb(var(--brd-white));position:relative;display:block;padding:var(--brd-table-wrapper-custom-padding, var(--brd-table-wrapper-padding));background:var(--brd-table-custom-bg, var(--brd-table-bg))}.brd-table-container{--brd-table-title-padding: 22px 8px;--brd-table-title-color: rgb(var(--brd-gray-900));--brd-table-title-font-weight: 600;--brd-table-title-font-size: 20px;--brd-table-title-line-height: 24px;--brd-table-tr-border-width: 1px;--brd-table-tr-border-color: rgb(var(--brd-gray-300));--brd-table-th-text-align: left;--brd-table-th-color: rgb(var(--brd-gray-600));--brd-table-th-font-weight: 400;--brd-table-th-font-size: 14px;--brd-table-th-first-color: var(--brd-table-th-color);--brd-table-th-first-font-weight: var(--brd-table-th-font-weight);--brd-table-th-first-font-size: var(--brd-table-th-font-size);--brd-table-td-text-align: left;--brd-table-td-color: rgb(var(--brd-gray-800));--brd-table-td-font-weight: 400;--brd-table-td-font-size: 14px;--brd-table-td-bg: rgb(var(--brd-white));--brd-table-td-first-color: var(--brd-table-td-color);--brd-table-td-first-font-weight: var(--brd-table-td-font-weight);--brd-table-td-first-font-size: var(--brd-table-td-font-size);--brd-table-td-hover-bg: rgb(var(--brd-gray-200));overflow:var(--brd-table-container-custom-overflow, auto);-webkit-overflow-scrolling:touch!important;scrollbar-width:thin!important;scrollbar-color:rgb(var(--spr-grey-250)) transparent!important;scrollbar-gutter:unset}.brd-table-container::-webkit-scrollbar{width:18px!important;background-color:transparent!important;border-radius:var(--spr-border-radius-l)!important}.brd-table-container::-webkit-scrollbar-thumb{border:6px solid rgb(var(--brd-white))!important;background-color:rgb(var(--spr-grey-130))!important;border-radius:var(--spr-border-radius-l)!important}.brd-table-container:hover{scrollbar-color:rgba(26,26,30,.7) transparent!important}.brd-table-container::-webkit-scrollbar{height:18px!important;border-radius:var(--spr-border-radius-l)!important;background-color:rgb(var(--spr-grey-50))!important}.brd-table-container::-webkit-scrollbar-thumb{height:6px;border:6px solid rgb(var(--spr-grey-50))!important;background-color:rgb(var(--spr-grey-130))!important}.brd-table-container:hover::-webkit-scrollbar-thumb{background-color:rgb(var(--spr-grey-250))!important}.brd-table-flex-container{gap:12px;flex-direction:column;display:flex}::ng-deep .brd-table{width:100%}::ng-deep .brd-table.brd-table--with-hover .brd-table__tr:hover .brd-table__td{background-color:var(--brd-table-td-custom-hover-bg, var(--brd-table-td-hover-bg));cursor:var(--brd-table-td-hover-custom-cursor, default)}::ng-deep .brd-table.brd-table--sm{--brd-table-cell-height: calc(36px - var(--brd-table-tr-border-width))}::ng-deep .brd-table.brd-table--md{--brd-table-cell-height: calc(48px - var(--brd-table-tr-border-width))}::ng-deep .brd-table.brd-table--lg{--brd-table-cell-height: calc(68px - var(--brd-table-tr-border-width))}::ng-deep .brd-table-title{padding:var(--brd-table-title-padding);color:var(--brd-table-title-color);font-weight:var(--brd-table-title-font-weight);font-size:var(--brd-table-title-font-size);line-height:var(--brd-table-title-line-height)}::ng-deep .brd-table__th,::ng-deep .brd-table__td{padding:5px 10px 5px 5px;vertical-align:middle;border-bottom:var(--brd-table-tr-border-width) solid var(--brd-table-tr-border-color)}::ng-deep .brd-table__th{position:relative;height:32px;text-align:var(--brd-table-th-text-align);color:var(--brd-table-th-color);font-weight:var(--brd-table-th-font-weight);font-size:var(--brd-table-th-font-size);white-space:nowrap}::ng-deep .brd-table__th:first-child{color:var(--brd-table-th-first-color);font-weight:var(--brd-table-th-first-font-weight);font-size:var(--brd-table-th-first-font-size)}::ng-deep .brd-table__th.brd-table__th--desc:after,::ng-deep .brd-table__th.brd-table__th--asc:after{display:inline-block;width:2px;height:2px;margin:0 0 1px 5px;vertical-align:middle;border-style:solid;content:\"\"}::ng-deep .brd-table__th.brd-table__th--desc:after{border-width:4px 3.5px 0;border-color:rgb(var(--brd-purple-300)) transparent transparent}::ng-deep .brd-table__th.brd-table__th--asc:after{border-width:0 3.5px 4px;border-color:transparent transparent rgb(var(--brd-purple-300))}::ng-deep .brd-table__th.brd-table__th--sortable{cursor:pointer}::ng-deep .brd-table__th.brd-table__th--sortable:hover{color:rgb(var(--brd-purple-300));border-color:rgb(var(--brd-purple-300))}::ng-deep .brd-table__th.brd-table__th--sorted{color:rgb(var(--brd-purple-300));border-color:rgb(var(--brd-purple-300))}::ng-deep .brd-table__th.brd-table__th--right{--brd-table-th-text-align: right}::ng-deep .brd-table__th.brd-table__th--center{--brd-table-th-text-align: center}::ng-deep .brd-table__td{height:var(--brd-table-cell-height);text-align:var(--brd-table-td-text-align);color:var(--brd-table-td-color);font-weight:var(--brd-table-td-font-weight);font-size:var(--brd-table-td-font-size);background-color:var(--brd-table-td-custom-bg, var(--brd-table-td-bg))}::ng-deep .brd-table__td:first-child{color:var(--brd-table-td-first-color);font-weight:var(--brd-table-td-first-font-weight);font-size:var(--brd-table-td-first-font-size)}::ng-deep .brd-table__td.brd-table__td--right{--brd-table-td-text-align: right}::ng-deep .brd-table__td.brd-table__td--center{--brd-table-td-text-align: center}\n"], dependencies: [{ kind: "ngmodule", type: 
                // Modules
                CommonModule }, { kind: "directive", type: i1$2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1$2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1$2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: FormsModule }, { kind: "component", type: 
                // Components
                SprPaginationBarComponent, selector: "spr-pagination-bar", inputs: ["page", "size", "maxPages", "paginationParams", "paginationWithPageSize", "isPaginationInputDisabled", "withExportSection", "withSearch", "searchPlaceholder", "searchMaxLength", "collectionSize", "isLoading", "disabled", "isFullField", "withBoundaryLinks"], outputs: ["updatePageSize", "exportFormat", "searchValue"] }, { kind: "component", type: SprSpinnerComponent, selector: "spr-spinner" }, { kind: "component", type: SprInnerHeaderComponent, selector: "spr-inner-header", inputs: ["variant", "title", "withStartContent", "withoutBorder"] }, { kind: "directive", type: 
                // Directives
                SprTableHeaderDirective, selector: "ng-template[sprTableHeader]", inputs: ["sprTableHeader", "columnKey"] }, { kind: "directive", type: SprTableHeaderCellDirective, selector: "th[sprTableHeaderCell]" }, { kind: "directive", type: SprTableRowDirective, selector: "ng-template[sprTableRow]", inputs: ["sprTableRow", "columnKey"] }, { kind: "directive", type: SprTableDataCellDirective, selector: "td[sprTableDataCell]" }, { kind: "pipe", type: 
                // Pipes
                GetHeaderTemplatePipe, name: "getHeaderTemplate" }, { kind: "pipe", type: GetRowTemplatePipe, name: "getRowTemplate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprTableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-table', imports: [
                        // Modules
                        CommonModule,
                        FormsModule,
                        // Components
                        SprPaginationBarComponent,
                        SprSpinnerComponent,
                        SprInnerHeaderComponent,
                        // Directives
                        SprTableHeaderDirective,
                        SprTableHeaderCellDirective,
                        SprTableRowDirective,
                        SprTableDataCellDirective,
                        // Pipes
                        GetHeaderTemplatePipe,
                        GetRowTemplatePipe,
                    ], providers: [SprTableDataService], changeDetection: ChangeDetectionStrategy.OnPush, template: "<spr-inner-header\n  *ngIf=\"title\"\n  [title]=\"title\"\n  [withoutBorder]=\"true\"\n  [variant]=\"'large'\">\n</spr-inner-header>\n\n<div class=\"brd-table-flex-container\">\n  <ng-container\n    *ngIf=\"withPagination\"\n    [ngTemplateOutlet]=\"paginationTemplate\"\n    [ngTemplateOutletContext]=\"{ withSearch }\"></ng-container>\n\n  <section class=\"brd-table-container\">\n    <table\n      class=\"brd-table\"\n      [ngClass]=\"['brd-table--' + cellSize, isHovering ? 'brd-table--with-hover' : '']\">\n      <thead>\n        <tr class=\"brd-table__tr\">\n          <ng-container *ngFor=\"let column of displayedColumns\">\n            <ng-container\n              *ngIf=\"column.columnKey | getHeaderTemplate: headerTemplates as headerTemplate; else defaultHeaderTemplate\"\n              [ngTemplateOutletContext]=\"{ $implicit: column }\"\n              [ngTemplateOutlet]=\"headerTemplate\"></ng-container>\n\n            <ng-template\n              #defaultHeaderTemplate\n              [sprTableHeader]=\"displayedRows[0]\"\n              [columnKey]=\"column.columnKey\">\n              <th sprTableHeaderCell>\n                {{ column.text }}\n              </th>\n            </ng-template>\n          </ng-container>\n        </tr>\n      </thead>\n\n      <tbody>\n        <tr\n          *ngFor=\"let row of displayedRows; let rowIndex = index\"\n          class=\"brd-table__tr\"\n          (click)=\"rowClicked.emit(row)\">\n          <ng-container *ngFor=\"let column of displayedColumns\">\n            <ng-container\n              *ngIf=\"column.columnKey | getRowTemplate: rowTemplates as rowTemplate; else defaultRowTemplate\"\n              [ngTemplateOutletContext]=\"{ $implicit: row, rowIndex }\"\n              [ngTemplateOutlet]=\"rowTemplate\"></ng-container>\n\n            <ng-template\n              #defaultRowTemplate\n              [sprTableRow]=\"displayedRows[0]\"\n              [columnKey]=\"column.columnKey\">\n              <td sprTableDataCell>\n                {{ row[column.columnKey] }}\n              </td>\n            </ng-template>\n          </ng-container>\n        </tr>\n      </tbody>\n    </table>\n  </section>\n\n  <ng-container\n    *ngIf=\"withPagination\"\n    [ngTemplateOutlet]=\"paginationTemplate\"\n    [ngTemplateOutletContext]=\"{ withSearch: false }\"></ng-container>\n</div>\n\n<spr-spinner *ngIf=\"isLoading\"></spr-spinner>\n\n<ng-template\n  #paginationTemplate\n  let-withSearch=\"withSearch\">\n  <spr-pagination-bar\n    [withExportSection]=\"withExportSection\"\n    [withBoundaryLinks]=\"withBoundaryLinks\"\n    [paginationParams]=\"paginationParams\"\n    [isPaginationInputDisabled]=\"isPaginationInputDisabled\"\n    [paginationWithPageSize]=\"paginationWithPageSize\"\n    [withSearch]=\"withSearch\"\n    [searchPlaceholder]=\"searchPlaceholder\"\n    [searchMaxLength]=\"searchMaxLength\"\n    [collectionSize]=\"collectionSize\"\n    [isLoading]=\"isLoading\"\n    [page]=\"page\"\n    [size]=\"size\"\n    [maxPages]=\"maxPages\"\n    (updatePageSize)=\"onUpdatePageSize($event)\"\n    (exportFormat)=\"exportAsFormat($event)\"\n    (searchValue)=\"onSearch($event)\">\n  </spr-pagination-bar>\n</ng-template>\n", styles: [":host{--brd-table-wrapper-padding: 16px;--brd-table-bg: rgb(var(--brd-white));position:relative;display:block;padding:var(--brd-table-wrapper-custom-padding, var(--brd-table-wrapper-padding));background:var(--brd-table-custom-bg, var(--brd-table-bg))}.brd-table-container{--brd-table-title-padding: 22px 8px;--brd-table-title-color: rgb(var(--brd-gray-900));--brd-table-title-font-weight: 600;--brd-table-title-font-size: 20px;--brd-table-title-line-height: 24px;--brd-table-tr-border-width: 1px;--brd-table-tr-border-color: rgb(var(--brd-gray-300));--brd-table-th-text-align: left;--brd-table-th-color: rgb(var(--brd-gray-600));--brd-table-th-font-weight: 400;--brd-table-th-font-size: 14px;--brd-table-th-first-color: var(--brd-table-th-color);--brd-table-th-first-font-weight: var(--brd-table-th-font-weight);--brd-table-th-first-font-size: var(--brd-table-th-font-size);--brd-table-td-text-align: left;--brd-table-td-color: rgb(var(--brd-gray-800));--brd-table-td-font-weight: 400;--brd-table-td-font-size: 14px;--brd-table-td-bg: rgb(var(--brd-white));--brd-table-td-first-color: var(--brd-table-td-color);--brd-table-td-first-font-weight: var(--brd-table-td-font-weight);--brd-table-td-first-font-size: var(--brd-table-td-font-size);--brd-table-td-hover-bg: rgb(var(--brd-gray-200));overflow:var(--brd-table-container-custom-overflow, auto);-webkit-overflow-scrolling:touch!important;scrollbar-width:thin!important;scrollbar-color:rgb(var(--spr-grey-250)) transparent!important;scrollbar-gutter:unset}.brd-table-container::-webkit-scrollbar{width:18px!important;background-color:transparent!important;border-radius:var(--spr-border-radius-l)!important}.brd-table-container::-webkit-scrollbar-thumb{border:6px solid rgb(var(--brd-white))!important;background-color:rgb(var(--spr-grey-130))!important;border-radius:var(--spr-border-radius-l)!important}.brd-table-container:hover{scrollbar-color:rgba(26,26,30,.7) transparent!important}.brd-table-container::-webkit-scrollbar{height:18px!important;border-radius:var(--spr-border-radius-l)!important;background-color:rgb(var(--spr-grey-50))!important}.brd-table-container::-webkit-scrollbar-thumb{height:6px;border:6px solid rgb(var(--spr-grey-50))!important;background-color:rgb(var(--spr-grey-130))!important}.brd-table-container:hover::-webkit-scrollbar-thumb{background-color:rgb(var(--spr-grey-250))!important}.brd-table-flex-container{gap:12px;flex-direction:column;display:flex}::ng-deep .brd-table{width:100%}::ng-deep .brd-table.brd-table--with-hover .brd-table__tr:hover .brd-table__td{background-color:var(--brd-table-td-custom-hover-bg, var(--brd-table-td-hover-bg));cursor:var(--brd-table-td-hover-custom-cursor, default)}::ng-deep .brd-table.brd-table--sm{--brd-table-cell-height: calc(36px - var(--brd-table-tr-border-width))}::ng-deep .brd-table.brd-table--md{--brd-table-cell-height: calc(48px - var(--brd-table-tr-border-width))}::ng-deep .brd-table.brd-table--lg{--brd-table-cell-height: calc(68px - var(--brd-table-tr-border-width))}::ng-deep .brd-table-title{padding:var(--brd-table-title-padding);color:var(--brd-table-title-color);font-weight:var(--brd-table-title-font-weight);font-size:var(--brd-table-title-font-size);line-height:var(--brd-table-title-line-height)}::ng-deep .brd-table__th,::ng-deep .brd-table__td{padding:5px 10px 5px 5px;vertical-align:middle;border-bottom:var(--brd-table-tr-border-width) solid var(--brd-table-tr-border-color)}::ng-deep .brd-table__th{position:relative;height:32px;text-align:var(--brd-table-th-text-align);color:var(--brd-table-th-color);font-weight:var(--brd-table-th-font-weight);font-size:var(--brd-table-th-font-size);white-space:nowrap}::ng-deep .brd-table__th:first-child{color:var(--brd-table-th-first-color);font-weight:var(--brd-table-th-first-font-weight);font-size:var(--brd-table-th-first-font-size)}::ng-deep .brd-table__th.brd-table__th--desc:after,::ng-deep .brd-table__th.brd-table__th--asc:after{display:inline-block;width:2px;height:2px;margin:0 0 1px 5px;vertical-align:middle;border-style:solid;content:\"\"}::ng-deep .brd-table__th.brd-table__th--desc:after{border-width:4px 3.5px 0;border-color:rgb(var(--brd-purple-300)) transparent transparent}::ng-deep .brd-table__th.brd-table__th--asc:after{border-width:0 3.5px 4px;border-color:transparent transparent rgb(var(--brd-purple-300))}::ng-deep .brd-table__th.brd-table__th--sortable{cursor:pointer}::ng-deep .brd-table__th.brd-table__th--sortable:hover{color:rgb(var(--brd-purple-300));border-color:rgb(var(--brd-purple-300))}::ng-deep .brd-table__th.brd-table__th--sorted{color:rgb(var(--brd-purple-300));border-color:rgb(var(--brd-purple-300))}::ng-deep .brd-table__th.brd-table__th--right{--brd-table-th-text-align: right}::ng-deep .brd-table__th.brd-table__th--center{--brd-table-th-text-align: center}::ng-deep .brd-table__td{height:var(--brd-table-cell-height);text-align:var(--brd-table-td-text-align);color:var(--brd-table-td-color);font-weight:var(--brd-table-td-font-weight);font-size:var(--brd-table-td-font-size);background-color:var(--brd-table-td-custom-bg, var(--brd-table-td-bg))}::ng-deep .brd-table__td:first-child{color:var(--brd-table-td-first-color);font-weight:var(--brd-table-td-first-font-weight);font-size:var(--brd-table-td-first-font-size)}::ng-deep .brd-table__td.brd-table__td--right{--brd-table-td-text-align: right}::ng-deep .brd-table__td.brd-table__td--center{--brd-table-td-text-align: center}\n"] }]
        }], ctorParameters: () => [{ type: SprTableDataService }, { type: i0.DestroyRef }, { type: i0.ChangeDetectorRef }], propDecorators: { displayedColumns: [{
                type: Input
            }], displayedRows: [{
                type: Input
            }], sortConfiguration: [{
                type: Input
            }], page: [{
                type: Input
            }], size: [{
                type: Input
            }], maxPages: [{
                type: Input
            }], paginationParams: [{
                type: Input
            }], paginationWithPageSize: [{
                type: Input
            }], isPaginationInputDisabled: [{
                type: Input
            }], withExportSection: [{
                type: Input
            }], withBoundaryLinks: [{
                type: Input
            }], withPagination: [{
                type: Input
            }], collectionSize: [{
                type: Input
            }], isLoading: [{
                type: Input
            }], isHovering: [{
                type: Input
            }], withSearch: [{
                type: Input
            }], searchPlaceholder: [{
                type: Input
            }], searchMaxLength: [{
                type: Input
            }], title: [{
                type: Input
            }], tableClasses: [{
                type: Input
            }], cellSize: [{
                type: Input
            }], updatePageSize: [{
                type: Output
            }], updateSort: [{
                type: Output
            }], exportFormat: [{
                type: Output
            }], rowClicked: [{
                type: Output
            }], searchChanges: [{
                type: Output
            }], headerTemplates: [{
                type: ContentChildren,
                args: [SprTableHeaderDirective]
            }], rowTemplates: [{
                type: ContentChildren,
                args: [SprTableRowDirective]
            }] } });

class SprTabHeaderComponent {
    constructor() {
        this.isActive = false;
        this.isDisabled = false;
        this.isInvalid = false;
    }
    clickListener(event) {
        if (this.isDisabled) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprTabHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: SprTabHeaderComponent, isStandalone: true, selector: "spr-tab-header", inputs: { isActive: "isActive", isDisabled: "isDisabled", isInvalid: "isInvalid", routerSettings: "routerSettings" }, host: { listeners: { "click": "clickListener($event)" } }, ngImport: i0, template: "<button\n  *ngIf=\"routerSettings; else defaultHeaderButtonTemplate\"\n  [queryParamsHandling]=\"routerSettings.queryParamsHandling\"\n  [queryParams]=\"routerSettings.queryParams\"\n  [routerLink]=\"routerSettings.routerLink\"\n  [fragment]=\"routerSettings.fragment\"\n  [class.is-active]=\"isActive\"\n  [class.invalid]=\"isInvalid\"\n  [disabled]=\"isDisabled\"\n  class=\"tab-header-link\"\n  type=\"button\">\n  <ng-container [ngTemplateOutlet]=\"ngContentTemplate\"></ng-container>\n</button>\n\n<!-- Templates -->\n<ng-template #defaultHeaderButtonTemplate>\n  <button\n    [class.is-active]=\"isActive\"\n    [class.invalid]=\"isInvalid\"\n    [disabled]=\"isDisabled\"\n    class=\"tab-header-link\"\n    type=\"button\">\n    <ng-container [ngTemplateOutlet]=\"ngContentTemplate\"></ng-container>\n  </button>\n</ng-template>\n\n<ng-template #ngContentTemplate>\n  <ng-content></ng-content>\n</ng-template>\n", styles: [".text-body-xxxl{font-size:var(--spr-font-size-32);line-height:var(--spr-line-height-40)}.text-body-xxl{font-size:var(--spr-font-size-24);line-height:var(--spr-line-height-32)}.text-body-xl{font-size:var(--spr-font-size-20);line-height:var(--spr-line-height-24)}.text-body-l{font-size:var(--spr-font-size-16);line-height:var(--spr-line-height-20)}.text-body-m{font-size:var(--spr-font-size-15);line-height:var(--spr-line-height-20)}.text-body-s{font-size:var(--spr-font-size-14);line-height:var(--spr-line-height-20)}.text-body-xs{font-size:var(--spr-font-size-12);line-height:var(--spr-line-height-16)}.text-body-xs-uppercase{font-size:var(--spr-font-size-13);line-height:var(--spr-line-height-20);text-transform:uppercase}:host{display:inline-block}.tab-header-link{font-size:var(--spr-font-size-16);line-height:var(--spr-line-height-20);display:flex;align-items:center;white-space:nowrap;gap:8px;color:var(--spr-tabs-link-color, var(--brd-text-default-700));background:var(--spr-tabs-link-background, transparent);padding:var(--spr-tabs-link-padding-block, 9px) var(--spr-tabs-link-padding-inline, 15px);border:0}.tab-header-link.is-active{--spr-tabs-link-color: var(--brd-text-active-800);box-shadow:none}.tab-header-link:disabled{--spr-tabs-link-color: var(--brd-text-disabled-500);pointer-events:none;cursor:default}.tab-header-link.invalid:not(:disabled){--spr-tabs-link-color: var(--brd-text-destructive-600)}.tab-header-link:hover:not(.is-active,.invalid){--spr-tabs-link-color: var(--brd-text-hover-800);--spr-tabs-link-background: transparent}.tab-header-link:focus-visible{box-shadow:none;outline:none}.tab-header-link:focus-visible:not(.is-active,.invalid){--spr-tabs-link-color: var(--brd-text-pressed-600)}:host-context(.tabs--level-first) .tab-header-link{border:1px solid transparent;margin-bottom:-1px;border-top-left-radius:var(--spr-border-radius-m);border-top-right-radius:var(--spr-border-radius-m);font-weight:var(--spr-font-weight-medium)}:host-context(.tabs--level-first) .tab-header-link.is-active{--spr-tabs-link-background: var(--spr-tabs-level-first-link-background-active);border-color:var(--spr-tabs-level-first-link-border-color-active)}:host-context(.tabs--level-first) .tab-header-link:hover:not(.is-active){--spr-tabs-link-background: var(--spr-tabs-level-first-link-background-hover);border-color:var(--spr-tabs-level-first-link-border-color-hover)}:host-context(.tabs--level-first) .tab-header-link:focus-visible:not(.is-active){--spr-tabs-link-background: var(--spr-tabs-level-first-link-background-focus);border-color:var(--spr-tabs-level-first-link-border-color-focus)}:host-context(.tabs--level-second) .tab-header-link{position:relative;border-radius:var(--spr-border-radius-m)}:host-context(.tabs--level-second) .tab-header-link:before{content:\"\";position:absolute;inset:auto 0 0;height:2px;background:transparent;border-radius:var(--spr-tabs-level-second-link-border-radius-active);transition:background var(--spr-transition-time) ease}:host-context(.tabs--level-second) .tab-header-link:focus-visible:before,:host-context(.tabs--level-second) .tab-header-link:hover:before,:host-context(.tabs--level-second) .tab-header-link.is-active:before{background:var(--spr-tabs-level-second-link-border-color-active)}:host-context(.tabs--level-third) .tab-header-link{border-radius:var(--spr-border-radius-pill)}:host-context(.tabs--level-third) .tab-header-link.is-active{--spr-tabs-link-background: var(--spr-tabs-level-third-link-background-active)}:host-context(.tabs--level-third) .tab-header-link:focus-visible:not(.is-active),:host-context(.tabs--level-third) .tab-header-link:hover:not(.is-active){--spr-tabs-link-background: var(--spr-tabs-level-third-link-background-hover)}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprTabHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-tab-header', imports: [NgIf, RouterLink, NgTemplateOutlet], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  *ngIf=\"routerSettings; else defaultHeaderButtonTemplate\"\n  [queryParamsHandling]=\"routerSettings.queryParamsHandling\"\n  [queryParams]=\"routerSettings.queryParams\"\n  [routerLink]=\"routerSettings.routerLink\"\n  [fragment]=\"routerSettings.fragment\"\n  [class.is-active]=\"isActive\"\n  [class.invalid]=\"isInvalid\"\n  [disabled]=\"isDisabled\"\n  class=\"tab-header-link\"\n  type=\"button\">\n  <ng-container [ngTemplateOutlet]=\"ngContentTemplate\"></ng-container>\n</button>\n\n<!-- Templates -->\n<ng-template #defaultHeaderButtonTemplate>\n  <button\n    [class.is-active]=\"isActive\"\n    [class.invalid]=\"isInvalid\"\n    [disabled]=\"isDisabled\"\n    class=\"tab-header-link\"\n    type=\"button\">\n    <ng-container [ngTemplateOutlet]=\"ngContentTemplate\"></ng-container>\n  </button>\n</ng-template>\n\n<ng-template #ngContentTemplate>\n  <ng-content></ng-content>\n</ng-template>\n", styles: [".text-body-xxxl{font-size:var(--spr-font-size-32);line-height:var(--spr-line-height-40)}.text-body-xxl{font-size:var(--spr-font-size-24);line-height:var(--spr-line-height-32)}.text-body-xl{font-size:var(--spr-font-size-20);line-height:var(--spr-line-height-24)}.text-body-l{font-size:var(--spr-font-size-16);line-height:var(--spr-line-height-20)}.text-body-m{font-size:var(--spr-font-size-15);line-height:var(--spr-line-height-20)}.text-body-s{font-size:var(--spr-font-size-14);line-height:var(--spr-line-height-20)}.text-body-xs{font-size:var(--spr-font-size-12);line-height:var(--spr-line-height-16)}.text-body-xs-uppercase{font-size:var(--spr-font-size-13);line-height:var(--spr-line-height-20);text-transform:uppercase}:host{display:inline-block}.tab-header-link{font-size:var(--spr-font-size-16);line-height:var(--spr-line-height-20);display:flex;align-items:center;white-space:nowrap;gap:8px;color:var(--spr-tabs-link-color, var(--brd-text-default-700));background:var(--spr-tabs-link-background, transparent);padding:var(--spr-tabs-link-padding-block, 9px) var(--spr-tabs-link-padding-inline, 15px);border:0}.tab-header-link.is-active{--spr-tabs-link-color: var(--brd-text-active-800);box-shadow:none}.tab-header-link:disabled{--spr-tabs-link-color: var(--brd-text-disabled-500);pointer-events:none;cursor:default}.tab-header-link.invalid:not(:disabled){--spr-tabs-link-color: var(--brd-text-destructive-600)}.tab-header-link:hover:not(.is-active,.invalid){--spr-tabs-link-color: var(--brd-text-hover-800);--spr-tabs-link-background: transparent}.tab-header-link:focus-visible{box-shadow:none;outline:none}.tab-header-link:focus-visible:not(.is-active,.invalid){--spr-tabs-link-color: var(--brd-text-pressed-600)}:host-context(.tabs--level-first) .tab-header-link{border:1px solid transparent;margin-bottom:-1px;border-top-left-radius:var(--spr-border-radius-m);border-top-right-radius:var(--spr-border-radius-m);font-weight:var(--spr-font-weight-medium)}:host-context(.tabs--level-first) .tab-header-link.is-active{--spr-tabs-link-background: var(--spr-tabs-level-first-link-background-active);border-color:var(--spr-tabs-level-first-link-border-color-active)}:host-context(.tabs--level-first) .tab-header-link:hover:not(.is-active){--spr-tabs-link-background: var(--spr-tabs-level-first-link-background-hover);border-color:var(--spr-tabs-level-first-link-border-color-hover)}:host-context(.tabs--level-first) .tab-header-link:focus-visible:not(.is-active){--spr-tabs-link-background: var(--spr-tabs-level-first-link-background-focus);border-color:var(--spr-tabs-level-first-link-border-color-focus)}:host-context(.tabs--level-second) .tab-header-link{position:relative;border-radius:var(--spr-border-radius-m)}:host-context(.tabs--level-second) .tab-header-link:before{content:\"\";position:absolute;inset:auto 0 0;height:2px;background:transparent;border-radius:var(--spr-tabs-level-second-link-border-radius-active);transition:background var(--spr-transition-time) ease}:host-context(.tabs--level-second) .tab-header-link:focus-visible:before,:host-context(.tabs--level-second) .tab-header-link:hover:before,:host-context(.tabs--level-second) .tab-header-link.is-active:before{background:var(--spr-tabs-level-second-link-border-color-active)}:host-context(.tabs--level-third) .tab-header-link{border-radius:var(--spr-border-radius-pill)}:host-context(.tabs--level-third) .tab-header-link.is-active{--spr-tabs-link-background: var(--spr-tabs-level-third-link-background-active)}:host-context(.tabs--level-third) .tab-header-link:focus-visible:not(.is-active),:host-context(.tabs--level-third) .tab-header-link:hover:not(.is-active){--spr-tabs-link-background: var(--spr-tabs-level-third-link-background-hover)}\n"] }]
        }], propDecorators: { isActive: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], isInvalid: [{
                type: Input
            }], routerSettings: [{
                type: Input
            }], clickListener: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

class SprTabContentDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
        this.tabKey = '';
    }
    static ngTemplateContextGuard(directive, context) {
        return true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprTabContentDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: SprTabContentDirective, isStandalone: true, selector: "ng-template[sprTabContent]", inputs: { tabKey: ["sprTabContent", "tabKey"] }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprTabContentDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[sprTabContent]',
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }], propDecorators: { tabKey: [{
                type: Input,
                args: ['sprTabContent']
            }] } });

class SprTabHeaderDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
        this.tabKey = '';
        this.type = 'default';
    }
    static ngTemplateContextGuard(directive, context) {
        return true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprTabHeaderDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: SprTabHeaderDirective, isStandalone: true, selector: "ng-template[sprTabHeader]", inputs: { tabKey: ["sprTabHeader", "tabKey"], type: "type" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprTabHeaderDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[sprTabHeader]',
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }], propDecorators: { tabKey: [{
                type: Input,
                args: ['sprTabHeader']
            }], type: [{
                type: Input
            }] } });

class GetTypedContextPipe {
    transform(config, isActive) {
        return { ...config, isActive };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: GetTypedContextPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.14", ngImport: i0, type: GetTypedContextPipe, isStandalone: true, name: "getTypedContext" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: GetTypedContextPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'getTypedContext',
                    standalone: true,
                }]
        }] });

class TabContentByTabKeyPipe {
    transform(tabKey, tabContentTemplates) {
        return tabContentTemplates.find((item) => item.tabKey === tabKey)?.templateRef;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: TabContentByTabKeyPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.14", ngImport: i0, type: TabContentByTabKeyPipe, isStandalone: true, name: "tabContentByTabKey" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: TabContentByTabKeyPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'tabContentByTabKey',
                    standalone: true,
                }]
        }] });

class TabHeaderByTabKeyPipe {
    transform(tabKey, tabHeaderTemplates) {
        return tabHeaderTemplates.find((item) => item.tabKey === tabKey)?.templateRef;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: TabHeaderByTabKeyPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.14", ngImport: i0, type: TabHeaderByTabKeyPipe, isStandalone: true, name: "tabHeaderByTabKey" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: TabHeaderByTabKeyPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'tabHeaderByTabKey',
                    standalone: true,
                }]
        }] });

class SprTabsComponent {
    constructor(router, destroyRef) {
        this.router = router;
        this.destroyRef = destroyRef;
        this.orientation = 'horizontal';
        this.variant = 'tabs--level-first';
        this.type = 'default';
        this.isTransparentBg = false;
        this.destroyOnHide = false;
        this.animation = true;
        this.isSticky = false;
        this.tabsConfig = [];
        this.setSelectedTab = new EventEmitter();
    }
    ngOnChanges(changes) {
        if (changes && changes['activeId'] && this.ngbNav) {
            this.select(changes['activeId'].currentValue);
        }
        if (changes && changes['tabsConfig']?.currentValue?.length && !this.activeId && this.type === 'default') {
            // To select first item if no activeId was provided, because first tab not each time selecting automatically by nbgNav
            this.activeId = this.tabsConfig?.[0].tabKey;
        }
    }
    ngOnInit() {
        if (this.type === 'withRouting') {
            requestAnimationFrame(() => {
                this.setSelectedTabByUrl();
            });
        }
        this.subscribeToRouterEvents();
    }
    onSetSelectedTab(event) {
        if (this.activeId === event) {
            return;
        }
        this.activeId = event;
        this.setSelectedTab.emit(event);
    }
    select(id) {
        this.ngbNav?.select(id);
    }
    setSelectedTabByUrl() {
        this.tabsConfig.forEach((config) => {
            const { routerSettings } = config;
            if (!routerSettings.routerLink || !this.ngbNav || this.activeId === config.tabKey) {
                return;
            }
            if (typeof routerSettings.routerLink === 'string' && this.router.url.includes(routerSettings.routerLink)) {
                this.ngbNav.select(config.tabKey);
            }
            else if (Array.isArray(routerSettings.routerLink) && this.router.url.includes(routerSettings.routerLink[0])) {
                this.ngbNav.select(config.tabKey);
            }
        });
    }
    subscribeToRouterEvents() {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd || event instanceof NavigationCancel), takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.setSelectedTabByUrl());
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprTabsComponent, deps: [{ token: i1$3.Router }, { token: i0.DestroyRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: SprTabsComponent, isStandalone: true, selector: "spr-tabs", inputs: { orientation: "orientation", variant: "variant", type: "type", isTransparentBg: "isTransparentBg", destroyOnHide: "destroyOnHide", animation: "animation", isSticky: "isSticky", activeId: "activeId", tabsConfig: "tabsConfig" }, outputs: { setSelectedTab: "setSelectedTab" }, queries: [{ propertyName: "tabHeaderTemplates", predicate: SprTabHeaderDirective }, { propertyName: "tabContentTemplates", predicate: SprTabContentDirective }], viewQueries: [{ propertyName: "ngbNav", first: true, predicate: NgbNav, descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<div\n  class=\"tabs\"\n  [ngClass]=\"{ 'sticky-tabs': isSticky && variant === 'tabs--level-first' }\">\n  <ul\n    ngbNav\n    #mainNav=\"ngbNav\"\n    [destroyOnHide]=\"destroyOnHide\"\n    [orientation]=\"orientation\"\n    [animation]=\"animation\"\n    [ngClass]=\"variant\"\n    [activeId]=\"activeId\"\n    (activeIdChange)=\"onSetSelectedTab($event)\">\n    <ng-container *ngFor=\"let tabConfig of tabsConfig\">\n      <li\n        [destroyOnHide]=\"tabConfig.destroyOnHide\"\n        [ngbNavItem]=\"tabConfig.tabKey\"\n        class=\"nav-item\">\n        <!-- HEADER DEFINITION -->\n        <a ngbNavLink>\n          <ng-container\n            [ngTemplateOutlet]=\"(tabConfig.tabKey | tabHeaderByTabKey: tabHeaderTemplates) ?? defaultHeaderTemplate\"\n            [ngTemplateOutletContext]=\"{ $implicit: tabConfig | getTypedContext: mainNav.activeId === tabConfig.tabKey }\"></ng-container>\n        </a>\n\n        <!-- CONTENT DEFINITION -->\n        <ng-template ngbNavContent>\n          <ng-container\n            [ngTemplateOutlet]=\"(tabConfig.tabKey | tabContentByTabKey: tabContentTemplates) ?? defaultContentTemplate\"\n            [ngTemplateOutletContext]=\"{ $implicit: tabConfig | getTypedContext: mainNav.activeId === tabConfig.tabKey }\"></ng-container>\n        </ng-template>\n      </li>\n    </ng-container>\n  </ul>\n</div>\n\n<!--\n  Changed to fix a strange bug, if [ngbNavOutlet] is inside the ng-template,\n  then tabContent is not displaying on init and requires click on different tab to show the content.\n-->\n<div\n  [class.tab-content--transparent]=\"isTransparentBg\"\n  [hidden]=\"type === 'withRouting'\"\n  [ngbNavOutlet]=\"mainNav\"></div>\n\n<!--CONTAINER WHERE CONTENT INSERTS-->\n<div\n  *ngIf=\"type === 'withRouting'\"\n  [class.tab-content--transparent]=\"isTransparentBg\"\n  class=\"tab-content\">\n  <router-outlet></router-outlet>\n</div>\n\n<!-- TEMPLATES -->\n<ng-template\n  #defaultHeaderTemplate\n  let-tabConfig>\n  <spr-tab-header [isActive]=\"tabConfig.isActive\">\n    {{ tabConfig.text }}\n  </spr-tab-header>\n</ng-template>\n\n<ng-template\n  #defaultContentTemplate\n  let-tabConfig>\n  <span>Template by tabKey: '{{ tabConfig.tabKey }}' has not been found!</span>\n</ng-template>\n", styles: [":host{--spr-tab-content-background: var(--brd-fill-default-0);--spr-tab-content-background-transparent: transparent;--spr-tabs-container-height: 52px;display:flex;flex-direction:column;flex-grow:1}.tabs{display:grid;overflow:auto hidden}.tabs:has(.tabs--level-third){padding-inline:16px}.tabs.sticky-tabs{position:sticky;top:0;z-index:1054;height:var(--spr-tabs-container-height)}.tab-content{flex-grow:1;padding:0;background:var(--spr-tab-content-background)}.tab-content--transparent{background:var(--spr-tab-content-background-transparent)}.nav-link{display:block}.nav-link:focus-visible{box-shadow:none;outline:none}.tabs--level-first,.tabs--level-second,.tabs--level-third{display:flex;flex-wrap:nowrap;margin-bottom:0;list-style:none}.tabs--level-first{--spr-tabs-level-first-background: var(--brd-fill-default-100);--spr-tabs-level-first-border-bottom-color: var(--brd-border-default-300);--spr-tabs-level-first-link-background-hover: var(--brd-fill-hover-200);--spr-tabs-level-first-link-background-focus: var(--brd-fill-pressed-200);--spr-tabs-level-first-link-background-active: var(--brd-fill-active-0);--spr-tabs-level-first-link-border-color-hover: transparent transparent var(--brd-border-hover-300);--spr-tabs-level-first-link-border-color-focus: transparent;--spr-tabs-level-first-link-border-color-active: var(--brd-border-active-300) var(--brd-border-active-300) var(--brd-border-default-0);--spr-tabs-link-padding-block: 9px;--spr-tabs-link-padding-inline: 15px;padding:12px 16px 0;background:var(--spr-tabs-level-first-background);border-bottom:1px solid var(--spr-tabs-level-first-border-bottom-color)}.tabs--level-second{--spr-tabs-level-second-border-bottom-color: var(--brd-border-default-300);--spr-tabs-level-second-link-border-radius-active: 2px 2px 0 0;--spr-tabs-level-second-link-border-color-active: var(--brd-fill-accent-active-base);--spr-tabs-link-padding-block: 11px;--spr-tabs-link-padding-inline: 16px;padding:9px 16px 0;border-bottom:1px solid var(--spr-tabs-level-second-border-bottom-color)}.tabs--level-third{--spr-tabs-level-third-link-background-hover: var(--brd-fill-hover-200);--spr-tabs-level-third-link-background-active: var(--brd-fill-default-0);--spr-tabs-link-padding-block: 4px;--spr-tabs-link-padding-inline: 12px;border-radius:var(--spr-border-radius-pill);border:1px solid var(--brd-border-default-300);background:var(--brd-fill-default-100);width:fit-content;padding-left:0}\n"], dependencies: [{ kind: "component", type: 
                // Components
                SprTabHeaderComponent, selector: "spr-tab-header", inputs: ["isActive", "isDisabled", "isInvalid", "routerSettings"] }, { kind: "directive", type: RouterOutlet, selector: "router-outlet", inputs: ["name", "routerOutletData"], outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }, { kind: "directive", type: 
                // Directives
                NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: NgbNavContent, selector: "ng-template[ngbNavContent]" }, { kind: "component", type: NgbNavOutlet, selector: "[ngbNavOutlet]", inputs: ["paneRole", "ngbNavOutlet"] }, { kind: "directive", type: NgbNavLink, selector: "a[ngbNavLink]" }, { kind: "directive", type: NgbNavItem, selector: "[ngbNavItem]", inputs: ["destroyOnHide", "disabled", "domId", "ngbNavItem"], outputs: ["shown", "hidden"], exportAs: ["ngbNavItem"] }, { kind: "directive", type: NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: NgbNav, selector: "[ngbNav]", inputs: ["activeId", "animation", "destroyOnHide", "orientation", "roles", "keyboard"], outputs: ["activeIdChange", "shown", "hidden", "navChange"], exportAs: ["ngbNav"] }, { kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: 
                // Pipes
                TabContentByTabKeyPipe, name: "tabContentByTabKey" }, { kind: "pipe", type: TabHeaderByTabKeyPipe, name: "tabHeaderByTabKey" }, { kind: "pipe", type: GetTypedContextPipe, name: "getTypedContext" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprTabsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-tabs', imports: [
                        // Components
                        SprTabHeaderComponent,
                        RouterOutlet,
                        // Directives
                        NgTemplateOutlet,
                        NgbNavContent,
                        NgbNavOutlet,
                        NgbNavLink,
                        NgbNavItem,
                        NgForOf,
                        NgClass,
                        NgbNav,
                        NgIf,
                        // Pipes
                        TabContentByTabKeyPipe,
                        TabHeaderByTabKeyPipe,
                        GetTypedContextPipe,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"tabs\"\n  [ngClass]=\"{ 'sticky-tabs': isSticky && variant === 'tabs--level-first' }\">\n  <ul\n    ngbNav\n    #mainNav=\"ngbNav\"\n    [destroyOnHide]=\"destroyOnHide\"\n    [orientation]=\"orientation\"\n    [animation]=\"animation\"\n    [ngClass]=\"variant\"\n    [activeId]=\"activeId\"\n    (activeIdChange)=\"onSetSelectedTab($event)\">\n    <ng-container *ngFor=\"let tabConfig of tabsConfig\">\n      <li\n        [destroyOnHide]=\"tabConfig.destroyOnHide\"\n        [ngbNavItem]=\"tabConfig.tabKey\"\n        class=\"nav-item\">\n        <!-- HEADER DEFINITION -->\n        <a ngbNavLink>\n          <ng-container\n            [ngTemplateOutlet]=\"(tabConfig.tabKey | tabHeaderByTabKey: tabHeaderTemplates) ?? defaultHeaderTemplate\"\n            [ngTemplateOutletContext]=\"{ $implicit: tabConfig | getTypedContext: mainNav.activeId === tabConfig.tabKey }\"></ng-container>\n        </a>\n\n        <!-- CONTENT DEFINITION -->\n        <ng-template ngbNavContent>\n          <ng-container\n            [ngTemplateOutlet]=\"(tabConfig.tabKey | tabContentByTabKey: tabContentTemplates) ?? defaultContentTemplate\"\n            [ngTemplateOutletContext]=\"{ $implicit: tabConfig | getTypedContext: mainNav.activeId === tabConfig.tabKey }\"></ng-container>\n        </ng-template>\n      </li>\n    </ng-container>\n  </ul>\n</div>\n\n<!--\n  Changed to fix a strange bug, if [ngbNavOutlet] is inside the ng-template,\n  then tabContent is not displaying on init and requires click on different tab to show the content.\n-->\n<div\n  [class.tab-content--transparent]=\"isTransparentBg\"\n  [hidden]=\"type === 'withRouting'\"\n  [ngbNavOutlet]=\"mainNav\"></div>\n\n<!--CONTAINER WHERE CONTENT INSERTS-->\n<div\n  *ngIf=\"type === 'withRouting'\"\n  [class.tab-content--transparent]=\"isTransparentBg\"\n  class=\"tab-content\">\n  <router-outlet></router-outlet>\n</div>\n\n<!-- TEMPLATES -->\n<ng-template\n  #defaultHeaderTemplate\n  let-tabConfig>\n  <spr-tab-header [isActive]=\"tabConfig.isActive\">\n    {{ tabConfig.text }}\n  </spr-tab-header>\n</ng-template>\n\n<ng-template\n  #defaultContentTemplate\n  let-tabConfig>\n  <span>Template by tabKey: '{{ tabConfig.tabKey }}' has not been found!</span>\n</ng-template>\n", styles: [":host{--spr-tab-content-background: var(--brd-fill-default-0);--spr-tab-content-background-transparent: transparent;--spr-tabs-container-height: 52px;display:flex;flex-direction:column;flex-grow:1}.tabs{display:grid;overflow:auto hidden}.tabs:has(.tabs--level-third){padding-inline:16px}.tabs.sticky-tabs{position:sticky;top:0;z-index:1054;height:var(--spr-tabs-container-height)}.tab-content{flex-grow:1;padding:0;background:var(--spr-tab-content-background)}.tab-content--transparent{background:var(--spr-tab-content-background-transparent)}.nav-link{display:block}.nav-link:focus-visible{box-shadow:none;outline:none}.tabs--level-first,.tabs--level-second,.tabs--level-third{display:flex;flex-wrap:nowrap;margin-bottom:0;list-style:none}.tabs--level-first{--spr-tabs-level-first-background: var(--brd-fill-default-100);--spr-tabs-level-first-border-bottom-color: var(--brd-border-default-300);--spr-tabs-level-first-link-background-hover: var(--brd-fill-hover-200);--spr-tabs-level-first-link-background-focus: var(--brd-fill-pressed-200);--spr-tabs-level-first-link-background-active: var(--brd-fill-active-0);--spr-tabs-level-first-link-border-color-hover: transparent transparent var(--brd-border-hover-300);--spr-tabs-level-first-link-border-color-focus: transparent;--spr-tabs-level-first-link-border-color-active: var(--brd-border-active-300) var(--brd-border-active-300) var(--brd-border-default-0);--spr-tabs-link-padding-block: 9px;--spr-tabs-link-padding-inline: 15px;padding:12px 16px 0;background:var(--spr-tabs-level-first-background);border-bottom:1px solid var(--spr-tabs-level-first-border-bottom-color)}.tabs--level-second{--spr-tabs-level-second-border-bottom-color: var(--brd-border-default-300);--spr-tabs-level-second-link-border-radius-active: 2px 2px 0 0;--spr-tabs-level-second-link-border-color-active: var(--brd-fill-accent-active-base);--spr-tabs-link-padding-block: 11px;--spr-tabs-link-padding-inline: 16px;padding:9px 16px 0;border-bottom:1px solid var(--spr-tabs-level-second-border-bottom-color)}.tabs--level-third{--spr-tabs-level-third-link-background-hover: var(--brd-fill-hover-200);--spr-tabs-level-third-link-background-active: var(--brd-fill-default-0);--spr-tabs-link-padding-block: 4px;--spr-tabs-link-padding-inline: 12px;border-radius:var(--spr-border-radius-pill);border:1px solid var(--brd-border-default-300);background:var(--brd-fill-default-100);width:fit-content;padding-left:0}\n"] }]
        }], ctorParameters: () => [{ type: i1$3.Router }, { type: i0.DestroyRef }], propDecorators: { orientation: [{
                type: Input
            }], variant: [{
                type: Input
            }], type: [{
                type: Input
            }], isTransparentBg: [{
                type: Input
            }], destroyOnHide: [{
                type: Input
            }], animation: [{
                type: Input
            }], isSticky: [{
                type: Input
            }], activeId: [{
                type: Input
            }], tabsConfig: [{
                type: Input
            }], tabHeaderTemplates: [{
                type: ContentChildren,
                args: [SprTabHeaderDirective]
            }], tabContentTemplates: [{
                type: ContentChildren,
                args: [SprTabContentDirective]
            }], setSelectedTab: [{
                type: Output
            }], ngbNav: [{
                type: ViewChild,
                args: [NgbNav, { static: true }]
            }] } });

class SprTextareaComponent extends BaseControl {
    constructor() {
        super(...arguments);
        this.maxTextareaLength = null;
        this.placeholder = '';
        this.rowsCount = 3;
    }
    focus() {
        this.textareaElement.nativeElement.focus();
    }
    initControl() {
        return this.formBuilder.nonNullable.control('');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprTextareaComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: SprTextareaComponent, isStandalone: true, selector: "spr-textarea", inputs: { maxTextareaLength: "maxTextareaLength", placeholder: "placeholder", rowsCount: "rowsCount" }, viewQueries: [{ propertyName: "textareaElement", first: true, predicate: ["textareaElement"], descendants: true, read: ElementRef }], usesInheritance: true, ngImport: i0, template: "<textarea\n  #textareaElement\n  (blur)=\"cvaOnTouched()\"\n  [class.control-form--colored]=\"isColored\"\n  [class.is-invalid]=\"isInvalidControl\"\n  [sprControlSize]=\"controlSize\"\n  [placeholder]=\"placeholder\"\n  [formControl]=\"control\"\n  [sprLabel]=\"label\"\n  sprLabelPosition=\"start\"\n  [tooltip]=\"tooltip\"\n  [inputId]=\"inputId()\"\n  [id]=\"inputId()\"\n  [name]=\"inputId()\"\n  [rows]=\"rowsCount\"\n  autocomplete=\"off\"\n  class=\"form-field-textarea\"></textarea>\n\n<div class=\"form-field-description\">\n  <div class=\"form-field-description__container\">\n    <spr-field-description *ngIf=\"description && !isInvalidControl\">\n      {{ description }}\n    </spr-field-description>\n\n    <spr-error *ngIf=\"isInvalidControl\">\n      {{ ngControl?.control?.errors | getControlErrorMessage: errorMessagesConfig }}\n    </spr-error>\n  </div>\n\n  <span\n    *ngIf=\"maxTextareaLength\"\n    class=\"form-field-textarea__count\"\n    >{{ (control.value?.length || 0) + '/' + maxTextareaLength }}</span\n  >\n</div>\n", styles: [".text-body-xxxl{font-size:var(--spr-font-size-32);line-height:var(--spr-line-height-40)}.text-body-xxl{font-size:var(--spr-font-size-24);line-height:var(--spr-line-height-32)}.text-body-xl{font-size:var(--spr-font-size-20);line-height:var(--spr-line-height-24)}.text-body-l{font-size:var(--spr-font-size-16);line-height:var(--spr-line-height-20)}.text-body-m{font-size:var(--spr-font-size-15);line-height:var(--spr-line-height-20)}.text-body-s{font-size:var(--spr-font-size-14);line-height:var(--spr-line-height-20)}.text-body-xs{font-size:var(--spr-font-size-12);line-height:var(--spr-line-height-16)}.text-body-xs-uppercase{font-size:var(--spr-font-size-13);line-height:var(--spr-line-height-20);text-transform:uppercase}:host{--brd-input-description-custom-color: var(--brd-text-primary-800);display:block}.form-field-textarea{--spr-form-field-textarea-radius: var(--spr-control-radius);--spr-form-field-textarea-bg: var(--brd-fill-default-0);--spr-form-field-textarea-bg-disabled: var(--brd-fill-disabled-250);--spr-form-field-textarea-border-color: var(--brd-border-default-400);--spr-form-field-textarea-border-color-invalid: var(--brd-border-destructive-600);--spr-form-field-textarea-border-color-hover: var(--brd-fill-accent-hover-base);--spr-form-field-textarea-color: var(--brd-text-default-800);--spr-form-field-placeholder-color: var(--brd-text-secondary-500);font-size:var(--spr-font-size-14);line-height:var(--spr-line-height-20);display:block;width:100%;padding:12px 8px;border:1px solid var(--spr-form-field-textarea-border-color);border-radius:var(--spr-form-field-textarea-radius);box-shadow:0 1px 2px rgb(var(--brd-black)/.05);outline:none;background-color:var(--spr-form-field-textarea-bg);color:var(--spr-form-field-textarea-color);transition:border var(--spr-transition-time) ease}.form-field-textarea:hover,.form-field-textarea:focus{border-color:var(--spr-form-field-textarea-border-color-hover)}.form-field-textarea.is-invalid{border-color:var(--spr-form-field-textarea-border-color-invalid)}.form-field-textarea:disabled{background-color:var(--spr-form-field-textarea-bg-disabled);border-color:var(--spr-form-field-textarea-border-color);resize:none}.form-field-textarea.control-form--large{font-size:var(--spr-control-font-size-lg)}.form-field-textarea__count{font-size:var(--spr-font-size-14);line-height:var(--spr-line-height-20);display:block;text-align:right;color:var(--brd-text-secondary-500)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "pipe", type: GetControlErrorMessagePipe, name: "getControlErrorMessage" }, { kind: "directive", type: SprControlSizeDirective, selector: "[sprControlSize]", inputs: ["sprControlSize"] }, { kind: "component", type: SprErrorComponent, selector: "spr-error" }, { kind: "component", type: SprFieldDescriptionComponent, selector: "spr-field-description" }, { kind: "directive", type: SprLabelDirective, selector: "[sprLabel]", inputs: ["shouldStopLabelClickEventPropagation", "sprLabel", "sprLabelPosition", "sprLabelClass", "sprLabelIsInline", "sprLabelLeftIcon", "sprLabelRightIcon", "tooltip", "inputId"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprTextareaComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-textarea', imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        GetControlErrorMessagePipe,
                        SprControlSizeDirective,
                        SprErrorComponent,
                        SprFieldDescriptionComponent,
                        SprLabelDirective,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<textarea\n  #textareaElement\n  (blur)=\"cvaOnTouched()\"\n  [class.control-form--colored]=\"isColored\"\n  [class.is-invalid]=\"isInvalidControl\"\n  [sprControlSize]=\"controlSize\"\n  [placeholder]=\"placeholder\"\n  [formControl]=\"control\"\n  [sprLabel]=\"label\"\n  sprLabelPosition=\"start\"\n  [tooltip]=\"tooltip\"\n  [inputId]=\"inputId()\"\n  [id]=\"inputId()\"\n  [name]=\"inputId()\"\n  [rows]=\"rowsCount\"\n  autocomplete=\"off\"\n  class=\"form-field-textarea\"></textarea>\n\n<div class=\"form-field-description\">\n  <div class=\"form-field-description__container\">\n    <spr-field-description *ngIf=\"description && !isInvalidControl\">\n      {{ description }}\n    </spr-field-description>\n\n    <spr-error *ngIf=\"isInvalidControl\">\n      {{ ngControl?.control?.errors | getControlErrorMessage: errorMessagesConfig }}\n    </spr-error>\n  </div>\n\n  <span\n    *ngIf=\"maxTextareaLength\"\n    class=\"form-field-textarea__count\"\n    >{{ (control.value?.length || 0) + '/' + maxTextareaLength }}</span\n  >\n</div>\n", styles: [".text-body-xxxl{font-size:var(--spr-font-size-32);line-height:var(--spr-line-height-40)}.text-body-xxl{font-size:var(--spr-font-size-24);line-height:var(--spr-line-height-32)}.text-body-xl{font-size:var(--spr-font-size-20);line-height:var(--spr-line-height-24)}.text-body-l{font-size:var(--spr-font-size-16);line-height:var(--spr-line-height-20)}.text-body-m{font-size:var(--spr-font-size-15);line-height:var(--spr-line-height-20)}.text-body-s{font-size:var(--spr-font-size-14);line-height:var(--spr-line-height-20)}.text-body-xs{font-size:var(--spr-font-size-12);line-height:var(--spr-line-height-16)}.text-body-xs-uppercase{font-size:var(--spr-font-size-13);line-height:var(--spr-line-height-20);text-transform:uppercase}:host{--brd-input-description-custom-color: var(--brd-text-primary-800);display:block}.form-field-textarea{--spr-form-field-textarea-radius: var(--spr-control-radius);--spr-form-field-textarea-bg: var(--brd-fill-default-0);--spr-form-field-textarea-bg-disabled: var(--brd-fill-disabled-250);--spr-form-field-textarea-border-color: var(--brd-border-default-400);--spr-form-field-textarea-border-color-invalid: var(--brd-border-destructive-600);--spr-form-field-textarea-border-color-hover: var(--brd-fill-accent-hover-base);--spr-form-field-textarea-color: var(--brd-text-default-800);--spr-form-field-placeholder-color: var(--brd-text-secondary-500);font-size:var(--spr-font-size-14);line-height:var(--spr-line-height-20);display:block;width:100%;padding:12px 8px;border:1px solid var(--spr-form-field-textarea-border-color);border-radius:var(--spr-form-field-textarea-radius);box-shadow:0 1px 2px rgb(var(--brd-black)/.05);outline:none;background-color:var(--spr-form-field-textarea-bg);color:var(--spr-form-field-textarea-color);transition:border var(--spr-transition-time) ease}.form-field-textarea:hover,.form-field-textarea:focus{border-color:var(--spr-form-field-textarea-border-color-hover)}.form-field-textarea.is-invalid{border-color:var(--spr-form-field-textarea-border-color-invalid)}.form-field-textarea:disabled{background-color:var(--spr-form-field-textarea-bg-disabled);border-color:var(--spr-form-field-textarea-border-color);resize:none}.form-field-textarea.control-form--large{font-size:var(--spr-control-font-size-lg)}.form-field-textarea__count{font-size:var(--spr-font-size-14);line-height:var(--spr-line-height-20);display:block;text-align:right;color:var(--brd-text-secondary-500)}\n"] }]
        }], propDecorators: { maxTextareaLength: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], rowsCount: [{
                type: Input
            }], textareaElement: [{
                type: ViewChild,
                args: ['textareaElement', { read: ElementRef }]
            }] } });

class SprTwoOptionsSwitcherComponent extends BaseControl {
    constructor() {
        super(...arguments);
        this.labelStart = input('');
        this.labelEnd = input('');
        this.tooltipStart = input('');
        this.tooltipEnd = input('');
        this.startValue = input(false);
        this.endValue = input(true);
    }
    controlToggle(value) {
        if (this.control.disabled) {
            return;
        }
        this.control.patchValue(value);
    }
    writeValue(value) {
        const map = new Map([
            [this.startValue(), false],
            [this.endValue(), true],
        ]);
        this.control.setValue(map.get(value) ?? false, { emitEvent: false });
        this.cdRef.markForCheck();
    }
    initControlListener() {
        const map = new Map([
            [false, this.startValue()],
            [true, this.endValue()],
        ]);
        this.control.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((v) => {
            this.cvaOnChange(map.get(v) ?? this.startValue());
        });
    }
    initControl() {
        return this.formBuilder.nonNullable.control(false);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprTwoOptionsSwitcherComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "19.2.14", type: SprTwoOptionsSwitcherComponent, isStandalone: true, selector: "spr-two-options-switcher", inputs: { labelStart: { classPropertyName: "labelStart", publicName: "labelStart", isSignal: true, isRequired: false, transformFunction: null }, labelEnd: { classPropertyName: "labelEnd", publicName: "labelEnd", isSignal: true, isRequired: false, transformFunction: null }, tooltipStart: { classPropertyName: "tooltipStart", publicName: "tooltipStart", isSignal: true, isRequired: false, transformFunction: null }, tooltipEnd: { classPropertyName: "tooltipEnd", publicName: "tooltipEnd", isSignal: true, isRequired: false, transformFunction: null }, startValue: { classPropertyName: "startValue", publicName: "startValue", isSignal: true, isRequired: false, transformFunction: null }, endValue: { classPropertyName: "endValue", publicName: "endValue", isSignal: true, isRequired: false, transformFunction: null } }, usesInheritance: true, ngImport: i0, template: "<div\n  class=\"two-options-switcher-control\"\n  [class.disabled]=\"control.disabled\">\n  <div class=\"two-options-switcher-control__holder\">\n    <spr-label\n      [class.label-active]=\"!control.value\"\n      [inputId]=\"inputId + '-start'\"\n      [tooltip]=\"tooltipStart()\"\n      [label]=\"labelStart()\"\n      (click)=\"controlToggle(false)\">\n    </spr-label>\n\n    <label class=\"two-options-switcher-control__toggle\">\n      <input\n        class=\"form-two-options-switcher\"\n        type=\"checkbox\"\n        [formControl]=\"control\"\n        [attr.name]=\"inputId()\"\n        [attr.id]=\"inputId()\"\n        (blur)=\"cvaOnTouched()\" />\n      <span class=\"slider\"></span>\n    </label>\n\n    <spr-label\n      [class.label-active]=\"control.value\"\n      [inputId]=\"inputId + '-end'\"\n      [tooltip]=\"tooltipEnd()\"\n      [label]=\"labelEnd()\"\n      (click)=\"controlToggle(true)\">\n    </spr-label>\n  </div>\n</div>\n", styles: [":host{display:block;line-height:1}.form-two-options-switcher{--spr-two-options-switcher-background: var(--brd-fill-default-300);--spr-two-options-switcher-background-disabled: var(--brd-border-disabled-300);--spr-two-options-switcher-box-shadow-focus: 0 0 0 4px var(--brd-fill-accent-focus);--spr-two-options-switcher-thumb-border-color: var(--brd-border-default-500);--spr-two-options-switcher-thumb-border-color-hover: var(--brd-border-hover-600);--spr-two-options-switcher-thumb-border-color-active: var(--brd-border-pressed-400);--spr-two-options-switcher-thumb-border-color-disabled: var(--brd-fill-disabled-250);--spr-two-options-switcher-thumb-background: var(--brd-fill-default-0);--spr-two-options-switcher-thumb-background-disabled: var(--brd-fill-disabled-250);--spr-two-options-switcher-thumb-box-shadow: 0 1px 2px 0 rgb(var(--brd-black) / .05);width:36px;height:7px;margin:0;position:relative;cursor:pointer;appearance:none;background:var(--spr-two-options-switcher-background);border-radius:var(--spr-border-radius-pill);transition:background .15s ease-in-out;grid-area:switcher}.form-two-options-switcher:after{position:absolute;left:0;top:50%;content:\"\";width:20px;height:20px;border:1px solid var(--spr-two-options-switcher-thumb-border-color);background:var(--spr-two-options-switcher-thumb-background);box-shadow:var(--spr-two-options-switcher-thumb-box-shadow);border-radius:var(--spr-border-radius-pill);transform:translate(0) translateY(-50%);transition:transform .15s ease-in-out,border .15s ease-in-out;z-index:1}.form-two-options-switcher:hover:not(:disabled,:focus-visible):after{--spr-two-options-switcher-thumb-border-color: var(--spr-two-options-switcher-thumb-border-color-hover)}.form-two-options-switcher:focus-visible{outline:none}.form-two-options-switcher:focus-visible:after{--spr-two-options-switcher-thumb-box-shadow: var(--spr-two-options-switcher-box-shadow-focus)}.form-two-options-switcher:active:not(:disabled,:focus-visible):after{--spr-two-options-switcher-thumb-border-color: var(--spr-two-options-switcher-thumb-border-color-active);--spr-two-options-switcher-thumb-box-shadow: none}.form-two-options-switcher:disabled{--spr-two-options-switcher-background: var(--spr-two-options-switcher-background-disabled);pointer-events:none}.form-two-options-switcher:disabled:after{--spr-two-options-switcher-thumb-background: var(--spr-two-options-switcher-thumb-background-disabled);--spr-two-options-switcher-thumb-border-color: var(--spr-two-options-switcher-thumb-border-color-disabled)}.form-two-options-switcher:checked:after{transform:translate(calc(100% - 4px)) translateY(-50%)}.two-options-switcher-control__holder{--spr-custom-label-cursor: pointer;display:flex;gap:12px;align-items:center;width:100%}.two-options-switcher-control__holder:has(.form-two-options-switcher:disabled){--spr-custom-lable-cursor: default;--spr-custom-label-pointer-events: none}.two-options-switcher-control__toggle{display:flex;align-items:center}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: NgbTooltipModule }, { kind: "component", type: SprLabelComponent, selector: "spr-label", inputs: ["label", "inputId", "tooltip", "leftIcon", "rightIcon", "className", "isLabelReverse", "shouldStopLabelClickEventPropagation", "isInline"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprTwoOptionsSwitcherComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-two-options-switcher', imports: [CommonModule, ReactiveFormsModule, NgbTooltipModule, SprLabelComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"two-options-switcher-control\"\n  [class.disabled]=\"control.disabled\">\n  <div class=\"two-options-switcher-control__holder\">\n    <spr-label\n      [class.label-active]=\"!control.value\"\n      [inputId]=\"inputId + '-start'\"\n      [tooltip]=\"tooltipStart()\"\n      [label]=\"labelStart()\"\n      (click)=\"controlToggle(false)\">\n    </spr-label>\n\n    <label class=\"two-options-switcher-control__toggle\">\n      <input\n        class=\"form-two-options-switcher\"\n        type=\"checkbox\"\n        [formControl]=\"control\"\n        [attr.name]=\"inputId()\"\n        [attr.id]=\"inputId()\"\n        (blur)=\"cvaOnTouched()\" />\n      <span class=\"slider\"></span>\n    </label>\n\n    <spr-label\n      [class.label-active]=\"control.value\"\n      [inputId]=\"inputId + '-end'\"\n      [tooltip]=\"tooltipEnd()\"\n      [label]=\"labelEnd()\"\n      (click)=\"controlToggle(true)\">\n    </spr-label>\n  </div>\n</div>\n", styles: [":host{display:block;line-height:1}.form-two-options-switcher{--spr-two-options-switcher-background: var(--brd-fill-default-300);--spr-two-options-switcher-background-disabled: var(--brd-border-disabled-300);--spr-two-options-switcher-box-shadow-focus: 0 0 0 4px var(--brd-fill-accent-focus);--spr-two-options-switcher-thumb-border-color: var(--brd-border-default-500);--spr-two-options-switcher-thumb-border-color-hover: var(--brd-border-hover-600);--spr-two-options-switcher-thumb-border-color-active: var(--brd-border-pressed-400);--spr-two-options-switcher-thumb-border-color-disabled: var(--brd-fill-disabled-250);--spr-two-options-switcher-thumb-background: var(--brd-fill-default-0);--spr-two-options-switcher-thumb-background-disabled: var(--brd-fill-disabled-250);--spr-two-options-switcher-thumb-box-shadow: 0 1px 2px 0 rgb(var(--brd-black) / .05);width:36px;height:7px;margin:0;position:relative;cursor:pointer;appearance:none;background:var(--spr-two-options-switcher-background);border-radius:var(--spr-border-radius-pill);transition:background .15s ease-in-out;grid-area:switcher}.form-two-options-switcher:after{position:absolute;left:0;top:50%;content:\"\";width:20px;height:20px;border:1px solid var(--spr-two-options-switcher-thumb-border-color);background:var(--spr-two-options-switcher-thumb-background);box-shadow:var(--spr-two-options-switcher-thumb-box-shadow);border-radius:var(--spr-border-radius-pill);transform:translate(0) translateY(-50%);transition:transform .15s ease-in-out,border .15s ease-in-out;z-index:1}.form-two-options-switcher:hover:not(:disabled,:focus-visible):after{--spr-two-options-switcher-thumb-border-color: var(--spr-two-options-switcher-thumb-border-color-hover)}.form-two-options-switcher:focus-visible{outline:none}.form-two-options-switcher:focus-visible:after{--spr-two-options-switcher-thumb-box-shadow: var(--spr-two-options-switcher-box-shadow-focus)}.form-two-options-switcher:active:not(:disabled,:focus-visible):after{--spr-two-options-switcher-thumb-border-color: var(--spr-two-options-switcher-thumb-border-color-active);--spr-two-options-switcher-thumb-box-shadow: none}.form-two-options-switcher:disabled{--spr-two-options-switcher-background: var(--spr-two-options-switcher-background-disabled);pointer-events:none}.form-two-options-switcher:disabled:after{--spr-two-options-switcher-thumb-background: var(--spr-two-options-switcher-thumb-background-disabled);--spr-two-options-switcher-thumb-border-color: var(--spr-two-options-switcher-thumb-border-color-disabled)}.form-two-options-switcher:checked:after{transform:translate(calc(100% - 4px)) translateY(-50%)}.two-options-switcher-control__holder{--spr-custom-label-cursor: pointer;display:flex;gap:12px;align-items:center;width:100%}.two-options-switcher-control__holder:has(.form-two-options-switcher:disabled){--spr-custom-lable-cursor: default;--spr-custom-label-pointer-events: none}.two-options-switcher-control__toggle{display:flex;align-items:center}\n"] }]
        }] });

var ToastType;
(function (ToastType) {
    ToastType["Success"] = "success";
    ToastType["Danger"] = "danger";
    ToastType["Warning"] = "warning";
    ToastType["Info"] = "info";
})(ToastType || (ToastType = {}));

class SprToastService {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.toastsSubj$ = new BehaviorSubject([]);
        this.toasts$ = this.toastsSubj$.asObservable();
    }
    show(originalMessage, context = null, options = {}) {
        const message = this.sanitizer.bypassSecurityTrustHtml(originalMessage);
        const footerMessage = options.footerMessage ? this.sanitizer.bypassSecurityTrustHtml(options.footerMessage) : null;
        const toastItem = {
            message,
            context,
            options: {
                ...options,
                footerMessage,
            },
        };
        this.toastsSubj$.next([...this.toastsSubj$.getValue(), toastItem]);
    }
    showError(message, options) {
        this.show(message, ToastType.Danger, { ...options, header: 'Error' });
    }
    showWarning(message, options) {
        this.show(message, ToastType.Warning, { ...options, header: 'Warning' });
    }
    showServerError(status, message, options) {
        this.show(message, ToastType.Danger, { ...options, header: `Error status: ${status}` });
    }
    showSuccess(message, options) {
        this.show(message, ToastType.Success, { ...options });
    }
    remove(toast) {
        const filteredToasts = this.toastsSubj$.getValue().filter((t) => t !== toast);
        this.toastsSubj$.next(filteredToasts);
    }
    clear() {
        this.toastsSubj$.next([]);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprToastService, deps: [{ token: i1$4.DomSanitizer }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprToastService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprToastService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i1$4.DomSanitizer }] });

const TOAST_CLASSES_BY_CONTEXT = {
    [ToastType.Success]: 'bg-success',
    [ToastType.Danger]: 'bg-danger',
    [ToastType.Warning]: 'bg-warning',
    [ToastType.Info]: 'bg-info',
};
const TOAST_ICON_BY_TYPE = {
    [ToastType.Success]: 'control-check-circle',
    [ToastType.Danger]: 'general-blocked',
    [ToastType.Warning]: 'general-warning',
    [ToastType.Info]: 'general-info',
};

class SprToastsComponent {
    constructor(toastService) {
        this.toastService = toastService;
        this.classes = TOAST_CLASSES_BY_CONTEXT;
        this.icons = TOAST_ICON_BY_TYPE;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprToastsComponent, deps: [{ token: SprToastService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: SprToastsComponent, isStandalone: true, selector: "spr-toasts", ngImport: i0, template: "@for (toast of (toastService.toasts$ | async) || []; track toast.message) {\n  <ngb-toast\n    [autohide]=\"toast.options.autohide !== false\"\n    [delay]=\"toast.options.delay || 5000\"\n    [class]=\"classes[toast.context]\"\n    (hide)=\"toastService.remove(toast)\"\n    (mouseenter)=\"toast.options.autohide = false\"\n    (mouseleave)=\"toast.options.autohide = true\">\n    <div class=\"toast__content\">\n      <i\n        class=\"toast__icon\"\n        [class]=\"'bo-icon-' + icons[toast.context]\"></i>\n      <span\n        class=\"toast__text\"\n        [innerHTML]=\"toast.message\"></span>\n      <span class=\"toast__close\">\n        <i\n          class=\"bo-icon-control-cross\"\n          (click)=\"toastService.remove(toast)\"></i>\n      </span>\n    </div>\n\n    @if (toast.options.footerMessage) {\n      <div\n        [innerHTML]=\"toast.options.footerMessage\"\n        class=\"toast__footer\"></div>\n    }\n  </ngb-toast>\n}\n", styles: [".text-body-xxxl{font-size:var(--spr-font-size-32);line-height:var(--spr-line-height-40)}.text-body-xxl{font-size:var(--spr-font-size-24);line-height:var(--spr-line-height-32)}.text-body-xl{font-size:var(--spr-font-size-20);line-height:var(--spr-line-height-24)}.text-body-l{font-size:var(--spr-font-size-16);line-height:var(--spr-line-height-20)}.text-body-m{font-size:var(--spr-font-size-15);line-height:var(--spr-line-height-20)}.text-body-s{font-size:var(--spr-font-size-14);line-height:var(--spr-line-height-20)}.text-body-xs{font-size:var(--spr-font-size-12);line-height:var(--spr-line-height-16)}.text-body-xs-uppercase{font-size:var(--spr-font-size-13);line-height:var(--spr-line-height-20);text-transform:uppercase}:host{position:fixed;bottom:8px;left:50%;z-index:12000;transform:translate(-50%);width:100%;max-width:400px;border-radius:var(--spr-border-radius-l)}.login-page :host{left:calc(var(--spr-authorization-area-sidebar-width) / 2 + 50%)}.toast{width:100%;padding:0;border-radius:var(--spr-border-radius-m);box-shadow:0 8px 16px rgb(var(--brd-black)/.1)}.toast.bg-danger{border:1px solid transparent;background-color:var(--brd-fill-destructive-600)!important;color:var(--brd-text-default-0)}.toast.bg-danger .toast-icon{color:var(--brd-icon-default-0)}.toast.bg-danger path{fill:var(--brd-icon-default-0)}.toast.bg-warning{border:1px solid transparent;background-color:var(--brd-fill-warning-600)!important;color:var(--brd-text-default-0)}.toast.bg-warning .toast-icon{color:var(--brd-icon-default-0)}.toast.bg-warning path{fill:var(--brd-icon-default-0)}.toast.bg-success{border:1px solid transparent;background-color:var(--brd-fill-success-600)!important;color:var(--brd-text-default-0)}.toast.bg-success .toast-icon{color:var(--brd-icon-default-0)}.toast.bg-success path{fill:var(--brd-icon-default-0)}.toast.bg-info{border:1px solid var(--brd-border-info-250);background-color:var(--brd-fill-info-0)!important;color:var(--brd-text-primary-800)}.toast.bg-info .toast-icon{color:var(--brd-icon-default-700)}.toast.bg-info path{fill:var(--brd-icon-default-700)}.toast.showing{opacity:0}.toast:not(.show){display:none}.toast-body{word-wrap:break-word}.toast__content{display:flex;align-items:center;justify-content:space-between;gap:10px;overflow:hidden;width:100%;padding:12px}.toast__content:has(+.toast__footer){padding:8px}.toast__icon{font-size:var(--spr-font-size-16)}.toast__text{font-size:var(--spr-font-size-14);line-height:var(--spr-line-height-20);font-weight:var(--spr-font-weight-medium);margin-right:auto;overflow-wrap:anywhere}.toast__close{display:flex;align-items:center;justify-content:center;flex:0 0 24px;width:24px;height:24px;font-size:var(--spr-font-size-24);cursor:pointer}.toast__footer{padding:12px;border-top:1px solid var(--brd-border-divider-300)}\n"], dependencies: [{ kind: "ngmodule", type: NgbToastModule }, { kind: "component", type: i1$1.NgbToast, selector: "ngb-toast", inputs: ["animation", "delay", "autohide", "header"], outputs: ["shown", "hidden"], exportAs: ["ngbToast"] }, { kind: "pipe", type: AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprToastsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-toasts', imports: [NgbToastModule, AsyncPipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "@for (toast of (toastService.toasts$ | async) || []; track toast.message) {\n  <ngb-toast\n    [autohide]=\"toast.options.autohide !== false\"\n    [delay]=\"toast.options.delay || 5000\"\n    [class]=\"classes[toast.context]\"\n    (hide)=\"toastService.remove(toast)\"\n    (mouseenter)=\"toast.options.autohide = false\"\n    (mouseleave)=\"toast.options.autohide = true\">\n    <div class=\"toast__content\">\n      <i\n        class=\"toast__icon\"\n        [class]=\"'bo-icon-' + icons[toast.context]\"></i>\n      <span\n        class=\"toast__text\"\n        [innerHTML]=\"toast.message\"></span>\n      <span class=\"toast__close\">\n        <i\n          class=\"bo-icon-control-cross\"\n          (click)=\"toastService.remove(toast)\"></i>\n      </span>\n    </div>\n\n    @if (toast.options.footerMessage) {\n      <div\n        [innerHTML]=\"toast.options.footerMessage\"\n        class=\"toast__footer\"></div>\n    }\n  </ngb-toast>\n}\n", styles: [".text-body-xxxl{font-size:var(--spr-font-size-32);line-height:var(--spr-line-height-40)}.text-body-xxl{font-size:var(--spr-font-size-24);line-height:var(--spr-line-height-32)}.text-body-xl{font-size:var(--spr-font-size-20);line-height:var(--spr-line-height-24)}.text-body-l{font-size:var(--spr-font-size-16);line-height:var(--spr-line-height-20)}.text-body-m{font-size:var(--spr-font-size-15);line-height:var(--spr-line-height-20)}.text-body-s{font-size:var(--spr-font-size-14);line-height:var(--spr-line-height-20)}.text-body-xs{font-size:var(--spr-font-size-12);line-height:var(--spr-line-height-16)}.text-body-xs-uppercase{font-size:var(--spr-font-size-13);line-height:var(--spr-line-height-20);text-transform:uppercase}:host{position:fixed;bottom:8px;left:50%;z-index:12000;transform:translate(-50%);width:100%;max-width:400px;border-radius:var(--spr-border-radius-l)}.login-page :host{left:calc(var(--spr-authorization-area-sidebar-width) / 2 + 50%)}.toast{width:100%;padding:0;border-radius:var(--spr-border-radius-m);box-shadow:0 8px 16px rgb(var(--brd-black)/.1)}.toast.bg-danger{border:1px solid transparent;background-color:var(--brd-fill-destructive-600)!important;color:var(--brd-text-default-0)}.toast.bg-danger .toast-icon{color:var(--brd-icon-default-0)}.toast.bg-danger path{fill:var(--brd-icon-default-0)}.toast.bg-warning{border:1px solid transparent;background-color:var(--brd-fill-warning-600)!important;color:var(--brd-text-default-0)}.toast.bg-warning .toast-icon{color:var(--brd-icon-default-0)}.toast.bg-warning path{fill:var(--brd-icon-default-0)}.toast.bg-success{border:1px solid transparent;background-color:var(--brd-fill-success-600)!important;color:var(--brd-text-default-0)}.toast.bg-success .toast-icon{color:var(--brd-icon-default-0)}.toast.bg-success path{fill:var(--brd-icon-default-0)}.toast.bg-info{border:1px solid var(--brd-border-info-250);background-color:var(--brd-fill-info-0)!important;color:var(--brd-text-primary-800)}.toast.bg-info .toast-icon{color:var(--brd-icon-default-700)}.toast.bg-info path{fill:var(--brd-icon-default-700)}.toast.showing{opacity:0}.toast:not(.show){display:none}.toast-body{word-wrap:break-word}.toast__content{display:flex;align-items:center;justify-content:space-between;gap:10px;overflow:hidden;width:100%;padding:12px}.toast__content:has(+.toast__footer){padding:8px}.toast__icon{font-size:var(--spr-font-size-16)}.toast__text{font-size:var(--spr-font-size-14);line-height:var(--spr-line-height-20);font-weight:var(--spr-font-weight-medium);margin-right:auto;overflow-wrap:anywhere}.toast__close{display:flex;align-items:center;justify-content:center;flex:0 0 24px;width:24px;height:24px;font-size:var(--spr-font-size-24);cursor:pointer}.toast__footer{padding:12px;border-top:1px solid var(--brd-border-divider-300)}\n"] }]
        }], ctorParameters: () => [{ type: SprToastService }] });

class SprTransferListTemplateDirective {
    constructor(template) {
        this.template = template;
    }
    static ngTemplateContextGuard(directive, context) {
        return true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprTransferListTemplateDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: SprTransferListTemplateDirective, isStandalone: true, selector: "[sprTransferListTemplate]", inputs: { sprTransferListTemplate: "sprTransferListTemplate" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprTransferListTemplateDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[sprTransferListTemplate]', standalone: true }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }], propDecorators: { sprTransferListTemplate: [{
                type: Input,
                args: [{ required: true }]
            }] } });

class FilteredListPipe {
    transform(items, searchPredicate) {
        return this.sortAlphabetically(items.filter((item) => item.name.toLowerCase().includes((searchPredicate || '').trim().toLowerCase())));
    }
    sortAlphabetically(items) {
        return [...items].sort((a, b) => a.name.localeCompare(b.name));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: FilteredListPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.14", ngImport: i0, type: FilteredListPipe, isStandalone: true, name: "filteredList" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: FilteredListPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'filteredList',
                    standalone: true,
                }]
        }] });

class GetTemplatePipe {
    transform(templates, templateType) {
        return templates?.find((item) => item.sprTransferListTemplate === templateType)?.template;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: GetTemplatePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.14", ngImport: i0, type: GetTemplatePipe, isStandalone: true, name: "getTemplate" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: GetTemplatePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'getTemplate',
                    standalone: true,
                }]
        }] });

class SprTransferListComponent {
    constructor() {
        this.sourceList = [];
        this.targetList = [];
        this.visibleHeader = '';
        this.countriesHeader = '';
        this.sourceColumnHeader = '';
        this.targetColumnHeader = '';
        this.searchPlaceholder = '';
        this.disabledItems = [];
        this.enabledItems = [];
        this.disabled = false;
        this.movedSingle = new EventEmitter();
        this.movedAll = new EventEmitter();
        this.filteredListPipe = inject(FilteredListPipe);
        this.searchControl = new FormControl('', { nonNullable: true });
    }
    moveToTarget(item) {
        if (this.enabledItems.includes(item.value) || this.disabled) {
            return;
        }
        this.sourceList = this.sourceList.filter((source) => source.value !== item.value);
        this.targetList = this.targetList.concat(item);
        this.movedSingle.emit({
            sourceList: this.sourceList,
            targetList: this.targetList,
            direction: 'target',
            item,
        });
    }
    moveToSource(item) {
        if (this.disabledItems.includes(item.value) || this.disabled) {
            return;
        }
        this.targetList = this.targetList.filter((target) => target.value !== item.value);
        this.sourceList = this.sourceList.concat(item);
        this.movedSingle.emit({
            sourceList: this.sourceList,
            targetList: this.targetList,
            direction: 'source',
            item,
        });
    }
    moveAllToTarget() {
        if (this.disabled) {
            return;
        }
        const filteredList = this.getFilteredList(this.sourceList).filter((item) => !this.enabledItems.includes(item.value));
        this.targetList = [...this.targetList, ...filteredList];
        this.sourceList = this.sourceList.filter((source) => {
            return !filteredList.some((item) => source.value === item.value);
        });
        this.movedAll.emit({
            sourceList: this.sourceList,
            targetList: this.targetList,
            direction: 'target',
        });
    }
    moveAllToSource() {
        if (this.disabled) {
            return;
        }
        const filteredList = this.getFilteredList(this.targetList).filter((item) => !this.disabledItems.includes(item.value));
        this.sourceList = [...this.sourceList, ...filteredList];
        this.targetList = this.targetList.filter((target) => {
            return !filteredList.some((item) => target.value === item.value);
        });
        this.movedAll.emit({
            sourceList: this.sourceList,
            targetList: this.targetList,
            direction: 'target',
        });
    }
    trackByName(index, item) {
        return item.value;
    }
    getFilteredList(list) {
        return this.filteredListPipe.transform(list, this.searchControl.value);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprTransferListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: SprTransferListComponent, isStandalone: true, selector: "spr-transfer-list", inputs: { sourceList: "sourceList", targetList: "targetList", visibleHeader: "visibleHeader", countriesHeader: "countriesHeader", sourceColumnHeader: "sourceColumnHeader", targetColumnHeader: "targetColumnHeader", searchPlaceholder: "searchPlaceholder", disabledItems: "disabledItems", enabledItems: "enabledItems", disabled: "disabled" }, outputs: { movedSingle: "movedSingle", movedAll: "movedAll" }, providers: [FilteredListPipe], queries: [{ propertyName: "customTemplates", predicate: SprTransferListTemplateDirective }], ngImport: i0, template: "<div class=\"transfer-list\">\n  <spr-inner-header [title]=\"visibleHeader + ' ' + sourceList.length + ' ' + countriesHeader\"> </spr-inner-header>\n\n  <div class=\"transfer-list__controls\">\n    <div class=\"transfer-list__sources\">\n      <div class=\"transfer-list__controls-title\">{{ sourceColumnHeader }}</div>\n      <ng-container\n        [ngTemplateOutlet]=\"(customTemplates | getTemplate: 'sourceMoveAllButton') ?? defaultSourceMoveAllButton\"\n        [ngTemplateOutletContext]=\"{ move: moveToTarget.bind(this), moveAll: moveAllToTarget.bind(this) }\" />\n\n      <ng-template #defaultSourceMoveAllButton>\n        <spr-button\n          variant=\"form-button\"\n          size=\"sm\"\n          (click)=\"moveAllToTarget()\">\n          <i class=\"transfer-list-icon-md bo-icon-arrows-chevron-double-right\"></i>\n        </spr-button>\n      </ng-template>\n    </div>\n\n    <div class=\"transfer-list__targets\">\n      <ng-container\n        [ngTemplateOutlet]=\"(customTemplates | getTemplate: 'targetMoveAllButton') ?? defaultTargetMoveAllButton\"\n        [ngTemplateOutletContext]=\"{ move: moveToTarget.bind(this), moveAll: moveAllToSource.bind(this) }\" />\n\n      <ng-template #defaultTargetMoveAllButton>\n        <spr-button\n          variant=\"form-button\"\n          size=\"sm\"\n          (click)=\"moveAllToSource()\">\n          <i class=\"transfer-list-icon-md bo-icon-arrows-chevron-double-left\"></i>\n        </spr-button>\n      </ng-template>\n      <div class=\"transfer-list__controls-title\">{{ targetColumnHeader }}</div>\n    </div>\n  </div>\n\n  <div class=\"transfer-list__search-container\">\n    <spr-input\n      controlSize=\"lg\"\n      [placeholder]=\"searchPlaceholder\"\n      [prepend]=\"true\"\n      [formControl]=\"searchControl\">\n      <i\n        prependContent\n        class=\"transfer-list-icon-sm bo-icon-control-search\"></i>\n    </spr-input>\n  </div>\n  <div class=\"transfer-list__data\">\n    <div class=\"transfer-list__data-source\">\n      <ng-container *ngFor=\"let item of sourceList | filteredList: searchControl.value; let i = index; trackBy: trackByName\">\n        <ng-container\n          [ngTemplateOutlet]=\"(customTemplates | getTemplate: 'sourceItem') ?? defaultSourceItem\"\n          [ngTemplateOutletContext]=\"{ $implicit: item, move: moveToTarget.bind(this) }\" />\n      </ng-container>\n\n      <ng-template\n        #defaultSourceItem\n        let-item\n        let-move=\"move\">\n        <div class=\"transfer-list__data-source-item\">\n          <div class=\"inline-container\">\n            <ng-container\n              [ngTemplateOutlet]=\"(customTemplates | getTemplate: 'sourceItemContent') ?? defaultSourceContent\"\n              [ngTemplateOutletContext]=\"{ $implicit: item, move: moveToTarget.bind(this) }\" />\n\n            <ng-template #defaultSourceContent>\n              <i\n                class=\"transfer-list-icon-sm\"\n                [ngClass]=\"item.icon\"></i>\n              {{ item.name }}\n            </ng-template>\n          </div>\n\n          <spr-button\n            variant=\"form-button\"\n            size=\"sm\"\n            [isIcon]=\"true\"\n            (click)=\"move(item)\">\n            <ng-container\n              [ngTemplateOutlet]=\"(customTemplates | getTemplate: 'sourceItemButtonIcon') ?? defaultSourceButtonIcon\"\n              [ngTemplateOutletContext]=\"{ $implicit: item, move: moveToTarget.bind(this) }\" />\n\n            <ng-template #defaultSourceButtonIcon>\n              <i class=\"transfer-list-icon-md bo-icon-arrows-chevron-right\"></i>\n            </ng-template>\n          </spr-button>\n        </div>\n      </ng-template>\n    </div>\n\n    <div class=\"transfer-list__data-target\">\n      <ng-container *ngFor=\"let item of targetList | filteredList: searchControl.value; let i = index; trackBy: trackByName\">\n        <ng-container\n          [ngTemplateOutlet]=\"(customTemplates | getTemplate: 'targetItem') ?? defaultTargetItem\"\n          [ngTemplateOutletContext]=\"{ $implicit: item, move: moveToSource.bind(this) }\" />\n      </ng-container>\n\n      <ng-template\n        #defaultTargetItem\n        let-item\n        let-move=\"move\">\n        <div class=\"transfer-list__data-target-item\">\n          <spr-button\n            size=\"sm\"\n            variant=\"form-button\"\n            [isIcon]=\"true\"\n            (click)=\"move(item)\">\n            <ng-container\n              [ngTemplateOutlet]=\"(customTemplates | getTemplate: 'targetItemButtonIcon') ?? defaultTargetButtonIcon\"\n              [ngTemplateOutletContext]=\"{ $implicit: item, move: moveToTarget.bind(this) }\" />\n\n            <ng-template #defaultTargetButtonIcon>\n              <i class=\"transfer-list-icon-md bo-icon-arrows-chevron-left\"></i>\n            </ng-template>\n          </spr-button>\n\n          <div class=\"inline-container\">\n            <ng-container\n              [ngTemplateOutlet]=\"(customTemplates | getTemplate: 'targetItemContent') ?? defaultTargetContent\"\n              [ngTemplateOutletContext]=\"{ $implicit: item, move: moveToTarget.bind(this) }\" />\n\n            <ng-template #defaultTargetContent>\n              {{ item.name }}\n              <i\n                class=\"transfer-list-icon-sm\"\n                [ngClass]=\"item.icon\"></i>\n            </ng-template>\n          </div>\n        </div>\n      </ng-template>\n    </div>\n  </div>\n</div>\n", styles: [".text-heading-xl{font-size:var(--spr-font-size-32);line-height:var(--spr-line-height-40);font-weight:var(--spr-font-weight-semi-bold)}.text-heading-l{font-size:var(--spr-font-size-28);line-height:var(--spr-line-height-36);font-weight:var(--spr-font-weight-semi-bold)}.text-heading-m{font-size:var(--spr-font-size-24);line-height:var(--spr-line-height-32);font-weight:var(--spr-font-weight-semi-bold)}.text-heading-s{font-size:var(--spr-font-size-20);line-height:var(--spr-line-height-24);font-weight:var(--spr-font-weight-semi-bold)}.text-heading-xs{font-size:var(--spr-font-size-16);line-height:var(--spr-line-height-24);font-weight:var(--spr-font-weight-semi-bold)}.text-heading-xxs{font-size:var(--spr-font-size-13);line-height:var(--spr-line-height-16);font-weight:var(--spr-font-weight-semi-bold);text-transform:uppercase}.text-heading-xxxs{font-size:var(--spr-font-size-12);line-height:var(--spr-line-height-16);font-weight:var(--spr-font-weight-semi-bold);text-transform:uppercase}.text-body-xxxl{font-size:var(--spr-font-size-32);line-height:var(--spr-line-height-40)}.text-body-xxl{font-size:var(--spr-font-size-24);line-height:var(--spr-line-height-32)}.text-body-xl{font-size:var(--spr-font-size-20);line-height:var(--spr-line-height-24)}.text-body-l{font-size:var(--spr-font-size-16);line-height:var(--spr-line-height-20)}.text-body-m{font-size:var(--spr-font-size-15);line-height:var(--spr-line-height-20)}.text-body-s{font-size:var(--spr-font-size-14);line-height:var(--spr-line-height-20)}.text-body-xs{font-size:var(--spr-font-size-12);line-height:var(--spr-line-height-16)}.text-body-xs-uppercase{font-size:var(--spr-font-size-13);line-height:var(--spr-line-height-20);text-transform:uppercase}:host{display:block}.transfer-list-icon-md{font-size:var(--spr-font-size-18)}.transfer-list-icon-sm{font-size:var(--spr-font-size-16)}.inline-container{gap:8px;display:inline-flex;flex-wrap:nowrap;align-items:center;vertical-align:middle}.transfer-list{--spr-inner-header-background: var(--brd-fill-default-100);--spr-transfer-list-controls-title-color: var(--brd-text-secondary-600);--spr-transfer-list-controls-background: var(--brd-fill-default-0);--spr-transfer-list-data-background: var(--brd-fill-default-0);--spr-transfer-list-search-container-background: var(--brd-fill-default-200);--spr-transfer-list-item-background-hover: var(--brd-fill-hover-100);--spr-transfer-list-border-color: var(--brd-border-default-200);--spr-transfer-list-controls-border-color: var(--brd-border-divider-300);--spr-transfer-list-sources-border-color: var(--brd-border-divider-300);--spr-transfer-list-data-source-border-color: var(--brd-border-default-200);--spr-button-form-width: 36px;--spr-button-form-height: 36px;border:1px solid var(--spr-transfer-list-border-color);border-radius:var(--spr-border-radius-m);overflow:hidden}.transfer-list__controls{display:grid;grid-template-columns:1fr 1fr;background:var(--spr-transfer-list-controls-background);border-bottom:1px solid var(--spr-transfer-list-controls-border-color)}.transfer-list__controls-title{font-size:var(--spr-font-size-12);line-height:var(--spr-line-height-16);font-weight:var(--spr-font-weight-semi-bold);text-transform:uppercase;margin:0;color:var(--spr-transfer-list-controls-title-color);letter-spacing:.72px}.transfer-list__sources,.transfer-list__targets{display:flex;align-items:center;justify-content:space-between;gap:8px}.transfer-list__sources{padding:8px 4px 8px 16px;border-right:1px solid var(--spr-transfer-list-sources-border-color)}.transfer-list__targets{padding:8px 16px 8px 4px}.transfer-list__search-container{padding:8px;background:var(--spr-transfer-list-search-container-background)}.transfer-list__data{font-size:var(--spr-font-size-16);line-height:var(--spr-line-height-20);display:grid;grid-template-columns:1fr 1fr;background:var(--spr-transfer-list-data-background)}.transfer-list__data-source,.transfer-list__data-target{height:252px;overflow:hidden auto;-webkit-overflow-scrolling:touch!important;scrollbar-width:thin!important;scrollbar-color:rgb(var(--spr-grey-250)) transparent!important;scrollbar-gutter:unset}.transfer-list__data-source::-webkit-scrollbar,.transfer-list__data-target::-webkit-scrollbar{width:18px!important;background-color:transparent!important;border-radius:var(--spr-border-radius-l)!important}.transfer-list__data-source::-webkit-scrollbar-thumb,.transfer-list__data-target::-webkit-scrollbar-thumb{border:6px solid rgb(var(--brd-white))!important;background-color:rgb(var(--spr-grey-130))!important;border-radius:var(--spr-border-radius-l)!important}.transfer-list__data-source:hover,.transfer-list__data-target:hover{scrollbar-color:rgba(26,26,30,.7) transparent!important}.transfer-list__data-source:hover::-webkit-scrollbar-thumb,.transfer-list__data-target:hover::-webkit-scrollbar-thumb{background-color:rgb(var(--spr-grey-250))!important}.transfer-list__data-source{border-right:1px solid var(--spr-transfer-list-data-source-border-color)}.transfer-list__data-source-item,.transfer-list__data-target-item{display:flex;align-items:center;justify-content:space-between;transition:background var(--spr-transition-time) ease,color var(--spr-transition-time) ease}.transfer-list__data-source-item:hover,.transfer-list__data-target-item:hover{--spr-button-form-background: var(--spr-transfer-list-item-background-hover);background:var(--spr-transfer-list-item-background-hover)}.transfer-list__data-source-item{padding:3px 4px 3px 16px}.transfer-list__data-target-item{padding:3px 16px 3px 4px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1$2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1$2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: SprInputComponent, selector: "spr-input", inputs: ["precision", "type", "placeholder", "isNegativeNumbersAcceptable", "onlyInteger", "isSubmitStrategy", "addonStart", "addonEnd", "prepend", "append", "rounded", "maxLength", "readOnly", "isRevealedInput"], outputs: ["inputTypeChange"] }, { kind: "component", type: SprButtonComponent, selector: "spr-button", inputs: ["variant", "type", "size", "isBtnSpinner", "isRadius", "disabled", "isIcon", "buttonId"] }, { kind: "pipe", type: FilteredListPipe, name: "filteredList" }, { kind: "pipe", type: GetTemplatePipe, name: "getTemplate" }, { kind: "component", type: SprInnerHeaderComponent, selector: "spr-inner-header", inputs: ["variant", "title", "withStartContent", "withoutBorder"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: SprTransferListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spr-transfer-list', changeDetection: ChangeDetectionStrategy.OnPush, imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        SprInputComponent,
                        SprButtonComponent,
                        FilteredListPipe,
                        GetTemplatePipe,
                        SprInnerHeaderComponent,
                    ], providers: [FilteredListPipe], template: "<div class=\"transfer-list\">\n  <spr-inner-header [title]=\"visibleHeader + ' ' + sourceList.length + ' ' + countriesHeader\"> </spr-inner-header>\n\n  <div class=\"transfer-list__controls\">\n    <div class=\"transfer-list__sources\">\n      <div class=\"transfer-list__controls-title\">{{ sourceColumnHeader }}</div>\n      <ng-container\n        [ngTemplateOutlet]=\"(customTemplates | getTemplate: 'sourceMoveAllButton') ?? defaultSourceMoveAllButton\"\n        [ngTemplateOutletContext]=\"{ move: moveToTarget.bind(this), moveAll: moveAllToTarget.bind(this) }\" />\n\n      <ng-template #defaultSourceMoveAllButton>\n        <spr-button\n          variant=\"form-button\"\n          size=\"sm\"\n          (click)=\"moveAllToTarget()\">\n          <i class=\"transfer-list-icon-md bo-icon-arrows-chevron-double-right\"></i>\n        </spr-button>\n      </ng-template>\n    </div>\n\n    <div class=\"transfer-list__targets\">\n      <ng-container\n        [ngTemplateOutlet]=\"(customTemplates | getTemplate: 'targetMoveAllButton') ?? defaultTargetMoveAllButton\"\n        [ngTemplateOutletContext]=\"{ move: moveToTarget.bind(this), moveAll: moveAllToSource.bind(this) }\" />\n\n      <ng-template #defaultTargetMoveAllButton>\n        <spr-button\n          variant=\"form-button\"\n          size=\"sm\"\n          (click)=\"moveAllToSource()\">\n          <i class=\"transfer-list-icon-md bo-icon-arrows-chevron-double-left\"></i>\n        </spr-button>\n      </ng-template>\n      <div class=\"transfer-list__controls-title\">{{ targetColumnHeader }}</div>\n    </div>\n  </div>\n\n  <div class=\"transfer-list__search-container\">\n    <spr-input\n      controlSize=\"lg\"\n      [placeholder]=\"searchPlaceholder\"\n      [prepend]=\"true\"\n      [formControl]=\"searchControl\">\n      <i\n        prependContent\n        class=\"transfer-list-icon-sm bo-icon-control-search\"></i>\n    </spr-input>\n  </div>\n  <div class=\"transfer-list__data\">\n    <div class=\"transfer-list__data-source\">\n      <ng-container *ngFor=\"let item of sourceList | filteredList: searchControl.value; let i = index; trackBy: trackByName\">\n        <ng-container\n          [ngTemplateOutlet]=\"(customTemplates | getTemplate: 'sourceItem') ?? defaultSourceItem\"\n          [ngTemplateOutletContext]=\"{ $implicit: item, move: moveToTarget.bind(this) }\" />\n      </ng-container>\n\n      <ng-template\n        #defaultSourceItem\n        let-item\n        let-move=\"move\">\n        <div class=\"transfer-list__data-source-item\">\n          <div class=\"inline-container\">\n            <ng-container\n              [ngTemplateOutlet]=\"(customTemplates | getTemplate: 'sourceItemContent') ?? defaultSourceContent\"\n              [ngTemplateOutletContext]=\"{ $implicit: item, move: moveToTarget.bind(this) }\" />\n\n            <ng-template #defaultSourceContent>\n              <i\n                class=\"transfer-list-icon-sm\"\n                [ngClass]=\"item.icon\"></i>\n              {{ item.name }}\n            </ng-template>\n          </div>\n\n          <spr-button\n            variant=\"form-button\"\n            size=\"sm\"\n            [isIcon]=\"true\"\n            (click)=\"move(item)\">\n            <ng-container\n              [ngTemplateOutlet]=\"(customTemplates | getTemplate: 'sourceItemButtonIcon') ?? defaultSourceButtonIcon\"\n              [ngTemplateOutletContext]=\"{ $implicit: item, move: moveToTarget.bind(this) }\" />\n\n            <ng-template #defaultSourceButtonIcon>\n              <i class=\"transfer-list-icon-md bo-icon-arrows-chevron-right\"></i>\n            </ng-template>\n          </spr-button>\n        </div>\n      </ng-template>\n    </div>\n\n    <div class=\"transfer-list__data-target\">\n      <ng-container *ngFor=\"let item of targetList | filteredList: searchControl.value; let i = index; trackBy: trackByName\">\n        <ng-container\n          [ngTemplateOutlet]=\"(customTemplates | getTemplate: 'targetItem') ?? defaultTargetItem\"\n          [ngTemplateOutletContext]=\"{ $implicit: item, move: moveToSource.bind(this) }\" />\n      </ng-container>\n\n      <ng-template\n        #defaultTargetItem\n        let-item\n        let-move=\"move\">\n        <div class=\"transfer-list__data-target-item\">\n          <spr-button\n            size=\"sm\"\n            variant=\"form-button\"\n            [isIcon]=\"true\"\n            (click)=\"move(item)\">\n            <ng-container\n              [ngTemplateOutlet]=\"(customTemplates | getTemplate: 'targetItemButtonIcon') ?? defaultTargetButtonIcon\"\n              [ngTemplateOutletContext]=\"{ $implicit: item, move: moveToTarget.bind(this) }\" />\n\n            <ng-template #defaultTargetButtonIcon>\n              <i class=\"transfer-list-icon-md bo-icon-arrows-chevron-left\"></i>\n            </ng-template>\n          </spr-button>\n\n          <div class=\"inline-container\">\n            <ng-container\n              [ngTemplateOutlet]=\"(customTemplates | getTemplate: 'targetItemContent') ?? defaultTargetContent\"\n              [ngTemplateOutletContext]=\"{ $implicit: item, move: moveToTarget.bind(this) }\" />\n\n            <ng-template #defaultTargetContent>\n              {{ item.name }}\n              <i\n                class=\"transfer-list-icon-sm\"\n                [ngClass]=\"item.icon\"></i>\n            </ng-template>\n          </div>\n        </div>\n      </ng-template>\n    </div>\n  </div>\n</div>\n", styles: [".text-heading-xl{font-size:var(--spr-font-size-32);line-height:var(--spr-line-height-40);font-weight:var(--spr-font-weight-semi-bold)}.text-heading-l{font-size:var(--spr-font-size-28);line-height:var(--spr-line-height-36);font-weight:var(--spr-font-weight-semi-bold)}.text-heading-m{font-size:var(--spr-font-size-24);line-height:var(--spr-line-height-32);font-weight:var(--spr-font-weight-semi-bold)}.text-heading-s{font-size:var(--spr-font-size-20);line-height:var(--spr-line-height-24);font-weight:var(--spr-font-weight-semi-bold)}.text-heading-xs{font-size:var(--spr-font-size-16);line-height:var(--spr-line-height-24);font-weight:var(--spr-font-weight-semi-bold)}.text-heading-xxs{font-size:var(--spr-font-size-13);line-height:var(--spr-line-height-16);font-weight:var(--spr-font-weight-semi-bold);text-transform:uppercase}.text-heading-xxxs{font-size:var(--spr-font-size-12);line-height:var(--spr-line-height-16);font-weight:var(--spr-font-weight-semi-bold);text-transform:uppercase}.text-body-xxxl{font-size:var(--spr-font-size-32);line-height:var(--spr-line-height-40)}.text-body-xxl{font-size:var(--spr-font-size-24);line-height:var(--spr-line-height-32)}.text-body-xl{font-size:var(--spr-font-size-20);line-height:var(--spr-line-height-24)}.text-body-l{font-size:var(--spr-font-size-16);line-height:var(--spr-line-height-20)}.text-body-m{font-size:var(--spr-font-size-15);line-height:var(--spr-line-height-20)}.text-body-s{font-size:var(--spr-font-size-14);line-height:var(--spr-line-height-20)}.text-body-xs{font-size:var(--spr-font-size-12);line-height:var(--spr-line-height-16)}.text-body-xs-uppercase{font-size:var(--spr-font-size-13);line-height:var(--spr-line-height-20);text-transform:uppercase}:host{display:block}.transfer-list-icon-md{font-size:var(--spr-font-size-18)}.transfer-list-icon-sm{font-size:var(--spr-font-size-16)}.inline-container{gap:8px;display:inline-flex;flex-wrap:nowrap;align-items:center;vertical-align:middle}.transfer-list{--spr-inner-header-background: var(--brd-fill-default-100);--spr-transfer-list-controls-title-color: var(--brd-text-secondary-600);--spr-transfer-list-controls-background: var(--brd-fill-default-0);--spr-transfer-list-data-background: var(--brd-fill-default-0);--spr-transfer-list-search-container-background: var(--brd-fill-default-200);--spr-transfer-list-item-background-hover: var(--brd-fill-hover-100);--spr-transfer-list-border-color: var(--brd-border-default-200);--spr-transfer-list-controls-border-color: var(--brd-border-divider-300);--spr-transfer-list-sources-border-color: var(--brd-border-divider-300);--spr-transfer-list-data-source-border-color: var(--brd-border-default-200);--spr-button-form-width: 36px;--spr-button-form-height: 36px;border:1px solid var(--spr-transfer-list-border-color);border-radius:var(--spr-border-radius-m);overflow:hidden}.transfer-list__controls{display:grid;grid-template-columns:1fr 1fr;background:var(--spr-transfer-list-controls-background);border-bottom:1px solid var(--spr-transfer-list-controls-border-color)}.transfer-list__controls-title{font-size:var(--spr-font-size-12);line-height:var(--spr-line-height-16);font-weight:var(--spr-font-weight-semi-bold);text-transform:uppercase;margin:0;color:var(--spr-transfer-list-controls-title-color);letter-spacing:.72px}.transfer-list__sources,.transfer-list__targets{display:flex;align-items:center;justify-content:space-between;gap:8px}.transfer-list__sources{padding:8px 4px 8px 16px;border-right:1px solid var(--spr-transfer-list-sources-border-color)}.transfer-list__targets{padding:8px 16px 8px 4px}.transfer-list__search-container{padding:8px;background:var(--spr-transfer-list-search-container-background)}.transfer-list__data{font-size:var(--spr-font-size-16);line-height:var(--spr-line-height-20);display:grid;grid-template-columns:1fr 1fr;background:var(--spr-transfer-list-data-background)}.transfer-list__data-source,.transfer-list__data-target{height:252px;overflow:hidden auto;-webkit-overflow-scrolling:touch!important;scrollbar-width:thin!important;scrollbar-color:rgb(var(--spr-grey-250)) transparent!important;scrollbar-gutter:unset}.transfer-list__data-source::-webkit-scrollbar,.transfer-list__data-target::-webkit-scrollbar{width:18px!important;background-color:transparent!important;border-radius:var(--spr-border-radius-l)!important}.transfer-list__data-source::-webkit-scrollbar-thumb,.transfer-list__data-target::-webkit-scrollbar-thumb{border:6px solid rgb(var(--brd-white))!important;background-color:rgb(var(--spr-grey-130))!important;border-radius:var(--spr-border-radius-l)!important}.transfer-list__data-source:hover,.transfer-list__data-target:hover{scrollbar-color:rgba(26,26,30,.7) transparent!important}.transfer-list__data-source:hover::-webkit-scrollbar-thumb,.transfer-list__data-target:hover::-webkit-scrollbar-thumb{background-color:rgb(var(--spr-grey-250))!important}.transfer-list__data-source{border-right:1px solid var(--spr-transfer-list-data-source-border-color)}.transfer-list__data-source-item,.transfer-list__data-target-item{display:flex;align-items:center;justify-content:space-between;transition:background var(--spr-transition-time) ease,color var(--spr-transition-time) ease}.transfer-list__data-source-item:hover,.transfer-list__data-target-item:hover{--spr-button-form-background: var(--spr-transfer-list-item-background-hover);background:var(--spr-transfer-list-item-background-hover)}.transfer-list__data-source-item{padding:3px 4px 3px 16px}.transfer-list__data-target-item{padding:3px 16px 3px 4px}\n"] }]
        }], propDecorators: { sourceList: [{
                type: Input
            }], targetList: [{
                type: Input
            }], visibleHeader: [{
                type: Input
            }], countriesHeader: [{
                type: Input
            }], sourceColumnHeader: [{
                type: Input
            }], targetColumnHeader: [{
                type: Input
            }], searchPlaceholder: [{
                type: Input
            }], disabledItems: [{
                type: Input
            }], enabledItems: [{
                type: Input
            }], disabled: [{
                type: Input
            }], movedSingle: [{
                type: Output
            }], movedAll: [{
                type: Output
            }], customTemplates: [{
                type: ContentChildren,
                args: [SprTransferListTemplateDirective]
            }] } });

/*
 * Public API Surface of spr-components
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AccordionType, BaseControl, DATEPICKER_TRANSLATE_ACTIVE_LANGUAGE, DEFAULT_ERROR_MESSAGE_CONFIG, DateRangeService, DatepickerTranslateService, ExportFormats, FilterArrayPipe, FilterOptionsPipe, GetControlErrorMessagePipe, ModalService, NOT_SELECTED_FILTER_TOKEN, OffCanvasService, PAGE_SIZE_SELECTOR_CONFIG_TOKEN, PAGINATION_BAR_CONFIG_TOKEN, PeriodVariants, SPR_DATEPICKER_VALUE_FORMATTER, SPR_DATE_TIMEPICKER_ADAPTER_TOKEN, SPR_LABEL, SortType, SprAccordionComponent, SprAlertComponent, SprBaseModalContentComponent, SprBaseOffCanvasContentComponent, SprBasePeriodSelector, SprBtnSpinnerDirective, SprButtonComponent, SprCheckboxComponent, SprChipsComponent, SprConfirmModalComponent, SprControlSizeDirective, SprDateTimepickerComponent, SprDatepickerComponent, SprDefaultDateTimepickerAdapter, SprDropdownComponent, SprErrorComponent, SprFieldDescriptionComponent, SprInnerHeaderComponent, SprInputComponent, SprLabelComponent, SprLabelContainerDirective, SprLabelDirective, SprMultiSelectDropdownComponent, SprMultiSwitcherComponent, SprOpenMenuComponent, SprOpenMenuDirective, SprOpenMenuExtensionDirective, SprOpenMenuItemDirective, SprOpenMenuTitleDirective, SprOpenSubMenuDirective, SprPageSizeSelectorComponent, SprPaginationBarComponent, SprPeriodSelectorComponent, SprPeriodSelectorPopupComponent, SprRadioButtonComponent, SprReadonlyControlComponent, SprSidebarComponent, SprSidebarItemComponent, SprSpinnerComponent, SprSwitcherComponent, SprTabContentDirective, SprTabHeaderComponent, SprTabHeaderDirective, SprTableComponent, SprTableDataCellDirective, SprTableHeaderCellDirective, SprTableHeaderDirective, SprTableRowDirective, SprTabsComponent, SprTextareaComponent, SprToastService, SprToastsComponent, SprTogglePeriodSelectorDirective, SprTransferListComponent, SprTransferListTemplateDirective, SprTwoOptionsSwitcherComponent, ToastType, getMappedDataToDropdown };
//# sourceMappingURL=platform-workspace-design-system.mjs.map
