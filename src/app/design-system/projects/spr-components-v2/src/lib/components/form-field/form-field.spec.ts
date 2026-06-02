import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsFormField } from './form-field';
import { getElementByCss, syncViewModel } from '../../shared/utils';
import { NgControl } from '@angular/forms';

const ngControlStub = {
  control: {
    invalid: true,
    touched: true,
  },
  errors: { required: true },
};

describe('FormFieldComponent', () => {
  let component: DsFormField;
  let fixture: ComponentFixture<DsFormField>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [DsFormField],
      providers: [
        {
          provide: NgControl,
          useValue: ngControlStub,
        },
      ],
    });

    fixture = TestBed.createComponent(DsFormField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should show label', () => {
      const MOCK_LABEL = 'label';

      fixture.componentRef.setInput('label', MOCK_LABEL);

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, 'ds-label').nativeElement;

      expect(element.textContent?.trim()).toBe(MOCK_LABEL);
    });

    it('should show description', () => {
      const MOCK_DESCRIPTION = 'description';

      ngControlStub.control.invalid = false;

      fixture.componentRef.setInput('description', MOCK_DESCRIPTION);

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, 'ds-field-description').nativeElement;

      expect(element.textContent?.trim()).toBe(MOCK_DESCRIPTION);

      ngControlStub.control.invalid = true;
    });

    it('should show error', () => {
      fixture.componentRef.setInput('isInvalid', true);

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, 'ds-error').nativeElement;

      expect(element).toBeTruthy();
    });
  });
});
