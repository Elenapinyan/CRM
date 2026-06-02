import { Signal, TemplateRef } from '@angular/core';
import { ICellRendererParams } from '../../public-api';
import * as i0 from "@angular/core";
interface TemplateContext<TData, TValue> {
    $implicit: TValue;
    data: TData;
    params: ICellRendererParams<TData, TValue>;
}
interface TemplateRendererParams<TData = unknown, TValue = unknown> extends ICellRendererParams<TData, TValue> {
    ngTemplate: Signal<TemplateRef<TemplateContext<TData, TValue>>>;
}
export declare class AgGridTemplateRendererComponent<TData, TValue> {
    protected template: TemplateRef<unknown>;
    protected context: TemplateContext<TData, TValue>;
    agInit(params: TemplateRendererParams<TData, TValue>): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AgGridTemplateRendererComponent<any, any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AgGridTemplateRendererComponent<any, any>, "ng-component", never, {}, {}, never, never, true, never>;
}
export {};
