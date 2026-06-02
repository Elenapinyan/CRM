import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DsOpenMenuFooterDirective } from '../open-menu-footer.directive';
import { DsTestFooterHostComponent } from './open-menu-test.component';

describe('DsOpenMenuFooterDirective', () => {
  let fixture: ComponentFixture<DsTestFooterHostComponent>;
  let component: DsTestFooterHostComponent;
  let directiveElement: DebugElement;
  let directive: DsOpenMenuFooterDirective;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [DsTestFooterHostComponent],
    });

    fixture = TestBed.createComponent(DsTestFooterHostComponent);
    component = fixture.componentInstance;
    directiveElement = fixture.debugElement.query(By.directive(DsOpenMenuFooterDirective));
    directive = directiveElement.injector.get(DsOpenMenuFooterDirective);
    fixture.detectChanges();
  });

  describe('Canceled Output', () => {
    it('should call host component onCanceled when canceled is emitted', () => {
      const spy = jest.spyOn(component, 'onCanceled');

      directive.canceled.emit();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Submitted Output', () => {
    it('should call host component onSubmitted when submitted is emitted', () => {
      const spy = jest.spyOn(component, 'onSubmitted');

      directive.submitted.emit();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Directive Integration with Host', () => {
    it('should update component signal when canceled is emitted', () => {
      expect(component.canceledCalled()).toBe(false);

      directive.canceled.emit();

      expect(component.canceledCalled()).toBe(true);
    });

    it('should update component signal when submitted is emitted', () => {
      expect(component.submittedCalled()).toBe(false);

      directive.submitted.emit();

      expect(component.submittedCalled()).toBe(true);
    });

    it('should independently track canceled and submitted events', () => {
      expect(component.canceledCalled()).toBe(false);
      expect(component.submittedCalled()).toBe(false);

      directive.canceled.emit();
      expect(component.canceledCalled()).toBe(true);
      expect(component.submittedCalled()).toBe(false);

      directive.submitted.emit();
      expect(component.canceledCalled()).toBe(true);
      expect(component.submittedCalled()).toBe(true);
    });

    it('should maintain correct sequence of events', () => {
      const eventSequence: string[] = [];

      directive.canceled.subscribe(() => eventSequence.push('canceled'));
      directive.submitted.subscribe(() => eventSequence.push('submitted'));

      directive.canceled.emit();
      directive.submitted.emit();
      directive.canceled.emit();
      directive.submitted.emit();

      expect(eventSequence).toEqual(['canceled', 'submitted', 'canceled', 'submitted']);
    });
  });

  describe('Text Input Types', () => {
    it('should accept partial text input (submit required)', () => {
      const textInput = directive.text();
      expect(textInput?.submit).toBe('Submit');
    });

    it('should accept null to not render footer', () => {
      component.footerText.set(null);
      fixture.detectChanges();
      const textInput = directive.text();
      expect(textInput).toBeNull();
    });
  });

  describe('Directive Selector', () => {
    it('should apply directive to correct element', () => {
      const directiveElements = fixture.debugElement.queryAll(By.directive(DsOpenMenuFooterDirective));
      expect(directiveElements.length).toBe(1);
      expect(directiveElements[0]).toBe(directiveElement);
    });
  });
});
