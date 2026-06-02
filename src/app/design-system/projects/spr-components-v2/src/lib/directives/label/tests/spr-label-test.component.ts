import { Component, ViewChild } from '@angular/core';
import { DynamicPosition, DynamicPositions } from '../../dynamic-template/interfaces';
import { DsLabelDirective } from '../label.directive';

@Component({
  selector: 'ds-label-test-component',
  imports: [DsLabelDirective],
  template: `
    <div
      [dsLabel]="label"
      [dsLabelPosition]="position"
      [dsLabelLeftIcon]="labelLeftIcon"
      [dsLabelRightIcon]="labelRightIcon"
      [tooltip]="tooltip"
      [tooltipClassForLabel]="tooltipClassForLabel"
      [inputId]="inputId"
    >
      <div #container>Child div 1</div>
      <div>Child div 2</div>
    </div>
  `,
})
export class SprLabelTestComponent {
  @ViewChild(DsLabelDirective, { static: true }) labelDirective!: DsLabelDirective;

  label: string | null = null;

  tooltip: string | null = null;

  tooltipClassForLabel: string = '';

  position: DynamicPosition = DynamicPositions.START;

  inputId?: string;

  labelLeftIcon?: string;

  labelRightIcon?: string;
}
