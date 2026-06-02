import { FormControl } from '@angular/forms';
import { BaseControl } from '../../shared';
import * as i0 from "@angular/core";
import * as i1 from "../../directives/component-theme/component-theme.directive";
export declare class DsSearchInputComponent extends BaseControl<FormControl<string>, string> {
    /**
     * Default options for the input component
     */
    private readonly defaultOptions;
    /**
     * css selector to filter nodes for search
     */
    contentSelector: import("@angular/core").InputSignal<string | undefined>;
    /**
     * The text to display as the placeholder for the input
     */
    readonly placeholder: import("@angular/core").InputSignal<string>;
    /**
     * Is search sensitive to case
     */
    readonly matchCase: import("@angular/core").InputSignal<boolean>;
    /**
     * Scroll to match when toggle active match
     */
    readonly scrollToActiveMatch: import("@angular/core").InputSignal<boolean>;
    /**
     * Scroll to match when toggle active match
     */
    readonly isClientSearchNavigation: import("@angular/core").InputSignal<boolean>;
    /**
     * Array of matches
     */
    protected ranges: import("@angular/core").WritableSignal<Range[]>;
    /**
     * index of active match (-1 for unselected)
     */
    protected activeRangeIndex: import("@angular/core").WritableSignal<number>;
    protected activeRange: import("@angular/core").Signal<Range>;
    private readonly document;
    /**
     * Highlights api
     */
    private readonly highlights;
    constructor();
    writeValue(value: number | string | null): void;
    protected initControl(): FormControl<string>;
    /**
     * Initialize control listener to emit changes
     */
    protected initControlListener(): void;
    protected changeActiveRange(next?: boolean): void;
    private scrollToElement;
    /**
     * Get all text nodes filtered by selector input
     */
    private getTextNodes;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsSearchInputComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsSearchInputComponent, "ds-search-input", never, { "contentSelector": { "alias": "contentSelector"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "matchCase": { "alias": "matchCase"; "required": false; "isSignal": true; }; "scrollToActiveMatch": { "alias": "scrollToActiveMatch"; "required": false; "isSignal": true; }; "isClientSearchNavigation": { "alias": "isClientSearchNavigation"; "required": false; "isSignal": true; }; }, {}, never, ["[prependContent]"], true, [{ directive: typeof i1.ComponentThemeDirective; inputs: { "themeType": "themeType"; }; outputs: {}; }]>;
}
