import { SprToastService } from './services/spr-toast.service';
import * as i0 from "@angular/core";
export declare class SprToastsComponent {
    protected readonly toastService: SprToastService;
    readonly classes: {
        success: string;
        danger: string;
        warning: string;
        info: string;
    };
    readonly icons: {
        success: string;
        danger: string;
        warning: string;
        info: string;
    };
    constructor(toastService: SprToastService);
    static ɵfac: i0.ɵɵFactoryDeclaration<SprToastsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SprToastsComponent, "spr-toasts", never, {}, {}, never, never, true, never>;
}
