import { PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ErrorMessages } from '../../interfaces/error-messages.interface';
import * as i0 from "@angular/core";
export declare class GetControlErrorMessagePipe implements PipeTransform {
    transform(controlErrors: ValidationErrors | null | undefined, errorMessages: ErrorMessages): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<GetControlErrorMessagePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<GetControlErrorMessagePipe, "getControlErrorMessage", true>;
}
