import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { getElementByCss } from '../../shared/utils';
import { SprInnerHeaderComponent } from './spr-inner-header.component';

describe('SprInnerHeaderComponent', () => {
  let fixture: ComponentFixture<SprInnerHeaderComponent>;
  let component: SprInnerHeaderComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule],
    });

    fixture = TestBed.createComponent(SprInnerHeaderComponent);

    component = fixture.componentInstance;
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should have startContent', () => {
      component.withStartContent = true;

      fixture.detectChanges();

      const element: HTMLElement = getElementByCss(fixture, '.inner-header__title-container').nativeElement;

      expect(element).toBeTruthy();
    });

    it('should have title', () => {
      const MOCK_TITLE = 'some title';

      component.withStartContent = true;
      component.title = MOCK_TITLE;

      fixture.detectChanges();

      const element = getElementByCss(fixture, '[data-testid="header-title"]').nativeElement;

      expect(element.textContent?.trim()).toBe(MOCK_TITLE);
    });

    it('should change variant', () => {
      const MOCK_VARIANT = 'background';

      component.variant = MOCK_VARIANT;

      fixture.detectChanges();

      expect(fixture.nativeElement.classList).toContain('inner-header--' + MOCK_VARIANT);
    });

    it('should disable border', () => {
      component.withoutBorder = true;

      fixture.detectChanges();

      expect(fixture.nativeElement.classList).toContain('inner-header--no-border');
    });
  });
});
