import { Provider } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import * as i0 from "@angular/core";
export declare const provideControlValueAccessor: <Type>(component: Type) => Provider;
export declare class BaseControlValueAccessor<Type = unknown> implements ControlValueAccessor {
    protected readonly ngControl: NgControl | null;
    protected readonly value: import("@angular/core").WritableSignal<Type | null>;
    protected readonly disabled: import("@angular/core").WritableSignal<boolean>;
    constructor();
    protected get isInvalidControl(): boolean;
    protected get isTouchedNgControl(): boolean;
    protected get isInvalidNgControl(): boolean;
    writeValue(value: Type): void;
    setDisabledState(isDisabled: boolean): void;
    registerOnChange(fn: (value: Type) => void): void;
    registerOnTouched(fn: (value?: Type) => void): void;
    protected onChange: (value: Type) => void;
    protected onTouched: (value?: Type) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BaseControlValueAccessor<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BaseControlValueAccessor<any>, never, never, {}, {}, never, never, true, never>;
}
