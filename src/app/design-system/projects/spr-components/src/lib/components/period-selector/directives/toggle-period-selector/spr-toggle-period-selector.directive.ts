import { ComponentRef, DestroyRef, Directive, EventEmitter, HostListener, Input, Output, ViewContainerRef } from '@angular/core';
import { DateRange } from '../../index';
import { PeriodSelectorFooterSettings } from '../../interfaces/period-selector.interface';
import { SprPeriodSelectorPopupComponent } from '../../components/period-selector-popup';
import { take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Directive({
  selector: '[sprTogglePeriodSelector]',
  standalone: true,
})
export class SprTogglePeriodSelectorDirective {
  @Input() footerSettings!: PeriodSelectorFooterSettings;
  @Input() maxRangeInDays!: number;
  @Input() isDisabled!: boolean;
  @Input() maxDate!: NgbDate;
  @Input() inputId!: string;

  @Output() rangeConfirmed = new EventEmitter<DateRange | null>();
  @Output() rangeCanceled = new EventEmitter<void>();

  private componentRef: ComponentRef<SprPeriodSelectorPopupComponent> | null = null;
  private isConfirmed = false;

  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly destroyRef: DestroyRef,
  ) {}

  @HostListener('click')
  onClick(): void {
    this.toggleSelector();
  }

  private toggleSelector(): void {
    if (this.componentRef) {
      this.destroyComponent();
    } else {
      this.componentRef = this.viewContainerRef.createComponent(SprPeriodSelectorPopupComponent);

      this.componentRef.setInput('inputId', this.inputId);
      this.componentRef.setInput('maxDate', this.maxDate);
      this.componentRef.setInput('isDisabled', this.isDisabled);
      this.componentRef.setInput('maxRangeInDays', this.maxRangeInDays);
      this.componentRef.setInput('footerSettings', this.footerSettings);

      this.subscribeToCalendarCloseEvent(this.componentRef.instance);
      this.subscribeToRangeConfirmEvent(this.componentRef.instance);
      this.subscribeToRangeCancelEvent(this.componentRef.instance);
    }
  }

  private subscribeToCalendarCloseEvent(instance: SprPeriodSelectorPopupComponent): void {
    instance.calendarClosed.pipe(take(1), takeUntilDestroyed(this.destroyRef)).subscribe(() => this.destroyComponent());
  }

  private subscribeToRangeConfirmEvent(instance: SprPeriodSelectorPopupComponent): void {
    instance.rangeConfirmed.pipe(take(1), takeUntilDestroyed(this.destroyRef)).subscribe((range) => {
      this.isConfirmed = true;
      this.rangeConfirmed.emit(range);
      this.destroyComponent();
    });
  }

  private subscribeToRangeCancelEvent(instance: SprPeriodSelectorPopupComponent): void {
    instance.rangeCanceled.pipe(take(1), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      if (!this.isConfirmed) {
        this.rangeCanceled.emit();
      }

      this.isConfirmed = false;
      this.destroyComponent();
    });
  }

  private destroyComponent(): void {
    this.componentRef?.destroy();
    this.componentRef = null;
  }
}
