import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SprDynamicElementDirective } from '../../spr-dynamic-element.directive';
import { DynamicElementTestComponent } from './dynamic-element-test.component';
import { DynamicPositions } from '../../interfaces';
import { getElementByDirective, syncViewModel } from '../../../../shared/utils';

describe('SprDynamicElementDirective', () => {
  let fixture: ComponentFixture<DynamicElementTestComponent>;
  let component: DynamicElementTestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        NgbTooltipModule,
        ClipboardModule,
        DynamicElementTestComponent,
        SprDynamicElementDirective,
      ],
    });

    fixture = TestBed.createComponent(DynamicElementTestComponent);

    component = fixture.componentInstance;

    component.elementName = 'span';
    component.position = DynamicPositions.END;

    fixture.detectChanges();
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should create dynamic element by name', () => {
      component.elementName = 'i';

      fixture.detectChanges();

      const element = getElementByDirective(fixture, SprDynamicElementDirective).nativeElement;

      expect(element).toBeTruthy();
      expect(element!.nextElementSibling.localName).toBe('i');
    });

    it('should change dynamic element position', () => {
      component.position = DynamicPositions.START;

      fixture.detectChanges();

      const element = getElementByDirective(fixture, SprDynamicElementDirective).nativeElement;

      expect(element).toBeTruthy();
      expect(element!.previousElementSibling.localName).toBe('span');
    });

    it('should set text content', () => {
      const CONTENT = 'TEST';

      component.content = CONTENT;

      syncViewModel(fixture);

      const element = getElementByDirective(fixture, SprDynamicElementDirective).nativeElement;

      expect(element).toBeTruthy();
      expect(element!.nextElementSibling.textContent?.trim()).toBe(CONTENT);
    });

    it('should set id', () => {
      const ID = 'testId';

      component.elementId = ID;

      fixture.detectChanges();

      const element = getElementByDirective(fixture, SprDynamicElementDirective).nativeElement;

      expect(element).toBeTruthy();
      expect(element!.nextElementSibling.id).toBe(ID);
    });

    it('should set class', () => {
      const CLASS_NAME = 'testClassName';

      component.className = CLASS_NAME;

      fixture.detectChanges();

      const element = getElementByDirective(fixture, SprDynamicElementDirective).nativeElement;

      expect(element).toBeTruthy();
      expect(element!.nextElementSibling.classList.contains(CLASS_NAME)).toBeTruthy();
    });

    it('should insert element to a custom container', () => {
      component.customContainer = component.container;

      fixture.detectChanges();

      const element = getElementByDirective(fixture, SprDynamicElementDirective).nativeElement;

      expect(element).toBeTruthy();
      expect(element!.firstChild.nextElementSibling.localName).toBe('span');
    });
  });
});
