import { Directive, ElementRef, HostBinding, OnInit, Renderer2 } from '@angular/core';
import { NgClassDirectiveAllowedTypes } from '../../../shared/interfaces/ng-class.interface';
import { DisplayedColumn } from '../interfaces/table.interface';
import { SprTableDataService } from '../services/spr-table-data.service';
import { SprTableRowDirective } from './spr-table-row.directive';

@Directive({
  selector: 'td[sprTableDataCell]',
  standalone: true,
})
export class SprTableDataCellDirective implements OnInit {
  @HostBinding('class')
  get classes(): NgClassDirectiveAllowedTypes {
    return this.currentColumn?.settings?.bodyColumnClasses;
  }

  constructor(
    private readonly tableDataService: SprTableDataService,
    private readonly tableRow: SprTableRowDirective,
    private readonly renderer2: Renderer2,
    private readonly elementRef: ElementRef<HTMLElement>,
  ) {}

  get currentColumn(): DisplayedColumn | undefined {
    return this.tableDataService.findColumnByColumnKey(this.tableRow.columnKey);
  }

  ngOnInit(): void {
    this.renderer2.addClass(this.elementRef.nativeElement, 'brd-table__td');
  }
}
