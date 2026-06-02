import { Directive, HostBinding, Input } from '@angular/core';
import { ControlSize } from '../interfaces/controls-size.interface';

@Directive({
  selector: '[dsControlSize]',
  standalone: true,
})
export class DsControlSizeDirective {
  @HostBinding('class.control-field--small') get isSm(): boolean {
    return this.dsControlSize === 'sm';
  }

  @HostBinding('class.control-field--middle') get isMd(): boolean {
    return this.dsControlSize === 'md';
  }

  @Input() dsControlSize!: ControlSize;
}
