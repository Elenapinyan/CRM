import { AfterViewInit, ComponentRef, Directive, ElementRef, Host, HostListener, input, Optional, Renderer2, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, take } from 'rxjs';
import { SubMenuPlacement } from '../../interfaces/open-menu.interface';
import { SprOpenMenuComponent } from '../../spr-open-menu.component';
import { SprOpenMenuExtensionDirective } from '../open-menu-extension';
import { SprOpenMenuDirective } from '../open-menu';

@Directive({
  selector: '[sprOpenSubMenu]',
})
export class SprOpenSubMenuDirective extends SprOpenMenuExtensionDirective implements AfterViewInit {
  closeParentOnClick = input<boolean>(true);
  placement = input<SubMenuPlacement>('right');

  private readonly customPlacement = signal<SubMenuPlacement>('right');

  constructor(
    @Host() @Optional() private readonly openMenuDirective: SprOpenMenuDirective,
    private readonly hostElement: ElementRef<HTMLElement>,
    private readonly renderer2: Renderer2,
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.addSpecialClasses(['spr-sub-menu-list-item-padding-class']);
  }

  @HostListener('click') mouseEnterListener(): void {
    if (this.componentRef) {
      this.dismiss();
      return;
    }

    this.customPlacement.set(this.placement());

    this.componentRef = this.viewRef.createComponent(SprOpenMenuComponent);
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
  }

  setOpenMenuComponentInputParams(componentRef: ComponentRef<SprOpenMenuComponent>): void {
    componentRef.setInput('placement', this.customPlacement());
    componentRef.setInput('type', 'sub-menu');
    componentRef.setInput('items', this.items);
    componentRef.setInput('closeParentOnClick', this.closeParentOnClick());
  }

  private addSpecialClasses(classes: string[]): void {
    classes.forEach((additionalClass) => {
      this.renderer2.addClass(this.hostElement.nativeElement, additionalClass);
    });
  }

  private subscribeToCloseParentMenuDropdown(component: SprOpenMenuComponent): void {
    component.closeParentMenuDropdown.subscribe(() => this.openMenuDirective?.dismiss());
  }

  private subscribeToMouseLeaveEvent(htmlElement: HTMLElement): void {
    fromEvent(htmlElement, 'mouseleave')
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.dismiss());
  }
}
