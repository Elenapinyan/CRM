import { computed, Directive, input, output, signal } from '@angular/core';
import { BehaviorSubject, filter, finalize, map, Observable, of, scan, switchMap, takeWhile, timer } from 'rxjs';
import { DEFAULT_ANIMATION, DEFAULT_AUTOCLOSE_DELAY } from './autoclose.options';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AnimationEvent } from '@angular/animations';
import { AppearanceAnimationType, AppearanceAnimationTypes } from '../../animations';
import { toObservable } from '@angular/core/rxjs-interop';

@Directive({
  host: {
    '[@AppearanceAnimations]': 'isOpened() ? "init" : animation()',
    '(@AppearanceAnimations.done)': 'dismissFinished($event)',
    '(mouseenter)': 'paused$.next(true)',
    '(mouseleave)': 'paused$.next(false)',
  },
  providers: [provideAnimations()],
})
export abstract class DsAutocloseBase {
  protected readonly isOpened = signal<boolean>(true);
  protected readonly ticks = computed(() => this.delay() * 2);
  protected readonly paused$ = new BehaviorSubject<boolean>(false);

  /**
   * Time in seconds, then closed event will be emitted
   * @default false
   **/
  autoclose = input<boolean>(false);

  /**
   * Time in seconds, then closed event will be emitted
   * @default 5
   **/
  delay = input<number>(DEFAULT_AUTOCLOSE_DELAY);

  /**
   * Animation on dismiss
   * @default DEFAULT_ANIMATION = 'fade'
   **/
  animation = input<AppearanceAnimationType>(DEFAULT_ANIMATION);

  /**
   * Pause timer on mouse hover
   * @default true
   **/
  pauseOnHover = input<boolean>(true);

  /**
   * Dismiss event which will be emitted when item is closed.
   **/
  readonly dismissed = output<void>();

  protected readonly timer$ = this.getTimer$();

  dismiss(): void {
    this.isOpened.set(false);
  }

  protected dismissFinished(event: AnimationEvent): void {
    const state = event.toState as AppearanceAnimationType;
    const animations = Object.values(AppearanceAnimationTypes);

    if (animations.includes(state)) {
      this.dismissed.emit();
    }
  }

  private getTimer$(): Observable<{ seconds: number; percents: number }> {
    const period = 500;

    return toObservable(this.delay).pipe(
      map((delay) => delay * 2),
      switchMap((ticks) =>
        this.paused$.pipe(
          switchMap((paused) => (paused ? of(null) : timer(0, period).pipe(map(() => -1)))),
          filter(() => this.autoclose()),
          scan((acc, value) => acc + (value ?? 0), ticks),
          takeWhile((v) => v >= 0, true),
          map((seconds) => ({ seconds, percents: (seconds / ticks) * 100 })),
          finalize(() => this.dismiss()),
        ),
      ),
    );
  }
}
