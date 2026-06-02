import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DsSelection } from './selection';
import { SelectionTemplateDirective } from './selection-template.directive';

const meta: Meta<DsSelection> = {
  title: 'shared components/Selection',
  component: DsSelection,
  parameters: {
    docs: {
      description: {
        component: `
The **Selection** component implements list with single or multiple selection mode.
        `,
      },
    },
  },
  argTypes: {
    options: {
      description:
        'This parameter accepts an array of objects of type `DropdownOption`, which is structured as follows: ' +
        '`{ text: string, value: string | number | boolean | null, isDisabled?: boolean, icon?: string, class?: string }[]`',
    },
    multiselect: {
      description: 'This property lets you to switch between single item selection and multiselection',
    },
    withSearch: {
      description: 'Use this property to enable/disable items filtering',
    },
    widthByContent: {
      description:
        'Option to enable/disable dynamic dropdown width depending on content inside. But not more than window size. If window size is less than item, scroll will appear.',
    },
    templates: {
      description:
        'You can set custom templates as an input.\n' +
        'This property has priority over contentChildren, but if not set, contentChildren will be used. \n' +
        'Comfortable to use it when selection is a part of different component with templates from the outside of parent.',
      table: {
        defaultValue: {
          summary: '`undefined`',
        },
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [DsSelection, ReactiveFormsModule, SelectionTemplateDirective],
    }),
  ],
};

const formControl = new FormControl(null);

export const SelectionStory: StoryObj<DsSelection & { formControl: FormControl }> = {
  args: {
    options: [
      { text: 'Spribe', value: 1, isDisabled: true },
      { text: 'Aviator', value: 2, icon: 'ds-icon-general-trophy' },
      { text: 'Georgia', value: 3 },
      { text: 'Ukraine', value: 4 },
      { text: 'Moldova', value: 5 },
      { text: 'Poland', value: 6 },
      { text: 'Ukraine Poland Moldova Austria Slovakia Switzerland Germany Czech', value: 66 },
      { text: 'Austria', value: 7 },
      { text: 'Slovakia', value: 8 },
      { text: 'Switzerland', value: 9 },
      { text: 'Germany', value: 10 },
      { text: 'Czech', value: 11 },
    ],
    multiselect: false,
    withSearch: false,
    widthByContent: false,
    formControl,
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-selection
        [options]="options"
        [multiselect]="multiselect"
        [withSearch]="withSearch"
        [widthByContent]="widthByContent"
        [formControl]="formControl" />

        <br>
        <br>

        <h4>With custom templates</h4>
        <ds-selection
          [options]="options"
          [multiselect]="multiselect"
          [withSearch]="withSearch"
          [widthByContent]="widthByContent"
          [formControl]="formControl">
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
        </ds-selection>
    `,
  }),
};

export default meta;
