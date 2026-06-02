import { TabRouterSettings } from '../../interfaces/tabs.interface';
import * as i0 from "@angular/core";
export declare class SprTabHeaderComponent {
    isActive: boolean;
    isDisabled: boolean;
    isInvalid: boolean;
    routerSettings?: TabRouterSettings;
    clickListener(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprTabHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SprTabHeaderComponent, "spr-tab-header", never, { "isActive": { "alias": "isActive"; "required": false; }; "isDisabled": { "alias": "isDisabled"; "required": false; }; "isInvalid": { "alias": "isInvalid"; "required": false; }; "routerSettings": { "alias": "routerSettings"; "required": false; }; }, {}, never, ["*"], true, never>;
}
