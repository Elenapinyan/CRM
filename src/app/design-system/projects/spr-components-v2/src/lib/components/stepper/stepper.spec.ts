import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsStepper, DsStepperDirective } from './stepper';
import { Component, viewChild } from '@angular/core';
import { DsStep } from './step';
import { DsStepperBody } from './stepper-body';
import { DsStepperHeader } from './stepper-header';
import { DsStepperNextDirective } from './stepper-next';
import { DsStepperPreviousDirective } from './stepper-previous';
import { getElementByCss, getElementsByCss } from '../../shared/utils';

@Component({
  selector: 'ds-stepper-mock',
  template: `
    <div class="stepper-directive" dsStepper #stepperDirective="dsStepper">
      <ds-stepper-header />

      <ds-stepper-body>
        <ds-step>Step 1</ds-step>
        <ds-step>Step 2</ds-step>
        <ds-step>Step 3</ds-step>
      </ds-stepper-body>

      <div>
        <button dsStepperNext>Next</button>
        <button dsStepperPrevious>Prev</button>
      </div>
    </div>

    <ds-stepper class="stepper-component">
      <ds-step>Step 1</ds-step>
      <ds-step>Step 2</ds-step>
      <ds-step>Step 3</ds-step>

      <div sprStepperActions>
        <button dsStepperNext>Next</button>
        <button dsStepperPrevious>Prev</button>
      </div>
    </ds-stepper>
  `,
  imports: [DsStepperDirective, DsStepper, DsStep, DsStepperBody, DsStepperHeader, DsStepperNextDirective, DsStepperPreviousDirective],
})
class SprStepperMockComponent {
  stepperDirective = viewChild<DsStepperDirective>('stepperDirective');
  stepperComponent = viewChild<DsStepper>(DsStepper);
}

describe('SprStepper', () => {
  let fixture: ComponentFixture<SprStepperMockComponent>;
  let component: SprStepperMockComponent;

  beforeEach(() => {
    fixture = TestBed.createComponent(SprStepperMockComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('Model', () => {
    it('should create mock component', () => {
      expect(component).toBeTruthy();
    });

    it('should create directive', () => {
      expect(component.stepperDirective()).toBeTruthy();
    });

    it('should create stepper component', () => {
      expect(component.stepperComponent()).toBeTruthy();
    });
  });

  describe('View', () => {
    describe('Directive', () => {
      it('should render steps headers', () => {
        const stepperDirectiveSteps = getElementsByCss(fixture, '.stepper-directive .stepper-header .step-header');

        expect(stepperDirectiveSteps.length).toBe(3);
      });

      it('should render step body', () => {
        const stepperDirectiveBody = getElementByCss(fixture, '.stepper-directive .stepper-body');

        expect(stepperDirectiveBody).toBeTruthy();
      });

      it('should render step actions', () => {
        const stepperDirectiveActions = getElementsByCss(fixture, '.stepper-directive .stepper-action');

        expect(stepperDirectiveActions.length).toBe(2);
      });
    });

    describe('Component', () => {
      it('should render steps headers', () => {
        const stepperDirectiveSteps = getElementsByCss(fixture, '.stepper-component .stepper-header .step-header');

        expect(stepperDirectiveSteps.length).toBe(3);
      });

      it('should render step body', () => {
        const stepperDirectiveBody = getElementByCss(fixture, '.stepper-component .stepper-body');

        expect(stepperDirectiveBody).toBeTruthy();
      });

      it('should render step actions', () => {
        const stepperDirectiveActions = getElementsByCss(fixture, '.stepper-component .stepper-action');

        expect(stepperDirectiveActions.length).toBe(2);
      });
    });
  });
});
