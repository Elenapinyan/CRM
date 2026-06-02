import { AfterViewInit, ComponentRef, Directive, ElementRef, HostListener, inject, input, Renderer2, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, take } from 'rxjs';
import { SubMenuPlacement } from '../../interfaces/open-menu.interface';
import { DsOpenMenuComponent } from '../../open-menu.component';
import { DsOpenMenuExtensionDirective } from '../open-menu-extension';
import { DsOpenMenuDirective } from '../open-menu';
import { DsOpenMenuItemDirective } from '../open-menu-item';
import { recursiveFilterItems } from '../../utils/filter.util';

@Directive({
  selector: '[dsOpenSubMenu]',
})
export class DsOpenSubMenuDirective extends DsOpenMenuExtensionDirective implements AfterViewInit {
  closeParentOnClick = input<boolean>(true);
  placement = input<SubMenuPlacement>('right');

  private readonly customPlacement = signal<SubMenuPlacement>('right');

  private readonly parentMenuItem = inject(DsOpenMenuItemDirective, { optional: true, host: true });
  private readonly openMenuDirective = inject(DsOpenMenuDirective, { host: true, optional: true });
  private readonly hostElement = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer2 = inject(Renderer2);

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    this.addSpecialClasses(['open-menu-component__item-holder']);

    if (this.parentMenuItem) {
      this.parentMenuItem.subMenu = this;
    }
  }

  @HostListener('click') mouseEnterListener(): void {
    if (this.componentRef) {
      this.dismiss();
      return;
    }

    this.customPlacement.set(this.placement());

    this.componentRef = this.viewRef.createComponent(DsOpenMenuComponent);
    const { innerWidth } = window;

    const { width: rectWidth, x: rectX, right: rectRight } = this.hostElement.nativeElement.getBoundingClientRect();
    const BUFFER = 10;

    // Check right side overflow
    if (rectRight + rectWidth > innerWidth) {
      // Check if there's enough space on the left side
      if (rectX - rectWidth - BUFFER >= 0) {
        this.customPlacement.set('left');
      }
    } else if (rectX <= rectWidth + BUFFER) {
      this.customPlacement.set('right');
    }

    this.subscribeToMouseLeaveEvent(this.componentRef.location.nativeElement);
    this.subscribeToCloseParentMenuDropdown(this.componentRef.instance);
    this.subscribeToDropdownClose(this.componentRef.instance);
    this.setOpenMenuComponentInputParams(this.componentRef);

    this.openMenuDirective?.searchValue$.subscribe((v) => {
      this.componentRef?.setInput('items', recursiveFilterItems(this.items.toArray(), v));
    });
  }

  setOpenMenuComponentInputParams(componentRef: ComponentRef<DsOpenMenuComponent>): void {
    componentRef.setInput('placement', this.customPlacement());
    componentRef.setInput('type', 'sub-menu');
    componentRef.setInput('items', this.items.toArray());
    componentRef.setInput('closeParentOnClick', this.closeParentOnClick());
  }

  private addSpecialClasses(classes: string[]): void {
    classes.forEach((additionalClass) => {
      this.renderer2.addClass(this.hostElement.nativeElement, additionalClass);
    });
  }

  private subscribeToCloseParentMenuDropdown(component: DsOpenMenuComponent): void {
    component.closeParentMenuDropdown.subscribe(() => this.openMenuDirective?.dismiss());
  }

  private subscribeToMouseLeaveEvent(htmlElement: HTMLElement): void {
    fromEvent(htmlElement, 'mouseleave')
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.dismiss());
  }
}
