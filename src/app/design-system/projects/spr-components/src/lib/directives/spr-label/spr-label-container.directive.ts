import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, inject, Input } from '@angular/core';
import { DynamicPosition } from '../dynamic-template/interfaces';
import { SprLabelDirective } from './spr-label.directive';

@Directive({ selector: '[sprLabelContainer]', standalone: true })
export class SprLabelContainerDirective implements AfterViewInit {
  @Input() set sprLabelDefaultPosition(value: DynamicPosition) {
    if (!this.sprLabelDirective) {
      return;
    }

    this.sprLabelDirective.sprLabelPosition = value;

    this.sprLabelDirective.dynamicElement?.resolvePosition();

    this.cdRef.markForCheck();
  }

  @Input() set sprLabelDefaultClass(value: string) {
    if (!this.sprLabelDirective) {
      return;
    }

    this.sprLabelDirective.sprLabelClass = value;

    this.cdRef.markForCheck();
  }

  private readonly elementRef: ElementRef = inject(ElementRef);
  private readonly cdRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly sprLabelDirective: SprLabelDirective | null = inject(SprLabelDirective, { optional: true, skipSelf: true });

  ngAfterViewInit(): void {
    if (!this.sprLabelDirective) {
      return;
    }

    this.sprLabelDirective.sprDynamicComponentCustomContainer = this.elementRef.nativeElement;

    this.sprLabelDirective.dynamicElement?.resolvePosition();

    this.sprLabelDirective.dynamicElement?.updateClass();

    this.cdRef.markForCheck();
  }
}
