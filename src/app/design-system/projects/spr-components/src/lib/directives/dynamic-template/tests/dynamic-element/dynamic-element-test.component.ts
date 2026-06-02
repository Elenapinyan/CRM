import { Component, ElementRef, ViewChild } from '@angular/core';
import { DynamicPosition, DynamicPositions } from '../../interfaces';
import { SprDynamicElementDirective } from '../../spr-dynamic-element.directive';

@Component({
  selector: 'spr-dynamic-element-test-component',
  imports: [SprDynamicElementDirective],
  template: `
    <div
      sprDynamicElement
      [sprDynamicElementId]="elementId"
      [sprDynamicElementName]="elementName"
      [sprDynamicElementPosition]="position"
      [sprDynamicElementClass]="className"
      [sprDynamicElementContent]="content"
      [sprDynamicElementCustomContainer]="customContainer"
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
