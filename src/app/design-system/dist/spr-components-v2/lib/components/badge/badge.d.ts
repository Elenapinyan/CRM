import { BaseBadge } from './base-badge';
import * as i0 from "@angular/core";
export declare class DsBadge extends BaseBadge {
    /**
     * Content as a property. You can also use content projection.
     * @optional
     **/
    content: import("@angular/core").InputSignal<string | undefined>;
    /**
     * Start icon as a property. Provide a ds-icon class.
     * @example
     * <ds-badge [icon]="ds-icon-..." />
     * @optional
     **/
    icon: import("@angular/core").InputSignal<string | undefined>;
    /**
     * End icon as a property. Provide a ds-icon class.
     * @example
     * <ds-badge [iconEnd]="ds-icon-..." />
     * @optional
     **/
    iconEnd: import("@angular/core").InputSignal<string | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsBadge, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsBadge, "ds-badge,[ds-badge],[dsBadge]", never, { "content": { "alias": "content"; "required": false; "isSignal": true; }; "icon": { "alias": "icon"; "required": false; "isSignal": true; }; "iconEnd": { "alias": "iconEnd"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
