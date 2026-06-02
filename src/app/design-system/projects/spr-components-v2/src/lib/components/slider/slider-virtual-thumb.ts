import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  Renderer2,
  inject,
  input,
  signal,
} from '@angular/core';

/** add some extra logic/styles for thumb */
@Component({
  selector: 'ds-visual-thumb',
  templateUrl: './slider-virtual-thumb.html',
  styleUrl: './slider-virtual-thumb.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.hovered]': 'isHovered()',
    '[class.focused]': 'isFocused()',
  },
})
export class SliderVisualThumb implements AfterViewInit, OnDestroy {
  private readonly ngZone = inject(NgZone);
  private readonly renderer = inject(Renderer2);

  readonly valueIndicatorText = input<string>();

  /** Indicates which slider thumb this input corresponds to. */
  readonly sliderInputs = input.required<readonly ElementRef<HTMLElement>[] | undefined>();
  readonly isHovered = input(false);

  protected readonly isActive = signal(false);
  protected readonly isFocused = signal(false);

  // cleanup array for dom events
  private listenerCleanups: (() => void)[] = [];

  ngAfterViewInit(): void {
    // These listeners don't update any data bindings so we bind them outside
    // of the NgZone to prevent Angular from needlessly running change detection.
    this.ngZone.runOutsideAngular(() => {
      const inputs = this.sliderInputs();

      if (inputs) {
        inputs.forEach(({ nativeElement: input }) => {
          this.listenerCleanups = [
            ...this.listenerCleanups,
            this.renderer.listen(input, 'pointerdown', this.onDragStart),
            this.renderer.listen(input, 'pointerup', this.onDragEnd),
            this.renderer.listen(input, 'focus', this.onFocus),
            this.renderer.listen(input, 'blur', this.onBlur),
          ];
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.listenerCleanups?.forEach((cleanup) => cleanup());
    this.listenerCleanups = undefined as never;
  }

  private readonly onFocus = (): void => {
    this.isFocused.set(true);
  };

  private readonly onBlur = (): void => {
    this.isFocused.set(false);
  };

  private readonly onDragStart = (event: PointerEvent): void => {
    if (event.button !== 0) {
      return;
    }

    this.isActive.set(true);
  };

  private readonly onDragEnd = (): void => {
    this.isActive.set(false);
  };
}
