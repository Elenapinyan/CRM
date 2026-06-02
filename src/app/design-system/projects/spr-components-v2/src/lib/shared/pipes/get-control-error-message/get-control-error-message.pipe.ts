import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { UNKNOWN_ERROR } from '../../constants/unknown-error.constant';
import { ValidatorsKeys } from '../../enums/validators.enum';
import { ErrorMessages } from '../../interfaces/error-messages.interface';

@Pipe({
  name: 'getControlErrorMessage',
  standalone: true,
})
export class GetControlErrorMessagePipe implements PipeTransform {
  transform(controlErrors: ValidationErrors | null | undefined, errorMessages: ErrorMessages): string | null {
    if (!controlErrors) {
      return null;
    }

    const errorKey = Object.keys(controlErrors).find((errorProperty) => errorProperty in errorMessages) as ValidatorsKeys;
    const error = errorMessages[errorKey];

    if (!error) {
      return UNKNOWN_ERROR;
    }
    if (typeof error === 'string') {
      return error;
    }

    return error(controlErrors[errorKey]);
  }
}
