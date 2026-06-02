import { ComponentFixture } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';

export function syncViewModel<T>(fixture: ComponentFixture<T>): void {
  fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges();
}
