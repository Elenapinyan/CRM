import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SprSwitcherComponent } from './spr-switcher.component';
import { getElementByCss, syncViewModel } from '../../shared/utils';

describe('SprSwitcherComponent', () => {
  let fixture: ComponentFixture<SprSwitcherComponent>;
  let component: SprSwitcherComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, NgbTooltipModule, SprSwitcherComponent],
    });

    fixture = TestBed.createComponent(SprSwitcherComponent);

    component = fixture.componentInstance;
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should add second label text', () => {
      const LABEL = 'Test label';

      component.label = '';
      component.secondLabel = LABEL;

      syncViewModel(fixture);

      const element = getElementByCss(fixture, '.label-container')?.nativeElement;

      expect(element).toBeTruthy();
    });

    it('should add inputId', () => {
      const ID = 'test-id';

      fixture.componentRef.setInput('inputId', ID);

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, 'input')?.nativeElement;

      expect(element.getAttribute('id')).toBe(ID);
    });

    it('should add isDecorated', () => {
      component.isDecorated = true;

      syncViewModel(fixture);

      const element: HTMLElement = fixture.debugElement.nativeElement.firstChild;

      expect(element.classList.contains('switcher-control--decorated')).toBeTruthy();
    });
  });
});
