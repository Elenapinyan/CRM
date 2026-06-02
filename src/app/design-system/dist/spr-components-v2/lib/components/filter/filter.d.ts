import * as i0 from "@angular/core";
export declare class DsFilter {
    private readonly menu;
    protected readonly child: import("@angular/core").Signal<import("../../shared/utils").FilterValueAccessor | undefined>;
    protected readonly header: import("@angular/core").Signal<void | undefined>;
    protected readonly customFooterImplementation: import("@angular/core").Signal<boolean | undefined>;
    protected readonly value: import("@angular/core").Signal<string>;
    protected readonly isArrayFilterValue: import("@angular/core").Signal<boolean>;
    protected readonly translationsKeys: {
        readonly RESET: "reset";
        readonly APPLY: "apply";
    };
    readonly pureValue: import("@angular/core").Signal<string | string[] | null | undefined>;
    /**
     * @Required
     **/
    label: import("@angular/core").InputSignal<unknown>;
    /**
     * Custom inner header
     **/
    innerHeader: import("@angular/core").InputSignal<boolean>;
    /**
     * You can specify custom value to display in filter.
     * Otherwise, child component value is expected.
     **/
    displayValue: import("@angular/core").InputSignal<string | null>;
    /**
     * You can specify maximum count of displayed values in case filter value is `string[]`
     * @Default 3
     **/
    maxValuesDisplay: import("@angular/core").InputSignal<number>;
    /**
     * You can enable/disable footer
     * @Default true
     **/
    footer: import("@angular/core").InputSignal<boolean>;
    /**
     * You can enable custom toggle then use ng-content[toggle] to project your specific template.
     * @Default false
     **/
    customToggle: import("@angular/core").InputSignal<boolean>;
    /**
     * Variant of the default toggle
     * @Default 'default'
     **/
    variant: import("@angular/core").InputSignal<"default" | "short">;
    /**
     * Translate all options, displayed value and input placeholders.
     * Also, can be provided by token `CONDITIONS_FILTER_TRANSLATIONS`.
     * @Default If nothing set or provided DEFAULT_CONDITIONS_FILTER_TRANSLATIONS constant will be used.
     **/
    translations: import("@angular/core").InputSignal<import("./filter.util").FilterTranslations>;
    constructor();
    apply(): void;
    resetValue(): void;
    closeMenu(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsFilter, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsFilter, "ds-filter", never, { "label": { "alias": "label"; "required": true; "isSignal": true; }; "innerHeader": { "alias": "innerHeader"; "required": false; "isSignal": true; }; "displayValue": { "alias": "displayValue"; "required": false; "isSignal": true; }; "maxValuesDisplay": { "alias": "maxValuesDisplay"; "required": false; "isSignal": true; }; "footer": { "alias": "footer"; "required": false; "isSignal": true; }; "customToggle": { "alias": "customToggle"; "required": false; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "translations": { "alias": "translations"; "required": false; "isSignal": true; }; }, {}, ["child", "header", "customFooterImplementation"], ["[toggle]", "[innerHeader]", "ds-filter-inner-header", "*"], true, never>;
}
