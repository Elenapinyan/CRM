import { Directive, ElementRef, HostBinding, OnInit, Renderer2 } from '@angular/core';
import { NgClassDirectiveAllowedTypes } from '../../../shared/interfaces/ng-class.interface';
import { DisplayedColumn } from '../interfaces/table.interface';
import { DsTableDataService } from '../services/table-data.service';
import { DsTableRowDirective } from './table-row.directive';

@Directive({
  selector: 'td[dsTableDataCell]',
  standalone: true,
})
export class DsTableDataCellDirective implements OnInit {
  @HostBinding('class')
  get classes(): NgClassDirectiveAllowedTypes {
    return this.currentColumn?.settings?.bodyColumnClasses;
  }

  constructor(
    private readonly tableDataService: DsTableDataService,
    private readonly tableRow: DsTableRowDirective,
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
