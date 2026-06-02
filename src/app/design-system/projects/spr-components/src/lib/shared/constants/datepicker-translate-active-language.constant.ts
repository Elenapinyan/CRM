import { InjectionToken } from '@angular/core';
import { ActiveLanguageFactory } from '../interfaces';

export const DATEPICKER_TRANSLATE_ACTIVE_LANGUAGE = new InjectionToken<ActiveLanguageFactory>('DATEPICKER_TRANSLATE_ACTIVE_LANGUAGE', {
  factory: (): ActiveLanguageFactory => ({
    getActiveLanguage(): string {
      return navigator.language;
    },
  }),
});
