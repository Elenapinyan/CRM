import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsStepperBody } from './stepper-body';
import { DsStepperDirective } from './stepper';
import { DsStep } from './step';

describe('SprStepperBody', () => {
  let fixture: ComponentFixture<DsStepperBody>;
  let component: DsStepperBody;

  const mockStepper = {
    orientation: 'horizontal',
    selectedStep: (): DsStep | undefined => undefined,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DsStepperBody],
      providers: [{ provide: DsStepperDirective, useValue: mockStepper }],
    });

    fixture = TestBed.createComponent(DsStepperBody);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });
});
