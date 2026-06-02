import { OnInit } from '@angular/core';
import { BlankConditionValue, ConditionFilterType } from '../conditions.util';
import { BaseControlValueAccessor } from '../../../../shared/utils';
import * as i0 from "@angular/core";
export declare class DsConditionBlank extends BaseControlValueAccessor<BlankConditionValue> implements OnInit {
    private readonly fb;
    private readonly destroyRef;
    protected readonly types: typeof ConditionFilterType;
    protected readonly operators: {
        readonly OR: "or";
        readonly AND: "and";
    };
    protected readonly conditions: {
        readonly EQUALS: "equals";
        readonly CONTAINS: "contains";
        readonly BETWEEN: "between";
    };
    protected readonly placeholderKeys: {
        readonly FILTER: "filter";
    };
    protected readonly form: import("@angular/forms").FormGroup<{
        operator: import("@angular/forms").FormControl<import("../conditions.util").BlankConditionOperatorType>;
        condition: import("@angular/forms").FormControl<import("../conditions.util").ConditionType>;
        conditionValue: import("@angular/forms").FormControl<string | number | import("../conditions.util").BetweenConditionValue | null>;
    }>;
    protected readonly options: import("@angular/core").Signal<import("@platform-workspace/design-system-v2").DropdownOption[]>;
    type: import("@angular/core").InputSignal<ConditionFilterType>;
    translations: import("@angular/core").InputSignal<import("../conditions.util").ConditionsFilterTranslations>;
    ngOnInit(): void;
    writeValue(value: BlankConditionValue): void;
    private formValueHandler;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsConditionBlank, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsConditionBlank, "ds-conditions-filter-blank", never, { "type": { "alias": "type"; "required": false; "isSignal": true; }; "translations": { "alias": "translations"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
