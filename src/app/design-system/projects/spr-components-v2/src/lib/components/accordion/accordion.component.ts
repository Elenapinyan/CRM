import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { AccordionType } from './enums/accordion.enum';

@Component({
  selector: 'ds-accordion',
  imports: [NgClass, NgbAccordionModule],
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DsAccordionComponent {
  @Input({ required: true }) accordionType!: AccordionType;
}
