import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { getElementByCss, syncViewModel } from '../../shared/utils';
import { DsInnerHeaderComponent } from './inner-header.component';

describe('SprInnerHeaderComponent', () => {
  let fixture: ComponentFixture<DsInnerHeaderComponent>;
  let component: DsInnerHeaderComponent;

  const ROOT_SELECTOR = '[data-testid="inner-header-root"]';
  const TITLE_CONTAINER_SELECTOR = '[data-testid="title-container"]';
  const TITLE_SELECTOR = '[data-testid="header-title"]';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, DsInnerHeaderComponent],
    });

    fixture = TestBed.createComponent(DsInnerHeaderComponent);

    component = fixture.componentInstance;

    syncViewModel(fixture);
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should have startContent', () => {
      component.withStartContent = true;

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, TITLE_CONTAINER_SELECTOR).nativeElement;

      expect(element).toBeTruthy();
    });

    it('should have title', () => {
      const MOCK_TITLE = 'some title';

      component.withStartContent = true;
      component.title = MOCK_TITLE;

      syncViewModel(fixture);

      const element = getElementByCss(fixture, TITLE_SELECTOR).nativeElement;

      expect(element.textContent?.trim()).toBe(MOCK_TITLE);
    });

    it('should change variant', () => {
      const MOCK_VARIANT = 'background';

      component.variant = MOCK_VARIANT;

      syncViewModel(fixture);

      const element = getElementByCss(fixture, ROOT_SELECTOR).nativeElement;

      expect(element.classList.contains('inner-header--' + MOCK_VARIANT)).toBeTruthy();
    });

    it('should disable border', () => {
      component.withoutBorder = true;

      syncViewModel(fixture);

      const element = getElementByCss(fixture, ROOT_SELECTOR).nativeElement;

      expect(element.classList.contains('inner-header--no-border')).toBeTruthy();
    });
  });
});
