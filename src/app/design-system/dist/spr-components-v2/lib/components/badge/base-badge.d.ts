import { BadgeRadius, BadgeSize, BadgeVariant } from './badge.options';
import * as i0 from "@angular/core";
export declare class BaseBadge {
    /**
     * Border radius.
     * @default 'squared'
     **/
    radius: import("@angular/core").InputSignal<BadgeRadius>;
    /**
     * Badge size.
     * @default 'sm'
     **/
    size: import("@angular/core").InputSignal<BadgeSize>;
    /**
     * Badge variant.
     * @default 'neutral'
     **/
    variant: import("@angular/core").InputSignal<BadgeVariant>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BaseBadge, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BaseBadge, never, never, { "radius": { "alias": "radius"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
