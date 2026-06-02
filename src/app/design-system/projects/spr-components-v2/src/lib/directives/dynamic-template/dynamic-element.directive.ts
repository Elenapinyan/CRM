import { Directive, ElementRef, Input, TemplateRef } from '@angular/core';

import { DynamicElementConfig, DynamicPosition, DynamicPositions } from './interfaces';
import { BaseDynamicElement } from './models';
import { DsDynamicBaseDirective } from './dynamic-base.directive';

@Directive({
  selector: '[dsDynamicElement]',
  standalone: true,
})
export class DsDynamicElementDirective<T = unknown> extends DsDynamicBaseDirective<T> {
  @Input()
  set dsDynamicElementId(value: string | undefined) {
    this.dElementId = value;

    if (this.dElement && !this.dElementId) {
      this.removeId(this.dElement.element);

      return;
    }

    if (this.dElement && this.dElementId) {
      this.setId(this.dElement.element, this.dElementId);
    }
  }

  @Input() set dsDynamicElementPosition(value: DynamicPosition) {
    if (this.dElementPosition === value) {
      return;
    }

    this.dElementPosition = value;

    this.dElement?.updatePosition(value);
  }

  @Input()
  set dsDynamicElementClass(value: string | undefined) {
    if (!this.dElement) {
      return;
    }

    if (value) {
      this.dElement.dynamicClass = value;
    }
  }

  @Input()
  set dsDynamicElementName(value: string | undefined) {
    if (this.dElementName === value && this.dElement) {
      return;
    }

    this.dElementName = value;

    this.createElement();

    // Resolve element position according to set position
    this.dElement!.resolvePosition();

    if (this.dElement && this.dElementContent) {
      this.setContent(this.dElement.element, this.dElementContent);
    }
  }

  @Input()
  set dsDynamicElementContent(value: string | TemplateRef<T> | undefined) {
    if (!this.dElement || this.dElement.element?.textContent === value) {
      return;
    }

    this.dElementContent = value;

    this.setContent(this.dElement.element, this.dElementContent);
  }

  @Input()
  set dsDynamicElementCustomContainer(value: ElementRef<HTMLElement> | HTMLElement | undefined) {
    if (!this.dElement) {
      return;
    }

    const element = value instanceof ElementRef ? value.nativeElement : value;

    if (this.dElement.container === element) {
      return;
    }

    this.dElementContainer = element;

    this.dElement.container = element;
  }

  // To catch inputId of components
  @Input() inputId?: string;

  private dElement?: BaseDynamicElement;
  private dElementName?: string;
  private dElementId?: string;
  private dElementPosition: DynamicPosition = DynamicPositions.START;
  private dElementContent?: string | TemplateRef<T>;
  private dElementContainer?: HTMLElement;

  get dsDynamicElementName(): string | undefined {
    return this.dElementName;
  }

  protected get dynamicElement(): BaseDynamicElement | undefined {
    return this.dElement;
  }

  protected get position(): DynamicPosition {
    return this.dElementPosition;
  }

  protected configureManually(config: DynamicElementConfig<T>): void {
    const { id, elementName, position, content, className, container } = config;

    if (!elementName) {
      console.error('Dynamic element name is required');

      return;
    }

    this.dElementName = elementName;

    if (id) {
      this.dElementId = id;
    }

    if (position) {
      this.dElementPosition = position;
    }

    if (content) {
      this.dElementContent = content;
    }

    if (container) {
      this.dElementContainer = container;
    }

    if (className) {
      this.dsDynamicElementClass = className;
    }
  }

  protected setContent(el: HTMLElement, value: string | TemplateRef<T> | undefined): void {
    if (value && typeof value === 'string') {
      this.setTextContent(el, value);
    }

    if (value && value instanceof TemplateRef) {
      this.setTempateContent(el, value);
    }
  }

  protected setId(el: HTMLElement, value: string): void {
    this.renderer.setAttribute(el, 'id', value);
  }

  protected removeId(el: HTMLElement): void {
    this.renderer.removeAttribute(el, 'id');
  }

  protected setFor(el: HTMLElement, value: string): void {
    this.renderer.setAttribute(el, 'for', value);
  }

  protected setTextContent(el: HTMLElement, value: string): void {
    this.renderer.setProperty(el, 'textContent', value);
  }

  protected setTempateContent(el: HTMLElement, value: TemplateRef<T>): void {
    const template = this.viewContainerRef.createEmbeddedView(value);

    for (const node of template.rootNodes) {
      this.renderer.appendChild(el, node);
    }
  }

  protected createElement(): HTMLElement {
    const temporaryElement: HTMLElement = this.renderer.createElement(this.dElementName!) as HTMLElement;

    if (this.dElementId) {
      this.setId(temporaryElement, this.dElementId);
    }

    if (this.dElementContent) {
      this.setContent(temporaryElement, this.dElementContent);
    }

    this.dElement = this.addDynamicElement({
      element: temporaryElement,
      position: this.dElementPosition!,
      container: this.dElementContainer,
    });

    return this.dElement.element;
  }
}
