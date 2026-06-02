import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

import { SegmentFilterChipMenuComponent } from './segment-filter-chip-menu.component';
import { SegmentFilterCustomValuePopoverComponent } from './segment-filter-custom-value-popover.component';
import { SegmentFilterInlineValueChipComponent } from './segment-filter-inline-value-chip.component';
import { SegmentFilterListPopoverComponent } from './segment-filter-list-popover.component';
import { SegmentFilterStaticDatetimePopoverComponent } from './segment-filter-static-datetime-popover.component';
import { parseStaticDateTime } from './segments-date-filter';
import type { SegmentFilterRow, SegmentFilterToken } from './segments-editor.model';
import {
  filterChipMenuOptions,
  filterChipUsesCustomValueEditor,
  filterChipUsesListPopover,
  filterChipUsesMenu,
  filterChipUsesStaticPicker,
  isEditableFilterChip,
  normalizeFilterChipDisplayText,
} from './segments-filter-registry';
import type { SegmentFilterChipEdit, SegmentFilterMenuOption } from './segments-filter-shared';
import { CURRENCY_MENU_SEARCH_THRESHOLD } from './segments-filter-operators';
import { SegmentFilterType } from './segments-filter-type.enum';
import { listOptionsForApiKey } from './segments-list-options.mock';
import { listSelectionKeys } from './segments-list-filter';

@Component({
  selector: 'app-segment-filter-preview-row',
  standalone: true,
  imports: [
    SegmentFilterChipMenuComponent,
    SegmentFilterStaticDatetimePopoverComponent,
    SegmentFilterCustomValuePopoverComponent,
    SegmentFilterInlineValueChipComponent,
    SegmentFilterListPopoverComponent,
  ],
  templateUrl: './segment-filter-preview-row.component.html',
  styleUrl: './segment-filter-preview-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentFilterPreviewRowComponent {
  readonly row = input.required<SegmentFilterRow>();

  readonly iconClass = input.required<string>();

  readonly tone = input.required<string>();

  readonly chipEdit = output<SegmentFilterChipEdit>();

  readonly duplicate = output<void>();

  readonly remove = output<void>();

  readonly playersClick = output<void>();

  private readonly host = inject(ElementRef<HTMLElement>);

  protected readonly openChipIndex = signal<number | null>(null);

  protected formatPlayersLabel(count: number): string {
    return `${count.toLocaleString('en-US')} players`;
  }

  protected onPlayersBadgeClick(): void {
    if (this.row().playerCount <= 0) {
      return;
    }
    this.playersClick.emit();
  }

  protected isEditableChip(token: SegmentFilterToken): boolean {
    return isEditableFilterChip(this.row().filterType, token);
  }

  protected isChipMenuOpen(index: number): boolean {
    return this.openChipIndex() === index;
  }

  protected usesMenu(token: SegmentFilterToken): boolean {
    return filterChipUsesMenu(this.row().filterType, token);
  }

  protected usesStaticPicker(token: SegmentFilterToken): boolean {
    return filterChipUsesStaticPicker(this.row().filterType, token);
  }

  protected usesCustomValueEditor(token: SegmentFilterToken): boolean {
    return filterChipUsesCustomValueEditor(this.row().filterType, token);
  }

  protected usesListPopover(token: SegmentFilterToken): boolean {
    return filterChipUsesListPopover(this.row().filterType, token);
  }

  protected customValueInputMode(token: SegmentFilterToken): 'number' | 'text' {
    return this.row().filterType === SegmentFilterType.STRING ? 'text' : 'number';
  }

  protected usesInlineValueEditor(token: SegmentFilterToken): boolean {
    return this.usesCustomValueEditor(token) && this.customValueInputMode(token) === 'number';
  }

  protected inlineValueText(token: SegmentFilterToken): string {
    if (token.kind !== 'chip') {
      return '';
    }
    return token.text === '…' ? '' : token.text;
  }

  protected menuOptions(token: SegmentFilterToken): readonly SegmentFilterMenuOption[] {
    if (token.kind !== 'chip' || !token.role) {
      return [];
    }
    return filterChipMenuOptions(this.row().filterType, token.role, this.row().apiKey);
  }

  protected menuWithSearch(token: SegmentFilterToken): boolean {
    return (
      token.kind === 'chip' &&
      token.role === 'currency' &&
      this.menuOptions(token).length > CURRENCY_MENU_SEARCH_THRESHOLD
    );
  }

  protected listOptions(token: SegmentFilterToken) {
    return listOptionsForApiKey(this.row().apiKey);
  }

  protected listSelectedKeys(): readonly string[] {
    return listSelectionKeys(this.row().tokens, this.row().apiKey);
  }

  protected staticDateValue(token: SegmentFilterToken): Date {
    if (token.kind !== 'chip') {
      return new Date();
    }
    return parseStaticDateTime(token.text);
  }

  protected onChipClick(token: SegmentFilterToken, index: number, event: MouseEvent): void {
    event.stopPropagation();
    if (!this.isEditableChip(token)) {
      return;
    }
    if (this.openChipIndex() === index) {
      this.openChipIndex.set(null);
      return;
    }
    this.openChipIndex.set(index);
  }

  protected onMenuPick(token: SegmentFilterToken, index: number, option: SegmentFilterMenuOption): void {
    if (token.kind !== 'chip' || !token.role) {
      return;
    }
    this.openChipIndex.set(null);
    this.chipEdit.emit({
      kind: 'menu',
      rowId: this.row().id,
      chipIndex: index,
      role: token.role,
      option,
    });
  }

  protected onStaticDateConfirm(token: SegmentFilterToken, index: number, date: Date): void {
    if (token.kind !== 'chip' || !token.role) {
      return;
    }
    this.openChipIndex.set(null);
    this.chipEdit.emit({
      kind: 'datetime',
      rowId: this.row().id,
      chipIndex: index,
      role: token.role,
      date,
    });
  }

  protected onCustomValueConfirm(token: SegmentFilterToken, index: number, text: string): void {
    if (token.kind !== 'chip' || !token.role) {
      return;
    }
    this.openChipIndex.set(null);
    this.chipEdit.emit({
      kind: 'text',
      rowId: this.row().id,
      chipIndex: index,
      role: token.role,
      text,
    });
  }

  protected onListConfirm(token: SegmentFilterToken, index: number, values: readonly string[]): void {
    if (token.kind !== 'chip' || !token.role) {
      return;
    }
    this.chipEdit.emit({
      kind: 'multiselect',
      rowId: this.row().id,
      chipIndex: index,
      role: token.role,
      values,
    });
  }

  protected chipDisplayText(token: SegmentFilterToken): string {
    if (token.kind !== 'chip') {
      return '';
    }
    return token.role
      ? normalizeFilterChipDisplayText(this.row().filterType, token.text, token.role)
      : token.text;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.openChipIndex() === null) {
      return;
    }
    const target = event.target as Node | null;
    if (target && this.host.nativeElement.contains(target)) {
      return;
    }
    this.openChipIndex.set(null);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.openChipIndex.set(null);
  }
}
