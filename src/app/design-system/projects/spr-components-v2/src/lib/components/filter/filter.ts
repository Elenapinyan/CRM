import { ChangeDetectionStrategy, Component, computed, contentChild, effect, inject, input, viewChild } from '@angular/core';
import { MenuDirective } from '../../shared';
import { DsButton } from '../button';
import { DsBadge } from '../badge';
import { SPR_FILTER_ACCESSOR, SPR_FILTER_CUSTOM_FOOTER_IMPLEMENTATION, SPR_FILTER_HEADER_ACCESSOR } from '../../shared/utils';
import { DEFAULT_FILTER_TRANSLATIONS, FILTER_TRANSLATIONS, FilterTranslationsKeys } from './filter.util';

@Component({
  selector: 'ds-filter',
  templateUrl: './filter.html',
  styleUrl: './filter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MenuDirective, DsButton, DsBadge],
})
export class DsFilter {
  private readonly menu = viewChild(MenuDirective);

  protected readonly child = contentChild(SPR_FILTER_ACCESSOR, { descendants: true });
  protected readonly header = contentChild(SPR_FILTER_HEADER_ACCESSOR, { descendants: true });
  protected readonly customFooterImplementation = contentChild(SPR_FILTER_CUSTOM_FOOTER_IMPLEMENTATION, { descendants: true });

  protected readonly value = computed(() => {
    const displayValue = this.displayValue();

    if (displayValue) {
      return displayValue;
    }

    const filterValue = this.child()?.filterValue();

    if (!filterValue) {
      return '';
    }

    if (Array.isArray(filterValue)) {
      const limit = filterValue.slice(0, this.maxValuesDisplay());
      const rest = filterValue.slice(this.maxValuesDisplay(), filterValue.length);

      return limit.join(', ') + (rest.length ? ` +${rest.length}` : '');
    }

    return filterValue;
  });

  protected readonly isArrayFilterValue = computed(() => Array.isArray(this.child()?.filterValue()));

  protected readonly translationsKeys = FilterTranslationsKeys;

  readonly pureValue = computed(() => this.child()?.filterValue());

  /**
   * @Required
   **/
  label = input.required();

  /**
   * Custom inner header
   **/
  innerHeader = input<boolean>(false);

  /**
   * You can specify custom value to display in filter.
   * Otherwise, child component value is expected.
   **/
  displayValue = input<string | null>(null);

  /**
   * You can specify maximum count of displayed values in case filter value is `string[]`
   * @Default 3
   **/
  maxValuesDisplay = input<number>(3);

  /**
   * You can enable/disable footer
   * @Default true
   **/
  footer = input<boolean>(true);

  /**
   * You can enable custom toggle then use ng-content[toggle] to project your specific template.
   * @Default false
   **/
  customToggle = input<boolean>(false);

  /**
   * Variant of the default toggle
   * @Default 'default'
   **/
  variant = input<'default' | 'short'>('default');

  /**
   * Translate all options, displayed value and input placeholders.
   * Also, can be provided by token `CONDITIONS_FILTER_TRANSLATIONS`.
   * @Default If nothing set or provided DEFAULT_CONDITIONS_FILTER_TRANSLATIONS constant will be used.
   **/
  translations = input(inject(FILTER_TRANSLATIONS, { optional: true }) ?? DEFAULT_FILTER_TRANSLATIONS);

  constructor() {
    effect(() => {
      const child = this.child();

      if (!child) {
        return;
      }

      child.disableAutoApply(this.footer());
    });
  }

  apply(): void {
    this.child()?.apply();
  }

  resetValue(): void {
    this.child()?.resetValue();
  }

  closeMenu(): void {
    const menu = this.menu();

    if (!menu) {
      return;
    }

    menu.close();
  }
}
