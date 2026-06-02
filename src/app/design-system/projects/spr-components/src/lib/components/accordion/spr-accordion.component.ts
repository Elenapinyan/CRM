import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { AccordionType } from './enums/accordion.enum';

@Component({
  selector: 'spr-accordion',
  imports: [NgClass, NgbAccordionModule],
  templateUrl: './spr-accordion.component.html',
  styleUrls: ['./spr-accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SprAccordionComponent {
  @Input({ required: true }) accordionType!: AccordionType;
}
