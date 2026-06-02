import { Renderer2 } from '@angular/core';
import { NODE_TYPE_COMMENT } from '../constants';
import { AbstractDynamicElement, DynamicElementModel, DynamicPosition, DynamicPositions } from '../interfaces';

export class BaseDynamicElement<T extends HTMLElement = HTMLElement> extends AbstractDynamicElement<T> implements DynamicElementModel<T> {
  private readonly renderer: Renderer2;

  private elementClassName?: string;
  private elementPosition!: DynamicPosition;
  private elementResolvedPosition?: DynamicPosition;
  private elementContainer?: HTMLElement;
  private readonly defaultContainer?: HTMLElement;

  readonly element: T;

  constructor(config: DynamicElementModel<T> & { renderer: Renderer2 }) {
    super();

    this.elementClassName = config.className;
    this.elementPosition = config.position ?? DynamicPositions.START;
    this.elementContainer = config.container;
    this.defaultContainer = config.container;

    this.element = config.element;

    this.renderer = config.renderer;
  }

  get container(): HTMLElement | undefined {
    return this.elementContainer;
  }

  get className(): string | undefined {
    return this.elementClassName;
  }

  get position(): DynamicPosition {
    return this.elementPosition;
  }

  set container(element: HTMLElement | undefined) {
    if (this.elementContainer === element && this.elementPosition === this.elementResolvedPosition) {
      return;
    }

    if (!element && this.elementContainer === this.defaultContainer && this.elementPosition === this.elementResolvedPosition) {
      return;
    }

    this.elementContainer = element ?? this.defaultContainer;

    this.resolvePosition();
  }

  set dynamicClass(value: string) {
    const prevClass = this.className;

    this.elementClassName = value;

    if (!this.renderer || !this.element) {
      return;
    }

    if (prevClass) {
      this.removeClass(prevClass);
    }

    if (this.className) {
      this.addClass(this.className);
    }
  }

  updatePosition(position: DynamicPosition, container: HTMLElement | null | undefined = this.container): void {
    if (this.elementPosition === position) {
      return;
    }

    this.elementPosition = position;

    this.resolvePosition(container);
  }

  resolvePosition(container: HTMLElement | null | undefined = this.container): void {
    if (!container || !this.element) {
      return;
    }

    if (container?.nodeType === NODE_TYPE_COMMENT) {
      return;
    }

    this.insertToPosition(this.element, container, this.position);

    this.elementResolvedPosition = this.position;
  }

  updateClass(): void {
    if (!this.className) {
      return;
    }

    this.addClass(this.className);
  }

  destroy(): void {
    const parentElement: HTMLElement = this.renderer.parentNode(this.element);

    this.renderer.removeChild(parentElement, this.element);
  }

  protected addClass(className: string): void {
    if (!className || !this.element) {
      return;
    }

    this.renderer.addClass(this.element, className);
  }

  protected removeClass(className: string): void {
    if (!className || !this.element) {
      return;
    }

    this.renderer.removeClass(this.element, className);
  }

  private insertToPosition(element: HTMLElement, container: Node, position?: DynamicPosition): void {
    switch (position) {
      case DynamicPositions.START: {
        const parentElement: HTMLElement = this.renderer.parentNode(container);

        this.renderer.insertBefore(parentElement, element, container);

        break;
      }
      case DynamicPositions.END: {
        const parentElement: HTMLElement = this.renderer.parentNode(container);

        if (container.nextSibling) {
          this.renderer.insertBefore(parentElement, element, container.nextSibling);
        } else {
          this.renderer.appendChild(parentElement, element);
        }

        break;
      }
      case DynamicPositions.INSIDE_START: {
        this.renderer.insertBefore(container, element, container.firstChild);

        break;
      }
      case DynamicPositions.INSIDE_END: {
        this.renderer.appendChild(container, element);

        break;
      }
    }
  }
}
