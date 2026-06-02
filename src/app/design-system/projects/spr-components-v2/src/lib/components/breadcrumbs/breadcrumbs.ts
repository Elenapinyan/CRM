import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { BreadcrumbItem } from './breadcrumbs.options';
import { RouterLink } from '@angular/router';
import { DsOpenMenuDirective, DsOpenMenuItemDirective } from '../open-menu';
import { SprLimiterContainerDirective, SprLimiterItemDirective } from '../../shared';

@Component({
  selector: 'ds-breadcrumbs',
  templateUrl: 'breadcrumbs.html',
  styleUrl: 'breadcrumbs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'spr-breadcrumbs',
  },
  imports: [RouterLink, DsOpenMenuDirective, DsOpenMenuItemDirective, SprLimiterContainerDirective, SprLimiterItemDirective],
})
export class DsBreadcrumbs {
  protected readonly collapsedItems = signal<BreadcrumbItem[]>([]);

  /**
   * List of items to show
   * @required
   **/
  items = input.required<BreadcrumbItem[]>();

  /**
   * Disables route on click
   * @default false
   **/
  disableRouting = input<boolean>(false);

  /**
   * Emits item you clicked. Works regardless of the disableRouting property.
   **/
  readonly itemClicked = output<BreadcrumbItem>();

  handleClick(item: BreadcrumbItem): void {
    this.itemClicked.emit(item);
  }

  addCollapsedItems(items: BreadcrumbItem[]): void {
    this.collapsedItems.set(items);
  }
}
