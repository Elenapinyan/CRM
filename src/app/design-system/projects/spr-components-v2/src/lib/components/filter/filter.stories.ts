import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DsFilter } from './filter';
import { DsDatepicker, DsDatepickerRange } from '../datepicker';
import { DsConditions } from './conditions';
import { DsSelection } from '../selection';
import { DropdownOption } from '../../shared';
import { DsFilterInnerHeader } from './filter-inner-header';

const meta: Meta<DsFilter> = {
  title: 'shared components/Filters',
  component: DsFilter,
  parameters: {
    docs: {
      description: {
        component: `
The **Filters** component is designed to simplify adding filtering to pages.\n
This component is more like a toggle which can open any compatible component inside the dropdown.

You can develop your own filter and use it with this component\n
In your custom component, you should implement \`FilterValueAccessor\` interface.\n
Then you need to provide special token, you can use \`provideFilterValueAccessor(ComponentType)\` function exported from filter folder.
        `,
      },
    },
  },
  argTypes: {
    label: {
      type: 'string',
      description: 'The label displayed to the left side of the filter toggle',
      table: {
        defaultValue: {
          summary: 'string',
        },
      },
    },
    customToggle: {
      type: 'boolean',
      description: 'Let you to enable projection of custom toggle',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    innerHeader: {
      type: 'boolean',
      description: 'Let you to enable projection of custom menu header',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    displayValue: {
      type: 'string',
      description: 'This value overwrites filter displayed string',
      table: {
        defaultValue: {
          summary: 'string',
        },
      },
    },
    maxValuesDisplay: {
      type: 'number',
      description: 'When filter value is a `string[]`. This property let you specify count of values displayed.',
      table: {
        defaultValue: {
          summary: '3',
        },
      },
    },
    footer: {
      type: 'boolean',
      description:
        'This property let you to control footer appearance. When footer enabled, filter values applied on apply click. When footer disabled, filter values will be applied on change.',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    variant: {
      options: ['default', 'short'],
      control: {
        type: 'select',
      },
      description: 'Toggle variant',
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [DsDatepicker, DsDatepickerRange, DsConditions, DsSelection, DsFilterInnerHeader],
    }),
  ],
};

export const FiltersStory: StoryObj<DsFilter & { options: DropdownOption[] }> = {
  args: {
    footer: true,
    displayValue: '',
    innerHeader: false,
    variant: 'default',
    options: [
      { text: 'Spribe', value: 1, isDisabled: true },
      { text: 'Aviator lorem ipsum dolore sit amet lorem ipsum dolore sit amet', value: 2, icon: 'ds-icon-general-trophy' },
      { text: 'Georgia', value: 3 },
      { text: 'Ukraine', value: 4 },
      { text: 'Moldova', value: 5 },
      { text: 'Poland', value: 6 },
      { text: 'Austria', value: 7 },
      { text: 'Slovakia', value: 8 },
      { text: 'Switzerland', value: 9 },
      { text: 'Germany', value: 10 },
      { text: 'Czech', value: 11 },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-filter label="Date Range" [footer]="footer" [displayValue]="displayValue" [variant]="variant">
        <ds-datepicker-range [inline]="true" />
      </ds-filter>

      <br>
      <br>

      <ds-filter label="Datetime" [footer]="footer" [displayValue]="displayValue" [variant]="variant">
        <ds-datepicker [inline]="true" [timepicker]="true" />
      </ds-filter>

      <br>
      <br>

      <ds-filter label="Datetime" [footer]="footer" [displayValue]="displayValue" [variant]="variant" [customToggle]="true">
        <div toggle><button class="storybook-title">Custom Toggle</button></div>
        <ds-conditions />
      </ds-filter>

      <br>
      <br>

      <p class="storybook-title">With fully custom inner header</p>
      <ds-filter label="Condition" [footer]="footer" [displayValue]="displayValue" [variant]="variant" [innerHeader]="true">
        <div innerHeader>Custom inner header</div>
        <ds-conditions />
      </ds-filter>

      <br>
      <br>

      <p class="storybook-title">With component inner header</p>
      <ds-filter label="Selection" [maxValuesDisplay]="maxValuesDisplay" [footer]="footer" [variant]="variant">
        <ds-filter-inner-header text="Title" />
        <ds-selection [options]="options" [multiselect]="true" [withSearch]="true" />
      </ds-filter>
    `,
  }),
};

export default meta;
