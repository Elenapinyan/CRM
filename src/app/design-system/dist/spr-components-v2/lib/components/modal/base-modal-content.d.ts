import { ModalVariant } from './modal.options';
import * as i0 from "@angular/core";
export declare class DsBaseModalContent {
    headerVariant: import("@angular/core").InputSignal<ModalVariant>;
    footerVariant: import("@angular/core").InputSignal<ModalVariant>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsBaseModalContent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsBaseModalContent, "ds-base-modal-content", never, { "headerVariant": { "alias": "headerVariant"; "required": false; "isSignal": true; }; "footerVariant": { "alias": "footerVariant"; "required": false; "isSignal": true; }; }, {}, never, ["[header]", "[body]", "[footer]"], true, never>;
}
