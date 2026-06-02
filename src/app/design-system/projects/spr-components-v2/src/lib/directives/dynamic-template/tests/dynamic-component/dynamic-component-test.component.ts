import { Component, ElementRef, Type, ViewChild } from '@angular/core';
import { DynamicPosition, DynamicPositions } from '../../interfaces';
import { DsDynamicComponentDirective } from '../../dynamic-component.directive';

@Component({
  selector: 'ds-dynamic-component-test-component',
  imports: [DsDynamicComponentDirective],
  template: `
    <div
      [dsDynamicComponent]="componentType"
      [dsDynamicComponentClass]="className"
      [dsDynamicComponentPosition]="position"
      [dsDynamicComponentCustomContainer]="customContainer"
    >
      <div #container>Child div 1</div>
      <div>Child div 2</div>
    </div>
  `,
})
export class DynamicComponentTestComponent {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  componentType?: Type<unknown>;

  position: DynamicPosition = DynamicPositions.START;

  className?: string;

  elementId?: string;

  customContainer?: ElementRef<HTMLElement> | HTMLElement;
}
