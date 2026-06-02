import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { getElementByCss, syncViewModel } from '../../shared/utils';
import { DsAccordionComponent } from './accordion.component';
import { AccordionType } from './enums/accordion.enum';

describe('SprAccordionComponent', () => {
  let fixture: ComponentFixture<DsAccordionComponent>;
  let component: DsAccordionComponent;

  const WRAPPER_SELECTOR = '[data-testid="wrapper"]';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, DsAccordionComponent],
    });

    fixture = TestBed.createComponent(DsAccordionComponent);

    component = fixture.componentInstance;

    syncViewModel(fixture);
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should change type', () => {
      component.accordionType = AccordionType.Default;

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, WRAPPER_SELECTOR).nativeElement;

      expect(element.classList.contains(AccordionType.Default)).toBeTruthy();
    });
  });
});
