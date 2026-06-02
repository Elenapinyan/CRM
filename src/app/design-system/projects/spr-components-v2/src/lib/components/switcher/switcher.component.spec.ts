import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DsSwitcherComponent } from './switcher.component';
import { getElementByCss, syncViewModel } from '../../shared/utils';

describe('DsSwitcherComponent', () => {
  let fixture: ComponentFixture<DsSwitcherComponent>;
  let component: DsSwitcherComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, NgbTooltipModule, DsSwitcherComponent],
    });

    fixture = TestBed.createComponent(DsSwitcherComponent);

    component = fixture.componentInstance;
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should add inputId', () => {
      const ID = 'test-id';

      fixture.componentRef.setInput('inputId', ID);

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, 'input')?.nativeElement;

      expect(element.getAttribute('id')).toBe(ID);
    });

    it('should add isDecorated', () => {
      fixture.componentRef.setInput('isDecorated', true);

      syncViewModel(fixture);

      const element: HTMLElement = fixture.debugElement.nativeElement.firstChild;

      expect(element.classList.contains('control-action__input')).toBeTruthy();
    });
  });
});
