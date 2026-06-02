export declare const DynamicPositions: {
    readonly START: "start";
    readonly END: "end";
};
export declare const DynamicProjections: {
    readonly INSIDE: "inside";
    readonly OUTSIDE: "outside";
};
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
export declare abstract class AbstractDynamicElement<T extends HTMLElement> implements DynamicElementModel<T> {
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
