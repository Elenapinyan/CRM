import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
  input,
  output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  DsDatepicker,
  SprDatetimeAdapter,
  SprDefaultDatetimeAdapter,
} from '@platform-workspace/design-system-v2';

@Component({
  selector: 'app-segment-filter-static-datetime-popover',
  standalone: true,
  template: `<div class="segment-filter-static-datetime-popover"><ng-container #pickerHost /></div>`,
  styleUrl: './segment-filter-static-datetime-popover.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: SprDatetimeAdapter, useClass: SprDefaultDatetimeAdapter }],
})
export class SegmentFilterStaticDatetimePopoverComponent implements AfterViewInit {
  @ViewChild('pickerHost', { read: ViewContainerRef }) private pickerHost?: ViewContainerRef;

  readonly value = input.required<Date>();

  readonly confirm = output<Date>();

  ngAfterViewInit(): void {
    const host = this.pickerHost;
    if (!host) {
      return;
    }

    const control = new FormControl<Date | null>(this.value());
    const picker = host.createComponent(DsDatepicker);
    const pickerRef = picker as ComponentRef<DsDatepicker<Date>>;

    picker.setInput('controlSize', 'sm');
    picker.setInput('timepicker', true);
    picker.setInput('isColored', false);
    picker.setInput('isDeselectAllowed', false);
    picker.instance.disableAutoApply(true);

    picker.instance.registerOnChange((next) => {
      if (next instanceof Date) {
        control.setValue(next, { emitEvent: false });
        this.confirm.emit(next);
      }
    });
    picker.instance.registerOnTouched(() => undefined);
    picker.instance.writeValue(this.value());
    picker.location.nativeElement.classList.add('segment-filter-static-datetime-popover__host');
    picker.changeDetectorRef.detectChanges();
  }
}
