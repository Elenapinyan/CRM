import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DsConditions } from './conditions';
import { DsFilter } from '../filter';
import { ConditionFilterType } from './conditions.util';

const meta: Meta<DsConditions> = {
  title: 'shared components/Filters/Conditions Filter',
  component: DsConditions,
  parameters: {
    docs: {
      description: {
        component: `
The **Conditions** component is a part of **Filter**.\n\n
This component provides set of conditions for filtering.
Use this component as a child of **Filter component** to add conditional filtering.
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: {
        type: 'select',
      },
      options: [ConditionFilterType.TEXT, ConditionFilterType.NUMERIC, ConditionFilterType.DATE],
      description: 'The type of filter value',
      table: {
        defaultValue: {
          summary: ConditionFilterType.TEXT,
        },
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [DsFilter, DsConditions, ReactiveFormsModule],
    }),
  ],
};

const formControl = new FormControl(null);

export const ConditionsFilterStory: StoryObj<DsConditions & DsFilter & { formControl: FormControl }> = {
  args: {
    label: 'Condition',
    type: ConditionFilterType.TEXT,
    footer: true,
    formControl,
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-filter [label]="label" [footer]="footer">
        <ds-conditions [type]="type" [formControl]="formControl" />
      </ds-filter>
    `,
  }),
};

export default meta;
