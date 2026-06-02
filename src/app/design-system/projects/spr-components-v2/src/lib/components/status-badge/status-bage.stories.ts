import { Meta, StoryObj } from '@storybook/angular';
import { DsStatusBadgeComponent } from './status-badge';

interface CustomArgs {
  text: string;
}

const meta: Meta<DsStatusBadgeComponent & CustomArgs> = {
  title: 'shared components/StatusBadge',
  component: DsStatusBadgeComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **StatusBadge component** is a UI element that can be used to display badge text with a square element responsible for the status color at the beginning of the component.

- **Styles:** Available in various colors to match your application's design.
- Available parameter **pointColor:**: 'grey | pink | red | orange | amber | yellow | olive | green | cyan | blue | purple'.

\`\`\`
  <span dsStatusBadge [pointColor]="pointColor">some text</span>
\`\`\`
        `,
      },
    },
  },
  decorators: [],
  argTypes: {
    pointColor: {
      options: ['grey', 'pink', 'red', 'orange', 'amber', 'yellow', 'olive', 'green', 'cyan', 'blue', 'purple'],
      control: {
        type: 'select',
      },
      description: 'Select the badge point color.',
      table: {
        type: {
          summary: 'grey | pink | red | orange | amber | yellow | olive | green | cyan | blue | purple',
        },
        defaultValue: {
          summary: 'grey',
        },
      },
    },
  },
};

export const StatusBadge: StoryObj<DsStatusBadgeComponent & CustomArgs> = {
  args: {
    pointColor: 'grey',
    text: 'some badge text',
  },
  render: (args) => {
    return {
      props: { ...args },
      template: `
        <section class="storybook-section">
          <h4 class="storybook-title">StatusBadge with component style</h4>
          <ds-status-badge [pointColor]="pointColor">{{ text }}</ds-status-badge>
        </section>

        <section class="storybook-section">
          <h4 class="storybook-title">StatusBadge with directive style</h4>
          <span dsStatusBadge [pointColor]="pointColor">{{ text }}</span>
        </section>
        `,
    };
  },
};

export default meta;
