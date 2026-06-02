import { ButtonSizeType, ButtonType, ButtonVariant } from './interfaces/spr-button.interface';
import * as i0 from "@angular/core";
export declare class SprButtonComponent {
    variant: ButtonVariant;
    type: ButtonType;
    size: ButtonSizeType;
    isBtnSpinner: boolean;
    isRadius: boolean;
    disabled: boolean;
    isIcon: boolean;
    buttonId: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SprButtonComponent, "spr-button", never, { "variant": { "alias": "variant"; "required": false; }; "type": { "alias": "type"; "required": false; }; "size": { "alias": "size"; "required": false; }; "isBtnSpinner": { "alias": "isBtnSpinner"; "required": false; }; "isRadius": { "alias": "isRadius"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "isIcon": { "alias": "isIcon"; "required": false; }; "buttonId": { "alias": "buttonId"; "required": false; }; }, {}, never, ["[start]", "*", "[end]"], true, never>;
}
