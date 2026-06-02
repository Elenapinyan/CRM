import { NgTemplateOutlet } from '@angular/common';
import { Component, Signal, TemplateRef } from '@angular/core';
import { ICellRendererParams } from '../../public-api';

interface TemplateContext<TData, TValue> {
  $implicit: TValue;
  data: TData;
  params: ICellRendererParams<TData, TValue>;
}

interface TemplateRendererParams<TData = unknown, TValue = unknown> extends ICellRendererParams<TData, TValue> {
  ngTemplate: Signal<TemplateRef<TemplateContext<TData, TValue>>>;
}

@Component({
  template: `<ng-container *ngTemplateOutlet="template; context: context" />`,
  imports: [NgTemplateOutlet],
})
export class AgGridTemplateRendererComponent<TData, TValue> {
  protected template!: TemplateRef<unknown>;
  protected context!: TemplateContext<TData, TValue>;

  public agInit(params: TemplateRendererParams<TData, TValue>): void {
    this.template = params.ngTemplate();

    this.context = {
      $implicit: params.value!,
      data: params.data!,
      params,
    };
  }
}
