import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { DsChipsComponent } from './chips.component';
import { getElementByCss, syncViewModel } from '../../shared/utils';

describe('SprChipsComponent', () => {
  let component: DsChipsComponent;
  let fixture: ComponentFixture<DsChipsComponent>;
  let chipsElement: HTMLElement;

  const CHIPS_SELECTOR = '[data-testid="chips-element"]';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, DsChipsComponent],
    });

    fixture = TestBed.createComponent(DsChipsComponent);

    component = fixture.componentInstance;

    component.variant = 'gray';
    component.size = 'sm';
    component.chipsStyle = 'filled';
    component.isInteractive = false;

    syncViewModel(fixture);

    chipsElement = getElementByCss(fixture, CHIPS_SELECTOR).nativeElement;
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

      chipsElement = getElementByCss(fixture, CHIPS_SELECTOR)?.nativeElement as HTMLElement;

      expect(chipsElement.localName).toBe('button');
    });

    it('should change isDisabled', () => {
      component.isInteractive = true;
      component.isDisabled = true;

      syncViewModel(fixture);

      chipsElement = getElementByCss(fixture, CHIPS_SELECTOR)?.nativeElement as HTMLElement;

      expect(chipsElement.localName).toBe('button');

      expect(chipsElement.hasAttribute('disabled')).toBeTruthy();
    });
  });
});
