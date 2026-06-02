import { inject, InjectionToken } from '@angular/core';
import { VALIDATION_MESSAGES } from '../../../enums/validators.enum';
import { ErrorMessages } from '../../../interfaces/error-messages.interface';

export const DEFAULT_ERROR_MESSAGE_CONFIG = new InjectionToken<ErrorMessages>('DEFAULT_ERROR_MESSAGE_CONFIG');

export const injectDefaultErrorMessageConfig = (): ErrorMessages => {
  const defaultErrorMessages = inject(DEFAULT_ERROR_MESSAGE_CONFIG, { optional: true });

  return defaultErrorMessages || VALIDATION_MESSAGES;
};
