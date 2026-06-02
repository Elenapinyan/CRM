import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DropdownOption, DsControlSizeDirective } from '../../shared';
import { ValidatorsKeys } from '../../shared/enums/validators.enum';
import { DsMultiSelectDropdownComponent } from './multi-select-dropdown';
import { SelectionTemplateDirective } from '../selection';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { DsBaseOffCanvasContentComponent, OffCanvasService } from '../off-canvas';
import { DsBadge } from '../badge';
import { delay, of } from 'rxjs';
import { DsButton } from '../button';

enum RuleAction {
  FLAG_PLAYER_FOR_MANUAL_REVIEW = 'FLAG_PLAYER_FOR_MANUAL_REVIEW',
  FLAG_PLAYER_AS_BONUS_ABUSER = 'FLAG_PLAYER_AS_BONUS_ABUSER',
  FLAG_PLAYER_AS_FRAUD_SUSPECT = 'FLAG_PLAYER_AS_FRAUD_SUSPECT',
}

const RULE_ACTION_OPTIONS_NAME_MAP: Record<RuleAction, string> = {
  [RuleAction.FLAG_PLAYER_FOR_MANUAL_REVIEW]: 'Flag player for manual review',
  [RuleAction.FLAG_PLAYER_AS_BONUS_ABUSER]: 'Flag player as Bonus Abuser',
  [RuleAction.FLAG_PLAYER_AS_FRAUD_SUSPECT]: 'Flag player as Fraud Suspect',
};

const RULE_ACTION_OPTIONS: { text: string; value: RuleAction }[] = [
  ...Object.entries(RULE_ACTION_OPTIONS_NAME_MAP).map(([key, value]) => ({ value: key as RuleAction, text: value })),
];

const MOCK_RESPONSE = {
  actions: [
    {
      type: RuleAction.FLAG_PLAYER_AS_BONUS_ABUSER,
    },
    {
      type: RuleAction.FLAG_PLAYER_AS_FRAUD_SUSPECT,
    },
    {
      type: RuleAction.FLAG_PLAYER_FOR_MANUAL_REVIEW,
    },
  ],
};

@Component({
  selector: 'ds-preview-rule-modal',
  imports: [ReactiveFormsModule, DsBaseOffCanvasContentComponent, DsBadge, DsMultiSelectDropdownComponent],
  template: ` <ds-base-off-canvas-content headerVariant="bordered" footerVariant="bordered">
    <ng-container header>
      <div class="canvas-header__row">
        <h4 class="canvas-header__title">{{ modalTitle() }}</h4>

        <div class="canvas-header__items-container">
          <div class="canvas-header__actions">
            <ds-badge content="Esc" variant="neutral" />
            <button (click)="closeAction()" aria-label="Close" class="close-modal-button" type="button">
              <i class="ds-icon ds-icon-control-cross"></i>
            </button>
          </div>
        </div>
      </div>
    </ng-container>

    <ng-container body>
      @if (isLoaded()) {
        <div class="canvas-content" [formGroup]="form">
          <section class="section section--row">
            <div class="section__column">
              <div class="grid-container">
                <ds-multi-select-dropdown
                  controlSize="sm"
                  class="actions-select"
                  formControlName="actions"
                  [isSelectedAllOption]="false"
                  [options]="actionOptions"
                  [dropdownPlaceholder]="'Not selected'"
                />
              </div>
            </div>
          </section>
        </div>
      }
    </ng-container>

    <ng-container footer> </ng-container>
  </ds-base-off-canvas-content>`,
  styles: [
    `
      .grid-container {
        padding: 1rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PreviewRuleModalComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.group({
    actions: this.fb.nonNullable.control<RuleAction[]>([]),
  });

  readonly actionOptions: DropdownOption[] = RULE_ACTION_OPTIONS;

  readonly modalTitle = signal<string>('');
  readonly isLoaded = signal(false);

  ngOnInit(): void {
    this.modalTitle.set('TEST');

    of(MOCK_RESPONSE)
      .pipe(delay(400))
      .subscribe({
        next: (res) => {
          this.initForm(res);
        },
      });
  }

  closeAction: () => void = () => undefined;

  private initForm(formData: { actions: any[] }): void {
    this.form.controls.actions.setValue(formData.actions.map((item) => item.type));
    this.isLoaded.set(true);
  }
}

@Component({
  selector: 'ds-test',
  template: '<ds-button variant="main" size="md" (click)="open()">Open OffCanvas with Dropdown inside</ds-button>',
  imports: [DsButton],
})
class DsTestComponent {
  private readonly offCanvasService = inject(OffCanvasService);

  open(): void {
    this.offCanvasService.open(PreviewRuleModalComponent);
  }
}

interface CustomArgs {
  isAddonStart: boolean;
  isAddonEnd: boolean;
  formControl: FormControl;
}

const meta: Meta<DsMultiSelectDropdownComponent & CustomArgs> = {
  title: 'shared components/Dropdowns/MultiSelectDropdown',
  component: DsMultiSelectDropdownComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **MultiSelectDropdown** component allows users to select multiple options from a list. It supports various configurations to enhance its usability and appearance.

- **Options:** Accepts an array of objects to define the list of options.
- **Loading State:** Indicates if the dropdown is loading its options.
- **Disability:** Option to disable the component, preventing user interaction.
- **Search:** Includes a search feature to filter the list of options.
- **Control Size:** Adjust the size of the dropdown control to fit different form layouts.

This component enhances user experience by providing a flexible and intuitive interface for multi-selection.
        `,
      },
    },
  },
  argTypes: {
    options: {
      description:
        'This parameter accepts an array of objects of type `DropdownOption`, which is structured as follows: ' +
        '`[{ text: string, value: string | number | boolean | null }]`',
    },
    isLoading: {
      description: 'Indicates if the dropdown is loading its options.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    isDisabled: {
      description: 'Disable the dropdown to prevent user interactions.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    description: {
      description: 'The text to display as the description for the period selector.',
    },
    withSearch: {
      description: 'Include a search feature to filter the list of options.',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    controlSize: {
      options: ['sm', 'md'],
      control: {
        type: 'select',
      },
      description: 'Adjust the size of the dropdown control.',
      table: {
        defaultValue: {
          summary: 'md',
        },
      },
    },
    inputId: {
      description: 'This is equivalent to the basic HTML id attribute.',
      control: {
        disable: true,
      },
    },
    label: {
      description: 'The text to display within the label.',
    },
    inputPlaceholder: {
      description: 'The text to display within the input placeholder.',
    },
    tooltip: {
      description: 'The text to display within the tooltip.',
    },
    isColored: {
      description: 'Option to apply colored styling to the input field.',
    },
    widthByContent: {
      description:
        'Option to enable/disable dynamic dropdown width depending on content inside. But not more than window size. If window size is less than item, scroll will appear.',
    },
    tooltipClassForLabel: {
      description: 'Tooltip class for label.',
      control: { type: 'text' },
    },
    maxDisplayedItems: {
      description: 'Limit the number of items displayed in the dropdown list.',
      table: {
        defaultValue: {
          summary: '4',
        },
      },
    },
    filterStrategy: {
      description: 'Filter strategy',
      options: ['local', 'api'],
      type: 'string',
      control: {
        type: 'select',
      },
      table: {
        defaultValue: {
          summary: 'local',
        },
      },
      addonEnd: {
        description: 'Object for configuring the end addon element.',
      },
      addonStart: {
        description: 'Object for configuring the start addon element.',
      },
    },
    isAddonStart: {
      description: 'Include an addon element at the start of the input field.',
    },
    isAddonEnd: {
      description: 'Include an addon element at the end of the input field.',
    },
    addonStart: {
      description: 'Object for configuring the start addon element.',
    },
    addonEnd: {
      description: 'Object for configuring the end addon element.',
    },
    errorMessages: {
      description: 'Custom error messages for validation.',
    },
    formControl: {
      table: { disable: true },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, DsControlSizeDirective, SelectionTemplateDirective, DsTestComponent],
    }),
  ],
};

const formControl = new FormControl<string[]>(['VALUE_1'], {
  nonNullable: true,
  validators: [Validators.required],
});

export const MultiSelectDropdown: StoryObj<DsMultiSelectDropdownComponent & CustomArgs> = {
  args: {
    label: 'Label',
    tooltip: 'Tooltip',
    tooltipClassForLabel: 'ds-component',
    controlSize: 'md',
    maxDisplayedItems: 5,
    inputPlaceholder: '',
    description: 'Description',
    isLoading: false,
    isColored: false,
    isDisabled: false,
    withSearch: true,
    isAddonStart: true,
    isAddonEnd: false,
    widthByContent: false,
    isSelectedAllOption: true,
    filterStrategy: 'local',
    options: [
      { text: 'Spribe', value: 'VALUE_1', isDisabled: true, icon: 'ds-icon-general-diamond' },
      { text: 'Aviator', value: 'VALUE_2', isDisabled: false, icon: 'ds-icon-general-trophy' },
      { text: 'Georgian', value: 'VALUE_3', isDisabled: false, icon: '' },
      { text: 'Ukraine', value: 'VALUE_4', isDisabled: false, icon: '' },
      { text: 'Poland', value: 'VALUE_5', isDisabled: false, icon: '' },
      { text: 'Portugal', value: 'VALUE_6', isDisabled: false, icon: '' },
      { text: 'United Kingdom', value: 'VALUE_7', isDisabled: false, icon: '' },
    ],
    addonStart: { icon: 'ds-icon ds-icon-control-cross' },
    addonEnd: { icon: 'ds-icon ds-icon-control-cross' },
    errorMessages: {
      [ValidatorsKeys.Required]: 'This field is required',
    },
    inputId: '123',
    formControl,
  },
  render: (args) => {
    if (args.isDisabled) {
      args.formControl.disable({ emitEvent: false });
    } else {
      args.formControl.enable({ emitEvent: false });
    }

    return {
      props: {
        ...args,
      },
      template: `
        <!-- dropdown inside offcanvas example-->
        <ds-test />

        <br/>
        <br/>

        <ds-multi-select-dropdown
          [label]="label"
          [inputId]="inputId"
          [options]="options"
          [tooltip]="tooltip"
          [tooltipClassForLabel]="tooltipClassForLabel"
          [inputPlaceholder]="inputPlaceholder"
          [isLoading]="isLoading"
          [isDisabled]="isDisabled"
          [withSearch]="withSearch"
          [description]="description"
          [isColored]="isColored"
          [formControl]="formControl"
          [controlSize]="controlSize"
          [errorMessages]="errorMessages"
          [filterStrategy]="filterStrategy"
          [addonEnd]="isAddonEnd && addonEnd"
          [maxDisplayedItems]="maxDisplayedItems"
          [isSelectedAllOption]="isSelectedAllOption"
          [addonStart]="isAddonStart && addonStart"
          [widthByContent]="widthByContent"
        />

        <br>
        <br>

        <h4>With custom templates</h4>
        <ds-multi-select-dropdown
          [label]="label"
          [inputId]="inputId"
          [options]="options"
          [tooltip]="tooltip"
          [tooltipClassForLabel]="tooltipClassForLabel"
          [inputPlaceholder]="inputPlaceholder"
          [isLoading]="isLoading"
          [isDisabled]="isDisabled"
          [withSearch]="withSearch"
          [description]="description"
          [isColored]="isColored"
          [formControl]="formControl"
          [controlSize]="controlSize"
          [errorMessages]="errorMessages"
          [filterStrategy]="filterStrategy"
          [addonEnd]="isAddonEnd && addonEnd"
          [maxDisplayedItems]="maxDisplayedItems"
          [isSelectedAllOption]="isSelectedAllOption"
          [addonStart]="isAddonStart && addonStart"
          [widthByContent]="widthByContent"
        >
          <ng-template sprSelectionTemplate="option" let-option let-selected="isSelected">
            @if (selected) {
              <i class="ds-icon-general-check-shield"></i>
            }
            <div [class.selected]="selected">{{ option.text }}</div>
          </ng-template>

          <ng-template sprSelectionTemplate="select-all" let-data let-selected="isSelected">
            @if (selected) {
              <i class="ds-icon-general-check-shield"></i>
            }
            <div [class.selected]="selected">{{ data.text }}</div>
          </ng-template>

          <ng-template sprSelectionTemplate="search-error" let-error>
            <div>{{ error.title }}</div>
            <div>{{ error.subtitle }}</div>
          </ng-template>
        </ds-multi-select-dropdown>
      `,
    };
  },
};

export default meta;
