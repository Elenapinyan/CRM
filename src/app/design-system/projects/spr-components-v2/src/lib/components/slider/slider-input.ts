/* eslint-disable @typescript-eslint/member-ordering */
import { Directive, effect, ElementRef, inject, input, model, numberAttribute } from '@angular/core';

@Directive({
  selector: 'input[sprSliderThumb]',
  host: {
    type: 'range',
    '(input)': 'onInput()',
    // fix safary focus bug
    tabindex: '1',
  },
})
export class SliderInputDirective {
  readonly rangeValue = model.required<number>();
  readonly min = input(0, { transform: numberAttribute });
  readonly max = input(100, { transform: numberAttribute });

  /** The host native HTML input element. */
  private readonly hostElement: HTMLInputElement = inject(ElementRef).nativeElement;

  protected onInput(): void {
    let value = Number.parseFloat(this.hostElement.value);
    if (value > this.max()) {
      value = this.max();
    } else if (value < this.min()) {
      value = this.min();
    }
    this.rangeValue.set(value);
  }

  constructor() {
    // validate outside range value
    effect(() => {
      let value = this.rangeValue();

      if (value > this.max()) {
        value = this.max();
      } else if (value < this.min()) {
        value = this.min();
      }

      this.rangeValue.set(value);
    });
  }
}
