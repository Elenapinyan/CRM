import { Component, ElementRef, ViewChild } from '@angular/core';
import { DynamicPosition, DynamicPositions } from '../../interfaces';
import { DsDynamicElementDirective } from '../../dynamic-element.directive';

@Component({
  selector: 'ds-dynamic-element-test-component',
  imports: [DsDynamicElementDirective],
  template: `
    <div
      dsDynamicElement
      [dsDynamicElementId]="elementId"
      [dsDynamicElementName]="elementName"
      [dsDynamicElementPosition]="position"
      [dsDynamicElementClass]="className"
      [dsDynamicElementContent]="content"
      [dsDynamicElementCustomContainer]="customContainer"
    >
      <div #container>Child div</div>
    </div>
  `,
})
export class DynamicElementTestComponent {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  elementName?: string;

  position: DynamicPosition = DynamicPositions.START;

  content?: string;

  className?: string;

  elementId?: string;

  customContainer?: ElementRef<HTMLElement> | HTMLElement;
}
