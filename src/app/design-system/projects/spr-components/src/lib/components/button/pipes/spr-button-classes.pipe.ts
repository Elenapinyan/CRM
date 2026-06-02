import { Pipe, PipeTransform } from '@angular/core';
import { ButtonSizeType, ButtonVariant } from '../interfaces/spr-button.interface';

@Pipe({
  name: 'sprButtonClasses',
  standalone: true,
})
export class SprButtonClassesPipe implements PipeTransform {
  transform(variant: ButtonVariant, size: ButtonSizeType, isIcon?: boolean, isRadius?: boolean): string[] {
    let classes = ['button', 'button--' + variant];

    if (isIcon) {
      classes.push('button--icon', 'button--icon-' + size);
    } else {
      classes.push('button--' + size);
    }

    if (isRadius) {
      classes.push('button--rounded');
    }

    return classes;
  }
}
