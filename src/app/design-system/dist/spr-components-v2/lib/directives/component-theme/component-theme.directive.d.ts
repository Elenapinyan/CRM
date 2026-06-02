import { ComponentThemeType } from './component-theme.options';
import * as i0 from "@angular/core";
export declare class ComponentThemeDirective {
    /**
     * Input which sets [app-theme] attribute for component
     *
     * @type {ComponentThemeType}
     * 'light' - set light theme for component
     * 'dark'  - set dark theme for component
     * 'alt'   - set alt theme for component, if root theme is dark then alt will be light and vice versa
     * 'root'  - set root theme for component, means that component will use the same theme as root application (like rem)
     *  null   - set nothing, means that component will inheit theme from parent (like em)
     *
     * @default null
     */
    themeType: import("@angular/core").InputSignal<ComponentThemeType>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ComponentThemeDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ComponentThemeDirective, never, never, { "themeType": { "alias": "themeType"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
export declare const COMPONENT_THEME_HOST_DIRECTIVE: {
    directive: typeof ComponentThemeDirective;
    inputs: string[];
};
