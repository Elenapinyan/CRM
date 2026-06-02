import { DestroyRef, Directive, ElementRef, inject, InjectionToken, input, OnInit, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, filter, fromEvent, interval, map, merge, startWith, switchMap, takeUntil, withLatestFrom } from 'rxjs';

export interface LongPressDefaults {
  longPressDebounce: number;
  longPressInterval: number;
}

/**
 * Injection token for the default configuration of the long press directive.
 * Provides default values for `longPressDebounce` and `longPressInterval`.
 */
export const LONG_PRESS_DEFAULTS = new InjectionToken('Long Press Defaults', {
  factory: (): LongPressDefaults => ({
    longPressDebounce: 800,
    longPressInterval: 100,
  }),
});

/**
 * Directive to handle long press events on an element.
 * Emits a `sprLongPress` event when the element is pressed and held for a specified duration.
 */
@Directive({
  selector: '[sprLongPress]',
})
export class DsLongPressDirective implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject(ElementRef);
  private readonly longPressDefaults = inject(LONG_PRESS_DEFAULTS);

  readonly sprLongPress = output<MouseEvent>();

  /**
   * The debounce time in milliseconds before the long press event is emitted.
   * @default 800
   */
  readonly longPressDebounce = input(this.longPressDefaults.longPressDebounce);

  /**
   * The interval in milliseconds at which the long press event is emitted while the mouse button is held down.
   * @default 100
   */
  readonly longPressInterval = input(this.longPressDefaults.longPressInterval);

  ngOnInit(): void {
    this.addEventListener();
  }

  /**
   * Adds event listeners to the host element to detect long press events.
   */
  private addEventListener(): void {
    const element = this.elementRef.nativeElement;

    const stops$ = merge(fromEvent<MouseEvent>(element, 'mouseup'), fromEvent<MouseEvent>(element, 'mouseleave'));

    fromEvent<MouseEvent>(element, 'mousedown')
      .pipe(
        map((event) => {
          return event;
        }),
        debounceTime(Number(this.longPressDebounce())),
        withLatestFrom(stops$.pipe(startWith(null))),
        filter(([event, stop]) => {
          return !stop?.timeStamp || event.timeStamp > stop?.timeStamp;
        }),
        map(([event]) => event),
        switchMap((event) => {
          return interval(this.longPressInterval()).pipe(
            takeUntil(stops$),
            map(() => event),
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (event) => {
          this.sprLongPress.emit(event);
        },
      });
  }
}
