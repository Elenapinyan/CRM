import { CommonModule } from '@angular/common';
import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { getElementByCss, syncViewModel } from '../../shared/utils';
import { SprUserBadge } from './user-badge';

describe('SprUserBadge', () => {
  let fixture: ComponentFixture<SprUserBadge>;
  let component: SprUserBadge;
  let componentRef: ComponentRef<SprUserBadge>;
  const MOCK_CONTENT = 'Some User';
  const MOCK_IMAGE = 'https://spribe.co/spribe-logo.b13289b5f5fab437.svg';
  const MOCK_INITIALS = 'SU';

  const CONTENT_SELECTOR = '[data-testid="user-badge-content"]';
  const AVATAR_SELECTOR = '[data-testid="user-badge-avatar"]';
  const INITIALS_SELECTOR = '[data-testid="user-badge-initials"]';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule],
    });

    fixture = TestBed.createComponent(SprUserBadge);

    component = fixture.componentInstance;

    componentRef = fixture.componentRef;

    componentRef.setInput('content', MOCK_CONTENT);

    fixture.detectChanges();

    syncViewModel(fixture);
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should have content', () => {
      const element = getElementByCss(fixture, CONTENT_SELECTOR).nativeElement;

      expect(element.textContent?.trim()).toBe(MOCK_CONTENT);
    });

    it('should have initials', () => {
      const content = getElementByCss(fixture, CONTENT_SELECTOR)?.nativeElement;
      const image = getElementByCss(fixture, AVATAR_SELECTOR)?.nativeElement;
      const sign = getElementByCss(fixture, INITIALS_SELECTOR)?.nativeElement;

      expect(content.textContent?.trim()).toBe(MOCK_CONTENT);
      expect(image).toBeFalsy();
      expect(sign.textContent?.trim()).toBe(MOCK_INITIALS);
    });

    it('should have img', () => {
      componentRef.setInput('imageSrc', MOCK_IMAGE);
      fixture.detectChanges();

      const image = getElementByCss(fixture, AVATAR_SELECTOR)?.nativeElement;
      const sign = getElementByCss(fixture, INITIALS_SELECTOR)?.nativeElement;

      expect(image).toBeTruthy();
      expect(sign).toBeFalsy();
    });
  });
});
