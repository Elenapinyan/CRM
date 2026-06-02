import { TemplateRef } from '@angular/core';

export function isTemplateRef<T = unknown>(value: unknown): value is TemplateRef<T> {
  return value instanceof TemplateRef;
}
