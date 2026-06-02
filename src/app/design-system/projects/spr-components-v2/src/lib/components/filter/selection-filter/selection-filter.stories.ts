import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DsFilter } from '../filter';
import { DsSelectionFilter } from './selection-filter';
import { DsFilterInnerHeader } from '../filter-inner-header';
import { FILTER_TRANSLATIONS, FilterTranslationsKeys } from '../filter.util';

const meta: Meta<DsSelectionFilter> = {
  title: 'shared components/Filters/Selection Filter',
  component: DsSelectionFilter,
  parameters: {
    docs: {
      description: {
        component: `
This is an example of the selection filter implementation.
This is a combination of the **Filter component** and **Selection component**.
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
      description: 'This property enables auto width by largest option width but not more than window size',
    },
  },
  decorators: [
    moduleMetadata({
      imports: [DsFilter, DsSelectionFilter, DsFilterInnerHeader, ReactiveFormsModule],
      providers: [
        {
          provide: FILTER_TRANSLATIONS,
          useValue: {
            [FilterTranslationsKeys.RESET]: 'Clear all',
            [FilterTranslationsKeys.APPLY]: 'Apply filters',
          },
        },
      ],
    }),
  ],
};

const formControl = new FormControl(null);

export const SelectionFilterStory: StoryObj<DsSelectionFilter & DsFilter & { formControl: FormControl }> = {
  args: {
    label: 'Selection',
    options: [
      { text: 'Spribe', value: 1, isDisabled: true },
      { text: 'Aviator', value: 2, icon: 'ds-icon-general-trophy' },
      { text: 'Georgia', value: 3 },
      { text: 'Ukraine', value: 4 },
      { text: 'Moldova', value: 5 },
      { text: 'Poland', value: 6 },
      { text: 'Austria', value: 7 },
      { text: 'Slovakia', value: 8 },
      { text: 'Switzerland', value: 9 },
      { text: 'Germany', value: 10 },
      { text: 'Czech', value: 11 },
      {
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad aliquam aliquid asperiores doloremque.',
        value: 12,
      },
    ],
    multiselect: false,
    withSearch: false,
    widthByContent: false,
    maxValuesDisplay: 3,
    variant: 'default',
    footer: true,
    formControl,
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-filter [label]="label" [maxValuesDisplay]="maxValuesDisplay" [footer]="footer" [variant]="variant">
        <ds-selection-filter [options]="options" [multiselect]="multiselect" [withSearch]="withSearch" [formControl]="formControl" [widthByContent]="widthByContent" />
      </ds-filter>
    `,
  }),
};

export default meta;
