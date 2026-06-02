import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsStep } from './step';
import { CdkStepper } from '@angular/cdk/stepper';

describe('SprStep', () => {
  let fixture: ComponentFixture<DsStep>;
  let component: DsStep;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DsStep],
      providers: [
        {
          provide: CdkStepper,
          useValue: {
            orientation: 'horizontal',
          },
        },
      ],
    });

    fixture = TestBed.createComponent(DsStep);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });
});
