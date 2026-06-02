export * from 'ag-grid-angular';
export * from 'ag-grid-community';
import { NgTemplateOutlet } from '@angular/common';
import * as i0 from '@angular/core';
import { Component } from '@angular/core';

class AgGridTemplateRendererComponent {
    agInit(params) {
        this.template = params.ngTemplate();
        this.context = {
            $implicit: params.value,
            data: params.data,
            params,
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: AgGridTemplateRendererComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: AgGridTemplateRendererComponent, isStandalone: true, selector: "ng-component", ngImport: i0, template: `<ng-container *ngTemplateOutlet="template; context: context" />`, isInline: true, dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: AgGridTemplateRendererComponent, decorators: [{
            type: Component,
            args: [{
                    template: `<ng-container *ngTemplateOutlet="template; context: context" />`,
                    imports: [NgTemplateOutlet],
                }]
        }] });

/*
 * Public API Surface of spr-grid
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AgGridTemplateRendererComponent };
//# sourceMappingURL=platform-workspace-grid.mjs.map
