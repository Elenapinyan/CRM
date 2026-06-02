import { OnInit } from '@angular/core';
import { ConditionFilterType, ConditionsFilterValue } from './conditions.util';
import { BaseControlValueAccessor, FilterValueAccessor } from '../../../shared/utils';
import * as i0 from "@angular/core";
export declare class DsConditions extends BaseControlValueAccessor<ConditionsFilterValue | null> implements FilterValueAccessor, OnInit {
    private readonly fb;
    private readonly destroyRef;
    private readonly dateParserFormatter;
    protected readonly conditions: {
        readonly BLANK: "blank";
        readonly EQUALS: "equals";
        readonly CONTAINS: "contains";
        readonly BETWEEN: "between";
    };
    protected readonly placeholderKeys: {
        readonly FILTER: "filter";
    };
    protected readonly form: import("@angular/forms").FormGroup<{
        condition: import("@angular/forms").FormControl<import("./conditions.util").ConditionExtendedType>;
        conditionValue: import("@angular/forms").FormControl<import("./conditions.util").ConditionValue>;
    }>;
    protected readonly conditionOptions: import("@angular/core").Signal<import("@platform-workspace/design-system-v2").DropdownOption[]>;
    readonly filterValue: import("@angular/core").Signal<string>;
    /**
     * Enables/disables value auto apply.
     * @Default false
     **/
    protected readonly autoApplyDisabled: import("@angular/core").WritableSignal<boolean>;
    /**
     * Specifies the value inputs type for filtering.
     * @Default text
     **/
    type: import("@angular/core").InputSignal<ConditionFilterType>;
    /**
     * Translate all options, displayed value and input placeholders.
     * Also, can be provided by token `CONDITIONS_FILTER_TRANSLATIONS`.
     * @Default If nothing set or provided DEFAULT_CONDITIONS_FILTER_TRANSLATIONS constant will be used.
     **/
    translations: import("@angular/core").InputSignal<import("./conditions.util").ConditionsFilterTranslations>;
    ngOnInit(): void;
    resetValue(): void;
    apply(): void;
    disableAutoApply(value: boolean): void;
    private formValueHandler;
    private prettifyFilterValue;
    private prettifySelectedConditionValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsConditions, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsConditions, "ds-conditions", never, { "type": { "alias": "type"; "required": false; "isSignal": true; }; "translations": { "alias": "translations"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
