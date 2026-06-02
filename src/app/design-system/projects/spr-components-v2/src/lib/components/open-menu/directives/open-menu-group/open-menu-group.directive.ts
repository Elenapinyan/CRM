import {
  AfterViewInit,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
  QueryList,
  Renderer2,
} from '@angular/core';
import { DsOpenMenuItemDirective } from '../open-menu-item';
import { DsOpenMenuDirective } from '../open-menu';
import { DsOpenGroupMenuTitleDirective } from '../open-group-menu-title';
import { getItemClassList } from './utils/open-menu-group.util';
import { recursiveFilterItems } from '../../utils/filter.util';
import { filter } from 'rxjs';

@Directive({
  selector: '[dsOpenGroupMenu]',
})
export class DsOpenGroupMenuDirective implements AfterViewInit {
  @Input() closeEntireMenuOnChildClick: boolean = true;
  @Input() closeGroupMenuOnChildClick: boolean = true;

  @Output() visibilityChange = new EventEmitter<boolean>();

  @ContentChildren(DsOpenMenuItemDirective, { descendants: true }) items!: QueryList<DsOpenMenuItemDirective>;
  @ContentChild(DsOpenGroupMenuTitleDirective, { descendants: true }) title?: DsOpenGroupMenuTitleDirective;

  private readonly liElements: HTMLLIElement[] = [];
  private listElement: HTMLUListElement | null = null;
  private chevronElement: HTMLElement | null = null;
  private isOpened: boolean = false;

  private readonly parentMenuItem = inject(DsOpenMenuItemDirective, { optional: true, host: true });
  private readonly openMenuDirective = inject(DsOpenMenuDirective, { host: true, optional: true });
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer2 = inject(Renderer2);

  get isOpen(): boolean {
    return this.isOpened;
  }

  @HostListener('click')
  onClick(): void {
    this.isOpened = !this.isOpened;
    this.isOpened ? this.showItems() : this.hideItems();

    if (this.chevronElement) {
      this.changeChevronClassesByOpenStatus(this.chevronElement);
    }

    this.visibilityChange.emit(this.isOpened);
  }

  ngAfterViewInit(): void {
    this.renderTitle();

    if (this.parentMenuItem) {
      this.parentMenuItem.groupMenu = this;
    }

    this.openMenuDirective?.searchValue$.pipe(filter(() => this.isOpened)).subscribe(() => {
      this.hideItems();
      this.showItems();
    });
  }

  private showItems(): void {
    const listElement: HTMLUListElement = this.renderer2.createElement('ul');
    this.listElement = listElement;

    this.addClasses(listElement, ['open-group-menu-list']);
    this.renderer2.appendChild(this.elementRef.nativeElement, listElement);

    recursiveFilterItems(this.items.toArray(), this.openMenuDirective?.searchValue() ?? '').forEach((templateItem) => {
      const liElement: HTMLLIElement = this.renderer2.createElement('li');
      this.liElements.push(liElement);

      this.addClasses(liElement, getItemClassList(templateItem));

      liElement.addEventListener('click', (event) => {
        if (!this.closeGroupMenuOnChildClick) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }

        if (this.closeEntireMenuOnChildClick) {
          this.openMenuDirective?.dismiss();
        }
      });

      this.renderer2.appendChild(listElement, liElement);
      templateItem.viewContainerRef
        .createEmbeddedView(templateItem.templateRef)
        .rootNodes.forEach((node) => this.renderer2.appendChild(liElement, node));
    });
  }

  private hideItems(): void {
    this.items.forEach((item) => item.viewContainerRef.clear());
    this.liElements.forEach((liElement) => liElement.remove());
    this.listElement?.remove();
  }

  private renderTitle(): void {
    // 1. Render main title container.
    const mainTitleContainer: HTMLDivElement = this.renderer2.createElement('div');
    const parent = this.elementRef.nativeElement;
    this.addClasses(mainTitleContainer, ['open-group-menu-title-container']);
    this.renderer2.insertBefore(parent, mainTitleContainer, parent.firstChild);

    // 2. Insert chevron element into the title container.
    this.chevronElement = this.createChevronElement();
    this.renderer2.appendChild(mainTitleContainer, this.chevronElement);

    // 3. Insert title content container into the main title container.
    const titleContentContainer: HTMLDivElement = this.renderer2.createElement('div');
    this.addClasses(titleContentContainer, ['open-group-menu-title-content-container']);

    if (this.title) {
      this.title.viewContainerRef
        .createEmbeddedView(this.title.templateRef)
        .rootNodes.forEach((node) => this.renderer2.appendChild(titleContentContainer, node));
      this.renderer2.appendChild(mainTitleContainer, titleContentContainer);
    }
  }

  private createChevronElement(): HTMLElement {
    const chevronElement: HTMLElement = this.renderer2.createElement('i');
    const chevronClassList: string[] = ['ds-icon'];
    chevronClassList.push(this.isOpened ? 'ds-icon-arrows-chevron-down' : 'ds-icon-arrows-chevron-right');

    this.addClasses(chevronElement, chevronClassList);
    return chevronElement;
  }

  private changeChevronClassesByOpenStatus(chevronElement: HTMLElement): void {
    this.removeClasses(chevronElement, ['ds-icon-arrows-chevron-down', 'ds-icon-arrows-chevron-right']);
    this.addClasses(chevronElement, [this.isOpened ? 'ds-icon-arrows-chevron-down' : 'ds-icon-arrows-chevron-right']);
  }

  private addClasses(element: HTMLElement, classList: string[]): void {
    classList.forEach((classItem) => this.renderer2.addClass(element, classItem));
  }

  private removeClasses(element: HTMLElement, classList: string[]): void {
    classList.forEach((classItem) => this.renderer2.removeClass(element, classItem));
  }
}
