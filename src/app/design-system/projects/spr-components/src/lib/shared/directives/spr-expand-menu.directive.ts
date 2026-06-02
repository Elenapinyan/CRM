import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[sprExpandMenu]',
  standalone: true,
})
export class SprExpandMenuDirective {
  @Input('sprExpandMenu') name!: string;

  @Input() hasSubmenu = false;

  @HostBinding('class.active-sub') isOpen = false;

  @HostListener('click') toggleOpen(): void {
    if (!this.hasSubmenu) {
      return;
    }
    this.isOpen = !this.isOpen;
  }
}
