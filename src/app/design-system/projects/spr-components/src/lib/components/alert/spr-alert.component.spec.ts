import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SprAlertComponent } from './spr-alert.component';
import { getElementByCss, syncViewModel } from '../../shared/utils';

describe('SprAlertComponent', () => {
  let fixture: ComponentFixture<SprAlertComponent>;
  let component: SprAlertComponent;
  let alertElement: HTMLElement;
  const MOCK_MESSAGE = 'some message';
  const MOCK_NEW_ICON_CLASS = 'some-new-icon-class';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule],
    });

    fixture = TestBed.createComponent(SprAlertComponent);

    component = fixture.componentInstance;

    component.message = MOCK_MESSAGE;
    component.icon = MOCK_NEW_ICON_CLASS;

    syncViewModel(fixture);
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should have message', () => {
      const element = getElementByCss(fixture, '.alert span').nativeElement;

      expect(element.textContent?.trim()).toBe(MOCK_MESSAGE);
    });

    it('should have new icon class', () => {
      syncViewModel(fixture);

      const iconElement = getElementByCss(fixture, '.alert i').nativeElement;

      expect(iconElement.classList.contains(MOCK_NEW_ICON_CLASS)).toBeTruthy();
    });

    it('should have info type', () => {
      component.type = 'info';

      syncViewModel(fixture);

      alertElement = getElementByCss(fixture, '.alert')?.nativeElement;

      expect(alertElement.classList.contains('alert-info')).toBeTruthy();
    });

    it('should have warning type', () => {
      component.type = 'warning';

      syncViewModel(fixture);

      alertElement = getElementByCss(fixture, '.alert')?.nativeElement;

      expect(alertElement.classList.contains('alert-warning')).toBeTruthy();
    });

    it('should have danger type', () => {
      component.type = 'danger';

      syncViewModel(fixture);

      alertElement = getElementByCss(fixture, '.alert')?.nativeElement;

      expect(alertElement.classList.contains('alert-danger')).toBeTruthy();
    });

    it('should have success type', () => {
      component.type = 'success';

      syncViewModel(fixture);

      alertElement = getElementByCss(fixture, '.alert')?.nativeElement;

      expect(alertElement.classList.contains('alert-success')).toBeTruthy();
    });
  });
});
