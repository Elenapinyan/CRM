import { TemplateRef } from '@angular/core';
import { DynamicPosition } from './dynamic-base.interface';

export interface DynamicElementConfig<T = unknown> {
  elementName: string;
  position?: DynamicPosition;
  content?: string | TemplateRef<T>;
  className?: string;
  id?: string;
  container?: HTMLElement;
}
