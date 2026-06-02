import { Directive, input, output } from '@angular/core';
import { SprMenuFooterText } from './open-menu-footer.util';

@Directive({
  selector: '[dsOpenMenuFooter]',
})
export class DsOpenMenuFooterDirective {
  text = input.required<SprMenuFooterText>({ alias: 'dsOpenMenuFooter' });

  canceled = output<void>();
  submitted = output<void>();
}
