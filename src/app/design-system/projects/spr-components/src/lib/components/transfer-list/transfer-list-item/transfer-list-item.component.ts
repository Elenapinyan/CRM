import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { SprButtonComponent } from '../../button/spr-button.component';
import { NgTemplateOutlet } from '@angular/common';
import { isParentItem, ParentTransferListItem, TransferListItem, TransferListTemplateTypes } from '../transfer-list.util';
import { SprTransferListTemplateDirective } from '../spr-transfer-list-template.directive';

@Component({
  selector: 'spr-transfer-list-item',
  templateUrl: './transfer-list-item.component.html',
  styleUrl: './transfer-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SprButtonComponent, NgTemplateOutlet],
})
export class TransferListItemComponent {
  value = input.required<TransferListItem | ParentTransferListItem>();
  type = input<'source' | 'target'>('source');
  customTemplates = input<readonly SprTransferListTemplateDirective[]>([]);

  readonly moveItem = output<TransferListItem>();

  protected readonly contentTemplate = computed(() => {
    const name = this.type() === 'source' ? TransferListTemplateTypes.SOURCE_ITEM_CONTENT : TransferListTemplateTypes.TARGET_ITEM_CONTENT;

    return this.customTemplates().find((templateDirective) => templateDirective.sprTransferListTemplate() === name)?.template;
  });

  protected readonly iconTemplate = computed(() => {
    const name =
      this.type() === 'source' ? TransferListTemplateTypes.SOURCE_ITEM_BUTTON_ICON : TransferListTemplateTypes.TARGET_ITEM_BUTTON_ICON;

    return this.customTemplates().find((templateDirective) => templateDirective.sprTransferListTemplate() === name)?.template;
  });

  protected readonly isOpened = signal<boolean>(true);

  protected readonly isParentItem = isParentItem;

  protected move(item: TransferListItem | ParentTransferListItem): void {
    this.moveItem.emit(item);
  }

  protected toggleChildren(): void {
    this.isOpened.update((v) => !v);
  }
}
