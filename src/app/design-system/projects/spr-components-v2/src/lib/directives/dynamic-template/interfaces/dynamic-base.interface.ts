export const DynamicPositions = {
  START: 'start',
  END: 'end',
} as const;

export const DynamicProjections = {
  INSIDE: 'inside',
  OUTSIDE: 'outside',
} as const;

export type DynamicPosition = (typeof DynamicPositions)[keyof typeof DynamicPositions];
export type DynamicProjection = (typeof DynamicProjections)[keyof typeof DynamicProjections];

export interface DynamicEntityViewConfig {
  position?: DynamicPosition;
  projection?: DynamicProjection;
  className?: string;
  container?: HTMLElement;
}

export interface DynamicElementModel<T extends HTMLElement> extends DynamicEntityViewConfig {
  element: T;
}

export abstract class AbstractDynamicElement<T extends HTMLElement> implements DynamicElementModel<T> {
  abstract position: DynamicPosition;
  abstract projection: DynamicProjection;
  abstract element: T;
  abstract className?: string;
  abstract container?: HTMLElement;

  abstract set dynamicClass(value: string);

  abstract updateClass(): void;

  abstract resolvePosition(container?: HTMLElement): void;

  abstract updatePosition(position: DynamicPosition, container: HTMLElement): void;

  protected abstract addClass(className: string): void;

  protected abstract removeClass(className: string): void;
}
