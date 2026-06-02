import { CommonModule } from '@angular/common';
import { Component, ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { getElementByCss, syncViewModel } from '../../shared/utils';
import { DsInlineTip } from './inline-tip';

const content = 'projected content';

@Component({
  selector: 'ds-test',
  template: `
    <ds-inline-tip class="spr-inline-tip-component" [type]="type()" [variant]="variant()">
      {{ content }}
    </ds-inline-tip>
  `,
  imports: [DsInlineTip],
})
class TestComponent extends DsInlineTip {
  content = content;
}

describe('InlineTip', () => {
  let fixture: ComponentFixture<TestComponent>;
  let componentRef: ComponentRef<TestComponent>;

  const DEFAULT_TYPE = 'primary';
  const OTHER_TYPE = 'warning';
  const DEFAULT_VARIANT = 'filled';
  const OTHER_VARIANT = 'plain';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule],
    });

    fixture = TestBed.createComponent(TestComponent);

    componentRef = fixture.componentRef;

    syncViewModel(fixture);
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(fixture.componentInstance).toBeTruthy();
    });
  });

  describe('View', () => {
    it('check default type = primary', () => {
      const element: HTMLElement = getElementByCss(fixture, '.spr-inline-tip-component').nativeElement;

      expect(element.classList.contains(DEFAULT_TYPE)).toBeTruthy();
    });

    it('check default variant = filled', () => {
      const element: HTMLElement = getElementByCss(fixture, '.spr-inline-tip-component').nativeElement;

      expect(element.classList.contains(DEFAULT_VARIANT)).toBeTruthy();
    });

    it('should change type', () => {
      componentRef.setInput('type', OTHER_TYPE);
      fixture.detectChanges();
      const element: HTMLElement = getElementByCss(fixture, '.spr-inline-tip-component').nativeElement;
      expect(element.classList.contains(OTHER_TYPE)).toBeTruthy();
    });

    it('should change variant', () => {
      componentRef.setInput('variant', OTHER_VARIANT);
      fixture.detectChanges();
      const element: HTMLElement = getElementByCss(fixture, '.spr-inline-tip-component').nativeElement;
      expect(element.classList.contains(OTHER_VARIANT)).toBeTruthy();
    });
  });
});
