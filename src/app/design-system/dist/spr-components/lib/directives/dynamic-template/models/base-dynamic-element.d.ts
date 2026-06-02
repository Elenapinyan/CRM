import { Renderer2 } from '@angular/core';
import { AbstractDynamicElement, DynamicElementModel, DynamicPosition } from '../interfaces';
export declare class BaseDynamicElement<T extends HTMLElement = HTMLElement> extends AbstractDynamicElement<T> implements DynamicElementModel<T> {
    private readonly renderer;
    private elementClassName?;
    private elementPosition;
    private elementResolvedPosition?;
    private elementContainer?;
    private readonly defaultContainer?;
    readonly element: T;
    constructor(config: DynamicElementModel<T> & {
        renderer: Renderer2;
    });
    get container(): HTMLElement | undefined;
    get className(): string | undefined;
    get position(): DynamicPosition;
    set container(element: HTMLElement | undefined);
    set dynamicClass(value: string);
    updatePosition(position: DynamicPosition, container?: HTMLElement | null | undefined): void;
    resolvePosition(container?: HTMLElement | null | undefined): void;
    updateClass(): void;
    destroy(): void;
    protected addClass(className: string): void;
    protected removeClass(className: string): void;
    private insertToPosition;
}
