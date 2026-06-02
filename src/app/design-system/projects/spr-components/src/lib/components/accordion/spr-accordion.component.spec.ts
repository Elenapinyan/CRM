import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { getElementByCss, syncViewModel } from '../../shared/utils';
import { SprAccordionComponent } from './spr-accordion.component';
import { AccordionType } from './enums/accordion.enum';

describe('SprAccordionComponent', () => {
  let fixture: ComponentFixture<SprAccordionComponent>;
  let component: SprAccordionComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, SprAccordionComponent],
    });

    fixture = TestBed.createComponent(SprAccordionComponent);

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

      const element: HTMLElement = getElementByCss(fixture, '.wrapper')?.nativeElement;

      expect(element.classList.contains(AccordionType.Default)).toBeTruthy();
    });
  });
});
