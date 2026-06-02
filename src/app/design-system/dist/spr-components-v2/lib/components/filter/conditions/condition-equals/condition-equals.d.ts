import { ConditionFilterType } from '../conditions.util';
import { BaseControlValueAccessor } from '../../../../shared/utils';
import * as i0 from "@angular/core";
export declare class DsConditionEquals extends BaseControlValueAccessor {
    protected readonly types: typeof ConditionFilterType;
    protected readonly placeholderKeys: {
        readonly FILTER: "filter";
    };
    translations: import("@angular/core").InputSignal<import("../conditions.util").ConditionsFilterTranslations>;
    type: import("@angular/core").InputSignal<ConditionFilterType>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsConditionEquals, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsConditionEquals, "ds-conditions-filter-equals", never, { "translations": { "alias": "translations"; "required": false; "isSignal": true; }; "type": { "alias": "type"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
