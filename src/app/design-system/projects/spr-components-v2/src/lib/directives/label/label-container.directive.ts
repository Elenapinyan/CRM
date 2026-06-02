import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, inject, Input } from '@angular/core';
import { DynamicPosition, DynamicProjection } from '../dynamic-template/interfaces';
import { DsLabelDirective } from './label.directive';

@Directive({ selector: '[dsLabelContainer]', standalone: true })
export class LabelContainerDirective implements AfterViewInit {
  @Input() set dsLabelPosition(value: DynamicPosition) {
    if (!this.dsLabelDirective) {
      return;
    }

    this.dsLabelDirective.dsLabelPosition = value;

    this.dsLabelDirective.dynamicElement?.resolvePosition();

    this.cdRef.markForCheck();
  }

  @Input() set dsLabelProjection(value: DynamicProjection) {
    if (!this.dsLabelDirective) {
      return;
    }

    this.dsLabelDirective.dsLabelProjection = value;

    this.dsLabelDirective.dynamicElement?.resolvePosition();

    this.cdRef.markForCheck();
  }

  @Input() set dsLabelDefaultClass(value: string) {
    if (!this.dsLabelDirective) {
      return;
    }

    this.dsLabelDirective.dsLabelClass = value;

    this.cdRef.markForCheck();
  }

  private readonly elementRef: ElementRef = inject(ElementRef);
  private readonly cdRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly dsLabelDirective: DsLabelDirective | null = inject(DsLabelDirective, { optional: true, skipSelf: true });

  ngAfterViewInit(): void {
    if (!this.dsLabelDirective) {
      return;
    }

    this.dsLabelDirective.dsDynamicComponentCustomContainer = this.elementRef.nativeElement;

    this.dsLabelDirective.dynamicElement?.resolvePosition();

    this.dsLabelDirective.dynamicElement?.updateClass();

    this.cdRef.markForCheck();
  }
}
