import { ChangeDetectionStrategy, Component, Input, OnInit, computed, signal } from '@angular/core';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import type { ModalWithData } from '@platform-workspace/design-system-v2';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, GridOptions } from 'ag-grid-community';

import { rmTheme } from '../../../../ag-grid/rm-grid.theme';
import { SegmentFieldsMappingHeaderComponent } from './segment-fields-mapping-header.component';
import type {
  SegmentFieldsMappingModalData,
  SegmentFieldsMappingModalResult,
  UploadColumnMappingField,
  UploadedSegmentFileDraft,
} from './segment-upload.model';

function isFileMappingValid(file: UploadedSegmentFileDraft): boolean {
  return file.columnMappings.some((mapping) => mapping.field != null);
}

@Component({
  selector: 'app-segment-fields-mapping-modal',
  imports: [AgGridAngular],
  templateUrl: './segment-fields-mapping-modal.component.html',
  styleUrl: './segment-fields-mapping-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentFieldsMappingModalComponent
  implements ModalWithData<SegmentFieldsMappingModalData, SegmentFieldsMappingModalResult | undefined>, OnInit
{
  @Input({ required: true }) modalData!: SegmentFieldsMappingModalData;
  @Input() modalSettings?: NgbModalOptions;
  @Input({ required: true }) closeAction!: (result?: SegmentFieldsMappingModalResult) => void;

  protected readonly files = signal<UploadedSegmentFileDraft[]>([]);

  protected readonly activeFileId = signal('');

  ngOnInit(): void {
    this.files.set(structuredClone(this.modalData.files));
    this.activeFileId.set(this.modalData.files[0]?.id ?? '');
  }

  protected readonly activeFile = computed(() => {
    const id = this.activeFileId();
    return this.files().find((file) => file.id === id) ?? null;
  });

  protected readonly gridRenderKey = signal(0);

  protected readonly activeRowData = computed(() => this.activeFile()?.rows ?? []);

  protected readonly canConfirm = computed(() => this.files().every(isFileMappingValid));

  protected readonly columnDefs = computed((): ColDef[] => {
    const file = this.activeFile();
    if (!file) {
      return [];
    }

    return file.columnMappings.map((mapping, index) => ({
      field: mapping.colId,
      colId: mapping.colId,
      headerComponent: SegmentFieldsMappingHeaderComponent,
      headerComponentParams: {
        colId: mapping.colId,
        columnIndex: index,
        mappingField: mapping.field,
        onMappingSelect: (colId: string, field: UploadColumnMappingField) => this.onMappingSelect(colId, field),
      },
      flex: index === file.columnMappings.length - 1 ? undefined : 1,
      minWidth: index === file.columnMappings.length - 1 ? 200 : 120,
      width: index === file.columnMappings.length - 1 ? 200 : undefined,
      sortable: false,
      filter: false,
      resizable: false,
      suppressHeaderMenuButton: true,
      suppressHeaderFilterButton: true,
      type: index === 2 ? 'rightAligned' : undefined,
    }));
  });

  protected readonly gridOptions: GridOptions = {
    theme: rmTheme,
    suppressCellFocus: true,
    rowHeight: 48,
    headerHeight: 52,
    defaultColDef: {
      sortable: false,
      filter: false,
      resizable: false,
    },
  };

  protected selectFile(fileId: string): void {
    this.activeFileId.set(fileId);
    this.gridRenderKey.update((key) => key + 1);
  }

  protected isFileValid(file: UploadedSegmentFileDraft): boolean {
    return isFileMappingValid(file);
  }

  protected onMappingSelect(colId: string, field: UploadColumnMappingField): void {
    const activeId = this.activeFileId();
    this.files.update((drafts) =>
      drafts.map((file) => {
        if (file.id !== activeId) {
          return file;
        }
        return {
          ...file,
          preValidated: false,
          columnMappings: file.columnMappings.map((mapping) =>
            mapping.colId === colId ? { ...mapping, field } : mapping,
          ),
        };
      }),
    );
    this.gridRenderKey.update((key) => key + 1);
  }

  protected onClose(): void {
    this.closeAction();
  }

  protected onSkip(): void {
    this.closeAction(this.buildResult());
  }

  protected onConfirm(): void {
    if (!this.canConfirm()) {
      return;
    }
    this.closeAction(this.buildResult());
  }

  private buildResult(): SegmentFieldsMappingModalResult {
    return {
      files: this.files().map((file) => ({
        id: file.id,
        fileName: file.fileName,
        playerCount: file.playerCount,
      })),
    };
  }
}
