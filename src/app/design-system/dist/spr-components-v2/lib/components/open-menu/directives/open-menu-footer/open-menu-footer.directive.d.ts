import { SprMenuFooterText } from './open-menu-footer.util';
import * as i0 from "@angular/core";
export declare class DsOpenMenuFooterDirective {
    text: import("@angular/core").InputSignal<SprMenuFooterText>;
    canceled: import("@angular/core").OutputEmitterRef<void>;
    submitted: import("@angular/core").OutputEmitterRef<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsOpenMenuFooterDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DsOpenMenuFooterDirective, "[dsOpenMenuFooter]", never, { "text": { "alias": "dsOpenMenuFooter"; "required": true; "isSignal": true; }; }, { "canceled": "canceled"; "submitted": "submitted"; }, never, never, true, never>;
}
