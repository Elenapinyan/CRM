import { ChangeDetectorRef, ComponentRef, Directive, ElementRef, inject, Injector, Input, NgModuleRef, Type } from '@angular/core';

import { CreateComponentResult, DynamicComponentConfig, DynamicPosition } from './interfaces';
import { BaseDynamicElement } from './models';
import { SprDynamicBaseDirective } from './spr-dynamic-base.directive';

@Directive({
  selector: '[sprDynamicComponent]',
  standalone: true,
})
export class SprDynamicComponentDirective<T = unknown> extends SprDynamicBaseDirective<T> {
  @Input() set sprDynamicComponentPosition(value: DynamicPosition) {
    if (this.componentPosition === value) {
      return;
    }

    this.componentPosition = value;

    this.dElement?.updatePosition(value);
  }

  @Input() set sprDynamicComponentCustomContainer(value: ElementRef<HTMLElement> | HTMLElement | undefined) {
    if (!this.dElement) {
      return;
    }

    const element = value instanceof ElementRef ? value.nativeElement : value;

    if (this.dElement.container === element) {
      return;
    }

    this.componentContainer = element;

    this.dElement.container = element;
  }

  @Input()
  set sprDynamicComponentClass(value: string | undefined) {
    if (!this.dElement) {
      return;
    }

    if (value) {
      this.dElement.dynamicClass = value;
    }
  }

  @Input()
  set sprDynamicComponent(value: Type<T> | undefined) {
    this.dComponentType = value;

    if (!this.dComponentType) {
      return;
    }

    this.createOneComponent();

    // For case when we use this directive as StructuralDirective we need to create embedded view
    // But in attribute directive we don't have templateRef
    this.viewRef = this.templateRef ? this.viewContainerRef.createEmbeddedView(this.templateRef) : null;

    // Insert our new component to selected position
    this.dElement?.resolvePosition();

    // Add custom class for our component
    if (this.dElement && this.sprDynamicComponentClass) {
      this.dElement.dynamicClass = this.sprDynamicComponentClass;
    }

    this.cdRef.markForCheck();
  }

  @Input() dynamicComponentInjector: Injector = this.viewContainerRef.injector;

  private componentPosition?: DynamicPosition;
  private componentClass?: string;
  private componentContainer?: HTMLElement;
  private dComponentType?: Type<T>;
  private dElement?: BaseDynamicElement;

  protected readonly cdRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  protected readonly ngModuleRef: NgModuleRef<unknown> = inject(NgModuleRef);

  private ref?: ComponentRef<T>;

  get componentType(): Type<T> | undefined {
    return this.dComponentType;
  }

  get dynamicElement(): BaseDynamicElement | undefined {
    return this.dElement;
  }

  get componentRef(): ComponentRef<T> | undefined {
    return this.ref;
  }

  get sprDynamicComponentClass(): string | undefined {
    return this.dElement?.dynamicClass;
  }

  destroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }

    if (this.dynamicElement) {
      this.removeDynamicElement(this.dynamicElement);
    }

    this.ref = undefined;
  }

  protected createComponent(config?: DynamicComponentConfig<T>): CreateComponentResult<T> | null {
    const componentType = config?.type ?? this.componentType;

    if (!componentType) {
      console.error('Dynamic component type is not set.');

      return null;
    }

    const componentRef = this.viewContainerRef.createComponent(componentType, {
      injector: config?.injector ?? this.dynamicComponentInjector,
      ngModuleRef: this.ngModuleRef,
    });

    const dynamicElement: BaseDynamicElement = this.addDynamicElement({
      element: componentRef?.location.nativeElement,
      position: config?.position ?? this.componentPosition,
      className: config?.className ?? this.componentClass,
      container: config?.container ?? this.componentContainer,
    });

    // Add _ng-content-* attribute to make it visible for styles
    this.addNgContentAttribute(dynamicElement.element);

    const destroy = (): void => this.removeDynamicElement(dynamicElement);

    return { componentRef, dynamicElement, destroy };
  }

  protected createOneComponent(config?: DynamicComponentConfig<T>): void {
    const result = this.createComponent(config);

    if (config) {
      this.configureManually(config);
    }

    if (result) {
      this.ref = result.componentRef;
      this.dElement = result.dynamicElement;
    }
  }

  protected configureManually(config: DynamicComponentConfig<T>): void {
    const { type, position, className, container } = config;

    this.dComponentType = type;

    if (position) {
      this.componentPosition = position;
    }

    if (className) {
      this.componentClass = className;
    }

    if (container) {
      this.componentContainer = container;
    }

    this.cdRef.markForCheck();
  }

  private addNgContentAttribute<E extends HTMLElement>(element: E): void {
    /*
     * according to issue https://github.com/angular/angular/issues/12215
     * We need this code to add _ngcontent-***-c*** to dynamically created component,
     * otherwise it won't work with incapsulated css.
     */
    const div = this.renderer.createElement('div');
    const contentAttr = div.attributes?.[0]?.name;

    if (!contentAttr) {
      return;
    }

    this.renderer.setAttribute(element, contentAttr, '');
  }
}
