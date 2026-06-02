import { TemplateRef } from '@angular/core';
import { DropdownOption } from '../../shared';
import { FilterValueAccessor } from '../../shared/utils';
import { SelectionTemplateType } from './selection.util';
import { BaseSelection } from './base-selection';
import { SelectionTemplateDirective } from './selection-template.directive';
import * as i0 from "@angular/core";
export declare class DsSelection extends BaseSelection implements FilterValueAccessor {
    private readonly customTemplates;
    protected readonly templatesMap: import("@angular/core").Signal<Map<SelectionTemplateType, TemplateRef<unknown>>>;
    protected readonly isShowSelectAllOption: import("@angular/core").Signal<boolean>;
    protected readonly isAllOptionsSelected: import("@angular/core").Signal<boolean>;
    protected readonly isPartiallyChecked: import("@angular/core").Signal<boolean>;
    protected readonly bufferSizePx: import("@angular/core").Signal<number>;
    protected readonly viewportMinHeightPx: import("@angular/core").Signal<number>;
    protected readonly selectedOptions: import("@angular/core").WritableSignal<DropdownOption[]>;
    protected readonly translationKeys: {
        readonly SEARCH_ERROR_TITLE: "SEARCH_ERROR_TITLE";
        readonly SEARCH_ERROR_SUBTITLE: "SEARCH_ERROR_SUBTITLE";
        readonly SELECT_ALL: "SELECT_ALL";
    };
    /**
     * To manage disableAutoApply from FillerValueAccessor
     * @Default false
     **/
    protected readonly autoApplyDisabled: import("@angular/core").WritableSignal<boolean>;
    /**
     * FillerValueAccessor implementation
     **/
    readonly filterValue: import("@angular/core").Signal<string[]>;
    /**
     * Translations
     * @Default DEFAULT_SELECTION_TRANSLATIONS
     **/
    translations: import("@angular/core").InputSignal<import("./selection.util").SelectionTranslations>;
    /**
     * The size of the item is needed for the virtual scroll
     * @Default 32
     **/
    itemSizePx: import("@angular/core").InputSignal<number>;
    /**
     * Specifies search strategy.
     * 'api' disables local filtering.
     * Use searchTermChange + scrolledToBottom events additionally to 'api' strategy.
     * @Default local
     **/
    searchStrategy: import("@angular/core").InputSignal<"local" | "api">;
    /**
     * Disables marker before option text (radio for single select)
     * @Default false
     **/
    disableItemMarker: import("@angular/core").ModelSignal<boolean>;
    /**
     * Switch between single select and multi select
     * @Default false
     **/
    multiselect: import("@angular/core").InputSignal<boolean>;
    /**
     * Disables built-in "select all" option.
     * Otherwise, option will appear when `multiselect` is `true` and `options.length` > `maxDisplayedItems`
     * @Default false
     **/
    disableSelectAllOption: import("@angular/core").ModelSignal<boolean>;
    /**
     * This value will be returned to control when all items selected
     * @Default not specified. It means that all options will be returned.
     **/
    widthByContent: import("@angular/core").InputSignal<boolean>;
    /**
     * You can set custom templates via input property.
     * Useful for cases when custom templates needed but this component is as a part of another.
     * @Default undefined
     **/
    templates: import("@angular/core").InputSignal<readonly SelectionTemplateDirective<SelectionTemplateType>[] | undefined>;
    readonly scrolledToBottom: import("@angular/core").OutputEmitterRef<void>;
    readonly optionsSelected: import("@angular/core").OutputEmitterRef<DropdownOption[]>;
    readonly valueChanged: import("@angular/core").OutputEmitterRef<void>;
    constructor();
    /**
     * FilterValueAccessor implementation
     **/
    apply(): void;
    /**
     * FilterValueAccessor implementation
     **/
    resetValue(): void;
    /**
     * FilterValueAccessor implementation
     **/
    disableAutoApply(value: boolean): void;
    writeValue(value: unknown | unknown[] | null): void;
    protected selectAll(): void;
    protected select(option: DropdownOption): void;
    protected onScrolledIndexChange(index: number): void;
    private updateSelectedOptions;
    private createTemplatesMap;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsSelection, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsSelection, "ds-selection", never, { "translations": { "alias": "translations"; "required": false; "isSignal": true; }; "itemSizePx": { "alias": "itemSizePx"; "required": false; "isSignal": true; }; "searchStrategy": { "alias": "searchStrategy"; "required": false; "isSignal": true; }; "disableItemMarker": { "alias": "disableItemMarker"; "required": false; "isSignal": true; }; "multiselect": { "alias": "multiselect"; "required": false; "isSignal": true; }; "disableSelectAllOption": { "alias": "disableSelectAllOption"; "required": false; "isSignal": true; }; "widthByContent": { "alias": "widthByContent"; "required": false; "isSignal": true; }; "templates": { "alias": "templates"; "required": false; "isSignal": true; }; }, { "disableItemMarker": "disableItemMarkerChange"; "disableSelectAllOption": "disableSelectAllOptionChange"; "scrolledToBottom": "scrolledToBottom"; "optionsSelected": "optionsSelected"; "valueChanged": "valueChanged"; }, ["customTemplates"], never, true, never>;
}
