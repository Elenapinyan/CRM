import {
  computed,
  contentChild,
  contentChildren,
  DestroyRef,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  OnInit,
  output,
  Renderer2,
  untracked,
} from '@angular/core';
import { debounceTime, fromEventPattern, map, Observable, pairwise } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SprLimiterItemDirective } from './limiter-item';
import { SprLimiterCounterDirective } from './limiter-counter';

@Directive({
  selector: '[sprLimiterContainer]',
})
export class SprLimiterContainerDirective<ItemType = unknown> implements OnInit {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly destroyRef = inject(DestroyRef);

  readonly collapsedItems = output<ItemType[]>();

  direction = input<'ltr' | 'rtl'>('ltr');
  // type guard input prop
  sprLimiterContainer = input<ItemType[]>();

  protected items = contentChildren(SprLimiterItemDirective<ItemType>);
  protected counter = contentChild(SprLimiterCounterDirective);
  protected counterWidth = computed(() => this.counter()?.element?.getBoundingClientRect()?.width ?? 0);

  readonly limitedItems = computed(() => this.items().filter((item) => item.hidden()));
  private readonly visibleItems = computed(() => this.items().filter((item) => !item.hidden()));

  constructor() {
    effect(() => {
      const items = this.items();

      if (!items) {
        return;
      }

      requestAnimationFrame(() => this.checkItemsFitContainer());
    });

    effect(() => {
      const limitedItems = this.limitedItems();

      untracked(() => {
        this.collapsedItems.emit(limitedItems.map((item) => item.item()));
      });
    });
  }

  get container(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.subscribeToResize();

    this.renderer.setStyle(this.elementRef.nativeElement, 'position', 'relative');
  }

  private getSizes(): { itemsWidth: number; containerWidth: number } {
    const gap = parseInt(getComputedStyle(this.container).gap) || 0;
    const itemsWidth = this.visibleItems().reduce((pv, cv, index, arr) => {
      const elementWidth = cv.element?.getBoundingClientRect()?.width || cv.elementWidth || 0;

      return pv + elementWidth + (index === arr.length - 1 ? 0 : gap);
    }, 0);
    const containerWidth = this.container.getBoundingClientRect().width;

    return {
      itemsWidth,
      containerWidth,
    };
  }

  private limitItems(): void {
    if (!this.visibleItems().length) {
      return;
    }

    const sizes = this.getSizes();

    const { itemsWidth, containerWidth } = sizes;
    const counterWidth = this.limitedItems().length && this.counter() ? this.counterWidth() : 0;

    if (itemsWidth > containerWidth - counterWidth) {
      const items = this.visibleItems();
      const item = this.direction() === 'rtl' ? items[0] : items[items.length - 1];

      item.hidden.set(true);
    } else {
      return;
    }

    this.limitItems();
  }

  private returnLimitedItems(): void {
    if (!this.limitedItems().length) {
      return;
    }

    const sizes = this.getSizes();

    const { containerWidth, itemsWidth } = sizes;
    const counterWidth = this.limitedItems().length > 1 && this.counter() ? this.counterWidth() : 0;
    const items = this.limitedItems();
    const item = items[items.length - 1];
    const gap = parseInt(getComputedStyle(this.container).gap) || 0;

    const elementWidth = item.elementWidth + gap < containerWidth - itemsWidth ? item.elementWidth + gap : item.elementWidth;

    if (elementWidth < containerWidth - counterWidth - itemsWidth) {
      item.hidden.set(false);
    } else {
      return;
    }

    this.returnLimitedItems();
  }

  private checkItemsFitContainer(): void {
    const sizes = this.getSizes();

    const { itemsWidth, containerWidth } = sizes;

    if (itemsWidth < containerWidth && this.limitedItems().length) {
      this.returnLimitedItems();
    } else {
      this.limitItems();
    }
  }

  private fromResizeObserver(element: Element, options?: ResizeObserverOptions): Observable<ResizeObserverEntry[]> {
    return fromEventPattern<ResizeObserverEntry[]>(
      (handler) => {
        const ro = new ResizeObserver((entries) => handler(entries));

        ro.observe(element, options);

        return ro;
      },
      (_, ro: ResizeObserver) => ro.disconnect(),
    );
  }

  private subscribeToResize(): void {
    this.fromResizeObserver(this.elementRef.nativeElement)
      .pipe(
        debounceTime(300),
        map(([entry]) => {
          return entry?.contentRect?.width ?? 0;
        }),
        pairwise(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(([prevWidth, width]) => {
        if (width > prevWidth) {
          this.returnLimitedItems();
        }

        if (width < prevWidth) {
          this.limitItems();
        }
      });
  }
}
