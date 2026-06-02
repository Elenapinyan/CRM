import { componentWrapperDecorator, Meta, StoryObj } from '@storybook/angular';
import { DsInlineTip } from './inline-tip';

const meta: Meta<DsInlineTip> = {
  title: 'shared components/Inline Tip',
  component: DsInlineTip,
  args: {
    type: 'primary',
    variant: 'filled',
  },
  argTypes: {
    type: {
      description: 'Select the InlineTip type',
      options: ['primary', 'warning', 'danger', 'success'],
      control: {
        type: 'select',
      },
      table: {
        type: {
          summary: `'primary' | 'warning' | 'danger' | 'success'`,
        },
        defaultValue: {
          summary: 'primary',
        },
      },
    },
    variant: {
      description: 'Select the InlineTip type',
      options: ['plain', 'filled'],
      control: {
        type: 'select',
      },
      table: {
        type: {
          summary: `'plain' | 'filled'`,
        },
        defaultValue: {
          summary: 'filled',
        },
      },
    },
  },
  decorators: [
    componentWrapperDecorator(() => {
      return `
        <div [type]="type" [variant]="variant" ds-inline-tip>
          <b>{{type}}-{{variant}}</b>: You can always install the storefront at a later point. Medusa is a headless backend, so it operates without a storefront by default. You can connect any storefront to it. The Next.js Starter storefront is a good option to use, but you can also build your own storefront later on.
        </div>
      `;
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
The **InlineTip** component is used to display styled text block.
        `,
      },
    },
  },
};

export const Default: StoryObj<DsInlineTip> = {};

export default meta;
