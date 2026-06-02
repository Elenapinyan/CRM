import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from '@angular/core';
import { SortType } from '../../../shared/enums/sort-type.enum';
import { NgClassDirectiveAllowedTypes } from '../../../shared/interfaces/ng-class.interface';
import { DisplayedColumn } from '../interfaces/table.interface';
import { DsTableDataService } from '../services/table-data.service';
import { isSelectedColumn } from '../utils/table.util';
import { DsTableHeaderDirective } from './table-header.directive';

@Directive({
  selector: 'th[dsTableHeaderCell]',
  standalone: true,
})
export class DsTableHeaderCellDirective implements OnInit {
  @HostBinding('class')
  get classes(): NgClassDirectiveAllowedTypes {
    return this.column?.settings?.headColumnClasses;
  }

  @HostBinding('class.brd-table__th--sortable')
  get isSortable(): boolean {
    return Boolean(this.column?.settings?.isSortable);
  }

  @HostBinding('class.brd-table__th--desc')
  get isDescSort(): boolean {
    return this.isSelectedColumn && this.tableDataService.sortConfiguration.sortType === SortType.Desc;
  }

  @HostBinding('class.brd-table__th--asc')
  get isAscSort(): boolean {
    return this.isSelectedColumn && this.tableDataService.sortConfiguration.sortType === SortType.Asc;
  }

  @HostBinding('class.brd-table__th--sorted')
  get isSorted(): boolean {
    return this.isSelectedColumn;
  }

  constructor(
    private readonly tableDataService: DsTableDataService,
    private readonly tableHeader: DsTableHeaderDirective,
    private readonly renderer2: Renderer2,
    private readonly elementRef: ElementRef<HTMLElement>,
  ) {}

  get column(): DisplayedColumn | undefined {
    return this.tableDataService.findColumnByColumnKey(this.tableHeader.columnKey);
  }

  get isSelectedColumn(): boolean {
    if (!this.column) {
      return false;
    }

    return isSelectedColumn(this.column, this.tableDataService.sortConfiguration);
  }

  @HostListener('click')
  onClick(): void {
    if (!this.column?.settings?.isSortable) {
      return;
    }

    this.tableDataService.sort(this.column);
  }

  ngOnInit(): void {
    this.renderer2.setAttribute(this.elementRef.nativeElement, 'scope', 'col');
    this.renderer2.addClass(this.elementRef.nativeElement, 'brd-table__th');
  }
}
