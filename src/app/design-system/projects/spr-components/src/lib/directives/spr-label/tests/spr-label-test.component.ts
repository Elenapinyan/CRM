import { Component, ViewChild } from '@angular/core';
import { DynamicPosition, DynamicPositions } from '../../dynamic-template/interfaces';
import { SprLabelDirective } from '../spr-label.directive';

@Component({
  selector: 'spr-label-test-component',
  imports: [SprLabelDirective],
  template: `
    <div
      [sprLabel]="label"
      [sprLabelPosition]="position"
      [sprLabelLeftIcon]="labelLeftIcon"
      [sprLabelRightIcon]="labelRightIcon"
      [tooltip]="tooltip"
      [inputId]="inputId"
    >
      <div #container>Child div 1</div>
      <div>Child div 2</div>
    </div>
  `,
})
export class SprLabelTestComponent {
  @ViewChild(SprLabelDirective, { static: true }) labelDirective!: SprLabelDirective;

  label: string | null = null;

  tooltip: string | null = null;

  position: DynamicPosition = DynamicPositions.START;

  inputId?: string;

  labelLeftIcon?: string;

  labelRightIcon?: string;
}
