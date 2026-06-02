import { ComponentRef, Injector, Type } from '@angular/core';
import { DynamicEntityViewConfig } from './dynamic-base.interface';
import { BaseDynamicElement } from '../models';
export interface DynamicComponentConfig<T = unknown> extends DynamicEntityViewConfig {
    type: Type<T>;
    injector?: Injector;
}
export interface CreateComponentResult<T = unknown> {
    componentRef: ComponentRef<T>;
    dynamicElement: BaseDynamicElement;
    destroy: () => void;
}
