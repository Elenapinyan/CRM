import {
  AfterViewInit,
  computed,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  output,
  signal,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { DomPortal, TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayConfig, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { MenuCloseTrigger, MenuPosition, positionsMap } from './menu.util';
import { fromEvent, skip, Subject, takeUntil } from 'rxjs';

/**
 * Our custom component which replaces ngbDropdown functionality.
 * CdkOverlay + CdkPortal are used.
 **/
@Directive({ selector: '[sprMenu]', exportAs: 'sprMenu' })
export class MenuDirective implements AfterViewInit, OnDestroy {
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly templateRef = inject<TemplateRef<unknown>>(TemplateRef, { optional: true });
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly overlay = inject(Overlay);

  private readonly destroy$ = new Subject<void>();

  private readonly portal = this.getPortal();

  private readonly selectedPositions = computed(() => positionsMap[this.position()]);

  private readonly resizeObserver = this.getResizeObserver();

  private positionStrategy!: PositionStrategy;

  private overlayRef!: OverlayRef;

  readonly isOpened = signal(false);

  /**
   * This property lets you set custom element as a host.
   * It means this menu will be connected to this element.
   * If not specified, the parent element will be used.
   **/
  host = input<HTMLElement>();

  /**
   * Custom placement of the menu.
   * @Default 'bottom'
   **/
  position = input<MenuPosition>('bottom');

  /**
   * Toggles backdrop
   * @Default false
   **/
  backdrop = input<boolean>(false);

  /**
   * You can specify whether the menu should be closed on a trigger.
   * @Default 'outside'
   **/
  closeTrigger = input<MenuCloseTrigger>('outside');

  readonly menuToggleChange = output<boolean>();

  constructor() {
    this.element.hidden = true;

    toObservable(this.position)
      .pipe(takeUntilDestroyed(this.destroyRef), skip(1))
      .subscribe(() => this.positionStrategy.apply());
  }

  private get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.overlayRef?.dispose();
    this.resizeObserver.disconnect();
  }

  open(): void {
    if (this.overlayRef.hasAttached()) {
      return;
    }

    // this is needed for the case when attribute directive was used instead of structural
    this.element.hidden = false;

    this.isOpened.set(true);

    this.menuToggleChange.emit(this.isOpened());

    this.overlayRef.attach(this.portal);

    requestAnimationFrame(() => {
      this.addCloseTriggerHandler();
    });
  }

  close(): void {
    if (!this.overlayRef.hasAttached()) {
      return;
    }

    this.overlayRef.detach();

    // destroy close trigger handler
    this.destroy$.next();

    this.element.hidden = true;

    this.isOpened.set(false);

    this.menuToggleChange.emit(this.isOpened());
  }

  private init(): void {
    this.positionStrategy = this.getPositionStrategy();

    this.overlayRef = this.overlay.create(this.getOverlayConfig());

    this.observeParentElement();
  }

  private getOverlayConfig(): OverlayConfig {
    return {
      backdropClass: 'spr-menu-backdrop',
      panelClass: 'spr-menu-panel',
      hasBackdrop: this.backdrop(),
      disposeOnNavigation: true,
      positionStrategy: this.positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      minWidth: this.host()?.offsetWidth ?? this.element.parentElement?.offsetWidth,
    };
  }

  private getPositionStrategy(): PositionStrategy {
    return this.overlay
      .position()
      .flexibleConnectedTo(this.host() ?? this.element.parentElement!)
      .withFlexibleDimensions(false)
      .withPositions(this.selectedPositions());
  }

  private getPortal(): TemplatePortal<unknown> | DomPortal {
    return this.templateRef ? new TemplatePortal(this.templateRef, this.viewContainerRef) : new DomPortal(this.element);
  }

  private addCloseTriggerHandler(): void {
    if (this.closeTrigger() === 'backdrop') {
      this.addBackdropHandler();
    }

    if (this.closeTrigger() === 'outside') {
      this.addOutsideClickHandler();
    }
  }

  private addBackdropHandler(): void {
    this.overlayRef
      .backdropClick()
      .pipe(takeUntil(this.destroy$), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.close());
  }

  private addOutsideClickHandler(): void {
    fromEvent<MouseEvent>(document, 'click')
      .pipe(takeUntil(this.destroy$), takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        const clickInside = this.overlayRef.overlayElement.contains(event.target as HTMLElement);

        if (clickInside) {
          return;
        }

        this.close();
      });
  }

  private getResizeObserver(): ResizeObserver {
    return new ResizeObserver((entries) => {
      for (const entry of entries) {
        this.overlayRef.updateSize({
          minWidth: entry.contentRect.width,
        });
      }
    });
  }

  private observeParentElement(): void {
    if (!this.element.parentElement) {
      return;
    }

    this.resizeObserver.observe(this.element.parentElement);
  }
}
