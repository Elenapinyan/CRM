import { Meta, StoryObj } from '@storybook/angular';
import { DsSegmentedControl } from './segmented-control';

interface CustomArgs {}

const meta: Meta<DsSegmentedControl & CustomArgs> = {
  title: 'shared components/SegmentedControl/Segmented Control item',
  component: DsSegmentedControl,
  parameters: {
    docs: {
      description: {
        component: `
The **SegmentedControl** is a UI element wich is a simple part of **SegmentedControls** component.

### Usage example:

\`\`\`html
<ds-segmented-control
  [text]="text"
  [iconStart]="iconStart"
  [iconEnd]="iconEnd"
  [active]="active"
  [disabled]="disabled" />
\`\`\`

#### Where:

* **\`text\`** text content inside the item.
* **\`iconStart\`** icon at the beginnging of the component
* **\`iconEnd\`** icon at the end of the component
* **\`active\`** active or not. \`false\` by default
* **\`disabled\`** disabled or not. \`false\` by default
        `,
      },
    },
  },
  decorators: [],
  argTypes: {
    text: {
      control: {
        type: 'text',
      },
      description: 'The title text',
    },
    iconStart: {
      control: {
        type: 'text',
      },
      description: 'The name of the start icon.',
    },
    iconEnd: {
      control: {
        type: 'text',
      },
      description: 'The name of the end icon.',
    },
    active: {
      control: {
        type: 'boolean',
      },
      description: 'Is active state',
    },
  },
};

export const OneColorBadge: StoryObj<DsSegmentedControl & CustomArgs> = {
  args: {
    text: 'Segmented control',
    iconStart: 'ds-icon-general-card',
    iconEnd: 'ds-icon-general-card',
    active: false,
    disabled: false,
  },
  render: (args) => {
    return {
      props: { ...args },
      template: `
        <section>
          <h3 class="storybook-title">SegmentedControl Component</h3>

          <ds-segmented-control
            [text]="text"
            [iconStart]="iconStart"
            [iconEnd]="iconEnd"
            [active]="active"
            [disabled]="disabled" />

        </section>
        `,
    };
  },
};

export default meta;
