import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import type { IHeaderAngularComp } from 'ag-grid-angular';
import type { IHeaderParams } from 'ag-grid-community';

import {
  UPLOAD_COLUMN_MAPPING_OPTIONS,
  type SegmentFieldsMappingHeaderParams,
  type UploadColumnMappingField,
} from './segment-upload.model';

type HeaderParams = IHeaderParams & SegmentFieldsMappingHeaderParams;

interface MenuPosition {
  top: number;
  left: number;
}

@Component({
  selector: 'app-segment-fields-mapping-header',
  template: `
    <div
      class="segment-fields-mapping-header"
      [class.segment-fields-mapping-header--active]="hovered() || menuOpen()"
      (mouseenter)="hovered.set(true)"
      (mouseleave)="onMouseLeave()"
    >
      <span class="segment-fields-mapping-header__label">{{ displayLabel() }}</span>
      <button
        type="button"
        class="segment-fields-mapping-header__menu-btn"
        [class.segment-fields-mapping-header__menu-btn--visible]="hovered() || menuOpen()"
        aria-label="Column mapping options"
        [attr.aria-expanded]="menuOpen()"
        (click)="toggleMenu($event)"
      >
        <span class="segment-fields-mapping-header__dots" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
    </div>

    @if (menuOpen()) {
      <div
        #menuPanel
        class="segment-fields-mapping-header__menu"
        role="menu"
        [style.top.px]="menuPosition()?.top"
        [style.left.px]="menuPosition()?.left"
        (click)="$event.stopPropagation()"
      >
        @for (option of mappingOptions; track option.value) {
          <button
            type="button"
            class="segment-fields-mapping-header__menu-item"
            role="menuitem"
            [class.segment-fields-mapping-header__menu-item--active]="option.value === mappingField()"
            (click)="selectMapping(option.value)"
          >
            {{ option.label }}
          </button>
        }
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
        overflow: visible;
      }

      .segment-fields-mapping-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        width: 100%;
        height: 100%;
        padding: 0 4px;
        border-radius: var(--radius-4, 4px);
        transition: background-color 0.15s ease;
      }

      .segment-fields-mapping-header--active,
      .segment-fields-mapping-header:hover {
        background: var(--brd-neutral-100-700, #f4f4f5);
      }

      .segment-fields-mapping-header__label {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: var(--spr-font-size-14, 14px);
        font-weight: 500;
        line-height: 20px;
        color: var(--brd-neutral-1000-0, #18181b);
      }

      .segment-fields-mapping-header__menu-btn {
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        padding: 0;
        border: 0;
        background: transparent;
        cursor: pointer;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.15s ease;
      }

      .segment-fields-mapping-header__menu-btn--visible {
        opacity: 1;
        pointer-events: auto;
      }

      .segment-fields-mapping-header__dots {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2px;
        width: 16px;
        height: 16px;
      }

      .segment-fields-mapping-header__dots span {
        display: block;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: var(--brd-neutral-1000-0, #18181b);
      }

      .segment-fields-mapping-header__menu {
        position: fixed;
        z-index: 2000;
        min-width: 140px;
        padding: 4px;
        border: 1px solid var(--brd-neutral-700-700, #3b3b40);
        border-radius: var(--radius-8, 8px);
        background: var(--brd-neutral-900-900, #212124);
        box-shadow:
          0 4px 8px var(--brd-alpha-bb-008-024, rgba(24, 24, 27, 0.08)),
          0 8px 16px var(--brd-alpha-bb-004-040, rgba(24, 24, 27, 0.04));
      }

      .segment-fields-mapping-header__menu-item {
        display: flex;
        align-items: center;
        width: 100%;
        min-height: 32px;
        padding: 6px 8px;
        border: 0;
        border-radius: 6px;
        background: transparent;
        color: var(--brd-neutral-0-0, #fff);
        font-size: var(--spr-font-size-14, 14px);
        line-height: 20px;
        text-align: left;
        cursor: pointer;
      }

      .segment-fields-mapping-header__menu-item:hover,
      .segment-fields-mapping-header__menu-item--active {
        background: var(--brd-neutral-800-800, #27272a);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentFieldsMappingHeaderComponent implements IHeaderAngularComp {
  protected readonly mappingOptions = UPLOAD_COLUMN_MAPPING_OPTIONS;

  private readonly host = inject(ElementRef<HTMLElement>);

  private params!: HeaderParams;

  protected readonly hovered = signal(false);
  protected readonly menuOpen = signal(false);
  protected readonly mappingField = signal<UploadColumnMappingField | null>(null);
  protected readonly menuPosition = signal<MenuPosition | null>(null);

  private readonly menuPanel = viewChild<ElementRef<HTMLElement>>('menuPanel');

  agInit(params: HeaderParams): void {
    this.refresh(params);
  }

  refresh(params: HeaderParams): boolean {
    this.params = params;
    this.mappingField.set(params.mappingField ?? null);
    return true;
  }

  protected displayLabel(): string {
    const field = this.mappingField();
    if (field) {
      return UPLOAD_COLUMN_MAPPING_OPTIONS.find((option) => option.value === field)?.label ?? field;
    }
    return String(this.params.columnIndex + 1);
  }

  protected toggleMenu(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();

    if (this.menuOpen()) {
      this.closeMenu();
      return;
    }

    const trigger = event.currentTarget as HTMLElement;
    const rect = trigger.getBoundingClientRect();
    const menuWidth = 140;

    this.menuPosition.set({
      top: rect.bottom + 4,
      left: Math.max(8, rect.right - menuWidth),
    });
    this.menuOpen.set(true);
  }

  protected selectMapping(field: UploadColumnMappingField): void {
    this.params.onMappingSelect(this.params.colId, field);
    this.closeMenu();
  }

  protected onMouseLeave(): void {
    if (this.menuOpen()) {
      return;
    }
    this.hovered.set(false);
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (!this.menuOpen()) {
      return;
    }

    const target = event.target as Node | null;
    if (!target) {
      return;
    }

    const panel = this.menuPanel()?.nativeElement;
    const host = this.host.nativeElement;

    if (panel?.contains(target) || host.contains(target)) {
      return;
    }

    this.closeMenu();
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  protected onViewportChange(): void {
    if (this.menuOpen()) {
      this.closeMenu();
    }
  }

  private closeMenu(): void {
    this.menuOpen.set(false);
    this.menuPosition.set(null);
  }
}
