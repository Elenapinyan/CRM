import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { DisplayedColumn } from '../interfaces/table.interface';
import { DsTableDataService } from './table-data.service';

describe('DsTableDataService', () => {
  let service: DsTableDataService;

  const columns: DisplayedColumn[] = [
    {
      columnKey: 'name',
      text: 'Name',
    },
    {
      columnKey: 'sureName',
      text: 'SureName',
    },
    {
      columnKey: 'age',
      text: 'Age',
      settings: {
        headColumnClasses: 'brd-table__th--right',
        bodyColumnClasses: 'brd-table__td--right',
      },
    },
    {
      columnKey: 'sex',
      text: 'Sex',
    },
    {
      columnKey: 'customText',
      text: 'Text',
    },
    {
      columnKey: 'status',
      text: 'Status',
    },
    {
      columnKey: 'blockManagement',
      text: 'Block Management',
      settings: {
        headColumnClasses: 'brd-table__th--center',
        bodyColumnClasses: 'brd-table__td--center',
      },
    },
  ];

  const rows: { [key: string]: any }[] = [
    {
      name: 'Andrew',
      sureName: 'Andreev',
      age: 22,
      status: 'gray',
      blockManagement: 'Block',
    },
    {
      name: 'Egor',
      sureName: 'Egorov',
      age: 11,
      status: 'olive',
      blockManagement: 'Block',
    },
    {
      name: 'Alex',
      sureName: 'Alexeev',
      age: 6,
      status: 'green',
      blockManagement: 'Block',
    },
    {
      name: 'Roman',
      sureName: 'Romanov',
      age: 32,
      status: 'purple',
      blockManagement: 'Block',
    },
    {
      name: 'Anton',
      sureName: 'Antonov',
      age: 108,
      status: 'blue',
      blockManagement: 'Block',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DsTableDataService],
    });

    service = TestBed.inject(DsTableDataService);

    service.displayedColumns = columns;
    service.displayedRows = rows;
  });

  describe('Model', () => {
    it('should inject service', () => {
      expect(service).toBeTruthy();
    });

    it('should find column by key', () => {
      const column = service.findColumnByColumnKey(columns?.[0].columnKey);

      expect(column).toBeTruthy();
      expect(column?.columnKey).toBe(columns?.[0].columnKey);
    });

    it('should set sort configuration', async () => {
      const configurationPromise = firstValueFrom(service.sort$);

      service.sort(columns?.[0]);

      const result = await configurationPromise;

      expect(result.selectedColumn).toBe(columns?.[0].columnKey);
    });
  });
});
