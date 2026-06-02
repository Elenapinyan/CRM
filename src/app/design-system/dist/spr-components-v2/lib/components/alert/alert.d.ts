import { Observable } from 'rxjs';
import { DsAutocloseBase } from '../../shared/index';
import { AlertType } from './alert.options';
import * as i0 from "@angular/core";
export declare class DsAlert extends DsAutocloseBase {
    protected readonly defaultIcon: import("@angular/core").Signal<string>;
    protected readonly iconClass: import("@angular/core").Signal<string>;
    /**
     * Title is optional.
     **/
    title: import("@angular/core").InputSignal<string | undefined>;
    /**
     * Message is optional. You can use content projection instead.
     **/
    message: import("@angular/core").InputSignal<string | undefined>;
    /**
     * Alert type changes style and icon
     * @default 'info'
     **/
    type: import("@angular/core").InputSignal<AlertType>;
    /**
     * Make alert dismissable and adds close button to the right top corner
     * @default true
     **/
    dismissible: import("@angular/core").InputSignal<boolean>;
    /**
     * Icon displayed near the title
     * @default DEFAULT_ICON = 'ds-icon-general-info'
     **/
    icon: import("@angular/core").InputSignal<string>;
    protected readonly timerPercent$: Observable<number>;
    private getDefaultIcon;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsAlert, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsAlert, "ds-alert, [ds-alert]", never, { "title": { "alias": "title"; "required": false; "isSignal": true; }; "message": { "alias": "message"; "required": false; "isSignal": true; }; "type": { "alias": "type"; "required": false; "isSignal": true; }; "dismissible": { "alias": "dismissible"; "required": false; "isSignal": true; }; "icon": { "alias": "icon"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}
