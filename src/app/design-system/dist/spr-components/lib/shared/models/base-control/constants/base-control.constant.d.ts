import { InjectionToken } from '@angular/core';
import { ErrorMessages } from '../../../interfaces/error-messages.interface';
export declare const DEFAULT_ERROR_MESSAGE_CONFIG: InjectionToken<Partial<Record<string, import("../../../interfaces/error-messages.interface").ErrorMessageValue>>>;
export declare const injectDefaultErrorMessageConfig: () => ErrorMessages;
