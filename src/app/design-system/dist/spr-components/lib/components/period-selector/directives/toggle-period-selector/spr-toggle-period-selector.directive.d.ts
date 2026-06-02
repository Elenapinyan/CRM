import { DestroyRef, EventEmitter, ViewContainerRef } from '@angular/core';
import { DateRange } from '../../index';
import { PeriodSelectorFooterSettings } from '../../interfaces/period-selector.interface';
import * as i0 from "@angular/core";
export declare class SprTogglePeriodSelectorDirective {
    private readonly viewContainerRef;
    private readonly destroyRef;
    footerSettings: PeriodSelectorFooterSettings;
    maxRangeInDays: number;
    isDisabled: boolean;
    inputId: string;
    rangeConfirmed: EventEmitter<DateRange | null>;
    rangeCanceled: EventEmitter<void>;
    private componentRef;
    private isConfirmed;
    constructor(viewContainerRef: ViewContainerRef, destroyRef: DestroyRef);
    onClick(): void;
    private toggleSelector;
    private subscribeToCalendarCloseEvent;
    private subscribeToRangeConfirmEvent;
    private subscribeToRangeCancelEvent;
    private destroyComponent;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprTogglePeriodSelectorDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SprTogglePeriodSelectorDirective, "[sprTogglePeriodSelector]", never, { "footerSettings": { "alias": "footerSettings"; "required": false; }; "maxRangeInDays": { "alias": "maxRangeInDays"; "required": false; }; "isDisabled": { "alias": "isDisabled"; "required": false; }; "inputId": { "alias": "inputId"; "required": false; }; }, { "rangeConfirmed": "rangeConfirmed"; "rangeCanceled": "rangeCanceled"; }, never, never, true, never>;
}
