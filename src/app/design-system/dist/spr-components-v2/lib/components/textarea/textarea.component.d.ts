import { ElementRef, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseControl } from '../../shared';
import * as i0 from "@angular/core";
export declare class DsTextareaComponent extends BaseControl<FormControl<string | null>> {
    maxTextareaLength: number | null;
    placeholder: string | null;
    rowsCount: number;
    blurEvent: EventEmitter<FocusEvent>;
    textareaElement: ElementRef<HTMLTextAreaElement>;
    focus(): void;
    onBlur(event: FocusEvent): void;
    protected initControl(): FormControl<string | null>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsTextareaComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsTextareaComponent, "ds-textarea", never, { "maxTextareaLength": { "alias": "maxTextareaLength"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "rowsCount": { "alias": "rowsCount"; "required": false; }; }, { "blurEvent": "blurEvent"; }, never, never, true, never>;
}
