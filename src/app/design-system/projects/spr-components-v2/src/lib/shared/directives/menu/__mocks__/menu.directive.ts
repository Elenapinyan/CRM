import { Directive, input, signal } from '@angular/core';
import { MenuCloseTrigger } from '../menu.util';

@Directive({ selector: '[sprMenu]', exportAs: 'sprMenu' })
export class MockMenuDirective {
  isOpened = signal<boolean>(false);
  host = input();
  position = input<string>('bottom');
  backdrop = input<boolean>(true);
  closeTrigger = input<MenuCloseTrigger>('backdrop');

  open = jest.fn();
  close = jest.fn();
}
