import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { getElementByCss, syncViewModel } from '../../shared/utils';
import { DsSearchInputComponent } from './search-input';

describe('SearchInputComponent', () => {
  let fixture: ComponentFixture<DsSearchInputComponent>;
  let component: DsSearchInputComponent;
  let componentRef: ComponentRef<DsSearchInputComponent>;
  let input: HTMLInputElement;

  const WRAPPER_SELECTOR = '[data-testid="search-input-wrapper"]';
  const INPUT_SELECTOR = '[data-testid="search-input"]';
  const CLEAR_BTN_SELECTOR = '[data-testid="search-clear-button"]';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, NgbTooltipModule, ClipboardModule, DsSearchInputComponent],
    });

    fixture = TestBed.createComponent(DsSearchInputComponent);

    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    input = getElementByCss(fixture, INPUT_SELECTOR).nativeElement;

    syncViewModel(fixture);
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should set the value', () => {
      const MOCK_VALUE = '123';

      component.writeValue(MOCK_VALUE);

      expect(input.value).toBe(MOCK_VALUE);
    });

    it('should change control size to small', () => {
      const SM_CLASS = 'control-field--small';

      component.controlSize = 'sm';

      syncViewModel(fixture);

      const div: HTMLElement = getElementByCss(fixture, WRAPPER_SELECTOR).nativeElement;

      expect(div.classList.contains(SM_CLASS)).toBeTruthy();
    });

    it('should add placeholder', () => {
      const PLACEHOLDER = 'test-placeholder';

      componentRef.setInput('placeholder', PLACEHOLDER);

      syncViewModel(fixture);

      expect(input.placeholder).toBe(PLACEHOLDER);
    });

    it('clear button should work', () => {
      let btn = getElementByCss(fixture, CLEAR_BTN_SELECTOR);
      expect(btn).toBeFalsy();

      component.writeValue('tmp');

      syncViewModel(fixture);

      const btnDebugElement = getElementByCss(fixture, CLEAR_BTN_SELECTOR);

      expect(btnDebugElement).toBeTruthy();

      (btnDebugElement.nativeElement as HTMLElement).click();

      syncViewModel(fixture);

      expect(input.value).toBeFalsy();
    });
  });
});
