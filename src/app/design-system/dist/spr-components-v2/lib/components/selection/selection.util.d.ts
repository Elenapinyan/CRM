import { InjectionToken } from '@angular/core';
import { DropdownOption } from '../../shared';
export declare const SelectionTranslationKeys: {
    readonly SEARCH_ERROR_TITLE: "SEARCH_ERROR_TITLE";
    readonly SEARCH_ERROR_SUBTITLE: "SEARCH_ERROR_SUBTITLE";
    readonly SELECT_ALL: "SELECT_ALL";
};
export type SelectionTranslationKey = (typeof SelectionTranslationKeys)[keyof typeof SelectionTranslationKeys];
export type SelectionTranslations = {
    [K in SelectionTranslationKey]: string;
};
export declare const SELECTION_TRANSLATIONS: InjectionToken<SelectionTranslations>;
export declare const DEFAULT_SELECTION_TRANSLATIONS: SelectionTranslations;
export declare const SelectionTemplateTypes: {
    readonly OPTION: "option";
    readonly SELECT_ALL: "select-all";
    readonly SEARCH_ERROR: "search-error";
};
export type SelectionTemplateType = (typeof SelectionTemplateTypes)[keyof typeof SelectionTemplateTypes];
interface OptionTemplateContext {
    $implicit: DropdownOption;
    isSelected: boolean;
}
interface SelectAllTemplateContext {
    $implicit: {
        text: string;
    };
    isSelected: boolean;
}
interface SearchErrorTemplateContext {
    $implicit: {
        title: string;
        subTitle: string;
    };
}
export type TemplateContext<Type extends SelectionTemplateType> = Type extends typeof SelectionTemplateTypes.OPTION ? OptionTemplateContext : Type extends typeof SelectionTemplateTypes.SELECT_ALL ? SelectAllTemplateContext : SearchErrorTemplateContext;
export {};
