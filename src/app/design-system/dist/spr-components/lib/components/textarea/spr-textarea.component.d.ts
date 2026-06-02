import { ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseControl } from '../../shared/models/base-control/base-control';
import * as i0 from "@angular/core";
export declare class SprTextareaComponent extends BaseControl<FormControl<string | null>> {
    maxTextareaLength: number | null;
    placeholder: string | null;
    rowsCount: number;
    textareaElement: ElementRef<HTMLTextAreaElement>;
    focus(): void;
    protected initControl(): FormControl<string | null>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprTextareaComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SprTextareaComponent, "spr-textarea", never, { "maxTextareaLength": { "alias": "maxTextareaLength"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "rowsCount": { "alias": "rowsCount"; "required": false; }; }, {}, never, never, true, never>;
}
