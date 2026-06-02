import { Component, ElementRef, Type, ViewChild } from '@angular/core';
import { DynamicPosition, DynamicPositions } from '../../interfaces';
import { SprDynamicComponentDirective } from '../../spr-dynamic-component.directive';

@Component({
  selector: 'spr-dynamic-component-test-component',
  imports: [SprDynamicComponentDirective],
  template: `
    <div
      [sprDynamicComponent]="componentType"
      [sprDynamicComponentClass]="className"
      [sprDynamicComponentPosition]="position"
      [sprDynamicComponentCustomContainer]="customContainer"
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
