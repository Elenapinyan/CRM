import { AlertType } from './interfaces/alert.interface';
import * as i0 from "@angular/core";
export declare class SprAlertComponent {
    type: AlertType;
    message: string;
    dismissible: boolean;
    icon?: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprAlertComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SprAlertComponent, "spr-alert", never, { "type": { "alias": "type"; "required": false; }; "message": { "alias": "message"; "required": true; }; "dismissible": { "alias": "dismissible"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; }, {}, never, never, true, never>;
}
