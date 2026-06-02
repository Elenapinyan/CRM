import { OffCanvasVariant } from './interfaces/off-canvas.interface';
import * as i0 from "@angular/core";
export declare class DsBaseOffCanvasContentComponent {
    headerVariant: import("@angular/core").InputSignal<OffCanvasVariant>;
    footerVariant: import("@angular/core").InputSignal<OffCanvasVariant>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsBaseOffCanvasContentComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsBaseOffCanvasContentComponent, "ds-base-off-canvas-content", never, { "headerVariant": { "alias": "headerVariant"; "required": false; "isSignal": true; }; "footerVariant": { "alias": "footerVariant"; "required": false; "isSignal": true; }; }, {}, never, ["[header]", "[body]", "[footer]", "[backdrop]"], true, never>;
}
