import { OnInit } from '@angular/core';
import { BaseControlValueAccessor } from '../../../../shared/utils';
import { BetweenConditionValue } from '../conditions.util';
import * as i0 from "@angular/core";
export declare class DsConditionBetween extends BaseControlValueAccessor<BetweenConditionValue> implements OnInit {
    private readonly fb;
    private readonly destroyRef;
    protected readonly placeholderKeys: {
        readonly FROM: "from";
        readonly TO: "to";
    };
    protected readonly form: import("@angular/forms").FormGroup<{
        from: import("@angular/forms").FormControl<number | null>;
        to: import("@angular/forms").FormControl<number | null>;
    }>;
    translations: import("@angular/core").InputSignal<import("../conditions.util").ConditionsFilterTranslations>;
    writeValue(value: BetweenConditionValue): void;
    ngOnInit(): void;
    private formValueHandler;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsConditionBetween, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsConditionBetween, "ds-conditions-filter-between", never, { "translations": { "alias": "translations"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
