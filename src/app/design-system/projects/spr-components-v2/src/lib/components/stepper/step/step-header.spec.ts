import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsStepHeader } from './step-header';
import { getElementByCss } from '../../../shared/utils';

describe('SprStepHeader', () => {
  let fixture: ComponentFixture<DsStepHeader>;
  let component: DsStepHeader;

  const MOCK_LABEL = 'MOCK_LABEL';
  const MOCK_DESCRIPTION = 'MOCK_DESCRIPTION';

  const MOCK_STEP = {
    label: MOCK_LABEL,
    description: MOCK_DESCRIPTION,
  };

  const NUMBER_SELECTOR = '[data-testid="step-number"]';
  const COMPLETED_ICON_SELECTOR = '[data-testid="step-completed-icon"]';
  const ERROR_ICON_SELECTOR = '[data-testid="step-error-icon"]';
  const LABEL_SELECTOR = '[data-testid="step-label"]';
  const DESCRIPTION_SELECTOR = '[data-testid="step-description"]';

  beforeEach(() => {
    fixture = TestBed.createComponent(DsStepHeader);

    component = fixture.componentInstance;

    fixture.componentRef.setInput('step', MOCK_STEP);

    fixture.detectChanges();
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should show num', () => {
      fixture.componentRef.setInput('isActive', true);
      fixture.componentRef.setInput('isInvalid', false);
      fixture.componentRef.setInput('isCompleted', false);

      fixture.detectChanges();

      const numElement = getElementByCss(fixture, NUMBER_SELECTOR);

      expect(numElement).toBeTruthy();
    });

    it('should show completed icon', () => {
      fixture.componentRef.setInput('isActive', false);
      fixture.componentRef.setInput('isInvalid', false);
      fixture.componentRef.setInput('isCompleted', true);

      fixture.detectChanges();

      const completedIconElement = getElementByCss(fixture, COMPLETED_ICON_SELECTOR);

      expect(completedIconElement).toBeTruthy();
    });

    it('should show invalid icon', () => {
      fixture.componentRef.setInput('isActive', false);
      fixture.componentRef.setInput('isInvalid', true);
      fixture.componentRef.setInput('isCompleted', true);

      fixture.detectChanges();

      const errorIconElement = getElementByCss(fixture, ERROR_ICON_SELECTOR);

      expect(errorIconElement).toBeTruthy();
    });

    it('should show correct label', () => {
      const element = getElementByCss(fixture, LABEL_SELECTOR);

      expect(element).toBeTruthy();
      expect(element.nativeElement.textContent.trim()).toBe(MOCK_LABEL);
    });

    it('should show correct description', () => {
      const element = getElementByCss(fixture, DESCRIPTION_SELECTOR);

      expect(element).toBeTruthy();
      expect(element.nativeElement.textContent.trim()).toBe(MOCK_DESCRIPTION);
    });
  });
});
