import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsStepperHeader } from './stepper-header';
import { DsStepperDirective } from './stepper';

describe('SprStepperHeader', () => {
  let fixture: ComponentFixture<DsStepperHeader>;
  let component: DsStepperHeader;

  const mockStepper = {
    orientation: 'horizontal',
    selectedIndex: 0,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DsStepperHeader],
      providers: [{ provide: DsStepperDirective, useValue: mockStepper }],
    });

    fixture = TestBed.createComponent(DsStepperHeader);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });
});
