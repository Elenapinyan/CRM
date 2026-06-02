import { StatusBadgePointColor } from './status-badge.options';
import * as i0 from "@angular/core";
import * as i1 from "../../directives/component-theme/component-theme.directive";
declare class DsStatusBadgeComponent {
    pointColor: import("@angular/core").InputSignal<StatusBadgePointColor>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsStatusBadgeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsStatusBadgeComponent, "ds-status-badge, [ds-status-badge], [dsStatusBadge]", never, { "pointColor": { "alias": "pointColor"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, [{ directive: typeof i1.ComponentThemeDirective; inputs: { "themeType": "themeType"; }; outputs: {}; }]>;
}
export { DsStatusBadgeComponent };
