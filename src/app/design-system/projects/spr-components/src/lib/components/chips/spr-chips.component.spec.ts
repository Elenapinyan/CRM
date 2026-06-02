import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { SprChipsComponent } from './spr-chips.component';
import { getElementByCss, syncViewModel } from '../../shared/utils';

describe('SprChipsComponent', () => {
  let component: SprChipsComponent;
  let fixture: ComponentFixture<SprChipsComponent>;
  let chipsElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, SprChipsComponent],
    });

    fixture = TestBed.createComponent(SprChipsComponent);

    component = fixture.componentInstance;

    component.variant = 'primary';
    component.size = 'sm';
    component.chipsStyle = 'filled';
    component.isInteractive = false;

    syncViewModel(fixture);

    chipsElement = getElementByCss(fixture, '.chips').nativeElement;
  });

  describe('Model', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should change variant', () => {
      component.variant = 'olive';

      syncViewModel(fixture);

      expect(chipsElement.classList.contains('chips--' + component.variant)).toBeTruthy();
    });

    it('should change size', () => {
      const smSize = chipsElement.classList.contains('chips--sm');

      component.size = 'md';

      syncViewModel(fixture);

      const mdSize = chipsElement.classList.contains('chips--md');

      expect(smSize).toBeTruthy();
      expect(mdSize).toBeTruthy();
    });

    it('should change chips style', () => {
      const filledBg = chipsElement.classList.contains('chips--filled');

      component.chipsStyle = 'outline';

      syncViewModel(fixture);

      const outlineBg = chipsElement.classList.contains('chips--outline');

      expect(filledBg).toBeTruthy();
      expect(outlineBg).toBeTruthy();
    });

    it('should change isInteractive', () => {
      component.isInteractive = true;

      syncViewModel(fixture);

      chipsElement = getElementByCss(fixture, '.chips')?.nativeElement as HTMLElement;

      expect(chipsElement.localName).toBe('button');
    });

    it('should change isDisabled', () => {
      component.isInteractive = true;
      component.isDisabled = true;

      syncViewModel(fixture);

      chipsElement = getElementByCss(fixture, '.chips')?.nativeElement as HTMLElement;

      expect(chipsElement.localName).toBe('button');

      expect(chipsElement.hasAttribute('disabled')).toBeTruthy();
    });
  });
});
