import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { getElementByCss, syncViewModel } from '../../shared/utils';
import { DsTextareaComponent } from './textarea.component';

describe('SprTextareaComponent', () => {
  let fixture: ComponentFixture<DsTextareaComponent>;
  let component: DsTextareaComponent;

  const TEXTAREA_SELECTOR = '[data-testid="textarea-element"]';
  const COUNTER_SELECTOR = '[data-testid="textarea-counter"]';
  const DESCRIPTION_SELECTOR = '[data-testid="textarea-description"]';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, DsTextareaComponent],
    });

    fixture = TestBed.createComponent(DsTextareaComponent);

    component = fixture.componentInstance;
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should focus manually', () => {
      fixture.detectChanges();

      const focusSpy = jest.spyOn(component.textareaElement.nativeElement, 'focus');

      component.focus();

      expect(focusSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit a blur event and mark the control as touched', () => {
      const spyOnCvaOnTouched = jest.spyOn(component as any, 'cvaOnTouched');
      const spyOnBlurEventEmit = jest.spyOn(component.blurEvent, 'emit');
      const testFocusEvent = new FocusEvent('textareaBlur');

      component.onBlur(testFocusEvent);

      expect(spyOnCvaOnTouched).toHaveBeenCalledTimes(1);
      expect(spyOnBlurEventEmit).toHaveBeenCalledTimes(1);
      expect(spyOnBlurEventEmit).toHaveBeenCalledWith(testFocusEvent);
    });
  });

  describe('View', () => {
    it('should add inputId', () => {
      const ID = 'test-id';

      fixture.componentRef.setInput('inputId', ID);

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, TEXTAREA_SELECTOR)?.nativeElement;

      expect(element.getAttribute('id')).toBe(ID);
    });

    it('should show maxTextareaLength', () => {
      const MAX_TEXTAREA_LENGTH = 500;
      const TEXTAREA_MOCK_VALUE = 'hello';

      const getTextAreaCountInnerTextExpectedResult = (maxTextareaLength: number, value: string): string => {
        return `${value.length || 0}/${maxTextareaLength}`;
      };

      component.maxTextareaLength = MAX_TEXTAREA_LENGTH;
      component.writeValue(TEXTAREA_MOCK_VALUE);

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, COUNTER_SELECTOR)?.nativeElement;

      expect(element.textContent?.trim()).toBe(getTextAreaCountInnerTextExpectedResult(MAX_TEXTAREA_LENGTH, TEXTAREA_MOCK_VALUE));
    });

    it('should set textarea placeholder', () => {
      const MOCK_PLACEHOLDER = 'Enter your message here...';

      component.placeholder = MOCK_PLACEHOLDER;

      syncViewModel(fixture);

      const textarea: HTMLTextAreaElement = getElementByCss(fixture, TEXTAREA_SELECTOR).nativeElement;

      expect(textarea.placeholder).toBe(MOCK_PLACEHOLDER);
    });

    it('should show description', () => {
      const MOCK_DESCRIPTION = 'description';

      component.description = MOCK_DESCRIPTION;

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, DESCRIPTION_SELECTOR).nativeElement;

      expect(element.textContent?.trim()).toBe(MOCK_DESCRIPTION);
    });

    it('should react on the native textarea blur event', () => {
      syncViewModel(fixture);

      const spyOnBlurEvenHandler = jest.spyOn(component, 'onBlur');
      const textarea: HTMLTextAreaElement = getElementByCss(fixture, 'textarea').nativeElement;
      textarea.focus();
      textarea.blur();

      expect(spyOnBlurEvenHandler).toHaveBeenCalledTimes(1);
    });
  });
});
