import { ComponentFixture } from '@angular/core/testing';
import { DebugElement, Type } from '@angular/core';
export declare const getElementByCss: <T>(fixture: ComponentFixture<T>, selector: string) => DebugElement;
export declare const getElementsByCss: <T>(fixture: ComponentFixture<T>, selector: string) => DebugElement[];
export declare const getElementByDirective: <T, D>(fixture: ComponentFixture<T>, type: Type<D>) => DebugElement;
