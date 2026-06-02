import { ButtonSizeType, ButtonType, ButtonVariant } from './button.options';
import * as i0 from "@angular/core";
import * as i1 from "../../directives/component-theme/component-theme.directive";
export declare class DsButton {
    variant: ButtonVariant;
    type: ButtonType;
    size: ButtonSizeType;
    isBtnSpinner: boolean;
    isRadius: boolean;
    disabled: boolean;
    isIcon: boolean;
    buttonId: string;
    formId?: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsButton, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsButton, "ds-button", never, { "variant": { "alias": "variant"; "required": false; }; "type": { "alias": "type"; "required": false; }; "size": { "alias": "size"; "required": false; }; "isBtnSpinner": { "alias": "isBtnSpinner"; "required": false; }; "isRadius": { "alias": "isRadius"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "isIcon": { "alias": "isIcon"; "required": false; }; "buttonId": { "alias": "buttonId"; "required": false; }; "formId": { "alias": "formId"; "required": false; }; }, {}, never, ["[start]", "*", "[end]"], true, [{ directive: typeof i1.ComponentThemeDirective; inputs: { "themeType": "themeType"; }; outputs: {}; }]>;
}
