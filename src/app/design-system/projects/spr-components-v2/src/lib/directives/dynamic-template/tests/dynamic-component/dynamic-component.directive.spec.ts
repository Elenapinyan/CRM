import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DynamicComponentTestComponent } from './dynamic-component-test.component';
import { DsDynamicComponentDirective } from '../../dynamic-component.directive';
import { DynamicPositions } from '../../interfaces';
import { getElementByDirective, syncViewModel } from '../../../../shared/utils';
import { DsLabelComponent } from '../../../../components/label/label.component';

describe('DsDynamicComponentDirective', () => {
  let fixture: ComponentFixture<DynamicComponentTestComponent>;
  let component: DynamicComponentTestComponent;
  let elementName = 'ds-label';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        NgbTooltipModule,
        ClipboardModule,
        DynamicComponentTestComponent,
        DsDynamicComponentDirective,
      ],
    });

    fixture = TestBed.createComponent(DynamicComponentTestComponent);

    component = fixture.componentInstance;

    component.componentType = DsLabelComponent;
    component.position = DynamicPositions.END;

    fixture.detectChanges();
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should create dynamic component', () => {
      const element = getElementByDirective(fixture, DsDynamicComponentDirective).nativeElement;

      expect(element).toBeTruthy();
      expect(element!.nextElementSibling.localName).toBe(elementName);
    });

    it('should change dynamic element position to start', () => {
      component.position = 'start';

      fixture.detectChanges();

      const element = getElementByDirective(fixture, DsDynamicComponentDirective).nativeElement;

      expect(element).toBeTruthy();
      expect(element!.previousElementSibling.localName).toBe(elementName);
    });

    it('should change dynamic element position to inside-start', () => {
      component.position = DynamicPositions.START;

      fixture.detectChanges();

      const element = getElementByDirective(fixture, DsDynamicComponentDirective).nativeElement;

      expect(element).toBeTruthy();
      expect(element!.previousElementSibling.localName).toBe(elementName);
    });

    it('should change dynamic element position to inside-end', () => {
      component.position = DynamicPositions.END;

      fixture.detectChanges();

      const element = getElementByDirective(fixture, DsDynamicComponentDirective).nativeElement;

      expect(element).toBeTruthy();
      expect(element!.nextElementSibling.localName).toBe(elementName);
    });

    it('should set class', () => {
      const CLASS_NAME = 'testClassName';

      component.className = CLASS_NAME;

      fixture.detectChanges();

      const element = getElementByDirective(fixture, DsDynamicComponentDirective).nativeElement;

      expect(element).toBeTruthy();
      expect(element!.nextElementSibling.classList.contains(CLASS_NAME)).toBeTruthy();
    });

    it('should insert element to a custom container', () => {
      component.customContainer = component.container;

      syncViewModel(fixture);

      const element = getElementByDirective(fixture, DsDynamicComponentDirective).nativeElement;

      expect(element).toBeTruthy();
      expect(element!.firstChild.nextElementSibling.localName).toBe(elementName);
    });
  });
});
