import { AfterViewInit, DestroyRef, Directive, ElementRef, inject, input, Renderer2 } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, Subject, takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Directive({ selector: '[sprDynamicWidth]' })
export class DynamicVirtualScrollWidthDirective implements AfterViewInit {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer2 = inject(Renderer2);
  private readonly destroyRef = inject(DestroyRef);
  private readonly viewport = inject(CdkVirtualScrollViewport);
  private readonly destroy$ = new Subject<void>();

  /**
   * Toggle dynamic width calculation.
   * @Default false
   **/
  dynamicWidthEnabled = input<boolean>(false);

  ngAfterViewInit(): void {
    this.initResizeObserver();
  }

  private initResizeObserver(): void {
    const resizeObserver = new ResizeObserver((entries) => {
      const lastEntry = entries[0];

      if (!this.dynamicWidthEnabled()) {
        return;
      }

      // destroy the resize listener when dropdown was closed
      if (lastEntry.contentRect.width === 0) {
        this.destroy$.next();
        return;
      }

      // update only when dropdown opened
      this.updateMinWidth();

      this.initResizeListener();
      this.initViewportScrollListener();
    });

    // for the case when selection in dropdown and its width changing depending on open/close state
    resizeObserver.observe(this.elementRef.nativeElement);
  }

  private initResizeListener(): void {
    fromEvent(window, 'resize')
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        takeUntil(this.destroy$),
        distinctUntilChanged(),
        debounceTime(500),
        filter(() => this.dynamicWidthEnabled()),
      )
      .subscribe(() => this.updateMinWidth());
  }

  private initViewportScrollListener(): void {
    this.viewport
      .elementScrolled()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        takeUntil(this.destroy$),
        debounceTime(500),
        filter(() => this.dynamicWidthEnabled()),
      )
      .subscribe(() => this.updateMinWidth());
  }

  private updateMinWidth(): void {
    const el = this.elementRef.nativeElement;

    if (el.scrollWidth > window.innerWidth) {
      this.renderer2.setStyle(this.elementRef.nativeElement, 'min-width', window.innerWidth + 'px');
    } else {
      const minWidth = this.dynamicWidthEnabled() ? this.getWidthByContent(el) : el.offsetWidth;

      this.renderer2.setStyle(this.elementRef.nativeElement, 'min-width', minWidth + 'px');
    }
  }

  private getWidthByContent(el: HTMLElement): number {
    const scrollWrapper = el.querySelector('.cdk-virtual-scroll-content-wrapper') as HTMLElement;

    if (!scrollWrapper) {
      return 0;
    }

    const viewportContainer = el.querySelector('.viewport-content') as HTMLElement;

    const viewportContainerPadLeft = parseInt(getComputedStyle(viewportContainer).paddingLeft);
    const viewportContainerPadRight = parseInt(getComputedStyle(viewportContainer).paddingRight);

    const plPx = isNaN(viewportContainerPadLeft) ? 0 : viewportContainerPadLeft;
    const prPx = isNaN(viewportContainerPadRight) ? 0 : viewportContainerPadRight;

    return scrollWrapper.offsetWidth + plPx + prPx;
  }
}
