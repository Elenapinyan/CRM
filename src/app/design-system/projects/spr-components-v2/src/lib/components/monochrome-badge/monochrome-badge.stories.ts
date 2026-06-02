import { Meta, StoryObj } from '@storybook/angular';
import { DsMonochromeBadgeComponent } from './monochrome-badge';

interface CustomArgs {
  projectedContent?: string;
}

const meta: Meta<DsMonochromeBadgeComponent & CustomArgs> = {
  title: 'shared components/MonochromeBadge',
  component: DsMonochromeBadgeComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **MonochromeBadgeComponent component** is a UI element that can be used to display badge text (with or without content) with 2 shapes (round and square) and 2 colors (default and alt).

- **badgeShape**: The shape of the badge. Can be either "square" or "circle".
- **isFixedSize**: If true, the badge will be square (fixed height and width). False by default.

### Simple badge with projected content
\`\`\`
<span sprMonochromeBadge>
  Projected content
</span>
\`\`\`

### Fixed size badge
\`\`\`
<span sprMonochromeBadge
      [isFixedSize]="true">
  99
</span>
\`\`\`

### Available shapes: square (default) and circle
\`\`\`
<span sprMonochromeBadge
      badgeShape="circle"
      [isFixedSize]="true">
  99
</span>
\`\`\`

### Also you can use input property **badgeContent** to set badge content
\`\`\`
<span sprMonochromeBadge
      [badgeContent]="'99'">
</span>
\`\`\`
        `,
      },
    },
  },
  decorators: [],
  argTypes: {
    projectedContent: {
      control: {
        type: 'text',
      },
      description: 'The projected content to display in the badge. (content type "projected")',
    },
    isFixedSize: {
      control: {
        type: 'boolean',
      },
      description: 'This option toggle square shape (same height and width). False by default',
    },
    badgeContent: {
      control: {
        type: 'text',
      },
      description: 'The text, number or symbol to display in the badge',
    },
    badgeShape: {
      options: ['square', 'circle'],
      control: {
        type: 'radio',
      },
      description: 'Select the badge shape.',
      table: {
        type: {
          summary: 'square | circle',
        },
        defaultValue: {
          summary: 'square',
        },
      },
    },
  },
};

export const OneColorBadge: StoryObj<DsMonochromeBadgeComponent & CustomArgs> = {
  args: {
    badgeShape: 'square',
    projectedContent: 'Badge projected content',
    isFixedSize: false,
    badgeContent: '22',
  },
  render: (args) => {
    return {
      props: { ...args },
      template: `
        <section class="storybook-section">
          <h4 class="storybook-title">MonochromeBadgeComponent with projected content</h4>

          <span ds-monochrome-badge
                [badgeShape]="badgeShape"
                [isFixedSize]="isFixedSize">
                    {{ projectedContent }}
          </span>
        </section>

        <section class="storybook-section">
          <h4 class="storybook-title">MonochromeBadgeComponent with input content</h4>
          <span ds-monochrome-badge
                [badgeShape]="badgeShape"
                [isFixedSize]="isFixedSize"
                [badgeContent]="badgeContent">
          </span>
        </section>

        <section class="storybook-section">
          <h4 class="storybook-title">MonochromeBadgeComponent with input content</h4>
          <span ds-monochrome-badge
                themeType="alt"
                [badgeShape]="badgeShape"
                [isFixedSize]="isFixedSize"
                [badgeContent]="badgeContent">
          </span>
        </section>
        `,
    };
  },
};

export default meta;
