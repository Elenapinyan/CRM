import * as i0 from "@angular/core";
import * as i1 from "../../directives/component-theme/component-theme.directive";
type MonochromeBadgeShape = 'square' | 'circle';
declare class DsMonochromeBadgeComponent {
    /**
     * Badge content. If provided without projected content, it will be displayed inside the badge.
     */
    badgeContent: import("@angular/core").InputSignal<string | undefined>;
    /**
     * Is square badge. If true, the badge will be square (fixed height and width)
     *
     * @default false
     */
    isFixedSize: import("@angular/core").InputSignal<boolean>;
    /**
     * Input which sets shape class for component
     *
     * @type {MonochromeBadgeShape}
     * 'square' - set square shape for component
     * 'circle'  - set circle shape for component
     *
     * @default 'square'
     */
    badgeShape: import("@angular/core").InputSignal<MonochromeBadgeShape>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsMonochromeBadgeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsMonochromeBadgeComponent, "ds-monochrome-badge, [ds-monochrome-badge]", never, { "badgeContent": { "alias": "badgeContent"; "required": false; "isSignal": true; }; "isFixedSize": { "alias": "isFixedSize"; "required": false; "isSignal": true; }; "badgeShape": { "alias": "badgeShape"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, [{ directive: typeof i1.ComponentThemeDirective; inputs: { "themeType": "themeType"; }; outputs: {}; }]>;
}
export { DsMonochromeBadgeComponent };
