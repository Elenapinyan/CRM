import { DOCUMENT, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal, untracked } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { debounceTime, filter, tap } from 'rxjs';
import { BaseControl, GetControlErrorMessagePipe, DsControlSizeDirective } from '../../shared';
import { DsButton } from '../button';
import { DsErrorComponent } from '../error/error.component';
import { DsFieldDescriptionComponent } from '../field-description/field-description.component';
import { SEARCH_INPUT_DEFAULT_OPTIONS } from './search-input.options';
import { COMPONENT_THEME_HOST_DIRECTIVE } from '../../directives/component-theme';
import { DsLabelDirective } from '../../directives/label';

@Component({
  selector: 'ds-search-input',
  imports: [
    ReactiveFormsModule,
    DsFieldDescriptionComponent,
    GetControlErrorMessagePipe,
    DsErrorComponent,
    NgClass,
    DsControlSizeDirective,
    DsButton,
    DsLabelDirective,
  ],
  templateUrl: './search-input.html',
  styleUrl: './search-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [COMPONENT_THEME_HOST_DIRECTIVE],
})
export class DsSearchInputComponent extends BaseControl<FormControl<string>, string> {
  /**
   * Default options for the input component
   */
  private readonly defaultOptions = inject(SEARCH_INPUT_DEFAULT_OPTIONS);

  /**
   * css selector to filter nodes for search
   */
  public contentSelector = input<string>();

  /**
   * The text to display as the placeholder for the input
   */
  readonly placeholder = input<string>(this.defaultOptions.placeholder);

  /**
   * Is search sensitive to case
   */
  readonly matchCase = input<boolean>(!!this.defaultOptions.matchCase);

  /**
   * Scroll to match when toggle active match
   */
  readonly scrollToActiveMatch = input<boolean>(!!this.defaultOptions.scrollToActiveMatch);

  /**
   * Scroll to match when toggle active match
   */
  readonly isClientSearchNavigation = input<boolean>(true);

  /**
   * Array of matches
   */
  protected ranges = signal<Range[]>([]);

  /**
   * index of active match (-1 for unselected)
   */
  protected activeRangeIndex = signal<number>(-1);

  protected activeRange = computed(() => {
    return untracked(() => this.ranges())[this.activeRangeIndex()];
  });

  private readonly document = inject(DOCUMENT);

  // TODO: remove extra type and as any after updating angular compiler
  /**
   * Highlights api
   */
  private readonly highlights: HighlightRegistry & {
    set: (selector: string, searchResultsHighlight: Highlight) => void;
    clear: () => void;
  } = this.document?.defaultView?.CSS?.highlights as any;

  constructor() {
    super();

    // Highlight selected range
    effect(() => {
      const activeRange = this.activeRange();

      if (activeRange) {
        this.scrollToElement();
        this.highlights.set('active-search-results', new Highlight(activeRange));
      }
    });

    // Highlight selected range
    effect(() => {
      const isClient = this.isClientSearchNavigation();
      this.control.setValue(this.control.value);
      if (!isClient) {
        // Clear the HighlightRegistry to remove the
        // previous search results.
        this.highlights.clear();
      }
    });
  }

  override writeValue(value: number | string | null): void {
    super.writeValue(value === null ? '' : String(value));
  }

  protected override initControl(): FormControl<string> {
    return this.formBuilder.nonNullable.control<string>('');
  }

  /**
   * Initialize control listener to emit changes
   */
  protected override initControlListener(): void {
    this.control.valueChanges
      .pipe(
        tap((value) => {
          this.cvaOnChange(value);
        }),
        filter(() => this.isClientSearchNavigation()),
        debounceTime(500),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value) => {
        // If the CSS Custom Highlight API is not supported,
        // display a message and disable control
        if (!this.highlights) {
          alert('CSS Custom Highlight API not supported.');
          this.control.disable();
          return;
        }

        // Clear the HighlightRegistry to remove the
        // previous search results.
        this.highlights.clear();

        // Clean-up the search query and bail-out
        // if it's empty.
        let str = value.trim();

        if (!this.matchCase()) {
          str = str.toLowerCase();
        }

        // reset active range
        this.activeRangeIndex.set(-1);

        if (!str) {
          this.ranges.set([]);
          return;
        }

        // Text nodes for searching
        const allTextNodes = this.getTextNodes();

        // Iterate over all text nodes and find matches
        this.ranges.set(
          allTextNodes.reduce<Range[]>((acc, el) => {
            let text = el.textContent || '';

            if (!this.matchCase()) {
              text = text.toLowerCase();
            }

            let startPos = 0;

            while (startPos < text.length) {
              const index = text.indexOf(str, startPos);
              if (index === -1) break;
              const range = new Range();
              range.setStart(el, index);
              range.setEnd(el, index + str.length);
              acc.push(range);
              startPos = index + str.length;
            }
            return acc;
          }, []),
        );

        // Create a Highlight object for the ranges
        const searchResultsHighlight = new Highlight(...this.ranges());

        // Register the Highlight object in the registry
        this.highlights.set('search-results', searchResultsHighlight);
      });
  }

  protected changeActiveRange(next = true): void {
    let nextIndex = this.activeRangeIndex() + (next ? 1 : -1);
    let maxLength = this.ranges().length - 1;

    if (maxLength === -1) {
      return;
    }

    if (nextIndex < 0) {
      nextIndex = maxLength;
    } else if (nextIndex > maxLength) {
      nextIndex = 0;
    }

    this.activeRangeIndex.set(nextIndex);
  }

  private scrollToElement(): void {
    const activeRange = this.activeRange();
    if (activeRange && this.scrollToActiveMatch()) {
      const rangeRect = activeRange.getBoundingClientRect();
      const container = activeRange.startContainer?.parentElement;

      // calculate position of the match and scroll to it
      if (container) {
        const parentRect = container.getBoundingClientRect();
        const positionPercent = (100 * (parentRect.height - rangeRect.top - parentRect.top)) / parentRect.height;
        const block = positionPercent <= 33 ? 'start' : positionPercent < 67 ? 'end' : 'center';
        container.scrollIntoView({ behavior: 'smooth', block, inline: 'nearest' });
      }
    }
  }

  /**
   * Get all text nodes filtered by selector input
   */
  private getTextNodes(): Node[] {
    const allTextNodes = [];

    const treeWalker = this.document.createTreeWalker(this.document.body, NodeFilter.SHOW_TEXT, (node: Node) => {
      const selector = this.contentSelector();
      node.parentNode;

      // text node don't have closest method need to search from it's parent
      const parent = node.parentNode as Element;

      if (selector) {
        return parent?.closest && parent.closest(selector) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      } else {
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    let currentNode = treeWalker.nextNode();

    while (currentNode) {
      allTextNodes.push(currentNode);
      currentNode = treeWalker.nextNode();
    }

    return allTextNodes;
  }
}
