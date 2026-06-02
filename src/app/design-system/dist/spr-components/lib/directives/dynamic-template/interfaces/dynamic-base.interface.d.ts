export declare const DynamicPositions: {
    readonly START: "start";
    readonly END: "end";
    readonly INSIDE_START: "inside-start";
    readonly INSIDE_END: "inside-end";
};
export type DynamicPosition = (typeof DynamicPositions)[keyof typeof DynamicPositions];
export interface DynamicEntityViewConfig {
    position?: DynamicPosition;
    className?: string;
    container?: HTMLElement;
}
export interface DynamicElementModel<T extends HTMLElement> extends DynamicEntityViewConfig {
    element: T;
}
export declare abstract class AbstractDynamicElement<T extends HTMLElement> implements DynamicElementModel<T> {
    abstract position: DynamicPosition;
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
