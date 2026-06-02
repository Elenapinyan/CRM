import { Directive, HostBinding, Input } from '@angular/core';
import { ControlSize } from '../interfaces/controls-size.interface';

@Directive({
  selector: '[sprControlSize]',
  standalone: true,
})
export class SprControlSizeDirective {
  @HostBinding('class.control-form--small') get isSm(): boolean {
    return this.sprControlSize === 'sm';
  }

  @HostBinding('class.control-form--middle') get isMd(): boolean {
    return this.sprControlSize === 'md';
  }

  @HostBinding('class.control-form--large') get isLg(): boolean {
    return this.sprControlSize === 'lg';
  }

  @Input() sprControlSize!: ControlSize;
}
