import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Type } from '@angular/core';

export const getElementByCss = <T>(fixture: ComponentFixture<T>, selector: string): DebugElement =>
  fixture.debugElement.query(By.css(selector));
export const getElementsByCss = <T>(fixture: ComponentFixture<T>, selector: string): DebugElement[] =>
  fixture.debugElement.queryAll(By.css(selector));
export const getElementByDirective = <T, D>(fixture: ComponentFixture<T>, type: Type<D>): DebugElement =>
  fixture.debugElement.query(By.directive(type));
