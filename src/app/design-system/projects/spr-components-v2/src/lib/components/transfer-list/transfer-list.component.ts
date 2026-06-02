import { ChangeDetectionStrategy, Component, computed, contentChildren, input, model, output, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  isParentItem,
  ParentTransferListItem,
  TransferListGroup,
  TransferListItem,
  TransferListOutput,
  TransferListOutputSingle,
  TransferListTemplateTypes,
} from './transfer-list.util';
import { TransferListTemplateDirective } from './transfer-list-template.directive';
import { TransferListItemComponent } from './transfer-list-item/transfer-list-item.component';
import { DsInputComponent } from '../input';
import { DsButton } from '../button';
import { DsMonochromeBadgeComponent } from '../monochrome-badge';

@Component({
  selector: 'ds-transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, TransferListItemComponent, DsInputComponent, DsButton, DsMonochromeBadgeComponent],
})
export class TransferListComponent {
  sourceList = model<TransferListItem[]>([]);
  targetList = model<TransferListItem[]>([]);

  visibleHeader = input<string>('');
  countriesHeader = input<string>('');
  sourceColumnHeader = input<string>('');
  targetColumnHeader = input<string>('');
  searchPlaceholder = input<string>('');
  disabled = input<boolean>(false);
  groupBy = input<'category' | false>(false);

  /*
   * The items only can be right side
   */
  disabledItems = input<string[]>([]);

  /*
   * The items only can be left side
   */
  enabledItems = input<string[]>([]);

  readonly movedSingle = output<TransferListOutputSingle>();
  readonly movedAll = output<TransferListOutput>();

  protected customTemplates = contentChildren(TransferListTemplateDirective);

  protected readonly customTemplateDict = computed(() => {
    const customTemplates = this.customTemplates();
    const dictionary: Record<string, TemplateRef<unknown>> = {};

    for (const dir of customTemplates) {
      dictionary[dir.dsTransferListTemplate()] = dir.template;
    }

    return dictionary;
  });

  protected readonly sourceMoveAllTemplate = computed(() => this.customTemplateDict()[TransferListTemplateTypes.SOURCE_MOVE_ALL_BUTTON]);

  protected readonly targetMoveAllTemplate = computed(() => this.customTemplateDict()[TransferListTemplateTypes.TARGET_MOVE_ALL_BUTTON]);

  protected readonly searchControl = new FormControl('', { nonNullable: true });

  protected readonly filteredSourceList = computed(() => {
    const list = this.sourceList();
    const searchTerm = this.controlValue();

    return this.getFiltered(list, searchTerm);
  });

  protected readonly filteredTargetList = computed(() => {
    const list = this.targetList();
    const searchTerm = this.controlValue();

    return this.getFiltered(list, searchTerm);
  });

  protected readonly unitedSourceList = computed(() => {
    const list = this.filteredSourceList();

    return this.createSortedUnits(list);
  });

  protected readonly unitedTargetList = computed(() => {
    const list = this.filteredTargetList();

    return this.createSortedUnits(list);
  });

  private readonly controlValue = toSignal(this.searchControl.valueChanges);

  moveToTarget(item: TransferListItem | ParentTransferListItem): void {
    if (this.enabledItems().includes(item.value) || this.disabled()) {
      return;
    }

    if (isParentItem(item) && item.children.length) {
      this.moveListToTarget(item.children);
      return;
    }

    this.sourceList.update((list) => list.filter((source: TransferListItem) => source.value !== item.value));
    this.targetList.update((list) => [...list, item]);

    this.movedSingle.emit({
      sourceList: this.sourceList(),
      targetList: this.targetList(),
      direction: 'target',
      item,
    });
  }

  moveToSource(item: TransferListItem): void {
    if (this.disabledItems().includes(item.value) || this.disabled()) {
      return;
    }

    if (isParentItem(item) && item.children.length) {
      this.moveListToSource(item.children);
      return;
    }

    this.targetList.update((list) => list.filter((target: TransferListItem) => target.value !== item.value));
    this.sourceList.update((list) => [...list, item]);

    this.movedSingle.emit({
      sourceList: this.sourceList(),
      targetList: this.targetList(),
      direction: 'source',
      item,
    });
  }

  moveAllToTarget(): void {
    if (this.disabled()) {
      return;
    }

    const filteredList = this.filteredSourceList().filter((item) => !this.enabledItems().includes(item.value));

    this.moveListToTarget(filteredList);
  }

  moveAllToSource(): void {
    if (this.disabled()) {
      return;
    }

    const filteredList = this.filteredTargetList().filter((item) => !this.disabledItems().includes(item.value));

    this.moveListToSource(filteredList);
  }

  private moveListToTarget(items: TransferListItem[]): void {
    if (this.disabled()) {
      return;
    }

    const filteredList = items.filter((item) => !this.enabledItems().includes(item.value));

    this.targetList.update((list) => [...list, ...filteredList]);

    this.sourceList.update((list) =>
      list.filter((source: TransferListItem) => {
        return !filteredList.some((item: TransferListItem) => source.value === item.value);
      }),
    );

    this.movedAll.emit({
      sourceList: this.sourceList(),
      targetList: this.targetList(),
      direction: 'target',
    });
  }

  private moveListToSource(items: TransferListItem[]): void {
    if (this.disabled()) {
      return;
    }

    const filteredList = items.filter((item) => !this.enabledItems().includes(item.value));

    this.sourceList.update((list) => [...list, ...filteredList]);

    this.targetList.update((list) =>
      list.filter((source: TransferListItem) => {
        return !filteredList.some((item: TransferListItem) => source.value === item.value);
      }),
    );

    this.movedAll.emit({
      sourceList: this.sourceList(),
      targetList: this.targetList(),
      direction: 'source',
    });
  }

  private getFiltered(items: TransferListItem[], term?: string): TransferListItem[] {
    return items.filter((item: TransferListItem) => item.name.toLowerCase().includes((term || '').trim().toLowerCase()));
  }

  private createSortedUnits(items: TransferListItem[]): TransferListItem[] {
    const collection: Record<string, TransferListGroup> = {};
    const rest: TransferListItem[] = [];
    const groupBy = this.groupBy();

    if (!groupBy) {
      return items.sort((a, b) => a.name.localeCompare(b.name));
    }

    for (const item of items) {
      const key = item[groupBy];

      if (!key) {
        rest.push(item);
        continue;
      }

      const unit = collection[key] ?? { key, items: [] };

      unit.items.push(item);

      collection[key] = unit;
    }

    const united: ParentTransferListItem[] = Object.values(collection)
      .map((item) => ({
        name: item.key,
        value: item.key,
        children: item.items.sort((a, b) => a.name.localeCompare(b.name)),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return [...united, ...rest];
  }
}
